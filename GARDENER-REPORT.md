# Log Gardener & Site Hygienist Report
> Weekly sweep of the repository. Most recent report first.

---

## 2026-04-05 (Sunday) — Inaugural Sweep

### Phase 1: Log Trimming
**No trimming needed.** All log files contain only recent data:
- **SCHEDULER-HEALTH.md** (77 lines) — Single entry from today (April 5). No entries older than 30 days to archive.
- **EVOLUTION-JOURNAL.md** (2,561 lines) — All entries span March 30 – April 5, 2026. Nothing older than 60 days. No archiving needed.
- **ANALYTICS.md** (472 lines) — Single report dated April 5. No superseded reports to remove.

### Phase 2: Orphan Detection
**182 orphan pages found** — HTML files that exist but are NOT linked from any hub page.

This is the most critical finding. Nearly half (182 of 351 article-level pages) cannot be discovered by visitors browsing through hub pages. While some are legitimate standalone pages (about, contact, donate, privacy, terms, search, sitemap), the vast majority are real content pages that need hub wiring.

**Orphans by category (content pages only — excluding standalone utility pages):**

| Category | Count | Examples |
|----------|-------|---------|
| Analogies | 6 | analogy-adoption, analogy-chess-grandmaster, analogy-doctor-corpse, analogy-drowning-man, analogy-lazarus-grave, analogy-light-switch, analogy-orchestra, analogy-river |
| Anxious Mind (healing) | 3 | anxious-mind-brain-decides, anxious-mind-never-meant-to-carry, anxious-mind-sovereignty-of-sleep |
| Comparisons | 7 | compare-calvinism-catholic-soteriology, compare-calvinism-molinism, compare-calvinism-open-theism, compare-every-decision-point, compare-grace-reformed-vs-arminian, compare-monergism-synergism, compare-predestination-foreknowledge |
| Demolition | 10 | demolition-1cor15-22, demolition-1tim2-4, demolition-2peter2-1, demolition-2peter3-9, demolition-acts7-51, demolition-hebrews6-4-6, demolition-john3-16, demolition-matt23-37, demolition-prevenient-grace, demolition-romans10-9 |
| Devotionals | 5 | devotional-dead-who-live, devotional-good-i-cannot-do, devotional-love-before-the-world, devotional-weakness-of-gods-strength, devotional-when-god-says-no |
| Objections | 12 | objection-babies, objection-desire, objection-effort, objection-fairness, objection-faith-choice, objection-love, objection-manipulation, objection-responsibility, objection-unfair-to-choose-some, objection-why-evangelize, objection-why-not-save-everyone, objection-why-pray |
| Old Testament | 5 | ot-abraham, ot-david, ot-israel-chosen, ot-jacob-esau, ot-moses-pharaoh |
| Pastoral | 4 | pastoral-assurance, pastoral-evangelism, pastoral-prayer, pastoral-suffering |
| Psychology | 18 | psychology-addiction-proof, psychology-attribution-error, psychology-autonomy-illusion, psychology-backfire-effect, etc. |
| Questions | 6 | question-bible-says-sick, question-cannot, question-ezekiel37, question-proverbs-sovereignty, question-psalm139, question-was-christ-a-robot, question-where-does-your-no-come-from |
| Secular Evidence | 12 | secular-ai-determinism, secular-algorithm-sovereignty, secular-art-literature-reformed-truth, secular-billion-decisions, etc. |
| Stories | 16 | story-children-the-king-who-chose, story-dark-the-altar-he-built-himself, story-the-dead-city, story-the-fish-who-chose-the-ocean, etc. |
| Systematic Theology | 19 | systematic-anthropology, systematic-bibliology, systematic-christology, systematic-compatibilism, systematic-covenant-theology, etc. |
| Theologians | 18 | theologian-anselm, theologian-arminius, theologian-augustine, theologian-boston, theologian-bunyan, theologian-calvin, theologian-edwards, etc. |
| Other | ~10 | apologetic-*, resistance-*, scripture-tsunami-*, hymn-*, start-here-phase*, for-deconstructed, for-hurting, romans-8/9 pages |

**Action required:** The Guardian or Cartographer should wire these pages into their respective hub pages. This is the single highest-impact fix available — it would instantly make 182 pages discoverable to visitors.

### Phase 3: Debris Detection

**Deploy ZIP files (SHOULD DELETE — ~28MB total):**
- `deploy-1774683655831-69a71129-24b7-4928-a507-83c0bb277ec5.zip` (3.6MB, Mar 28)
- `deploy-1774680429234-b54ffb22-16cc-4b81-b250-113f452af099.zip` (3.5MB, Mar 28)
- `deploy-1774713602520-c0b4cae0-0070-4d9e-9bee-16b45ea0e302.zip` (3.3MB, Mar 28)
- `deploy-1774884543511-9558a684-1e84-407f-a255-424f8807181d.zip` (5.8MB, Mar 30)
- `deploy-1774897060537-8614bfda-21f8-4f6f-9c6d-07a3b7f2f564.zip` (5.9MB, Mar 30)
- `deploy-1774912295494-d5879693-91a1-4b4c-ae46-867867aa4bde.zip` (5.8MB, Mar 30)

