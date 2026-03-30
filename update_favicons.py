#!/usr/bin/env python3
"""
Update favicon links in all HTML files in the repo root.
Only processes files directly in the root, not in subdirectories.
Skips _nav-template.html and files without <head> sections.
"""

import os
import re
from pathlib import Path

REPO_ROOT = Path("/sessions/busy-confident-davinci/mnt/adoptedbygracewebsite")
FAVICON_LINES = [
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg">',
    '<link rel="icon" type="image/x-icon" href="/favicon.ico">'
]

# Files to skip
SKIP_FILES = {"_nav-template.html"}

def remove_existing_favicons(head_content):
    """Remove any existing favicon link tags."""
    # Match any <link rel="icon"... > tags
    pattern = r'<link\s+rel="icon"[^>]*>'
    return re.sub(pattern, '', head_content, flags=re.IGNORECASE)

def update_html_file(filepath):
    """
    Update favicon links in a single HTML file.
    Returns True if file was updated, False otherwise.
    """
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    # Check for <head> section
    head_match = re.search(r'<head[^>]*>(.*?)</head>', content, re.IGNORECASE | re.DOTALL)
    if not head_match:
        return False

    head_content = head_match.group(1)
    head_start = head_match.start(1)
    head_end = head_match.end(1)

    # Remove existing favicon links
    cleaned_head = remove_existing_favicons(head_content)

    # Check if we need to add new favicons
    # (they might have been removed if there were no old ones)
    if FAVICON_LINES[0] in cleaned_head and FAVICON_LINES[1] in cleaned_head:
        # Already has correct favicons
        return False

    # Add new favicon lines before </head>
    # Insert after the last closing tag in head, before </head>
    favicon_block = '\n'.join(FAVICON_LINES)
    new_head = cleaned_head.rstrip() + '\n' + favicon_block

    # Reconstruct the full file
    new_content = content[:head_start] + new_head + content[head_end:]

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True

def main():
    """Process all HTML files in repo root."""
    html_files = sorted([
        f for f in REPO_ROOT.iterdir()
        if f.is_file() and f.suffix.lower() == '.html' and f.name not in SKIP_FILES
    ])

    updated_count = 0
    for filepath in html_files:
        try:
            if update_html_file(filepath):
                updated_count += 1
                print(f"✓ {filepath.name}")
        except Exception as e:
            print(f"✗ {filepath.name}: {e}")

    print(f"\nTotal files updated: {updated_count} / {len(html_files)}")

if __name__ == '__main__':
    main()
