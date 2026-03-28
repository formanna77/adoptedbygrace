# Overseer Log — adoptedbygrace.net

## 2026-03-28 — Run 3 (Scheduled)

### Issues Found & Fixed
1. **33 broken internal links across 8 pages** — Fixed all. Pages with bad nav/footer templates (question-cannot, question-ezekiel37, question-john17, devotional-when-god-says-no, story-the-dead-city, story-the-kings-banquet) had links to non-existent `theology.html`, `apologetics.html`, `explore.html`, `contact.html`, `privacy.html`, `terms.html`. Remapped to correct equivalents (`/systematic-theology`, `/demolition-hub`, `/explore-map`, `/about`).
2. **3 broken links in demolition pages** — `demolition-hebrews6-4-6.html` linked to non-existent `question-apostasy.html`, `1corinthians10-analysis.html`, `question-security.html` → remapped to `question-perseverance.html`. `demolition-1tim4-10.html` linked to non-existent `theology-common-grace.html` → remapped to `/systematic-theology`.
3. **1 broken link in devotional** — `devotional-when-god-says-no.html` linked to non-existent `devotional-never-gives-up-hero.html` → fixed to `/devotional-never-gives-up`.
4. **Sitemap gap** — Added `search.html` to sitemap (was the only real page missing; 404, index-new, index-old intentionally excluded).
5. **No eschatology references** found in any HTML file. Clean.
6. **global.css/global.js** — Only missing from 3 index variants (known, acceptable).
7. **Hub link gaps from fleet-ops (Run 2 flagged)** — ALL RESOLVED. questions.html now links all 4 missing pages, systematic-theology.html links all 8, analogies-illustrations.html links all 5 analogy pages. These were fixed by other agents since last Overseer run.

### Content Built
- **`apologetic-perseverance.html`** — NEW: "Can You Lose Your Salvation?" — Comprehensive biblical case for the perseverance of the saints. Features exegesis of 7 key passages (John 10:27-29, Romans 8:28-39, Philippians 1:6, John 6:37-40, 1 Peter 1:3-5, Ephesians 1:13-14, Jude 1:24), the golden chain logic, 3 objections addressed (Hebrews 6, 2 Peter 2, 1 John 2:19), pastoral close with "Never Gives Up" banner. ~878 lines, ~2,400 words of content. Scripture-first terminology throughout. Added to sitemap.

### Current Page Count
- **202 HTML pages** (201 existing + 1 new)
- **Sitemap entries: ~199** (synced minus intentional exclusions)

