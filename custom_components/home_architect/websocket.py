"""WebSocket API endpoints for Home Architect.

Les commandes sont enregistrées une seule fois (async_setup) ; chaque handler
récupère le stockage de l'entrée chargée et répond `not_ready` sinon.
"""
from __future__ import annotations

from collections.abc import Awaitable, Callable
from functools import wraps
import logging
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .assets import LEGACY_WWW_FILENAME_RE
from .const import (
    MAX_PUBLISH_BYTES,
    PROJECT_ID_PATTERN,
    SIGNAL_PROJECT_UPDATED,
    UPDATE_CHECK_CACHE,
)
from .runtime import get_runtime_data, get_storage
from .storage import HomeArchitectStorage, StorageError, StorageWriteError

_LOGGER = logging.getLogger(__name__)

ERR_NOT_READY = "not_ready"
ERR_WRITE_FAILED = "write_failed"

PROJECT_ID = vol.All(str, vol.Match(PROJECT_ID_PATTERN))
SVG_CONTENT = vol.All(str, vol.Length(min=1, max=MAX_PUBLISH_BYTES))

# Commandes dépréciées déjà signalées dans le journal (un avertissement par démarrage)
_DEPRECATION_LOGGED: set[str] = set()

type _StorageHandler = Callable[
    [HomeAssistant, websocket_api.ActiveConnection, dict[str, Any], HomeArchitectStorage],
    Awaitable[None],
]


def _with_storage(
    func: _StorageHandler,
) -> Callable[[HomeAssistant, websocket_api.ActiveConnection, dict[str, Any]], Awaitable[None]]:
    """Injecte le stockage et convertit les StorageError en erreurs WS."""

    @wraps(func)
    async def wrapper(
        hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
    ) -> None:
        storage = get_storage(hass)
        if storage is None:
            connection.send_error(msg["id"], ERR_NOT_READY, "Home Architect is not loaded")
            return
        try:
            await func(hass, connection, msg, storage)
        except StorageError as err:
            connection.send_error(msg["id"], err.code, str(err))

    return wrapper


def _reject_oversized_svg(connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> bool:
    """Refuse `svg_content` au-delà de MAX_PUBLISH_BYTES octets (vol.Length compte des caractères)."""
    size = len(msg["svg_content"].encode("utf-8"))
    if size <= MAX_PUBLISH_BYTES:
        return False
    connection.send_error(
        msg["id"], "payload_too_large", f"payload_too_large:{size}:{MAX_PUBLISH_BYTES}"
    )
    return True


def _log_deprecated_once(command: str, replacement: str) -> None:
    """Avertit une fois par démarrage qu'un ancien frontend utilise une commande dépréciée."""
    if command in _DEPRECATION_LOGGED:
        return
    _DEPRECATION_LOGGED.add(command)
    _LOGGER.warning(
        "The %s WebSocket command is deprecated (kept for compatibility): it is sent by a Home "
        "Architect page loaded before the update; reload that page, which uses %s instead",
        command,
        replacement,
    )


@websocket_api.websocket_command({vol.Required("type"): "home_architect/list_projects"})
@websocket_api.async_response
@_with_storage
async def ws_list_projects(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    storage: HomeArchitectStorage,
) -> None:
    """Résumés des projets (sans géométrie ni image)."""
    connection.send_result(msg["id"], {"projects": await storage.async_list_projects()})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_architect/get_project",
        vol.Required("project_id"): PROJECT_ID,
    }
)
@websocket_api.async_response
@_with_storage
async def ws_get_project(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    storage: HomeArchitectStorage,
) -> None:
    """Un projet complet, avec ses informations de publication."""
    project = await storage.async_get_project(msg["project_id"])
    if project is None:
        connection.send_error(msg["id"], websocket_api.ERR_NOT_FOUND, "Project not found")
        return
    connection.send_result(msg["id"], {"project": project})


