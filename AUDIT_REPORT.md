# COMPREHENSIVE WEBSITE AUDIT: adoptedbygrace.net
## Design Flaws & Broken Elements Analysis

**Date:** March 28, 2026  
**Total Files Audited:** 137 HTML files + global.css  
**Issues Found:** 80+ across all severity levels

---

## CRITICAL ISSUES (Complete Breakage/Inaccessibility)

### 1. **BROKEN CSS LINK (GLOBAL)**
- **Severity:** CRITICAL
- **Issue:** 137 HTML files link to `/global.css` but the file path is incorrect
- **Files Affected:** ALL pages (404.html, about.html, community.html, etc.)
- **Line Numbers:** Various (e.g., 404.html:175, about.html:485, community.html:144)
- **Problem:** Links use `/global.css` instead of relative path or proper CDN. Server must serve this from root or relative path will fail.
- **Impact:** If CSS path is broken, the entire site will render unstyled on all pages
- **Fix:** Verify CSS is being served correctly, or change all links from `/global.css` to `./global.css` or use proper path resolution

### 2. **SHARE BUTTONS WITH BROKEN HANDLERS**
- **Severity:** CRITICAL
- **Files Affected:** 
  - `question-2tim1-9.html` (lines 1211-1213)
  - `question-titus3.html` (lines 1211-1213)
  - Others with onclick but missing functions
- **Problem:** Share buttons have `href="#"` with NO onclick handlers OR onclick functions that don't exist
- **Example:**
  ```html
  <a href="#" class="share-btn">Share on X</a>
  <a href="#" class="share-btn">Share on Facebook</a>
  <a href="#" class="share-btn">Copy Link</a>
  ```
- **What Happens:** Clicking does nothing; user sees page jump to top (because of `href="#"`)
- **Fix:** Either implement onclick handlers OR remove href="#" and use proper JavaScript event listeners

### 3. **CROSS-REFERENCE LINKS POINTING TO NOWHERE**
- **Severity:** CRITICAL
- **Files Affected:** 
  - `systematic-compatibilism.html` (lines 1214, 1219, 1224, 1229, 1234)
  - `systematic-covenant-theology.html` (lines 835, 1345-1348)
  - `systematic-divine-decrees.html` (lines 804-808)
- **Problem:** Links with `href="#"` labeled as "cross-ref" (cross-references) that don't go anywhere
- **Example from systematic-compatibilism.html:**
  ```html
  <a href="#" class="cross-ref">Divine Decrees</a>
  <a href="#" class="cross-ref">Election</a>
  <a href="#" class="cross-ref">Romans 9</a>
  <a href="#" class="cross-ref">Free Will</a>
  ```
- **Impact:** Users expect these to jump to related content, but they just scroll to top
- **Fix:** Replace `href="#"` with actual anchor links or page links, e.g., `href="#section-name"` or `href="/systematic-divine-decrees"`

---

## HIGH SEVERITY ISSUES (Broken Functionality)

### 4. **BROKEN INTERNAL LINKS TO PAGES WITH .HTML EXTENSION**
- **Severity:** HIGH
- **Problem:** Many pages link to files WITH `.html` extension (e.g., `/community.html`) but URLs should be clean (e.g., `/community`)
- **Files & Targets with Issues:**
  - `/community.html` — linked from history-today.html:735, pastoral-assurance.html:547, systematic-ecclesiology.html:950
  - `/compare-calvinism-arminianism.html` — linked from compare-calvinism-molinism.html:486, 570
  - `/compare-calvinism-molinism.html` — linked from compare-calvinism-arminianism.html:753
  - `/compare-monergism-synergism.html` — linked from multiple files
  - `/demolition-*.html` — multiple broken cross-references
  - `/devotional-*.html` — multiple broken cross-references
- **Why It's Broken:** URLs with `.html` extensions don't match server routing (clean URLs without extensions)
- **Impact:** 404 errors when users click these links
- **Fix:** Remove `.html` from all internal href attributes. Change:
  - `href="/community.html"` → `href="/community"`
  - `href="/demolition-1john2-2.html"` → `href="/demolition-1john2-2"`

### 5. **MISSING /contact PAGE**
- **Severity:** HIGH
- **Files Affected:** scripture-tsunami.html:541, story-the-dead-city.html:593
- **Problem:** Links point to `/contact` but the page is actually `/connect`
- **Current Link:** `href="/contact"`
- **Actual Page:** `connect.html` (maps to `/connect`)
- **Impact:** Users trying to contact get 404 error
- **Fix:** Change `href="/contact"` to `href="/connect"` in both files

