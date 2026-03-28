# Agent Fleet Map — adoptedbygrace.net
> Last updated: 2026-03-28 (v2 — Inspector & Designer added, Architect role changed)

## Fleet Overview (9 Agents)

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

### site-qa-enforcer (NEW — 2026-03-28, replaces abg-inspector + abg-designer)
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
- Implements site-wide improvements across all 110+ pages
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

## Suggested Run Order
1. **Builder** → creates new pages
2. **Refiner** → deepens new + existing pages
3. **Harmonizer** → ensures nav consistency after new pages added
4. **QA Enforcer** → tests every link, function, AND design element on desktop + mobile (runs continuously every 2 hours)
5. **Deploy** → push to production
7. **Architect** → monthly prompt optimization + gap analysis + email to Aaron
8. **Visionary** → monthly ideation (independent of build cycle)
9. **Storyteller** → independent creative sessions (2x/month)

## Quality Gate
**QA Enforcer runs every 2 hours**, continuously finding and fixing issues. Deploy should check QA-REPORT.md for any critical unfixed issues before pushing.

## Navigation Standard
ALL agents must produce pages with the **mega-menu navigation** (dropdowns for Doctrine, Apologetics, Explore, and History). The canonical reference is `index.html`. Logo text: `Adopted by Grace` (title case). Old flat 4-link nav is DEPRECATED.

## File Locations
- Agent SKILL.md files: `/Users/aaronforman/Documents/adoptedbygracewebsite/Claude/Scheduled/`
- Website files: `/Users/aaronforman/Documents/adoptedbygracewebsite/`
- Roadmap: `/Users/aaronforman/Documents/adoptedbygracewebsite/ROADMAP.md`
- Vision notes: `/Users/aaronforman/Documents/adoptedbygracewebsite/VISION.md`
