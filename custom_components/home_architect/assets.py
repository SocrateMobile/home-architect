"""Fichiers privés de l'intégration : images de fond, SVG publiés et sauvegardes.

Arborescence (sous /config) :
  home_architect/backgrounds/<project_id>-<sha256[:12]>.<ext>   images de fond
  home_architect/published/<project_id>-<jeton>.svg             plans publiés
  home_architect/backups/plan_<project_id>-<horodatage>.svg     copies d'anciens fichiers www modifiés hors de l'outil
  www/plan_<project_id>.svg                                     anciens plans publics (1.0.x), mis à jour s'ils existent

Toutes les méthodes sont SYNCHRONES (E/S disque) : à appeler via
hass.async_add_executor_job. Module sans import Home Assistant.
"""
from __future__ import annotations

import base64
import binascii
from contextlib import suppress
import hashlib
import logging
import os
from pathlib import Path
import re
import tempfile
import time
from urllib.parse import unquote_to_bytes

from .svg_sanitizer import SvgSanitizeError, detect_raster_mime, sanitize_svg

_LOGGER = logging.getLogger(__name__)

# Type MIME -> extension des images de fond acceptées
BACKGROUND_TYPES: dict[str, str] = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
}
EXTENSION_TYPES: dict[str, str] = {ext: mime for mime, ext in BACKGROUND_TYPES.items()}
_MIME_ALIASES = {"image/jpg": "image/jpeg", "image/pjpeg": "image/jpeg"}

ASSET_ID_RE = re.compile(
    r"^(?P<project>[a-zA-Z0-9_-]{1,64})-(?P<digest>[0-9a-f]{12})\.(?P<ext>png|jpg|webp|gif|svg)$"
)
PUBLISHED_FILENAME_RE = re.compile(r"^[a-zA-Z0-9_-]{1,64}-[A-Za-z0-9_-]{20,64}\.svg$")
PUBLISH_TOKEN_RE = re.compile(r"^[A-Za-z0-9_-]{20,64}$")
_DATA_URL_RE = re.compile(
    r"^data:(?P<mime>[\w.+/-]+)(?P<params>(?:;[^,;]*)*),(?P<payload>.*)$", re.DOTALL
)


class AssetError(ValueError):
    """Image refusée (type non pris en charge, contenu invalide ou trop volumineux)."""


def content_hash(data: bytes) -> str:
    """Empreinte courte (ETag, paramètre ?v= du plan publié)."""
    return hashlib.sha256(data).hexdigest()[:16]


def normalize_mime(value: str | None) -> str | None:
    """Type MIME accepté pour une image de fond, sinon None."""
    if not value:
        return None
    mime = value.split(";", 1)[0].strip().lower()
    mime = _MIME_ALIASES.get(mime, mime)
    return mime if mime in BACKGROUND_TYPES else None


def published_filename(project_id: str, token: str) -> str:
    """Nom du fichier publié (non devinable grâce au jeton)."""
    return f"{project_id}-{token}.svg"


def asset_belongs_to(asset_id: str, project_id: str) -> bool:
    """True si `asset_id` est un nom d'asset valide appartenant à `project_id`."""
    match = ASSET_ID_RE.match(asset_id)
    return match is not None and match.group("project") == project_id


def decode_data_url(url: str) -> tuple[str, bytes]:
    """Décode une data-URL d'image (base64 ou encodée en pourcentage)."""
    match = _DATA_URL_RE.match(url)
    if match is None:
        raise AssetError("invalid data URL")
    mime = normalize_mime(match.group("mime"))
    if mime is None:
        raise AssetError("unsupported image type")
    params = {p.strip().lower() for p in match.group("params").split(";") if p.strip()}
    payload = match.group("payload")
    if "base64" not in params:
        return mime, unquote_to_bytes(payload)
    try:
        return mime, base64.b64decode("".join(payload.split()), validate=True)
    except (binascii.Error, ValueError) as err:
        raise AssetError("invalid base64 payload") from err


