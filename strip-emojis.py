#!/usr/bin/env python3
"""Strip all emoji spans from nav dropdowns across all HTML pages."""
import re, os, glob

REPO = '/Users/aaronforman/Documents/adoptedbygracewebsite'

# Pattern matches: <span class="dropdown-icon">anything</span> followed by optional space
emoji_pattern = re.compile(r'<span class="dropdown-icon">.*?</span>\s*')

count = 0
changed_files = []

for html_file in glob.glob(os.path.join(REPO, '**', '*.html'), recursive=True):
    # Skip index.html (already fixed), old backups, and this script
    basename = os.path.basename(html_file)
    if basename in ('index.html', 'index-old.html', 'index-new.html'):
        continue
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = emoji_pattern.sub('', content)
    
    if new_content != content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        changed_files.append(basename)
        count += 1

print(f"Stripped emojis from {count} files:")
for f in sorted(changed_files):
    print(f"  - {f}")
