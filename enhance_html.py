#!/usr/bin/env python3
"""
Script to add social sharing buttons and skip-to-content links to HTML files.
"""

import os
import re
from pathlib import Path

WEBSITE_DIR = "/sessions/eager-gifted-cannon/mnt/adoptedbygracewebsite"

# Content page patterns (from user spec)
CONTENT_PAGE_PATTERNS = [
    "question-",
    "systematic-",
    "demolition-",
    "objection-",
    "theologian-",
    "ot-",
    "story-",
]
CONTENT_PAGE_EXACT = ["connections.html", "freedom.html", "scripture-tsunami.html"]
SKIP_DEMOLITION = "demolition-hub.html"
SKIP_OT = "ot-election.html"

# CSS for social sharing
SHARE_CSS = """/* ========== SOCIAL SHARING ========== */
.share-buttons { display: flex; gap: 0.75rem; align-items: center; margin: 2rem 0; padding: 1.5rem; background: var(--bg-card, #12121a); border: 1px solid rgba(212, 162, 84, 0.12); border-radius: 8px; }
.share-buttons .share-label { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: #9a958c; margin-right: 0.5rem; }
.share-btn { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(212, 162, 84, 0.2); background: transparent; color: #d4a254; text-decoration: none; font-size: 0.9rem; transition: all 0.3s ease; cursor: pointer; }
.share-btn:hover { background: rgba(212, 162, 84, 0.12); border-color: #d4a254; transform: translateY(-2px); }
.share-btn svg { width: 18px; height: 18px; fill: currentColor; }"""

# CSS for skip link
SKIP_CSS = """/* ========== SKIP LINK ========== */
.skip-link { position: absolute; top: -40px; left: 0; background: #d4a254; color: #0a0a0f; padding: 8px 16px; text-decoration: none; z-index: 10000; font-weight: 600; font-size: 0.9rem; }
.skip-link:focus { top: 0; }"""

# HTML for social sharing buttons
SHARE_HTML = """<div class="share-buttons" role="group" aria-label="Share this article">
    <span class="share-label">Share</span>
    <a class="share-btn" href="" onclick="window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(location.href)+'&text='+encodeURIComponent(document.title),'_blank','width=550,height=420');return false" aria-label="Share on X (Twitter)" title="Share on X">𝕏</a>
    <a class="share-btn" href="" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),'_blank','width=550,height=420');return false" aria-label="Share on Facebook" title="Share on Facebook">f</a>
    <button class="share-btn" onclick="navigator.clipboard.writeText(location.href).then(function(){this.innerHTML='✓';setTimeout(function(){document.querySelector('.share-btn[aria-label=&quot;Copy link&quot;]').innerHTML='🔗'},2000)}.bind(this))" aria-label="Copy link" title="Copy link">🔗</button>
</div>"""

# HTML for skip link
SKIP_HTML = """<a href="#main-content" class="skip-link">Skip to main content</a>"""

def is_content_page(filename):
    """Check if file is a content page."""
    if filename in SKIP_DEMOLITION or filename in SKIP_OT:
        return False

    if filename in CONTENT_PAGE_EXACT:
        return True

    for pattern in CONTENT_PAGE_PATTERNS:
        if filename.startswith(pattern):
            return True

    return False

def inject_css(content, css_to_inject):
    """Inject CSS before the first </style> tag."""
    style_tag_pos = content.find("</style>")
    if style_tag_pos == -1:
        return content  # No style tag found

    # Insert before </style>
    return content[:style_tag_pos] + "\n" + css_to_inject + "\n" + content[style_tag_pos:]

def find_insertion_point_for_share(content):
    """Find where to insert share buttons."""
    # Look for <!-- Continue Exploring
    if "<!-- Continue Exploring" in content:
        pos = content.find("<!-- Continue Exploring")
        return pos

    # Look for <div class="continue-exploring
    if '<div class="continue-exploring' in content:
        pos = content.find('<div class="continue-exploring')
        return pos

    # Look for last </section> before footer
    footer_pos = content.find("<footer")
    if footer_pos == -1:
        footer_pos = len(content)

    # Find last </section> before footer
    section_search = content[:footer_pos]
    last_section = section_search.rfind("</section>")
    if last_section != -1:
        return last_section + len("</section>")

    # Find last </article> before footer
    article_search = content[:footer_pos]
    last_article = article_search.rfind("</article>")
    if last_article != -1:
        return last_article + len("</article>")

    # Default: before footer
    return footer_pos

def find_insertion_point_for_skip(content):
    """Find position after <body or <body ...>"""
    # Match <body> or <body ...>
    match = re.search(r'<body[^>]*>', content)
    if match:
        return match.end()
    return -1

def add_skip_link_id(content):
    """Add id='main-content' to <main> if not present."""
    # Check if skip-link exists
    if "skip-link" in content:
        # Look for <main without id
        main_match = re.search(r'<main(?!\s+id=)([^>]*)>', content)
        if main_match:
            # Add id to main tag
            start = main_match.start()
            end = main_match.end()
            old_tag = main_match.group(0)
            new_tag = f'<main id="main-content"{main_match.group(1)}>'
            content = content[:start] + new_tag + content[end:]

    return content

def process_file(filepath):
    """Process a single HTML file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = os.path.basename(filepath)
    changes = []

    # Check for share buttons (content pages only)
    if is_content_page(filename):
        if "share-buttons" not in content and "social-share" not in content:
            # Add share CSS
            if SHARE_CSS not in content:
                content = inject_css(content, SHARE_CSS)
                changes.append("Added share CSS")

            # Add share HTML
            pos = find_insertion_point_for_share(content)
            if pos != -1:
                content = content[:pos] + "\n" + SHARE_HTML + "\n" + content[pos:]
                changes.append("Added share buttons")

    # Check for skip link (all pages)
    if "skip-link" not in content and "skip-to-content" not in content:
        # Add skip CSS
        if SKIP_CSS not in content:
            content = inject_css(content, SKIP_CSS)
            changes.append("Added skip-link CSS")

        # Add skip HTML
        pos = find_insertion_point_for_skip(content)
        if pos != -1:
            content = content[:pos] + "\n" + SKIP_HTML + "\n" + content[pos:]
            changes.append("Added skip-link")

    # Add id to main tag if skip-link exists
    if "skip-link" in content:
        content = add_skip_link_id(content)
        if 'id="main-content"' in content and 'id="main-content"' not in open(filepath).read():
            changes.append("Added id to main tag")

    # Write if changes were made
    if changes:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes

    return []

def main():
    """Main function."""
    html_files = sorted([f for f in os.listdir(WEBSITE_DIR) if f.endswith('.html')])

    total_files = len(html_files)
    processed_files = 0
    content_pages_with_share = 0
    all_pages_with_skip = 0
    total_changes = 0

    print(f"Processing {total_files} HTML files...\n")

    for filename in html_files:
        filepath = os.path.join(WEBSITE_DIR, filename)
        changes = process_file(filepath)

        if changes:
            processed_files += 1
            total_changes += len(changes)
            is_content = is_content_page(filename)

            if is_content:
                content_pages_with_share += 1

            if "Added skip-link" in changes:
                all_pages_with_skip += 1

            print(f"{filename}")
            for change in changes:
                print(f"  - {change}")

    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"Total HTML files: {total_files}")
    print(f"Files modified: {processed_files}")
    print(f"Total changes: {total_changes}")
    print(f"Content pages with share buttons added: {content_pages_with_share}")
    print(f"Pages with skip-link added: {all_pages_with_skip}")

if __name__ == "__main__":
    main()
