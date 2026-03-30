# NIGHTWATCH QA Report

**Date:** 2026-03-29 (evening run)
**Agent:** NIGHTWATCH v1
**Total pages scanned:** 205
**Pages with issues found:** 22
**Issues fixed:** 19
**Issues flagged (not fixed):** 6

---

## Phase 1: Global Files Audit

| File | Status | Notes |
|------|--------|-------|
| global.css | PASS | `body { padding-top: 50px }` present, `body.hero-page { padding-top: 0 }` present, `.content-container` exists, all mobile breakpoints have `.mobile-search-toggle`, `.mobile-categories-grid`, `.mobile-menu-search` styles. No `opacity: 0` on `.reveal` or `.scroll-reveal`. |
| nav.js | PASS | v3 with hamburger, mega-menu, search overlay, mobile search, mobile categories, scroll detection. All handlers present. |
| global.js | FIXED | Removed duplicate nav scroll handler (was duplicating nav.js functionality). All other features intact: scroll reveal, accordion, tabs, progress bars, share buttons, engagement CTA. |
| _nav-template.html | FIXED | v3 template confirmed. Updated article counts to match actual content (see below). |
| search-index.js | PASS | 203 pages indexed. `SEARCH_INDEX` array present. |

### Mega-Menu Count Updates (in _nav-template.html + all 205 pages)

| Category | Old Count | New Count | Reason |
|----------|-----------|-----------|--------|
| Start Here | 9 | 7 | Actual: hub + assessment + 5 phases |
| The Evidence | 33 | 34 | New question page added |
| Why We Resist | 3 | 5 | Now includes psychology-autonomy-illusion, psychology-cognitive-biases, resistance-last-idol |
| Stories | 5 | 6 | story-the-self-made-man added |
| Theologians | 11 | 10 | theologian-arminius is a counter-profile, still 10 profiles |
| Old Testament | 12 | 14 | ot-jonah and ot-prophets-remnant added |
| Total header | 185+ | 200+ | Reflects actual site growth |

---

## Phase 2: Per-Page Issues

### A. FIXED: Missing `<title>` Tags (3 pages)

These pages had `og:title` and `twitter:title` meta tags but no `<title>` element:

- `apologetic-evangelism.html` — Added: "Doesn't Election Make Evangelism Pointless? — Adopted by Grace"
- `apologetic-perseverance.html` — Added: "Can You Lose Your Salvation? — Adopted by Grace"
- `apologetic-unreached.html` — Added: "What About Those Who Never Heard the Gospel? — Adopted by Grace"

### B. FIXED: `opacity: 0` on Content Classes (2 pages)

Per site rules, `opacity: 0` on content classes is BANNED.

- `index.html` — `.scroll-reveal` had `opacity: 0` as initial state. Changed to `opacity: 1` (visible by default).
- `question-1peter1.html` — `.scroll-reveal` had `opacity: 0` as initial state. Changed to `opacity: 1` (visible by default).

Note: `index.html` also uses `opacity: 0` in hero-slide animations and `@keyframes fadeUp` — these are animation states that transition to `opacity: 1` and are acceptable (not content hiding).

### C. FIXED: Missing Footer (3 pages)

- `ot-jonah.html` — Added standard site footer
- `question-isaiah53.html` — Added standard site footer
- `question-john17.html` — Added standard site footer

### D. FIXED: Missing `global.js` Reference (8 pages)

These pages lacked `<script src="/global.js" defer></script>`, meaning accordion, scroll reveal, share buttons, and engagement CTAs would not work:

- `best-reads.html`
- `devotional-love-letter-before-time.html`
- `ot-job.html`
- `ot-jonah.html`
- `psychology-cognitive-biases.html`
- `question-isaiah53.html`
- `question-parables.html`
- `story-the-self-made-man.html`

Skipped (intentionally custom JS): `index.html`, `index-new.html`, `index-old.html`

### E. FIXED: Duplicate Nav Scroll Handler in global.js

`global.js` had its own `nav.classList.toggle('scrolled')` scroll listener, duplicating the identical handler in `nav.js`. Removed the duplicate — `nav.js` is the canonical source.

---

## Phase 2: Flagged but NOT Fixed

### "Coming Soon" Labels (6 pages)

These are legitimate UI badges indicating future content, NOT placeholder text:

- `analogies-illustrations.html` — 3 cards labeled "Coming Soon"
- `demolition-john3-16.html` — Next article reference marked "Coming Soon"
- `ot-election.html` — Coming soon section
- `psychology-hub.html` — 2 cards labeled "Coming Soon"
- `stories.html` — 3 stories labeled "Coming Soon"
- `theologians.html` — 5 profiles labeled "Coming Soon"

**Recommendation:** As new content is created, these badges should be removed and replaced with links.

---

## Phase 3: Cross-Page Consistency

| Check | Result |
|-------|--------|
| All 13 nav links point to existing pages | PASS |
| All 15 mega-menu category links point to existing pages | PASS |
| Mega-menu footer links (Best Reads, Explore Map) exist | PASS |
| No banned newsletter/email signup content detected | PASS |
| No banned resources page links detected | PASS |
| No banned community/connect links detected | PASS |
| All pages have `<link rel="stylesheet" href="/global.css">` | PASS |
| All pages have `<script src="/nav.js"></script>` | PASS |
| All pages have viewport meta tag | PASS |
| All pages have `<meta name="description">` | PASS |
| All pages have v3 nav (mobile-search-toggle, mobile-menu-search, mobile-categories, mega-menu) | PASS |
| No old inline search scripts detected | PASS |
| No broken internal links detected | PASS |

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total HTML pages scanned | 205 |
| Pages with issues | 22 |
| Issues fixed | 19 |
| Issues flagged (informational) | 6 |
| Global files audited | 5 |
| Mega-menu counts corrected | 6 categories + total |
| Pages with mega-menu counts updated | 205 |

**Overall site health: GOOD.** All critical functionality issues resolved. Nav integrity, styles, scripts, and banned content checks all pass across 205 pages.
