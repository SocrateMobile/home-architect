"""Storage manager for Home Architect projects.

Données du Store (clé `home_architect.projects`, version 2.1) :
    {"projects": {id: projet}, "publications": {id: {token, hash, published_at, include_background}}}

Les images de fond et les SVG publiés sont des fichiers (voir assets.py) : le
projet ne garde qu'une référence `background.assetId`.
"""
from __future__ import annotations

import asyncio
import json
import logging
import math
from pathlib import Path
import re
import secrets
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .assets import (
    ASSET_ID_RE,
    PUBLISH_TOKEN_RE,
    PUBLISHED_FILENAME_RE,
    AssetError,
    ProjectFiles,
    decode_data_url,
    published_filename,
)
from .const import (
    ASSET_GRACE_PERIOD,
    DATA_DIR_NAME,
    MAX_PROJECT_BYTES,
    MAX_PROJECTS,
    MAX_UPLOAD_BYTES,
    PROJECT_ID_PATTERN,
    PROJECT_SCHEMA_VERSION,
    PUBLISHED_URL_PATH,
    SIGNAL_PROJECT_UPDATED,
    STORAGE_KEY,
    STORAGE_MINOR_VERSION,
    STORAGE_VERSION,
)
from .svg_sanitizer import SvgSanitizeError

_LOGGER = logging.getLogger(__name__)

_PROJECT_ID_RE = re.compile(PROJECT_ID_PATTERN)
_EXTERNAL_IMAGE_URL_RE = re.compile(r"^(?:https?://|/)[^\s\x00-\x1f\x7f]*$", re.IGNORECASE)
_LIST_FIELDS = ("walls", "openings", "rooms", "bindings", "furniture")
_OBJECT_FIELDS = ("grid", "background", "exportFrame")
_NUMBER_FIELDS = ("pixelsPerMeter", "defaultCeilingHeight")
# Champs possédés par le serveur : ignorés en entrée de save_project
_SERVER_FIELDS = frozenset({"publish", "revision", "schema_version", "updated_at"})
_MAX_NAME_LENGTH = 200
_MAX_CATEGORY_LENGTH = 64
_MAX_IMAGE_URL_LENGTH = 2048

# {"projects": {id: projet}, "publications": {id: publication}}
type StoreData = dict[str, dict[str, dict[str, Any]]]


class StorageError(Exception):
    """Erreur métier remontée au client WebSocket avec `code`."""

    code = "unknown_error"


class ProjectNotFoundError(StorageError):
    """Projet inconnu."""

    code = "not_found"


class InvalidProjectError(StorageError):
    """Projet mal formé."""

    code = "invalid_project"


class TooManyProjectsError(StorageError):
    """Nombre maximal de projets atteint."""

    code = "too_many_projects"


class RevisionConflictError(StorageError):
    """La révision attendue ne correspond pas à celle du serveur."""

    code = "conflict"

    def __init__(self, server_revision: int) -> None:
        super().__init__(f"conflict:{server_revision}")
        self.server_revision = server_revision


class PayloadTooLargeError(StorageError):
    """Projet trop volumineux."""

    code = "payload_too_large"

    def __init__(self, size: int, limit: int) -> None:
        super().__init__(f"payload_too_large:{size}:{limit}")
        self.size = size
        self.limit = limit


class InvalidSvgError(StorageError):
    """SVG refusé par l'assainisseur."""

    code = "invalid_svg"


class InvalidImageError(StorageError):
    """Image de fond refusée."""

    code = "invalid_image"


class StorageWriteError(StorageError):
    """Échec d'écriture (Store ou fichier) ; le détail est journalisé."""

    code = "save_failed"


def _revision_of(project: dict[str, Any] | None) -> int:
    if project is None:
        return 0
    revision = project.get("revision")
    if isinstance(revision, int) and not isinstance(revision, bool) and revision >= 0:
        return revision
    return 0


def _asset_id_of(project: dict[str, Any]) -> str | None:
    background = project.get("background")
    if isinstance(background, dict):
        asset_id = background.get("assetId")
        if isinstance(asset_id, str) and asset_id:
            return asset_id
    return None


