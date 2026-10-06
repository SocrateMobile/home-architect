"""Update platform for Home Architect.

Notification et installation des mises à jour de Home Architect.
"""
from __future__ import annotations

from datetime import datetime
from typing import Any

from homeassistant.components.update import UpdateEntity, UpdateEntityFeature
from homeassistant.const import STATE_ON
from homeassistant.core import Event, EventStateChangedData, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import (
    async_track_state_change_event,
    async_track_time_interval,
)

from .const import DOMAIN, NAME, UPDATE_CHECK_INTERVAL, VERSION
from .panel import async_register_panel
from .runtime import HomeArchitectConfigEntry
from .version_utils import is_newer_version

_ATTR_SKIPPED_VERSION = "skipped_version"


async def async_setup_entry(
    hass: HomeAssistant,
    entry: HomeArchitectConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the update platform for Home Architect."""
    entity = HomeArchitectUpdateEntity(entry)
    entry.runtime_data.update_entity = entity
    async_add_entities([entity])


class HomeArchitectUpdateEntity(UpdateEntity):
    """Notifie et installe les nouvelles versions de Home Architect."""

    _attr_has_entity_name = True
    _attr_name = None
    _attr_translation_key = "update"
    _attr_should_poll = False
    _attr_supported_features = (
        UpdateEntityFeature.RELEASE_NOTES | UpdateEntityFeature.INSTALL
    )
    _attr_title = NAME
    _attr_installed_version = VERSION

    def __init__(self, entry: HomeArchitectConfigEntry) -> None:
        """Initialize the update entity."""
        self._entry = entry
        self._checker = entry.runtime_data.checker
        self._attr_unique_id = f"home_architect_update_{entry.entry_id}"
        self._attr_latest_version = VERSION
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=NAME,
            manufacturer="SocrateMobile",
            model=NAME,
            sw_version=VERSION,
            entry_type=DeviceEntryType.SERVICE,
        )
        self._apply_release()

    def version_is_newer(self, latest_version: str, installed_version: str) -> bool:
        """Comparaison SemVer (une version locale plus récente n'est pas une mise à jour)."""
        return is_newer_version(latest_version, installed_version)

    async def async_added_to_hass(self) -> None:
        """Abonnements : release connue, état de l'entité (badge du panneau), minuterie."""
        await super().async_added_to_hass()
        self.async_on_remove(self._checker.async_add_listener(self._async_release_changed))
        self.async_on_remove(
            async_track_state_change_event(self.hass, [self.entity_id], self._async_state_changed)
        )
        if not self._entry.pref_disable_polling:
            self.async_on_remove(
                async_track_time_interval(self.hass, self._async_scheduled_check, UPDATE_CHECK_INTERVAL)
            )
        self._entry.async_create_background_task(
            self.hass, self._checker.async_refresh(), f"{DOMAIN}_initial_update_check"
        )

    async def _async_scheduled_check(self, _now: datetime) -> None:
        await self._checker.async_refresh()

    def _apply_release(self) -> None:
        if (release := self._checker.release) is None:
            return
        self._attr_latest_version = release.version
        self._attr_release_summary = release.title
        self._attr_release_url = release.url

    @callback
    def _async_release_changed(self) -> None:
        self._apply_release()
        self.async_write_ha_state()

    @callback
    def _async_state_changed(self, event: Event[EventStateChangedData]) -> None:
        # L'état « on » tient compte de la version ignorée par l'utilisateur.
        new_state = event.data["new_state"]
        async_register_panel(
            self.hass, self._entry, new_state is not None and new_state.state == STATE_ON
        )

    async def async_release_notes(self) -> str | None:
        """Return release notes in markdown."""
        release = self._checker.release
        return release.notes if release is not None else None

    async def async_install(
        self, version: str | None = None, backup: bool = False, **kwargs: Any
    ) -> None:
        """Installe la version spécifiée ou la dernière version disponible."""
        target_version = version or self.latest_version
        if target_version is None:
            raise HomeAssistantError("Aucune version disponible pour l'installation")

        self._attr_in_progress = True
        self.async_write_ha_state()
        try:
            from .installer import async_install_update

            await async_install_update(self.hass, target_version)
            self._attr_installed_version = target_version
        except Exception:
            self._attr_in_progress = False
            self.async_write_ha_state()
            raise
        finally:
            self._attr_in_progress = False
            self.async_write_ha_state()

    @callback
    def async_status(self) -> dict[str, Any]:
        """Réponse de la commande WS check_updates."""
        release = self._checker.release
        state = self.hass.states.get(self.entity_id) if self.hass and self.entity_id else None
        installed = self.installed_version or VERSION
        if state is not None:
            update_available = state.state == STATE_ON
            skipped_version = state.attributes.get(_ATTR_SKIPPED_VERSION)
            in_progress = state.attributes.get("in_progress", False)
        else:  # entité désactivée
            update_available = release is not None and is_newer_version(release.version, installed)
            skipped_version = None
            in_progress = False
        return {
            "installed_version": installed,
            "latest_version": release.version if release is not None else None,
            "update_available": update_available,
            "skipped_version": skipped_version,
            "release_url": release.url if release is not None else None,
            "release_notes": release.notes if release is not None else "",
            "update_entity_id": self.entity_id,
            "in_progress": in_progress,
        }
