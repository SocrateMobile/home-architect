"""Home Architect integration for Home Assistant."""
from __future__ import annotations

import logging
import os
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig

from .const import (
    DOMAIN,
    FRONTEND_FILE_NAME,
    FRONTEND_URL_PATH,
    PANEL_ICON,
    PANEL_NAME,
    PANEL_TITLE,
    PANEL_URL_PATH,
    CONF_SHOW_SIDEBAR_PANEL,
    DEFAULT_SHOW_SIDEBAR_PANEL,
    VERSION,
)
from .storage import HomeArchitectStorage
from .websocket import async_register_websocket_commands

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up Home Architect component via configuration.yaml (if used)."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Home Architect from a config entry."""
    hass.data.setdefault(DOMAIN, {})

    # 1. Initialize Storage
    storage = HomeArchitectStorage(hass)
    await storage.async_load()
    hass.data[DOMAIN]["storage"] = storage

    # 2. Register WebSocket API commands
    async_register_websocket_commands(hass, storage)

    # 3. Register static path and Lovelace card resource for frontend JS bundle
    frontend_dir = os.path.join(os.path.dirname(__file__), "frontend")
    module_url = f"{FRONTEND_URL_PATH}/{FRONTEND_FILE_NAME}?v={VERSION}"
    if os.path.exists(frontend_dir):
        if hasattr(hass.http, "async_register_static_paths"):
            await hass.http.async_register_static_paths(
                [StaticPathConfig(FRONTEND_URL_PATH, frontend_dir, cache_headers=False)]
            )
        else:
            hass.http.register_static_path(FRONTEND_URL_PATH, frontend_dir, cache_headers=False)
        _LOGGER.debug("Registered Home Architect frontend path at %s", FRONTEND_URL_PATH)

        if hasattr(frontend, "add_extra_js_url"):
            frontend.add_extra_js_url(hass, module_url)
        elif hasattr(frontend, "async_register_built_in_panel"):
            pass

    # 4. Register sidebar panel
    show_panel = entry.options.get(
        CONF_SHOW_SIDEBAR_PANEL,
        entry.data.get(CONF_SHOW_SIDEBAR_PANEL, DEFAULT_SHOW_SIDEBAR_PANEL),
    )

    if show_panel:
        module_url = f"{FRONTEND_URL_PATH}/{FRONTEND_FILE_NAME}?v={VERSION}"
        try:
            frontend.async_register_built_in_panel(
                hass,
                component_name="custom",
                sidebar_title=PANEL_TITLE,
                sidebar_icon=PANEL_ICON,
                frontend_url_path=PANEL_URL_PATH,
                config={
                    "_panel_custom": {
                        "name": PANEL_NAME,
                        "module_url": module_url,
                        "embed_iframe": False,
                        "trust_external": False,
                    }
                },
                require_admin=False,
            )
            _LOGGER.info("Registered Home Architect sidebar panel at /%s", PANEL_URL_PATH)
        except Exception as err:
            _LOGGER.warning("Could not register Home Architect panel: %s", err)

    entry.async_on_unload(entry.add_update_listener(async_reload_entry))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    try:
        frontend.async_remove_panel(hass, PANEL_URL_PATH)
    except Exception:
        pass

    if DOMAIN in hass.data:
        hass.data.pop(DOMAIN, None)

    return True


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload config entry upon options update."""
    await async_unload_entry(hass, entry)
    await async_setup_entry(hass, entry)
