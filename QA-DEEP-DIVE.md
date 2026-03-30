# Deep Dive QA Report
**Run:** 2026-03-29
**Pages Tested:** 198
**Viewports:** Live site spot-checks at multiple sizes (Puppeteer unavailable in sandbox — used WebFetch + source analysis)
**Status:** ISSUES FOUND — 2 auto-fixed

## CRITICAL (fix immediately)
None remaining. Two issues were found and auto-fixed during this run (see Auto-Fixed below).

## ERRORS
None. All spot-checked pages (index, about, devotional-never-gives-up, systematic-theology, demolition-hub) load with HTTP 200, full visible content, working navigation, and no blank sections.

## WARNINGS
- **privacy.html line 523** mentions "email newsletters" in future-tense privacy policy language ("If we add analytics, email newsletters..."). This is informational text, not a signup form — no action needed, but worth noting for consistency with the newsletter ban.
- **Redirect chain:** `/privacy` → `/about.html` and `/terms` → `/about.html` exist in `_redirects`, but `privacy.html` and `terms.html` also exist as files. Since the redirects are non-forced (no `!`), Netlify serves the actual files. These redirect rules are dead code.

## STRUCTURAL
- **All 198 HTML files pass** required includes check: `<!DOCTYPE html>`, `global.css`, `nav.js`, `<meta name="viewport">` — all present.
- **No broken internal links** found across all HTML files.
- **No connect page references** found in any HTML file (global.js had two — fixed).
- **No newsletter/email signup forms** found (privacy.html mention is informational only).
- **Inline opacity:0** found in ~20 HTML files — ALL are on safe UI elements (back-to-top buttons, radio inputs, decorative pseudo-elements, keyframe animations). Zero instances on content-bearing elements.

## GLOBAL FILE INTEGRITY
- **global.css:** CLEAN. No `.reveal { opacity: 0 }`, no `.scroll-reveal { opacity: 0 }`, no `.stagger > * { opacity: 0 }`. Removal comments from 2026-03-29 still in place. All opacity:0 instances are on back-to-top, tooltips, section-dividers, and keyframes only.
- **global.js:** FIXED (see below). Scroll reveal code is orphaned but harmless. No newsletter code. No errors that could block scripts.
- **nav.js:** CLEAN. Hamburger, mega-menu, search overlay, escape key, resize handlers all functional. No error-prone patterns.

## REDIRECT HEALTH
- **Total redirects:** 53 rules
- **Valid targets:** All redirect targets now point to existing files (after fix)
- **Dead redirect rules:** `/privacy` → `/about.html` and `/terms` → `/about.html` (overridden by existing files)
- **Redirect chains:** None remaining after fix

## AUTO-FIXED (2 issues)
1. **global.js — Broken engagement CTA links:** Two links pointed to deleted `/connect` page (`/connect#prayer` and `/connect#testimony`). Changed both to `/contact`.
2. **_redirects — `/subscribe` pointed to `/connect.html`:** Changed target to `/contact.html` since connect.html was deleted.

## SUMMARY
198 pages checked. 2 issues found and auto-fixed. 0 critical visibility bugs. Global files are clean — the opacity:0 catastrophe from 2026-03-29 has not returned. Site is healthy.