def _valid_publication(publication: Any) -> bool:
    return (
        isinstance(publication, dict)
        and isinstance(publication.get("token"), str)
        and PUBLISH_TOKEN_RE.match(publication["token"]) is not None
        and isinstance(publication.get("hash"), str)
        and isinstance(publication.get("published_at"), str)
        and isinstance(publication.get("include_background"), bool)
    )


def _format_publish_info(
    project_id: str, publication: dict[str, Any], legacy_exists: bool
) -> dict[str, Any]:
    """PublishInfo exposé au frontend (URL versionnée par l'empreinte du contenu)."""
    path = f"{PUBLISHED_URL_PATH}/{published_filename(project_id, publication['token'])}"
    info: dict[str, Any] = {
        "url": f"{path}?v={publication['hash']}",
        "path": path,
        "hash": publication["hash"],
        "published_at": publication["published_at"],
        "include_background": publication["include_background"],
    }
    if legacy_exists:
        info["legacy_path"] = f"/local/plan_{project_id}.svg"
    return info


def _coerce_data(raw: Any) -> StoreData:
    """Valide la structure chargée et écarte les entrées inutilisables."""
    projects: dict[str, dict[str, Any]] = {}
    publications: dict[str, dict[str, Any]] = {}
    if not isinstance(raw, dict):
        if raw is not None:
            _LOGGER.error("Ignoring malformed Home Architect storage data")
        return {"projects": projects, "publications": publications}
    raw_projects = raw.get("projects")
    if isinstance(raw_projects, dict):
        for project_id, project in raw_projects.items():
            if isinstance(project_id, str) and _PROJECT_ID_RE.match(project_id) and isinstance(project, dict):
                project["id"] = project_id
                projects[project_id] = project
            else:
                _LOGGER.warning("Ignoring stored project with invalid id or content: %r", project_id)
    raw_publications = raw.get("publications")
    if isinstance(raw_publications, dict):
        for project_id, publication in raw_publications.items():
            if project_id in projects and _valid_publication(publication):
                publications[project_id] = publication
    return {"projects": projects, "publications": publications}


def _extract_background(
    project_id: str, background: dict[str, Any], data_url: str, files: ProjectFiles
) -> None:
    """Remplace une data-URL de fond par un asset fichier (lève AssetError)."""
    mime, data = decode_data_url(data_url)
    asset_id, _size = files.store_background(project_id, data, mime, MAX_UPLOAD_BYTES)
    background["assetId"] = asset_id
    background["mimeType"] = mime
    background["imageUrl"] = ""


def _migrate_v1_projects(projects: dict[str, dict[str, Any]], files: ProjectFiles) -> None:
    """Migration 1 -> 2 (exécuteur) : révision, schema_version, fonds en fichiers."""
    for project_id, project in projects.items():
        if _revision_of(project) < 1:
            project["revision"] = 1
        project["schema_version"] = PROJECT_SCHEMA_VERSION
        # En v1, le canevas figeait tapAction='toggle' au dépôt : ce n'était pas un
        # choix de l'utilisateur, on revient à l'action par défaut du domaine.
        bindings = project.get("bindings")
        if isinstance(bindings, list):
            for binding in bindings:
                if isinstance(binding, dict) and binding.get("tapAction") == "toggle":
                    del binding["tapAction"]
        background = project.get("background")
        if not isinstance(background, dict):
            continue
        image_url = background.get("imageUrl")
        if isinstance(image_url, str) and image_url.startswith("data:"):
            try:
                _extract_background(project_id, background, image_url, files)
            except (AssetError, OSError) as err:
                _LOGGER.warning(
                    "Could not extract the background image of project %s, keeping it inline: %s",
                    project_id,
                    err,
                )


