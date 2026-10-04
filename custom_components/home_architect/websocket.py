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

    @websocket_api.require_admin
    @websocket_api.websocket_command(
        {
            vol.Required("type"): "home_architect/save_project",
            vol.Required("project"): vol.Schema(
                {
                    vol.Required("id"): vol.All(str, vol.Match(r"^[a-zA-Z0-9_\-]{1,64}$")),
                    vol.Optional("name"): str,
                    vol.Optional("category"): str,
                },
                extra=vol.ALLOW_EXTRA,
            ),
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

    @websocket_api.require_admin
    @websocket_api.websocket_command(
        {
            vol.Required("type"): "home_architect/delete_project",
            vol.Required("project_id"): vol.All(str, vol.Match(r"^[a-zA-Z0-9_\-]{1,64}$")),
        }
    )
    @websocket_api.async_response
    async def ws_delete_project(
        hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
    ) -> None:
        """Handle delete_project request."""
        success = await storage.async_delete_project(msg["project_id"])
        connection.send_result(msg["id"], {"success": success})

    @websocket_api.require_admin
    @websocket_api.websocket_command(
        {
            vol.Required("type"): "home_architect/save_svg_to_www",
            vol.Required("filename"): vol.All(str, vol.Match(r"^[a-zA-Z0-9_\-]{1,64}\.svg$")),
            vol.Required("svg_content"): vol.All(str, vol.Length(max=5 * 1024 * 1024)),
        }
    )
    @websocket_api.async_response
    async def ws_save_svg_to_www(
        hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
    ) -> None:
        """Handle save_svg_to_www request, saving sanitized SVG directly to /config/www/."""
        import os
        import re
        filename = msg["filename"]
        svg_content = msg["svg_content"]

        # SVG content sanitization: reject executable elements and scripts
        lowered = svg_content.lower()
        if "<script" in lowered or "javascript:" in lowered or "<foreignobject" in lowered or re.search(r"\son\w+\s*=", lowered):
            connection.send_error(msg["id"], "invalid_content", "SVG content contains forbidden active script elements")
            return

        def _write():
            www_path = hass.config.path("www")
            os.makedirs(www_path, exist_ok=True)
            clean_filename = os.path.basename(filename)
            target = os.path.join(www_path, clean_filename)
            with open(target, "w", encoding="utf-8") as f:
                f.write(svg_content)
            return clean_filename

        try:
            saved_name = await hass.async_add_executor_job(_write)
            _LOGGER.info("Saved floor plan SVG directly to /local/%s", saved_name)
            connection.send_result(msg["id"], {"success": True, "path": f"/local/{saved_name}"})
        except Exception as err:
            _LOGGER.error("Failed to save floor plan SVG to www: %s", err)
            connection.send_error(msg["id"], "write_failed", str(err))

    # Register handlers
    websocket_api.async_register_command(hass, ws_get_projects)
    websocket_api.async_register_command(hass, ws_save_project)
    websocket_api.async_register_command(hass, ws_delete_project)
    websocket_api.async_register_command(hass, ws_save_svg_to_www)
    _LOGGER.debug("Home Architect WebSocket commands registered successfully")
