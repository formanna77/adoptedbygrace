# Agent Fleet Map — adoptedbygrace.net
> Last updated: 2026-03-30 (v13 — MEGA-AGENT CONSOLIDATION: 16 agents → 5 mega-agents maximizing 200K context windows)

## Fleet Overview (5 Mega-Agents + 4 Utility Tasks)

| Agent | Role | Absorbed From | Cadence |
|-------|------|--------------|---------|
| **THE CREATOR** | ALL content creation: doctrine, healing, stories, psychology, testimony, every category | builder, builder-2, storyteller, psychologist | 8x/day (every 3hrs) |
| **THE ENHANCER** | ALL content improvement: deepens, polishes, force-multiplies | refiner, wordsmith, force-multiplier | 4x/day |
| **THE GUARDIAN** | ALL site integrity + QA + deployment | integrator, site-qa-enforcer, design-enforcer, deploy | 2x/day (5am, 5pm) |
| **THE STRATEGIST** | ALL intelligence + strategy + optimization + technical excellence | catalyst, visionary, overseer, architect | 1x/day (8am) |
| **THE EVANGELIST** | ALL growth + distribution: Substack, social, SEO, scripts, outreach | evangelist (expanded) | 1x/day (8pm) |

### Utility Tasks (Still Active)
| Task | Role | Cadence |
|------|------|---------|
| **auto-push-site** | Rebuild search index + mega-menu, commit & push | Every 30 min |
| **daily-summary-email** | Activity report emailed to Aaron | 1x/day (5pm) |
| **analytics-feedback-loop** | Scrape Netlify, write ANALYTICS.md | Sundays 8pm |
| **scheduler-monitor** | Track missed/late runs, maintain health log | 1x/day (10am) |
| **log-gardener** | Trim logs, archive old roadmap entries | Sundays 11pm |

### Manual-Only Tasks
| Task | Role |
|------|------|
| **fix-404s** | Scrape Netlify 404 analytics and fix broken resources |
| **nightwatch-qa** | Visual rendering QA via Chrome MCP (requires browser) |

## Pipeline Flow
```
Content Creation:
  THE CREATOR builds 2-3 complete pages per run (8x/day = 16-24 pages/day potential)
    → THE ENHANCER runs 5-step pipeline: Diagnose → Deepen → Polish → Force-Multiply → Devotional

Infrastructure:
  THE GUARDIAN handles ALL integrity in one pass per page:
    Broken links → Hub sync → Sitemap → Nav → Footer → Cross-refs → Functional testing → Design QA → Deploy

Intelligence:
  THE STRATEGIST reads the whole site, scores quality, generates vision, optimizes SEO/a11y/performance,
    then rewrites Creator and Enhancer prompts so the fleet evolves every day

Distribution:
  THE EVANGELIST packages content for Substack, social, video/audio, outreach, seasonal calendar
```

## Why 5 Mega-Agents?

**Before (16 agents):**
- Each agent used ~20-40K of its 200K context window
- 3 agents (refiner, wordsmith, force-multiplier) all touched the same files → edit conflicts
- 3 agents (integrator, QA, design-enforcer) all scanned every page separately → redundant reads
- Hourly scheduling collisions despite one-agent-per-hour policy

**After (5 mega-agents):**
- Each agent uses its FULL 200K context window
- Zero edit conflicts — one agent owns content improvement, one owns integrity
- Zero redundant reads — Guardian reads each page once and runs all checks
- 16 runs/day across 24 hours with clean separation
- MORE total work done with FEWER agents

