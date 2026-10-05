"""Commandes WebSocket : droits, révisions, limites, fichiers."""
from __future__ import annotations

from pathlib import Path
from typing import Any
from unittest.mock import patch

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry
from pytest_homeassistant_custom_component.typing import MockHAClientWebSocket, WebSocketGenerator

from homeassistant.core import HomeAssistant
from homeassistant.exceptions import HomeAssistantError
from homeassistant.util.file import WriteError

from custom_components.home_architect.const import MAX_PROJECT_BYTES

from factories import PNG_DATA_URL, make_project

SIMPLE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="1" height="1"/></svg>'


async def _call(client: MockHAClientWebSocket, **message: Any) -> dict[str, Any]:
    await client.send_json_auto_id(message)
    return await client.receive_json()


@pytest.fixture
async def admin_ws(hass: HomeAssistant, setup_integration: MockConfigEntry, hass_ws_client: WebSocketGenerator) -> MockHAClientWebSocket:
    return await hass_ws_client(hass)


@pytest.fixture
async def user_ws(
    hass: HomeAssistant,
    setup_integration: MockConfigEntry,
    hass_ws_client: WebSocketGenerator,
    hass_read_only_access_token: str,
) -> MockHAClientWebSocket:
    return await hass_ws_client(hass, hass_read_only_access_token)


async def test_read_commands_are_open_to_all_users(admin_ws: MockHAClientWebSocket, user_ws: MockHAClientWebSocket) -> None:
    """list_projects / get_project / get_projects : lecture pour tout utilisateur."""
    saved = await _call(admin_ws, type="home_architect/save_project", project=make_project())
    assert saved["success"] is True

    listed = await _call(user_ws, type="home_architect/list_projects")
    assert listed["success"] is True
    [summary] = listed["result"]["projects"]
    assert summary == {
        "id": "plan_abcd1234",
        "name": "Maison",
        "category": "rdc",
        "created_at": "2026-01-01T00:00:00.000Z",
        "updated_at": saved["result"]["updated_at"],
        "revision": 1,
        "has_background": False,
        "publish": None,
        "counts": {"walls": 1, "rooms": 0, "bindings": 0, "furniture": 0},
    }

    got = await _call(user_ws, type="home_architect/get_project", project_id="plan_abcd1234")
    assert got["success"] is True
    assert got["result"]["project"]["walls"][0]["id"] == "wall_1"
    assert got["result"]["project"]["schema_version"] == 2

    missing = await _call(user_ws, type="home_architect/get_project", project_id="plan_missing0")
    assert missing["error"]["code"] == "not_found"

    legacy = await _call(user_ws, type="home_architect/get_projects")
    assert [p["id"] for p in legacy["result"]["projects"]] == ["plan_abcd1234"]


@pytest.mark.parametrize(
    "message",
    [
        {"type": "home_architect/save_project", "project": make_project()},
        {"type": "home_architect/delete_project", "project_id": "plan_abcd1234"},
        {"type": "home_architect/publish_svg", "project_id": "plan_abcd1234", "svg_content": SIMPLE_SVG},
        {"type": "home_architect/unpublish", "project_id": "plan_abcd1234"},
        {"type": "home_architect/check_updates"},
    ],
)
async def test_write_commands_require_admin(user_ws: MockHAClientWebSocket, message: dict[str, Any]) -> None:
    """Toute écriture (et la vérification réseau des mises à jour) exige un admin."""
    response = await _call(user_ws, **message)
    assert response["success"] is False
    assert response["error"]["code"] == "unauthorized"


