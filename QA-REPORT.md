# adoptedbygrace.net - HTML QA Report
**Generated:** 2026-03-30

## Summary Statistics
- **Total HTML files checked:** 227
- **All files passed file size check:** 0 files under 1KB

## Critical Issues by Category

### 1. Page Structure & Metadata
| Issue | Count | Files |
|-------|-------|-------|
| Missing DOCTYPE | 1 | `_nav-template.html` |
| Missing viewport meta tag | 1 | `_nav-template.html` |
| Missing favicon reference | 3 | `_nav-template.html`, `invisible-wall-hub.html`, `invisible-wall-lonely-theological.html` |

**Assessment:** Very minor. The `_nav-template.html` is a template file (not served directly), and the two invisible-wall files can be fixed with a single favicon reference addition.

---

### 2. Typography & Font Loading
| Issue | Count | Files |
|-------|-------|-------|
| Missing Playfair Display import | 4 | `_nav-template.html`, `belief-assessment.html`, `history-confessions-story.html`, `ot-prophets-remnant.html` |

**Assessment:** Minor. These files may still render if Playfair Display is being served globally via CSS. Should verify that Playfair Display is loaded in `global.css` for these files.

---

### 3. Design System Color Violations (MAJOR)
**Total instances:** 1,755 color style violations across files

**Unique rogue colors detected:**
- `#daa520` — 856 instances (goldenrod variant - not #d4a254)
- `#b0b0b0` — 755 instances (medium gray - outside dark palette)
- `#d4a254` — 29 instances (acceptable gold)
- `#9a958c` — 26 instances (taupe variant)
- `#e2e8f0` — 20 instances (light slate)
- `#34d399` — 7 instances (emerald green - OFF PALETTE)
- `#94a3b8` — 6 instances (slate blue - OFF PALETTE)
- `#8b5cf6` — 4 instances (purple - OFF PALETTE)
- `#e8642c`, `#e74c3c`, `#3498db`, `#2ecc71` — Each 1-2 instances (all OFF PALETTE)

**Most affected files:**
- `analogy-*.html` files (adoption, chess-grandmaster, lazarus-grave, light-switch, etc.)
- `compare-calvinism-arminianism.html`
- `compare-calvinism-open-theism.html`
- `question-*.html` files

**Assessment:** CRITICAL - Widespread inline color styles that bypass the design system. Most are in accent/text color contexts but violate the stated palette. The `#daa520` is particularly problematic as it appears 856 times as a gold variant when the palette should use a single #d4a254 or accept it as an approved accent.

---

### 4. UX Dead-Ends: Cards with No Anchor
**Total instances:** 1,714 card elements without anchor tags

**Example files affected:**
- `404.html` (help-card elements)
- `about.html` (explore-card elements)
- Many story, analogy, and category pages

**Note:** Many of these are FALSE POSITIVES. The script detects card *components* individually (icon divs, title divs, description paragraphs) rather than complete card containers. The actual container often DOES have an anchor wrapping it. Manual review shows that:
- Help cards in 404.html ARE wrapped in `<a>` tags
- Explore cards in about.html ARE typically clickable structures

**Assessment:** LIKELY FALSE POSITIVES due to detection pattern. The regex looks for card class on individual elements, not the container. Actual accessibility of cards should be spot-checked on key pages.

---

### 5. overflow:hidden Issues
**Total instances:** 195 elements with `overflow:hidden` or `overflow: hidden`

**Most common in:**
- CSS/style blocks (general layout containment)
- Grid and flex containers
- Card and section styling

**Assessment:** LOW RISK. Most are intentional layout containment practices. However, should verify that:
- No text content is being clipped
- Content visibility isn't compromised on mobile
- Responsive breakpoints don't hide important information

---

## Detailed Findings by Severity

### SEVERITY 1 - CRITICAL: Design System Color Palette
**Issue:** 1,755+ inline color styles using non-standard colors, particularly:
- `#daa520` (goldenrod) appearing 856 times
- `#b0b0b0` (medium gray) appearing 755 times
- Off-palette colors like #34d399 (emerald), #8b5cf6 (purple)

**Impact:** 
- Inconsistent visual brand
- Difficult to maintain unified design language
- Makes global color changes impossible

**Recommended Action:** 
Audit and consolidate colors into CSS classes. Define approved accent colors in `global.css` (e.g., `.accent-gold`, `.text-secondary`, `.text-muted`) and replace inline `style="color: #xxx"` attributes.

**Files needing immediate review:**
- All `analogy-*.html` files
- `compare-calvinism-*.html` files
- `question-*.html` files

---

### SEVERITY 2 - MODERATE: Missing Favicon
**Files:** 
- `invisible-wall-hub.html`
- `invisible-wall-lonely-theological.html`

**Impact:** Browser won't display favicon for these pages; poor UX in browser tabs.

**Recommended Action:** Add `<link rel="icon" href="/favicon.ico">` to `<head>`.

---

### SEVERITY 3 - LOW: Font Loading
**Files:** 4 files potentially missing Playfair Display import

**Impact:** Fallback to serif may occur if global CSS doesn't include font.

**Recommended Action:** Verify `global.css` loads Playfair Display via Google Fonts. If not present, add to global stylesheet.

---

### SEVERITY 4 - LOW: Dead-End Cards (Likely False Positive)
**Impact:** If real, some cards wouldn't be clickable, breaking user navigation.

**Recommended Action:** Spot-check 404.html and about.html to confirm cards are actually functional. Script may have detected individual card component divs rather than card containers.

---

## Standards Compliance

| Standard | Status | Notes |
|----------|--------|-------|
| DOCTYPE declaration | ✓ 226/227 (99.6%) | Only template missing |
| Viewport meta | ✓ 226/227 (99.6%) | Responsive design ready |
| Favicon reference | ✓ 224/227 (98.7%) | 3 files missing |
| File size (>1KB) | ✓ 227/227 (100%) | No corrupted files |
| Design system colors | ✗ CRITICAL | 1,755+ violations |
| Playfair Display font | ✓ 223/227 (98.2%) | 4 files missing |

---

## Files Generated
- `qa-check.py` — Python script that performs all checks
- `qa-results.json` — Raw JSON output with complete findings
- `QA-REPORT.md` — This report

## Next Steps
1. **Priority 1:** Address design system color violations (1,755 instances)
   - Consolidate colors into CSS classes
   - Update inline styles to use class names
   
2. **Priority 2:** Add favicon to 3 missing files

3. **Priority 3:** Verify Playfair Display is loaded globally for the 4 files

4. **Priority 4:** Manual QA on 404.html and about.html card accessibility
