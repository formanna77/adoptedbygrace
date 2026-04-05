# AUDIT ACTION ITEMS - PRIORITY RANKING

## 🔴 CRITICAL (Must fix - blocks site functionality)

### 1. BROKEN INTERNAL LINKS (672 instances across 45 pages)

**Status:** These prevent users from navigating the site correctly.

**Example Problem:**
- `question-goldchain.html` links to `freedom.html` which doesn't exist
- `question-depravity.html` links to `systematic-hamartiology.html` which doesn't exist
- 20+ pages link to `questions.html` which doesn't exist

**Why It Matters:**
- Readers click a link, hit a 404, bounce away
- Violates the Wikipedia-style hyperlinking mandate
- Breaks the "web of interconnected content"

**Files Requiring Link Fixes:**
```
404.html, connections.html, demolition-1john2-2.html, demolition-1tim4-10.html,
demolition-arminian-facts.html, demolition-hub.html, demolition-orthodox-predestination.html,
demolition-rev3-20.html, demolition-titus2-11.html, devotional-adoption-papers.html,
devotional-cold-church.html, devotional-forever-loved.html, devotional-in-christ.html,
devotional-my-chains-fell-away.html, devotional-never-gives-up.html,
devotional-not-my-will-but-joy.html, devotional-rescued-without-a-say.html,
devotionals.html, freedom.html, history-augustine-pelagius.html, history-dort.html,
history-great-awakening.html, history-spurgeon-downgrade.html, history-timeline.html,
index.html, objection-author-of-sin.html, objection-why-command.html, ot-abel-cain.html,
ot-election.html, ot-joseph.html, question-1peter1.html, question-acts.html,
question-boasting.html, question-chosen.html, question-depravity.html, question-faithgift.html,
question-foreknowledge.html, question-freewill.html, question-godwants.html, question-goldchain.html,
question-irresistible.html, question-john10.html, question-john15.html, question-john17.html,
question-john6.html, question-matt11.html, question-newheart.html, question-perseverance.html,
question-romans9.html, question-sealed.html, question-unfair.html, question-whosoever.html,
questions.html, quranic.html, reformation-timeline.html, resources.html,
secular-algorithms.html, secular-biology.html, secular-consciousness.html,
secular-culture-war.html, secular-neuroscience.html, secular-philosophy.html,
secular-psychology.html, seculars.html, story-historical-judson.html,
story-historical-newton.html, story-historical-wesley.html, story-the-fish-who-chose-the-ocean.html,
story-thought-god-didnt-pick.html, story-thought-predestined.html, story-thought-you-are-his.html,
theology-depravity.html, topics.html
```

**Next Step:**
Run a link-checking tool to identify all target pages that don't exist. Then either:
- Create the missing pages, OR
- Update all links to point to existing pages

---

### 2. NEWSLETTER PAGES & EMAIL ELEMENTS (8 instances - PROHIBITED)

**Status:** These violate explicit mandate deleted 2026-03-29.

**Affected Pages:**
1. daily-newsletter.html
2. newsletter-2026-03-31-drowning-or-dead.html
3. newsletter-2026-03-31-the-fraud.html
4. newsletter-2026-03-31-where-did-your-faith-come-from.html
5. newsletter-2026-04-04-dear-friend.html
6. newsletter-2026-04-04-granted-to-suffer.html
7. newsletter-2026-04-04-the-seed-that-spoke.html
8. privacy.html

**Mandate (from CLAUDE.md):**
> "All newsletter signup forms, floating popups, email collection, and 'Subscribe' CTAs were deleted 2026-03-29. We have NO email sending infrastructure... Agents are BANNED from creating email signup forms, popups, or modals"

**Next Steps:**
1. Delete these files entirely, OR
2. If they contain valuable content, convert to regular articles and remove email signup elements

**Priority:** Delete immediately - these should not exist on the site.

---

## 🟠 MEDIUM (Should fix - affects user experience)

### 3. PLACEHOLDER LINKS (5 instances)

**Status:** Links with `href="#"` that don't navigate anywhere.

