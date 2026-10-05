"""Tests unitaires de la comparaison SemVer (module pur)."""
from __future__ import annotations

import pytest

from custom_components.home_architect.version_utils import (
    SemVer,
    compare_versions,
    is_newer_version,
    normalize_version,
    parse_semver,
)


def test_parse_semver() -> None:
    assert parse_semver("1.2.3") == SemVer(1, 2, 3, ())
    assert parse_semver("v1.10.0") == SemVer(1, 10, 0, ())
    assert parse_semver(" V2.0.0-rc.1+build.5 ") == SemVer(2, 0, 0, ("rc", "1"))
    for invalid in (None, "", "1.2", "1.2.3.4", "01.2.3", "latest", "1.2.x", 123):
        assert parse_semver(invalid) is None, invalid


def test_normalize_version() -> None:
    assert normalize_version("v1.1.0") == "1.1.0"
    assert normalize_version("refs/tags/1.0") is None


@pytest.mark.parametrize(
    ("candidate", "installed", "expected"),
    [
        ("1.0.25", "1.0.24", True),
        ("1.0.10", "1.0.9", True),  # pas de comparaison lexicographique
        ("1.1.0", "1.0.99", True),
        ("2.0.0", "1.99.99", True),
        ("1.0.24", "1.0.24", False),
        ("1.0.24", "1.0.25", False),  # pas de rétrogradation proposée
        ("1.1.0-beta.1", "1.0.24", True),
        ("1.1.0-beta.1", "1.1.0", False),
        ("1.1.0", "1.1.0-rc.1", True),
        ("1.1.0-rc.2", "1.1.0-rc.1", True),
        ("1.1.0-rc.10", "1.1.0-rc.9", True),
        ("1.1.0-rc", "1.1.0-1", True),  # alphanumérique > numérique
        ("1.1.0-rc.1", "1.1.0-rc", True),  # plus d'identifiants > moins
        ("v1.0.25", "1.0.24", True),
        ("garbage", "1.0.24", False),
        ("1.0.25", None, False),
    ],
)
def test_is_newer_version(candidate: str | None, installed: str | None, expected: bool) -> None:
    assert is_newer_version(candidate, installed) is expected


def test_compare_versions_is_antisymmetric() -> None:
    versions = ["1.0.0-alpha", "1.0.0-alpha.1", "1.0.0-alpha.beta", "1.0.0-beta", "1.0.0-beta.2", "1.0.0-beta.11", "1.0.0-rc.1", "1.0.0"]
    parsed = [parse_semver(v) for v in versions]
    for index, left in enumerate(parsed):
        for other, right in enumerate(parsed):
            assert left is not None and right is not None
            expected = (index > other) - (index < other)
            assert compare_versions(left, right) == expected
