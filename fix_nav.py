#!/usr/bin/env python3
"""
Fix nav sections and add missing technical features to systematic theology files.
"""

import os
import re

# Standard nav block
STANDARD_NAV = '''<nav role="navigation" aria-label="Main navigation">
        <div class="nav-container">
            <a href="index.html" class="logo" style="text-decoration:none;">ADOPTED BY GRACE</a>
            <button class="hamburger" aria-label="Toggle navigation menu" aria-expanded="false" onclick="this.classList.toggle('active');document.querySelector('.nav-links').classList.toggle('open');this.setAttribute('aria-expanded',this.classList.contains('active'))">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="start-here.html">Start Here</a></li>
                <li><a href="questions.html">The Evidence</a></li>
                <li><a href="systematic-theology.html" class="active">Systematic</a></li>
                <li><a href="demolition-hub.html">Demolition</a></li>
                <li><a href="theologians.html">Theologians</a></li>
                <li><a href="resources.html">Resources</a></li>
                <li><a href="about.html">About</a></li>
            </ul>
        </div>
    </nav>'''

# Standard CSS
STANDARD_CSS = '''/* ========== STANDARD NAV ========== */
.nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; }
.logo { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 700; background: linear-gradient(135deg, #d4a254, #e8642c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: 0.1em; }
.nav-links { display: flex; gap: 2rem; list-style: none; }
.nav-links a { text-decoration: none; color: #9a958c; font-size: 0.95rem; transition: color 0.3s ease; font-weight: 500; }
.nav-links a:hover, .nav-links a.active { color: #d4a254; }

/* ========== HAMBURGER MENU ========== */
.hamburger { display: none; background: none; border: none; cursor: pointer; padding: 0.5rem; z-index: 1001; }
.hamburger span { display: block; width: 24px; height: 2px; background: #d4a254; margin: 5px 0; transition: all 0.3s ease; border-radius: 2px; }
.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
.hamburger.active span:nth-child(2) { opacity: 0; }
.hamburger.active span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

@media (max-width: 768px) {
    .hamburger { display: block; }
    .nav-links { display: none; position: absolute; top: 100%; left: 0; right: 0; background: rgba(10, 10, 15, 0.98); flex-direction: column; padding: 1rem 2rem 2rem; gap: 0; border-bottom: 1px solid rgba(212, 162, 84, 0.12); }
    .nav-links.open { display: flex; }
    .nav-links li { padding: 0.7rem 0; border-bottom: 1px solid rgba(212, 162, 84, 0.08); }
    .nav-links li:last-child { border-bottom: none; }
    .nav-links a { font-size: 1.1rem; display: block; }
    nav .nav-container { position: relative; }
    .logo { font-size: 1rem !important; }
}

/* ========== FOCUS STYLES ========== */
*:focus-visible { outline: 2px solid #d4a254; outline-offset: 2px; border-radius: 2px; }
a:focus-visible { outline-offset: 3px; }

/* ========== BACK TO TOP ========== */
.back-to-top { position: fixed; bottom: 2rem; right: 2rem; width: 44px; height: 44px; border-radius: 50%; background: rgba(18, 18, 26, 0.9); border: 1px solid rgba(212, 162, 84, 0.12); color: #d4a254; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; visibility: hidden; transition: all 0.3s ease; z-index: 999; backdrop-filter: blur(10px); }
.back-to-top.visible { opacity: 1; visibility: visible; }
.back-to-top:hover { background: rgba(212, 162, 84, 0.15); border-color: #d4a254; transform: translateY(-2px); }

/* ========== READING PROGRESS ========== */
.reading-progress { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, #d4a254, #e8642c); z-index: 9999; transition: width 0.1s linear; width: 0; }
'''

# Reading progress bar HTML
READING_PROGRESS_HTML = '<div class="reading-progress" role="progressbar" aria-label="Reading progress"></div>'

# Back to top button and scripts
BACK_TO_TOP_HTML = '''<button class="back-to-top" aria-label="Back to top" title="Back to top" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑</button>
<script>
(function(){var b=document.querySelector('.back-to-top');if(b){window.addEventListener('scroll',function(){b.classList.toggle('visible',window.scrollY>400)},{passive:true})}var p=document.querySelector('.reading-progress');if(p){window.addEventListener('scroll',function(){var h=document.documentElement.scrollHeight-window.innerHeight;var s=window.scrollY;var w=h>0?Math.min((s/h)*100,100):0;p.style.width=w+'%'},{passive:true})}})();
</script>'''

# Broken link fixes
LINK_FIXES = [
    (r'/systematic-theology\.html', 'systematic-theology.html'),
    (r'/the-evidence\.html', 'questions.html'),
    (r'/demolition\.html', 'demolition-hub.html'),
    (r'/systematic\.html', 'systematic-theology.html'),
]

def fix_file(filepath):
    """Fix a single file."""
    print(f"\nProcessing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Replace nav block
    nav_pattern = r'<nav[^>]*>.*?</nav>'
    if re.search(nav_pattern, content, re.DOTALL):
        content = re.sub(nav_pattern, STANDARD_NAV, content, flags=re.DOTALL)
        print("  ✓ Replaced nav block")
    else:
        print("  ! Nav block not found")

    # 2. Add CSS if not present
    if '/* ========== STANDARD NAV ========== */' not in content:
        style_pattern = r'(</style>)'
        match = re.search(style_pattern, content)
        if match:
            content = content[:match.start()] + STANDARD_CSS + '\n' + content[match.start():]
            print("  ✓ Added standard CSS")
        else:
            print("  ! </style> tag not found")
    else:
        print("  - CSS already present")

    # 3. Add reading progress bar after <body>
    if 'reading-progress' not in content:
        body_pattern = r'(<body[^>]*>)'
        match = re.search(body_pattern, content)
        if match:
            insertion_point = match.end()
            content = content[:insertion_point] + '\n' + READING_PROGRESS_HTML + content[insertion_point:]
            print("  ✓ Added reading progress bar")
        else:
            print("  ! <body> tag not found")
    else:
        print("  - Reading progress bar already present")

    # 4. Add back-to-top button and scripts before </body>
    if 'back-to-top' not in content:
        body_close_pattern = r'(</body>)'
        match = re.search(body_close_pattern, content)
        if match:
            insertion_point = match.start()
            content = content[:insertion_point] + BACK_TO_TOP_HTML + '\n' + content[insertion_point:]
            print("  ✓ Added back-to-top button and scripts")
        else:
            print("  ! </body> tag not found")
    else:
        print("  - Back-to-top already present")

    # 5. Fix broken internal links
    for old_link, new_link in LINK_FIXES:
        if re.search(old_link, content):
            content = re.sub(old_link, new_link, content)
            print(f"  ✓ Fixed {old_link} → {new_link}")

    # Only write if content changed
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ File saved")
    else:
        print(f"  - No changes needed")

def main():
    base_path = '/sessions/eager-gifted-cannon/mnt/adoptedbygracewebsite'
    files = [
        'systematic-christology.html',
        'systematic-hamartiology.html',
        'systematic-pneumatology.html',
    ]

    print("=" * 60)
    print("FIXING NAV AND TECHNICAL FEATURES")
    print("=" * 60)

    for filename in files:
        filepath = os.path.join(base_path, filename)
        if os.path.exists(filepath):
            fix_file(filepath)
        else:
            print(f"\n{filename}: FILE NOT FOUND at {filepath}")

    print("\n" + "=" * 60)
    print("COMPLETE")
    print("=" * 60)

if __name__ == '__main__':
    main()
