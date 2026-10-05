"""Données de test partagées."""
from __future__ import annotations

import base64
from typing import Any

PNG_1PX = base64.b64decode(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
)
PNG_DATA_URL = "data:image/png;base64," + base64.b64encode(PNG_1PX).decode()


def make_project(project_id: str = "plan_abcd1234", **extra: Any) -> dict[str, Any]:
    """Projet minimal valide."""
    project: dict[str, Any] = {
        "id": project_id,
        "name": "Maison",
        "category": "rdc",
        "created_at": "2026-01-01T00:00:00.000Z",
        "updated_at": "2026-01-01T00:00:00.000Z",
        "pixelsPerMeter": 50,
        "grid": {"size": 0.5, "subdivisions": 2, "snapToGrid": True, "snapToAngles": True, "snapToElements": True},
        "walls": [{"id": "wall_1", "start": {"x": 0, "y": 0}, "end": {"x": 4, "y": 0}, "thickness": 0.2, "type": "standard"}],
        "openings": [],
        "rooms": [],
        "bindings": [],
        "furniture": [],
    }
    project.update(extra)
    return project
