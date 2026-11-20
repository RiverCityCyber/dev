#!/usr/bin/env python3
"""Copy the shared header and footer into every page.

The site is plain static HTML with no build step, so the header and footer
live once in partials/ and this script stamps them into each page. Edit
partials/header.html or partials/footer.html, then run:

    python3 tools/sync_layout.py           # update every page
    python3 tools/sync_layout.py --check   # exit 1 if any page is out of date

Each page marks where the shared blocks go:

    <!-- layout:header -->...<!-- /layout:header -->
    <!-- layout:footer -->...<!-- /layout:footer -->

A page with no markers yet has its existing <header class="header-hud"> and
<footer> wrapped in markers on the first run. A brand-new page can contain
just the empty marker pairs. Nav links matching the page get
aria-current="page" so the current section is highlighted.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARTIALS = ROOT / "partials"
# Pages to stamp. Drafts are left alone on purpose.
PAGES = [ROOT / "index.html", *sorted((ROOT / "html").glob("*.html"))]
SKIP = {"404.html"}

BLOCKS = {
    # name: regex for the un-marked block to wrap on first run
    "header": re.compile(r'<header class="header-hud">.*?</header>', re.S),
    "footer": re.compile(r"<footer>.*?</footer>", re.S),
}


def page_url(page: Path) -> str:
    rel = page.relative_to(ROOT).as_posix()
    return "/" if rel == "index.html" else "/" + rel


def indent(text: str, prefix: str) -> str:
    return "\n".join(prefix + line if line else line for line in text.splitlines())


def render(name: str, page: Path, prefix: str) -> str:
    html = (PARTIALS / f"{name}.html").read_text().strip()
    url = page_url(page)
    # Mark the nav link to this page as current. Only inside <nav> (the brand
    # link also points at "/"), and only the first match, so a dropdown's
    # parent and child don't both light up for the same URL.
    if "<nav" in html:
        head, nav = html.split("<nav", 1)
        nav = nav.replace(f'href="{url}"', f'href="{url}" aria-current="page"', 1)
        html = head + "<nav" + nav
    return indent(html, prefix)


def sync(page: Path) -> str:
    text = page.read_text()
    for name, legacy in BLOCKS.items():
        start, end = f"<!-- layout:{name} -->", f"<!-- /layout:{name} -->"
        if start not in text:
            match = legacy.search(text)
            if not match:
                print(f"  ! {page.name}: no {name} found, skipped", file=sys.stderr)
                continue
            text = text[: match.start()] + start + end + text[match.end() :]
        marked = re.compile(
            rf"^([ \t]*){re.escape(start)}.*?{re.escape(end)}", re.S | re.M
        )
        match = marked.search(text)
        prefix = match.group(1)
        block = f"{prefix}{start}\n{render(name, page, prefix)}\n{prefix}{end}"
        text = text[: match.start()] + block + text[match.end() :]
    return text


def main() -> int:
    check = "--check" in sys.argv
    stale = []
    for page in PAGES:
        if page.name in SKIP:
            continue
        new = sync(page)
        if new != page.read_text():
            stale.append(page.relative_to(ROOT).as_posix())
            if not check:
                page.write_text(new)
    if check and stale:
        print("Out of date (run python3 tools/sync_layout.py):", *stale, sep="\n  ")
        return 1
    print(("Up to date" if check else "Updated") + f": {len(stale)} page(s) changed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
