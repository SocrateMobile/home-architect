"""Cycle de vie de l'entrée : setup, rechargements, déchargement, suppression."""
from __future__ import annotations

from pathlib import Path

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.typing import WebSocketGenerator

from homeassistant.components.frontend import DATA_EXTRA_MODULE_URL, DATA_PANELS
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component

from custom_components.home_architect.const import (
    CONF_SHOW_SIDEBAR_PANEL,
    DOMAIN,
    PANEL_URL_PATH,
    VERSION,
)

from factories import make_project

CARD_URL = f"/home_architect_frontend/home_architect-card.js?v={VERSION}"
PANEL_URL = f"/home_architect_frontend/home_architect-panel.js?v={VERSION}"


def _extra_urls(hass: HomeAssistant) -> frozenset[str]:
    return hass.data[DATA_EXTRA_MODULE_URL].urls


async def test_setup_registers_panel_card_and_commands(
    hass: HomeAssistant, setup_integration: MockConfigEntry, hass_ws_client: WebSocketGenerator
) -> None:
    """Le panneau est réservé aux admins et charge le bundle du studio."""
    assert setup_integration.state is ConfigEntryState.LOADED
    panel = hass.data[DATA_PANELS][PANEL_URL_PATH]
    assert panel.require_admin is True
    assert panel.config["_panel_custom"]["module_url"] == PANEL_URL
    assert panel.config["_panel_custom"]["name"] == "home-architect-panel"
    assert CARD_URL in _extra_urls(hass)

    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "home_architect/list_projects"})
    response = await client.receive_json()
    assert response["success"] is True
    assert response["result"] == {"projects": []}


async def test_reload_does_not_stack_registrations(
    hass: HomeAssistant,
    setup_integration: MockConfigEntry,
    hass_ws_client: WebSocketGenerator,
    caplog: pytest.LogCaptureFixture,
) -> None:
    """Rechargements successifs : ni erreur de routeur, ni panneau écrasé, ni listener en double."""
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "home_architect/save_project", "project": make_project()})
    assert (await client.receive_json())["success"] is True

    for _ in range(3):
        assert await hass.config_entries.async_reload(setup_integration.entry_id)
        await hass.async_block_till_done(wait_background_tasks=True)
        assert setup_integration.state is ConfigEntryState.LOADED

    assert len(setup_integration.update_listeners) == 1
    assert PANEL_URL_PATH in hass.data[DATA_PANELS]
    assert CARD_URL in _extra_urls(hass)
    assert "Overwriting panel" not in caplog.text
    assert "already been setup" not in caplog.text
    assert "Error" not in caplog.text

    # Le stockage est conservé entre les rechargements
    await client.send_json_auto_id({"type": "home_architect/list_projects"})
    projects = (await client.receive_json())["result"]["projects"]
    assert [p["id"] for p in projects] == ["plan_abcd1234"]


async def test_unload_cleans_entry_resources(
    hass: HomeAssistant,
    setup_integration: MockConfigEntry,
    hass_ws_client: WebSocketGenerator,
    caplog: pytest.LogCaptureFixture,
) -> None:
    """Après déchargement : plus de panneau, plus de JS injecté, commandes en not_ready."""
    assert await hass.config_entries.async_unload(setup_integration.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    assert setup_integration.state is ConfigEntryState.NOT_LOADED
    assert PANEL_URL_PATH not in hass.data[DATA_PANELS]
    assert CARD_URL not in _extra_urls(hass)
    assert "Removing unknown panel" not in caplog.text

    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "home_architect/list_projects"})
    response = await client.receive_json()
    assert response["success"] is False
    assert response["error"]["code"] == "not_ready"

    assert await hass.config_entries.async_setup(setup_integration.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    assert PANEL_URL_PATH in hass.data[DATA_PANELS]


async def test_panel_disabled_by_option(
    hass: HomeAssistant, enable_custom_integrations: None, mock_github, caplog: pytest.LogCaptureFixture
) -> None:
    """Option désactivée : aucun panneau, la carte reste chargée."""
    entry = MockConfigEntry(domain=DOMAIN, data={CONF_SHOW_SIDEBAR_PANEL: True}, options={CONF_SHOW_SIDEBAR_PANEL: False})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    assert PANEL_URL_PATH not in hass.data[DATA_PANELS]
    assert CARD_URL in _extra_urls(hass)

    assert await hass.config_entries.async_unload(entry.entry_id)
    assert "Removing unknown panel" not in caplog.text


async def test_options_change_reloads_entry(
    hass: HomeAssistant, setup_integration: MockConfigEntry
) -> None:
    """Le listener de mise à jour recharge l'entrée et applique l'option."""
    hass.config_entries.async_update_entry(setup_integration, options={CONF_SHOW_SIDEBAR_PANEL: False})
    await hass.async_block_till_done(wait_background_tasks=True)
    assert setup_integration.state is ConfigEntryState.LOADED
    assert PANEL_URL_PATH not in hass.data[DATA_PANELS]


async def test_remove_entry_deletes_public_files(
    hass: HomeAssistant, setup_integration: MockConfigEntry, hass_ws_client: WebSocketGenerator
) -> None:
    """La suppression de l'intégration retire les plans publiés et les anciens fichiers /local."""
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": "home_architect/save_project", "project": make_project()})
    assert (await client.receive_json())["success"] is True
    legacy = Path(hass.config.path("www", "plan_plan_abcd1234.svg"))
    legacy.parent.mkdir(parents=True, exist_ok=True)
    legacy.write_text('<svg xmlns="http://www.w3.org/2000/svg"/>')
    await client.send_json_auto_id(
        {
            "type": "home_architect/publish_svg",
            "project_id": "plan_abcd1234",
            "svg_content": '<svg xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1"/></svg>',
        }
    )
    published = (await client.receive_json())["result"]
    published_file = Path(hass.config.path("home_architect", "published", published["path"].rsplit("/", 1)[1]))
    assert published_file.is_file()

    assert await hass.config_entries.async_remove(setup_integration.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    assert not published_file.exists()
    assert not legacy.exists()


async def test_yaml_configuration_is_not_supported(
    hass: HomeAssistant, enable_custom_integrations: None, caplog: pytest.LogCaptureFixture
) -> None:
    """CONFIG_SCHEMA : l'intégration se configure uniquement par l'interface."""
    assert await async_setup_component(hass, DOMAIN, {DOMAIN: {"foo": "bar"}})
    assert "does not support YAML setup" in caplog.text
