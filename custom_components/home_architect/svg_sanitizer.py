"""Assainisseur SVG par liste blanche.

Module PUR (aucun import Home Assistant) : il est utilisé pour les SVG publiés
(vue publique sans authentification) et pour les images de fond SVG téléversées.

Principe : le document est d'abord sondé avec expat pour refuser tout DOCTYPE /
déclaration d'entité (XXE, « billion laughs »), puis parsé avec ElementTree et
reconstruit élément par élément en ne recopiant que ce qui figure dans les
listes blanches. Tout ce qui n'est pas explicitement autorisé est supprimé.
"""
from __future__ import annotations

import base64
import binascii
from dataclasses import dataclass
import re
from urllib.parse import unquote_to_bytes
import xml.etree.ElementTree as ET
from xml.parsers import expat

SVG_NS = "http://www.w3.org/2000/svg"
XLINK_NS = "http://www.w3.org/1999/xlink"
XML_NS = "http://www.w3.org/XML/1998/namespace"

# Profondeur d'imbrication maximale (la sérialisation d'ElementTree est récursive)
MAX_DEPTH = 128

ALLOWED_ELEMENTS = frozenset(
    {
        "svg", "g", "defs", "title", "desc",
        "path", "rect", "circle", "ellipse", "line", "polyline", "polygon",
        "text", "tspan",
        "linearGradient", "radialGradient", "stop", "pattern",
        "clipPath", "mask", "marker", "symbol", "use", "image",
    }
)  # fmt: skip

# Éléments retirés mais dont le contenu (assaini) est conservé à leur place
UNWRAP_ELEMENTS = frozenset({"a", "switch"})

ALLOWED_ATTRIBUTES = frozenset(
    {
        # Cœur
        "id", "class", "style", "lang", "version", "baseProfile",
        # Géométrie
        "x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r", "rx", "ry",
        "fx", "fy", "fr", "width", "height", "d", "points", "pathLength",
        "transform", "transform-origin", "viewBox", "preserveAspectRatio",
        "dx", "dy", "rotate", "textLength", "lengthAdjust",
        "refX", "refY", "markerWidth", "markerHeight", "markerUnits", "orient",
        "patternUnits", "patternContentUnits", "patternTransform",
        "gradientUnits", "gradientTransform", "spreadMethod", "offset",
        "clipPathUnits", "maskUnits", "maskContentUnits",
        # Présentation
        "fill", "fill-opacity", "fill-rule",
        "stroke", "stroke-width", "stroke-opacity", "stroke-linecap",
        "stroke-linejoin", "stroke-miterlimit", "stroke-dasharray",
        "stroke-dashoffset",
        "opacity", "color", "display", "visibility", "overflow",
        "clip-path", "clip-rule", "mask", "marker-start", "marker-mid", "marker-end",
        "stop-color", "stop-opacity",
        "font-family", "font-size", "font-weight", "font-style", "font-variant",
        "font-stretch", "font-size-adjust",
        "text-anchor", "dominant-baseline", "alignment-baseline", "baseline-shift",
        "letter-spacing", "word-spacing", "text-decoration", "writing-mode",
        "direction", "unicode-bidi",
        "vector-effect", "shape-rendering", "text-rendering", "image-rendering",
        "color-interpolation", "paint-order", "mix-blend-mode", "isolation",
    }
)  # fmt: skip

_RASTER_DATA_URL_TYPES = {
    "png": "image/png",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "webp": "image/webp",
    "gif": "image/gif",
}

_FRAGMENT_RE = re.compile(r"^#[A-Za-z_][A-Za-z0-9_.:-]*$")
_DATA_URL_RE = re.compile(
    r"^data:image/(?P<type>png|jpe?g|webp|gif|svg\+xml)(?P<params>(?:;[^,;]*)*),(?P<payload>.*)$",
    re.IGNORECASE | re.DOTALL,
)
_BASE64_RE = re.compile(r"^[A-Za-z0-9+/]*={0,2}$")
_CSS_COMMENT_RE = re.compile(r"/\*.*?\*/", re.DOTALL)
_CSS_PROPERTY_RE = re.compile(r"^-?[A-Za-z][A-Za-z0-9-]*$")
_URL_FUNC_RE = re.compile(r"url\(", re.IGNORECASE)
_LOCAL_URL_RE = re.compile(r"url\(\s*['\"]?\s*#", re.IGNORECASE)
_INVISIBLE_RE = re.compile(r"[\s\x00-\x1f\x7f]+")
# Recherchés après suppression des blancs et passage en minuscules
_FORBIDDEN_TOKENS = (
    "javascript:",
    "vbscript:",
    "expression(",
    "@import",
    "behavior:",
    "-moz-binding",
    "image-set(",
    "cross-fade(",
    "src(",
    "</",
)


