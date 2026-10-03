"""WebSocket API endpoints for Home Architect."""
from __future__ import annotations

import logging
import voluptuous as vol
from homeassistant.core import HomeAssistant
from homeassistant.components import websocket_api
from .storage import HomeArchitectStorage

_LOGGER = logging.getLogger(__name__)


def async_register_websocket_commands(
    hass: HomeAssistant, storage: HomeArchitectStorage
) -> None:
    """Register all custom WebSocket commands."""

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "home_architect/get_projects",
        }
    )
    @websocket_api.async_response
    async def ws_get_projects(
        hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
    ) -> None:
        """Handle get_projects request."""
        projects = await storage.async_get_projects()
        connection.send_result(msg["id"], {"projects": projects})

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "home_architect/save_project",
            vol.Required("project"): dict,
        }
    )
    @websocket_api.async_response
    async def ws_save_project(
        hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
    ) -> None:
        """Handle save_project request."""
        project = msg["project"]
        await storage.async_save_project(project)
        connection.send_result(msg["id"], {"success": True, "id": project.get("id")})

    @websocket_api.websocket_command(
        {
            vol.Required("type"): "home_architect/delete_project",
            vol.Required("project_id"): str,
        }
    )
    @websocket_api.async_response
    async def ws_delete_project(
        hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
    ) -> None:
        """Handle delete_project request."""
        success = await storage.async_delete_project(msg["project_id"])
        connection.send_result(msg["id"], {"success": success})

    # Register handlers
    websocket_api.async_register_command(hass, ws_get_projects)
    websocket_api.async_register_command(hass, ws_save_project)
    websocket_api.async_register_command(hass, ws_delete_project)
    _LOGGER.debug("Home Architect WebSocket commands registered successfully")