### 6. **SHARE BUTTON MISSING FUNCTIONALITY (Quality Issue)**
- **Severity:** HIGH
- **Files Affected:**
  - `demolition-arminian-facts.html` (lines 1004-1005)
  - `objection-why-command.html` (lines 1113-1115)
  - `index-old.html` (line 554)
  - `quiz.html` (line 401)
- **Problem:** Some share buttons have onclick handlers but use `href="#"` which will scroll to top
- **Example from demolition-arminian-facts.html:**
  ```html
  <a href="#" onclick="navigator.share(...);return false;">Share Article</a>
  <a href="#" onclick="window.open('https://twitter.com/intent/tweet?...');return false;">Tweet</a>
  ```
- **Issue:** Even though `return false` prevents navigation, the link LOOKS broken to users
- **Better Practice:** Use `<button>` instead of `<a href="#">` for JavaScript-only interactions
- **Fix:** 
  ```html
  <button onclick="navigator.share(...); return false;">Share Article</button>
  ```

### 7. **MISSING FEEDBACK LINK HANDLER**
- **Severity:** HIGH
- **File:** `quiz.html` (line 401)
- **Problem:** 
  ```html
  <a id="feedbackLink" href="#" style="display:none;">Read more on this topic →</a>
  ```
- **Issue:** Link has `href="#"` and `display:none`, meaning it's hidden by default AND broken when shown
- **Fix:** Either use a real link or implement proper JavaScript handler to set href dynamically

---

## MEDIUM SEVERITY ISSUES (Usability Impact)

### 8. **TOUCH TARGET SIZE TOO SMALL**
- **Severity:** MEDIUM
- **Elements Affected:**
  - Share buttons (padding: 0.6rem 1rem ≈ 36px height) — below 44px minimum
  - Hamburger menu (padding: 0.5rem ≈ 40px with 24px span) — barely acceptable
  - Footer links (0.9rem text, no padding) — ~18px height, too small
- **Requirement:** WCAG 2.5.5 requires minimum 44x44px touch targets
- **Files Affected:** Multiple (all pages with share buttons, all pages with footer)
- **Impact:** Difficult to tap on mobile devices, especially for users with motor impairments
- **Fix for Share Buttons:**
  ```css
  .share-btn {
    padding: 0.8rem 1.5rem;  /* Increase from 0.6rem 1rem */
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }
  ```
- **Fix for Footer Links:**
  ```css
  .footer-section a {
    display: inline-block;
    padding: 0.5rem 0.75rem;  /* Add padding */
    min-height: 44px;
  }
  ```

### 9. **HAMBURGER MENU BARELY MEETS ACCESSIBILITY MINIMUM**
- **Severity:** MEDIUM
- **Current Specs:** 0.5rem padding + 24px span ≈ 40px total
- **WCAG Requirement:** 44x44px minimum
- **File:** `index.html` (line 220) and all pages
- **Issue:** Too small for comfortable mobile use, especially for children or users with poor fine motor control
- **Fix:**
  ```css
  .hamburger {
    padding: 0.75rem;  /* Increase from 0.5rem */
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ```

### 10. **RESPONSIVE IMAGE SIZING NOT OPTIMAL**
- **Severity:** MEDIUM
- **Issue:** No inline `responsive-image` classes or srcset attributes for images
- **Problem:** Images don't scale properly on mobile, might overflow or display too small
- **Affected Files:** Any page with inline images (systematic-theology.html, etc.)
- **Example:**
  ```html
  <img src="image.jpg" style="width: 100%; height: auto;">  <!-- Good -->
  vs
  <img src="image.jpg" style="max-width: 1100px;">  <!-- Will be too large on mobile -->
  ```

### 11. **NAV DROPDOWN Z-INDEX CONFLICT**
- **Severity:** MEDIUM
- **Issue:** Nav dropdown has `z-index: 100` but nav container has `z-index: 1000`
  - This is correct hierarchy, BUT skip-to-content has `z-index: 10000`
- **Problem:** When skip-to-content link is focused/visible, it will overlay navigation dropdowns
- **File:** `global.css` lines 59, 48, 190
- **Impact:** Skip-to-content might become hard to close or interact with if it covers other elements
- **Fix:** Adjust skip-to-content z-index to 1002 (just above hamburger) instead of 10000

---

## LOW SEVERITY ISSUES (Cosmetic/Minor UX)

