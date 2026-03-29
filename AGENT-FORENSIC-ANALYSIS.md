# Agent Fleet Forensic Analysis — 2026-03-28

## Scope
All 11 original agents analyzed (excluding abg-integrator and abg-evangelist, which were just built). Each agent's SKILL.md was read in full. This document catalogs every discrete responsibility, maps ownership, and identifies gaps, overlaps, and coverage holes.

---

## PART 1: AGENT-BY-AGENT RESPONSIBILITY CATALOG

### 1. ABG-BUILDER (Content Creator)
**Mission:** Create new content pages (question pages, doctrine pages, thematic content)
**Discrete responsibilities:**
- Read ROADMAP.md for highest-priority content backlog item
- Study existing design system from reference pages
- Build ONE complete new HTML page per session (question/doctrine pages)
- Include: full Scripture text, Greek/Hebrew analysis, 5-7 arguments, 5-7 objections answered, 3+ theologian quotes, meta tags, JSON-LD, canonical URL
- Update the hub page with a card for the new page
- Cross-reference 3-5 existing pages to link TO the new page
- Start a second page if compute remains
- Update ROADMAP.md session log
**Does NOT do:** Refine existing pages, stories, hymns, psychology, design, nav, SEO, deploy, distribution

### 2. ABG-REFINER (Content Polisher)
**Mission:** Refine and deepen existing content — strengthen arguments, fix errors, improve cross-references
**Discrete responsibilities:**
- Read ROADMAP.md for recently built pages or refinement backlog
- Deep refinement of ONE page: add 1-2 new arguments, 2+ new theologian quotes, strengthen objection responses, add 3+ cross-links, add "Further Reading" section
- Rewrite weak openings/conclusions
- Verify mega-menu nav on page before refining (update if old flat nav)
- Refine a SECOND page if compute remains
- Cross-reference audit: ensure every page links to 3-5 others
- Content consistency pass: ESV verification, Greek transliteration consistency, meta descriptions, internal link verification
- Update ROADMAP.md session log
**Does NOT do:** Create new pages, stories, design, nav enforcement, SEO, deploy, distribution

### 3. ABG-STORYTELLER (Narrative Creator)
**Mission:** Write original stories, parables, and thought experiments illuminating sovereign grace
**Discrete responsibilities:**
- Read ROADMAP.md for story assignments
- Study existing story page for design reference
- Read stories hub for card format
- Choose story from 5 categories: Children, Humor/Wit, Dark/Hard-Hitting, Tender/Pastoral, Thought Experiments
- Write ONE complete story page (1,500-3,000 words) with: category badge, reading time, "Doctrine Behind the Story" section, 3-5 Scripture references, cross-links, meta tags, JSON-LD
- Update stories hub with new card
- Write a SECOND story if compute remains
- Enhance stories hub (category filter tabs, featured story hero) if compute remains
**Does NOT do:** Question pages, doctrine pages, refinement, design, nav, SEO, deploy, distribution

### 4. ABG-HYMN-THEOLOGIAN (Hymn Analyst)
**Mission:** Build "Sovereign Grace in Song" hymn analysis series
**Discrete responsibilities:**
- Choose from prioritized hymn list (15 hymns across 3 tiers)
- Study existing design system from reference pages
- Build ONE complete hymn analysis page with: hero, story behind the hymn, full hymn text (including omitted verses), verse-by-verse theological analysis with Scripture cross-references, theology summary, "What Your Church Is Really Singing" section, author's own testimony quotes, cross-references, "Listen to This Hymn" section
- Build or update `hymns.html` hub page if it doesn't exist
- Cross-reference: link from theologian pages, question pages
- Start a second hymn page if compute remains
- Update ROADMAP.md session log
**Does NOT do:** Question pages, stories, psychology, refinement, design, nav, SEO, deploy, distribution

