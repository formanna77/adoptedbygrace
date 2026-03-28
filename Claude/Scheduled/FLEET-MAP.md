# Agent Fleet Map — adoptedbygrace.net
> Last updated: 2026-03-28 (v5 — Added abg-hymn-theologian, abg-psychologist, abg-wordsmith)

## Fleet Overview (11 Active Agents)

| Agent | Role | Primary Output | Cadence |
|-------|------|---------------|---------|
| **abg-builder** | Create new content pages | HTML pages (questions, OT studies, etc.) | 2x/month |
| **abg-refiner** | Deepen & polish existing pages | Improved arguments, quotes, cross-refs | Weekly |
| **abg-harmonizer** | Navigation sync + missing hub pages | Mega-menu enforcement, new hubs | As needed |
| **site-qa-enforcer** | SUPER-AGENT: tests every link, button, element + design/spacing on desktop & mobile | QA-REPORT.md + immediate fixes | Every 2 hours |
| **abg-architect** | Technical excellence (SEO, a11y, UX, perf) + optimize agent prompts + recommend new agents | Site-wide tech improvements + improved SKILL.md files | 1x/month |
| **abg-storyteller** | Original stories, parables, narratives | Story HTML pages across 5 categories | 2x/month |
| **abg-visionary** | Creative ideation & strategic planning | VISION.md ideas, ROADMAP backlog items | Monthly |
| **abg-deploy** | Publish to Netlify production | Live deployment | After each session |
| **abg-hymn-theologian** | "Sovereign Grace in Song" hymn analysis series | Hymn analysis HTML pages + hymns hub | 2x/month |
| **abg-psychologist** | Psychology of resistance to sovereignty | Psychology HTML pages + psychology hub | 2x/month |
| **abg-wordsmith** | Master prose optimizer + daily devotional writer | Polished pages + DEVOTIONAL-QUEUE.md | Every 3 hours |

## Pipeline Flow
```
Builder/Storyteller/HymnTheologian/Psychologist CREATE content
  → Refiner DEEPENS it
  → Wordsmith POLISHES prose to literary masterpiece
  → Harmonizer ensures nav consistency
  → QA Enforcer tests everything
  → Architect optimizes tech
  → Deploy publishes
```

## Agent Responsibilities

### abg-builder
- Reads ROADMAP backlog, picks highest-priority unchecked item
- Builds ONE complete page to maximum depth (5-7 arguments, 5-7 objections, Greek/Hebrew, theologian quotes)
- Updates hub page with new card
- Cross-references to related pages
- **Must use mega-menu navigation** on all new pages

### abg-refiner
- Targets newest Builder output first, then weakest pages
- Adds 1-2 new arguments, 2+ theologian quotes, 3+ cross-references per page
- Fixes Greek errors, weak conclusions, missing "Further Reading"
- **Checks for mega-menu nav** before content work; upgrades if needed

### abg-harmonizer
- **Primary:** Enforce mega-menu navigation across ALL pages
- **Secondary:** Build missing hub pages
- **Tertiary:** Broken link audit, footer consistency
- Run this agent before major content pushes to ensure structural integrity

### site-qa-enforcer (replaces abg-inspector + abg-designer)
- Combined functional testing AND design QA super-agent
- Runs every 2 hours — relentless, continuous quality enforcement
- **Functional:** Tests every link, dropdown, button, interactive element. Verifies all hrefs resolve to real files.
- **Design:** Mobile spacing, typography, color system, responsive breakpoints, tap targets
- Maintains QA-REPORT.md with defect log
- **Fixes everything it finds immediately**
- Goal: ZERO DEFECTS

### abg-architect
- SEO, accessibility, UX, performance, consistency enforcement
- Brings new pages to technical standard (canonical URLs, JSON-LD, meta tags, sitemap)
- Every session: reads and optimizes all agents' SKILL.md prompts
- Evaluates fleet gaps, emails recommendations to Aaron (formanna77@gmail.com)
- Does NOT create new agents — only recommends

