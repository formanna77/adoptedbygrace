# DESIGN AUDIT REPORT — adoptedbygrace.net
**Date:** 2026-03-28
**Agent:** Designer
**Scope:** Full site audit — all 100 HTML pages

---

## Executive Summary

Comprehensive design system audit of every page on adoptedbygrace.net. Found and fixed 7 categories of systematic violations affecting 60+ pages. The site now has significantly improved mobile experience, consistent spacing, and proper design token usage.

---

## Issues Found & Fixed

### 1. Devotional Color Drift (10 pages) — FIXED
**Severity:** High
**Pages:** All 10 devotional-*.html files
**Issue:** Custom background colors `#0d0b08` (bg-deep) and `#14120e` (bg-card) instead of spec values `#0a0a0f` and `#12121a`.
**Fix:** Replaced all instances with correct design system values.

### 2. Body Line-Height Below Spec (55+ pages) — FIXED
**Severity:** High
**Pages:** All question, devotional, demolition, systematic, theologian, OT, comparison, objection, history, secular, start-here-phase, story, resistance, pastoral, freedom pages
**Issue:** Body `line-height: 1.6` or `1.7` on long-form reading pages. Spec requires `>=1.8` for reading comfort.
**Fix:** Updated body line-height to `1.8` across all long-form content pages. Sub-component line-heights (e.g., labels at 1.6, quotes at 1.7) left as-is since they're appropriate for their context.

### 3. Footer Margin-Top Inconsistent (40+ pages) — FIXED
**Severity:** Medium
**Pages:** Widespread — values ranged from `2.5rem` to `6rem`
**Issue:** Footer margin-top should be `5rem` (desktop) per spec. Found values of 2.5rem, 3rem, 4rem, and 6rem.
**Fix:** Normalized all desktop footer margin-top values to `5rem`.

### 4. Card Grid Minmax Below 320px (All hub/grid pages) — FIXED
**Severity:** Medium
**Pages:** All pages with card grids
**Issue:** `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` and similar — values ranged from 200px to 300px. Spec requires `minmax(320px, 1fr)`.
**Fix:** Normalized all card grid minmax values to `320px`. Left footer-nav and section-nav grids (120-180px) unchanged since they're navigation elements, not content cards.

### 5. Index.html Hero Min-Height (1 page) — FIXED
**Severity:** High (mobile UX)
**Page:** index.html
**Issue:** Hero used `min-height: 100vh` at all viewport sizes, causing full-screen hero on tablets.
**Fix:** Changed @768px breakpoint to `min-height: auto; padding: 6rem 1.5rem 3rem` (the @480px breakpoint already had `min-height: auto`).

### 6. Missing @480px Mobile Breakpoints (60 pages) — FIXED
**Severity:** High
**Pages:** All devotional, systematic, theologian, OT, comparison, objection, history, secular, resources, start-here, community, explore-map, scripture-tsunami, search, resistance pages
**Issue:** No `@media (max-width: 480px)` breakpoint, meaning small phones got tablet-sized spacing.
**Fix:** Added standard @480px breakpoint to all 60 pages with: `h1: 1.8rem`, `page-hero: 4.5rem 1rem 1.5rem`, `content-section: 1.5rem 1rem`, `footer: 2rem margin-top, 1.5rem padding`, `buttons: 0.8rem 1.8rem`, `cards: 1.5rem padding`, `blockquotes: 1.2rem 1.3rem`.

### 7. Hardcoded Non-System Colors (12+ pages) — FIXED
**Severity:** Medium
**Pages:** search.html, quiz.html, explore-map.html, scripture-tsunami.html, start-here.html, freedom.html, question-*.html (share buttons)
**Issue:** Tailwind-style colors (#3b82f6, #f59e0b, #ec4899, #34d399, #ef4444, #94a3b8, #2ecc71, #3498db, #e74c3c, #e85d75, #c45050, #06b6d4, #f472b6, #10b981) used instead of design system variables.
**Fix:** Mapped all non-system colors to closest design tokens: blues→accent-violet, ambers→accent-gold, pinks/reds→accent-ember, slates→text-secondary. Fixed share button hardcoded hex colors in question pages to use CSS variables.

---

## Verified Correct (No Fix Needed)

### Body Text Color Architecture
**Assessment:** Correct as-is.
The `body { color: var(--text-primary) }` pattern is architecturally sound — headings inherit --text-primary (bright), while `.content-section p`, article paragraphs, and body text explicitly set `color: var(--text-secondary)`. All pages properly implement this dual-color approach.

### Navigation (Mega Menu)
All pages use the standard mega-menu nav structure with proper hamburger at <=900px.

### Font Stack
Playfair Display (headings), Inter (body), JetBrains Mono (labels/refs) — correctly used across all pages.

### Blockquote/Scripture Styling
Gold left border, gradient backgrounds, italic Playfair text, JetBrains Mono citations — consistent across all pages that have scripture blocks.

---

## Remaining Known Items (Low Priority)

1. **Some pages use 4px border-radius on cards** instead of 12px — affects ~27 systematic/theologian/comparison pages. These may be intentional design variants for different card types.
2. **History pages have wider max-width** (1000-1200px) for timeline layouts — arguably appropriate for those layouts but could be reviewed.
3. **quiz.html and search.html** still have some functional color codes (success green, warning amber) that were mapped to system colors but may need dedicated status color tokens in the future.

---

## Metrics

| Category | Files Audited | Files Fixed | Fix Type |
|----------|--------------|-------------|----------|
| Color drift | 100 | 10 | Devotional bg colors |
| Line-height | 100 | 55+ | Body line-height 1.6/1.7→1.8 |
| Footer spacing | 100 | 40+ | margin-top normalized to 5rem |
| Card grid | 100 | 80+ | minmax normalized to 320px |
| Hero sizing | 100 | 1 | Removed 100vh at tablet |
| @480px breakpoint | 100 | 60 | Added standard small-phone breakpoint |
| Hardcoded colors | 100 | 12+ | Mapped to CSS variables |

**Total pages audited:** 100
**Total pages modified:** ~80
**Total individual fixes:** ~300+
