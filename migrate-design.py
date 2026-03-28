#!/usr/bin/env python3
"""
Migrate all HTML pages to use the new global design system.
- Injects global.css and global.js links
- Standardizes nav HTML
- Adds page-hero class to hero sections
- Adds back-to-top button
- Adds Google Fonts link if missing
- Preserves all existing content
"""

import os
import re
import glob

REPO = '/Users/aaronforman/Documents/adoptedbygracewebsite'
SKIP_FILES = {'index.html', 'index-old.html', 'index-new.html', 'migrate-design.py', 'fix_nav.py', 'enhance_html.py'}

FONTS_LINK = '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">'
CSS_LINK = '<link rel="stylesheet" href="/global.css">'
JS_LINK = '<script src="/global.js" defer></script>'

STANDARD_NAV = '''    <nav role="navigation" aria-label="Main navigation">
        <div class="nav-container">
            <a href="/" class="logo">ADOPTED BY GRACE</a>
            <button class="hamburger" aria-label="Toggle navigation menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/start-here">Start Here</a></li>
                <li><a href="/questions">The Evidence</a></li>
                <li><a href="/systematic-theology">Systematic</a></li>
                <li><a href="/demolition-hub">Demolition</a></li>
                <li><a href="/theologians">Theologians</a></li>
                <li><a href="/resources">Resources</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </div>
    </nav>'''

BACK_TO_TOP = '    <button class="back-to-top" aria-label="Back to top">&uarr;</button>'

STANDARD_FOOTER = '''    <footer>
        <div class="footer-container">
            <div class="footer-section">
                <h4>Doctrine</h4>
                <ul>
                    <li><a href="/questions">The Evidence</a></li>
                    <li><a href="/systematic-theology">Systematic Theology</a></li>
                    <li><a href="/demolition-hub">Demolition Zone</a></li>
                    <li><a href="/scripture-tsunami">Scripture Tsunami</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Explore</h4>
                <ul>
                    <li><a href="/start-here">Start Here</a></li>
                    <li><a href="/theologians">Theologians</a></li>
                    <li><a href="/devotionals">Devotionals</a></li>
                    <li><a href="/resources">Resources</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Connect</h4>
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="https://paypal.me/formanna77" target="_blank" rel="noopener">Support This Ministry</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-copyright">
            &copy; 2026 Adopted by Grace &mdash; Soli Deo Gloria
        </div>
    </footer>'''

def migrate_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    if not content.strip().startswith('<!DOCTYPE') and not content.strip().startswith('<html'):
        return False  # Not an HTML file

    modified = False

    # 1. Inject global.css if not present
    if 'global.css' not in content:
        # Insert before </head>
        if '</head>' in content:
            content = content.replace('</head>', f'    {CSS_LINK}\n</head>')
            modified = True

    # 2. Inject global.js if not present
    if 'global.js' not in content:
        if '</body>' in content:
            content = content.replace('</body>', f'    {JS_LINK}\n</body>')
            modified = True

    # 3. Add Google Fonts if missing
    if 'fonts.googleapis.com' not in content:
        if '</head>' in content:
            content = content.replace('</head>', f'    {FONTS_LINK}\n</head>')
            modified = True

    # 4. Replace nav block with standard nav
    nav_pattern = re.compile(r'<nav[^>]*>.*?</nav>', re.DOTALL)
    match = nav_pattern.search(content)
    if match:
        old_nav = match.group()
        if 'global.css' in content or 'nav-container' in old_nav:
            # Only replace if it looks like our nav
            content = content[:match.start()] + STANDARD_NAV + content[match.end():]
            modified = True

    # 5. Add back-to-top button if missing
    if 'back-to-top' not in content:
        if '</body>' in content:
            content = content.replace('</body>', f'{BACK_TO_TOP}\n</body>')
            modified = True

    # 6. Replace footer with standard footer
    footer_pattern = re.compile(r'<footer[^>]*>.*?</footer>', re.DOTALL)
    fmatch = footer_pattern.search(content)
    if fmatch:
        content = content[:fmatch.start()] + STANDARD_FOOTER + content[fmatch.end():]
        modified = True

    # 7. Add page-hero class to first section if it looks like a hero
    # Look for sections with hero-like content near the top
    hero_pattern = re.compile(r'<section\s+class="hero"', re.IGNORECASE)
    if hero_pattern.search(content) and 'page-hero' not in content:
        content = hero_pattern.sub('<section class="page-hero"', content)
        modified = True

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    html_files = glob.glob(os.path.join(REPO, '*.html'))
    migrated = 0
    skipped = 0

    for filepath in sorted(html_files):
        filename = os.path.basename(filepath)
        if filename in SKIP_FILES:
            continue
        try:
            if migrate_file(filepath):
                migrated += 1
                print(f'  ✅ {filename}')
            else:
                skipped += 1
                print(f'  ⏭  {filename} (no changes needed)')
        except Exception as e:
            print(f'  ❌ {filename}: {e}')

    print(f'\nDone: {migrated} migrated, {skipped} unchanged')

if __name__ == '__main__':
    main()
