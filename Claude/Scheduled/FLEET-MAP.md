# Agent Fleet Map — adoptedbygrace.net
> Last updated: 2026-03-28 (v10 — Catalyst agent created: closed-loop evolution engine that reads the site, scores pages, and rewrites agent prompts so the fleet self-improves)

## Fleet Overview (13 Active + 4 Disabled)

| Agent | Role | Primary Output | Cadence |
|-------|------|---------------|---------|
| **abg-builder** | Universal content creator (ALL categories) | HTML pages across 14 content categories | 2x/day (7am & 7pm) |
| **abg-refiner** | Deepen & strengthen existing pages | Improved arguments, quotes, cross-refs | 2x/day (10am & 10pm) |
| **abg-wordsmith** | Prose optimizer + devotional writer | Polished pages + DEVOTIONAL-QUEUE.md | Every 3 hours |
| **abg-storyteller** | Original stories, parables, narratives | Story HTML pages across 5 categories | Daily (9am) |
| **abg-psychologist** | Psychology of resistance to sovereignty | Psychology HTML pages + psychology hub | 2x/month (8th & 22nd) |
| **abg-visionary** | Creative ideation & strategic planning | VISION.md ideas, ROADMAP backlog items | Daily (6am) |
| **abg-integrator** | Site integrity: links, hubs, sitemap, nav, footers, key pages | INTEGRITY-LOG.md + structural fixes | Every 4 hours |
| **site-qa-enforcer** | Functional testing + design QA | QA-REPORT.md + immediate fixes | 3x/day |
| **abg-architect** | Technical excellence (SEO, a11y, UX, perf) + fleet optimization | Tech improvements + optimized SKILL.md files | Mondays 11am |
| **abg-evangelist** | Growth & distribution: newsletters, social, SEO | NEWSLETTER-QUEUE.md + SOCIAL-QUEUE.md + SEO-QUEUE.md | Every 6 hours |
| **abg-deploy** | Pre-deploy checks + Netlify deployment | Live deployment | Daily (10pm) |
| **abg-catalyst** | Closed-loop evolution engine — reads site as visitor, scores pages, rewrites agent prompts | CATALYST-LOG.md + evolved SKILL.md files | Daily (8am) |
| **Overseer** | Master QC, gap-filler, project manager | Cross-agent coordination | 5x/day |

## Disabled Agents
| Agent | Reason | Replaced By |
|-------|--------|-------------|
| **abg-harmonizer** | Absorbed into abg-integrator (2026-03-28) | abg-integrator |
| **abg-designer** | Replaced by site-qa-enforcer (2026-03-28) | site-qa-enforcer |
| **abg-inspector** | Replaced by site-qa-enforcer (2026-03-28) | site-qa-enforcer |
| **abg-hymn-theologian** | Eliminated by Aaron (2026-03-28) — content not worth pursuing | N/A |

## Pipeline Flow
```
Content Creation:
  Builder / Storyteller / Psychologist CREATE pages
    → Refiner DEEPENS arguments, adds theologian voices, strengthens objections
    → Wordsmith POLISHES prose to literary masterpiece + writes devotionals

Infrastructure:
  Integrator WIRES pages into the site (hubs, sitemap, cross-links, nav, footers, key pages)
    → QA Enforcer TESTS everything (functional + design) and fixes defects
    → Architect OPTIMIZES tech (SEO, a11y, UX, perf) + tunes agent prompts

Distribution:
  Evangelist DISTRIBUTES content (newsletters, social, SEO optimization)
    → Deploy VERIFIES health + publishes to Netlify

Strategy & Evolution:
  Visionary IMAGINES what's next → feeds ROADMAP backlog for all agents
  Catalyst READS the site as a visitor → scores pages → rewrites agent prompts → fleet evolves
  Overseer coordinates the fleet 5x/day
```

## Agent Responsibilities (Surgical Summary)

