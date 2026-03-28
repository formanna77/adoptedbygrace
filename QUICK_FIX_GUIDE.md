# Quick Fix Guide - adoptedbygrace.net

## Immediate Action Items (Critical Path to Launch)

### MUST FIX BEFORE LAUNCH

#### 1. Remove `.html` from All Internal Links (20+ instances)
**Time: 30 minutes**

Search and replace in ALL HTML files:
```bash
# Pattern to search: href="/[^"]*\.html"
# Replace examples:
href="/community.html"     → href="/community"
href="/devotional-*.html"   → href="/devotional-*" (remove .html)
href="/demolition-*.html"   → href="/demolition-*" (remove .html)
```

Files to update (16+ with broken links):
- history-today.html:735
- pastoral-assurance.html:547
- systematic-ecclesiology.html:950
- compare-calvinism-molinism.html (multiple lines)
- compare-calvinism-arminianism.html (multiple lines)
- compare-monergism-synergism.html (multiple lines)
- All demolition-*.html files with cross-links
- All devotional-*.html files with cross-links

#### 2. Fix /contact → /connect (2 files)
**Time: 2 minutes**

```bash
# Search: href="/contact"
# Replace with: href="/connect"
```

Files:
- scripture-tsunami.html:541
- story-the-dead-city.html:593

#### 3. Implement Share Button Functionality
**Time: 1-2 hours**

**Files needing fixes:**
- question-2tim1-9.html (lines 1211-1213)
- question-titus3.html (lines 1211-1213)
- demolition-arminian-facts.html (lines 1004-1005)
- objection-why-command.html (lines 1113-1115)
- quiz.html (line 401)

**Option A - Use proper buttons:**
```html
<!-- BEFORE -->
<a href="#" class="share-btn">Share on X</a>

<!-- AFTER -->
<button class="share-btn" onclick="shareToX(); return false;">Share on X</button>
```

**Option B - Add missing JavaScript functions:**
Create share function stub if missing:
```javascript
function shareToX() {
    const text = "Check this out: " + document.title;
    const url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(window.location.href);
    window.open(url, '_blank', 'width=600,height=300');
}

function shareToFacebook() {
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(window.location.href), '_blank', 'width=600,height=300');
}

function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
}
```

#### 4. Fix Cross-Reference Links (8 instances in systematic pages)
**Time: 30 minutes**

**Files:**
- systematic-compatibilism.html (lines 1214, 1219, 1224, 1229, 1234)
- systematic-covenant-theology.html (lines 835, 1345-1348)
- systematic-divine-decrees.html (lines 804-808)

**For page cross-references:**
```html
<!-- BEFORE -->
<a href="#" class="cross-ref">Divine Decrees</a>

<!-- AFTER (link to actual page) -->
<a href="/systematic-divine-decrees" class="cross-ref">Divine Decrees</a>
```

**For resource links:**
```html
<!-- BEFORE -->
<li><a href="#">Westminster Confession of Faith, Chapter 3</a></li>

<!-- AFTER (option 1: remove link) -->
<li>Westminster Confession of Faith, Chapter 3</li>

<!-- AFTER (option 2: add real URL if you have it) -->
<li><a href="https://www.reformed.org/documents/wcf_001.html" target="_blank">Westminster Confession of Faith, Chapter 3</a></li>
```

---

### SHOULD FIX BEFORE LAUNCH

#### 5. Increase Touch Target Sizes
**Time: 15 minutes**

Update `global.css`:

```css
/* Share buttons - currently too small (36px) */
.share-btn {
    padding: 0.8rem 1.5rem;  /* was: 0.6rem 1rem */
    min-height: 44px;        /* new: ensure 44px minimum */
    display: inline-flex;
    align-items: center;
}

/* Hamburger - barely acceptable (40px, need 44px) */
.hamburger {
    width: 44px;
    height: 44px;
    padding: 0.75rem;         /* was: 0.5rem */
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Footer links - too small (18px) */
.footer-section a {
    display: inline-block;
    padding: 0.5rem 0.75rem;  /* new: add padding */
    min-height: 44px;         /* new: ensure minimum height */
}
```

#### 6. Fix Z-Index Hierarchy
**Time: 5 minutes**

Update `global.css`:

```css
/* BEFORE */
.skip-to-content { z-index: 10000; }

/* AFTER */
.skip-to-content { z-index: 1002; }  /* Just above hamburger (1001) */
```

#### 7. Verify CSS Path
**Time: 5 minutes**

All pages link to `/global.css`. This should work IF:
- Your server is configured with clean URLs (routing `/global.css` to `/global.css`)
- OR your web server root is serving the CSS file

To test: Open dev tools → Network tab → check if `/global.css` returns 200 status

If broken, change links in one file to test:
```html
<!-- Test option 1: relative path -->
<link rel="stylesheet" href="./global.css">

<!-- Test option 2: from root -->
<link rel="stylesheet" href="/global.css">
```

---

## Nice-to-Have Improvements

- Add missing ARIA labels to icon-only buttons (back-to-top, etc.)
- Convert inline styles in "Continue Your Journey" section to CSS classes
- Add srcset attributes to images for responsive image loading
- Verify all JavaScript functions referenced in onclick handlers exist

---

## Testing Checklist

After fixes, test:

- [ ] All nav dropdown links work
- [ ] All internal links (without .html) work
- [ ] Share buttons work on mobile
- [ ] Touch targets are easily tappable (44x44px minimum)
- [ ] CSS loads properly (site is styled)
- [ ] No 404 errors for internal pages
- [ ] Footer links work
- [ ] Hamburger menu opens/closes on mobile
- [ ] All cross-reference links work or display as text
- [ ] No console errors

---

## Priority by Time Investment

**Quick Wins (5-10 min each):**
1. Fix /contact → /connect (2 min)
2. Verify CSS loads (5 min)
3. Fix skip-to-content z-index (2 min)

**Medium Effort (30 min each):**
4. Remove .html extensions from links (30 min with find/replace)
5. Implement share buttons (30 min)
6. Fix touch target sizes (15 min)
7. Fix cross-references (30 min)

**Total Critical Path: ~2 hours**

