"""Tests du module d'installation de mise à jour."""
from __future__ import annotations

import io
from pathlib import Path
from unittest.mock import AsyncMock, MagicMock, patch
import zipfile

import pytest

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError

from custom_components.home_architect.installer import (
    _async_download_github_archive,
    _async_try_hacs_install,
    _extract_and_replace,
    async_install_update,
)


def _make_dummy_zip() -> bytes:
    """Crée une archive zip en mémoire contenant l'arborescence requise."""
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as zf:
        prefix = "home-architect-9.5.0/custom_components/home_architect/"
        zf.writestr(f"{prefix}manifest.json", '{"version": "9.5.0"}')
        zf.writestr(f"{prefix}__init__.py", "# init")
        zf.writestr(f"{prefix}frontend/home_architect-panel.js", "// panel")
        zf.writestr(f"{prefix}frontend/chunks/chunk-abc.js", "// chunk")
    return buf.getvalue()


async def test_try_hacs_install_success(hass: HomeAssistant) -> None:
    """Délégation réussie à HACS."""
    repo = MagicMock()
    repo.async_install = AsyncMock()
    hacs = MagicMock()
    hacs.async_get_repository = AsyncMock(return_value=repo)
    hass.data["hacs"] = hacs

    success = await _async_try_hacs_install(hass, "9.5.0")
    assert success is True
    repo.async_install.assert_awaited_once_with(version="9.5.0")


async def test_try_hacs_install_not_present(hass: HomeAssistant) -> None:
    """Quand HACS n'est pas installé, retourne False sans erreur."""
    hass.data.pop("hacs", None)
    assert await _async_try_hacs_install(hass, "9.5.0") is False


def test_extract_and_replace_success(hass: HomeAssistant, tmp_path: Path) -> None:
    """Extraction et remplacement propre dans custom_components/home_architect."""
    dest = tmp_path / "custom_components" / "home_architect"
    dest.mkdir(parents=True)
    # Pré-créer un ancien chunk
    old_chunks = dest / "frontend" / "chunks"
    old_chunks.mkdir(parents=True)
    (old_chunks / "old-chunk.js").write_text("old")

    with patch.object(hass.config, "path", return_value=str(dest)):
        _extract_and_replace(hass, "9.5.0", _make_dummy_zip())

    assert (dest / "manifest.json").is_file()
    assert (dest / "__init__.py").is_file()
    assert (dest / "frontend" / "home_architect-panel.js").is_file()
    assert (dest / "frontend" / "chunks" / "chunk-abc.js").is_file()
    assert not (dest / "frontend" / "chunks" / "old-chunk.js").exists()


def test_extract_and_replace_rejects_zip_slip(hass: HomeAssistant, tmp_path: Path) -> None:
    """Rejette les chemins tentant d'échapper au dossier (Zip Slip)."""
    dest = tmp_path / "custom_components" / "home_architect"
    dest.mkdir(parents=True)

    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as zf:
        prefix = "home-architect-9.5.0/custom_components/home_architect/"
        zf.writestr(f"{prefix}manifest.json", '{"version": "9.5.0"}')
        zf.writestr(f"{prefix}__init__.py", "# init")
        zf.writestr(f"{prefix}../../evil.txt", "evil")

    with patch.object(hass.config, "path", return_value=str(dest)):
        with pytest.raises(HomeAssistantError, match="Chemin non sécurisé"):
            _extract_and_replace(hass, "9.5.0", buf.getvalue())


async def test_async_install_update_invalid_version(hass: HomeAssistant) -> None:
    """Rejette une version non conforme."""
    with pytest.raises(HomeAssistantError, match="Version invalide"):
        await async_install_update(hass, "invalid-ver")


async def test_async_install_update_end_to_end(hass: HomeAssistant) -> None:
    """Parcours complet : pas de HACS -> téléchargement GitHub -> extraction."""
    hass.data.pop("hacs", None)
    zip_data = _make_dummy_zip()

    with (
        patch("custom_components.home_architect.installer._async_download_github_archive", new_callable=AsyncMock, return_value=zip_data),
        patch("custom_components.home_architect.installer._extract_and_replace") as mock_extract,
    ):
        await async_install_update(hass, "9.5.0")
        mock_extract.assert_called_once()