### Agent Assessment
- **Wordsmith** has polished 12 pages. ~190 pages remain untouched — still the biggest quality gap.
- **Story Engine** at 4 stories (surgeon, dead city, fish, king's banquet). 8 more planned.
- **Psychology series** still at hub + 1 page. 8 more planned but not started.
- **Fleet-ops** reports 158 uncommitted files as of last check — auto-push may be blocked by SSH issues.
- **Git health concern**: Fleet-ops logged SSH host key verification failure and stale gc.pid blocking git gc. Aaron may need to run `ssh-keyscan github.com >> ~/.ssh/known_hosts` on his machine.

### Top 3 Priorities for Next Run
1. **Build "What About the Person Who Never Heard?" apologetics page** — Romans 1-2 case, general revelation, a compassionate but unflinching answer
2. **Story Engine: "The Adoption Papers"** — Stories reach hearts that arguments miss; this one directly serves the site's core adoption metaphor
3. **Fix the 6 pages with non-majority nav** — The 6 pages fixed today still have the old simplified nav structure; they should get the full majority nav with dropdown menus

## 2026-03-28 — Run 2 (Scheduled)

### Issues Found & Fixed
1. **ROADMAP.md eschatology references** — Removed 3 stale references to deleted `systematic-eschatology.html` (lines 55, 102, 180). Line 180 converted to strikethrough note: "REMOVED per site policy." This was flagged in Run 1 and is now resolved.
2. **Sitemap gaps** — Added `psychology-hub.html` and `psychology-why-we-resist.html` to sitemap.xml (were the only 2 real pages missing; `index-new.html` and `index-old.html` are deprecated and intentionally excluded).
3. **No new broken links** — QA enforcer cleared all 53 issues last session. No regressions detected.
4. **No eschatology content** in any HTML file (only historical references in log files, which is appropriate).

### Content Built
- **`apologetic-definite-atonement.html`** — NEW: "Did Jesus Die for Everyone?" — Comprehensive apologetic for definite/particular atonement. Features Owen's Trilemma, exegesis of 9 key passages (John 10:11,15; John 17:9; Eph 5:25; Matt 1:21; Isa 53:11-12; Heb 9:28; Acts 20:28; 1 John 2:2; John 3:16), the surgeon analogy, the bridegroom metaphor, "Never Gives Up" banner, and related resource cards. ~816 lines, ~2,100 words of content. Scripture-first terminology throughout. Added to sitemap and ROADMAP.

### Current Page Count
- **192 HTML pages** (191 existing + 1 new)
- **Sitemap entries: ~192** (synced)

### Agent Assessment
- **Wordsmith** has polished 10 pages (index, start-here series, devotionals). ~180 pages remain untouched — this is the biggest quality gap.
- **Story Engine** still at 3 of 12 stories. Needs acceleration.
- **Psychology series** has hub + 1 page. 8 more planned pages not started.
- **Hub link gaps** persist (flagged by fleet-ops): questions.html missing 4 pages, analogies hub linking 0 analogy pages, systematic-theology hub missing 8 pages. These need dedicated attention.

### Top 3 Priorities for Next Run
1. **Fix hub link gaps** — Especially analogies-illustrations.html (links ZERO analogy pages despite 5 existing) and systematic-theology.html (missing 8 pages). These are navigation dead-ends.
2. **Build next apologetics page** — "Can You Lose Your Salvation?" (perseverance case) or "What About the Person Who Never Heard?" (Romans 1)
3. **Story Engine backlog** — "The Adoption Papers" or "The Voice in the Valley" — stories reach hearts that arguments miss

## 2026-03-28 — Inaugural Audit (Live Session with Aaron)

### State of the Operation
- **191 HTML pages** live on adoptedbygrace.net
- **13 active agents** (consolidated from 42 on 2026-03-28)
- **Netlify deploy: HEALTHY** — last deploy at 18:02 UTC, commit `efe25cb`, state "ready"
- **Site: adoptedbygrace.net** — live, SSL, custom domain, forms enabled

### Issues Found & Fixed
1. **systematic-salvation.html** — broken link to deleted `systematic-eschatology.html` → redirected to `systematic-ordo-salutis.html` ✅
2. **ROADMAP.md** — still references `systematic-eschatology.html` in 3 places (lines 55, 102, 180) — needs cleanup next run
3. **Git index.lock** — stale lock file exists on Aaron's local machine; sandbox cannot remove it. The git-janitor agent should handle this, but flagging for Aaron.

### Agent Performance Assessment
| Agent | Status | Output Quality | Notes |
|-------|--------|---------------|-------|
| content-builder | ✅ Active | HIGH | 4 new pages today (2tim1-9, titus3, 1peter1, revelation13) |
| content-refiner | ✅ Active | HIGH | Refining existing pages well |
| abg-wordsmith | ✅ Active | EXCELLENT | 6 pages polished today — prose quality is stunning |
| apologetics-expansion | ✅ Active | HIGH | Building demolition series |
| scripture-tsunami | ✅ Active | GOOD | 200+ verse database live |
| story-engine | ✅ Active | NEEDS MORE | Only 3 stories out of 12 planned |
| site-qa-enforcer | ✅ Active | EXCELLENT | 53 issues found and fixed in last session |
| architect-seo | ✅ Active | GOOD | SEO, performance work ongoing |
| fleet-operations | ✅ Active | GOOD | Preventing collisions |
| auto-push-site | ✅ Active | WORKING | Pushing every 30 min |
| abg-hymn-theologian | ✅ Active | AWAITING | Next run April 1 |
| abg-psychologist | ✅ Active | GOOD | Hub + flagship page built |
| daily-summary-email | ✅ Active | GOOD | Emailing Aaron weekdays |

### Content Gap Analysis (ROADMAP Backlog)
**HIGH PRIORITY unchecked items:**
- [ ] Stories: 9 of 12 not yet written (Adoption Papers, Voice in Valley, Dead City, Trial, Potter's House, etc.)
- [ ] Psychology series: 8 of 10 pages not yet written
- [ ] OT Election: 7 more characters (Noah, Abel/Cain, Isaiah's Servant, Jeremiah, Job, Jonah, Proverbs)
- [ ] Apologetics: 5 major objections still unanswered
- [ ] Devotionals: 4 more planned
- [ ] Scripture Tsunami v2-v4 enhancements
- [ ] The Five Solas page
- [ ] Redemptive History Timeline

### Infrastructure Gaps
- No shared CSS (every change replicated across 191 files)
- No analytics integration
- No email newsletter automation
- ROADMAP still references deleted eschatology page

### Top 3 Priorities for Next Run
1. Clean ROADMAP.md eschatology references
2. Build next story from backlog ("The Dead City" — regeneration allegory)
3. Check all 191 pages for missing global.css/global.js