### 5. ABG-PSYCHOLOGIST (Psychology Content Creator)
**Mission:** Build pages exploring WHY people resist God's sovereignty — connecting psychology, neuroscience, philosophy, and Scripture
**Discrete responsibilities:**
- Choose from prioritized psychology topic list (10 topics across 2 tiers)
- Build ONE complete psychology page with: hero, "The Phenomenon" (observable reality), "The Science" (peer-reviewed research with named studies/researchers), "Scripture Saw It First" (theological pivot), "The Irony" (apologetic punchline), "Pastoral Application", "What This Means for the Objector", 3+ pull quotes, cross-references
- Build or update `psychology-hub.html` if it doesn't exist
- Cross-reference: link from secular-evidence hub, question pages, connections page
- Start a second psychology page if compute remains
- Update ROADMAP.md session log
**Does NOT do:** Question pages, stories, hymns, refinement, design, nav, SEO, deploy, distribution

### 6. ABG-VISIONARY (Creative Think-Tank)
**Mission:** Imagine new ideas, angles, metaphors, and strategic vision — THINKING session, not building
**Discrete responsibilities:**
- Read ROADMAP.md for full site state
- Read 3-5 existing pages deeply as a reader
- Generate ideas across 5 categories: New Content Concepts, Creative Angles/Metaphors, Design/Experience Ideas, Theological Deep Cuts, Strategic Vision
- Write all ideas to `VISION.md`
- Identify top 3-5 highest-impact ideas
- Add top ideas to appropriate ROADMAP.md backlog sections
- Update ROADMAP.md session log
**Does NOT do:** Build any pages, refine, design, nav, SEO, deploy, distribution — purely ideation

### 7. ABG-HARMONIZER (Navigation & Structure Enforcer)
**Mission:** Enforce mega-menu navigation across all pages, build missing hub pages, structural consistency
**Discrete responsibilities:**
- Audit EVERY page's navigation against canonical mega-menu HTML/CSS/JS
- Replace non-compliant nav on any page
- Verify logo says "Adopted by Grace" (title case)
- Verify hamburger mobile menu present
- Build missing hub pages referenced in nav (creeds-confessions, analogies-illustrations, secular-evidence)
- Broken link audit across all pages
- Fix broken links where fix is obvious
- Footer consistency enforcement
- Update ROADMAP.md session log
**Does NOT do:** Content creation, refinement, SEO meta tags, deploy, distribution

### 8. ABG-ARCHITECT (Technical Excellence & Fleet Optimization)
**Mission:** Improve design, UX, SEO, accessibility, technical quality. Also optimizes agent prompts and recommends new agents.
**Discrete responsibilities:**
- Read ROADMAP.md Architecture Backlog for highest-priority item
- Bring NEW pages up to technical standard: canonical URLs, OG tags, JSON-LD, sitemap entry, heading hierarchy
- SEO: JSON-LD structured data, meta description optimization, heading audit
- Accessibility: skip-to-content links, focus styles, ARIA labels, contrast
- UX: back-to-top button, reading progress bar, mobile nav, search, 404 page
- Performance: shared CSS extraction, font optimization, lazy loading
- Infrastructure: Netlify headers, redirects
- Apply changes across ALL pages consistently
- Technical audit of new content pages
- Site-wide quality scan (nav consistency, broken links, footer, HTML validation)
- **Agent prompt optimization**: read every agent's SKILL.md, evaluate and rewrite prompts
- **New agent recommendations**: identify fleet gaps, write recommendations, email to Aaron (or save to ARCHITECT-RECOMMENDATIONS.md)
- Update ROADMAP.md session log
**Does NOT do:** Create content pages, stories, hymns, psychology content, deploy