async def test_save_revision_conflicts(admin_ws: MockHAClientWebSocket) -> None:
    """Création sans révision, mise à jour avec révision, conflit, puis forçage."""
    created = await _call(admin_ws, type="home_architect/save_project", project=make_project(revision=99, publish={"x": 1}))
    assert created["result"]["revision"] == 1
    assert created["result"]["success"] is True

    updated = await _call(admin_ws, type="home_architect/save_project", project=make_project(name="v2"), expected_revision=1)
    assert updated["result"]["revision"] == 2

    stale = await _call(admin_ws, type="home_architect/save_project", project=make_project(name="stale"), expected_revision=1)
    assert stale["success"] is False
    assert stale["error"] == {"code": "conflict", "message": "conflict:2"}

    # Un nouveau plan qui réutiliserait un id existant ne l'écrase pas silencieusement
    overwrite = await _call(admin_ws, type="home_architect/save_project", project=make_project(name="new"))
    assert overwrite["error"]["message"] == "conflict:2"

    forced = await _call(admin_ws, type="home_architect/save_project", project=make_project(name="forced"), expected_revision=1, force=True)
    assert forced["result"]["revision"] == 3

    got = await _call(admin_ws, type="home_architect/get_project", project_id="plan_abcd1234")
    project = got["result"]["project"]
    assert project["name"] == "forced"
    assert project["revision"] == 3
    assert project["created_at"] == "2026-01-01T00:00:00.000Z"
    assert project["updated_at"] == forced["result"]["updated_at"]
    assert "publish" not in project


async def test_save_validation_and_limits(admin_ws: MockHAClientWebSocket) -> None:
    """Types invalides, identifiant invalide et taille maximale."""
    invalid = await _call(admin_ws, type="home_architect/save_project", project=make_project(walls="nope"))
    assert invalid["error"]["code"] == "invalid_project"

    bad_id = await _call(admin_ws, type="home_architect/save_project", project=make_project("../etc"))
    assert bad_id["error"]["code"] == "invalid_format"

    big = make_project(notes="x" * (MAX_PROJECT_BYTES + 10))
    too_large = await _call(admin_ws, type="home_architect/save_project", project=big)
    assert too_large["error"]["code"] == "payload_too_large"
    size, limit = too_large["error"]["message"].split(":")[1:]
    assert int(size) > int(limit) == MAX_PROJECT_BYTES


async def test_save_extracts_background_data_url(hass: HomeAssistant, admin_ws: MockHAClientWebSocket) -> None:
    """Une data-URL de fond devient un asset fichier référencé par assetId."""
    background = {"imageUrl": PNG_DATA_URL, "opacity": 0.5, "visible": True, "offset": {"x": 0, "y": 0}, "scale": 1, "rotation": 0}
    saved = await _call(admin_ws, type="home_architect/save_project", project=make_project(background=background))
    asset_id = saved["result"]["asset_id"]
    assert asset_id.startswith("plan_abcd1234-") and asset_id.endswith(".png")
    assert Path(hass.config.path("home_architect", "backgrounds", asset_id)).is_file()

    project = (await _call(admin_ws, type="home_architect/get_project", project_id="plan_abcd1234"))["result"]["project"]
    assert project["background"]["assetId"] == asset_id
    assert project["background"]["imageUrl"] == ""
    assert project["background"]["mimeType"] == "image/png"

    # « Enregistrer sous » : l'asset de l'autre projet est rattaché au nouveau projet
    copy = make_project("plan_copy0001", background=project["background"])
    saved_copy = await _call(admin_ws, type="home_architect/save_project", project=copy)
    copied_asset = saved_copy["result"]["asset_id"]
    assert copied_asset.startswith("plan_copy0001-")
    assert Path(hass.config.path("home_architect", "backgrounds", copied_asset)).is_file()

    invalid = make_project("plan_bad00001", background={**background, "imageUrl": "data:image/png;base64,PHN2Zz4="})
    rejected = await _call(admin_ws, type="home_architect/save_project", project=invalid)
    assert rejected["error"]["code"] == "invalid_project"


async def test_save_drops_unsafe_image_urls(admin_ws: MockHAClientWebSocket) -> None:
    """Seules les URL http(s) ou relatives sont conservées dans imageUrl."""
    background = {"imageUrl": "javascript:alert(1)", "opacity": 1, "visible": True, "offset": {"x": 0, "y": 0}, "scale": 1, "rotation": 0}
    await _call(admin_ws, type="home_architect/save_project", project=make_project(background=background))
    project = (await _call(admin_ws, type="home_architect/get_project", project_id="plan_abcd1234"))["result"]["project"]
    assert project["background"]["imageUrl"] == ""


