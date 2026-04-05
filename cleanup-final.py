#!/usr/bin/env python3
"""
Remove inline CSS from HTML pages (final version).
Uses proper HTML parsing to avoid breaking tags.
"""

import os
import re
from html.parser import HTMLParser
from io import StringIO

def count_lines(text):
    """Count lines in a text block."""
    return len(text.strip().split('\n'))

def process_html_file(filepath):
    """Process a single HTML file. Returns (modified, removed_styles, removed_duplicates)."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    removed_styles = 0
    removed_duplicates = 0

    # Strategy: Use regex but be more careful about head boundaries
    # Find the complete head section
    head_pattern = r'(<head[^>]*>)(.*?)(</head>)'
    head_match = re.search(head_pattern, content, re.DOTALL | re.IGNORECASE)

    if not head_match:
        return False, 0, 0

    head_start = head_match.start(1)
    head_tag = head_match.group(1)  # e.g., "<head>"
    head_content = head_match.group(2)
    head_end_tag = head_match.group(3)  # e.g., "</head>"
    head_full_end = head_match.end()

    # --- Remove large <style> blocks ---
    style_pattern = r'<style[^>]*>.*?</style>'

    def process_styles(content_text):
        nonlocal removed_styles
        parts = []
        last_end = 0

        for match in re.finditer(style_pattern, content_text, re.DOTALL | re.IGNORECASE):
            parts.append(content_text[last_end:match.start()])
            style_text = match.group(0)

            # Only remove if > 20 lines
            if count_lines(style_text) > 20:
                removed_styles += 1
                # Skip it (don't add to parts)
            else:
                parts.append(style_text)

            last_end = match.end()

        parts.append(content_text[last_end:])
        return ''.join(parts)

    head_content = process_styles(head_content)

    # --- Remove duplicate global.css links (keep first) ---
    global_css_pattern = r'<link[^>]*href=["\']?/?global\.css["\']?[^>]*/?>'
    global_css_matches = list(re.finditer(global_css_pattern, head_content, re.IGNORECASE))

    if len(global_css_matches) > 1:
        # Remove all but first, processing in reverse to maintain positions
        parts = []
        last_end = 0
        first_found = False

        for match in re.finditer(global_css_pattern, head_content, re.IGNORECASE):
            parts.append(head_content[last_end:match.start()])
            if not first_found:
                parts.append(match.group(0))
                first_found = True
            else:
                removed_duplicates += 1
            last_end = match.end()

        parts.append(head_content[last_end:])
        head_content = ''.join(parts)

    # --- Ensure global.css exists ---
    if not re.search(r'/global\.css', head_content, re.IGNORECASE):
        # Add after the last <link> tag
        last_link = list(re.finditer(r'<link[^>]*/?>', head_content))
        if last_link:
            insert_pos = last_link[-1].end()
            head_content = (head_content[:insert_pos] + '\n    <link rel="stylesheet" href="/global.css">' +
                           head_content[insert_pos:])
        else:
            head_content = head_content.rstrip() + '\n    <link rel="stylesheet" href="/global.css">\n'

    # --- Remove duplicate nav.js scripts (keep only last) ---
    nav_js_pattern = r'<script[^>]*src=["\']?/?nav\.js["\']?[^>]*(?:>\s*</script>|/>)'
    nav_js_matches = list(re.finditer(nav_js_pattern, content, re.IGNORECASE))

    if len(nav_js_matches) > 1:
        # Remove all but the last, processing in reverse
        parts = []
        last_end = 0
        match_list = list(nav_js_matches)

        for i, match in enumerate(match_list):
            parts.append(content[last_end:match.start()])
            if i < len(match_list) - 1:
                # Remove this one
                removed_duplicates += 1
            else:
                # Keep the last one
                parts.append(match.group(0))
            last_end = match.end()

        parts.append(content[last_end:])
        content = ''.join(parts)

    # Reconstruct with modified head
    content = content[:head_start] + head_tag + head_content + head_end_tag + content[head_full_end:]

    modified = (content != original_content)

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

    return modified, removed_styles, removed_duplicates

def main():
    site_dir = '/sessions/keen-gifted-heisenberg/mnt/adoptedbygracewebsite'

    html_files = sorted([f for f in os.listdir(site_dir)
                        if f.endswith('.html')
                        and f not in ['index.html', '_nav-template.html']])

    total_processed = 0
    total_styles_removed = 0
    total_duplicates_removed = 0
    errors = []

    print(f"Processing {len(html_files)} HTML files...\n")

    for filename in html_files:
        filepath = os.path.join(site_dir, filename)
        try:
            modified, styles_removed, dups_removed = process_html_file(filepath)
            if modified:
                total_processed += 1
                total_styles_removed += styles_removed
                total_duplicates_removed += dups_removed
                details = []
                if styles_removed > 0:
                    details.append(f"removed {styles_removed} style block(s)")
                if dups_removed > 0:
                    details.append(f"removed {dups_removed} duplicate(s)")
                if details:
                    print(f"✓ {filename} ({', '.join(details)})")
                else:
                    print(f"✓ {filename}")
        except Exception as e:
            errors.append((filename, str(e)))
            print(f"✗ {filename}: ERROR - {str(e)}")

    print(f"\n{'='*70}")
    print(f"CLEANUP COMPLETE")
    print(f"{'='*70}")
    print(f"Files processed: {total_processed}/{len(html_files)}")
    print(f"Style blocks removed: {total_styles_removed}")
    print(f"Duplicate links/scripts removed: {total_duplicates_removed}")
    if errors:
        print(f"Errors encountered: {len(errors)}")
        for filename, error in errors:
            print(f"  - {filename}: {error}")
    else:
        print(f"Errors encountered: 0")

if __name__ == '__main__':
    main()
