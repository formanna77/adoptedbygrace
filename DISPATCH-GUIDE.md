# DISPATCH GUIDE — Manual Agent Operations
### Updated: 2026-03-29 | All automatic schedules DISABLED

---

## THE RULE
**Never run two agents that write to the same files at the same time.**
That's it. Everything below flows from this one rule.

---

## AGENT PROFILES

### CREATORS (Heavy compute — write NEW .html pages)
| Agent | Creates | Touches |
|-------|---------|---------|
| **abg-builder** | New pages in any category | new .html files, ROADMAP.md |
| **abg-storyteller** | Stories, parables, thought experiments | story-*.html, stories.html hub |
| **abg-psychologist** | Psychology of resistance articles | psychology-*.html, psychology-hub.html |

✅ **These three can run together** — they create DIFFERENT file prefixes and never edit each other's pages.

### EDITORS (Heavy compute — modify EXISTING .html pages)
| Agent | Does | Touches |
|-------|------|---------|
| **abg-refiner** | Strengthens arguments, adds sources | Modifies existing .html in-place |
| **abg-wordsmith** | Polishes prose, Lewis/Spurgeon voice | Modifies existing .html in-place |

⚠️ **These two CANNOT run together** — both rewrite the same existing pages and will overwrite each other.
⚠️ **These CANNOT run alongside Creators** — refiner/wordsmith may try to edit a page that builder is still writing.

### THINKERS (Light compute — write only .md files, never touch .html)
| Agent | Does | Touches |
|-------|------|---------|
| **abg-visionary** | Generates content ideas | VISION.md, ROADMAP.md |
| **abg-catalyst** | Scores pages, rewrites agent prompts | CATALYST-LOG.md, agent SKILL.md files |

✅ **These can run alongside ANY Creator** — they don't touch .html files.
⚠️ **Don't run both Thinkers together** — both write to ROADMAP.md.

### INFRASTRUCTURE (Medium compute — read/modify all .html for wiring)
| Agent | Does | Touches |
|-------|------|---------|
| **abg-integrator** | Fix broken links, update hubs, sync sitemap | ALL .html pages, sitemap.xml |
| **abg-architect** | SEO, accessibility, performance | ALL .html pages, agent SKILL.md |

🚫 **These CANNOT run with ANY other agent that touches .html** — they modify every page on the site.
🚫 **These CANNOT run together** — both touch all pages and agent prompts.

### QA (Medium compute — reads everything, fixes some)
| Agent | Does | Touches |
|-------|------|---------|
| **site-qa-enforcer** | Deep functional testing | Reads all .html, fixes issues in-place |
| **visual-layout-qa** | Puppeteer viewport rendering | Read-only (screenshots) |
| **visual-qa-watchdog** | Quick visual checks | Read-only (screenshots) |
| **overseer** | Audits agent output, flags issues | OVERSEER-LOG.md, ROADMAP.md |

✅ **visual-layout-qa and visual-qa-watchdog are read-only** — safe with anything.
⚠️ **site-qa-enforcer fixes pages in-place** — don't run with Creators or Editors.
✅ **overseer only writes to logs** — safe with Creators but not with Integrator/Architect.