**Backup files (SAFE TO DELETE — 5 files):**
- `devotional-love-before-the-world.html.bak`
- `analogy-doctor-corpse.html.bak`
- `psychology-why-we-resist.html.bak`
- `story-the-dead-city.html.bak`
- `questions.html.bak`

**Leftover Python scripts (13 files — review for deletion):**
- `strip-emojis.py`, `fix_nav.py`, `add-map-nav.py`, `migrate-nav.py`, `qa-check.py`
- `cleanup-final.py`, `cleanup-styles.py`, `cleanup-styles-v2.py`, `standardize_footer.py`
- `migrate-design.py`, `link_analyzer.py`, `update_favicons.py`, `enhance_html.py`

**Leftover shell scripts (13 files — review for deletion):**
- `fix-page-hero.sh`, `problematic_pages.sh`, `check-broken-links-accurate.sh`
- `check-broken-links.sh`, `push-to-github.sh`, `check-broken-links-final.sh`
- `check-links-detailed-report.sh`, `AUDIT.sh`, `audit-links-nz.sh`, `AUDIT-FINAL.sh`
- `real_wrapper_issues.sh`, `check_wrappers.sh`, `detailed_wrapper_check.sh`

**Leftover .md files that may be one-time audit artifacts (review for deletion):**
- `AUDIT-ACTION-ITEMS.md`, `AUDIT-OBJECTION-PAGES-2026-04-04.md`, `AUDIT-PHASE2-SYNC-REPORT.md`
- `AUDIT_REPORT_2026-04-04.md`, `AUDIT_SUMMARY.md`, `BROKEN_LINKS_AUDIT_2026-04-04.md`
- `DIAMOND-WEEK-AUDIT.md`, `FINAL-AUDIT-REPORT-2026-04-04.md`, `HTML_AUDIT_REPORT.md`
- `HTML_DIAGNOSTIC_2026-04-04.md`, `LINK-AUDIT-NZ-PHASE6.md`, `NAV-FOOTER-AUDIT-2026-04-04.md`
- `SITE-DIAGNOSTIC-2026-04-04.md`, `WRAPPER-ISSUES-DETAILED.md`, `FINE-TUNER-LOG.md`
- `INTEGRITY-LOG.md`, `OVERSEER-REPORT.md`

**Possibly unnecessary .js build scripts (review — may still be used):**
- `audit-links.js`, `build-related.js`, `build-tags.js`, `content-manifest.js`
- `generate-manifest.js`, `remove-back-to-top.js`, `search-concepts.js`, `update-nav-all-pages.js`

**Other debris:**
- `qa-results.json` (649KB) — likely a one-time audit output
- `tags.json` — build artifact from build-tags.js

### Phase 4: Structural Quick-Check (10 Random Pages)
**All 10 pages PASSED all checks.** Zero violations found.

Pages sampled:
1. devotional-good-i-cannot-do.html — PASS
2. shattered-lens-silence-of-god.html — PASS
3. anxious-mind-the-loop-that-wont-break.html — PASS
4. philosophy-sleep-surrender.html — PASS
5. question-isaiah53.html — PASS
6. analogy-orchestra.html — PASS
7. history-dort.html — PASS
8. question-is-salvation-my-choice-or-gods.html — PASS
9. demolition-2peter2-1.html — PASS
10. psychology-illusion-free-will.html — PASS

All had: global.css link, nav.js script, footer-grace-warning, article-body wrapper, page-hero hero section.

### Phase 5: Size Check
- **Repository (excluding .git):** 27MB
- **.git directory:** 461MB (large — may benefit from `git gc` or history cleanup)
- **Total on disk:** 488MB

**Large files flagged:**
| File | Size | Action |
|------|------|--------|
| 6 deploy-*.zip files | 28MB total | DELETE — old Netlify deploy artifacts |
| search-index.js | 5.9MB | Expected — indexes 380+ pages |
| qa-results.json | 649KB | DELETE — one-time audit artifact |
| EVOLUTION-JOURNAL.md | 488KB | Monitor — will need archiving in ~6 weeks |

### Recommended Actions

**Priority 1 — Aaron (manual):**
1. Delete the 6 `deploy-*.zip` files (saves 28MB)
2. Delete the 5 `.bak` files (no longer needed)
3. Review and delete leftover `.py` and `.sh` scripts (26 files — all appear to be one-time migration/audit scripts)

**Priority 2 — Guardian or Cartographer:**
1. Wire 182 orphan pages into their hub pages. This is the single most impactful fix. Categories with the most orphans: systematic theology (19), psychology (18), theologians (18), stories (16), objections (12), secular evidence (12), demolition (10).

**Priority 3 — Cleanup:**
1. Archive or delete 17+ one-time audit `.md` files cluttering the root directory
2. Review 8 possibly-unused `.js` build scripts (audit-links.js, build-related.js, etc.)
3. Consider running `git gc --aggressive` to reduce the 461MB .git directory

---
*Report generated by Log Gardener scheduled task.*
