"""Données d'exécution : stockage global (hass.data) et données de l'entrée (runtime_data)."""
from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DATA_ENTRY_ID, DATA_STORAGE, DOMAIN

if TYPE_CHECKING:
    from .release import ReleaseChecker
    from .storage import HomeArchitectStorage
    from .update import HomeArchitectUpdateEntity


@dataclass
class HomeArchitectRuntimeData:
    """Objets propres à l'entrée de configuration chargée."""

    checker: ReleaseChecker
    update_entity: HomeArchitectUpdateEntity | None = None
    # État du badge du panneau tel qu'enregistré ; None = panneau non enregistré
    panel_update_badge: bool | None = None


type HomeArchitectConfigEntry = ConfigEntry[HomeArchitectRuntimeData]


def get_storage(hass: HomeAssistant) -> HomeArchitectStorage | None:
    """Stockage des projets, ou None si aucune entrée n'est chargée."""
    domain_data = hass.data.get(DOMAIN)
    if not domain_data or domain_data.get(DATA_ENTRY_ID) is None:
        return None
    storage: HomeArchitectStorage | None = domain_data.get(DATA_STORAGE)
    return storage


def get_runtime_data(hass: HomeAssistant) -> HomeArchitectRuntimeData | None:
    """Données de l'entrée chargée, ou None."""
    domain_data = hass.data.get(DOMAIN)
    if not domain_data or (entry_id := domain_data.get(DATA_ENTRY_ID)) is None:
        return None
    entry = hass.config_entries.async_get_entry(entry_id)
    if entry is None:
        return None
    return getattr(entry, "runtime_data", None)
