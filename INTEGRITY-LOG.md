# INTEGRITY LOG — adoptedbygrace.net Guardian Sessions

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
