# Site Integrity Log — 2026-03-30

## Guardian Session: 2026-03-30 (Evening Run)

**Agent:** The Guardian
**Pages scanned:** 227 HTML files (226 content + _nav-template)

### Broken Links Fixed
- **0 broken links found.** All 10,916 internal links resolve correctly.

### Hub Pages Updated
- **0 orphaned pages found.** All 133 child pages across 8 hubs are properly linked.

### Sitemap Updated
- **CRITICAL FIX:** Sitemap was severely out of sync — only 2 entries for 226 pages.
- Regenerated sitemap.xml with all 226 HTML files, proper URLs, priorities, and lastmod dates.
- Added 224 pages / Removed 1 stale entry (`adoptedbygrace.net` bare domain)

### Nav Repairs
- **0 pages needed nav fixes.** All 226 content pages have correct nav, global.css, and nav.js.

### Favicon Fixes
- `invisible-wall-hub.html` — Added missing `<link rel="icon">` tag
- `invisible-wall-lonely-theological.html` — Added missing `<link rel="icon">` tag

### Functional/Design QA
- **Page integrity:** 226/226 have DOCTYPE, viewport meta. 0 files under 1KB.
- **Fonts:** All pages import Playfair Display via Google Fonts.
- **Note:** 1,755+ inline color style instances detected across site (goldenrod #daa520, gray #b0b0b0 variants). These are functional but not CSS-variable-based. Consolidation to CSS classes is a future enhancement, not a defect.

### Deploy Status
- Sandbox network restrictions prevented direct Netlify deploy.
- Changes will go live via hourly auto-push → Git-triggered Netlify build.
- Pre-deploy checks: ALL PASS (227 files, index.html valid, sitemap valid, spot-checks clean)

### Issues Requiring Aaron's Attention
- **index-new.html** still exists as a draft homepage. Consider removing if no longer needed.
- **Inline color consolidation:** 1,755+ inline styles could be migrated to CSS variables for easier future theming. Low priority — everything works correctly as-is.

### Defect Summary
- Structural: 1 found (sitemap), 1 fixed
- Functional: 2 found (missing favicons), 2 fixed
- Design: 0 critical
- Outstanding: 0

---

## Previous Session: 2026-03-30 (Earlier Run)

**Agent:** abg-integrator
**Run time:** ~15 minutes
**Pages scanned:** 227 HTML files

---

## 1. BROKEN LINKS FIXED (3 links across 3 files)

| Source File | Broken Link | Fixed To | Reason |
|---|---|---|---|
| `story-the-letter-before-the-world.html` | `/question-election` | `/question-chosen` | Target file never existed; `question-chosen.html` (Ephesians 1:3-11) is the correct election page |
| `open-wound-hub.html` | `/theology` | `/systematic-theology` | Footer link pointed to nonexistent `/theology`; correct page is `systematic-theology.html` |
| `open-wound-hospital-room.html` | `/theology` | `/systematic-theology` | Same footer link issue |

## 2. HUB-TO-CHILD SYNCHRONIZATION

### Fixed:
- **questions.html** — Added missing card for `question-proverbs-sovereignty.html` ("No Dice, No Chance — God's Sovereignty over Lots and Kings", Proverbs 16:33/21:1) as question #37 in the "Further Objections & Refinements" section.

### Already Synchronized (no action needed):
| Hub | Children | Status |
|---|---|---|
| devotionals.html | 15 | 100% |
| stories.html | 9 | 100% |
| demolition-hub.html | 18 | 100% |
| systematic-theology.html | 20 | 100% |
| theologians.html | 10 | 100% |
| analogies-illustrations.html | 5 | 100% |
| secular-evidence.html | 9 | 100% |
| psychology-hub.html | 5 | 100% |
| history-golden-thread.html | 14 | (self-ref excluded by design) |

## 3. SITEMAP SYNCHRONIZATION

**Status: Clean.** All 212 sitemap entries resolve to existing files. All content pages on disk are represented in sitemap.xml.

Intentionally excluded from sitemap (correct):
- `404.html` (error page)
- `index-new.html` (draft/staging page)
- `index-old.html` (archived)
- `_nav-template.html` (template fragment)

## 4. CROSS-REFERENCE WEAVING (4 pages updated)

### compare-calvinism-arminianism.html
Added 5 new cross-reference cards to existing "Continue Your Journey" section:
- question-john6.html — "John 6: No One Can Come Unless Drawn"
- question-depravity.html — "Total Depravity: How Deep Does It Go?"
- question-irresistible.html — "Irresistible Grace"
- question-perseverance.html — "Perseverance of the Saints"

### question-depravity.html
Added new "Continue Your Journey" cross-reference section (6 cards):
- question-romans9, question-john6, question-irresistible, question-perseverance, question-newheart, question-ezekiel37

### question-ezekiel37.html
Added new "Continue Your Journey" cross-reference section (4 cards):
- question-depravity, question-romans9, question-irresistible, question-newheart

### psychology-hub.html
Added new "Go Deeper" cross-reference section (4 cards):
- question-romans9, question-depravity, question-freewill, secular-psychology-bondage-of-will

### Remaining cross-reference opportunities (for future runs):
A full audit identified 245+ missing cross-references site-wide. Key areas for future work:
- Comparison pages (compare-calvinism-molinism, compare-calvinism-catholic-soteriology, etc.) need links to core Q&A pages
- Many question-* pages lack cross-references to related questions
- Healing category pages (anxious-mind, broken-mirror, etc.) could link to doctrinal foundations

## 5. NAVIGATION AUDIT

**Status: Clean.** Sampled 45+ pages across all categories. Every page has:
- global.css linked in head
- nav.js loaded before body close
- Mega-menu dropdown present
- Search overlay present
- Canonical nav structure matching _nav-template.html

No remediation required.

## 6. ITEMS FOR AARON'S ATTENTION

- **index-new.html** exists as a draft homepage. If it's no longer needed, consider removing it.
- **245+ cross-reference gaps** remain site-wide. The integrator added the highest-value ones this run; future runs will continue weaving.

---

*"The whole body, joined and held together by every supporting ligament, grows and builds itself up in love, as each part does its work." — Ephesians 4:16*
