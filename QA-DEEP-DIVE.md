# Deep Dive QA Report
**Run:** 2026-03-29 (automated — run 2)
**Pages Tested:** 203
**Viewports:** HTTP status verified at all URLs; CSS/JS analysis done via comprehensive source code scan
**Status:** CLEAN

## CRITICAL (fix immediately)
None. No invisible content, no broken pages, no global file corruption.

## PHASE 1: GLOBAL FILE INTEGRITY

### global.css — CLEAN
- No `.reveal { opacity: 0 }` — removal comments from 2026-03-29 confirmed in place
- No `.scroll-reveal { opacity: 0 }` — removal comment confirmed
- No `.stagger > * { opacity: 0 }` — removal comment confirmed
- `opacity: 0` only found on safe elements: `.back-to-top` (button), `.tooltip` (UI), keyframe `from` states, decorative pseudo-elements
- No `display:none` on content classes — all instances are nav layout toggles (mobile/desktop), print styles, or tab panels (expected)
- No `visibility:hidden` on content — only on `.back-to-top` and `.tooltip` (expected)

### global.js — CLEAN
- Scroll reveal code adds `.visible` class only (no opacity:0 setting)
- Auto-reveal adds `.reveal` class then observes — safe since CSS `.reveal` has no opacity:0
- Engagement CTAs point to `/contact` and `/donate` — both files exist
- No newsletter/email signup code
- No code that could throw blocking errors

### nav.js — CLEAN
- Hamburger toggle functional with clone-to-strip-listeners pattern
- Mega-menu open/close with click-outside handling
- Search overlay with lazy-loaded index
- Mobile search with results container
- Keyboard shortcuts (Escape, Ctrl+K)
- Scroll detection for nav background
- Resize handler to close mobile menu on desktop transition
- No errors that could break navigation

## ERRORS
None found.

## WARNINGS

### Inline opacity:0 in page-specific styles (23 instances across pages)
All reviewed and confirmed SAFE:
- **CSS animation entrance effects** (e.g., `history-timeline.html` `.timeline-item` uses `animation: fadeInUp 0.8s ease forwards` — animates from 0 to 1, `forwards` keeps final state)
- **Homepage hero slides** (`index.html` `.hero-slide`) — JS-controlled slide transitions
- **Card arrows** (`.card-arrow` on analogies, psychology-hub, secular-evidence, stories, creeds-confessions) — decorative hover effects
- **Radio inputs** (`belief-assessment.html` hidden radio for custom styling)
- **Unused alternate homepages** (`index-old.html`, `index-new.html`) — not served to visitors

No opacity:0 found on content-bearing sections, articles, paragraphs, or main elements.

## STRUCTURAL

### Missing Includes — NONE
All 203 HTML files contain:
- `<link rel="stylesheet" href="/global.css">`
- `<script src="/nav.js"></script>`
- `<!DOCTYPE html>`
- `<meta name="viewport">`

### Broken Internal Links — NONE
All internal `href="/..."` links resolve to existing files or are covered by `_redirects`.

### Banned Content — CLEAN
- `privacy.html` mentions "email newsletters" in a policy disclosure sentence (not a signup form — acceptable)
- No newsletter signup forms, email collection, or resources pages found

## REDIRECT HEALTH
All redirect targets verified:
- 112 redirect rules in `_redirects`
- All `.html` targets exist in the repo
- No redirect chains detected
- Resources section redirects correctly point to `start-here.html` or `creeds-confessions.html`
- Bot/hacker probes (wp-admin, .env, etc.) correctly return 410
- `/subscribe` correctly redirects to `/contact.html`
- `/connect` correctly redirects to `/contact.html`

## HTTP STATUS
All 203 pages returned HTTP 200 (verified via curl against live site adoptedbygrace.net).

## SUMMARY
203 pages clean. 0 issues found. 0 auto-fixes needed. Site is healthy.

The 2026-03-29 opacity:0 fix in global.css remains intact. No new content-hiding patterns have been introduced.
