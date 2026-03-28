# Agent Fleet Map — adoptedbygrace.net
> Last updated: 2026-03-28 (v4 — Added abg-hymn-theologian + abg-psychologist)

## Fleet Overview (10 Active Agents)

| Agent | Role | Primary Output | Cadence |
|-------|------|---------------|---------|
| **abg-builder** | Create new content pages | HTML pages (questions, OT studies, etc.) | 2x/month |
| **abg-refiner** | Deepen & polish existing pages | Improved arguments, quotes, cross-refs | Weekly |
| **abg-harmonizer** | Navigation sync + missing hub pages | Mega-menu enforcement, new hubs | As needed |
| **site-qa-enforcer** | SUPER-AGENT: tests every link, button, element + design/spacing on desktop & mobile | QA-REPORT.md + immediate fixes | Every 2 hours |
| **abg-architect** | Technical excellence (SEO, a11y, UX, perf) + optimize agent prompts + recommend new agents | Site-wide tech improvements + improved SKILL.md files + email to Aaron | 1x/month |
| **abg-storyteller** | Original stories, parables, narratives | Story HTML pages across 5 categories | 2x/month |
| **abg-visionary** | Creative ideation & strategic planning | VISION.md ideas, ROADMAP backlog items | Monthly |
| **abg-deploy** | Publish to Netlify production | Live deployment | After each session |
| **abg-hymn-theologian** | "Sovereign Grace in Song" hymn analysis series | Hymn analysis HTML pages + hymns hub | 2x/month |
| **abg-psychologist** | Psychology of resistance to sovereignty | Psychology HTML pages + psychology hub | 2x/month |

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
- **Secondary:** Build missing hub pages (secular-evidence, analogies-illustrations, creeds-confessions)
- **Tertiary:** Broken link audit, footer consistency
- Run this agent before major content pushes to ensure structural integrity

### site-qa-enforcer (replaces abg-inspector + abg-designer)
- **Combined functional testing AND design QA super-agent**
- Runs every 2 hours — relentless, continuous quality enforcement
- **Functional:** Tests every link, every dropdown, every button, every interactive element, every form, every nav on every page. Verifies all hrefs resolve to real files. Checks JS event handlers match HTML targets.
- **Design:** Checks mobile spacing (the #1 problem), typography, color system compliance, component consistency, responsive breakpoints, tap targets, viewport overflow
- **Both desktop and mobile contexts** — verifies CSS media queries exist and are correct at 768px and 480px
- Maintains running QA-REPORT.md with defect log, tracks progress across sessions
- **Fixes everything it finds immediately** — does not just report
- Goal: ZERO DEFECTS. Aaron should never find another issue on his phone.

### abg-architect (REVISED — 2026-03-28)
- All original technical work RETAINED: SEO, accessibility, UX, performance, consistency enforcement
- Brings new pages to technical standard (canonical URLs, JSON-LD, meta tags, sitemap)
- Implements site-wide improvements across all 176+ pages
- **Mega-menu enforcement** is high priority for any pages still using old nav
- **ADDED:** Every session, reads and optimizes all other agents' SKILL.md prompts for maximum output quality
- **ADDED:** Evaluates fleet workflow gaps, emails recommendations for new agents to Aaron (formanna77@gmail.com)
- **REMOVED:** Does NOT create new agents. Only recommends — Aaron approves.

### abg-storyteller
- Writes original stories/parables illuminating sovereign grace
- 5 categories: Children, Humor, Dark, Tender, Thought Experiments
- 1,500-3,000 words per story with doctrine section at end
- Updates stories.html hub with new cards

### abg-visionary
- Pure ideation — does NOT build pages
- Generates ideas across 5 categories (content, creative angles, design, theological deep cuts, strategy)
- Outputs to VISION.md, top ideas go to ROADMAP backlog
- Run monthly to keep the creative pipeline full

### abg-deploy
- Deploys to Netlify (site ID: b141f13b-8829-4765-9f2b-cdfed3eec911)
- Sanity check before deploy (file count, index.html integrity)
- Logs deployment status to ROADMAP

### abg-hymn-theologian (NEW — 2026-03-28)
- Builds the "Sovereign Grace in Song" series — hymn analysis pages showing how beloved hymns are Reformed confessions
- Each page: full hymn text, verse-by-verse theological analysis with Scripture cross-references, author biography/testimony, "What Your Church Is Really Singing" pastoral section
- Creates and maintains `hymns.html` hub page
- 15 hymns queued across Reformation Era, 18th Century Revival, 19th Century, Modern
- **Why this matters:** Most viral, shareable content type. People who'd never read a theology article will read an analysis of "Amazing Grace." The hymn already lives in their heart — this agent turns on the lights.
- Priority list: Amazing Grace → A Mighty Fortress → And Can It Be → Come Thou Fount → It Is Well

### abg-psychologist (NEW — 2026-03-28)
- Builds pages exploring WHY people resist God's sovereignty — connecting psychology, neuroscience, philosophy to Scripture
- Each page: observable phenomenon, peer-reviewed science, "Scripture Saw It First" theological pivot, pastoral application
- Creates and maintains `psychology-hub.html`
- 10 topics queued from cognitive biases to terror management theory
- **Why this matters:** Most Reformed apologetics addresses WHAT Scripture teaches. This addresses WHY people resist it — and shows the resistance itself is evidence for the Reformed position. Reaches academics, skeptics, psychology students.
- Priority list: Why We Resist (flagship) → Autonomy Illusion → Cognitive Biases → Offense of Grace → Suppressing Truth

## Suggested Run Order
1. **Builder** → creates new pages
2. **Refiner** → deepens new + existing pages
3. **Harmonizer** → ensures nav consistency after new pages added
4. **QA Enforcer** → tests every link, function, AND design element on desktop + mobile (runs continuously every 2 hours)
5. **Deploy** → push to production
6. **Architect** → monthly prompt optimization + gap analysis + email to Aaron
7. **Visionary** → monthly ideation (independent of build cycle)
8. **Storyteller** → independent creative sessions (2x/month)
9. **Hymn Theologian** → independent creative sessions (2x/month)
10. **Psychologist** → independent creative sessions (2x/month)

## Quality Gate
**QA Enforcer runs every 2 hours**, continuously finding and fixing issues. Deploy should check QA-REPORT.md for any critical unfixed issues before pushing.

## Navigation Standard
ALL agents must produce pages with the **mega-menu navigation** (dropdowns for Doctrine, Apologetics, Explore, and History). The canonical reference is `index.html`. Logo text: `Adopted by Grace` (title case). Old flat 4-link nav is DEPRECATED.

## Content Dimensions Covered
The fleet now addresses all five dimensions Aaron requires:
- **Content/Doctrine:** Builder, Refiner, Architect
- **Engagement/Heart:** Storyteller, Hymn Theologian, Devotionals (via Builder)
- **Secular Evidence/Mind:** Psychologist, Builder (secular evidence pages)
- **Resources/Community:** Builder (resources pages), Visionary (strategic planning)
- **Structural/Technical:** Harmonizer, QA Enforcer, Architect, Deploy

## File Locations
- Agent SKILL.md files: `/Users/aaronforman/Documents/adoptedbygracewebsite/Claude/Scheduled/`
- Website files: `/Users/aaronforman/Documents/adoptedbygracewebsite/`
- Roadmap: `/Users/aaronforman/Documents/adoptedbygracewebsite/ROADMAP.md`
- Vision notes: `/Users/aaronforman/Documents/adoptedbygracewebsite/VISION.md`
