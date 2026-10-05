"""Home Architect integration for Home Assistant."""
from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
import homeassistant.helpers.config_validation as cv
from homeassistant.helpers.typing import ConfigType

from .const import DATA_ENTRY_ID, DATA_STORAGE, DOMAIN, FRONTEND_URL_PATH, PLATFORMS
from .http import async_register_views
from .panel import async_register_panel, async_unregister_panel, card_module_url
from .release import ReleaseChecker
from .runtime import HomeArchitectConfigEntry, HomeArchitectRuntimeData
from .storage import HomeArchitectStorage
from .websocket import async_register_websocket_commands

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

_FRONTEND_DIR = Path(__file__).parent / "frontend"


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Enregistrements uniques : fichiers frontend, vues HTTP et commandes WebSocket."""
    hass.data[DOMAIN] = {DATA_STORAGE: None, DATA_ENTRY_ID: None}

    if await hass.async_add_executor_job(_FRONTEND_DIR.is_dir):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(FRONTEND_URL_PATH, str(_FRONTEND_DIR), cache_headers=True)]
        )
    else:
        _LOGGER.error("Home Architect frontend bundle is missing (%s)", _FRONTEND_DIR)

    async_register_views(hass)
    async_register_websocket_commands(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: HomeArchitectConfigEntry) -> bool:
    """Set up Home Architect from a config entry."""
    domain_data = hass.data[DOMAIN]
    if domain_data[DATA_STORAGE] is None:
        # Chargé une seule fois par démarrage : conservé lors des rechargements de l'entrée
        storage = HomeArchitectStorage(hass)
        await storage.async_load()
        domain_data[DATA_STORAGE] = storage
        hass.async_create_background_task(
            storage.async_collect_garbage(), f"{DOMAIN}_collect_garbage"
        )

    entry.runtime_data = HomeArchitectRuntimeData(checker=ReleaseChecker(hass))
    # Enregistré avant l'entité update : c'est ensuite elle qui met à jour le badge.
    async_register_panel(hass, entry, update_available=False)
    try:
        await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    except Exception:
        async_unregister_panel(hass, entry)
        raise

    domain_data[DATA_ENTRY_ID] = entry.entry_id
    frontend.add_extra_js_url(hass, card_module_url())
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: HomeArchitectConfigEntry) -> bool:
    """Unload a config entry (le stockage global et les routes restent en place)."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if not unload_ok:
        return False
    async_unregister_panel(hass, entry)
    frontend.remove_extra_js_url(hass, card_module_url())
    hass.data[DOMAIN][DATA_ENTRY_ID] = None
    return True


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Suppression de l'intégration : retire les plans publics (publiés et anciens /local).

    Les plans et images de fond privés sont conservés pour une réinstallation.
    """
    storage = hass.data.get(DOMAIN, {}).get(DATA_STORAGE)
    if storage is None:
        storage = HomeArchitectStorage(hass)
        await storage.async_load()
    removed = await storage.async_remove_public_files()
    if removed:
        _LOGGER.info("Removed public Home Architect files: %s", removed)


async def _async_update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Recharge l'entrée quand ses options changent."""
    await hass.config_entries.async_reload(entry.entry_id)
