# Site Integrity Log — 2026-03-28

**Agent:** abg-integrator | **Run time:** Scheduled
**Pages scanned:** 198 HTML files | **Internal links checked:** 8,790

---

## 1. Broken Link Repair

**Status: CLEAN**

All 8,790 internal links across 198 pages resolve correctly. No broken internal links found. No links point to deleted resource pages (the 13 resources pages were removed previously and no orphan links remain).

---

## 2. Hub-to-Child Synchronization

**Status: ALL SYNCED**

Every hub page links to all of its child pages:

| Hub | Children | Status |
|-----|----------|--------|
| questions.html | 32 question-* pages | Synced |
| devotionals.html | 14 devotional-* pages | Synced |
| stories.html | 5 story-* pages | Synced |
| demolition-hub.html | 18 demolition-* pages | Synced |
| systematic-theology.html | 20 systematic-* pages | Synced |
| theologians.html | 10 theologian-* pages | Synced |
| analogies-illustrations.html | 5 analogy-* pages | Synced |
| secular-evidence.html | 8 secular-* pages | Synced |
| psychology-hub.html | 2 psychology-* pages | Synced |

---

## 3. Sitemap Synchronization

**13 dead entries removed** (all deleted resources pages):

- resource-finder, resources, resources-books, resources-catechisms
- resources-commentaries, resources-confessions, resources-glossary
- resources-podcasts, resources-prayer, resources-reading-plans
- resources-sermons, resources-study-guides, start-here-resources

**Sitemap now has 198 entries** matching all live HTML files (excluding index-old.html).

---

## 4. Navigation Audit & Repair

### Old Flat Nav Replaced (5 pages)
These pages had outdated flat navigation without dropdown menus. Replaced with canonical mega-menu nav:
- question-john17.html
- question-ezekiel37.html
- story-the-kings-banquet.html
- question-cannot.html
- devotional-when-god-says-no.html

### Dropdown CSS Injected (133 pages)
Most pages had the dropdown nav HTML but were missing the CSS rules for `.nav-trigger`, `.nav-dropdown`, and `.nav-arrow`. Injected the canonical dropdown CSS into 133 pages so dropdown menus render and function correctly.

### Dropdown JS Injected (53 pages)
53 pages were missing the mobile dropdown toggle JavaScript. Injected the event listeners for `.nav-trigger` click handling and `.dropdown-open` state management.

### Terminology
No pages have "Resources" in their navigation. The term has been successfully replaced with "The Evidence" site-wide.

---

## 5. Cross-Reference Weaving

**8 cross-references added** to existing "Continue Exploring" sections:

| Source Page | Added Link To | Connection |
|-------------|--------------|------------|
| question-depravity.html | secular-psychology-bondage-of-will.html | Secular corroboration of total depravity |
| question-depravity.html | analogy-doctor-corpse.html | Primary visual illustration |
| question-irresistible.html | systematic-regeneration.html | Irresistible grace = regeneration |
| question-irresistible.html | analogy-lazarus-grave.html | Lazarus illustrates effectual calling |
| question-perseverance.html | apologetic-perseverance.html | Pastoral → apologetic defense |
| question-sealed.html | apologetic-perseverance.html | Sealing as perseverance guarantee |
| question-john6.html | demolition-john3-16.html | John 6 ↔ John 3:16 objection |
| question-romans9.html | systematic-election.html | Romans 9 → election doctrine |

**Skipped (no existing related section):** 7 target pages that could benefit from back-links but lack a "Related Pages" section. Creating new sections would be content creation, which is outside the integrator's mandate.

---

## Issues for Aaron's Attention

1. **nav-right section inconsistency:** Only `index.html` has the full `nav-right` section with "Start Here", "The Evidence" top-links, and "Explore All" mega-toggle. All other 193+ pages are missing this desktop enhancement. This is a design decision — flagging for awareness.

2. **Back-link opportunity:** The following pages are frequently referenced but lack a "Related Pages" section to link back: `systematic-regeneration.html`, `systematic-election.html`, `apologetic-perseverance.html`, `analogy-doctor-corpse.html`, `analogy-lazarus-grave.html`, `secular-psychology-bondage-of-will.html`, `demolition-john3-16.html`. Content agents could add related sections to these pages.

---

*"The whole body, joined and held together by every supporting ligament, grows and builds itself up in love, as each part does its work." — Ephesians 4:16*
