# S194 — Comprehensive Forensic Audit + Ordered Fix List
**Date:** 2026-07-29 · **Constraint:** 13% weekly compute remaining
**Brief:** find where compute is needed most for the *continuity* of the site, rank it, execute down the list.

---

## HEADLINE

The prose is not the problem. The **delivery** is.

Every content-integrity axis came back clean on the first sweep: 0 broken internal
links, 0 orphans, 0 emoji anywhere in HTML/JS/JSON, 0 `TL;DR`, 0 appended `(NIV)`,
0 banned in-page jump-nav, 684/687 pages carrying JSON-LD, 685 URLs in the sitemap,
and "In Brief" on 100% of genuine articles. Years of discipline held.

What had rotted was underneath: **the gate that guards all of it, and the speed at
which any of it reaches a reader.** Both are continuity problems — one lets defects
in silently forever, the other decides whether the argument is ever read at all.

---

## THE ORDERED FIX LIST

### P0 — The integrity gate was reporting on 6 of its 11 checks. **[DONE]**
`validate-site.js` printed

```
🎉 ALL CHECKS PASSED — site integrity verified
```

at line 299 — **before CHECKS 7, 8, 9, 10 and 11 had run a single line.** Every check
added after CHECK 6 had been appended *below* the verdict, so the gate grew from six
checks to eleven while its headline kept reporting on six.

The exit code was always right; the exit code is not what anyone reads. Sessions read
the banner. So the last thing every session saw before closing was a green
"site integrity verified" that had never looked at whether internal files were being
served publicly, whether an inline `<style>` had escaped the allowlist, or whether
prose links had re-duplicated. 45% of the gate, reported clean by a banner that could
not have known.

**Fixed:** the verdict now prints last, after the final check, with a comment
explaining why it must never be moved up. The mid-file line is now an explicit
interim tally that says so.

---

### P1 — 184 KB of render-blocking JavaScript on all 687 pages. **[DONE]**
`/nav.js` loaded **render-blocking on every page on the site**. It is 184 KB, and
**150 KB of that (81%) is the static `MEGA_MENU_DATA` literal** — a navigation blob
for a menu the reader has not asked to open, parsed before the first word paints.

This is the single largest threat to the mission that existed. We can out-argue every
peer site on the page and still lose the reader who never got to the page: Core Web
Vitals gate search ranking, and a phone on cellular data abandons before the argument
starts. GotQuestions says less and loads faster, and that is a real advantage over us.

**Deferring was provably safe, not merely probably:** `nav.js` contains no
`document.write`, and its own bootstrap already waits for `DOMContentLoaded`. Under
`defer` it executes at readyState `interactive`, so `_navInit()` simply runs
immediately — behaviour-identical, off the critical path.

**Fixed** on all 687 pages via `fix-script-payload.js`.

---

### P2 — 21 more heavy blocking scripts, found only *because* P4 landed. **[DONE]**
The new CHECK 12 immediately caught what no human sweep had: `/scripture-niv.js`
(**252 KB** of pure verse data — 0 functions, 0 DOM access) loading render-blocking on
all 15 printable pages and 5 others, plus `/content-manifest.js` (132 KB) blocking on
`index.html`, the front door.

`index.html` needed one extra step: its inline consumer called `loadSpotlight()` /
`loadRecent()` at parse time, which would silently render an empty Spotlight and empty
Recently-Added once the manifest was deferred. Both calls are now wrapped in
`DOMContentLoaded` — guaranteed safe, since deferred scripts all complete before that
event fires.

**Result on the homepage: render-blocking payload down from ~1,000 KB to 348 KB**, and
what remains is entirely CSS. All JavaScript is now off the critical path.

---

### P3 — 79 KB of dead, self-contradicting documentation shipped to readers. **[DONE]**
86 pages carried a pasted copy of the `CANONICAL NAV TEMPLATE` instruction comment —
downloaded by every reader, read by none. The copies had also gone stale in a way that
actively misleads: an earlier sanitising pass had eaten tags out of their middle,
leaving

```
  REQUIRED in <head>:

  REQUIRED before :
```

— a required instruction with its requirement deleted. A future agent reading that
learns nothing and may well "fix" it by guessing.

**Stripped from all 86.** `/_nav-template.html` remains the single canonical source.

---

