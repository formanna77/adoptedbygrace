# INTEGRITY LOG — adoptedbygrace.net Guardian Sessions

## 2026-04-05 Guardian Session — PM (5:00 PM CT)

**Summary:**
- Pages scanned: 372
- Issues found: 172
- Issues fixed: 168
- Deploy status: BLOCKED (Netlify CLI not authenticated — same as AM)

**Phase Breakdown:**
- Phase 1 (Broken Links): 2 broken links fixed (devotional-love-before-the-world.html: question-irresistible-grace→question-irresistible, question-1-john-419→question-1john5-1). 4 false-positive search.html validator warnings (file exists, validator path resolution issue).
- Phase 5 (Footer): 33 pages missing footer-grace-warning — ALL FIXED (31 by batch script, 2 manually: anxious-mind-brain-decides, anxious-mind-never-meant-to-carry)
- Phase 6 (Link Density): ALL 325 article pages have 8+ internal links. Zero-link crisis from Diamond Week audit is RESOLVED (Weaver agent completed this earlier today).
- Phase 8 (Design System):
  - 81 pages with non-standard wrapper classes (content-wrap, article-content, content-wrapper, main-content, content-container, content-main, article-wrapper, content-grid, content-section) → ALL converted to article-body
  - 31 pages with banned inline `<style>` blocks → ALL REMOVED
  - 17 pages missing page-hero class → FIXED (9 by wrapping bare h1 in page-hero header, 8 by converting article-header/story-header/eyebrow classes to page-hero)
  - 4 pages with hero-eyebrow class → converted to eyebrow
  - 4 pages with topic-label class → converted to eyebrow
  - 4 pages with hero-subtitle/article-subtitle → converted to hub-subtitle
- Phase 11 (Banned Content):
  - 20 pages with back-to-top buttons (HTML + inline JS) → ALL REMOVED
  - 6 banned pages identified for manual deletion (daily-newsletter.html, 3 newsletter-* pages, index-new.html, index-old.html) → cannot delete from automated session, flagged for Aaron
- Phase 12 (Accessibility): Inline style= attributes audit found 15 pages with 40-90+ inline style attributes — flagged for future session, too risky for bulk removal without visual verification
- Phase 15 (Search/Menu): Search index rebuilt (368 pages indexed). Mega-menu rebuilt (327 articles in 7 umbrellas).
- Phase 16 (Deploy): BLOCKED — Netlify CLI not authenticated. Aaron must deploy manually.

**Notable Patterns:**
- The batch of ~30 pages (demolition-*, ot-*, devotional-dead/good/love/weakness/when) were created from an older template with inline styles, back-to-top buttons, and non-standard hero classes. All have now been normalized to the canonical template structure.
- All 372 pages now have footer-grace-warning (excluding 6 banned pages pending deletion)
- Zero pages with non-standard wrapper classes remain (excluding 5 comparison pages using point-section/pattern-section for legitimate content sub-sections)
- Link density is excellent — 325/325 article pages meet the 8+ link minimum
- 15 pages have heavy inline style= attributes (40-90+ occurrences) that need manual review in a future session

**Banned Pages Pending Manual Deletion:**
- daily-newsletter.html
- newsletter-2026-03-31-drowning-or-dead.html
- newsletter-2026-03-31-the-fraud.html
- newsletter-2026-03-31-where-did-your-faith-come-from.html
- index-new.html
- index-old.html

---

## 2026-04-05 Guardian Session — AM (5:00 AM CT)

**Summary:**
- Pages scanned: 310
- Issues found: 48
- Issues fixed: 48
- Deploy status: BLOCKED (Netlify CLI not authenticated)

