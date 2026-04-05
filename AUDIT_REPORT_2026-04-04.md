# ADOPTEDBYGRACE.NET FULL AUDIT REPORT
## Research Only — No Modifications Made
**Date:** 2026-04-04  
**Files Scanned:** 349 HTML pages

---

## BANNED ELEMENTS FOUND

### 1. EMAIL SIGNUP FORMS (CRITICAL)
**Violation:** Newsletter/email collection forms present  
**Location:** `/index.html`  
**Severity:** HIGH - These should have been eliminated per mandate

Hidden Netlify form declarations containing email inputs:
- Form name: `contact` — contains `<input type="email" name="email" />`
- Form name: `prayer-request` — contains `<input type="email" name="email" />`
- Form name: `testimony` — contains `<input type="email" name="email" />`

These forms allow email collection even though the mandate states: "We have NO email sending infrastructure (no Mailchimp, ConvertKit, SendGrid, etc.). Agents are BANNED from: Creating email signup forms."

---

### 2. BACK-TO-TOP BUTTON (MINOR)
**Violation:** Commented-out back-to-top button code  
**Location:** `/index.html`  
**Severity:** LOW - Button code removed but HTML comment remains

```html
<!-- Back to Top Button -->

<script src="/nav.js"></script>
```

The mandate states: "Agents are BANNED from: Adding back-to-top CSS (`.back-to-top`, `#back-to-top`) to any page or global.css"

The comment is innocuous but can be removed for cleanliness.

---

### 3. APOLOGETICS CATEGORY (CRITICAL)
**Violation:** Entire category exists with links and references throughout site  
**Severity:** HIGH - Mandate: "Agents are BANNED from creating an 'Apologetics' category, hub page, or nav entry"

**Scope:** 42+ pages link to apologetics articles, 40+ pages use Apologetics category labels

#### Files with Apologetics Links (to /apologetic-* pages):
- apologetic-babies.html (page itself)
- apologetic-definite-atonement.html (page itself)
- apologetic-perseverance.html (page itself)
- apologetic-unreached.html (page itself)
- question-john17.html
- question-acts.html
- systematic-anthropology.html
- start-here-assessment.html
- objection-responsibility.html (mentions)
- invisible-wall-lonely-theological.html
- systematic-prolegomena.html
- systematic-compatibilism.html
- philosophy-marriage-election.html
- devotional-adoption-papers.html
- start-here-phase4.html
- question-isaiah53.html
- demolition-1john2-2.html
- demolition-arminian-facts.html
- systematic-christology.html
- question-secure.html
- history-confessions-story.html
- history-apostolic.html
- compare-calvinism-arminianism.html
- question-sealed.html
- question-freewill.html
- question-external-internal-call.html
- psychology-why-we-resist.html
- systematic-election.html
- psychology-suppressing-truth.html
- question-john6.html
- psychology-emotional-vs-rational.html
- compare-calvinism-catholic-soteriology.html
- quiz.html (redirects to Demolition Zone)
- theologian-arminius.html
- devotional-in-christ.html
- scripture-tsunami.html
- resistance-last-idol.html
- ot-isaiah-servant.html
- objection-babies.html
- creed-canons-dort.html
- demolition-steel-man-arminianism.html
- secular-art-literature-reformed-truth.html

#### Files with Apologetics Category Labels:
40+ files include `<span class="related-article-cat">⚔ Apologetics</span>`

Examples:
- question-acts.html
- systematic-anthropology.html
- start-here-assessment.html
- systematic-prolegomena.html
- systematic-pneumatology.html
- etc.

#### Files with Apologetics Nav/Breadcrumb References:
- demolition-john12-32.html: `<a href="/demolition-hub">Apologetics</a>` (line 368)
- psychology-autonomy-illusion.html: `<a href="/demolition-hub">Apologetics</a>`
- philosophy-marriage-election.html: `<a href="/demolition-hub">Apologetics</a>`
- philosophy-mirror-you-refuse.html: `<a href="/demolition-hub">Apologetics</a>`
- psychology-why-we-resist.html: `<a href="/demolition-hub">Apologetics</a>`
- philosophy-resistance-is-proof.html: `<a href="/demolition-hub">Apologetics</a>`
- philosophy-self-deception.html: `<a href="/demolition-hub">Apologetics</a>`
- philosophy-exclusive-love.html: `<a href="/demolition-hub">Apologetics</a>`
- psychology-suppressing-truth.html (other mentions)

#### Filter/Category in explore-map.html:
- Line 264: `<button class="filter-btn" data-filter="apologetics">Apologetics...`
- Line 579: `apologetics: "Apologetics & Demolition"`

---

### 4. SOCIAL SHARE BUTTONS (CRITICAL)
**Violation:** Share buttons present on 80+ pages  
**Severity:** HIGH - Mandate: "Agents are BANNED from creating social media content of any kind"

**Scope:** 80 pages contain `class="share-buttons"` or `class="share-btn"`

#### Implementation:
- CSS class: `.share-buttons` and `.share-btn`
- Functionality: Copy-to-clipboard link sharing via `onclick="navigator.clipboard.writeText(location.href)..."`
- Label: "SHARE" (uppercase, monospace font)

