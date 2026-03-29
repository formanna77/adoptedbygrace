#!/usr/bin/env python3
"""
Standardize footer navigation across all HTML pages in adoptedbygracewebsite.
"""

import os
import re
from pathlib import Path

STANDARD_FOOTER = '''    <footer role="contentinfo">
        <div class="footer-container">
            <div class="footer-section"><h4>ADOPTED BY GRACE</h4><p style="color: var(--text-secondary); font-size: 0.9rem;">Biblical theology for those willing to follow the text.</p></div>
            <div class="footer-section"><h4>Navigate</h4><ul><li><a href="index.html">Home</a></li><li><a href="start-here.html">Start Here</a></li><li><a href="questions.html">The Evidence</a></li><li><a href="systematic-theology.html">Systematic</a></li><li><a href="demolition-hub.html">Demolition</a></li><li><a href="theologians.html">Theologians</a></li><li><a href="about.html">About</a></li></ul></div>
        </div>
        <div class="footer-copyright">&copy; 2026 ADOPTED BY GRACE. All Scripture quoted is ESV unless otherwise noted. Soli Deo Gloria.</div>
    </footer>'''

def find_footer_bounds(content):
    """
    Find the start and end of the footer section.
    Returns tuple (start_pos, end_pos) or (None, None) if not found.
    """
    # Look for opening <footer tag
    footer_match = re.search(r'<footer[^>]*>', content, re.IGNORECASE)
    if not footer_match:
        return None, None

    start_pos = footer_match.start()

    # Look for closing </footer> tag
    closing_match = re.search(r'</footer\s*>', content[start_pos:], re.IGNORECASE)
    if not closing_match:
        return None, None

    end_pos = start_pos + closing_match.end()

    return start_pos, end_pos

def process_html_file(filepath):
    """
    Process a single HTML file and standardize its footer.
    Returns (success: bool, message: str)
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        start_pos, end_pos = find_footer_bounds(content)

        if start_pos is None:
            return False, f"No footer found"

        # Replace the entire footer section
        new_content = content[:start_pos] + STANDARD_FOOTER + content[end_pos:]

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True, "Updated"

    except Exception as e:
        return False, str(e)

def main():
    """Main function to process all HTML files."""
    website_dir = Path('/sessions/brave-gallant-cray/mnt/adoptedbygracewebsite')

    # Find all HTML files
    html_files = sorted(website_dir.glob('*.html'))

    print(f"Found {len(html_files)} HTML files\n")

    updated_files = []
    failed_files = []

    for filepath in html_files:
        filename = filepath.name
        success, message = process_html_file(filepath)

        if success:
            updated_files.append(filename)
            print(f"✓ {filename}")
        else:
            failed_files.append((filename, message))
            print(f"✗ {filename}: {message}")

    print("\n" + "="*60)
    print(f"SUMMARY")
    print("="*60)
    print(f"Total files processed: {len(html_files)}")
    print(f"Successfully updated: {len(updated_files)}")
    print(f"Failed: {len(failed_files)}")

    if failed_files:
        print(f"\nFailed files:")
        for filename, reason in failed_files:
            print(f"  - {filename}: {reason}")

    print("\n" + "="*60)
    print("UPDATED FILES:")
    print("="*60)
    for filename in updated_files:
        print(f"  - {filename}")

if __name__ == '__main__':
    main()
