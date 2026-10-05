"""Migration du Store v1 -> v2 et nettoyage des fichiers."""
from __future__ import annotations

import os
from pathlib import Path
import time
from typing import Any

from pytest_homeassistant_custom_component.common import MockConfigEntry

from homeassistant.core import HomeAssistant

from custom_components.home_architect.const import STORAGE_KEY

from factories import PNG_DATA_URL, make_project


async def test_migration_v1_to_v2(
    hass: HomeAssistant, hass_storage: dict[str, Any], config_entry: MockConfigEntry, mock_github
) -> None:
    """Révision 1, schema_version 2, fonds extraits en fichiers, ids invalides écartés."""
    background = {"imageUrl": PNG_DATA_URL, "opacity": 0.6, "visible": True, "offset": {"x": 0, "y": 0}, "scale": 1, "rotation": 0}
    broken = {**background, "imageUrl": "data:image/png;base64,!!!"}
    hass_storage[STORAGE_KEY] = {
        "version": 1,
        "key": STORAGE_KEY,
        "data": {
            "projects": {
                "rdc": {
                    **make_project("rdc", background=background),
                    "bindings": [
                        {"id": "b1", "entityId": "cover.garage", "position": {"x": 1, "y": 1}, "tapAction": "toggle"},
                        {"id": "b2", "entityId": "light.salon", "position": {"x": 2, "y": 1}, "tapAction": "more-info"},
                    ],
                },
                "etage1": make_project("etage1", background=broken),
                "../bad": make_project("../bad"),
            }
        },
    }
    assert await hass.config_entries.async_setup(config_entry.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)

    stored = hass_storage[STORAGE_KEY]
    assert stored["version"] == 2
    assert stored["minor_version"] == 1
    data = stored["data"]
    assert set(data["projects"]) == {"rdc", "etage1"}
    assert data["publications"] == {}

    rdc = data["projects"]["rdc"]
    assert rdc["revision"] == 1
    assert rdc["schema_version"] == 2
    assert rdc["background"]["imageUrl"] == ""
    assert rdc["background"]["mimeType"] == "image/png"
    asset_id = rdc["background"]["assetId"]
    assert asset_id.startswith("rdc-")
    assert Path(hass.config.path("home_architect", "backgrounds", asset_id)).is_file()
    # tapAction 'toggle' figé par la v1 retiré (action par défaut du domaine), choix explicite conservé
    assert "tapAction" not in rdc["bindings"][0]
    assert rdc["bindings"][1]["tapAction"] == "more-info"

    # Image illisible : conservée telle quelle plutôt que perdue
    assert data["projects"]["etage1"]["background"]["imageUrl"] == broken["imageUrl"]


async def test_dereferenced_background_survives_grace_period(
    hass: HomeAssistant, setup_integration: MockConfigEntry, hass_ws_client
) -> None:
    """Un ancien fond retiré par une sauvegarde reste disponible (annulation après sauvegarde)."""
    client = await hass_ws_client(hass)
    background = {"imageUrl": PNG_DATA_URL, "opacity": 1, "visible": True, "offset": {"x": 0, "y": 0}, "scale": 1, "rotation": 0}
    await client.send_json_auto_id({"type": "home_architect/save_project", "project": make_project(background=background)})
    asset_id = (await client.receive_json())["result"]["asset_id"]
    asset = Path(hass.config.path("home_architect", "backgrounds", asset_id))
    three_days_ago = time.time() - 3 * 86400
    os.utime(asset, (three_days_ago, three_days_ago))  # téléversé il y a longtemps

    await client.send_json_auto_id({"type": "home_architect/save_project", "project": make_project(), "expected_revision": 1})
    assert (await client.receive_json())["success"] is True
    assert asset.exists()  # le délai de grâce part du déréférencement

    # Annulation : le fond est de nouveau référencé et toujours lisible
    restored = make_project(background={**background, "imageUrl": "", "assetId": asset_id})
    await client.send_json_auto_id({"type": "home_architect/save_project", "project": restored, "expected_revision": 2})
    assert (await client.receive_json())["result"]["asset_id"] == asset_id
    assert asset.exists()


async def test_garbage_collection_at_startup(
    hass: HomeAssistant, hass_storage: dict[str, Any], config_entry: MockConfigEntry, mock_github
) -> None:
    """Assets orphelins anciens et publications inconnues supprimés au démarrage."""
    backgrounds = Path(hass.config.path("home_architect", "backgrounds"))
    published = Path(hass.config.path("home_architect", "published"))
    backgrounds.mkdir(parents=True)
    published.mkdir(parents=True)
    referenced = backgrounds / "rdc-0123456789ab.png"
    old_orphan = backgrounds / "rdc-aaaaaaaaaaaa.png"
    recent_orphan = backgrounds / "plan_new00001-bbbbbbbbbbbb.png"
    stale_publication = published / "rdc-abcdefghijklmnopqrstuvwxyz.svg"
    for path in (referenced, old_orphan, recent_orphan, stale_publication):
        path.write_bytes(b"x")
    two_days_ago = time.time() - 2 * 86400
    for path in (referenced, old_orphan):
        os.utime(path, (two_days_ago, two_days_ago))

    project = make_project("rdc", background={"imageUrl": "", "assetId": referenced.name, "opacity": 1, "visible": True, "offset": {"x": 0, "y": 0}, "scale": 1, "rotation": 0})
    project["revision"] = 1
    hass_storage[STORAGE_KEY] = {
        "version": 2,
        "minor_version": 1,
        "key": STORAGE_KEY,
        "data": {"projects": {"rdc": project}, "publications": {}},
    }
    assert await hass.config_entries.async_setup(config_entry.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)

    assert referenced.exists()
    assert recent_orphan.exists()
    assert not old_orphan.exists()
    assert not stale_publication.exists()