@pytest.mark.parametrize("error", [WriteError("disk full"), HomeAssistantError("disk full")])
async def test_save_write_failure_is_reported(admin_ws: MockHAClientWebSocket, error: Exception) -> None:
    """Un échec d'écriture du Store (même avalé par Store) n'est plus annoncé comme un succès."""
    with patch("homeassistant.helpers.storage.Store._async_write_data", side_effect=error):
        response = await _call(admin_ws, type="home_architect/save_project", project=make_project())
    assert response["success"] is False
    assert response["error"]["code"] == "save_failed"
    assert "disk full" not in response["error"]["message"]

    listed = await _call(admin_ws, type="home_architect/list_projects")
    assert listed["result"]["projects"] == []


async def test_publish_and_unpublish(hass: HomeAssistant, admin_ws: MockHAClientWebSocket) -> None:
    """Publication assainie, URL versionnée, jeton régénéré après retrait."""
    await _call(admin_ws, type="home_architect/save_project", project=make_project())
    malicious = SIMPLE_SVG.replace("<rect", '<script>alert(1)</script><rect onload="alert(2)"')
    published = await _call(admin_ws, type="home_architect/publish_svg", project_id="plan_abcd1234", svg_content=malicious, include_background=False)
    info = published["result"]
    assert info["url"] == f"{info['path']}?v={info['hash']}"
    assert info["path"].startswith("/api/home_architect/published/plan_abcd1234-")
    assert info["include_background"] is False
    assert "legacy_path" not in info
    filename = info["path"].rsplit("/", 1)[1]
    content = Path(hass.config.path("home_architect", "published", filename)).read_text()
    assert "script" not in content and "onload" not in content

    project = (await _call(admin_ws, type="home_architect/get_project", project_id="plan_abcd1234"))["result"]["project"]
    assert project["publish"] == info

    unpublished = await _call(admin_ws, type="home_architect/unpublish", project_id="plan_abcd1234")
    assert unpublished["result"]["success"] is True
    assert not Path(hass.config.path("home_architect", "published", filename)).exists()

    republished = await _call(admin_ws, type="home_architect/publish_svg", project_id="plan_abcd1234", svg_content=SIMPLE_SVG)
    assert republished["result"]["path"] != info["path"]


async def test_publish_errors(admin_ws: MockHAClientWebSocket) -> None:
    """SVG refusé, projet inconnu."""
    await _call(admin_ws, type="home_architect/save_project", project=make_project())
    doctype = '<!DOCTYPE svg [<!ENTITY x "y">]><svg xmlns="http://www.w3.org/2000/svg">&x;</svg>'
    invalid = await _call(admin_ws, type="home_architect/publish_svg", project_id="plan_abcd1234", svg_content=doctype)
    assert invalid["error"]["code"] == "invalid_svg"
    unknown = await _call(admin_ws, type="home_architect/publish_svg", project_id="plan_unknown1", svg_content=SIMPLE_SVG)
    assert unknown["error"]["code"] == "not_found"


async def test_publish_updates_legacy_www_file(hass: HomeAssistant, admin_ws: MockHAClientWebSocket) -> None:
    """Un ancien /config/www/plan_<id>.svg est mis à jour (copie de sauvegarde s'il a été retouché)."""
    await _call(admin_ws, type="home_architect/save_project", project=make_project())
    legacy = Path(hass.config.path("www", "plan_plan_abcd1234.svg"))
    legacy.parent.mkdir(parents=True, exist_ok=True)
    legacy.write_text('<svg xmlns="http://www.w3.org/2000/svg"><!-- retouché dans Inkscape --></svg>')

    published = await _call(admin_ws, type="home_architect/publish_svg", project_id="plan_abcd1234", svg_content=SIMPLE_SVG)
    assert published["result"]["legacy_path"] == "/local/plan_plan_abcd1234.svg"
    assert "<rect" in legacy.read_text()
    backups = list(Path(hass.config.path("home_architect", "backups")).iterdir())
    assert len(backups) == 1 and "Inkscape" in backups[0].read_text()

    # Republier sans modification externe : pas de nouvelle copie
    await _call(admin_ws, type="home_architect/publish_svg", project_id="plan_abcd1234", svg_content=SIMPLE_SVG.replace("1", "2"))
    assert len(list(Path(hass.config.path("home_architect", "backups")).iterdir())) == 1


