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
