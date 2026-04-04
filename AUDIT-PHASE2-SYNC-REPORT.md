# GUARDIAN PHASE 2: HUB-TO-CHILD SYNCHRONIZATION AUDIT
## N-Z Sector Hubs Report
**Audit Date:** 2026-04-04

---

## OVERVIEW

Critical synchronization failures detected across all N-Z sector hubs. Hub pages are not listing child pages as cards, and child pages are not linking back to their parent hubs. Widespread orphaned card references also point to non-existent pages.

---

## DETAILED FINDINGS BY HUB

### HUB 1: questions.html → Objection Pages
**STATUS: CRITICAL FAILURE**

| Metric | Value |
|--------|-------|
| Child Pages on Disk | 18 objection-*.html files |
| Cards in Hub | 0 / 18 (0% coverage) |
| Missing Cards | ALL 18 |
| Orphaned Links | Multiple to non-existent: systematic-theology, psychology-hub, history-timeline |
| Backlinks (Child→Hub) | NOT AUDITED (hub not listing children) |

**Child Files Not Listed:**
- objection-author-of-sin.html
- objection-babies.html
- objection-desire.html
- objection-effort.html
- objection-evangelism-pointless.html
- objection-fairness.html
- objection-faith-choice.html
- objection-god-could-save-all.html
- objection-love.html
- objection-manipulation.html
- objection-responsibility.html
- objection-robots.html
- objection-unfair-to-choose-some.html
- objection-why-believe.html
- objection-why-command.html
- objection-why-evangelize.html
- objection-why-not-save-everyone.html
- objection-why-pray.html

---

### HUB 2: open-wound-hub.html → Open Wound Articles
**STATUS: MAJOR FAILURE (71% missing)**

| Metric | Value |
|--------|-------|
| Child Pages on Disk | 7 open-wound-*.html files |
| Cards in Hub | 2 / 7 (29% coverage) |
| Missing Cards | 5 |
| Orphaned Links | 13 references to non-existent pages |
| Backlinks (Child→Hub) | PARTIAL (2 of 3 sampled) |

**Listed Correctly:**
- open-wound-hospital-room.html ✓
- open-wound-sovereignty-in-grief.html ✓

**Missing Cards:**
- open-wound-betrayed-by-church.html
- open-wound-empty-nursery.html
- open-wound-senseless-death.html
- open-wound-terminal-diagnosis.html
- (self-reference to open-wound-hub.html needs removal)

**Backlink Status:**
- open-wound-hospital-room.html ✓
- open-wound-sovereignty-in-grief.html ✓
- open-wound-terminal-diagnosis.html ✗

---

### HUB 3: ot-election.html → Old Testament Election Articles
**STATUS: MAJOR FAILURE (43% missing)**

| Metric | Value |
|--------|-------|
| Child Pages on Disk | 14 ot-*.html files |
| Cards in Hub | 8 / 14 (57% coverage) |
| Missing Cards | 6 |
| Orphaned Links | 10 references to non-existent pages |
| Backlinks (Child→Hub) | ALL FAILED (0 of 3 sampled) |

**Missing Cards:**
- ot-isaiah-servant.html
- ot-jeremiah.html
- ot-job.html
- ot-jonah.html
- ot-prophets-remnant.html
- (self-reference to ot-election.html)

**Backlink Test Results:**
- ot-abraham-covenant.html ✗
- ot-david-kingship.html ✗
- ot-moses-hardening.html ✗

---

### HUB 4: pastoral-assurance.html → Pastoral Care Articles
**STATUS: CRITICAL FAILURE (100% missing)**

| Metric | Value |
|--------|-------|
| Child Pages on Disk | 4 pastoral-*.html files |
| Cards in Hub | 0 / 4 (0% coverage) |
| Missing Cards | ALL 4 |
| Orphaned Links | 20 references to non-existent pages |
| Backlinks (Child→Hub) | ALL FAILED (0 of 3 sampled) |

**Missing Cards:**
- pastoral-evangelism.html
- pastoral-prayer.html
- pastoral-suffering.html
- (self-reference to pastoral-assurance.html)

**Backlink Test Results:**
- pastoral-evangelism.html ✗
- pastoral-prayer.html ✗
- pastoral-suffering.html ✗

---

### HUB 5: psychology-hub.html → Psychology Articles
**STATUS: CRITICAL FAILURE (100% missing)**