### Content Agents
| Agent | Creates | Does NOT |
|-------|---------|----------|
| **Builder** | Pages in ALL 14 categories (devotionals, analogies, theologians, questions, demolitions, systematic, comparisons, pastoral, creeds, history, OT election, secular evidence, Scripture Tsunami, objections) | Fix nav, SEO, test, polish prose |
| **Refiner** | Strengthened arguments, theologian quotes, cross-refs, consistency checks | Create new pages, fix nav, SEO, prose style |
| **Wordsmith** | Literary-quality prose rewrites, daily devotionals | Create new pages, add arguments, fix nav |
| **Storyteller** | Stories/parables across 5 categories (children, humor, dark, tender, thought experiments) — DAILY | Question pages, nav, hub features |
| **Psychologist** | Psychology-of-resistance pages + psychology hub | Other content types, nav |
| **Visionary** | Ideas in VISION.md, ROADMAP backlog items | Build any pages |

### Operations Agents
| Agent | Owns | Does NOT |
|-------|------|----------|
| **Integrator** | Broken links, hub sync, sitemap sync, nav enforcement, footer consistency, cross-ref weaving, key page maintenance, infrastructure pages | Create content, SEO, test interactive elements |
| **QA Enforcer** | Functional testing (links, nav, interactive elements, page integrity) + design QA (spacing, typography, colors, mobile, components) | Create content, refine arguments, SEO |
| **Architect** | SEO, accessibility, UX, performance, agent prompt optimization, fleet recommendations | Create content, fix nav/links, design QA |
| **Evangelist** | Newsletter drafts, social snippets, SEO title/meta optimization, welcome email sequence, analytics | Create pages, fix nav/links, test |
| **Deploy** | Pre-deploy health checks + Netlify deployment | Everything else |
| **Catalyst** | Read site as visitor, score pages 0-10 on 7 dimensions, identify patterns, rewrite agent prompts, competitive intel | Create content, fix nav/links, test |
| **Overseer** | Audit agent output, fill gaps, enforce standards, maintain ROADMAP, coordinate fleet | Create content, override agent prompts |

## Content Categories Covered

All 14 content categories have a creator (Builder rotates through the thinnest category):

| Category | File Pattern | Creator |
|----------|-------------|---------|
| Devotionals | `devotional-*.html` | Builder |
| Analogies | `analogy-*.html` | Builder |
| Theologian Bios | `theologian-*.html` | Builder |
| Questions/Doctrine | `question-*.html` | Builder |
| Demolition Zone | `demolition-*.html` | Builder |
| Objections Answered | `objection-*.html` | Builder |
| Systematic Theology | `systematic-*.html` | Builder |
| Comparisons | `compare-*.html` | Builder |
| Pastoral/Assurance | `pastoral-*.html` | Builder |
| Creeds & Confessions | `creed-*.html` | Builder |
| Church History | `history-*.html` | Builder |
| OT Election | `ot-election-*.html` | Builder |
| Secular Evidence | `secular-*.html` | Builder + Psychologist |
| Scripture Tsunami | `scripture-tsunami-*.html` | Builder |
| Stories | `story-*.html` | Storyteller |
| Psychology | `psychology-*.html` | Psychologist |

## Mandatory Directives (ALL Agents)
1. **BANNED:** No resources section content. All content must be ORIGINAL to adoptedbygrace.net.
2. **Scripture-first language:** "Scripture teaches" not "Calvinism says." No Reformed/TULIP labels.
3. **Brilliant connections:** Human realities → biblical truths → lights turning on.
4. **Creative humor:** Woven naturally, not forced.
5. **Writing standard:** Lewis's clarity, Spurgeon's fire, Buechner's beauty. Brevity over bloat.
6. **No git operations:** Agents must NOT run `git add`, `git commit`, or `git push`. Hourly auto-push handles all commits.
7. **Max compute:** Every agent uses ALL available compute. No stopping early.

## File Locations
- Agent SKILL.md files: `Claude/Scheduled/`
- Website files: `/Users/aaronforman/Documents/adoptedbygracewebsite/`
- Roadmap: `ROADMAP.md`
- Vision notes: `VISION.md`
- Wordsmith tracking: `WORDSMITH-LOG.md`
- Devotional queue: `DEVOTIONAL-QUEUE.md`
- QA defect log: `QA-REPORT.md`
- Integrity log: `INTEGRITY-LOG.md`
- Newsletter queue: `NEWSLETTER-QUEUE.md`
- Social queue: `SOCIAL-QUEUE.md`
- SEO queue: `SEO-QUEUE.md`
- Distribution log: `DISTRIBUTION-LOG.md`
- Evolution log: `CATALYST-LOG.md`