### 9. ABG-DESIGNER (Design & UX QA) — STATUS: DISABLED
**Mission:** Ensure every page is visually consistent, comfortable to read, properly responsive
**Discrete responsibilities (when active):**
- Audit EVERY page for: spacing/rhythm, typography consistency, color consistency, component consistency, mobile experience, visual polish, reading comfort
- Fix issues as found (not just report)
- Output: DESIGN-REPORT.md
- Priority: mobile spacing > design drift > component inconsistency > reading comfort > visual polish
- Update ROADMAP.md session log
**NOTE:** This agent is DISABLED (replaced by site-qa-enforcer per earlier conversation context). Its responsibilities may or may not be covered.

### 10. ABG-INSPECTOR (Functional Testing) — STATUS: DISABLED
**Mission:** Systematically test every link, button, dropdown, interactive element, and page behavior
**Discrete responsibilities (when active):**
- Test EVERY page for: navigation (mega-menu, dropdowns, hamburger, mobile), internal links, interactive elements (TULIP selector, quiz, back-to-top, progress bar, share buttons, accordions), forms & external links, page integrity (DOCTYPE, viewport meta, duplicate IDs, unclosed tags), asset verification (favicon, images, sitemap sync)
- Output: INSPECTION-REPORT.md
- Fix all Critical issues found
- Update ROADMAP.md session log
**NOTE:** This agent is DISABLED (replaced by site-qa-enforcer per earlier conversation context). Its responsibilities may or may not be covered.

### 11. ABG-DEPLOY (Deployer)
**Mission:** Deploy current state of website to Netlify production
**Discrete responsibilities:**
- Read ROADMAP.md to understand what changed today
- Quick sanity check: list HTML files, verify file count, read index.html briefly
- Deploy to Netlify using site ID `b141f13b-8829-4765-9f2b-cdfed3eec911`
- Update ROADMAP.md with deploy entry (date, time, success/failure)
**Does NOT do:** Anything else. Purely deployment.

---

## PART 2: RESPONSIBILITY MATRIX

