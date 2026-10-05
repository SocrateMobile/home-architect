"""Vues HTTP : images de fond (authentifiées) et plans publiés (publics, URL non devinable)."""
from __future__ import annotations

from http import HTTPStatus
from pathlib import Path
import re

from aiohttp import hdrs, web

from homeassistant.components.http import KEY_HASS, KEY_HASS_USER, HomeAssistantView
from homeassistant.core import HomeAssistant, callback

from .assets import EXTENSION_TYPES, normalize_mime
from .const import BACKGROUND_URL_PATH, MAX_UPLOAD_BYTES, PROJECT_ID_PATTERN, PUBLISHED_URL_PATH
from .runtime import get_storage
from .storage import InvalidImageError, StorageWriteError

# Le SVG est servi comme document isolé : aucun script, aucune ressource externe.
SVG_CONTENT_SECURITY_POLICY = "default-src 'none'; style-src 'unsafe-inline'; img-src data:; sandbox"
_READ_CHUNK_SIZE = 64 * 1024
_PROJECT_ID_RE = re.compile(PROJECT_ID_PATTERN)


def _read_file(path: Path) -> bytes | None:
    try:
        return path.read_bytes()
    except (FileNotFoundError, IsADirectoryError):
        return None


class BackgroundUploadView(HomeAssistantView):
    """POST /api/home_architect/background/{project_id} : téléversement (admin)."""

    url = BACKGROUND_URL_PATH + "/{project_id}"
    name = "api:home_architect:background_upload"
    requires_auth = True

    async def post(self, request: web.Request, project_id: str) -> web.Response:
        """Stocke le corps brut de la requête comme image de fond du projet."""
        if not request[KEY_HASS_USER].is_admin:
            return self.json_message("Admin access required", HTTPStatus.FORBIDDEN)
        if _PROJECT_ID_RE.match(project_id) is None:
            return self.json_message("Invalid project id", HTTPStatus.BAD_REQUEST)
        hass = request.app[KEY_HASS]
        storage = get_storage(hass)
        if storage is None:
            return self.json_message("Home Architect is not loaded", HTTPStatus.SERVICE_UNAVAILABLE)
        mime = normalize_mime(request.content_type)
        if mime is None:
            return self.json_message("Unsupported image type", HTTPStatus.UNSUPPORTED_MEDIA_TYPE)
        if request.content_length is not None and request.content_length > MAX_UPLOAD_BYTES:
            return self.json_message("Image too large", HTTPStatus.REQUEST_ENTITY_TOO_LARGE)

        chunks: list[bytes] = []
        total = 0
        async for chunk in request.content.iter_chunked(_READ_CHUNK_SIZE):
            total += len(chunk)
            if total > MAX_UPLOAD_BYTES:
                return self.json_message("Image too large", HTTPStatus.REQUEST_ENTITY_TOO_LARGE)
            chunks.append(chunk)

        try:
            result = await storage.async_store_background(project_id, b"".join(chunks), mime)
        except InvalidImageError as err:
            return self.json_message(f"Invalid image: {err}", HTTPStatus.BAD_REQUEST)
        except StorageWriteError:
            return self.json_message("Could not store the image", HTTPStatus.INTERNAL_SERVER_ERROR)
        return self.json(result)


class BackgroundAssetView(HomeAssistantView):
    """GET /api/home_architect/background/{project_id}/{asset_id} : lecture (tout utilisateur)."""

    url = BACKGROUND_URL_PATH + "/{project_id}/{asset_id}"
    name = "api:home_architect:background_asset"
    requires_auth = True

    async def get(self, request: web.Request, project_id: str, asset_id: str) -> web.Response:
        """Sert une image de fond (immuable : le nom dérive du contenu)."""
        hass = request.app[KEY_HASS]
        storage = get_storage(hass)
        if storage is None:
            return web.Response(status=HTTPStatus.SERVICE_UNAVAILABLE)
        path = storage.files.background_path(project_id, asset_id)
        if path is None:
            return web.Response(status=HTTPStatus.NOT_FOUND)
        content = await hass.async_add_executor_job(_read_file, path)
        if content is None:
            return web.Response(status=HTTPStatus.NOT_FOUND)
        mime = EXTENSION_TYPES[path.suffix.removeprefix(".")]
        headers = {
            hdrs.CONTENT_TYPE: mime,
            hdrs.CACHE_CONTROL: "private, max-age=31536000, immutable",
            "X-Content-Type-Options": "nosniff",
        }
        if mime == "image/svg+xml":
            headers["Content-Security-Policy"] = SVG_CONTENT_SECURITY_POLICY
        return web.Response(body=content, headers=headers)


class PublishedPlanView(HomeAssistantView):
    """GET /api/home_architect/published/{filename} : plan publié, sans authentification."""

    url = PUBLISHED_URL_PATH + "/{filename}"
    name = "api:home_architect:published"
    requires_auth = False

    async def get(self, request: web.Request, filename: str) -> web.Response:
        """Sert le SVG assaini avec une CSP stricte et un ETag (cache revalidé)."""
        hass = request.app[KEY_HASS]
        storage = get_storage(hass)
        entry = storage.published_entry(filename) if storage is not None else None
        if entry is None:
            return web.Response(status=HTTPStatus.NOT_FOUND)
        path, digest = entry
        etag = f'"{digest}"'
        headers = {
            hdrs.CACHE_CONTROL: "no-cache",
            hdrs.ETAG: etag,
            "Content-Security-Policy": SVG_CONTENT_SECURITY_POLICY,
            "X-Content-Type-Options": "nosniff",
        }
        if_none_match = request.headers.get(hdrs.IF_NONE_MATCH, "")
        if etag in (tag.strip() for tag in if_none_match.split(",")):
            return web.Response(status=HTTPStatus.NOT_MODIFIED, headers=headers)
        content = await hass.async_add_executor_job(_read_file, path)
        if content is None:
            return web.Response(status=HTTPStatus.NOT_FOUND)
        headers[hdrs.CONTENT_TYPE] = "image/svg+xml; charset=utf-8"
        return web.Response(body=content, headers=headers)


@callback
def async_register_views(hass: HomeAssistant) -> None:
    """Enregistre les vues (une seule fois, dans async_setup)."""
    hass.http.register_view(BackgroundUploadView())
    hass.http.register_view(BackgroundAssetView())
    hass.http.register_view(PublishedPlanView())