**Phase Breakdown:**
- Phase 1 (Broken Links): 0 broken links found. 1,268 unique href targets verified. All clean.
- Phase 2 (Hub Sync): All 21 hubs checked. All child pages properly wired. No orphaned cards, no missing cards.
- Phase 3 (Sitemap): 22 pages added (new content not indexed), 41 orphaned entries removed (deleted newsletter, apologetic, and planned-but-never-built pages). Sitemap now has 310 entries matching disk.
- Phase 4 (Navigation): 310/310 pages have correct nav template, global.css, nav.js. All 13 nav links present on every page.
- Phase 5 (Footer): 310/310 pages have footer-grace-warning element. All correct.
- Phase 6 (Link Density): Deferred to PM run.
- Phase 7 (Functional): No placeholder content (Lorem ipsum/TODO/FIXME). No oversized files (>500k). Site validator: ALL CHECKS PASSED.
- Phase 8-9 (Design/CSS): Deferred to PM run.
- Phase 10 (SEO): 10 pages missing canonical URLs — FIXED. 3 pages missing OG tags — FIXED. All 310 pages have meta descriptions.
- Phase 11 (Banned Content):
  - Social share buttons found on 7 pages (objection-why-command, demolition-arminian-facts, ot-abel-cain, story-the-fish-who-chose-the-ocean, devotional-love-letter-before-time, demolition-1john2-2, story-the-orphanage, story-surgeon-stone-heart, psychology-hostility-reaction, psychology-cost-of-rejecting-grace) — ALL REMOVED
  - Share button CSS in global.css (~30 lines) — REMOVED
  - Share button JS in global.js (~50 lines of social share injection + template code) — REMOVED
  - Back-to-top dead code in global.js (12 lines) — REMOVED
  - Newsletter/email signup: 0 violations
  - Resources/community: 0 violations
- Phase 12 (Accessibility): Deferred to PM run.
- Phase 13 (Critical Pages): index.html, start-here.html, about.html, best-reads.html, search.html — spot-checked, all functional.
- Phase 14 (Pre-Deploy): Page count 310. Search index rebuilt (308 indexed). Mega-menu rebuilt (277 articles in 7 umbrellas). Validator: ALL CHECKS PASSED.
- Phase 15 (Deploy): BLOCKED — Netlify CLI not authenticated in this session. Aaron must deploy manually or re-authenticate.

**Notable Patterns:**
- Social share buttons were scattered across ~10 pages from different creation sessions — now fully eradicated site-wide including CSS and JS support code
- The social share JS in global.js was auto-injecting share bars on ALL content pages dynamically — this was the biggest violation, now removed
- Sitemap had 41 ghost entries pointing to deleted/never-created pages — search engines were crawling 404s
- SEO canonical URLs were missing on 10 pages including 3 hub pages — now fixed

**Next Session Todo:**
- PM run should cover: Phase 6 (link density), Phase 8-9 (design/CSS), Phase 12 (accessibility)
- Deploy when Netlify auth is available or Aaron pushes manually
- Monitor for any new social share code being introduced by content agents

## 2026-04-04 Guardian Session — PM (5:00 PM CT)

**Summary:**
- Pages on site: 328 (indexed), 330 HTML files on disk
- Sector: N-Z (PM run)
- Issues found: 72+
- Issues fixed: 22
- Deploy status: HELD — Netlify auth token not available in session. Manual deploy required.

**Phase Breakdown:**

### Phase 1 (Broken Links): 36 found, 14 fixed
- 36 broken internal links identified across 22 N-Z sector files
- 14 links fixed by mapping to correct existing pages:
  - `why-we-resist` → `psychology-why-we-resist` (psychology-sincerity-trap.html)
  - `stories-hub` → `stories` (2 files)
  - `healing-hub` → appropriate hub pages (2 files)
  - `philosophy-hub` → `psychology-hub` (2 files)
  - `question-golden-chain` → `question-goldchain` (romans-8-28-39.html)
  - `question-faith-choice` → `objection-faith-choice` (romans-8-28-39.html)
  - `question-predestination` → `question-predestined-to-hell` (story-humor-committee-to-save-yourself.html)
  - `systematic-predestination` → `systematic-election` (question-was-christ-a-robot.html)
  - `systematic-soteriology-irresistible-grace` → `systematic-soteriology` (question-was-christ-a-robot.html)
  - `secular-grace` → `secular-evidence` (questions.html)
  - `compare-compatibilism` → `systematic-compatibilism` (objection-responsibility.html)
- 22 remaining broken links are forward references to planned pages (devotional-*, healing-*, etc.)

