#!/usr/bin/env python3
"""Validate the dependency-free GazePick static site."""

from __future__ import annotations

import re
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
KOREAN = re.compile(r"[\uac00-\ud7a3]")
EXPECTED_NAV = [
    "Overview",
    "Direction",
    "Foundations",
    "Interaction",
    "System",
    "Data",
    "Evaluation",
    "Evidence",
    "Plan",
]


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.refs: list[tuple[str, str]] = []
        self.images_without_alt = 0
        self.lang: str | None = None
        self._in_nav_links = False
        self._active_anchor = False
        self._anchor_text: list[str] = []
        self.nav_labels: list[str] = []

    def handle_starttag(
        self, tag: str, attrs_list: list[tuple[str, str | None]]
    ) -> None:
        attrs = dict(attrs_list)
        if tag == "html":
            self.lang = attrs.get("lang")
        if element_id := attrs.get("id"):
            self.ids.append(element_id)
        for attr in ("href", "src"):
            if ref := attrs.get(attr):
                self.refs.append((attr, ref))
        if tag == "img" and not (attrs.get("alt") or "").strip():
            self.images_without_alt += 1
        if tag == "div" and "nav-links" in (attrs.get("class") or "").split():
            self._in_nav_links = True
        if tag == "a" and self._in_nav_links:
            self._active_anchor = True
            self._anchor_text = []

    def handle_endtag(self, tag: str) -> None:
        if tag == "a" and self._active_anchor:
            label = " ".join("".join(self._anchor_text).split())
            self.nav_labels.append(label)
            self._active_anchor = False
        if tag == "div" and self._in_nav_links and not self._active_anchor:
            self._in_nav_links = False

    def handle_data(self, data: str) -> None:
        if self._active_anchor:
            self._anchor_text.append(data)


def target_for(page: Path, ref: str) -> tuple[Path, str] | None:
    parts = urlsplit(ref)
    if parts.scheme or parts.netloc:
        return None
    if not parts.path:
        return page, unquote(parts.fragment)
    target = (page.parent / unquote(parts.path)).resolve()
    if target.is_dir():
        target /= "index.html"
    return target, unquote(parts.fragment)


def main() -> int:
    pages = sorted(ROOT.rglob("*.html"))
    parsed: dict[Path, PageParser] = {}
    errors: list[str] = []

    for page in pages:
        source = page.read_text(encoding="utf-8")
        parser = PageParser()
        parser.feed(source)
        parsed[page.resolve()] = parser
        label = page.relative_to(ROOT)

        if parser.lang != "en":
            errors.append(f"{label}: expected html lang='en'")
        if KOREAN.search(source):
            errors.append(f"{label}: Korean text remains")
        duplicates = [key for key, count in Counter(parser.ids).items() if count > 1]
        if duplicates:
            errors.append(f"{label}: duplicate ids {duplicates}")
        if parser.images_without_alt:
            errors.append(f"{label}: {parser.images_without_alt} image(s) lack alt text")
        if parser.nav_labels != EXPECTED_NAV:
            errors.append(
                f"{label}: navigation differs: {parser.nav_labels!r}"
            )

    for page, parser in parsed.items():
        label = page.relative_to(ROOT)
        for _, ref in parser.refs:
            target = target_for(page, ref)
            if target is None:
                continue
            target_path, fragment = target
            if not target_path.exists():
                errors.append(f"{label}: broken local reference {ref!r}")
                continue
            if fragment and target_path.suffix.lower() == ".html":
                target_parser = parsed.get(target_path.resolve())
                if target_parser is None or fragment not in target_parser.ids:
                    errors.append(f"{label}: missing fragment target {ref!r}")

    external_media = sum(
        1
        for parser in parsed.values()
        for attr, ref in parser.refs
        if attr == "src" and urlsplit(ref).scheme in {"http", "https"}
    )
    print(
        f"Validated {len(pages)} pages · "
        f"{sum(len(parser.refs) for parser in parsed.values())} references · "
        f"{external_media} external media embeds"
    )
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1
    print("All local links, fragments, IDs, alt text, language, and navigation pass.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
