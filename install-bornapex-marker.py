#!/usr/bin/env python3
"""install-bornapex-marker.py — S68 batch marker pass for BUCKET B.

Reads tier3-bucket-B.txt; for each page that does NOT already carry a
HAMMER-LOCKED or CONSECRATED marker, installs:

    <!-- CONSECRATED S43-S58 BORN-APEX -->

immediately after the `<article class="article-body">` opening tag.

Distinguishes the source: these pages were authored to apex at build time and
are receiving the marker retroactively in the S68 inventory pass, not a fresh
live-read deepening (which uses the S68 marker).
"""

import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))

MARKER = "\n<!-- CONSECRATED S43-S58 BORN-APEX -->"
ANCHOR = '<article class="article-body">'

with open(os.path.join(ROOT, "tier3-bucket-B.txt"), "r", encoding="utf-8") as f:
    pages = [line.strip() for line in f if line.strip()]

installed = 0
already_marked = 0
missing_anchor = 0
not_found = 0

for name in pages:
    path = os.path.join(ROOT, name + ".html")
    if not os.path.exists(path):
        not_found += 1
        continue
    with open(path, "r", encoding="utf-8") as fp:
        html = fp.read()
    if "HAMMER-LOCKED" in html or "CONSECRATED" in html:
        already_marked += 1
        continue
    if ANCHOR not in html:
        missing_anchor += 1
        continue
    new_html = html.replace(ANCHOR, ANCHOR + MARKER, 1)
    with open(path, "w", encoding="utf-8") as fp:
        fp.write(new_html)
    installed += 1

print(f"BUCKET B batch marker pass complete")
print(f"  pages in list      : {len(pages)}")
print(f"  newly marked       : {installed}")
print(f"  already-marked     : {already_marked}")
print(f"  missing-anchor     : {missing_anchor}")
print(f"  not-found-on-disk  : {not_found}")
