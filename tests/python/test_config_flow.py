"""Config flow et options flow."""
from __future__ import annotations

from pytest_homeassistant_custom_component.common import MockConfigEntry

from homeassistant import config_entries
from homeassistant.components.frontend import DATA_PANELS
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType

from custom_components.home_architect.const import CONF_SHOW_SIDEBAR_PANEL, DOMAIN, PANEL_URL_PATH


async def test_user_flow_creates_entry(hass: HomeAssistant, enable_custom_integrations: None, mock_github) -> None:
    """Le formulaire crée l'entrée avec l'option choisie."""
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(result["flow_id"], {CONF_SHOW_SIDEBAR_PANEL: False})
    await hass.async_block_till_done(wait_background_tasks=True)
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert result["title"] == "Home Architect"
    assert result["data"] == {CONF_SHOW_SIDEBAR_PANEL: False}


async def test_single_instance(hass: HomeAssistant, config_entry: MockConfigEntry) -> None:
    """Une seule entrée possible (single_config_entry)."""
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.ABORT
    assert result["reason"] == "single_instance_allowed"


async def test_options_flow_defaults_to_entry_data(hass: HomeAssistant, enable_custom_integrations: None, mock_github) -> None:
    """Le formulaire d'options s'ouvre (plus de TypeError) et reprend la valeur de data."""
    entry = MockConfigEntry(domain=DOMAIN, data={CONF_SHOW_SIDEBAR_PANEL: False})
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.FORM
    assert result["step_id"] == "init"
    schema_defaults = {str(key): key.default() for key in result["data_schema"].schema}
    assert schema_defaults[CONF_SHOW_SIDEBAR_PANEL] is False


async def test_options_flow_updates_and_reloads(
    hass: HomeAssistant, setup_integration: MockConfigEntry
) -> None:
    """Enregistrer les options recharge l'entrée une seule fois et applique le choix."""
    assert PANEL_URL_PATH in hass.data[DATA_PANELS]
    result = await hass.config_entries.options.async_init(setup_integration.entry_id)
    result = await hass.config_entries.options.async_configure(result["flow_id"], {CONF_SHOW_SIDEBAR_PANEL: False})
    await hass.async_block_till_done(wait_background_tasks=True)
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert setup_integration.options == {CONF_SHOW_SIDEBAR_PANEL: False}
    assert setup_integration.state is ConfigEntryState.LOADED
    assert PANEL_URL_PATH not in hass.data[DATA_PANELS]

    result = await hass.config_entries.options.async_init(setup_integration.entry_id)
    result = await hass.config_entries.options.async_configure(result["flow_id"], {CONF_SHOW_SIDEBAR_PANEL: True})
    await hass.async_block_till_done(wait_background_tasks=True)
    assert PANEL_URL_PATH in hass.data[DATA_PANELS]