| Metric | Value |
|--------|-------|
| Child Pages on Disk | 21 psychology-*.html files |
| Cards in Hub | 0 / 21 (0% coverage) |
| Missing Cards | ALL 21 |
| Orphaned Links | 23 references (some to existing files with broken patterns) |
| Backlinks (Child→Hub) | ALL FAILED (0 of 3 sampled) |

**Note:** Many orphaned links point to files that DO exist, suggesting broken href patterns (missing .html extension or typos).

**Backlink Test Results:**
- psychology-addiction-proof.html ✗
- psychology-autonomy-illusion.html ✗
- psychology-cognitive-biases.html ✗

---

### HUB 6: scripture-tsunami.html → Scripture Tsunami Articles
**STATUS: CRITICAL FAILURE (100% missing)**

| Metric | Value |
|--------|-------|
| Child Pages on Disk | 1 scripture-tsunami-*.html file |
| Cards in Hub | 0 / 1 (0% coverage) |
| Missing Cards | scripture-tsunami-faith-as-gift.html |
| Orphaned Links | 9 references to non-existent pages |
| Backlinks (Child→Hub) | NOT AUDITED |

---

### HUB 7: secular-evidence.html → Secular Evidence Articles
**STATUS: CRITICAL FAILURE (100% missing)**

| Metric | Value |
|--------|-------|
| Child Pages on Disk | 11 secular-*.html files |
| Cards in Hub | 0 / 11 (0% coverage) |
| Missing Cards | ALL 11 |
| Orphaned Links | 19 references (many to existing files with broken patterns) |
| Backlinks (Child→Hub) | NOT AUDITED |

**Note:** Several orphaned links point to existing secular-*.html files, indicating pattern mismatch.

---

### HUB 8: shattered-lens-hub.html → Shattered Lens Articles
**STATUS: MAJOR FAILURE (83% missing)**

| Metric | Value |
|--------|-------|
| Child Pages on Disk | 6 shattered-lens-*.html files |
| Cards in Hub | 1 / 6 (17% coverage) |
| Missing Cards | 5 |
| Orphaned Links | 17 references to non-existent pages |
| Backlinks (Child→Hub) | NOT FULLY AUDITED |

**Listed Correctly:**
- shattered-lens-cant-tell-true.html ✓

**Missing Cards:**
- shattered-lens-cant-unsee-it.html
- shattered-lens-pastor.html
- shattered-lens-silence-of-god.html
- shattered-lens-taught-wrong.html
- (self-reference to shattered-lens-hub.html)

---

### HUB 9: stories.html → Story Pages
**STATUS: CRITICAL FAILURE (100% missing)**

| Metric | Value |
|--------|-------|
| Child Pages on Disk | 16 story-*.html files |
| Cards in Hub | 0 / 16 (0% coverage) |
| Missing Cards | ALL 16 |
| Orphaned Links | 10 references to non-existent pages |
| Backlinks (Child→Hub) | ALL FAILED (0 of 3 sampled) |

**Backlink Test Results:**
- story-historical-luther-storm.html ✗
- story-the-fish-who-chose-the-ocean.html ✗
- story-thought-the-day-you-chose-again.html ✗

---

### HUB 10: systematic-theology.html → Systematic Theology Articles
**STATUS: MODERATE FAILURE (10% missing) [BEST PERFORMER]**

| Metric | Value |
|--------|-------|
| Child Pages on Disk | 21 systematic-*.html files |
| Cards in Hub | 19 / 21 (90% coverage) |
| Missing Cards | 2 |
| Orphaned Links | 10 references to non-existent pages |
| Backlinks (Child→Hub) | NOT FULLY AUDITED |

**Missing Cards:**
- systematic-soteriology.html
- (self-reference to systematic-theology.html)

---

### HUB 11: theologians.html → Theologian Biographies
**STATUS: CRITICAL FAILURE (100% missing)**

| Metric | Value |
|--------|-------|
| Child Pages on Disk | 10 theologian-*.html files |
| Cards in Hub | 0 / 10 (0% coverage) |
| Missing Cards | ALL 10 |
| Orphaned Links | 9 references to non-existent pages |
| Backlinks (Child→Hub) | ALL FAILED (0 of 3 sampled) |

**Backlink Test Results:**
- theologian-luther.html ✗
- theologian-bunyan.html ✗
- theologian-augustine.html ✗

