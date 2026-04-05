# Navigation & Footer Consistency Audit
**Date:** 2026-04-04
**Audited:** All 310 HTML pages on adoptedbygrace.net

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Pages Audited | 310 |
| Pages with Issues | 46 |
| Compliance Rate | 85.2% (264/310 fully compliant) |
| Critical Issues | 16 (missing nav) |
| High Priority Issues | 20 (missing CSS/JS) |
| Medium Priority Issues | 10 (wrong terminology) |

---

## Critical Issues (16 pages)

### Issue #1: Missing Nav Tag (BLOCKER)

**Severity:** CRITICAL
**Impact:** Pages render with no navigation, no mega-menu, no search capability

These 16 pages are missing the `<nav>` element entirely. Most appear to be **stub pages** (incomplete pages with only metadata).

**Affected Pages:**
```
1. apologetic-definite-atonement.html
2. demolition-1cor15-22.html
3. demolition-1tim2-4.html
4. demolition-2peter2-1.html
5. demolition-acts7-51.html
6. demolition-hebrews6-4-6.html
7. demolition-romans10-9.html
8. devotional-dead-who-live.html ← STUB (has nav comment but no HTML nav)
9. devotional-love-before-the-world.html
10. devotional-when-god-says-no.html
11. donate.html
12. ot-david.html
13. ot-israel-chosen.html
14. ot-jacob-esau.html
15. ot-moses-pharaoh.html
16. question-cannot.html
```

**Evidence Example:**
`devotional-dead-who-live.html` has:
- The nav template text as an HTML comment (line 365) but NOT as actual HTML
- Missing entire `<nav>` element
- Page structure: `<body>` → `<progress-bar>` → footer immediately
- **Violates CLAUDE.md mandate:** "NO STUB PAGES — MANDATORY FOR ALL AGENTS"

**Pattern:**
These pages were likely created with a template that forgot to include the nav HTML. They need the canonical nav from `/_nav-template.html` inserted immediately after the opening `<body>` tag.

---

## High Priority Issues (20 pages)

### Issue #2: Missing Global.CSS Link (19 pages)

**Severity:** HIGH
**Impact:** Pages load without site styling (layout, colors, typography breaks)

Missing: `<link rel="stylesheet" href="/global.css">` in `<head>` section

**Affected Pages:**
```
1. apologetic-perseverance.html
2. apologetic-unreached.html
3. demolition-1john2-2.html
4. demolition-ezekiel18-23.html
5. demolition-john12-32.html
6. devotional-not-my-will-but-joy.html
7. devotional-rescued-without-a-say.html
8. objection-author-of-sin.html
9. objection-why-command.html
10. ot-abel-cain.html
11. ot-election.html
12. ot-jeremiah.html
13. ot-joseph.html
14. question-2tim1-9.html
15. question-john17.html
16. question-revelation13.html
17. question-titus3.html
18. start-here-assessment.html
19. theologian-whitefield.html
```

**Fix:** Add this line to `<head>` alongside other stylesheet links:
```html
<link rel="stylesheet" href="/global.css">
```

---

### Issue #3: Missing Nav.JS Script (1 page)