#### Files with Share Buttons (80 total):
```
connections.html
demolition-1john2-2.html
demolition-1tim2-4.html
demolition-acts7-51.html
demolition-hebrews6-4-6.html
demolition-john12-32.html
demolition-orthodox-predestination.html
demolition-rev3-20.html
demolition-romans10-9.html
demolition-titus2-11.html
devotional-adoption-papers.html
devotional-dead-who-live.html
devotional-forever-loved.html
devotional-glory-of-divine-choice.html
devotional-love-before-the-world.html
devotional-love-letter-before-time.html
devotional-my-chains-fell-away.html
devotional-never-gives-up.html
devotional-not-my-will-but-joy.html
devotional-rescued-without-a-say.html
freedom.html
objection-author-of-sin.html
objection-why-command.html
ot-david.html
ot-israel-chosen.html
ot-jacob-esau.html
ot-jeremiah.html
ot-jonah.html
ot-joseph.html
ot-moses-pharaoh.html
ot-noah.html
psychology-cost-of-rejecting-grace.html
psychology-hostility-reaction.html
question-1john5-1.html
question-1peter1.html
question-2tim1-9.html
question-acts.html
question-boasting.html
question-chosen.html
question-dead-bury-dead.html
question-depravity.html
question-faithgift.html
question-foreknowledge.html
question-freewill.html
question-godwants.html
question-goldchain.html
question-irresistible.html
question-isaiah53.html
question-john10.html
question-john15.html
question-john6.html
question-matt11.html
question-newheart.html
question-perseverance.html
question-revelation13.html
question-romans9.html
question-sealed.html
question-sovereignty-logic.html
question-titus3.html
question-unfair.html
question-whosoever.html
secular-billion-decisions.html
story-surgeon-stone-heart.html
story-the-fish-who-chose-the-ocean.html
story-the-orphanage.html
systematic-anthropology.html
systematic-christology.html
systematic-compatibilism.html
systematic-covenant-theology.html
systematic-divine-decrees.html
systematic-ecclesiology.html
systematic-hamartiology.html
systematic-justification.html
systematic-ordo-salutis.html
systematic-pneumatology.html
systematic-prolegomena.html
systematic-theology-proper.html
theologian-augustine.html
theologian-calvin.html
theologian-edwards.html
theologian-luther.html
theologian-owen.html
theologian-spurgeon.html
analogy-chess-grandmaster.html
```

---

### 5. NEWSLETTER PAGES (INFORMATIONAL)
**Note:** These are content pages, NOT email signup forms

- `daily-newsletter.html` — Archive grid of newsletter content
- `newsletter-2026-04-04-granted-to-suffer.html` — Individual piece

These pages contain no email collection code and are pure content delivery. They do not violate the ban.

---

### 6. TERMINOLOGY: "DOCTRINE" vs "TRUTH" (MINOR)
**Violation:** One breadcrumb link uses "Doctrine" instead of "Truth"  
**Location:** `/demolition-john12-32.html`, line 368  
**Severity:** LOW

```html
<p><a href="/">Home</a> | <a href="/questions">Doctrine</a> | <a href="/demolition-hub">Apologetics</a> | <a href="/about">About</a> | <a href="/contact">Contact</a></p>
```

Should be: `<a href="/questions">Truth</a>`

**Note:** Many pages use "Doctrine" in section headers (e.g., "The Doctrine of Sin"). These are proper nouns/academic contexts and may be acceptable. The mandate specifically targets "section headers" so body headers like this may be grandfathered in, but the terminology shift is important: "doctrine" → "truth".

---

### 7. NO VIOLATIONS FOUND FOR:
✓ Newsletter signup popups or modals (properly eliminated)  
✓ Dedicated resources hub pages (properly eliminated)  
✓ Community/connect pages (properly eliminated)  
✓ Dedicated apologetics hub page (exists but not a violation per se—the category is the violation)  
✓ Social media content templates or SOCIAL-QUEUE.md (properly eliminated)  
✓ Email sending infrastructure references (Mailchimp, ConvertKit, SendGrid)

---

## SUMMARY

| Category | Severity | Count | Status |
|----------|----------|-------|--------|
| Email Forms | HIGH | 3 | Banned |
| Share Buttons | HIGH | 80 | Banned |
| Apologetics References | HIGH | 42+ linking pages | Banned |
| Apologetics Category Labels | HIGH | 40+ pages | Banned |
| Back-to-Top Comment | LOW | 1 | Cleanup only |
| Doctrine/Truth Terminology | LOW | 1 | Terminology only |

**TOTAL VIOLATIONS:** ~170+ instances across ~125 unique HTML files

---

## NOTES FOR REMEDIATION

1. **Email Forms (index.html):** Remove or repurpose the three hidden Netlify forms, or confirm they are not connected to any email service.

2. **Share Buttons (80 files):** These appear to be link-copying functionality (not social media posting). Determine if "sharing" = social media (banned) or just URL copying (acceptable).

3. **Apologetics Category:** The entire category system is woven throughout the site. Remediation would require:
   - Removing `/apologetic-*.html` page references
   - Removing Apologetics category labels from 40+ related article cards
   - Removing Apologetics filter from explore-map.html
   - Reclassifying 4 apologetics articles into "Questions" category (per mandate)

4. **Terminology:** Update breadcrumb in demolition-john12-32.html from "Doctrine" to "Truth".