| Responsibility | Owner(s) | Coverage |
|---|---|---|
| **CONTENT CREATION** | | |
| New question/doctrine pages | Builder | GOOD |
| New story/parable pages | Storyteller | GOOD |
| New hymn analysis pages | Hymn-Theologian | GOOD |
| New psychology pages | Psychologist | GOOD |
| New devotional pages | **NOBODY** | **GAP** |
| New analogy/illustration pages | **NOBODY** | **GAP** |
| New theologian biography pages | **NOBODY** | **GAP** |
| New church history pages | **NOBODY** | **GAP** |
| New OT election pages | **NOBODY** | **GAP** |
| New systematic theology pages | Builder (implied) | WEAK — Builder's prompt focuses on "question pages, doctrine pages" but doesn't explicitly target systematic-*.html |
| New demolition/apologetics pages | Builder (implied) | WEAK — same as above |
| New secular evidence pages | Psychologist (partial) | WEAK — Psychologist builds psychology-*.html but not other secular evidence angles |
| New creeds/confessions content | **NOBODY** | **GAP** |
| New pastoral/assurance pages | **NOBODY** | **GAP** |
| New comparison pages | **NOBODY** | **GAP** |
| New objection-answer pages | **NOBODY** | **GAP** |
| "Scripture Tsunami" content | **NOBODY** | **GAP** |
| Explore Map content/data | **NOBODY** | **GAP** |
| Quiz content | **NOBODY** | **GAP** |
| **CONTENT REFINEMENT** | | |
| Strengthen existing arguments | Refiner | GOOD |
| Add theologian quotes | Refiner | GOOD |
| Cross-reference weaving (content) | Refiner | GOOD |
| Prose quality / voice consistency | Refiner | MODERATE — no explicit voice/tone rubric in prompt |
| Content accuracy (Greek/Hebrew) | Refiner | MODERATE |
| Scripture quotation consistency (ESV) | Refiner | GOOD |
| **IDEATION & STRATEGY** | | |
| New content concepts | Visionary | GOOD |
| Creative angles/metaphors | Visionary | GOOD |
| Design/experience ideas | Visionary | GOOD |
| Strategic vision | Visionary | GOOD |
| **STRUCTURAL INTEGRITY** | | |
| Mega-menu nav enforcement | Harmonizer, Integrator | OVERLAP (both do this) |
| Broken link repair | Harmonizer, Integrator | OVERLAP (both do this) |
| Hub-to-child synchronization | Integrator | GOOD |
| Sitemap synchronization | Integrator | GOOD |
| Cross-reference weaving (structural) | Integrator | GOOD |
| Build missing hub pages | Harmonizer | GOOD |
| Footer consistency | Harmonizer | GOOD |
| Infrastructure pages (contact, privacy, terms) | Integrator | GOOD |
| **TECHNICAL EXCELLENCE** | | |
| SEO: JSON-LD, meta tags, headings | Architect | GOOD |
| SEO: title tag optimization | Evangelist | MODERATE |
| SEO: meta description optimization | Architect, Evangelist | OVERLAP |
| SEO: content gap identification | Evangelist | GOOD |
| Accessibility (skip-to-content, ARIA, contrast) | Architect | GOOD |
| UX (back-to-top, progress bar, search) | Architect | GOOD |
| Performance (CSS extraction, fonts, lazy loading) | Architect | GOOD |
| Infrastructure (Netlify headers, redirects) | Architect | GOOD |
| HTML validation | Architect (tertiary) | MODERATE |
| **DESIGN & VISUAL QA** | | |
| Spacing & rhythm consistency | **DISABLED** (Designer) | **GAP** — Designer is disabled |
| Typography consistency | **DISABLED** (Designer) | **GAP** |
| Color consistency / design drift | **DISABLED** (Designer) | **GAP** |
| Mobile experience QA | **DISABLED** (Designer) | **GAP** |
| Component consistency | **DISABLED** (Designer) | **GAP** |
| Visual polish (hover states, transitions) | **DISABLED** (Designer) | **GAP** |
| Reading comfort (max-width, line-height) | **DISABLED** (Designer) | **GAP** |
| **FUNCTIONAL TESTING** | | |
| Navigation testing | **DISABLED** (Inspector) | **GAP** — Inspector is disabled |
| Internal link testing | Integrator (partial) | MODERATE — Integrator checks links exist but doesn't test click behavior |
| Interactive element testing | **DISABLED** (Inspector) | **GAP** |
| Form testing | **DISABLED** (Inspector) | **GAP** |
| Page integrity (DOCTYPE, viewport, IDs) | **DISABLED** (Inspector) | **GAP** |
| Asset verification | **DISABLED** (Inspector) | **GAP** |
| **DISTRIBUTION & GROWTH** | | |
| Newsletter generation | Evangelist | GOOD |
| Social content generation | Evangelist | GOOD |
| SEO optimization (search-facing) | Evangelist | GOOD |
| Welcome email sequence | Evangelist | GOOD |
| Analytics monitoring | Evangelist (when analytics installed) | PENDING |
| **FLEET MANAGEMENT** | | |
| Agent prompt optimization | Architect | GOOD |
| New agent recommendations | Architect | GOOD |
| Fleet coordination / priority resolution | **NOBODY** | **GAP** — no agent resolves conflicts between agents |
| **DEPLOYMENT** | | |
| Netlify deployment | Deploy | GOOD |
| Pre-deploy sanity check | Deploy (minimal) | WEAK — only checks file count and index.html |
| Post-deploy verification | **NOBODY** | **GAP** |

---

## PART 3: CRITICAL FINDINGS

### A. CONTENT CREATION GAPS (8 categories with NO dedicated creator)

The site's navigation promises content in categories that NO agent is assigned to create:

1. **Devotionals** — `devotionals.html` hub exists, `devotional-*.html` pages exist, but NO agent creates new devotionals. The Builder builds question/doctrine pages. The Storyteller writes stories. The Hymn-Theologian writes hymn analyses. **Nobody writes devotionals.**