## Schedule (24-Hour View)
```
00:00  THE CREATOR (run 1/8)
01:00  THE ENHANCER (run 1/4)
03:00  THE CREATOR (run 2/8)
05:00  THE GUARDIAN (run 1/2) — morning integrity sweep + deploy
06:00  THE CREATOR (run 3/8)
07:00  THE ENHANCER (run 2/4)
08:00  THE STRATEGIST (run 1/1) — daily intelligence + optimization
09:00  THE CREATOR (run 4/8)
10:00  scheduler-monitor
12:00  THE CREATOR (run 5/8)
13:00  THE ENHANCER (run 3/4)
15:00  THE CREATOR (run 6/8)
17:00  THE GUARDIAN (run 2/2) — evening integrity sweep + deploy
        daily-summary-email
18:00  THE CREATOR (run 7/8)
19:00  THE ENHANCER (run 4/4)
20:00  THE EVANGELIST (run 1/1) — daily distribution
21:00  THE CREATOR (run 8/8)
```

## Disabled Agents (Consolidated into Mega-Agents 2026-03-30)
| Old Agent | Now Part Of |
|-----------|-------------|
| abg-builder | THE CREATOR |
| abg-builder-2 | THE CREATOR |
| abg-storyteller | THE CREATOR |
| abg-psychologist | THE CREATOR |
| abg-refiner | THE ENHANCER |
| abg-wordsmith | THE ENHANCER |
| abg-force-multiplier | THE ENHANCER |
| abg-integrator | THE GUARDIAN |
| site-qa-enforcer | THE GUARDIAN |
| design-enforcer | THE GUARDIAN |
| abg-deploy | THE GUARDIAN |
| abg-catalyst | THE STRATEGIST |
| abg-visionary | THE STRATEGIST |
| overseer | THE STRATEGIST |
| abg-architect | THE STRATEGIST |

## Content Categories Covered (All by THE CREATOR)

| Category | File Pattern |
|----------|-------------|
| Devotionals | `devotional-*.html` |
| Analogies | `analogy-*.html` |
| Theologian Bios | `theologian-*.html` |
| Questions/Doctrine | `question-*.html` |
| Demolition Zone | `demolition-*.html` |
| Objections Answered | `objection-*.html` |
| Systematic Theology | `systematic-*.html` |
| Comparisons | `compare-*.html` |
| Pastoral/Assurance | `pastoral-*.html` |
| Creeds & Confessions | `creed-*.html` |
| Church History | `history-*.html` |
| OT Election | `ot-election-*.html` |
| Secular Evidence | `secular-*.html` |
| Scripture Tsunami | `scripture-tsunami-*.html` |
| Stories | `story-*.html` |
| Testimonies | `testimony-*.html` |
| Psychology | `psychology-*.html` |
| Healing | `healing-*.html` |
| Why We Resist | `resistance-*.html` |
| *(new categories welcome)* | *(Strategist invents, Creator builds)* |

## Mandatory Directives (ALL Agents)
1. **BANNED:** No resources pages, no email signup forms, no community pages
2. **Scripture-first language:** "Scripture teaches" not "Calvinism says"
3. **Brilliant connections:** Human realities → biblical truths → lights turning on
4. **Creative humor:** Woven naturally, not forced
5. **Writing standard:** Lewis + Spurgeon + Buechner + Edwards. Brevity over bloat.
6. **No git operations:** Agents must NOT run `git add/commit/push`. Auto-push handles it.
7. **Max compute:** Every agent uses ALL available compute. No stopping early.
8. **101 Ways Principle:** Every page is a doorway for a specific type of person

## File Locations
- Agent SKILL.md files: `Claude/Scheduled/`
- Website files: `/Users/aaronforman/Documents/adoptedbygracewebsite/`
- Roadmap: `ROADMAP.md`
- Vision notes: `VISION.md`
- Objection tracker: `OBJECTION-TRACKER.md`
- Devotional queue: `DEVOTIONAL-QUEUE.md`
- Newsletter queue: `NEWSLETTER-QUEUE.md`
- Social queue: `SOCIAL-QUEUE.md`
- SEO queue: `SEO-QUEUE.md`
- Distribution log: `DISTRIBUTION-LOG.md`
- QA report: `QA-REPORT.md`
- Integrity log: `INTEGRITY-LOG.md`
