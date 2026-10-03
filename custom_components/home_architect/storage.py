"""Storage manager for Home Architect projects."""
from __future__ import annotations

import logging
from typing import Any, Dict, List, Optional
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION

_LOGGER = logging.getLogger(__name__)


class HomeArchitectStorage:
    """Manages persistence of floor plans and CAD metadata in HA .storage."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self._data: Dict[str, Any] = {"projects": {}}

    async def async_load(self) -> None:
        """Load stored projects from disk."""
        stored = await self._store.async_load()
        if stored and isinstance(stored, dict):
            self._data = stored
        else:
            self._data = {"projects": {}}

    async def async_get_projects(self) -> List[Dict[str, Any]]:
        """Return the list of all saved projects."""
        return list(self._data.get("projects", {}).values())

    async def async_get_project(self, project_id: str) -> Optional[Dict[str, Any]]:
        """Get a single project by ID."""
        return self._data.get("projects", {}).get(project_id)

    async def async_save_project(self, project_data: Dict[str, Any]) -> None:
        """Save or update a project."""
        project_id = project_data.get("id", "default")
        self._data.setdefault("projects", {})[project_id] = project_data
        await self._store.async_save(self._data)
        _LOGGER.debug("Project %s saved successfully", project_id)

    async def async_delete_project(self, project_id: str) -> bool:
        """Delete a project by ID."""
        if project_id in self._data.get("projects", {}):
            del self._data["projects"][project_id]
            await self._store.async_save(self._data)
            _LOGGER.debug("Project %s deleted", project_id)
            return True
        return False