---

## SUMMARY TABLE: HUB-TO-CHILD CARD COVERAGE

| Hub File | Child Type | On Disk | Listed | Coverage | Status |
|----------|-----------|---------|--------|----------|--------|
| questions.html | objection-*.html | 18 | 0 | 0% | CRITICAL |
| open-wound-hub.html | open-wound-*.html | 7 | 2 | 29% | MAJOR |
| ot-election.html | ot-*.html | 14 | 8 | 57% | MAJOR |
| pastoral-assurance.html | pastoral-*.html | 4 | 0 | 0% | CRITICAL |
| psychology-hub.html | psychology-*.html | 21 | 0 | 0% | CRITICAL |
| scripture-tsunami.html | scripture-tsunami-*.html | 1 | 0 | 0% | CRITICAL |
| secular-evidence.html | secular-*.html | 11 | 0 | 0% | CRITICAL |
| shattered-lens-hub.html | shattered-lens-*.html | 6 | 1 | 17% | MAJOR |
| stories.html | story-*.html | 16 | 0 | 0% | CRITICAL |
| systematic-theology.html | systematic-*.html | 21 | 19 | 90% | GOOD |
| theologians.html | theologian-*.html | 10 | 0 | 0% | CRITICAL |
| **TOTALS** | | **129** | **30** | **23%** | ⚠️ **SEVERE** |

---

## CRITICAL FINDINGS

### 1. WIDESPREAD HUB-TO-CHILD FAILURE
- **10 out of 11 hubs** have critical synchronization failures
- Only `systematic-theology.html` has acceptable coverage (90%)
- **99 child pages are missing** from hub card listings
- **Average coverage: 23%** across all hubs

### 2. ORPHANED CARD REFERENCES (DEAD LINKS ON HUB PAGES)
- Every hub contains links pointing to non-existent pages
- **Common orphans:** systematic-theology, psychology-hub, history-timeline
- Some hubs reference files that **DO exist** but are still listed as orphaned
  - Indicates broken href patterns (likely missing .html extensions or typos)

### 3. CHILD-TO-HUB BACKLINKS BROKEN
- Psychology, OT, Pastoral, Stories, and Theologian child pages **do NOT link back** to their parent hubs
- Even where hub-to-child exists (open-wound), backlinks are incomplete

### 4. SELF-REFERENCES IN HUB PAGES
- Hub pages incorrectly list **themselves as child cards**
- Needs removal from all hub card sections

### 5. FILE PATTERN INCONSISTENCIES
- Orphaned card references use inconsistent patterns
- Example: "systematic-theology" vs "systematic-theology.html"
- Some files referenced without .html extension

---

## RECOMMENDED NEXT STEPS (PHASE 3)

1. **Audit href patterns** in hub pages to identify why orphaned cards exist
   - Check if they're missing .html, using wrong file names, etc.

2. **Generate complete card listings** for all child pages:
   - Extract all child filenames from disk
   - Generate proper card HTML for each
   - Inject into respective hub pages

3. **Add backlinks** from child pages to parent hubs:
   - All psychology-*.html → psychology-hub.html
   - All ot-*.html → ot-election.html
   - All pastoral-*.html → pastoral-assurance.html
   - All story-*.html → stories.html
   - All theologian-*.html → theologians.html
   - All secular-*.html → secular-evidence.html
   - All shattered-lens-*.html → shattered-lens-hub.html
   - All objection-*.html → questions.html
   - All scripture-tsunami-*.html → scripture-tsunami.html
   - All open-wound-*.html → open-wound-hub.html

4. **Remove self-references** from all hub card sections

5. **Verify all orphaned links** point to valid existing files
   - Clean up dead links that reference non-existent pages

---

## AUDIT METHODOLOGY

**Hub-to-Child Verification:**
- Listed all child files matching expected pattern (e.g., objection-*.html)
- Searched hub page HTML for href links to those files
- Counted matches as "listed" cards

**Backlink Verification (Sample):**
- Selected 3 representative child files per hub
- Searched each child file for href links back to parent hub
- Recorded pass/fail for each

**Orphaned Card Detection:**
- Extracted all href patterns from hub pages
- Checked each href against actual files on disk
- Reported any links to non-existent files

---

**Audit Status:** COMPLETE - No fixes applied, data collection only
**Data Collection Date:** 2026-04-04
