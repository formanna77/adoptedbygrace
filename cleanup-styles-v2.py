#!/usr/bin/env python3
"""
Remove inline CSS from HTML pages (v2 - fixes head tag parsing).
- Removes all <style> blocks from <head> section (except those < 20 lines)
- Keeps Google Fonts links
- Ensures /global.css is linked (removes duplicates)
- Removes duplicate nav.js scripts
- Skips index.html and _nav-template.html
"""

import os
import re

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

    # Find head section - fixed to handle various head tag formats
    head_match = re.search(r'<head[^>]*>(.*?)</head>', content, re.DOTALL | re.IGNORECASE)
    if not head_match:
        return False, 0, 0

    head_section = head_match.group(1)
    head_start = head_match.start()
    head_end = head_match.end()

    # Store the original head tag for reconstruction
    head_tag_match = re.search(r'<head[^>]*>', content, re.IGNORECASE)
    if head_tag_match:
        head_tag = head_tag_match.group(0)
    else:
        head_tag = '<head>'

    # --- Remove large <style> blocks from head (keep those < 20 lines) ---
    style_pattern = r'<style[^>]*>.*?</style>'
    style_matches = list(re.finditer(style_pattern, head_section, re.DOTALL | re.IGNORECASE))

    # Process in reverse order to maintain positions
    for match in reversed(style_matches):
        style_content = match.group(0)
        if count_lines(style_content) > 20:
            head_section = head_section[:match.start()] + head_section[match.end():]
            removed_styles += 1

    # Rebuild content with modified head
    content = content[:head_start] + head_tag + head_section + '</head>' + content[head_end:]

    # --- Remove duplicate global.css links (keep first one) ---
    head_match = re.search(r'<head[^>]*>(.*?)</head>', content, re.DOTALL | re.IGNORECASE)
    if head_match:
        head_section = head_match.group(1)
        head_start = head_match.start()
        head_end = head_match.end()

        global_css_pattern = r'<link[^>]*?href=["\']?/?global\.css["\']?[^>]*/?>'
        global_css_matches = list(re.finditer(global_css_pattern, head_section, re.IGNORECASE))

        if len(global_css_matches) > 1:
            # Remove all but the first
            for match in reversed(global_css_matches[1:]):
                head_section = head_section[:match.start()] + head_section[match.end():]
                removed_duplicates += 1

            # Rebuild with modified head
            head_tag_match = re.search(r'<head[^>]*>', content, re.IGNORECASE)
            if head_tag_match:
                head_tag = head_tag_match.group(0)
            content = content[:head_start] + head_tag + head_section + '</head>' + content[head_end:]

    # --- Ensure global.css is present ---
    head_match = re.search(r'<head[^>]*>(.*?)</head>', content, re.DOTALL | re.IGNORECASE)
    if head_match:
        head_section = head_match.group(1)
        if not re.search(r'global\.css', head_section, re.IGNORECASE):
            # Find insertion point (after other link tags)
            last_link_match = None
            for match in re.finditer(r'<link[^>]*/?>', head_section):
                last_link_match = match

            if last_link_match:
                insert_pos = last_link_match.end()
                head_section = (head_section[:insert_pos] +
                               '\n    <link rel="stylesheet" href="/global.css">' +
                               head_section[insert_pos:])
            else:
                # No links found, add before closing head or after charset meta
                head_section = head_section.rstrip() + '\n    <link rel="stylesheet" href="/global.css">\n'

            head_start = content.find('<head')
            head_end = content.find('</head>') + len('</head>')
            head_tag_match = re.search(r'<head[^>]*>', content, re.IGNORECASE)
            if head_tag_match:
                head_tag = head_tag_match.group(0)
            content = content[:head_start] + head_tag + head_section + '</head>' + content[head_end:]

    # --- Remove duplicate nav.js scripts (keep only last one before </body>) ---
    nav_js_pattern = r'<script[^>]*?src=["\']?/?nav\.js["\']?[^>]*(?:>\s*</script>|/>)'
    nav_js_matches = list(re.finditer(nav_js_pattern, content, re.IGNORECASE))

    if len(nav_js_matches) > 1:
        # Keep only the last one, remove all others
        for match in reversed(nav_js_matches[:-1]):
            content = content[:match.start()] + content[match.end():]
            removed_duplicates += 1

    modified = (content != original_content)

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

    return modified, removed_styles, removed_duplicates

def main():
    site_dir = '/sessions/keen-gifted-heisenberg/mnt/adoptedbygracewebsite'

    # Get all HTML files
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
