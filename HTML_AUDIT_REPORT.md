# HTML Structural Integrity Audit Report
**Date:** 2026-04-04  
**Total HTML Files Scanned:** 310 (excluding node_modules, .netlify, _nav-template.html)  
**Files with Issues:** 42 (13.5%)

---

## SUMMARY

| Issue | Count | Files | Severity |
|-------|-------|-------|----------|
| Missing `<link rel="stylesheet" href="/global.css">` | 19 | Listed below | CRITICAL |
| Missing `<script src="/nav.js"></script>` | 1 | broken-mirror-sin-you-repeat.html | HIGH |
| Missing viewport meta tag | 1 | story-the-fish-who-chose-the-ocean.html | MEDIUM |
| Missing opening `<body>` tag (has closing `</body>`) | 21 | Listed below | CRITICAL |
| All other pages | 268 | ✓ Pass | GOOD |

---

## CRITICAL FINDINGS

### 1. Missing Global CSS Link (19 files)
These files lack the required stylesheet declaration in the `<head>`:

```
./apologetic-perseverance.html
./apologetic-unreached.html
./demolition-1john2-2.html
./demolition-ezekiel18-23.html
./demolition-john12-32.html
./devotional-not-my-will-but-joy.html
./devotional-rescued-without-a-say.html
./objection-author-of-sin.html
./objection-why-command.html
./ot-abel-cain.html
./ot-election.html
./ot-jeremiah.html
./ot-joseph.html
./question-2tim1-9.html
./question-john17.html
./question-revelation13.html
./question-titus3.html
./start-here-assessment.html
./theologian-whitefield.html
```

**Impact:** Pages load with NO styling. The site will be completely unstyled and unusable in the browser.

**Required Fix:** Add this line to the `<head>` section:
```html
<link rel="stylesheet" href="/global.css">
```

---

### 2. Missing Opening `<body>` Tag (21 files)
These files have a closing `</body>` tag at the end BUT NO opening `<body>` tag. The page content sits between `</head>` and `</body>` without a proper body container:

```
./apologetic-perseverance.html
./apologetic-unreached.html
./demolition-1john2-2.html
./demolition-ezekiel18-23.html
./demolition-john12-32.html
./devotional-not-my-will-but-joy.html
./devotional-rescued-without-a-say.html
./objection-author-of-sin.html
./objection-why-command.html
./ot-abel-cain.html
./ot-election.html
./ot-jeremiah.html
./ot-joseph.html
./psychology-autonomy-illusion.html
./question-2tim1-9.html
./question-john17.html
./question-revelation13.html
./question-titus3.html
./start-here-assessment.html
./story-the-dead-city.html
./theologian-whitefield.html
```

**Impact:** Malformed HTML. Browsers may render unpredictably. Semantic structure is broken.

**Required Fix:** Add opening `<body>` tag right after `</head>`:
```html
</head>
<body>
    <!-- page content follows -->
```

**Note:** Most of these files (19 of 21) ALSO lack the global.css link, suggesting they were created via a flawed template or incomplete copy-paste.

---

### 3. Missing nav.js Script (1 file)

```
./broken-mirror-sin-you-repeat.html
```

**Impact:** Mobile hamburger menu will not function. Search functionality may be impaired.

**Required Fix:** Add before closing `</body>`:
```html
<script src="/nav.js"></script>
</body>
```

---

### 4. Missing Viewport Meta Tag (1 file)

```
./story-the-fish-who-chose-the-ocean.html
```

**Impact:** Page will NOT be responsive on mobile devices. Will display at desktop zoom level on phones.

**Required Fix:** Add to `<head>`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## ROOT CAUSE ANALYSIS

**The 19 files missing global.css + opening `<body>` tag** suggest these pages were:
- Created or modified by an agent/tool that used an incomplete template
- Manually edited and saved without completing the HTML structure
- Generated without proper validation

These are likely **incomplete stub pages** that were saved to the repo before being finished. According to the CLAUDE.md mandate: *"NEVER save an HTML file that is incomplete. Every HTML file committed to the repo must have a complete, functioning page."*

---

## COMPLIANCE WITH MANDATE

From `/CLAUDE.md` — **NO STUB PAGES — MANDATORY FOR ALL AGENTS**:

> NEVER save an HTML file that is incomplete. Every HTML file committed to the repo must have a complete, functioning page: `<head>` with `<link rel="stylesheet" href="/global.css">`, `</head>`, `<body>`, the full nav from `/_nav-template.html`, actual article content, the full footer with grace warning, and `<script src="/nav.js"></script>`. **If you cannot finish a page in this session — do not create the file.** A half-written stub with only `<head>` metadata is worse than no file at all: it renders as a blank white page, other agents link to it, and visitors hit a dead end.

**All 21 files with missing `<body>` tag violate this mandate.** They appear to be incomplete pages that should not have been committed to the repo.

---

## PRIORITY FIXES (IN ORDER)

### IMMEDIATE (Blocking - page render failures):
1. **Add `<link rel="stylesheet" href="/global.css">` to 19 files**
   - Affects: apologetic-*, demolition-*, devotional-*, objection-*, ot-*, question-*, start-here-*, theologian-*

2. **Add opening `<body>` tag to 21 files**
   - Affects: Same 19 + psychology-autonomy-illusion.html, story-the-dead-city.html

### HIGH (Functional impact):
3. **Add `<script src="/nav.js"></script>` to broken-mirror-sin-you-repeat.html**

4. **Add viewport meta tag to story-the-fish-who-chose-the-ocean.html**

---

## RECOMMENDATIONS

1. **Immediate Action:** Fix all 42 files (see above)

2. **Process Improvement:** Implement automated HTML validation:
   - Before any commit, run HTMLHint on all .html files
   - Check for required tags: `<head>`, `<body>`, `<link rel="stylesheet" href="/global.css">`, `<script src="/nav.js"></script>`
   - Block commits that fail validation

3. **Review Standards:** Ensure all agents follow the "NO STUB PAGES" mandate
   - Pages must be complete and functional before being saved to repo
   - Template compliance should be verified before commit

4. **Backlog:** Consider whether the 21 incomplete pages should be:
   - Completed to meet mandate standards, OR
   - Removed from repo if they're truly stubs that will never be finished

---

## ALL 310 PAGES PASS BASIC STRUCTURE (Except Above Issues)

- ✓ All pages have proper `<!DOCTYPE html>` declaration
- ✓ All pages have proper `<html lang="en">` tag
- ✓ All pages have `<head>` section with metadata
- ✓ 268 pages (86.5%) are fully compliant with requirements
- ✓ Only 42 pages have specific missing elements (listed above)

**No node_modules, .netlify, or hidden directory files were flagged.**

