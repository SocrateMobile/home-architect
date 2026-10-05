"""Tests unitaires de l'assainisseur SVG (module pur)."""
from __future__ import annotations

import base64
import xml.etree.ElementTree as ET

import pytest

from custom_components.home_architect.svg_sanitizer import (
    SVG_NS,
    SvgSanitizeError,
    detect_raster_mime,
    sanitize_style_attribute,
    sanitize_svg,
)

PNG_1PX = base64.b64decode(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
)
PNG_DATA_URL = "data:image/png;base64," + base64.b64encode(PNG_1PX).decode()


def _svg(body: str, attrs: str = "") -> str:
    return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"{attrs}>{body}</svg>'


def _tags(svg: str) -> list[str]:
    root = ET.fromstring(svg)
    return [el.tag.split("}", 1)[-1] for el in root.iter()]


def _assert_inert(result: str) -> None:
    lowered = result.lower()
    for needle in ("script", "javascript", "onload", "onclick", "onerror", "foreignobject", "iframe", "@import"):
        assert needle not in lowered, f"{needle!r} found in {result!r}"


def test_keeps_plan_geometry_and_presentation() -> None:
    source = _svg(
        '<defs><linearGradient id="g"><stop offset="0" stop-color="#fff"/></linearGradient></defs>'
        '<g transform="translate(10,20)"><rect x="1" y="2" width="3" height="4" fill="url(#g)" '
        'stroke="#000" stroke-width="0.5"/><text x="0" y="4" font-size="12" text-anchor="middle">'
        "Salon &amp; cuisine</text></g>",
        ' viewBox="0 0 100 100" style="background-color: #0f172a; max-width: 100%"',
    )
    result = sanitize_svg(source)
    root = ET.fromstring(result)
    assert root.tag == f"{{{SVG_NS}}}svg"
    assert root.get("viewBox") == "0 0 100 100"
    assert "background-color: #0f172a" in root.get("style", "")
    rect = root.find(f".//{{{SVG_NS}}}rect")
    assert rect is not None and rect.get("fill") == "url(#g)"
    text = root.find(f".//{{{SVG_NS}}}text")
    assert text is not None and text.text == "Salon & cuisine"


def test_rejects_svg_onload_shorthand() -> None:
    # « <svg/onload=…> » n'est pas du XML bien formé : refusé
    with pytest.raises(SvgSanitizeError):
        sanitize_svg("<svg/onload=alert(1)>")


def test_strips_event_handlers_and_uppercase_variants() -> None:
    result = sanitize_svg(
        _svg('<rect width="1" height="1" onclick="alert(1)" ONLOAD="alert(2)" onMouseOver="x"/>', ' onload="alert(3)"')
    )
    _assert_inert(result)
    assert "rect" in _tags(result)


def test_attributes_without_space_are_rejected() -> None:
    with pytest.raises(SvgSanitizeError):
        sanitize_svg(_svg('<rect x="1"onload="alert(1)"/>'))


def test_removes_script_elements_including_namespaced_and_uppercase() -> None:
    source = _svg(
        "<script>alert(1)</script><SCRIPT>alert(2)</SCRIPT>"
        '<x:script xmlns:x="http://www.w3.org/2000/svg">alert(3)</x:script>'
        '<h:script xmlns:h="http://www.w3.org/1999/xhtml">alert(4)</h:script><circle r="1"/>'
    )
    result = sanitize_svg(source)
    _assert_inert(result)
    assert "alert" not in result
    assert "circle" in _tags(result)


def test_entity_encoded_javascript_in_href_is_removed() -> None:
    result = sanitize_svg(_svg('<image width="1" height="1" href="javascript&#58;alert(1)"/>'))
    _assert_inert(result)
    assert "href" not in result


def test_xlink_href_javascript_is_removed() -> None:
    result = sanitize_svg(_svg('<use xlink:href="javascript:alert(1)"/><use href=" JaVa&#x09;ScRiPt:alert(2)"/>'))
    _assert_inert(result)
    assert "href" not in result