2. **Analogies & Illustrations** — Hub exists at `analogies-illustrations.html`, but NO agent creates `analogy-*.html` pages. The Storyteller writes stories (narrative), not analogies (conceptual illustrations).

3. **Theologian Biographies** — Hub at `theologians.html`, but NO agent creates `theologian-*.html` pages. The Hymn-Theologian only creates hymn analysis pages, not theologian bios.

4. **Church History** — Hub at `history-timeline.html`, but NO agent creates church history content.

5. **OT Election** — Hub at `ot-election.html`, but NO agent creates OT election deep-dive pages.

6. **Creeds & Confessions** — Hub at `creeds-confessions.html`, but NO agent creates content analyzing specific confessions (Westminster, Belgic, Canons of Dort, etc.)

7. **Pastoral/Assurance** — Hub at `pastoral-assurance.html`, but NO agent creates pastoral content specifically.

8. **Scripture Tsunami** — Page at `scripture-tsunami.html`, but NO agent is responsible for expanding or maintaining this "overwhelming evidence" compilation.

**Impact:** The site's navigation structure promises ~12 content categories, but only 4 have dedicated creators (questions/doctrine, stories, hymns, psychology). The Builder *could* theoretically create pages in any category, but its prompt explicitly focuses on "question pages, doctrine pages, or thematic content" — and its priority chain reads from a "Content Backlog (Builder Sessions)" section, meaning it only builds what's already in the backlog.

### B. DISABLED AGENTS WITH NO REPLACEMENT (CRITICAL)

The Designer and Inspector agents are listed as DISABLED (replaced by "site-qa-enforcer"). **However, there is NO `site-qa-enforcer` agent in the fleet.** This means:

- **ALL design QA responsibilities are uncovered** — spacing, typography, colors, mobile, visual polish
- **ALL functional testing responsibilities are uncovered** — interactive elements, forms, page integrity, asset verification

The Architect does *some* technical QA (HTML validation, nav consistency, broken links) but explicitly does NOT do visual design QA or interactive element testing.

**This is the single most dangerous gap in the fleet.** Pages could have broken interactive elements, terrible mobile layouts, or design drift — and no agent would catch it.

### C. OVERLAPS (Minor — Not Harmful)

1. **Nav enforcement:** Both Harmonizer and Integrator claim responsibility for mega-menu enforcement and broken link repair. This is redundant but not harmful — better double-covered than uncovered.

2. **SEO meta descriptions:** Both Architect and Evangelist optimize meta descriptions. Again, redundant but not harmful — they approach from different angles (Architect: technical compliance; Evangelist: click-through optimization).

3. **Cross-references:** Both Refiner and Integrator add cross-reference links between pages. Refiner does it as content enrichment; Integrator does it as structural wiring. Complementary, not conflicting.

### D. WEAK COVERAGE AREAS

1. **Builder's scope is too narrow.** The Builder is the primary content engine, but its prompt only mentions "question pages, doctrine pages, or thematic content." It should explicitly be able to create pages in ANY content category: devotionals, demolitions, comparisons, objections, systematic theology chapters, etc. — OR new specialized agents should be created for those categories.

2. **Pre-deploy verification is minimal.** The Deploy agent checks file count and reads index.html. It does NOT verify that links work, pages render, or the site is functional. With Designer and Inspector disabled, there is NO pre-deploy quality gate.

3. **Refiner has no voice/tone rubric.** The Refiner checks theological precision and cross-references but has no explicit rubric for the site's voice (Lewis + Spurgeon + Buechner warmth). It could refine a page's arguments while leaving flat, academic prose intact.

4. **No agent owns the Start Here journey.** `start-here.html` and the onboarding flow for new visitors is not in any agent's explicit responsibility list. This is the single most important page for conversion.

5. **No agent owns the About page.** Aaron's testimony (RE-FORMED) and the About page are not maintained by any agent.

