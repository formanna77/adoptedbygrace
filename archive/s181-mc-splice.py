#!/usr/bin/env python3
"""S181 — insert the session entry above S180; roll S175 (oldest live) to the archive."""
import re, shutil, sys

MC = 'MISSION-CONTROL.md'
AR = 'MISSION-CONTROL-ARCHIVE.md'
shutil.copy2(MC, 'archive/s181-backup/MISSION-CONTROL.md')
shutil.copy2(AR, 'archive/s181-backup/MISSION-CONTROL-ARCHIVE.md')

ENTRY = """### Session 181 — 2026-07-20 — TWO MORE CROSS-PAGE TEMPLATES FOUND AND BROKEN (16 "Diamond" pages + a 17-page trinitarian closing machine the S180 sweep missed), the shared-phrase detector BUILT, multiplied-close 15 → 11, after-the-Amen 27 → 7

**TOOLING FIRST — `detect-shared-phrases.js` BUILT, and it found both templates in its first two runs.** Every cross-page mold broken so far (the presup trio, the testimony shelf, the Catch-Beneath H2s, the 84 Steel Man / Socratic Trap headings, the 7-page "So we confess it" machine) was found BY HAND. This finds them mechanically: n-grams of prose appearing on 3+ pages, worst-first. **The load-bearing design decision is the Scripture strip** — quoted verses are SUPPOSED to repeat verbatim across pages, and the first run returned nothing but John 6:44 on 74 pages and Ephesians 2:8-9 on 53. Container-stripping is not enough because most verses sit *inline in prose inside quotation marks*; the fix is to drop every quoted span before n-gramming. Flags: `--n` (gram length), `--min` (page threshold), `--tail` (closing 25% only — the highest-signal mode, since closing machines are the loudest tell). Triage, not verdict: shared *doctrinal formulae* are fine; a shared *rhetorical device* is §XVIII.3.

**§A — THE EIGHTH TEMPLATE: `<h2>The Diamond from One More Facet</h2>`, IDENTICAL ON 15 PAGES, each opening by narrating the site's own editorial apparatus.** "This is the site's **sixth defense** of total depravity." "This is the site's **fifth defense** of unconditional election." Three violations at once: **§I.3** (H2s are sentences, not labels — this one is a label, ×15), **§XVIII.3** (the checklist showing through the paint), and **§XXII.3 — the worst layer**: a reader being told he is reading item #6 in a content series is thinking about the publishing schedule, not Romans 9. Plus the site referring to itself in the third person, the same anonymization scar S178 fixed on wastes-nothing. **A 16th page (apologetic-the-washing-of-rebirth) carried the same self-narration under a page-native heading** and was caught only by the "the site's" grep. **NOT a blind cut:** the section does real §XIV.3 / §IX.3 work — it shows the doctrine proven from independent converging angles, which is the answer to "you are leaning on one proof-text." **Every cross-link was kept.** What was dissolved is the apparatus: 15 distinct sentence-H2s written from each page's own argument (*"Where the Other Proofs Stop, This One Goes Inside"* · *"The Lines Were Drawn Seven Centuries Early"* · *"Why the Hands Never Open"* · *"The Organ That Would Assess the Damage Is Damaged"* · *"The Argument Made Flesh, on a Road, at Noon"*), 16 differently-shaped openers, and the **"N facets, one stone" formula (identical on 8)** varied per page. All 15 new headings verified unique site-wide. Residue: **0**.

**§A — THE NINTH TEMPLATE, AND IT IS THE MACHINE S180 THOUGHT IT HAD KILLED.** S180 broke the *"So we confess it, who once ___"* closing machine on seven pages and recorded **"machine residue site-wide: 0."** That residue check keyed on the **phrase**, not the **shape** — and the entire `ethics-*` category plus four `reformed-apologetics-*` pages were running the identical device in a different vocabulary. **17 prose pages**, five parts: `<h2>The Catch — for [audience]</h2>` → *"And now the tenderness…"* / *"So hear the rest folded inside the doctrine"* → *"So we confess / So we lift our eyes from X to Y"* → **"We adore the Father who… the Son who… the Spirit who…" → "To the Triune God who…, be the glory forever. Amen."** → a bolded post-Amen stinger. Two of the stingers were near-verbatim twins (*"Worth is conferred, never earned."* / *"Dignity is conferred, never computed."*), the exact signature S180 flagged. *"And now the tenderness the doctrine has too often been denied"* ran **verbatim on two pages**; the whole "And now the tenderness" opener on six. **All 17 closes rewritten from scratch, each riding its own page's image at a deliberately different temperature** — three end on a kept hammer now integrated into prose rather than stranded past an Amen (*"You were a stranger at the gate. He carried you in."*), most end on prose, **ethics-abortion ends as quietly as anything on the site** (*"He conferred both. He conferred them in the dark, before either of you could ask"*), and devotional-valley-shadow was **reordered** so the page ends on its prayer instead of re-opening after it. ethics-wealth-stewardship — which had no roll-call and is the proof the shape was never required — had its own post-prayer stinger and meta-label H2 cut. **`The Catch —` in ethics: 12 → 0. Post-Amen stinger in ethics: 12 → 0. "We adore the" on prose pages: 17 → 0** (2 hub pages remain, non-prose utilities).

**§A — THE REMNANT, and one verify-don't-blind-cut SAVE.** question-john17 ended on three consecutive one-line hammers — *"That is the gospel. / That is election. / That is the prayer that proves it."* — a pure tricolon machine (§XXII.4) sitting after a paragraph that already landed the page perfectly (*"the Father has never once told that Son no"*); all three cut, near-pure subtraction. devotional-i-cant-feel-god's bolded stinger **restated the paragraph directly above it** (S178's named defect) and was cut. pastoral-assurance lost its *"Even now. Especially now."* fragment. **devotional-glory-of-divine-choice VERIFIED AND KEPT:** its *"Even my reaching was Yours"* is a line the page explicitly tells the reader to **say out loud**, followed by a paragraph about what happens when he does — load-bearing, not a stray beat, and the page's closing prayer is a legitimate §I.4 Embedded Prayer.

**NEW MOLD FOUND, NOT YET BROKEN — the "You are not holding on" stinger family, 8 pages.** *"You are not holding on. You are being held."* runs near-verbatim as a **closing stinger** on devotional-forever-loved, objection-faith-choice, question-boasting, question-john10, question-perseverance, freedom, plus the two fixed this session (devotional-i-cant-feel-god, pastoral-assurance — the latter rewritten onto its own hand/tired-hand image). **The remaining 6 are the top of S182's queue.**

**Pipeline** GREEN. Deviations from baseline: search-index **687** · mega-menu **657** · homepage-counts **609** · auto-linker ran (quotation/heading sweep re-run after it — only 2 AUX findings, both `<h5>` nav-card titles, legitimate) · wire-orphans 0 orphans / 76 unmapped · canonical **1** (known benign matt23-37 stub) · verify-scripture 3828 quotes / DIVERGENT 273 / "(NIV)" **0** · rot **0 structural** (secondary 156 → **144**) · **multiplied-close 15 → 11, severe 0, after-the-Amen 27 → 7**. **`validate-site.js` CHECK 7 earned its keep a second time** — it caught `detect-shared-phrases.js` as newly publicly-servable and printed the exact rule; added, now **96 forced rules**.

**Carries forward (S182):** the **6 remaining "You are not holding on" pages** · the remaining **11** multiplied closes (6 of which are already verified fine — see the kickoff's do-not-re-cut list) · **`The Catch —` H2 on ~21 non-ethics pages** (33 site-wide, 12 were ethics) · **"doctrine of election" on 23 pages** · re-home the 70 Scripture-stripped links into the prose gloss beside each verse · the `detect-ai-tells.js` uniformity metric, still unbuilt. **§XIX ledger: nothing spent this session.** Still unspent: **Matt 5:45**. **New to the watched-image ledger: the ship/rope at the deathbed, the coal touching unclean lips, the stranger carried in at the gate.**

---

"""

s = open(MC, encoding='utf-8').read()
anchor = '### Session 180 — 2026-07-20'
i = s.find(anchor)
assert i != -1, 'S180 anchor not found'
assert s.count('### Session 181') == 0, 'S181 already present'
s = s[:i] + ENTRY + s[i:]

# roll the oldest live entry (S175) into the archive
m = re.search(r'(### Session 175 — [\s\S]*?)(?=\n### Session 174 — |\Z)', s)
if m:
    rolled = m.group(1)
    s = s.replace(rolled, '')
    a = open(AR, encoding='utf-8').read()
    hdr = a.find('### Session')
    a = a[:hdr] + rolled.rstrip() + '\n\n---\n\n' + a[hdr:] if hdr != -1 else a + '\n\n' + rolled
    open(AR, 'w', encoding='utf-8').write(a)
    print('rolled S175 to archive')
else:
    print('S175 not found as a live entry — nothing rolled')

open(MC, 'w', encoding='utf-8').write(s)
print('S181 inserted.')
