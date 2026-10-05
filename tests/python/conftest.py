"""Fixtures communes aux tests d'intégration Home Assistant."""
from __future__ import annotations

from typing import Any

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.test_util.aiohttp import AiohttpClientMocker

from homeassistant.core import HomeAssistant

from custom_components.home_architect.const import (
    CONF_SHOW_SIDEBAR_PANEL,
    DOMAIN,
    GITHUB_LATEST_RELEASE_URL,
    VERSION,
)


@pytest.fixture
def hass_config_dir(hass_tmp_config_dir: str) -> str:
    """Dossier de configuration temporaire (fichiers écrits par l'intégration)."""
    return hass_tmp_config_dir


@pytest.fixture
def github_release() -> dict[str, Any]:
    """Réponse de /releases/latest (par défaut : version installée)."""
    return {
        "tag_name": f"v{VERSION}",
        "name": f"Home Architect {VERSION}",
        "body": "## Notes",
        "html_url": f"https://github.com/SocrateMobile/home-architect/releases/tag/v{VERSION}",
        "draft": False,
        "prerelease": False,
    }


@pytest.fixture
def mock_github(aioclient_mock: AiohttpClientMocker, github_release: dict[str, Any]) -> AiohttpClientMocker:
    """Intercepte l'appel à l'API GitHub."""
    aioclient_mock.get(GITHUB_LATEST_RELEASE_URL, json=github_release)
    return aioclient_mock


@pytest.fixture
def config_entry(hass: HomeAssistant, enable_custom_integrations: None) -> MockConfigEntry:
    """Entrée de configuration ajoutée (non chargée)."""
    entry = MockConfigEntry(domain=DOMAIN, title="Home Architect", data={CONF_SHOW_SIDEBAR_PANEL: True})
    entry.add_to_hass(hass)
    return entry


@pytest.fixture
async def setup_integration(
    hass: HomeAssistant, config_entry: MockConfigEntry, mock_github: AiohttpClientMocker
) -> MockConfigEntry:
    """Intégration chargée."""
    assert await hass.config_entries.async_setup(config_entry.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    return config_entry
