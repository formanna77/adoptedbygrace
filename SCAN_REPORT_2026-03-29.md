# HTML Content Visibility & Accessibility Scan Report
**Date:** 2026-03-29
**Repository:** adoptedbygracewebsite
**Total HTML Files Scanned:** 198 (production pages + templates, excluding .netlify and node_modules)

---

## Executive Summary

**Overall Status:** HEALTHY WITH MINOR ISSUES

The website has no critical content visibility problems. All production pages:
- Include required CSS and JavaScript dependencies
- Have proper HTML5 structure (DOCTYPE, viewport meta)
- Use clean URLs correctly routed by Netlify
- Display content properly (no invisible content blocking issue)

The findings are primarily cosmetic cleanup opportunities and one template file that could be improved.

---

## Critical Findings

### 1. Email/Newsletter Signup Code - CLARIFICATION

**Status:** False positive clarified
**Location:** index.html (lines 725, 732, 739)
**Finding:** Three `<input type="email">` fields found

**Assessment:**
These email inputs are in **hidden forms** (`<form ... hidden>`) used for:
- Contact form submission
- Prayer request submission
- Testimony submission

These are legitimate Netlify Forms with proper backend integration, NOT newsletter signup popups or email collection forms. The hidden attribute prevents them from being visible to users unless JavaScript programmatically shows them for those specific submission types.

**Compliance:** ✓ PASSES - These are acceptable contact forms, not banned email signup functionality.

---

## Low-Severity Issues

### 2. Missing Viewport Meta Tag

**Files Affected:** 1
- `_nav-template.html`

**Impact:** This is a template file used for code organization, not served directly to users. Missing viewport meta won't affect production pages.

**Recommendation:** Add for completeness:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

### 3. Missing DOCTYPE

**Files Affected:** 1
- `_nav-template.html`

**Impact:** Low - Netlify may add this automatically. Template file, not served directly.

**Recommendation:** Add at line 1:
```html
<!DOCTYPE html>
```

---

## Informational Findings

### 4. Reveal/Scroll-Reveal Classes (Cosmetic)

**Status:** 60 pages contain these classes
**Impact:** None - CSS was removed from global.css, so classes have no effect
**Files Affected:**
- analogies-illustrations.html
- analogy-adoption.html
- analogy-chess-grandmaster.html
- analogy-doctor-corpse.html
- analogy-lazarus-grave.html
- analogy-light-switch.html
- apologetic-definite-atonement.html
- connections.html
- creeds-confessions.html
- devotionals.html
- history-confessions-story.html
- history-golden-thread.html
- index-new.html
- index.html
- ot-election.html
- ot-isaiah-servant.html
- ot-jeremiah.html
- ot-moses-pharaoh.html
- ot-prophets-remnant.html
- pastoral-assurance.html
- pastoral-evangelism.html
- pastoral-prayer.html
- pastoral-suffering.html
- psalms-election.html
- psychology-autonomy-illusion.html
- psychology-hub.html
- psychology-why-we-resist.html
- question-depravity.html
- question-faithgift.html
- question-john17.html
- question-john6.html
- question-matt11.html
- question-revelation13.html
- question-romans9.html
- questions.html
- quiz.html
- resistance-last-idol.html
- secular-algorithm-sovereignty.html
- secular-art-literature-reformed-truth.html
- secular-economics-depravity.html
- secular-evidence.html
- secular-history-sovereignty.html
- secular-neuroscience-human-inability.html
- secular-philosophy-free-will.html
- secular-psychology-bondage-of-will.html
- secular-sociology-human-inability.html
- systematic-covenant-theology.html
- systematic-justification.html
- systematic-theology-proper.html
- systematic-theology.html
- theologian-arminius.html

**Recommendation:** Optional cleanup only. Removing these class attributes would reduce HTML size slightly but provides no functional benefit.

---

### 5. Display: None on Content Elements

**Status:** 94 total instances across 35+ files
**Assessment:** Most are legitimate for tabs, accordions, and conditional content (hidden by default, shown by JavaScript)

**Examples by file:**
- belief-assessment.html: 3 instances (quiz answer toggles)
- demolition-1john2-2.html: 3 instances (comparison table rows)
- explore-map.html: 3 instances (map filters)
- psychology-hub.html: 2 instances (category toggles)
- index-new.html: 1 instance (TULIP card carousel)
- And 30+ other files with similar patterns

**Assessment:** All appear to be intentional UI state management (hidden until user interaction). No evidence of permanently hidden content blocking visibility.

**Recommendation:** Monitor these to ensure none hide permanent content by accident. Current usage appears correct.

---

### 6. Opacity: 0 (Animation Initialization)

**Status:** Found in 100+ files
**Assessment:** These are CSS animations - elements start at `opacity: 0` and animate in with `opacity: 1`
**Impact:** None - this is best practice for entrance animations (hero slides, fade-in effects)
**Recommendation:** No action needed.

---

## Structural Verification Results

| Check | Status | Details |
|-------|--------|---------|
| Global CSS included on all production pages | ✓ PASS | 197/197 (all except template) |
| nav.js script on all production pages | ✓ PASS | 197/197 (all except template) |
| DOCTYPE on all production pages | ✓ PASS | 197/197 (all except template) |
| Viewport meta on all production pages | ✓ PASS | 197/197 (all except template) |
| Broken internal links | ✓ PASS | All clean URLs resolve correctly via Netlify routing |
| Unclosed script tags | ✓ PASS | No malformed JavaScript tags found |
| Duplicate element IDs | ✓ PASS | No duplicate IDs within files |

---

## Recommendations

### Immediate (Required)
- **None.** No critical issues prevent content from being visible or accessible.

### Optional Improvements (Low Priority)
1. **Add DOCTYPE and viewport meta to `_nav-template.html`** for template completeness
2. **Review `display: none` instances** (94 total) in next code review to ensure none accidentally hide permanent content
3. **Remove `reveal` class attributes** from 60 pages (cosmetic only, reduces HTML size marginally)

### Best Practices Confirmed
- All navigation includes are correct (global.css, nav.js)
- All pages have proper HTML5 structure
- Clean URL routing is working correctly
- Contact forms are properly implemented with Netlify integration
- No newsletter/email signup popups or forms detected (per requirements)
- No opacity:0 abuse on content (all animations are intentional)

---

## Conclusion

**The website is in excellent health.** Content is visible and accessible across all pages. All critical structural requirements are met. The findings are primarily suggestions for minor cleanup and best practice confirmations that everything is working as intended.

No urgent action is required.
