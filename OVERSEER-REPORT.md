# OVERSEER REPORT — 2026-04-05 (Session 3)

## EXECUTIVE SUMMARY

**Third Overseer audit** of adoptedbygrace.net. The site now contains **371 HTML pages** (up from 326 earlier today). Diamond Week Day 1 is producing record output — 53 new pages in 24 hours. Traffic is strong at 14,129 requests/week (+6.6% WoW).

**Site Health Score: 7.5/10** (down from 7.8 — see below for why)

The score drops not because the site got worse, but because this audit reveals a **systemic orphan page crisis** that was masked by the previous report's narrower scan. The validator now flags **31 orphan pages** not linked from any hub. Additionally, **13 demolition pages** lack any healing/devotional links (a Two Arms failure), and **5 apologetic-* files** still haven't been renamed despite being flagged in two previous audits.

### What Improved Since Last Audit (Session 2, earlier today)
- **Zero broken internal links** — structural integrity is sound
- **Critical pages are fortified** — all 7 crown jewel pages have 46-59 internal links each and full structural compliance
- **Evolution Journal is active** — 48 entries today, 126 in last 2 days (excellent fleet learning)
- **No inline styles on hub pages** — unified design mandate holding
- **Hub stats bars present on all hubs** (except theologians.html and history-timeline.html which use legacy designs)

### What Got Worse or Persists
- **31 orphan pages** — pages that exist but are NOT linked from their hub. Visitors can't discover them.
- **13 demolition pages** have ZERO links to devotional/healing content — Two Arms violation
- **5 apologetic-* files** still exist (3rd audit flagging this)
- **~93 article pages** still missing the `article-body` wrapper class
- **~20 pages** missing `footer-grace-warning`
- **Non-NIV translations** found in ~15 pages (ESV most common)

---

## PHASE-BY-PHASE FINDINGS

### PHASE 1: TERMINOLOGY
- **Generic "doctrine" misuse:** ~11 files contain solo "doctrine" outside proper context. Most are acceptable (terms.html legal text, essays.html describing the 5-point argument, comparative pages). **3 actionable instances:**
  - `demolition-matthew-23-37.html` line 323: "linchpin of election doctrine" → should be "linchpin of this truth"
  - `story-the-person-who-chose-god.html` line 249: "most important doctrine in Scripture" → "most important truth in Scripture"
  - `terms.html` line 115: "doctrine of divine election" → "truth of divine election" (or acceptable as legal language)
- **"Doctrine of election" → "doctrines of grace":** Found in `compare-every-decision-point.html` line 426, `question-does-god-choose-who-goes-to-heaven.html` (2 instances). **4 actionable instances remain** (down from 30 at first audit).
- **Tradition-first language (Calvinism/Reformed/TULIP):** **696 total instances** across the site. The vast majority are in legitimate contexts (comparison pages titled "Calvinism vs X", meta keywords, theologian bios, belief assessment). **~50-80 are in prose where Scripture-first framing would be stronger.** This is a long-tail improvement, not an emergency.

### PHASE 2: CROWN JEWEL DEFENSE
- **Demolition pages missing healing links: 13 pages** (CRITICAL Two Arms violation)
  1. demolition-1cor15-22.html
  2. demolition-1tim2-4.html
  3. demolition-2peter2-1.html
  4. demolition-2peter3-9.html
  5. demolition-acts7-51.html
  6. demolition-arminian-facts.html
  7. demolition-hebrews6-4-6.html
  8. demolition-john3-16.html
  9. demolition-matt23-37.html
  10. demolition-prevenient-grace.html
  11. demolition-romans10-9.html
  12. demolition-titus2-11.html
  13. demolition-hub.html (the hub page itself has no healing pathway)
- **Objection pages missing healing links: 1 page** — objection-author-of-sin.html
- **Crown Jewel pages themselves: EXCELLENT** — All 7 critical pages (faith-origin, faith-gift, drowning-man, cost-of-rejecting, never-gives-up, faith-choice, faith-origin-test) have 46-59 links each, grace warnings, and proper structure.

### PHASE 3: TWO ARMS BALANCE
- **Demolition pages:** 30
- **Objection pages:** 18
- **Total "left arm" (tear down):** 48
- **Devotional pages:** 21
- **Healing pages:** 36
- **Total "right arm" (catch them):** 57
- **Ratio: Left 48 : Right 57** — Well-balanced at the page-count level. **However**, the critical gap is not in page counts but in CROSS-LINKING. 13 demolition pages have zero healing links, meaning readers who land there hit a dead end with no path to comfort.

### PHASE 4: ARTICLE STRUCTURE
- **Pages missing `article-body` wrapper:** ~93 (many are legacy pages from before the mandate)
- **Pages missing `footer-grace-warning`:** ~20 pages including:
  - secular-ai-determinism.html, psychology-autonomy-illusion.html, compare-calvinism-open-theism.html
  - analogy-light-switch.html, question-boasting.html, belief-assessment.html
  - theologian-luther.html, psychology-system-justification.html
  - story-historical-luther-storm.html, story-the-fish-who-chose-the-ocean.html
  - question-john17.html, question-acts.html, open-wound-miscarriage.html
  - question-acts4.html, question-bible-says-sick.html, invisible-wall-family.html
  - story-thought-the-day-you-chose-again.html, start-here-phase5.html, topics.html