def prepare_background(data: bytes, mime: str, max_bytes: int) -> bytes:
    """Valide l'image et retourne les octets à stocker (SVG assaini)."""
    if not data:
        raise AssetError("empty image")
    if len(data) > max_bytes:
        raise AssetError("image too large")
    if mime == "image/svg+xml":
        try:
            return sanitize_svg(data).encode("utf-8")
        except SvgSanitizeError as err:
            raise AssetError(f"rejected SVG: {err}") from err
    if detect_raster_mime(data) != mime:
        raise AssetError("content does not match the declared image type")
    return data


def atomic_write(path: Path, data: bytes) -> None:
    """Écrit `data` dans un fichier temporaire du même dossier puis le renomme."""
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, tmp_name = tempfile.mkstemp(dir=path.parent, prefix=f".{path.name}.", suffix=".tmp")
    try:
        with os.fdopen(fd, "wb") as handle:
            handle.write(data)
            handle.flush()
            os.fsync(handle.fileno())
        os.chmod(tmp_name, 0o644)
        os.replace(tmp_name, path)
    except BaseException:
        with suppress(FileNotFoundError):
            os.unlink(tmp_name)
        raise


class ProjectFiles:
    """Accès disque aux fichiers d'un ensemble de projets."""

    def __init__(self, config_dir: Path, data_dir: Path, www_dir: Path) -> None:
        self._config_dir = config_dir
        self.backgrounds = data_dir / "backgrounds"
        self.published = data_dir / "published"
        self.backups = data_dir / "backups"
        self._www = www_dir

    def _relative(self, path: Path) -> str:
        try:
            return path.relative_to(self._config_dir).as_posix()
        except ValueError:
            return path.as_posix()

    def _unlink(self, path: Path) -> str | None:
        """Supprime un fichier ; retourne son chemin relatif s'il a été supprimé."""
        try:
            path.unlink()
        except FileNotFoundError:
            return None
        except OSError as err:
            _LOGGER.warning("Could not remove %s: %s", path, err)
            return None
        return self._relative(path)

    # --- Images de fond -------------------------------------------------

    def store_background(
        self, project_id: str, data: bytes, mime: str, max_bytes: int
    ) -> tuple[str, int]:
        """Stocke une image de fond ; retourne (asset_id, taille stockée)."""
        content = prepare_background(data, mime, max_bytes)
        asset_id = f"{project_id}-{hashlib.sha256(content).hexdigest()[:12]}.{BACKGROUND_TYPES[mime]}"
        self._write_or_touch(self.backgrounds / asset_id, content)
        return asset_id, len(content)

    def background_path(self, project_id: str, asset_id: str) -> Path | None:
        """Chemin d'un asset de `project_id`, ou None si l'identifiant est refusé."""
        if not asset_belongs_to(asset_id, project_id):
            return None
        return self.backgrounds / asset_id

    def adopt_background(self, asset_id: str, project_id: str) -> str | None:
        """Rattache à `project_id` un asset d'un autre projet (« Enregistrer sous »).

        Les noms étant dérivés du contenu, la copie porte la même empreinte.
        Retourne le nouvel asset_id, ou None si la source n'existe pas.
        """
        match = ASSET_ID_RE.match(asset_id)
        if match is None:
            return None
        if match.group("project") == project_id:
            return asset_id
        target_id = f"{project_id}-{match.group('digest')}.{match.group('ext')}"
        try:
            content = (self.backgrounds / asset_id).read_bytes()
        except FileNotFoundError:
            return None
        self._write_or_touch(self.backgrounds / target_id, content)
        return target_id

    def remove_backgrounds(
        self,
        project_id: str | None,
        keep: set[str],
        min_age: float | None,
        released: str | None = None,
    ) -> list[str]:
        """Supprime les assets de `project_id` (tous projets si None) absents de `keep`.

        `min_age` (secondes) : seuls les fichiers non modifiés depuis ce délai sont supprimés.
        `released` : asset qui vient d'être déréférencé ; sa date est rafraîchie pour que le
        délai de grâce coure à partir de maintenant (annulation après sauvegarde), et non
        depuis son téléversement.
        """
        if released is not None and released not in keep and ASSET_ID_RE.match(released):
            with suppress(FileNotFoundError):
                os.utime(self.backgrounds / released)
        try:
            entries = list(self.backgrounds.iterdir())
        except FileNotFoundError:
            return []
        now = time.time()
        removed: list[str] = []
        for path in entries:
            match = ASSET_ID_RE.match(path.name)
            if match is None or path.name in keep:
                continue
            if project_id is not None and match.group("project") != project_id:
                continue
            if min_age is not None:
                try:
                    if now - path.stat().st_mtime < min_age:
                        continue
                except FileNotFoundError:
                    continue
            if (relative := self._unlink(path)) is not None:
                removed.append(relative)
        return removed

    def _write_or_touch(self, path: Path, content: bytes) -> None:
        if path.is_file():
            os.utime(path)  # repousse le nettoyage différé
        else:
            atomic_write(path, content)

    # --- Plans publiés ----------------------------------------------------

    def publish(
        self,
        project_id: str,
        token: str,
        svg: str,
        include_background: bool,
        previous_hash: str | None,
    ) -> tuple[str, bool]:
        """Assainit et écrit le plan publié (et l'ancien fichier www s'il existe).

        Retourne (empreinte, ancien_fichier_www_mis_à_jour). Lève SvgSanitizeError.
        """
        content = sanitize_svg(svg, drop_images=not include_background).encode("utf-8")
        digest = content_hash(content)
        atomic_write(self.published / published_filename(project_id, token), content)
        legacy = self.legacy_path(project_id)
        if not legacy.is_file():
            return digest, False
        self._backup_if_modified(project_id, legacy, previous_hash)
        atomic_write(legacy, content)
        return digest, True

    def unpublish(self, project_id: str, token: str | None, previous_hash: str | None) -> list[str]:
        """Supprime le plan publié et l'ancien fichier www (copie conservée s'il a été retouché)."""
        removed: list[str] = []
        if token is not None and (
            relative := self._unlink(self.published / published_filename(project_id, token))
        ) is not None:
            removed.append(relative)
        legacy = self.legacy_path(project_id)
        if legacy.is_file():
            self._backup_if_modified(project_id, legacy, previous_hash)
            if (relative := self._unlink(legacy)) is not None:
                removed.append(relative)
        return removed

    def remove_stale_published(self, keep: set[str]) -> list[str]:
        """Supprime les fichiers publiés qui ne correspondent à aucune publication."""
        try:
            entries = list(self.published.iterdir())
        except FileNotFoundError:
            return []
        removed: list[str] = []
        for path in entries:
            if (
                PUBLISHED_FILENAME_RE.match(path.name)
                and path.name not in keep
                and (relative := self._unlink(path)) is not None
            ):
                removed.append(relative)
        return removed

    def legacy_path(self, project_id: str) -> Path:
        """Ancien emplacement public /config/www/plan_<id>.svg (servi sous /local/)."""
        return self._www / f"plan_{project_id}.svg"

    def save_svg_to_www(self, filename: str, svg: str) -> str:
        """Assainit et enregistre un fichier SVG directement dans www/ (ex: plan_rdc.svg)."""
        safe_name = Path(filename).name
        if not safe_name.endswith(".svg"):
            safe_name += ".svg"
        content = sanitize_svg(svg, drop_images=False).encode("utf-8")
        target_path = self._www / safe_name
        atomic_write(target_path, content)
        return f"/local/{safe_name}"

    def existing_legacy(self, project_ids: list[str]) -> set[str]:
        """Projets dont l'ancien fichier www existe encore."""
        return {pid for pid in project_ids if self.legacy_path(pid).is_file()}

    def _backup_if_modified(self, project_id: str, path: Path, known_hash: str | None) -> None:
        """Copie un ancien fichier www dans backups/ s'il a été modifié hors de l'outil."""
        current = path.read_bytes()
        if known_hash is not None and content_hash(current) == known_hash:
            return
        stamp = time.strftime("%Y%m%d-%H%M%S")
        atomic_write(self.backups / f"plan_{project_id}-{stamp}.svg", current)
        _LOGGER.info("Backed up %s to %s before replacing it", path, self.backups)
