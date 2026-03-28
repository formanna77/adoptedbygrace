#!/usr/bin/env python3
"""Replace nav on all pages with the new mega-menu nav."""
import os, re, glob

REPO = '/Users/aaronforman/Documents/adoptedbygracewebsite'
SKIP = {'index.html','index-old.html','index-new.html','migrate-design.py','migrate-nav.py','fix_nav.py','enhance_html.py'}

NEW_NAV = '''    <nav role="navigation" aria-label="Main navigation">
        <div class="nav-container">
            <a href="/" class="logo">Adopted by Grace</a>
            <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/start-here">Start Here</a></li>
                <li>
                    <button class="nav-trigger">Doctrine <span class="nav-arrow">&#9660;</span></button>
                    <div class="nav-dropdown">
                        <a href="/questions"><span class="dropdown-icon">&#9876;</span> The Evidence</a>
                        <a href="/systematic-theology"><span class="dropdown-icon">&#128220;</span> Systematic Theology</a>
                        <a href="/scripture-tsunami"><span class="dropdown-icon">&#127�;</span> Scripture Tsunami</a>
                        <a href="/creeds-confessions"><span class="dropdown-icon">&#128�;</span> Creeds &amp; Confessions</a>
                    </div>
                </li>
                <li>
                    <button class="nav-trigger">Apologetics <span class="nav-arrow">&#9660;</span></button>
                    <div class="nav-dropdown">
                        <a href="/demolition-hub"><span class="dropdown-icon">&#128293;</span> Demolition Zone</a>
                        <a href="/compare-calvinism-arminianism"><span class="dropdown-icon">&#9878;</span> Comparisons</a>
                        <a href="/objection-why-command"><span class="dropdown-icon">&#128172;</span> Objections Answered</a>
                    </div>
                </li>
                <li>
                    <button class="nav-trigger">Explore <span class="nav-arrow">&#9660;</span></button>
                    <div class="nav-dropdown">
                        <a href="/devotionals"><span class="dropdown-icon">&#128156;</span> Devotionals</a>
                        <a href="/stories"><span class="dropdown-icon">&#128214;</span> Stories &amp; Parables</a>
                        <a href="/analogies-illustrations"><span class="dropdown-icon">&#128161;</span> Analogies</a>
                        <a href="/pastoral-assurance"><span class="dropdown-icon">&#128588;</span> Pastoral</a>
                        <a href="/secular-evidence"><span class="dropdown-icon">&#128300;</span> Secular Evidence</a>
                    </div>
                </li>
                <li>
                    <button class="nav-trigger">History <span class="nav-arrow">&#9660;</span></button>
                    <div class="nav-dropdown">
                        <a href="/theologians"><span class="dropdown-icon">&#9733;</span> Theologians</a>
                        <a href="/history-timeline"><span class="dropdown-icon">&#128197;</span> Church History</a>
                        <a href="/ot-election"><span class="dropdown-icon">&#128220;</span> OT Election</a>
                    </div>
                </li>
                <li><a href="/resources">Resources</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </div>
    </nav>'''

def migrate(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()
    nav_pat = re.compile(r'<nav[^>]*>.*?</nav>', re.DOTALL)
    m = nav_pat.search(content)
    if not m:
        return False
    content = content[:m.start()] + NEW_NAV + content[m.end():]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    return True

count = 0
for fp in sorted(glob.glob(os.path.join(REPO, '*.html'))):
    fn = os.path.basename(fp)
    if fn in SKIP:
        continue
    try:
        if migrate(fp):
            count += 1
            print(f'  ✅ {fn}')
    except Exception as e:
        print(f'  ❌ {fn}: {e}')

print(f'\nDone: {count} pages updated with mega-menu nav')
