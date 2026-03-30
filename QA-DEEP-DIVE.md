# Deep Dive QA Report
**Run:** 2026-03-30 ~15:22 UTC
**Pages Tested:** 164 (all non-template, non-legacy HTML files)
**HTTP Status Check:** All 164 pages — curl at adoptedbygrace.net
**Rendering Spot-Check:** Homepage, Questions, Devotionals via WebFetch
**Status:** ✅ CLEAN

## CRITICAL (fix immediately)
None. No invisible content, no broken pages, no global file corruption.

## Phase 1: Global File Integrity

### global.css ✅
- NO `.reveal { opacity: 0 }` — confirmed removed
- NO `.scroll-reveal { opacity: 0 }` — confirmed removed
- NO `.stagger > * { opacity: 0 }` — confirmed removed (comment at line 627 documents removal)
- NO opacity:0 on any content-bearing classes
- Acceptable opacity:0 uses: `.back-to-top` (button), `.tooltip` (hover widget), animation keyframes, `.hamburger.active span:nth-child(2)` (hamburger animation), `.section-divider` (decorative 0.2 opacity)
- No dangerous `display:none` on content (all are nav toggles, print styles, tab panels)
- No `visibility:hidden` on content (only `.back-to-top` and `.tooltip`)

### global.js ✅
- No opacity:0 set on content elements
- Scroll reveal code adds `.visible` class via IntersectionObserver — safe pattern
- Auto-reveal (lines 104-112) adds `.reveal` class to `.content-section` and `.card-grid` but CSS no longer hides `.reveal` — safe
- Engagement CTAs point to `/contact` and `/donate` — both valid pages ✅
- No newsletter/email signup code ✅
- No code that could throw errors blocking subsequent scripts ✅

### nav.js ✅
- Hamburger toggle functional (clone-and-replace pattern for clean listeners)
- Mega-menu open/close with click-outside handling
- Search overlay opens/closes properly, Escape key closes all overlays
- Mobile search with inline results
- No errors that could break navigation

## Phase 2: HTTP Status Check
All 164 pages returned HTTP 200 via curl. No 404s, no redirect loops, no timeouts.

## Phase 3: Rendering Spot-Check (WebFetch)
- **Homepage (index.html):** ✅ Hero section, Five Truths tabs, Explore Hub, 70+ links, no errors, no newsletter
- **Questions hub:** ✅ 34 question links across 5 categories, full nav, no errors, no banned content
- **Devotionals hub:** ✅ 15 devotional cards, full nav, no errors, no banned content

## Phase 4: Structural Checks

### Missing Includes
All 164 pages include:
- ✅ `global.css`
- ✅ `nav.js`
- ✅ `<!DOCTYPE html>`
- ✅ `<meta name="viewport"`

### Inline opacity:0 Audit (HTML files)
20 HTML files contain inline `opacity:0` — ALL verified safe:
- Back-to-top buttons (most common)
- Animation keyframes (`@keyframes slideIn`, etc.)
- Hidden radio inputs in quiz/assessment (`input[type="radio"]`)
- Hover-reveal arrows on link cards
- Decorative pseudo-elements (opacity: 0.15, 0.25, 0.3 — not fully hidden)

### Banned Content Check
- ✅ No newsletter signup forms found
- ✅ No email collection code
- ✅ No resources pages
- ⚠️ `privacy.html` line 558 mentions "If we add... email newsletters... in the future" — informational text only, not functional code. Acceptable.
- ⚠️ `search-index.js` contains the word "newsletter" as indexed text — this is just the search index reflecting page content. Acceptable.

### Broken Internal Links
✅ No broken internal links found. All `href="/..."` paths resolve to existing files.

## Phase 5: Redirect Health

### _redirects File (112 lines)
✅ All redirect targets verified — every target HTML file exists in the repo.

Notable redirects:
- `/connect → /contact.html` (301) — properly redirects deleted page
- `/subscribe → /contact.html` (301) — properly redirects eliminated feature
- `/resources-*` → various pages (301) — all 12 resource redirects point to valid targets
- `/privacy → /about.html`, `/terms → /about.html` — valid
- Bot/hacker probes (wp-admin, .env, etc.) → 410 Gone — good security practice

No redirect chains detected. No dead targets.

## ERRORS
None found.

## WARNINGS
- privacy.html contains forward-looking newsletter language (line 558) — cosmetic only, no functional issue
- `index-old.html` and `index-new.html` exist as legacy files — not linked, not harmful

## SUMMARY
**164 pages checked. 0 issues found. 0 auto-fixes needed. Site is healthy.**

All global files (CSS, JS, nav) are clean. The opacity:0 bug from 2026-03-29 has not returned. No banned content (newsletters, resources, community) detected. All redirects resolve. All pages return HTTP 200. Content renders correctly on spot-checked pages.
