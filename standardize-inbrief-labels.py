#!/usr/bin/env python3
"""standardize-inbrief-labels.py — S68 site-wide In-Brief label sweep.

CLAUDE.md mandates the In-Brief box use the canonical label `<strong>In Brief:</strong>`.
This script rewrites four legacy labels (The Answer / The Truth / The Diagnosis / The Verdict)
when they appear inside .tldr blocks.

We scope the rewrite to lines that contain `<strong>X:</strong>` where X is one of the four
legacy labels, AND the file contains `class="tldr"` (so we don't touch arbitrary prose).
"""

import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))

LEGACY_LABELS = ["The Answer", "The Truth", "The Diagnosis", "The Verdict"]

# We want to be conservative: only rewrite the FIRST occurrence inside the file, and only
# if it appears within ~6 lines of a `<div class="tldr">` opening. That mirrors the in-brief
# pattern site-wide and avoids hitting arguments / body prose that may use the same phrase.

LABEL_PATTERN = re.compile(
    r'(<strong>)(' + '|'.join(re.escape(l) for l in LEGACY_LABELS) + r')(:</strong>)'
)

def rewrite_in_tldr(html):
    """Find each tldr block; within ~12 lines of opening, swap legacy label to 'In Brief'."""
    rewrites = 0
    lines = html.split('\n')
    i = 0
    while i < len(lines):
        if 'class="tldr"' in lines[i]:
            # scan next 12 lines for a legacy label
            for j in range(i, min(i + 12, len(lines))):
                m = LABEL_PATTERN.search(lines[j])
                if m:
                    lines[j] = LABEL_PATTERN.sub(r'\1In Brief\3', lines[j], count=1)
                    rewrites += 1
                    break
            i += 12
        else:
            i += 1
    return '\n'.join(lines), rewrites

files_touched = 0
total_rewrites = 0
for f in sorted(os.listdir(ROOT)):
    if not f.endswith('.html'):
        continue
    path = os.path.join(ROOT, f)
    with open(path, 'r', encoding='utf-8') as fp:
        html = fp.read()
    if 'class="tldr"' not in html:
        continue
    new_html, rewrites = rewrite_in_tldr(html)
    if rewrites:
        with open(path, 'w', encoding='utf-8') as fp:
            fp.write(new_html)
        files_touched += 1
        total_rewrites += rewrites
        print(f"  {f}: {rewrites} label(s) rewritten")

print(f"\nIn-Brief label sweep complete: {files_touched} files touched, {total_rewrites} labels rewritten")