async def test_delete_project_removes_files(hass: HomeAssistant, admin_ws: MockHAClientWebSocket) -> None:
    """La suppression retire le projet, ses fonds, sa publication et l'ancien fichier www."""
    background = {"imageUrl": PNG_DATA_URL, "opacity": 1, "visible": True, "offset": {"x": 0, "y": 0}, "scale": 1, "rotation": 0}
    asset_id = (await _call(admin_ws, type="home_architect/save_project", project=make_project(background=background)))["result"]["asset_id"]
    info = (await _call(admin_ws, type="home_architect/publish_svg", project_id="plan_abcd1234", svg_content=SIMPLE_SVG))["result"]
    legacy = Path(hass.config.path("www", "plan_plan_abcd1234.svg"))
    legacy.parent.mkdir(parents=True, exist_ok=True)
    legacy.write_text(SIMPLE_SVG)

    deleted = await _call(admin_ws, type="home_architect/delete_project", project_id="plan_abcd1234")
    assert deleted["success"] is True
    removed = set(deleted["result"]["removed_files"])
    assert f"home_architect/backgrounds/{asset_id}" in removed
    assert f"home_architect/published/{info['path'].rsplit('/', 1)[1]}" in removed
    assert "www/plan_plan_abcd1234.svg" in removed
    assert not legacy.exists()

    missing = await _call(admin_ws, type="home_architect/delete_project", project_id="plan_abcd1234")
    assert missing["error"]["code"] == "not_found"


async def test_subscribe_project_events(admin_ws: MockHAClientWebSocket, user_ws: MockHAClientWebSocket) -> None:
    """Les abonnés reçoivent {project_id, revision, deleted?} après save / publish / delete."""
    await user_ws.send_json_auto_id({"type": "home_architect/subscribe_project", "project_id": "plan_abcd1234"})
    subscribed = await user_ws.receive_json()
    assert subscribed["success"] is True
    subscription_id = subscribed["id"]

    await _call(admin_ws, type="home_architect/save_project", project=make_project("plan_other001"))
    await _call(admin_ws, type="home_architect/save_project", project=make_project())
    event = await user_ws.receive_json()
    assert event["id"] == subscription_id
    assert event["event"] == {"project_id": "plan_abcd1234", "revision": 1}

    await _call(admin_ws, type="home_architect/publish_svg", project_id="plan_abcd1234", svg_content=SIMPLE_SVG)
    assert (await user_ws.receive_json())["event"] == {"project_id": "plan_abcd1234", "revision": 1}

    await _call(admin_ws, type="home_architect/delete_project", project_id="plan_abcd1234")
    assert (await user_ws.receive_json())["event"] == {"project_id": "plan_abcd1234", "revision": 1, "deleted": True}


async def test_project_count_is_limited(admin_ws: MockHAClientWebSocket) -> None:
    """Le nombre de projets stockés est borné."""
    with patch("custom_components.home_architect.storage.MAX_PROJECTS", 1):
        assert (await _call(admin_ws, type="home_architect/save_project", project=make_project()))["success"] is True
        response = await _call(admin_ws, type="home_architect/save_project", project=make_project("plan_second01"))
        assert response["error"]["code"] == "too_many_projects"
        # La mise à jour d'un projet existant reste possible
        updated = await _call(admin_ws, type="home_architect/save_project", project=make_project(), expected_revision=1)
        assert updated["success"] is True
