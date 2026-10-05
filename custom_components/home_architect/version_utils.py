"""Comparaison de versions sémantiques (module pur, sans dépendance Home Assistant)."""
from __future__ import annotations

import re
from typing import NamedTuple

_SEMVER_RE = re.compile(
    r"^[vV]?(?P<major>0|[1-9]\d*)\.(?P<minor>0|[1-9]\d*)\.(?P<patch>0|[1-9]\d*)"
    r"(?:-(?P<pre>[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?"
    r"(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$"
)


class SemVer(NamedTuple):
    """Version X.Y.Z[-prerelease] (les métadonnées de build sont ignorées)."""

    major: int
    minor: int
    patch: int
    prerelease: tuple[str, ...]


def parse_semver(value: str | None) -> SemVer | None:
    """Analyse « 1.2.3 », « v1.2.3 » ou « 1.2.3-beta.1 » ; None si invalide."""
    if not isinstance(value, str):
        return None
    match = _SEMVER_RE.match(value.strip())
    if match is None:
        return None
    pre = match.group("pre")
    return SemVer(
        int(match.group("major")),
        int(match.group("minor")),
        int(match.group("patch")),
        tuple(pre.split(".")) if pre else (),
    )


def normalize_version(value: str | None) -> str | None:
    """Retourne la version sans préfixe « v » ni espaces, ou None si invalide."""
    if not isinstance(value, str) or parse_semver(value) is None:
        return None
    return value.strip().lstrip("vV")


def _compare_identifiers(left: str, right: str) -> int:
    left_num, right_num = left.isdigit(), right.isdigit()
    if left_num and right_num:
        return (int(left) > int(right)) - (int(left) < int(right))
    if left_num != right_num:
        return -1 if left_num else 1  # numérique < alphanumérique
    return (left > right) - (left < right)


def compare_versions(left: SemVer, right: SemVer) -> int:
    """Ordre SemVer 2.0 : -1, 0 ou 1."""
    left_core, right_core = left[:3], right[:3]
    if left_core != right_core:
        return 1 if left_core > right_core else -1
    if left.prerelease == right.prerelease:
        return 0
    if not left.prerelease:
        return 1  # 1.0.0 > 1.0.0-rc.1
    if not right.prerelease:
        return -1
    for left_id, right_id in zip(left.prerelease, right.prerelease, strict=False):
        result = _compare_identifiers(left_id, right_id)
        if result:
            return result
    return (len(left.prerelease) > len(right.prerelease)) - (
        len(left.prerelease) < len(right.prerelease)
    )


def is_newer_version(candidate: str | None, installed: str | None) -> bool:
    """True seulement si `candidate` est une version valide strictement supérieure."""
    candidate_version = parse_semver(candidate)
    installed_version = parse_semver(installed)
    if candidate_version is None or installed_version is None:
        return False
    return compare_versions(candidate_version, installed_version) > 0
