"""Entité update (notification seulement) et commande check_updates."""
from __future__ import annotations

from typing import Any

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.test_util.aiohttp import AiohttpClientMocker
from pytest_homeassistant_custom_component.typing import WebSocketGenerator

from homeassistant.components.frontend import DATA_PANELS
from homeassistant.components.update import UpdateEntityFeature
from homeassistant.const import ATTR_SUPPORTED_FEATURES, STATE_OFF, STATE_ON
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import device_registry as dr, entity_registry as er

from custom_components.home_architect.const import DOMAIN, GITHUB_LATEST_RELEASE_URL, PANEL_URL_PATH, VERSION

ENTITY_ID = "update.home_architect"


@pytest.fixture
def github_release() -> dict[str, Any]:
    """Une version plus récente est publiée."""
    return {
        "tag_name": "v9.1.0",
        "name": "Home Architect 9.1.0 — " + "x" * 400,
        "body": "## Nouveautés\n- tout",
        "html_url": "https://github.com/SocrateMobile/home-architect/releases/tag/v9.1.0",
        "draft": False,
        "prerelease": False,
    }


async def test_entity_notifies_only(hass: HomeAssistant, setup_integration: MockConfigEntry) -> None:
    """entity_id stable, pas d'INSTALL, titre tronqué, appareil de type service."""
    state = hass.states.get(ENTITY_ID)
    assert state is not None
    assert state.state == STATE_ON
    assert state.attributes["installed_version"] == VERSION
    assert state.attributes["latest_version"] == "9.1.0"
    assert state.attributes[ATTR_SUPPORTED_FEATURES] == UpdateEntityFeature.RELEASE_NOTES
    assert len(state.attributes["release_summary"]) == 255
    assert state.attributes["release_url"].endswith("/v9.1.0")

    entity = er.async_get(hass).async_get(ENTITY_ID)
    assert entity is not None and entity.translation_key == "update"
    device = dr.async_get(hass).async_get(entity.device_id)
    assert device is not None and device.entry_type is dr.DeviceEntryType.SERVICE

    with pytest.raises(HomeAssistantError):
        await hass.services.async_call("update", "install", {"entity_id": ENTITY_ID}, blocking=True)


async def test_release_notes_and_panel_badge(
    hass: HomeAssistant, setup_integration: MockConfigEntry, hass_ws_client: WebSocketGenerator
) -> None:
    """Notes de version servies, badge du panneau retiré quand la version est ignorée."""
    assert hass.data[DATA_PANELS][PANEL_URL_PATH].sidebar_title.endswith("🔴")
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "update/release_notes", "entity_id": ENTITY_ID})
    assert (await client.receive_json())["result"] == "## Nouveautés\n- tout"

    await hass.services.async_call("update", "skip", {"entity_id": ENTITY_ID}, blocking=True)
    await hass.async_block_till_done(wait_background_tasks=True)
    assert hass.states.get(ENTITY_ID).state == STATE_OFF
    panel = hass.data[DATA_PANELS][PANEL_URL_PATH]
    assert panel.sidebar_title == "Home Architect"
    assert panel.require_admin is True


async def test_check_updates_command(
    hass: HomeAssistant,
    setup_integration: MockConfigEntry,
    hass_ws_client: WebSocketGenerator,
    aioclient_mock: AiohttpClientMocker,
) -> None:
    """Réponse UpdateStatus, cache de 10 min, forçage."""
    client = await hass_ws_client(hass)
    calls = aioclient_mock.call_count
    await client.send_json_auto_id({"type": "home_architect/check_updates"})
    response = await client.receive_json()
    assert response["result"] == {
        "installed_version": VERSION,
        "latest_version": "9.1.0",
        "update_available": True,
        "skipped_version": None,
        "release_url": "https://github.com/SocrateMobile/home-architect/releases/tag/v9.1.0",
        "release_notes": "## Nouveautés\n- tout",
        "update_entity_id": ENTITY_ID,
    }
    assert aioclient_mock.call_count == calls  # servi depuis le cache

    await client.send_json_auto_id({"type": "home_architect/check_updates", "force": True})
    assert (await client.receive_json())["success"] is True
    assert aioclient_mock.call_count == calls + 1


@pytest.mark.parametrize(
    "github_release",
    [{"tag_name": "v0.0.1", "name": "old", "body": "", "html_url": "https://github.com/x", "draft": False, "prerelease": False}],
)
async def test_older_release_is_not_an_update(
    hass: HomeAssistant, setup_integration: MockConfigEntry, hass_ws_client: WebSocketGenerator
) -> None:
    """Une release plus ancienne que la version installée n'est pas proposée."""
    assert hass.states.get(ENTITY_ID).state == STATE_OFF
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "home_architect/check_updates"})
    assert (await client.receive_json())["result"]["update_available"] is False
    assert hass.data[DATA_PANELS][PANEL_URL_PATH].sidebar_title == "Home Architect"


async def test_github_errors_are_silent(
    hass: HomeAssistant,
    config_entry: MockConfigEntry,
    aioclient_mock: AiohttpClientMocker,
    caplog: pytest.LogCaptureFixture,
) -> None:
    """Erreur HTTP ou timeout : aucune exception, l'entité reste « à jour »."""
    aioclient_mock.get(GITHUB_LATEST_RELEASE_URL, exc=TimeoutError())
    assert await hass.config_entries.async_setup(config_entry.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    state = hass.states.get(ENTITY_ID)
    assert state.state == STATE_OFF
    assert state.attributes["latest_version"] == VERSION
    assert "Traceback" not in caplog.text
    assert DOMAIN in hass.config.components