### UTILITY (Minimal compute)
| Agent | Does | Touches |
|-------|------|---------|
| **auto-push-site** | Git commit & push | Read-only + git ops |
| **abg-deploy** | Netlify deployment | Read-only + deploy |
| **daily-summary-email** | Email report | Read-only |
| **log-gardener** | Trim logs | .md log files only |
| **analytics-feedback-loop** | Write ANALYTICS.md | ANALYTICS.md only |
| **fleet-operations** | Repo health check | Read-only |
| **compute-budget-optimizer** | (No longer needed — you're the optimizer now) |

✅ **All utilities can run alongside anything** — they don't conflict.

---

## WAVE SYSTEM — Your Daily Dispatch Order

Run these in order. Each wave takes 30-60 minutes. Fire the next wave when the current one finishes.

### ☀️ WAVE 1 — CREATE (run together: 3 agents)
```
abg-builder + abg-storyteller + abg-visionary
```
Builder creates a new content page. Storyteller creates a new story. Visionary brainstorms ideas for tomorrow. Zero file conflicts.

**Optional 4th:** Add `abg-psychologist` if it's been a while since the last psychology article.

### 🔨 WAVE 2 — REFINE (run alone: 1 agent)
```
abg-refiner (solo)
```
Refiner picks up existing pages and strengthens them. Must run alone because it edits pages in-place.

### ✍️ WAVE 3 — POLISH (run alone: 1 agent)
```
abg-wordsmith (solo)
```
Wordsmith rewrites prose for maximum beauty. Must run alone — same reason as refiner.

### 🔗 WAVE 4 — WIRE (run together: 2 agents)
```
abg-integrator + overseer
```
Integrator links new pages to hubs, fixes broken links, syncs sitemap. Overseer audits everything and logs issues. Integrator touches all .html; overseer only writes to logs.

### 🔍 WAVE 5 — QA (run together: 2-3 agents)
```
site-qa-enforcer + visual-layout-qa + visual-qa-watchdog
```
Full site scan. QA enforcer checks functionality. Visual agents check rendering at all screen sizes. The visual agents are read-only so they're always safe.

### 🚀 WAVE 6 — DEPLOY (run together: 2 agents)
```
abg-deploy + auto-push-site
```
Push everything live. (auto-push-site runs automatically every 30 min anyway.)

### 🧠 WAVE 7 — EVOLVE (run alone: 1 agent)
```
abg-catalyst (solo)
```
Reads the whole site as a visitor, scores pages, rewrites agent prompts for tomorrow. Run this last so it sees today's full output.

---

## POWER USER: DOUBLE-DAY SCHEDULE

If you're at your computer all day and want MAXIMUM output:

| Time | Wave | Agents | Duration |
|------|------|--------|----------|
| **Morning 1** | CREATE | builder + storyteller + visionary | ~45 min |
| **Morning 2** | REFINE | refiner (solo) | ~30 min |
| **Morning 3** | POLISH | wordsmith (solo) | ~30 min |
| **Midday** | WIRE + QA | integrator + overseer, then QA agents | ~45 min |
| **Afternoon 1** | CREATE | builder + storyteller + psychologist | ~45 min |
| **Afternoon 2** | REFINE | refiner (solo) | ~30 min |
| **Afternoon 3** | POLISH | wordsmith (solo) | ~30 min |
| **Evening** | WIRE + QA | integrator + overseer, then QA agents | ~45 min |
| **Night** | EVOLVE + DEPLOY | catalyst, then deploy | ~45 min |

**Daily output: 4+ new pages, 4+ refined pages, 4+ polished pages, 2 full QA scans, 1 evolution cycle.**

---

## WEEKLY SPECIALS (run once per week)

| Day | Agent | Why |
|-----|-------|-----|
| **Monday** | abg-architect | SEO, accessibility, performance optimization |
| **Sunday** | analytics-feedback-loop | Process traffic data for the week |
| **Sunday** | log-gardener | Clean up bloated logs |

---

## EMERGENCY RULES

1. **If an agent seems stuck** (running 60+ min) → Restart the Claude app. It kills all sessions.
2. **If you see weird content** → Run `site-qa-enforcer` immediately, solo.
3. **If pages go invisible again** → It's global.css. Check for `opacity: 0` on content classes.
4. **Never run more than 3 heavy agents simultaneously.** Heavy = builder, storyteller, refiner, wordsmith, psychologist, integrator, architect.
5. **auto-push-site is the ONLY agent that should stay on auto-schedule** (every 30 min).

---

## QUICK REFERENCE: SAFE COMBOS

| ✅ Safe Together | Why |
|-----------------|-----|
| builder + storyteller + visionary | Different file prefixes, no overlap |
| builder + storyteller + psychologist | Different file prefixes |
| any Creator + any visual QA | QA agents are read-only |
| integrator + overseer | Overseer only writes logs |
| site-qa-enforcer + visual-layout-qa | Visual is read-only |
| any agent + auto-push-site | Push is lightweight |

| 🚫 Never Together | Why |
|-------------------|-----|
| refiner + wordsmith | Both edit same pages in-place |
| refiner/wordsmith + any Creator | Editor may grab a half-written page |
| integrator + ANY Creator/Editor | Integrator rewrites all pages |
| architect + ANYTHING that touches .html | Architect rewrites all pages |
| catalyst + architect | Both rewrite agent SKILL.md files |