def test_use_only_accepts_local_fragments() -> None:
    svg_payload = base64.b64encode(b'<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>').decode()
    result = sanitize_svg(
        _svg(
            f'<symbol id="s"><rect width="1" height="1"/></symbol><use href="#s"/>'
            f'<use href="data:image/svg+xml;base64,{svg_payload}"/>'
            '<use xlink:href="https://evil.example/sprite.svg#x"/>'
        )
    )
    root = ET.fromstring(result)
    hrefs = [el.get("href") for el in root.iter(f"{{{SVG_NS}}}use")]
    assert hrefs == ["#s", None, None]


def test_image_accepts_only_embedded_raster_data_urls() -> None:
    result = sanitize_svg(
        _svg(
            f'<image href="{PNG_DATA_URL}" width="1" height="1"/>'
            '<image href="https://evil.example/track.png" width="1" height="1"/>'
            '<image xlink:href="data:text/html;base64,PHNjcmlwdD4=" width="1" height="1"/>'
            # Type annoncé PNG mais contenu qui n'en est pas un
            '<image href="data:image/png;base64,PHN2Zz4=" width="1" height="1"/>'
        )
    )
    root = ET.fromstring(result)
    hrefs = [el.get("href") for el in root.iter(f"{{{SVG_NS}}}image")]
    assert hrefs == [PNG_DATA_URL, None, None, None]


def test_nested_svg_image_is_sanitized_recursively() -> None:
    inner = b'<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><script>alert(2)</script><rect width="2" height="2"/></svg>'
    url = "data:image/svg+xml;base64," + base64.b64encode(inner).decode()
    result = sanitize_svg(_svg(f'<image href="{url}" width="1" height="1"/>'))
    href = ET.fromstring(result).find(f".//{{{SVG_NS}}}image").get("href")
    assert href.startswith("data:image/svg+xml;base64,")
    decoded = base64.b64decode(href.split(",", 1)[1]).decode()
    _assert_inert(decoded)
    assert "rect" in _tags(decoded)


def test_drop_images_removes_background() -> None:
    result = sanitize_svg(_svg(f'<image href="{PNG_DATA_URL}" width="1" height="1"/><rect width="1" height="1"/>'), drop_images=True)
    assert "image" not in _tags(result)
    assert "rect" in _tags(result)


def test_foreign_object_and_iframe_are_removed() -> None:
    result = sanitize_svg(
        _svg(
            '<foreignObject width="10" height="10"><body xmlns="http://www.w3.org/1999/xhtml">'
            '<iframe src="javascript:alert(1)"></iframe></body></foreignObject>'
            '<iframe src="https://evil.example"/><rect width="1" height="1"/>'
        )
    )
    _assert_inert(result)
    assert _tags(result) == ["svg", "rect"]


def test_style_element_with_import_or_external_url_is_removed() -> None:
    for css in (
        "@import url(https://evil.example/x.css);",
        "@IMPORT 'x.css';",
        "rect { fill: url(https://evil.example/p.png) }",
        "rect { background: expression(alert(1)) }",
        "rect { fill: u\\72l(https://evil.example) }",
        "rect { fill: red } /* unterminated",
    ):
        result = sanitize_svg(_svg(f"<style>{css}</style><rect/>"))
        assert "style" not in _tags(result), css


def test_safe_style_element_is_kept() -> None:
    result = sanitize_svg(_svg("<style>.wall { stroke: #333; fill: url(#hatch) } g > rect { opacity: .5 }</style>"))
    style = ET.fromstring(result).find(f"{{{SVG_NS}}}style")
    assert style is not None and "g > rect" in style.text


def test_doctype_and_entities_are_rejected() -> None:
    xxe = '<?xml version="1.0"?><!DOCTYPE svg [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><svg xmlns="http://www.w3.org/2000/svg"><text>&xxe;</text></svg>'
    laughs = (
        '<?xml version="1.0"?><!DOCTYPE lolz [<!ENTITY lol "lol"><!ENTITY lol2 "&lol;&lol;&lol;">]>'
        '<svg xmlns="http://www.w3.org/2000/svg"><text>&lol2;</text></svg>'
    )
    empty_subset = '<!DOCTYPE svg []><svg xmlns="http://www.w3.org/2000/svg"/>'
    for source in (xxe, laughs, empty_subset, xxe.encode("utf-16")):
        with pytest.raises(SvgSanitizeError):
            sanitize_svg(source)