6. **No agent owns the homepage (index.html).** The TULIP selector, hero content, featured sections — nobody is assigned to keep this updated as new content is published.

7. **Explore Map** (`explore-map.html`) — The JS-powered map page has no agent responsible for updating its data as new pages are created.

### E. FLEET COORDINATION GAP

No agent resolves conflicts or coordinates priorities between agents. If the Builder creates a page with a broken link and the Harmonizer fixes the link by removing it (rather than building the missing target), the Integrator might re-add the link. There's no tiebreaker or priority system. The Architect *recommends* fleet improvements but cannot enforce coordination.

---

## PART 4: RECOMMENDATIONS

### Priority 1 — CRITICAL: Re-enable QA Coverage
The Designer and Inspector are disabled with no replacement. Either:
- **Option A:** Re-enable both agents
- **Option B:** Create a single `abg-qa` agent that combines design QA + functional testing (recommended — one agent with two priority chains is more efficient than two agents)
- **Option C:** Fold visual QA into Architect's responsibilities (not recommended — Architect is already overloaded with 11 distinct tasks)

### Priority 2 — HIGH: Expand Builder's Scope or Create Category Agents
8 content categories have no creator. Either:
- **Option A:** Rewrite Builder's prompt to explicitly cycle through ALL content categories (devotionals, analogies, theologian bios, church history, OT election, creeds analysis, pastoral content, Scripture Tsunami) — making it a true "general content creator" with a rotating focus
- **Option B:** Create 2-3 new specialized agents (e.g., an "abg-devotionalist" for devotionals + pastoral, an "abg-historian" for theologians + church history + OT election + creeds)
- **Recommended:** Option A is more compute-efficient. Rename or re-scope Builder to be the universal content agent with an explicit category rotation.

### Priority 3 — MEDIUM: Add Pre-Deploy Quality Gate
The Deploy agent should run a basic automated check before deploying:
- Count HTML files and compare to previous deploy
- Grep for common errors (broken internal links, missing </html> tags)
- Verify sitemap entry count matches HTML file count
- Only then deploy

### Priority 4 — MEDIUM: Consolidate Harmonizer into Integrator
The Harmonizer and Integrator have significant overlap (nav enforcement, broken links, hub pages, structural consistency). The Integrator's prompt is more comprehensive and systematic. Consider:
- Merging Harmonizer's unique responsibilities (canonical nav CSS/JS templates, footer consistency) into Integrator
- Retiring Harmonizer
- Saving one agent's compute for other work

### Priority 5 — LOW: Add Homepage/Start-Here Maintenance
Assign explicit responsibility for keeping `index.html`, `start-here.html`, `about.html`, and `explore-map.html` updated as new content is published. This could be folded into the Integrator's responsibilities.

---

## PART 5: SUMMARY SCORECARD

| Category | Score | Notes |
|---|---|---|
| Doctrinal content creation | 7/10 | Strong for questions/stories/hymns/psychology; 8 categories uncovered |
| Content refinement | 8/10 | Refiner is solid; needs voice/tone rubric |
| Structural integrity | 9/10 | Integrator + Harmonizer (some overlap but well-covered) |
| Technical excellence | 8/10 | Architect covers SEO, a11y, performance well |
| Design QA | 1/10 | **CRITICAL: Designer disabled, no replacement** |
| Functional testing | 1/10 | **CRITICAL: Inspector disabled, no replacement** |
| Distribution & growth | 9/10 | Evangelist covers newsletters, social, SEO, email sequences |
| Fleet management | 7/10 | Architect optimizes prompts; no coordination mechanism |
| Deployment | 6/10 | Works but minimal pre-deploy checks |
| Strategic ideation | 8/10 | Visionary is well-designed |
| **Overall fleet health** | **6.4/10** | Dragged down by disabled QA agents with no replacement |

---

*Analysis performed 2026-03-28 by forensic audit of all 11 agent SKILL.md files.*