def _validate_project(project: dict[str, Any]) -> None:
    """Validation légère des types (lève InvalidProjectError)."""
    name = project.get("name")
    if name is None or name == "":
        project["name"] = "Plan"
    elif not isinstance(name, str) or len(name) > _MAX_NAME_LENGTH:
        raise InvalidProjectError("name must be a string of at most 200 characters")
    category = project.get("category")
    if category is not None and (not isinstance(category, str) or len(category) > _MAX_CATEGORY_LENGTH):
        raise InvalidProjectError("category must be a string of at most 64 characters")
    for field in _LIST_FIELDS:
        value = project.get(field)
        if value is None:
            project[field] = []
        elif not isinstance(value, list) or not all(isinstance(item, dict) for item in value):
            raise InvalidProjectError(f"{field} must be a list of objects")
    for field in _OBJECT_FIELDS:
        value = project.get(field)
        if value is not None and not isinstance(value, dict):
            raise InvalidProjectError(f"{field} must be an object")
    for field in _NUMBER_FIELDS:
        value = project.get(field)
        if value is not None and (
            isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value)
        ):
            raise InvalidProjectError(f"{field} must be a finite number")
    created_at = project.get("created_at")
    if created_at is not None and not isinstance(created_at, str):
        raise InvalidProjectError("created_at must be a string")


def _prepare_project(raw: dict[str, Any], files: ProjectFiles) -> dict[str, Any]:
    """Prépare un projet reçu pour le stockage (exécuteur).

    Retire les champs serveur et runtime, valide les types, contrôle la taille,
    extrait une data-URL de fond vers un asset et rattache un asset d'un autre projet.
    """
    project = {
        key: value
        for key, value in raw.items()
        if key not in _SERVER_FIELDS and not key.startswith("_")
    }
    _validate_project(project)
    project_id: str = project["id"]

    data_url: str | None = None
    background = project.get("background")
    if background is not None:
        background = dict(background)
        project["background"] = background
        image_url = background.get("imageUrl")
        if isinstance(image_url, str) and image_url.startswith("data:"):
            data_url = image_url
            background["imageUrl"] = ""
        elif not (
            isinstance(image_url, str)
            and len(image_url) <= _MAX_IMAGE_URL_LENGTH
            and (image_url == "" or _EXTERNAL_IMAGE_URL_RE.match(image_url))
        ):
            background["imageUrl"] = ""  # blob:, javascript:, type inattendu...

    size = len(json.dumps(project, ensure_ascii=False, separators=(",", ":")).encode("utf-8"))
    if size > MAX_PROJECT_BYTES:
        raise PayloadTooLargeError(size, MAX_PROJECT_BYTES)

    if background is None:
        return project
    if data_url is not None:
        try:
            _extract_background(project_id, background, data_url, files)
        except AssetError as err:
            raise InvalidProjectError(f"invalid background image: {err}") from err
        return project
    asset_id = background.get("assetId")
    if asset_id is None or asset_id == "":
        background.pop("assetId", None)
        return project
    if not isinstance(asset_id, str) or ASSET_ID_RE.match(asset_id) is None:
        raise InvalidProjectError("invalid background.assetId")
    adopted = files.adopt_background(asset_id, project_id)
    if adopted is None:
        _LOGGER.warning("Background asset %s of project %s does not exist", asset_id, project_id)
    else:
        background["assetId"] = adopted
    return project


class _ProjectStore(Store[StoreData]):
    """Store avec migration 1 -> 2 et remontée des erreurs d'écriture."""

    def __init__(self, hass: HomeAssistant, files: ProjectFiles) -> None:
        super().__init__(
            hass,
            STORAGE_VERSION,
            STORAGE_KEY,
            atomic_writes=True,
            minor_version=STORAGE_MINOR_VERSION,
        )
        self._files = files
        self.last_write_error: Exception | None = None

    async def _async_migrate_func(
        self, old_major_version: int, old_minor_version: int, old_data: Any
    ) -> StoreData:
        data = _coerce_data(old_data)
        if old_major_version < 2:
            await self.hass.async_add_executor_job(_migrate_v1_projects, data["projects"], self._files)
        return data

    async def _async_write_data(self, *args: Any) -> None:
        # Store journalise et avale WriteError : on mémorise l'erreur pour la remonter.
        try:
            await super()._async_write_data(*args)
        except Exception as err:
            self.last_write_error = err
            raise


