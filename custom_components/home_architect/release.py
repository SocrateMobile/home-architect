"""Vérification de la dernière version publiée sur GitHub (notification uniquement)."""
from __future__ import annotations

import asyncio
from collections.abc import Callable
from dataclasses import dataclass
import logging
import time
from typing import Any

import aiohttp

from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import GITHUB_LATEST_RELEASE_URL, VERSION
from .version_utils import normalize_version

_LOGGER = logging.getLogger(__name__)

_REQUEST_TIMEOUT = aiohttp.ClientTimeout(total=15)
_MAX_TITLE_LENGTH = 255
_MAX_NOTES_LENGTH = 64 * 1024
_RELEASE_URL_PREFIX = "https://github.com/"


@dataclass(frozen=True)
class ReleaseInfo:
    """Dernière release publiée."""

    version: str
    title: str
    notes: str
    url: str | None


def parse_release(payload: Any) -> ReleaseInfo | None:
    """Extrait une ReleaseInfo de la réponse de l'API GitHub (None si inexploitable)."""
    if not isinstance(payload, dict) or payload.get("draft") or payload.get("prerelease"):
        return None
    version = normalize_version(payload.get("tag_name"))
    if version is None:
        _LOGGER.debug("Ignoring GitHub release with a non semver tag: %r", payload.get("tag_name"))
        return None
    name = payload.get("name")
    title = name.strip() if isinstance(name, str) and name.strip() else f"Version {version}"
    body = payload.get("body")
    url = payload.get("html_url")
    return ReleaseInfo(
        version=version,
        title=title[:_MAX_TITLE_LENGTH],
        notes=body[:_MAX_NOTES_LENGTH] if isinstance(body, str) else "",
        url=url if isinstance(url, str) and url.startswith(_RELEASE_URL_PREFIX) else None,
    )


class ReleaseChecker:
    """Interroge /releases/latest (requêtes conditionnelles ETag, cache)."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self._lock = asyncio.Lock()
        self._etag: str | None = None
        self._last_check: float | None = None
        self._listeners: list[Callable[[], None]] = []
        self.release: ReleaseInfo | None = None

    @callback
    def async_add_listener(self, listener: Callable[[], None]) -> CALLBACK_TYPE:
        """Appelé quand la release connue change."""
        self._listeners.append(listener)

        @callback
        def _remove() -> None:
            self._listeners.remove(listener)

        return _remove

    async def async_refresh(self, max_age: float = 0) -> ReleaseInfo | None:
        """Rafraîchit si la dernière vérification date de plus de `max_age` secondes."""
        async with self._lock:
            now = time.monotonic()
            if self._last_check is not None and now - self._last_check < max_age:
                return self.release
            self._last_check = now
            release = await self._async_fetch()
            changed = release is not None and release != self.release
            if changed:
                self.release = release
        if changed:
            for listener in list(self._listeners):
                listener()
        return self.release

    async def _async_fetch(self) -> ReleaseInfo | None:
        headers = {
            "Accept": "application/vnd.github+json",
            "User-Agent": f"home-architect-ha/{VERSION}",
        }
        if self._etag:
            headers["If-None-Match"] = self._etag
        session = async_get_clientsession(self._hass)
        try:
            async with session.get(
                GITHUB_LATEST_RELEASE_URL, headers=headers, timeout=_REQUEST_TIMEOUT
            ) as resp:
                if resp.status == 304:
                    return None
                if resp.status != 200:
                    _LOGGER.debug("GitHub release check returned HTTP %s", resp.status)
                    return None
                payload = await resp.json()
                etag = resp.headers.get("ETag")
        except (TimeoutError, aiohttp.ClientError, ValueError) as err:
            _LOGGER.debug("GitHub release check failed: %s", err)
            return None
        release = parse_release(payload)
        if release is not None:
            self._etag = etag
        return release
