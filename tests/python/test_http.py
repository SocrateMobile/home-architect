"""Vues HTTP : téléversement / lecture des fonds, plans publiés."""
from __future__ import annotations

from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.typing import ClientSessionGenerator, WebSocketGenerator

from homeassistant.core import HomeAssistant

from custom_components.home_architect.const import MAX_UPLOAD_BYTES

from factories import PNG_1PX, make_project

UPLOAD_URL = "/api/home_architect/background/plan_abcd1234"
SVG_CSP = "default-src 'none'; style-src 'unsafe-inline'; img-src data:; sandbox"


async def test_upload_and_read_background(
    hass: HomeAssistant, setup_integration: MockConfigEntry, hass_client: ClientSessionGenerator
) -> None:
    """Téléversement admin puis lecture authentifiée avec cache immuable."""
    client = await hass_client()
    response = await client.post(UPLOAD_URL, data=PNG_1PX, headers={"Content-Type": "image/png"})
    assert response.status == 200
    body = await response.json()
    assert body["mime_type"] == "image/png"
    assert body["size"] == len(PNG_1PX)
    asset_id = body["asset_id"]
    assert asset_id.startswith("plan_abcd1234-") and asset_id.endswith(".png")

    response = await client.get(f"{UPLOAD_URL}/{asset_id}")
    assert response.status == 200
    assert await response.read() == PNG_1PX
    assert response.headers["Content-Type"] == "image/png"
    assert response.headers["Cache-Control"] == "private, max-age=31536000, immutable"
    assert response.headers["X-Content-Type-Options"] == "nosniff"

    # L'asset n'est servi que sous son propre projet
    response = await client.get(f"/api/home_architect/background/plan_other001/{asset_id}")
    assert response.status == 404
    for asset in ("..%2F..%2Fsecrets.yaml", "plan_abcd1234-0123456789ab.exe", "plan_abcd1234.png"):
        response = await client.get(f"{UPLOAD_URL}/{asset}")
        assert response.status in (400, 404), asset


async def test_upload_svg_is_sanitized(
    hass: HomeAssistant, setup_integration: MockConfigEntry, hass_client: ClientSessionGenerator
) -> None:
    """Un fond SVG est assaini et servi avec une CSP stricte."""
    client = await hass_client()
    svg = b'<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><script>alert(2)</script><rect width="1" height="1"/></svg>'
    response = await client.post(UPLOAD_URL, data=svg, headers={"Content-Type": "image/svg+xml"})
    assert response.status == 200
    asset_id = (await response.json())["asset_id"]
    response = await client.get(f"{UPLOAD_URL}/{asset_id}")
    content = await response.text()
    assert "script" not in content and "onload" not in content and "<rect" in content
    assert response.headers["Content-Security-Policy"] == SVG_CSP


async def test_upload_rejections(
    hass: HomeAssistant,
    setup_integration: MockConfigEntry,
    hass_client: ClientSessionGenerator,
    hass_read_only_access_token: str,
) -> None:
    """403 non-admin, 415 type refusé, 400 contenu incohérent, 413 trop gros, 400 id invalide."""
    user_client = await hass_client(hass_read_only_access_token)
    response = await user_client.post(UPLOAD_URL, data=PNG_1PX, headers={"Content-Type": "image/png"})
    assert response.status == 403

    client = await hass_client()
    response = await client.post(UPLOAD_URL, data=b"<html></html>", headers={"Content-Type": "text/html"})
    assert response.status == 415
    response = await client.post(UPLOAD_URL, data=b"not a png", headers={"Content-Type": "image/png"})
    assert response.status == 400
    response = await client.post(UPLOAD_URL, data=b"<!DOCTYPE svg><svg/>", headers={"Content-Type": "image/svg+xml"})
    assert response.status == 400
    response = await client.post(
        UPLOAD_URL, data=b"\x89PNG\r\n\x1a\n" + b"0" * (MAX_UPLOAD_BYTES + 1), headers={"Content-Type": "image/png"}
    )
    assert response.status == 413
    response = await client.post("/api/home_architect/background/bad.id", data=PNG_1PX, headers={"Content-Type": "image/png"})
    assert response.status == 400

    # Lecture sans authentification refusée
    response = await client.get(f"{UPLOAD_URL}/plan_abcd1234-0123456789ab.png", headers={"Authorization": ""})
    assert response.status == 401


async def test_published_plan_is_public_with_strict_headers(
    hass: HomeAssistant,
    setup_integration: MockConfigEntry,
    hass_ws_client: WebSocketGenerator,
    hass_client_no_auth: ClientSessionGenerator,
) -> None:
    """Plan publié : accessible sans compte, CSP, nosniff, no-cache, ETag et 304."""
    ws = await hass_ws_client(hass)
    await ws.send_json_auto_id({"type": "home_architect/save_project", "project": make_project()})
    await ws.receive_json()
    await ws.send_json_auto_id(
        {
            "type": "home_architect/publish_svg",
            "project_id": "plan_abcd1234",
            "svg_content": '<svg xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1"/></svg>',
        }
    )
    info = (await ws.receive_json())["result"]

    client = await hass_client_no_auth()
    response = await client.get(info["url"])
    assert response.status == 200
    assert response.headers["Content-Type"] == "image/svg+xml; charset=utf-8"
    assert response.headers["Content-Security-Policy"] == SVG_CSP
    assert response.headers["X-Content-Type-Options"] == "nosniff"
    assert response.headers["Cache-Control"] == "no-cache"
    assert response.headers["ETag"] == f'"{info["hash"]}"'
    assert "<rect" in await response.text()

    response = await client.get(info["path"], headers={"If-None-Match": f'"{info["hash"]}"'})
    assert response.status == 304

    # Nom deviné ou plan retiré : 404
    response = await client.get("/api/home_architect/published/plan_abcd1234.svg")
    assert response.status == 404
    await ws.send_json_auto_id({"type": "home_architect/unpublish", "project_id": "plan_abcd1234"})
    await ws.receive_json()
    response = await client.get(info["path"])
    assert response.status == 404


async def test_removed_plan_view_is_gone(
    hass: HomeAssistant, setup_integration: MockConfigEntry, hass_client: ClientSessionGenerator
) -> None:
    """L'ancienne vue /api/home_architect/plan/{id}.svg n'existe plus."""
    client = await hass_client()
    response = await client.get("/api/home_architect/plan/rdc.svg")
    assert response.status == 404