def test_plain_public_doctype_is_tolerated_and_dropped() -> None:
    # Exports LibreOffice / Illustrator / AutoCAD : DOCTYPE public sans sous-ensemble interne.
    doctype_only = (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
        '<svg xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1"/></svg>'
    )
    result = sanitize_svg(doctype_only)
    assert "DOCTYPE" not in result
    assert ET.fromstring(result).find(f"{{{SVG_NS}}}rect") is not None


def test_animation_elements_are_removed() -> None:
    result = sanitize_svg(
        _svg(
            '<a href="#x"><rect width="1" height="1">'
            '<animate attributeName="href" to="javascript:alert(1)"/>'
            '<set attributeName="onclick" to="alert(1)"/>'
            '<animateTransform attributeName="transform" type="rotate"/>'
            "</rect></a>"
        )
    )
    _assert_inert(result)
    assert _tags(result) == ["svg", "rect"]


def test_anchor_is_unwrapped_keeping_content() -> None:
    result = sanitize_svg(_svg('<text>avant <a href="javascript:alert(1)"><tspan>lien</tspan></a> après</text>'))
    text = ET.fromstring(result).find(f"{{{SVG_NS}}}text")
    assert "".join(text.itertext()) == "avant lien après"
    _assert_inert(result)


def test_style_attribute_filters_dangerous_declarations() -> None:
    assert sanitize_style_attribute("fill: red; background: url(https://x); stroke: url(#a)") == "fill: red; stroke: url(#a)"
    assert sanitize_style_attribute("behavior: url(x.htc); width: expression(alert(1))") == ""
    assert sanitize_style_attribute("color: java/**/script:alert(1)") == ""
    result = sanitize_svg(_svg('<rect style="fill: red; background-image: url(\'https://evil\')"/>'))
    assert ET.fromstring(result).find(f"{{{SVG_NS}}}rect").get("style") == "fill: red"


def test_presentation_attribute_with_external_url_is_removed() -> None:
    result = sanitize_svg(_svg('<rect fill="url(https://evil.example/p#x)" stroke="url( \'#ok\' )" mask="url(data:x)"/>'))
    rect = ET.fromstring(result).find(f"{{{SVG_NS}}}rect")
    assert rect.get("fill") is None
    assert rect.get("mask") is None
    assert rect.get("stroke") == "url( '#ok' )"


def test_foreign_namespace_attributes_are_removed() -> None:
    result = sanitize_svg(
        _svg(
            '<g xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" inkscape:label="Calque" id="layer1">'
            '<rect xml:space="preserve" width="1" height="1"/></g>'
        )
    )
    assert "inkscape" not in result
    assert 'id="layer1"' in result
    assert 'xml:space="preserve"' in result


def test_root_must_be_svg() -> None:
    for source in ('<html xmlns="http://www.w3.org/1999/xhtml"/>', "<SVG/>", "not xml", ""):
        with pytest.raises(SvgSanitizeError):
            sanitize_svg(source)


def test_svg_without_namespace_is_normalized() -> None:
    result = sanitize_svg('<svg viewBox="0 0 1 1"><rect width="1" height="1"/></svg>')
    assert ET.fromstring(result).tag == f"{{{SVG_NS}}}svg"


def test_excessive_nesting_is_rejected() -> None:
    with pytest.raises(SvgSanitizeError):
        sanitize_svg(_svg("<g>" * 300 + "</g>" * 300))


def test_detect_raster_mime() -> None:
    assert detect_raster_mime(PNG_1PX) == "image/png"
    assert detect_raster_mime(b"\xff\xd8\xff\xe0rest") == "image/jpeg"
    assert detect_raster_mime(b"GIF89a....") == "image/gif"
    assert detect_raster_mime(b"RIFF\x00\x00\x00\x00WEBPVP8 ") == "image/webp"
    assert detect_raster_mime(b"<svg/>") is None