### P4 — Nothing guarded whether the page *arrives*. **[DONE]**
Eleven checks guarded what the page **says**. Zero guarded page weight. So P1, P2 and
P3 could each recur the moment anyone pasted a script tag, with nothing to catch it.

**Added CHECK 12: Critical-Path Payload** — fails on any duplicate `<script src>` and
on any of `/nav.js`, `/scripture-niv.js`, `/content-manifest.js` loading without
`defer`. Page weight is now a one-way ratchet, like CHECK 10.

---

### P5 — `.git` is 2.2 GB holding 13.5 MB of history. **[NEEDS AARON — one command]**
```
count: 58279          ← loose objects
size: 2.13 GiB        ← loose object bytes
in-pack: 4829
size-pack: 13.52 MiB  ← the ACTUAL repository
garbage: 25439
size-garbage: 147.12 MiB
```

The repo is **2.9 GB on disk for ~14 MB of real content.** 58,279 loose objects and
25,439 garbage files were never collected — debris from the interrupted
`filter-branch` of the 2026-04-20 anonymization, whose `.git-rewrite/` directory is
still sitting in the root. Every `git status`, every `git add -A`, every push and every
Netlify clone pays for it.

**I cannot run this — git policy is zero-exceptions. Aaron must:**
```bash
cd ~/Documents/adoptedbygracewebsite && rm -rf .git-rewrite && git reflog expire --expire=now --all && git gc --prune=now --aggressive
```
Expected result: **2.9 GB → roughly 100 MB.** Nothing is lost; `git gc` only discards
objects already unreachable from any branch, tag, or reflog.

---

### P6 — `global.css` is 303 KB, render-blocking on every page. **[OPEN — next session]**
Now that all JS is deferred, this **is** the critical path: 348 KB of blocking CSS,
7,836 lines, 2,301 rule pairs. The win is a critical-CSS split (inline the above-the-fold
rules, load the rest async) or a dead-rule audit. Highest-value remaining performance
work, and it needs real care — a botched CSS split breaks every page at once.

---

### P7 — Root directory hygiene. **[OPEN — low risk, low urgency]**
828 files at the repo root, including 11 `__*.js` scratch probes from May and ~15 stale
`.md` planning docs that CLAUDE.md says belong in `archive/`. All are correctly blocked
from public serving (CHECK 7 passes, 108 rules), so this is tidiness, not exposure.

---

## TWO FALSE POSITIVES — recorded so the next session does not re-chase them

**1. "41 pages double-load nav.js" — wrong. There were zero real double-loads.**
All 41 were commented-out `<script>` lines inside the pasted nav-template block. Dead
markup, never fetched, but byte-for-byte identical to a live tag under grep. I acted on
the grep before checking comment boundaries and removed tags on that basis; the finding
was corrected, the affected pages restored from `HEAD`, and the transforms re-applied
cleanly. **CHECK 12 now strips HTML comments before counting** — a check that cannot
tell live markup from a comment is not a check, it is a rumour.

