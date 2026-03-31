#!/usr/bin/env python3
"""
QA checks for adoptedbygrace.net HTML files
Checks page integrity, typography, design colors, and UX patterns
"""

import os
import re
import json
from pathlib import Path

# Configuration
SITE_ROOT = Path.cwd()
EXCLUDE_DIRS = {'.netlify', '.git', 'node_modules', '__pycache__'}
STANDARD_COLORS = {
    '#0a0a0f', '#12121a', '#1a1a2e',  # Dark palette
    'transparent', 'inherit', 'none', 'currentColor'
}
# Rogue colors (blues, greens, reds, other non-palette)
ROGUE_COLOR_PATTERNS = [
    r'#[0-9a-fA-F]{6}(?!0a0a0f|12121a|1a1a2e)',  # Hex not matching our palette
    r'\brgb\s*\(',  # Any rgb()
    r'\bhsl\s*\(',  # Any hsl()
]

results = {
    "missing_doctype": [],
    "missing_viewport": [],
    "missing_favicon": [],
    "under_1kb": [],
    "missing_fonts": [],
    "rogue_colors": [],
    "dead_end_cards": [],
    "overflow_hidden_issues": [],
    "total_files_checked": 0
}

def should_exclude(path):
    """Check if path should be excluded"""
    parts = path.parts
    for exclude in EXCLUDE_DIRS:
        if exclude in parts:
            return True
    return False

def check_file(filepath):
    """Run all checks on a single HTML file"""
    issues = {}

    # Read file
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        return issues

    # Check file size
    file_size = os.path.getsize(filepath)
    if file_size < 1024:
        results["under_1kb"].append(str(filepath.relative_to(SITE_ROOT)))

    # 1. DOCTYPE
    if not re.search(r'<!DOCTYPE\s+html>', content, re.IGNORECASE):
        results["missing_doctype"].append(str(filepath.relative_to(SITE_ROOT)))

    # 2. Viewport meta tag
    if not re.search(r'<meta\s+name=["\']?viewport["\']?', content, re.IGNORECASE):
        results["missing_viewport"].append(str(filepath.relative_to(SITE_ROOT)))

    # 3. Favicon
    if not re.search(r'rel=["\']?(icon|shortcut\s+icon)["\']?', content, re.IGNORECASE):
        results["missing_favicon"].append(str(filepath.relative_to(SITE_ROOT)))

    # 4. Google Fonts (Playfair Display)
    if 'Playfair Display' not in content and 'playfair-display' not in content.lower():
        results["missing_fonts"].append(str(filepath.relative_to(SITE_ROOT)))

    # 5. Rogue colors - scan for style attributes and inline styles
    lines = content.split('\n')
    for line_num, line in enumerate(lines, 1):
        # Look for style attributes with background-color or background
        if 'style=' in line or '<style>' in line:
            # Extract color values
            for color_pattern in ROGUE_COLOR_PATTERNS:
                matches = re.finditer(color_pattern, line, re.IGNORECASE)
                for match in matches:
                    color = match.group(0)
                    # Skip if it's one of our standard colors
                    if color.lower() not in STANDARD_COLORS and not any(std in color for std in ['0a0a0f', '12121a', '1a1a2e']):
                        # Additional check: ensure it's actually a color (in background context)
                        if 'background' in line or 'color' in line:
                            results["rogue_colors"].append({
                                "file": str(filepath.relative_to(SITE_ROOT)),
                                "line": line_num,
                                "snippet": line.strip()[:100]
                            })
                            break  # Only report once per line

    # 6. Dead-end cards (cards with no anchor)
    card_pattern = r'<[^>]*class=["\']?[^"\']*(?:card|article-card)[^"\']*["\']?[^>]*>'
    for match in re.finditer(card_pattern, content):
        card_html = match.group(0)
        # Check if this card contains an anchor
        card_context_start = match.start()
        # Look ahead for closing tag
        close_tag_pattern = r'</(?:div|section|article)>'
        remaining = content[card_context_start:]
        close_match = re.search(close_tag_pattern, remaining)
        if close_match:
            card_section = remaining[:close_match.end()]
            if '<a ' not in card_section and '<a>' not in card_section:
                results["dead_end_cards"].append({
                    "file": str(filepath.relative_to(SITE_ROOT)),
                    "line": content[:card_context_start].count('\n') + 1,
                    "snippet": card_section[:80]
                })

    # 7. overflow:hidden that might clip content
    if 'overflow:hidden' in content or 'overflow: hidden' in content:
        lines = content.split('\n')
        for line_num, line in enumerate(lines, 1):
            if 'overflow' in line and 'hidden' in line:
                results["overflow_hidden_issues"].append({
                    "file": str(filepath.relative_to(SITE_ROOT)),
                    "line": line_num,
                    "snippet": line.strip()[:100]
                })

def main():
    """Main execution"""
    print("Starting QA checks on all HTML files...")

    # Find all HTML files
    html_files = []
    for root, dirs, files in os.walk(SITE_ROOT):
        # Modify dirs in-place to skip excluded directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

        for file in files:
            if file.endswith('.html'):
                filepath = Path(root) / file
                if not should_exclude(filepath):
                    html_files.append(filepath)

    print(f"Found {len(html_files)} HTML files")

    # Check each file
    for filepath in sorted(html_files):
        check_file(filepath)

    results["total_files_checked"] = len(html_files)

    # Output results
    print("\n" + "="*60)
    print("QA CHECK RESULTS")
    print("="*60)
    print(json.dumps(results, indent=2))

    # Summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    print(f"Total files checked: {results['total_files_checked']}")
    print(f"Missing DOCTYPE: {len(results['missing_doctype'])}")
    print(f"Missing viewport meta: {len(results['missing_viewport'])}")
    print(f"Missing favicon: {len(results['missing_favicon'])}")
    print(f"Under 1KB: {len(results['under_1kb'])}")
    print(f"Missing Playfair fonts: {len(results['missing_fonts'])}")
    print(f"Rogue colors found: {len(results['rogue_colors'])}")
    print(f"Dead-end cards: {len(results['dead_end_cards'])}")
    print(f"overflow:hidden issues: {len(results['overflow_hidden_issues'])}")

    # Save to file
    with open('qa-results.json', 'w') as f:
        json.dump(results, f, indent=2)
    print(f"\nResults saved to qa-results.json")

if __name__ == '__main__':
    main()
