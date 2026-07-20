#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""S180 — strip hyperlinks out of quoted Scripture and out of headings.

The auto-linker's guard (UNSAFE_CLASSES: verse, chain-quote, chain-benediction,
verse-block, scripture-quote; unsafeTagNames: h1-h4) was added in S177/S178 and
stops NEW injections. Nobody ever swept the damage already on disk. There are
70 of them across 26 pages: 50 inside Scripture containers, 20 inside headings.

Why this is not cosmetic. The site quotes the NIV verbatim, with no "(NIV)"
suffix, precisely so that the translation-bias escape hatch is welded shut and
a reader can open his own Bible against ours. A gold hyperlink sitting inside
the verse breaks that: part of the quotation now reads as editorial emphasis,
and the text the reader is being asked to trust as untouched has visibly been
touched. VOICE §V.2 (Scripture quoted is Scripture verbatim) and §IX.4 (links
live in prose only) both land on the same answer.

The <a> wrapper is removed and its text is kept, so no word of any verse and no
heading changes. Link COUNTS drop, so the report flags any page that falls under
the 8-link floor for re-homing into the prose gloss next session.
"""
import io, os, re, shutil

H = re.compile(r'<h[1-4][^>]*>.*?</h[1-4]>', re.S)
V = re.compile(r'<(p|span|div)[^>]*class="[^"]*(verse|chain-quote|chain-benediction|verse-block|scripture-quote)[^"]*"[^>]*>.*?</\1>', re.S)
A = re.compile(r'<a\b[^>]*>(.*?)</a>', re.S)

os.makedirs('archive/s180-backup', exist_ok=True)
report, stripped_total = [], 0

for f in sorted(os.listdir('.')):
    if not f.endswith('.html'):
        continue
    s = io.open(f, encoding='utf-8', errors='ignore').read()
    orig = s
    before = len(A.findall(s))
    n = 0

    def clean(m):
        global n
        g = m.group(0)
        if 'related-article' in g or 'card' in g:
            return g
        inner = A.findall(g)
        if not inner:
            return g
        n += len(inner)
        return A.sub(lambda a: a.group(1), g)

    s = H.sub(clean, s)
    s = V.sub(clean, s)

    if n:
        after = len(A.findall(s))
        if not os.path.exists('archive/s180-backup/' + f):
            shutil.copy(f, 'archive/s180-backup/' + f)
        io.open(f, 'w', encoding='utf-8').write(s)
        stripped_total += n
        # count PROSE links only (inside the article body, excluding baked rails)
        body = s[s.find('<article class="article-body">'):]
        cut = body.find('<!-- RELATED-ARTICLES-START -->')
        if cut > 0:
            body = body[:cut]
        prose = len(re.findall(r'<a\s+href="/', body))
        report.append((f, n, prose))

print('stripped %d links across %d pages\n' % (stripped_total, len(report)))
print('%-52s %6s %8s' % ('page', 'cut', 'prose-links-left'))
low = []
for f, n, prose in report:
    flag = '  << UNDER FLOOR' if prose < 8 else ''
    if flag:
        low.append(f)
    print('%-52s %6d %8d%s' % (f[:-5], n, prose, flag))
print('\npages now under the 8-link prose floor: %d' % len(low))
for f in low:
    print('   ', f)