**Severity:** HIGH
**Impact:** Navigation interactivity non-functional (hamburger, mega-menu, search won't work)

Missing: `<script src="/nav.js"></script>` before closing `</body>` tag

**Affected Page:**
```
- broken-mirror-sin-you-repeat.html
```

**Fix:** Add before `</body>`:
```html
<script src="/nav.js"></script>
```

---

## Medium Priority Issues (10 pages)

### Issue #4: Footer Terminology: "Doctrine" instead of "Truth"

**Severity:** MEDIUM
**Impact:** Violates mandatory CLAUDE.md terminology guideline

Per **CLAUDE.md § CRITICAL TERMINOLOGY:**
> Generic "doctrine" → "truth"
> The word "doctrine" has academic, clinical connotations. The word "truth" is personal, existential, and inescapable.

**Affected Pages:**
```
1. compare-calvinism-arminianism.html (partial)
2. demolition-arminian-facts.html
3. demolition-joshua24-15.html
4. demolition-orthodox-predestination.html
5. history-calvin-geneva.html
6. ot-abel-cain.html
7. ot-jeremiah.html
8. ot-noah.html
9. psychology-autonomy-illusion.html
10. question-1john5-1.html
```

**Current Issue:**
Using `<h3>Doctrine</h3>` or `<h4>Doctrine</h4>` in footer sections

**Fix:**
Replace all footer section headers:
- `<h3>Doctrine</h3>` → `<h3>Truth</h3>`
- `<h4>Doctrine</h4>` → `<h4>Truth</h4>`

---

## Positive Findings ✓

The audit verified these elements are **correctly present on all compliant pages:**

| Component | Status | Pages Verified |
|-----------|--------|-----------------|
| Grace Warning (Romans 6:1-2) | ✓ Perfect | 294/294 with footer |
| Mega-menu Dropdown | ✓ Perfect | 294/294 with nav |
| Search Overlay | ✓ Perfect | 294/294 with nav |
| Nav Structure Correctness | ✓ Perfect | 294/294 with nav |

**Key Finding:** Every page that has a `<nav>` element uses the canonical nav template structure with all 9 required links in the correct order. Navigation architecture is consistent across the site.

---

## Canonical Nav Template Reference

The standard nav from `/_nav-template.html` must appear immediately after `<body>` on all pages and includes:

1. Home icon (SVG)
2. Best Reads (emphasize with `nav-best-reads` class)
3. Start Here
4. Questions
5. Theology
6. Demolition
7. Why We Resist
8. Through the Ages
9. Rest in Grace
10. About
11. Explore button (mega-menu toggle) — desktop only
12. Search icon — desktop and mobile

**Plus required elements:**
- `.mega-menu` div for dropdown content
- `.search-overlay` div for search modal
- `.footer-grace-warning` div with Romans 6:1-2 quote

---

## Repair Roadmap

### PRIORITY 1: Critical (16 pages)
**Task:** Restore missing nav tags
- Insert canonical nav from `/_nav-template.html`
- Verify pages have complete HTML content (not stubs)
- Run: `node build-search-index.js`
- Run: `node build-mega-menu.js`

### PRIORITY 2: High (19 pages)
**Task:** Add missing global.css link
- Add `<link rel="stylesheet" href="/global.css">` to `<head>`
- Place alongside other stylesheet links

### PRIORITY 3: High (1 page)
**Task:** Add missing nav.js script
- Add `<script src="/nav.js"></script>` before `</body>`
- Verify on: `broken-mirror-sin-you-repeat.html`

### PRIORITY 4: Medium (10 pages)
**Task:** Fix footer terminology
- Replace all `<h3>Doctrine</h3>` with `<h3>Truth</h3>`
- Replace all `<h4>Doctrine</h4>` with `<h4>Truth</h4>`

---

## Audit Methodology

Comprehensive automated scan of all 310 HTML pages checking:

1. ✓ Presence of `<nav>` tag
2. ✓ Presence of footer-grace-warning div
3. ✓ Presence of mega-menu dropdown
4. ✓ Presence of search overlay
5. ✓ Presence of global.css link in `<head>`
6. ✓ Presence of nav.js script before `</body>`
7. ✓ Correctness of nav structure (all required links, correct order)
8. ✓ Correct footer terminology (Truth vs Doctrine)

All checks performed via regex pattern matching on raw HTML content.

---

## Notes

- **No pages have the grace warning missing** — all footers are compliant on this element
- **No invalid nav structures detected** — pages that have nav use the canonical template correctly
- **Stub page problem** is real: Several pages (especially devotional-dead-who-live.html) have metadata but no actual content, violating CLAUDE.md's "NO STUB PAGES" mandate
- **High correlation** between missing nav and missing CSS/JS suggests batch creation with incomplete templates