### abg-storyteller
- Writes original stories/parables illuminating sovereign grace
- 5 categories: Children, Humor, Dark, Tender, Thought Experiments
- 1,500-3,000 words per story with doctrine section at end
- Updates stories.html hub with new cards

### abg-visionary
- Pure ideation — does NOT build pages
- Generates ideas across 5 categories (content, creative angles, design, theological deep cuts, strategy)
- Outputs to VISION.md, top ideas go to ROADMAP backlog

### abg-deploy
- Deploys to Netlify (site ID: b141f13b-8829-4765-9f2b-cdfed3eec911)
- Sanity check before deploy (file count, index.html integrity)
- Logs deployment status to ROADMAP

### abg-hymn-theologian (NEW — 2026-03-28)
- Builds "Sovereign Grace in Song" series — hymn analysis pages
- Each page: full hymn text, verse-by-verse theological analysis, author biography/testimony, "What Your Church Is Really Singing" pastoral section
- Creates/maintains `hymns.html` hub page
- 15 hymns queued: Amazing Grace → A Mighty Fortress → And Can It Be → Come Thou Fount → It Is Well → How Great Thou Art → Before the Throne → Rock of Ages → When I Survey → O Sacred Head + 5 more
- **Why:** Most viral, shareable content type. Bypasses intellectual defenses.

### abg-psychologist (NEW — 2026-03-28)
- Builds pages exploring WHY people resist God's sovereignty
- Connects cognitive science, neuroscience, philosophy to Scripture
- Each page: phenomenon → peer-reviewed science → "Scripture Saw It First" → pastoral application
- Creates/maintains `psychology-hub.html`
- 10 topics: Why We Resist → Autonomy Illusion → Cognitive Biases → Offense of Grace → Suppressing Truth → Dead Cannot Choose → Terror Management → Idol Factory → Moral Self-Image → Theological Tribalism
- **Why:** Addresses the resistance itself as evidence for the Reformed position. Reaches academics/skeptics.

### abg-wordsmith (NEW — 2026-03-28)
- Master prose optimizer — rewrites all pages into world-class literary theology
- Also writes daily devotionals for newsletter subscriber list
- Tracks progress in WORDSMITH-LOG.md (never re-optimizes same page)
- Devotionals go to DEVOTIONAL-QUEUE.md
- Priority: index → start-here → devotionals → questions → demolitions → systematic → everything else
- **Why:** Content quality is the moat. Every word should be Shakespeare's grandeur + Lewis's accessibility + Edwards's thunder.

## Content Dimensions Covered
The fleet now addresses ALL five dimensions Aaron requires:
- **Content/Doctrine:** Builder, Refiner, Architect
- **Engagement/Heart:** Storyteller, Hymn Theologian, Devotionals (via Builder + Wordsmith)
- **Secular Evidence/Mind:** Psychologist, Builder (secular evidence pages)
- **Resources/Community:** Builder (resources pages), Visionary (strategic planning)
- **Structural/Technical:** Harmonizer, QA Enforcer, Architect, Deploy
- **Prose Excellence:** Wordsmith (polishes everything)

## DISABLED: abg-inspector, abg-designer (replaced by site-qa-enforcer)

## Navigation Standard
ALL agents must produce pages with the **mega-menu navigation** (dropdowns for Doctrine, Apologetics, Explore, and History). Logo text: `Adopted by Grace` (title case). Old flat 4-link nav is DEPRECATED.

## File Locations
- Agent SKILL.md files: `/Users/aaronforman/Documents/adoptedbygracewebsite/Claude/Scheduled/`
- Website files: `/Users/aaronforman/Documents/adoptedbygracewebsite/`
- Roadmap: `/Users/aaronforman/Documents/adoptedbygracewebsite/ROADMAP.md`
- Vision notes: `/Users/aaronforman/Documents/adoptedbygracewebsite/VISION.md`
- Wordsmith tracking: `WORDSMITH-LOG.md`
- Devotional queue: `DEVOTIONAL-QUEUE.md`
- QA defect log: `QA-REPORT.md`