**Affected Files:**
- all-content.html - 1 placeholder link
- demolition-arminian-facts.html - 1 placeholder link
- objection-why-command.html - 1 placeholder link
- quiz.html - 1 placeholder link
- start-here-assessment.html - 1 placeholder link

**Example:**
```html
<a href="#">Learn more</a>  <!-- Doesn't go anywhere -->
```

**Fix Options:**
1. Replace `#` with actual link target: `href="/question-chosen.html"`
2. If intentional, use `onclick` handler instead
3. Convert to `<button>` if it triggers JavaScript behavior

**Next Step:**
Review each file and determine intended destination. Update links or convert to buttons.

---

### 4. DUPLICATE INCLUDES (2 instances)

**Status:** index.html includes global.css and nav.js twice

**File:** index.html

**Issue:**
```html
<link rel="stylesheet" href="/global.css"> <!-- First include -->
...
<link rel="stylesheet" href="/global.css"> <!-- DUPLICATE -->

<script src="/nav.js"></script> <!-- First include -->
...
<script src="/nav.js"></script> <!-- DUPLICATE -->
```

**Impact:**
- Resources loaded twice (wasted bandwidth)
- Potential CSS/JS conflicts
- Unnecessary asset parsing

**Fix:** Remove one occurrence of each duplicate.

---

### 5. INLINE STYLE BLOCKS (2 instances)

**Status:** Non-index.html pages have `<style>` blocks (violates architecture)

**Affected Files:**
1. objection-desire.html - has `<style>` block
2. psychology-hub.html - has `<style>` block

**Mandate (from CLAUDE.md):**
> "All nav CSS lives in `/global.css`. The ONLY page allowed to add inline nav CSS is `index.html`"

**Fix:**
1. Extract CSS from `<style>` blocks
2. Move to `/global.css` with appropriate selectors
3. Reference via existing `<link rel="stylesheet" href="/global.css">`

**Next Step:**
1. Read the `<style>` content from each file
2. Add to `/global.css`
3. Remove `<style>` blocks from pages

---

### 6. DOCTRINE INSTEAD OF TRUTH (1 instance)

**Status:** Footer header uses "Doctrine" instead of "Truth"

**File:** psychology-autonomy-illusion.html

**Issue:**
```html
<h4>Doctrine</h4>  <!-- WRONG -->
```

**Should be:**
```html
<h4>Truth</h4>  <!-- CORRECT -->
```

**Mandate (from CLAUDE.md):**
> "Generic 'doctrine' → 'truth'. The word 'doctrine' has academic, clinical connotations. The word 'truth' is personal, existential, and inescapable."

**Fix:**
Search/replace in footer section: "Doctrine" → "Truth"

---

## 🟢 LOW (Nice to have)

### 7. Missing Pages

**Status:** Multiple pages are referenced but don't exist.

**Examples:**
- `questions.html` - referenced 20+ times across site
- `questions-hub.html`
- `search.html`
- `start-here.html`
- Various category hub pages

**Decision Required:**
Should these pages exist? If yes, create them. If no, update all links to point elsewhere.

---

## SUMMARY TABLE

| Issue | Count | Severity | Action | Time Est. |
|-------|-------|----------|--------|-----------|
| Broken internal links | 672 | CRITICAL | Fix links or create pages | 4-8 hours |
| Newsletter elements | 8 | CRITICAL | Delete files | 15 min |
| Placeholder links | 5 | MEDIUM | Update href attributes | 30 min |
| Duplicate includes | 2 | MEDIUM | Remove duplicates | 5 min |
| Inline styles | 2 | MEDIUM | Move to global.css | 15 min |
| Doctrine→Truth | 1 | MEDIUM | Search/replace | 2 min |

**Total Time to Fix:** ~5-9 hours (mostly broken links)

---

## VERIFICATION CHECKLIST

After fixes, re-run audit with:
```bash
./AUDIT-FINAL.sh
```

Expected result:
- ✓ 0 broken internal links (was 672)
- ✓ 0 newsletter elements (was 8)
- ✓ 0 placeholder links (was 5)
- ✓ 0 duplicate includes (was 2)
- ✓ 0 inline styles (was 2)
- ✓ 0 "Doctrine" in footers (was 1)
- **✓ TOTAL ISSUES: 0** (Clean bill of health)