@websocket_api.websocket_command({vol.Required("type"): "home_architect/get_projects"})
@websocket_api.async_response
@_with_storage
async def ws_get_projects(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    storage: HomeArchitectStorage,
) -> None:
    """Tous les projets complets (déprécié : utiliser list_projects + get_project)."""
    connection.send_result(msg["id"], {"projects": await storage.async_get_projects()})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_architect/save_project",
        vol.Required("project"): vol.Schema({vol.Required("id"): PROJECT_ID}, extra=vol.ALLOW_EXTRA),
        vol.Optional("expected_revision"): vol.Any(None, vol.All(int, vol.Range(min=0))),
        vol.Optional("force", default=False): bool,
    }
)
@websocket_api.async_response
@_with_storage
async def ws_save_project(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    storage: HomeArchitectStorage,
) -> None:
    """Enregistre un projet (contrôle de révision sauf `force`)."""
    result = await storage.async_save_project(
        msg["project"], msg.get("expected_revision"), msg["force"]
    )
    connection.send_result(msg["id"], {"success": True, **result})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_architect/delete_project",
        vol.Required("project_id"): PROJECT_ID,
    }
)
@websocket_api.async_response
@_with_storage
async def ws_delete_project(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    storage: HomeArchitectStorage,
) -> None:
    """Supprime un projet, ses images de fond et ses plans publiés."""
    removed = await storage.async_delete_project(msg["project_id"])
    connection.send_result(msg["id"], {"success": True, "removed_files": removed})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_architect/publish_svg",
        vol.Required("project_id"): PROJECT_ID,
        vol.Required("svg_content"): SVG_CONTENT,
        vol.Optional("include_background", default=False): bool,
    }
)
@websocket_api.async_response
@_with_storage
async def ws_publish_svg(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    storage: HomeArchitectStorage,
) -> None:
    """Publie le plan (SVG assaini) sur une URL publique non devinable."""
    if _reject_oversized_svg(connection, msg):
        return
    try:
        info = await storage.async_publish_svg(
            msg["project_id"], msg["svg_content"], msg["include_background"]
        )
    except StorageWriteError:
        connection.send_error(msg["id"], ERR_WRITE_FAILED, "Could not write the published plan")
        return
    connection.send_result(msg["id"], info)


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_architect/unpublish",
        vol.Required("project_id"): PROJECT_ID,
    }
)
@websocket_api.async_response
@_with_storage
async def ws_unpublish(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    storage: HomeArchitectStorage,
) -> None:
    """Retire la publication (fichier supprimé, nouveau jeton au prochain publish)."""
    try:
        removed = await storage.async_unpublish(msg["project_id"])
    except StorageWriteError:
        connection.send_error(msg["id"], ERR_WRITE_FAILED, "Could not remove the publication")
        return
    connection.send_result(msg["id"], {"success": True, "removed_files": removed})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_architect/save_svg_to_www",
        # Ancien format uniquement (plan_<project_id>.svg) : aucun autre fichier de www/
        vol.Required("filename"): vol.All(str, vol.Match(LEGACY_WWW_FILENAME_RE)),
        vol.Required("svg_content"): SVG_CONTENT,
    }
)
@websocket_api.async_response
@_with_storage
async def ws_save_svg_to_www(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
    storage: HomeArchitectStorage,
) -> None:
    """Dépréciée (frontends 1.0.x) : écrit le plan assaini dans /config/www/plan_<id>.svg.

    Conservée pour les pages restées ouvertes sur un ancien frontend ; remplacée par publish_svg.
    """
    _log_deprecated_once("home_architect/save_svg_to_www", "home_architect/publish_svg")
    if _reject_oversized_svg(connection, msg):
        return
    # plan_<project_id>.svg (format garanti par le schéma)
    project_id = msg["filename"].removeprefix("plan_").removesuffix(".svg")
    try:
        path = await storage.async_save_svg_to_www(project_id, msg["svg_content"])
    except StorageWriteError:
        connection.send_error(msg["id"], ERR_WRITE_FAILED, "Could not write the SVG file")
        return
    connection.send_result(msg["id"], {"success": True, "path": path})


@websocket_api.require_admin
@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_architect/check_updates",
        vol.Optional("force", default=False): bool,
    }
)
@websocket_api.async_response
async def ws_check_updates(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """État des mises à jour (vérification GitHub mise en cache 10 min)."""
    runtime = get_runtime_data(hass)
    if runtime is None or runtime.update_entity is None:
        connection.send_error(msg["id"], ERR_NOT_READY, "Home Architect is not loaded")
        return
    max_age = 0 if msg["force"] else UPDATE_CHECK_CACHE.total_seconds()
    await runtime.checker.async_refresh(max_age)
    connection.send_result(msg["id"], runtime.update_entity.async_status())


@websocket_api.websocket_command(
    {
        vol.Required("type"): "home_architect/subscribe_project",
        vol.Required("project_id"): PROJECT_ID,
    }
)
@callback
def ws_subscribe_project(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Événements {project_id, revision, deleted?} après save / delete / publish."""
    if get_storage(hass) is None:
        connection.send_error(msg["id"], ERR_NOT_READY, "Home Architect is not loaded")
        return
    project_id = msg["project_id"]

    @callback
    def _forward(event: dict[str, Any]) -> None:
        if event["project_id"] == project_id:
            connection.send_message(websocket_api.event_message(msg["id"], event))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(
        hass, SIGNAL_PROJECT_UPDATED, _forward
    )
    connection.send_result(msg["id"])


@callback
def async_register_websocket_commands(hass: HomeAssistant) -> None:
    """Register all custom WebSocket commands (une seule fois, dans async_setup)."""
    for command in (
        ws_list_projects,
        ws_get_project,
        ws_get_projects,
        ws_save_project,
        ws_delete_project,
        ws_publish_svg,
        ws_unpublish,
        ws_save_svg_to_www,
        ws_check_updates,
        ws_subscribe_project,
    ):
        websocket_api.async_register_command(hass, command)
    _LOGGER.debug("Home Architect WebSocket commands registered")