- **Inline `<style>` violations:** Only 404.html (acceptable)

### PHASE 5: HUB PAGE COMPLIANCE
- **Hub pages using unified `.hub-card`:** 13 of 15 hubs ✅
- **Hubs NOT using unified design:**
  - `theologians.html` — no hub-card, no hub-stats (fully legacy)
  - `history-timeline.html` — uses timeline-card, no hub-stats (fully legacy)
- **Legacy card classes on otherwise-compliant hubs:** `related-article-card` and `journey-card` in Related Reading sections (acceptable — these aren't the main card grid)
- **Inline styles on hubs:** 0 ✅

### PHASE 6: INTERNAL LINKING
- **Sampled pages:** Most recently created/enhanced pages have 29-65 links (excellent)
- **Legacy pages with 0 internal links:** 30+ pages including psychology-autonomy-illusion, compare-calvinism-open-theism, theologian-luther, question-parables, ot-abraham, ot-job, analogy-lazarus-grave, and many others
- **Cross-category linking:** Strong on new pages, weak on legacy. Weaver's Diamond Week mission is critical.

### PHASE 7: TRANSLATION COMPLIANCE
- **ESV citations:** ~12 instances across 5 pages. **Priority conversion:** `objection-why-not-save-everyone.html` (8 ESV citations, high-traffic page)
- **NASB citations:** ~5 instances across 4 pages
- **KJV citations:** ~5 instances across 3 pages (some acceptable in Puritan historical context)
- **NKJV:** 1 instance in systematic-hamartiology.html
- **LSB:** 0 ✅
- **Total conversions needed:** ~18 instances across ~10 pages

### PHASE 8: LINK VALIDATION
- **Broken internal links:** 0 ✅
- **Orphan pages:** 31 (CRITICAL — see full list above)
- **Content container warning:** objection-why-command.html (persistent)
- **CSS integrity:** ✅

### PHASE 9: EVOLUTION JOURNAL
- **Entries today:** 48 (EXCELLENT)
- **Entries last 2 days:** 126 (EXCELLENT)
- **Quality:** Rich with craft, theological, and technique discoveries
- **Assessment: EXCELLENT**

### PHASE 10: CRITICAL PAGES
- **All 7 crown jewel pages:** STRONG (46-59 links each, proper structure)
- **5 apologetic-* files still exist** (3rd consecutive audit flagging)

### PHASE 11: ANALYTICS
- **Top performer:** psychology-cost-of-rejecting-grace (63 req/wk)
- **Psychology category:** 19.3 avg/page (highest engagement)
- **Healing:** +210% growth, 5.2 avg/page
- **Top traffic page needing work:** objection-why-command.html (48 req/wk, missing article-body)

---

## CRITICAL ACTIONS — PRIORITY ORDER

### 🔴 CRITICAL (Do First)
1. **Wire 31 orphan pages into their hubs.** Priority: 10 demolition → demolition-hub, 5 devotional → devotionals, 5 OT → ot-hub.
2. **Add healing links to 13 demolition pages.** Every demolition MUST link to at least 1 devotional + 1 healing page.
3. **Convert 8 ESV citations in objection-why-not-save-everyone.html to NIV.**

### 🟡 HIGH
4. **Rename 5 apologetic-* files to question-* prefix.**
5. **Add footer-grace-warning to ~20 pages missing it.**
6. **Fix objection-why-command.html article-body wrapper.**

### 🟢 MEDIUM (Diamond Week Queue)
7. **Weaver: Process 30+ zero-link legacy pages** — add 8-12 internal links each.
8. **Guardian: Add article-body wrapper to ~93 legacy pages.**
9. **Convert remaining ~10 non-NIV citations.**
10. **Redesign theologians.html and history-timeline.html to unified hub pattern.**

---

## SITE HEALTH METRICS DASHBOARD

| Metric | Last Report | This Report | Trend |
|--------|------------|-------------|-------|
| Total HTML pages | 326 | 371 | ↑ +45 |
| Broken internal links | 0 | 0 | ✅ |
| Orphan pages (not on hubs) | 0* | 31 | ⚠️ |
| Demolition w/o healing links | 3 | 13 | ⚠️ |
| Footer grace-warning | 99.7% | ~95% | ↓ |
| article-body compliance | ~75% | ~75% | → |
| Non-NIV citations | ~3 | ~18 | ⚠️ |
| Crown jewel pages | STRONG | STRONG | ✅ |
| Evolution Journal activity | 8/day | 48/day | ✅ |
| Validator errors | 0 | 0 | ✅ |
| Validator warnings | 1 | 32 | ⚠️ |

*Previous report's "100% hub wiring" was inaccurate — this audit used a broader orphan detection scan.*

---

*Generated by THE OVERSEER — Session 3, 2026-04-05*
*Next scheduled audit: 2026-04-06*
