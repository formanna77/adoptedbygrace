#!/usr/bin/env python3
"""Add 'The Living Map' link to the Explore dropdown on all pages."""
import os, glob

REPO = '/Users/aaronforman/Documents/adoptedbygracewebsite'
OLD = '<a href="/secular-evidence">Secular Evidence</a>'
NEW = '<a href="/secular-evidence">Secular Evidence</a>\n                        <a href="/explore-map">The Living Map</a>'

count = 0
for f in glob.glob(os.path.join(REPO, '*.html')):
    base = os.path.basename(f)
    if base in ('explore-map.html', 'index-old.html', 'index-new.html'):
        continue
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    if OLD in content and '/explore-map' not in content:
        content = content.replace(OLD, NEW)
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        count += 1

print(f"Added Living Map link to {count} pages")