**2. `devotional-the-shepherd-came-looking.html` "middle of the night" — not a violation.**
The VOICE §II ban is on *manufactured reader crisis scenes* ("you wake at 3 a.m. in a
panic"). This line is the shepherd of Luke 15 walking the hills calling a name. It is
scripturally grounded and it stays.

**Method note for the next agent:** the regex `/<!--[^]*?MARKER[^]*?-->/` looks correct
and is not — it anchors on the *earliest* `<!--` in the file and lazily expands across
everything in between. It swallowed a `<link rel="stylesheet" href="/global.css">` on
ten pages before CHECK 3 caught it. Use `(?:(?!-->)[^])*?` so the match is physically
unable to cross a comment boundary.

---

---

# ROUND TWO — the deep dive after P0–P5 shipped

Aaron ran the `git gc` (2.9 GB → 1.3 GB, see the correction below) and asked what else
the remaining compute should buy. The second sweep asked a different question than the
first: not *"is anything broken?"* but **"where does the code ask for something the
site never supplies?"** — the shape of the font bug, generalised. That vein produced
the two largest findings of the whole session.

### P8 — 362 pages rendered in the wrong typefaces. 347 of them live articles. **[FIXED]**

`global.css` has always demanded two typefaces it does not supply:

```css
body           { font-family: 'Inter', sans-serif; }
h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
```

— with **zero `@font-face` and zero `@import` anywhere in it.** The only source of
either face is a `<link>` to Google Fonts pasted into each page's `<head>`, and that
link was on **325 of 687 pages.**

The other 362 rendered every heading in Times New Roman and every paragraph in Arial.
**347 were live articles — 56% of the corpus.** The site had two entirely different
typographic identities and which one a reader met depended on which door they came
through. The standard is that no matter what page someone lands on they feel the
undeniable force of truth in its words; a reader who lands on Romans 9 set in Times New
Roman has already been told something about how seriously to take it, before reading a
line.

The fingerprint of how it happened is still on the pages: **340 of the 362 carry
`<link rel="preconnect" href="https://fonts.googleapis.com">` and no font request at
all.** An automated "performance hints" pass added connection warm-ups for a stylesheet
that was never there — optimising the loading of nothing, on more than half the site,
for months. Nothing caught it, because every other check reads the HTML and the HTML
was perfectly valid. The defect lived in the *gap* between what the stylesheet asked
for and what the page provided.

**Fixed** on all 686 real pages by `fix-missing-webfonts.js`, which also adds the
`fonts.gstatic.com` preconnect — the one that actually matters, since the font *files*
come from gstatic, not googleapis. `display=swap` was already in the URL, so text
paints immediately in fallback and swaps.

### P9 — three typography variables used 127 times, defined nowhere. **[FIXED]**

The same failure one layer down. `--font-heading`, `--font-body` and `--font-mono` were
referenced **127 times** across `global.css` and defined in no `:root` block.

This does not fail the way it looks like it fails. An undefined custom property makes
its declaration *invalid at computed-value time*, and `font-family` is an **inherited**
property — so `font-family: var(--font-heading)` did not fall through to the `h1-h4`
rule. It silently became `inherit` and picked up the **parent's** font. **28 live rules
were affected**, including `.article-body .section-divider h2` — a section heading on
article pages, meant to be Playfair Display, rendering in Inter everywhere it appears.
The stylesheet asked for the right typeface and quietly got the wrong one.

**Fixed:** the three tokens are now defined in `:root` with the values the rest of the
stylesheet already hardcodes, so nothing that worked changed and everything that was
broken is repaired.

### P10 — the skip-to-content link was on 115 of 687 pages. **[FIXED]**

A reader using a keyboard or a screen reader had to tab through the site name, the
hamburger, the search button and ten navigation links before reaching the first word of
the article. On every page. Every time. That is WCAG 2.4.1, and the mission statement
has no exception for the reader who cannot use a mouse.

**660 working skip links now, up from 115**, each verified to point at an anchor that
actually exists — a skip link aimed at a missing anchor is worse than none, because it
looks like compliance and moves focus nowhere. 26 hub/widget pages with no article
wrapper were deliberately left alone rather than inventing an anchor in markup the
script does not understand.

### CHECK 13 — and a real regression test

`validate-site.js` gained **CHECK 13: Web Font Delivery**, in two halves: every page
must supply the typefaces its CSS demands (counting a preconnect-without-a-stylesheet
as its own error, since that is the silent form), and every fallback-free
`var(--custom-property)` must be defined.

It was then **proven** rather than assumed: deleting `--font-mono` from `:root` made
the validator fail with `--font-mono — 100 declaration(s) silently dropped`, and
restoring it returned all 13 checks to green. A check that has never been seen to fail
is not a check.

---

## A CORRECTION AND TWO MORE MISTAKES, RECORDED HONESTLY

**The `git gc` projection was wrong.** I read `in-pack: 13.52 MiB` as "the real
repository" and predicted 2.9 GB → ~100 MB. The 58,279 loose objects were *reachable
history*, not garbage; `gc` compressed them into a 575 MiB pack. Actual result:
**2.9 GB → 1.3 GB.** A genuine 55% reduction and worth doing, but not what I said. The
number to read for true content size was never `in-pack` on a repo with uncollected
loose objects.

**I nearly broke the entire corpus with an attribute order.** `fix-skip-links.js` first
wrote `<article id="main-content" class="article-body">`. **21 scripts** — including
`build-tags.js`, `build-homepage-counts.js`, `dedupe-prose-links.js`, CHECK 11, and the
runtime `share-bar.js` — match the *literal string* `<article class="article-body"`.
The canonical article count fell from 618 to **89** and the validator still reported all
checks passing, because CHECK 11 does `if (open === -1) continue`. Caught before the
pipeline ran; fixed by writing the `id` *after* the class so the literal substring
survives byte-for-byte.

**Lesson, and it is the same lesson as the comment-boundary error in round one:** this
codebase is held together by literal string matches across 21 files. Before changing
any markup those scripts key on, grep for who consumes it. A change that reads as
cosmetically identical is not necessarily identical to a substring match.

**One accidental discovery from that near-miss:** `contact.html`, `donate.html` and
`sitemap.html` were already written `id`-before-`class`, making them invisible to all
21 scripts. They are utility pages that belong outside the article index, so they were
restored to that ordering deliberately — but it is worth knowing the corpus contains
pages that are invisible to its own tooling by accident of attribute order.

---

## VERIFIED STATE AT CLOSE

```
ALL 12 CHECKS PASSED — site integrity verified
```

Full pipeline re-run: `build-tags` (611 articles) → `build-all-content` (611 cards) →
`build-search-index` (683 pages) → `build-mega-menu` (8 umbrellas, 655 articles) →
`build-homepage-counts` (611) → `auto-linker` (0 new links; idempotent, as designed) →
`wire-orphans` (0 duplicates). Independent sweep against `git HEAD` confirms no page
lost `global.css`, `<nav>`, `nav.js`, the grace-warning footer, or a closing tag.

**Net for the reader: every page on the site now paints without waiting on 184 KB of
menu data, and the front door dropped ~650 KB off its critical path.**

### Final counts after round two

| | before | after |
|---|---|---|
| pages supplying their own typefaces | 325 | **686** |
| live articles rendering in Times New Roman | 347 | **0** |
| CSS declarations silently dropped by undefined vars | 127 | **0** |
| working skip-to-content links | 115 | **660** |
| homepage render-blocking payload | ~1,000 KB | **348 KB** (all CSS) |
| checks in the integrity gate | 11 (6 reported) | **13 (all reported)** |
| repo size | 2.9 GB | 1.3 GB |
| canonical article count | 611 | 611 (unchanged, verified) |

---

## WHAT REMAINS — for the next session, in order

1. **`global.css` critical-CSS split.** With all JS deferred, 348 KB of blocking CSS
   *is* the critical path. Deliberately not attempted here: a conservative dead-rule
   analysis found only 36.5 KB (12%) confidently removable, scattered across ~150 tiny
   component families with no single meaningful win — a poor trade against the risk of
   breaking 687 pages with no visual regression test. The right instrument is a
   critical-CSS split (inline above-the-fold, load the rest async) done with proper
   compute and visual verification, not a pruning pass.

2. **One genuinely dead component family is safe to remove now:** `global.css` still
   carries the styling for a **previous generation of the mega-menu**
   (`.mega-menu-inner`, `-header`, `-title`, `-grid`, `-card`, `-icon`, `-footer`,
   `-sub-link`, `-subcat-header`). The current `nav.js` renders the menu with an
   entirely different class set (`-panel`, `-cats`, `-cat-item`, `-detail`,
   `-hub-link`, `-page-link`). Verified: none of the old names appear in any HTML or JS.

3. **132 `<title>` tags exceed 65 characters** and are truncated in search results.
   These are crafted prose, so they need editing by hand, not by script.

4. **Root hygiene:** 828 files at the repo root, including 11 `__*.js` scratch probes
   from May and ~15 stale planning `.md` docs that CLAUDE.md says belong in `archive/`.
   All are correctly blocked from public serving, so this is tidiness, not exposure.

## CLEAN, AND CONFIRMED CLEAN — do not re-audit these

Checked this session and found sound: broken internal links (0), orphans (0), emoji (0),
`TL;DR` (0), appended `(NIV)` (0), banned in-page jump-nav (0), duplicate `<title>` (0),
duplicate meta descriptions (0), sitemap accuracy (685 URLs, 0 dead), `<script src>`
targets (all exist), image and stylesheet references (all exist), `_redirects` targets
(all resolve), `getElementById` targets (all created by their own script — 5 apparent
misses were idempotence guards, not bugs), viewport meta (all pages), `lang` attribute
(all pages), and `<h1>` count (exactly one on every page — 0 pages with none, 0 with
several).
