"""Installation de mise à jour de Home Architect."""
from __future__ import annotations

import io
import logging
from pathlib import Path
import shutil
import tempfile
import zipfile

import aiohttp

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import VERSION
from .version_utils import normalize_version

_LOGGER = logging.getLogger(__name__)

_DOWNLOAD_TIMEOUT = aiohttp.ClientTimeout(total=60)
_GITHUB_ARCHIVE_URL = "https://github.com/SocrateMobile/home-architect/archive/refs/tags/{tag}.zip"


async def async_install_update(hass: HomeAssistant, version: str) -> None:
    """Télécharge et installe une version de Home Architect dans custom_components/home_architect."""
    norm_version = normalize_version(version)
    if norm_version is None:
        raise HomeAssistantError(f"Version invalide : {version}")

    # 1. Tenter via HACS si présent
    if await _async_try_hacs_install(hass, norm_version):
        _LOGGER.info("Mise à jour vers v%s effectuée via HACS", norm_version)
        return

    # 2. Téléchargement direct depuis GitHub
    zip_bytes = await _async_download_github_archive(hass, norm_version)

    # 3. Extraction et remplacement sécurisé dans un thread executor
    await hass.async_add_executor_job(_extract_and_replace, hass, norm_version, zip_bytes)
    _LOGGER.info(
        "Mise à jour vers v%s installée avec succès dans custom_components/home_architect", norm_version
    )


async def _async_try_hacs_install(hass: HomeAssistant, version: str) -> bool:
    """Tente la mise à jour par l'API HACS si disponible."""
    hacs = hass.data.get("hacs")
    if hacs is None:
        return False
    try:
        repo = None
        if hasattr(hacs, "async_get_repository"):
            repo = await hacs.async_get_repository("SocrateMobile/home-architect")
        elif hasattr(hacs, "get_by_name"):
            repo = hacs.get_by_name("SocrateMobile/home-architect") or hacs.get_by_name("home-architect")
        elif hasattr(hacs, "repositories"):
            repos = hacs.repositories
            if hasattr(repos, "get_by_full_name"):
                repo = repos.get_by_full_name("SocrateMobile/home-architect")
            if not repo and hasattr(repos, "list_all"):
                for r in repos.list_all:
                    if getattr(getattr(r, "data", None), "full_name", "") == "SocrateMobile/home-architect":
                        repo = r
                        break
        if repo and hasattr(repo, "async_install"):
            await repo.async_install(version=version)
            return True
    except Exception as err:
        _LOGGER.debug("Délégation à HACS non aboutie (%s), repli sur le téléchargement direct", err)
    return False


async def _async_download_github_archive(hass: HomeAssistant, version: str) -> bytes:
    """Télécharge l'archive zip de la release GitHub."""
    session = async_get_clientsession(hass)
    tags_to_try = [f"v{version}", version]
    last_status = None
    for tag in tags_to_try:
        url = _GITHUB_ARCHIVE_URL.format(tag=tag)
        try:
            async with session.get(url, timeout=_DOWNLOAD_TIMEOUT) as resp:
                if resp.status == 200:
                    return await resp.read()
                last_status = resp.status
        except (TimeoutError, aiohttp.ClientError) as err:
            _LOGGER.debug("Échec du téléchargement pour le tag %s: %s", tag, err)
    raise HomeAssistantError(
        f"Impossible de télécharger la mise à jour v{version} depuis GitHub (statut HTTP {last_status})"
    )


def _extract_and_replace(hass: HomeAssistant, version: str, zip_bytes: bytes) -> None:
    """Extrait l'archive et remplace les fichiers de custom_components/home_architect."""
    dest_dir = Path(hass.config.path("custom_components", "home_architect"))

    with zipfile.ZipFile(io.BytesIO(zip_bytes)) as zf:
        # Trouver le préfixe du dossier de l'intégration dans l'archive
        prefix = None
        for name in zf.namelist():
            if "custom_components/home_architect/manifest.json" in name:
                prefix = (
                    name[: name.index("custom_components/home_architect/")]
                    + "custom_components/home_architect/"
                )
                break

        if prefix is None:
            raise HomeAssistantError("L'archive téléchargée ne contient pas custom_components/home_architect")

        with tempfile.TemporaryDirectory(prefix="home_architect_update_") as tmp_dir:
            tmp_path = Path(tmp_dir)
            # Extraire de manière sécurisée (Zip Slip protection)
            for member in zf.infolist():
                if not member.filename.startswith(prefix) or member.filename.endswith("/"):
                    continue
                rel_name = member.filename[len(prefix) :]
                target_file = (tmp_path / rel_name).resolve()
                if not str(target_file).startswith(str(tmp_path.resolve())):
                    raise HomeAssistantError(f"Chemin non sécurisé dans l'archive : {member.filename}")
                target_file.parent.mkdir(parents=True, exist_ok=True)
                with zf.open(member) as src, open(target_file, "wb") as dst:
                    shutil.copyfileobj(src, dst)

            # Vérification minimale de l'intégrité
            if not (tmp_path / "manifest.json").is_file() or not (tmp_path / "__init__.py").is_file():
                raise HomeAssistantError("L'archive extraite est incomplète (manifest.json ou __init__.py manquant)")

            # Assurer que le dossier de destination existe
            dest_dir.mkdir(parents=True, exist_ok=True)

            # Nettoyer les anciens chunks frontend s'ils existent pour éviter d'accumuler des bundles obsolètes
            old_chunks = dest_dir / "frontend" / "chunks"
            if old_chunks.is_dir():
                try:
                    shutil.rmtree(old_chunks)
                except OSError as err:
                    _LOGGER.debug("Impossible de purger les anciens chunks : %s", err)

            # Copier les nouveaux fichiers dans dest_dir
            for item in tmp_path.iterdir():
                target = dest_dir / item.name
                if item.is_dir():
                    shutil.copytree(item, target, dirs_exist_ok=True)
                else:
                    shutil.copy2(item, target)