class HomeArchitectStorage:
    """Manages persistence of floor plans, background images and published plans."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.files = ProjectFiles(
            Path(hass.config.config_dir),
            Path(hass.config.path(DATA_DIR_NAME)),
            Path(hass.config.path("www")),
        )
        self._store = _ProjectStore(hass, self.files)
        self._data: StoreData = {"projects": {}, "publications": {}}
        self._lock = asyncio.Lock()

    @property
    def _projects(self) -> dict[str, dict[str, Any]]:
        return self._data["projects"]

    @property
    def _publications(self) -> dict[str, dict[str, Any]]:
        return self._data["publications"]

    async def async_load(self) -> None:
        """Load stored projects from disk (migrating them if needed)."""
        self._data = _coerce_data(await self._store.async_load())

    async def _async_commit(self, new_data: StoreData) -> None:
        """Écrit `new_data` puis la rend courante ; l'état mémoire reste inchangé en cas d'échec."""
        self._store.last_write_error = None
        try:
            await self._store.async_save(new_data)
        except Exception as err:
            _LOGGER.error("Failed to write Home Architect storage: %s", err)
            raise StorageWriteError("storage write failed") from err
        if (error := self._store.last_write_error) is not None:
            raise StorageWriteError("storage write failed") from error
        self._data = new_data

    @callback
    def _async_notify(self, project_id: str, revision: int, deleted: bool = False) -> None:
        event: dict[str, Any] = {"project_id": project_id, "revision": revision}
        if deleted:
            event["deleted"] = True
        async_dispatcher_send(self.hass, SIGNAL_PROJECT_UPDATED, event)

    # --- Lecture ----------------------------------------------------------

    def _publish_info(self, project_id: str, legacy_exists: bool) -> dict[str, Any] | None:
        publication = self._publications.get(project_id)
        if publication is None:
            return None
        return _format_publish_info(project_id, publication, legacy_exists)

    async def _async_existing_legacy(self, project_ids: list[str]) -> set[str]:
        published = [pid for pid in project_ids if pid in self._publications]
        if not published:
            return set()
        return await self.hass.async_add_executor_job(self.files.existing_legacy, published)

    async def async_list_projects(self) -> list[dict[str, Any]]:
        """Résumés de tous les projets (sans géométrie)."""
        projects = self._projects
        legacy = await self._async_existing_legacy(list(projects))
        summaries: list[dict[str, Any]] = []
        for project_id, project in projects.items():
            background = project.get("background")
            summaries.append(
                {
                    "id": project_id,
                    "name": project.get("name") if isinstance(project.get("name"), str) else "",
                    "category": project.get("category"),
                    "created_at": project.get("created_at"),
                    "updated_at": project.get("updated_at"),
                    "revision": _revision_of(project),
                    "has_background": isinstance(background, dict)
                    and bool(background.get("assetId") or background.get("imageUrl")),
                    "publish": self._publish_info(project_id, project_id in legacy),
                    "counts": {
                        field: len(project[field]) if isinstance(project.get(field), list) else 0
                        for field in ("walls", "rooms", "bindings", "furniture")
                    },
                }
            )
        return summaries

    async def async_get_project(self, project_id: str) -> dict[str, Any] | None:
        """Projet complet avec `publish` injecté (copie de surface)."""
        project = self._projects.get(project_id)
        if project is None:
            return None
        result = dict(project)
        legacy = await self._async_existing_legacy([project_id])
        if (publish := self._publish_info(project_id, project_id in legacy)) is not None:
            result["publish"] = publish
        return result

    async def async_get_projects(self) -> list[dict[str, Any]]:
        """Tous les projets complets (commande dépréciée get_projects)."""
        legacy = await self._async_existing_legacy(list(self._projects))
        results: list[dict[str, Any]] = []
        for project_id, project in self._projects.items():
            result = dict(project)
            if (publish := self._publish_info(project_id, project_id in legacy)) is not None:
                result["publish"] = publish
            results.append(result)
        return results

    def published_entry(self, filename: str) -> tuple[Path, str] | None:
        """(chemin, empreinte) d'un plan publié, ou None si le nom n'est pas publié."""
        if PUBLISHED_FILENAME_RE.match(filename) is None:
            return None
        for project_id, publication in self._publications.items():
            if published_filename(project_id, publication["token"]) == filename:
                return self.files.published / filename, publication["hash"]
        return None

    # --- Écriture ---------------------------------------------------------

    async def async_save_project(
        self,
        project: dict[str, Any],
        expected_revision: int | None = None,
        force: bool = False,
    ) -> dict[str, Any]:
        """Enregistre un projet avec contrôle de révision.

        Sans `expected_revision` (ou 0), le projet ne doit pas encore exister.
        """
        project_id = project.get("id")
        if not isinstance(project_id, str) or _PROJECT_ID_RE.match(project_id) is None:
            raise InvalidProjectError("invalid project id")
        async with self._lock:
            existing = self._projects.get(project_id)
            current = _revision_of(existing)
            if not force and (expected_revision or 0) != current:
                raise RevisionConflictError(current)
            if existing is None and len(self._projects) >= MAX_PROJECTS:
                raise TooManyProjectsError(f"at most {MAX_PROJECTS} projects can be stored")
            try:
                prepared = await self.hass.async_add_executor_job(_prepare_project, project, self.files)
            except OSError as err:
                _LOGGER.error("Failed to store the background image of project %s: %s", project_id, err)
                raise StorageWriteError("background write failed") from err

            now = dt_util.utcnow().isoformat()
            created_at = existing.get("created_at") if existing is not None else None
            if not isinstance(created_at, str):
                created_at = prepared.get("created_at") if isinstance(prepared.get("created_at"), str) else now
            prepared.update(
                {
                    "created_at": created_at,
                    "updated_at": now,
                    "revision": current + 1,
                    "schema_version": PROJECT_SCHEMA_VERSION,
                }
            )
            await self._async_commit(
                {
                    "projects": {**self._projects, project_id: prepared},
                    "publications": self._publications,
                }
            )
            asset_id = _asset_id_of(prepared)
            await self._async_remove_backgrounds(
                project_id,
                {asset_id} if asset_id else set(),
                ASSET_GRACE_PERIOD.total_seconds(),
                released=_asset_id_of(existing) if existing is not None else None,
            )
        self._async_notify(project_id, prepared["revision"])
        return {"id": project_id, "revision": prepared["revision"], "updated_at": now, "asset_id": asset_id}

    async def async_delete_project(self, project_id: str) -> list[str]:
        """Supprime un projet et tous ses fichiers ; retourne les fichiers supprimés."""
        async with self._lock:
            project = self._projects.get(project_id)
            if project is None:
                raise ProjectNotFoundError(f"project {project_id} not found")
            publication = self._publications.get(project_id)
            await self._async_commit(
                {
                    "projects": {k: v for k, v in self._projects.items() if k != project_id},
                    "publications": {k: v for k, v in self._publications.items() if k != project_id},
                }
            )
            removed = await self._async_remove_backgrounds(project_id, set(), None)
            removed += await self._async_unpublish_files(project_id, publication)
        self._async_notify(project_id, _revision_of(project), deleted=True)
        return removed

    async def async_publish_svg(
        self, project_id: str, svg: str, include_background: bool
    ) -> dict[str, Any]:
        """Assainit, écrit et référence le plan publié ; retourne PublishInfo."""
        async with self._lock:
            project = self._projects.get(project_id)
            if project is None:
                raise ProjectNotFoundError(f"project {project_id} not found")
            previous = self._publications.get(project_id)
            token = previous["token"] if previous else secrets.token_urlsafe(24)
            try:
                digest, legacy_exists = await self.hass.async_add_executor_job(
                    self.files.publish,
                    project_id,
                    token,
                    svg,
                    include_background,
                    previous["hash"] if previous else None,
                )
            except SvgSanitizeError as err:
                raise InvalidSvgError(str(err)) from err
            except OSError as err:
                _LOGGER.error("Failed to write the published plan of project %s: %s", project_id, err)
                raise StorageWriteError("publish write failed") from err
            publication = {
                "token": token,
                "hash": digest,
                "published_at": dt_util.utcnow().isoformat(),
                "include_background": include_background,
            }
            await self._async_commit(
                {
                    "projects": self._projects,
                    "publications": {**self._publications, project_id: publication},
                }
            )
        self._async_notify(project_id, _revision_of(project))
        return _format_publish_info(project_id, publication, legacy_exists)

    async def async_unpublish(self, project_id: str) -> list[str]:
        """Retire la publication (le prochain publish génère un nouveau jeton)."""
        async with self._lock:
            project = self._projects.get(project_id)
            if project is None:
                raise ProjectNotFoundError(f"project {project_id} not found")
            publication = self._publications.get(project_id)
            if publication is not None:
                await self._async_commit(
                    {
                        "projects": self._projects,
                        "publications": {
                            k: v for k, v in self._publications.items() if k != project_id
                        },
                    }
                )
            removed = await self._async_unpublish_files(project_id, publication)
        self._async_notify(project_id, _revision_of(project))
        return removed

    async def async_store_background(self, project_id: str, data: bytes, mime: str) -> dict[str, Any]:
        """Stocke une image de fond téléversée ; retourne {asset_id, mime_type, size}."""
        try:
            # Sous le verrou : un nettoyage concurrent ne peut pas supprimer un asset
            # identique (même contenu, même nom) entre sa détection et son rafraîchissement.
            async with self._lock:
                asset_id, size = await self.hass.async_add_executor_job(
                    self.files.store_background, project_id, data, mime, MAX_UPLOAD_BYTES
                )
        except AssetError as err:
            raise InvalidImageError(str(err)) from err
        except OSError as err:
            _LOGGER.error("Failed to store a background image for project %s: %s", project_id, err)
            raise StorageWriteError("background write failed") from err
        return {"asset_id": asset_id, "mime_type": mime, "size": size}

    async def async_collect_garbage(self) -> None:
        """Supprime les assets orphelins anciens et les plans publiés non référencés."""
        async with self._lock:
            referenced = {
                asset_id for project in self._projects.values() if (asset_id := _asset_id_of(project))
            }
            published = {
                published_filename(project_id, publication["token"])
                for project_id, publication in self._publications.items()
            }
            removed = await self._async_remove_backgrounds(
                None, referenced, ASSET_GRACE_PERIOD.total_seconds()
            )
            try:
                removed += await self.hass.async_add_executor_job(
                    self.files.remove_stale_published, published
                )
            except OSError as err:
                _LOGGER.warning("Could not clean published plans: %s", err)
        if removed:
            _LOGGER.debug("Removed unreferenced Home Architect files: %s", removed)

    async def async_remove_public_files(self) -> list[str]:
        """Retire toutes les publications (suppression de l'intégration)."""
        async with self._lock:
            publications = self._publications
            if publications:
                try:
                    await self._async_commit({"projects": self._projects, "publications": {}})
                except StorageWriteError:
                    _LOGGER.warning("Could not clear the publications from storage")
            removed: list[str] = []
            for project_id in list(self._projects):
                removed += await self._async_unpublish_files(project_id, publications.get(project_id))
            try:
                removed += await self.hass.async_add_executor_job(
                    self.files.remove_stale_published, set()
                )
            except OSError as err:
                _LOGGER.warning("Could not clean published plans: %s", err)
        return removed

    async def _async_remove_backgrounds(
        self,
        project_id: str | None,
        keep: set[str],
        min_age: float | None,
        released: str | None = None,
    ) -> list[str]:
        try:
            return await self.hass.async_add_executor_job(
                self.files.remove_backgrounds, project_id, keep, min_age, released
            )
        except OSError as err:
            _LOGGER.warning("Could not clean background images: %s", err)
            return []

    async def _async_unpublish_files(
        self, project_id: str, publication: dict[str, Any] | None
    ) -> list[str]:
        try:
            return await self.hass.async_add_executor_job(
                self.files.unpublish,
                project_id,
                publication["token"] if publication else None,
                publication["hash"] if publication else None,
            )
        except OSError as err:
            _LOGGER.warning("Could not remove the published files of project %s: %s", project_id, err)
            return []
