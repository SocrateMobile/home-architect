"""Panneau latéral et URL des modules frontend."""
from __future__ import annotations

from homeassistant.components import frontend
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback

from .const import (
    CARD_FILE_NAME,
    CONF_SHOW_SIDEBAR_PANEL,
    DEFAULT_SHOW_SIDEBAR_PANEL,
    FRONTEND_URL_PATH,
    PANEL_FILE_NAME,
    PANEL_ICON,
    PANEL_NAME,
    PANEL_TITLE,
    PANEL_URL_PATH,
    VERSION,
)
from .runtime import HomeArchitectConfigEntry


def card_module_url() -> str:
    """Module de la carte, chargé sur toutes les pages via add_extra_js_url."""
    return f"{FRONTEND_URL_PATH}/{CARD_FILE_NAME}?v={VERSION}"


def panel_module_url() -> str:
    """Module du studio, chargé uniquement par le panneau."""
    return f"{FRONTEND_URL_PATH}/{PANEL_FILE_NAME}?v={VERSION}"


def panel_enabled(entry: ConfigEntry) -> bool:
    """Option « afficher le panneau » (options, sinon données initiales)."""
    return bool(
        entry.options.get(
            CONF_SHOW_SIDEBAR_PANEL,
            entry.data.get(CONF_SHOW_SIDEBAR_PANEL, DEFAULT_SHOW_SIDEBAR_PANEL),
        )
    )


@callback
def async_register_panel(
    hass: HomeAssistant, entry: HomeArchitectConfigEntry, update_available: bool
) -> None:
    """Enregistre (ou met à jour) le panneau réservé aux admins.

    Sans effet si l'option est désactivée ou si l'indicateur de mise à jour
    n'a pas changé depuis le dernier enregistrement (évite panels_updated en boucle).
    """
    runtime = entry.runtime_data
    if not panel_enabled(entry) or runtime.panel_update_badge == update_available:
        return
    frontend.async_register_built_in_panel(
        hass,
        component_name="custom",
        sidebar_title=f"{PANEL_TITLE} 🔴" if update_available else PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        frontend_url_path=PANEL_URL_PATH,
        config={
            "_panel_custom": {
                "name": PANEL_NAME,
                "module_url": panel_module_url(),
                "embed_iframe": False,
                "trust_external": False,
            }
        },
        require_admin=True,
        update=True,
    )
    runtime.panel_update_badge = update_available


@callback
def async_unregister_panel(hass: HomeAssistant, entry: HomeArchitectConfigEntry) -> None:
    """Retire le panneau s'il a été enregistré par cette entrée."""
    runtime = entry.runtime_data
    if runtime.panel_update_badge is None:
        return
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
    runtime.panel_update_badge = None