class SvgSanitizeError(ValueError):
    """Le contenu n'est pas un SVG acceptable (XML invalide, DOCTYPE, racine...)."""


@dataclass(frozen=True)
class _Context:
    drop_images: bool
    nested: bool


def detect_raster_mime(data: bytes) -> str | None:
    """Retourne le type MIME d'une image raster d'après sa signature, sinon None."""
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if data.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if data[:6] in (b"GIF87a", b"GIF89a"):
        return "image/gif"
    if len(data) >= 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    return None


def sanitize_svg(content: str | bytes, *, drop_images: bool = False) -> str:
    """Assainit un document SVG et retourne sa version ré-sérialisée.

    `drop_images=True` supprime tous les éléments <image> (publication sans fond).
    Lève SvgSanitizeError si le document est refusé.
    """
    return _sanitize_document(content, _Context(drop_images=drop_images, nested=False))


def sanitize_style_attribute(value: str) -> str:
    """Filtre un attribut style= déclaration par déclaration."""
    kept: list[str] = []
    for declaration in _CSS_COMMENT_RE.sub("", value).split(";"):
        prop, sep, val = declaration.partition(":")
        prop = prop.strip()
        val = val.strip()
        if not sep or not val or not _CSS_PROPERTY_RE.match(prop):
            continue
        if not _is_safe_css(val):
            continue
        kept.append(f"{prop}: {val}")
    return "; ".join(kept)


def _sanitize_document(content: str | bytes, ctx: _Context) -> str:
    _reject_dtd(content)
    try:
        source_root = ET.fromstring(content)
    except ET.ParseError as err:
        raise SvgSanitizeError(f"invalid XML: {err}") from err

    namespace, local = _split_name(source_root.tag)
    if local != "svg" or namespace not in (SVG_NS, None):
        raise SvgSanitizeError("root element must be <svg>")

    # Éléments reconstruits sans espace de noms + xmlns explicite sur la racine
    # (default_namespace d'ElementTree refuse les attributs non qualifiés).
    root = ET.Element("svg", _clean_attributes("svg", source_root.attrib, ctx))
    root.set("xmlns", SVG_NS)
    _copy_children(source_root, root, 0, ctx)
    return ET.tostring(root, encoding="unicode")


def _reject_dtd(content: str | bytes) -> None:
    """Refuse tout DOCTYPE ou déclaration d'entité (avant le parsing ElementTree)."""

    def _forbid(*_args: object) -> None:
        raise SvgSanitizeError("DOCTYPE and entity declarations are not allowed")

    parser = expat.ParserCreate()
    parser.StartDoctypeDeclHandler = _forbid
    parser.EntityDeclHandler = _forbid
    parser.UnparsedEntityDeclHandler = _forbid
    parser.NotationDeclHandler = _forbid
    try:
        parser.Parse(content, True)
    except expat.ExpatError as err:
        raise SvgSanitizeError(f"invalid XML: {err}") from err


def _split_name(name: str) -> tuple[str | None, str]:
    if name.startswith("{"):
        namespace, _, local = name[1:].partition("}")
        return namespace, local
    return None, name


def _append_text(parent: ET.Element, text: str | None) -> None:
    """Ajoute du texte au point d'insertion courant de `parent`."""
    if not text:
        return
    if len(parent):
        last = parent[-1]
        last.tail = (last.tail or "") + text
    else:
        parent.text = (parent.text or "") + text


def _copy_children(source: ET.Element, target: ET.Element, depth: int, ctx: _Context) -> None:
    _append_text(target, source.text)
    for child in source:
        _copy_node(child, target, depth + 1, ctx)
        _append_text(target, child.tail)