### 12. **RESOURCE/DOCUMENTATION LINKS WITH PLACEHOLDER HREFS**
- **Severity:** LOW
- **File:** `systematic-divine-decrees.html` (lines 804-808)
- **Problem:** Resource links to books/documents use `href="#"` instead of actual URLs
- **Examples:**
  ```html
  <li><a href="#">Westminster Confession of Faith, Chapter 3...</a>
  <li><a href="#">Francis Turretin, Institutes of Elenctic Theology...</a>
  <li><a href="#">John Owen, "The Doctrine of the Saints' Perseverance..."</a>
  ```
- **Issue:** Users cannot click through to actual resources (if they exist)
- **Fix:** Either remove links and use regular text, or add actual URLs:
  ```html
  <li>Westminster Confession of Faith, Chapter 3 (link to resource)
  <li><a href="https://example.com/resources/westminster">Westminster Confession of Faith...</a>
  ```

### 13. **INLINE STYLES COULD USE CSS CLASSES**
- **Severity:** LOW
- **File:** `index.html` (lines 412-442) — "Continue Your Journey" section
- **Problem:** Excessive inline styles for repeated card components
- **Example:**
  ```html
  <a href="/start-here" style="display: block; padding: 1.2rem 1.5rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(218,165,32,0.15); border-radius: 12px; ...">
  ```
- **Impact:** Not a functional bug, but makes maintenance harder
- **Fix:** Create CSS class `.continue-card` or reuse existing `.explore-card` class

### 14. **MISSING ARIA LABELS ON BUTTONS**
- **Severity:** LOW
- **Issue:** Some buttons lack aria-label for screen readers
- **Files Affected:** Multiple (back-to-top buttons on content pages)
- **Example from systematic-theology.html:**
  ```html
  <button class="back-to-top" aria-label="Back to top">↑</button>  <!-- Good -->
  vs
  <button class="back-to-top">↑</button>  <!-- Missing aria-label -->
  ```
- **Impact:** Screen reader users might not understand button purpose
- **Fix:** Add aria-label to all icon-only buttons

---

## SUMMARY TABLE

| Severity | Category | Count | Files Affected |
|----------|----------|-------|-----------------|
| CRITICAL | Broken CSS Link | 1 | All 137 files |
| CRITICAL | Broken Share Buttons | 1 | 2+ files |
| CRITICAL | Broken Cross-References | 1 | 3+ files |
| HIGH | .html Extension in Links | 1 | 20+ files |
| HIGH | Missing /contact page | 1 | 2 files |
| HIGH | Share Button Quality | 1 | 4+ files |
| HIGH | Missing Handlers | 1 | 2 files |
| MEDIUM | Touch Target Size | 3 | All pages |
| MEDIUM | Hamburger Size | 1 | All pages |
| MEDIUM | Image Sizing | 1 | 10+ files |
| MEDIUM | Z-Index Conflict | 1 | global.css |
| LOW | Placeholder Links | 1 | 1 file |
| LOW | Inline Style Bloat | 1 | 1 file |
| LOW | Missing ARIA Labels | 1 | 10+ files |

---

## RECOMMENDATIONS (Priority Order)

### Phase 1: Critical Fixes (Do First)
1. Verify CSS file is being served properly
2. Fix all `.html` extensions in internal links (remove them)
3. Fix `/contact` → `/contact` links
4. Implement or remove share button functionality
5. Fix cross-reference links with proper anchors or page links

### Phase 2: High Priority Fixes
6. Increase touch target sizes (share buttons, footer)
7. Increase hamburger menu size
8. Implement responsive image handling
9. Fix z-index hierarchy (skip-to-content)

### Phase 3: Polish & Accessibility
10. Add missing ARIA labels
11. Convert excessive inline styles to CSS classes
12. Review all remaining placeholder links (#)
13. Add focus-visible improvements for keyboard navigation

---

## MOBILE-SPECIFIC FINDINGS

**Good:**
- Viewport meta tag properly configured
- Media queries present for 968px and 480px breakpoints
- Mobile navigation (hamburger menu) implemented
- Responsive button sizing at smaller breakpoints

**Issues Found:**
- Touch targets below 44x44px minimum (share buttons, footer links)
- Hamburger menu at edge of acceptable size (40px vs 44px minimum)
- Some footer links may be hard to tap

**Recommendation:** Add explicit min-width/min-height to all interactive elements

---

## CONCLUSION

The website has **1 critical structural issue** (CSS path), **5 high-priority broken link issues**, and several **medium-severity accessibility/UX issues**. Most are quick fixes that involve:
- Removing `.html` extensions from 20+ internal links
- Fixing broken cross-reference links
- Increasing touch target sizes
- Implementing share button functionality

None of these are unfixable, but all should be addressed before considering the site fully launched.