### Phase 2 (Hub Sync): 11 hubs checked, SEVERE coverage gaps
- **Average hub-to-child coverage: ~23%**
- systematic-theology.html: 90% coverage (GOOD)
- ot-election.html: 57% coverage (MAJOR gap)
- open-wound-hub.html: 29% coverage (MAJOR gap)
- shattered-lens-hub.html: 17% coverage (MAJOR gap)
- 7 hubs at 0% coverage (questions, pastoral, psychology, scripture, secular, stories, theologians)
- 99 child pages missing from hub card sections total
- This is an Enhancer-scope task — hubs need card additions for all child pages

### Phase 3 (Sitemap): 2 added, 0 removed, 329 total
- Added: story-tender-the-gardener-who-waited.html, story-thought-the-day-you-chose-again.html
- All entries verified against disk files
- Priority/changefreq correctly assigned

### Phase 4 (Navigation): 5 pages with issues
- 5 stub files missing global.css: ot-abraham.html, philosophy-of-truth.html, psychology-comfort-self-salvation.html, question-ezekiel37.html, story-historical-augustine-pears.html
- 1 file missing nav.js: story-historical-augustine-pears.html
- 1 file missing nav entirely: ot-abraham.html
- All are incomplete stub files needing full reconstruction (Creator scope)

### Phase 5 (Footer): 13 pages missing footer-grace-warning
- 1 fixed: question-john17.html
- 12 are incomplete stubs without proper footer markup — need full reconstruction

### Phase 6 (Internal Link Density): CRITICAL deficit
- 192 article pages audited in N-Z sector
- 89 pages (46%) have ZERO internal links
- 138 pages (72%) below 6-link threshold (CRITICAL)
- 28 pages (15%) in 6-7 range (WARNING)
- Only 26 pages (13%) meet 8+ link standard
- Average: 3.0 links per page (target: 8-12)
- Top performers: scripture-tsunami-faith-as-gift (27), question-was-christ-a-robot (25)
- This is the site's #1 structural weakness — Enhancer priority

### Phase 7 (Functional): Mixed results
- DOCTYPE, charset: All compliant
- Missing viewport: 2 pages
- Missing favicon: 28 pages
- External links without target="_blank": 178 pages (widespread)
- No placeholder content found

### Phase 8-9 (Design QA / CSS): Not deeply audited this run (lightweight pass)
- No major design regressions detected via grep scanning

### Phase 10 (SEO): Multiple gaps
- Missing title tags: 5 pages → ALL FIXED
- Missing canonical URLs: 5 pages → ALL FIXED
- Missing OG tags: 1 page (topics.html)
- Missing JSON-LD: 26 pages

### Phase 11 (Banned Content): 1 violation found, FIXED
- Eschatology section in essays.html → REMOVED
- 5 apologetic-*.html files exist but correctly categorized (not a violation)
- No newsletter, back-to-top, resources, or community violations

### Phase 12 (Accessibility): Not deeply audited this run
- Heading hierarchy and alt text spot-checks passed

### Phase 13 (Critical Pages): Not deeply audited this run

### Phase 14 (Pre-Deploy): PASS
- Page count: 330 HTML files, 328 indexed
- Sitemap: 329 entries (matches content pages)
- No oversized files
- No placeholder content
- Search index rebuilt: 328 pages
- Mega-menu rebuilt: 288 articles across 7 umbrellas

### Phase 15 (Deploy): HELD
- Netlify auth token not available in this Cowork session
- All changes saved to disk — manual deploy required by Aaron

**Notable Patterns:**
- ~12 incomplete stub files in N-Z sector need full page reconstruction (Creator scope)
- Internal link density is the site's biggest structural weakness (72% of articles below threshold)
- Hub-to-child sync is severely broken — most hubs don't list their child pages as cards
- 22 broken links point to planned but not-yet-created devotional/healing pages

**Next Session Todo:**
- AM run should cover A-M sector with same thoroughness
- Enhancer should prioritize: (1) internal link density, (2) hub card additions, (3) stub file reconstruction
- Deploy when Aaron provides Netlify auth or pushes manually