def _copy_node(node: ET.Element, target: ET.Element, depth: int, ctx: _Context) -> None:
    if depth > MAX_DEPTH:
        raise SvgSanitizeError("nesting too deep")
    if not isinstance(node.tag, str):
        return
    namespace, local = _split_name(node.tag)
    if namespace not in (SVG_NS, None):
        return  # espace de noms étranger (XHTML, Inkscape, ...) : sous-arbre supprimé
    if local in UNWRAP_ELEMENTS:
        _copy_children(node, target, depth, ctx)
        return
    if local == "style":
        css = "".join(node.itertext())
        if _is_safe_css(css):
            ET.SubElement(target, "style").text = css
        return
    if local not in ALLOWED_ELEMENTS or (local == "image" and ctx.drop_images):
        return
    element = ET.SubElement(target, local, _clean_attributes(local, node.attrib, ctx))
    _copy_children(node, element, depth, ctx)


def _clean_attributes(element: str, attrib: dict[str, str], ctx: _Context) -> dict[str, str]:
    cleaned: dict[str, str] = {}
    href: str | None = None
    xlink_href: str | None = None
    for key, value in attrib.items():
        namespace, name = _split_name(key)
        if namespace is None and name == "href":
            href = value
        elif namespace == XLINK_NS and name == "href":
            xlink_href = value
        elif namespace == XML_NS and name == "space":
            if value in ("default", "preserve"):
                cleaned[key] = value
        elif namespace is None and name in ALLOWED_ATTRIBUTES:
            if name == "style":
                style = sanitize_style_attribute(value)
                if style:
                    cleaned["style"] = style
            elif _is_safe_value(value):
                cleaned[name] = value
    candidate = href if href is not None else xlink_href
    if candidate is not None:
        safe_href = _clean_href(element, candidate, ctx)
        if safe_href is not None:
            cleaned["href"] = safe_href
    return cleaned


def _normalized(value: str) -> str:
    return _INVISIBLE_RE.sub("", value).lower()


def _only_local_urls(value: str) -> bool:
    return len(_URL_FUNC_RE.findall(value)) == len(_LOCAL_URL_RE.findall(value))


def _is_safe_value(value: str) -> bool:
    if "\\" in value:
        return False
    normalized = _normalized(value)
    if any(token in normalized for token in _FORBIDDEN_TOKENS):
        return False
    return _only_local_urls(value)


def _is_safe_css(css: str) -> bool:
    without_comments = _CSS_COMMENT_RE.sub("", css)
    if "/*" in without_comments:
        return False  # commentaire non fermé
    return _is_safe_value(without_comments)


def _clean_href(element: str, value: str, ctx: _Context) -> str | None:
    candidate = value.strip()
    if candidate.startswith("#"):
        return candidate if element != "image" and _FRAGMENT_RE.match(candidate) else None
    if element == "image":
        return _clean_image_data_url(candidate, ctx)
    return None


def _clean_image_data_url(value: str, ctx: _Context) -> str | None:
    """N'accepte que data:image/(png|jpeg|webp|gif)[;base64] et un SVG imbriqué assaini."""
    match = _DATA_URL_RE.match(value)
    if match is None:
        return None
    image_type = match.group("type").lower()
    params = [p.strip().lower() for p in match.group("params").split(";") if p.strip()]
    is_base64 = "base64" in params
    payload = match.group("payload")

    if image_type == "svg+xml":
        if ctx.nested:
            return None  # un seul niveau d'imbrication
        try:
            data = _decode_payload(payload, is_base64)
            nested_svg = _sanitize_document(data, _Context(drop_images=ctx.drop_images, nested=True))
        except SvgSanitizeError:
            return None
        encoded = base64.b64encode(nested_svg.encode("utf-8")).decode("ascii")
        return f"data:image/svg+xml;base64,{encoded}"

    if not is_base64:
        return None
    mime = _RASTER_DATA_URL_TYPES[image_type]
    compact = _INVISIBLE_RE.sub("", payload)
    try:
        data = _decode_payload(compact, True)
    except SvgSanitizeError:
        return None
    if detect_raster_mime(data) != mime:
        return None
    return f"data:{mime};base64,{compact}"


def _decode_payload(payload: str, is_base64: bool) -> bytes:
    if not is_base64:
        return unquote_to_bytes(payload)
    compact = _INVISIBLE_RE.sub("", payload)
    if not _BASE64_RE.match(compact):
        raise SvgSanitizeError("invalid base64 payload")
    try:
        return base64.b64decode(compact, validate=True)
    except (binascii.Error, ValueError) as err:
        raise SvgSanitizeError("invalid base64 payload") from err
