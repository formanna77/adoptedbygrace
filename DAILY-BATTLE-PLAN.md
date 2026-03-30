# DAILY BATTLE PLAN — Maximum Compute Utilization
**Last Updated:** 2026-03-29
**Rule:** Always have 2-3 agents running. The moment one finishes, fire the next. Zero idle compute.

---

## HOUR-BY-HOUR SCHEDULE

Open the **Scheduled** sidebar in Claude. Hit **"Run now"** on the listed agents at each time slot.

### 6:00 AM — MORNING LAUNCH
Fire these 3 simultaneously:
- **abg-builder** — new content page #1
- **abg-storyteller** — new story/parable
- **site-qa-enforcer** — overnight QA check

### 7:00 AM — SECOND WAVE
- **abg-refiner** — polish yesterday's content
- **abg-visionary** — generate new content ideas
- **auto-push-site** — deploy any overnight changes

### 8:00 AM — THIRD WAVE
- **abg-builder** — new content page #2
- **abg-wordsmith** — sharpen prose on recent pages
- **abg-catalyst** — score pages and improve agent prompts

### 9:00 AM — FOURTH WAVE
- **abg-storyteller** — second story
- **abg-integrator** — fix links, sync hubs, update sitemap
- **abg-psychologist** — psychology content (if not run recently)

### 10:00 AM — FIFTH WAVE
- **abg-builder** — new content page #3
- **abg-refiner** — polish this morning's builder output
- **auto-push-site** — mid-morning deploy

### 11:00 AM — SIXTH WAVE
- **abg-wordsmith** — second prose pass
- **overseer** — quality review morning output
- **visual-layout-qa** — responsive rendering check

### 12:00 PM — MIDDAY
- **abg-builder** — new content page #4
- **abg-storyteller** — third story
- **abg-integrator** — second link/sitemap pass

### 1:00 PM — AFTERNOON LAUNCH
- **abg-refiner** — polish midday content
- **abg-wordsmith** — third prose pass
- **auto-push-site** — afternoon deploy

### 2:00 PM — SECOND AFTERNOON
- **abg-builder** — new content page #5
- **site-qa-enforcer** — afternoon deep QA
- **abg-visionary** — second ideation (if compute allows)

### 3:00 PM — THIRD AFTERNOON
- **abg-storyteller** — fourth story
- **abg-refiner** — polish afternoon content
- **overseer** — afternoon quality review

### 4:00 PM — FOURTH AFTERNOON
- **abg-builder** — new content page #6
- **abg-wordsmith** — fourth prose pass
- **abg-integrator** — third link pass

### 5:00 PM — EVENING LAUNCH
- **abg-builder** — new content page #7
- **abg-refiner** — final polish pass
- **auto-push-site** — evening deploy

### 6:00 PM — SECOND EVENING
- **abg-storyteller** — fifth story
- **overseer** — evening quality review
- **visual-qa-watchdog** — visual check

### 7:00 PM — THIRD EVENING
- **abg-builder** — new content page #8
- **abg-wordsmith** — final prose pass
- **site-qa-enforcer** — final deep QA

### 8:00 PM — NIGHT PUSH
- **abg-refiner** — final refinements
- **abg-integrator** — final link/sitemap sync
- **auto-push-site** — night deploy

### 9:00 PM — FINAL WAVE
- **abg-builder** — content page #9 (if compute remains)
- **overseer** — final quality check
- **auto-push-site** — final deploy of the day

### 10:00 PM — LEAVE RUNNING OVERNIGHT
Fire these and walk away. If the scheduler works, bonus runs happen overnight:
- **abg-deploy** — nightly deployment checks
- **auto-push-site** — one last push

---

## DAILY TARGETS (if fully executed)

| Agent | Runs/Day | Output |
|-------|----------|--------|
| abg-builder | 9 | 9 new content pages |
| abg-storyteller | 5 | 5 stories/parables |
| abg-refiner | 5 | 5 pages polished |
| abg-wordsmith | 4 | 4 prose passes |
| overseer | 3 | 3 quality reviews |
| site-qa-enforcer | 3 | 3 deep QA scans |
| abg-integrator | 3 | 3 link/sitemap syncs |
| auto-push-site | 6 | 6 deploys |
| visual-layout-qa | 1 | full responsive check |
| abg-visionary | 1-2 | fresh content ideas |
| abg-catalyst | 1 | agent prompt improvements |
| abg-psychologist | 1 | psychology content |

**Total: ~40 agent runs per day, producing 9-14 new pages of content, all QA'd and deployed.**

---

## QUICK REFERENCE — WHAT EACH AGENT DOES

- **abg-builder** = Creates new pages (THE MONEY AGENT — run this the most)
- **abg-storyteller** = Stories, parables, thought experiments
- **abg-refiner** = Deepens arguments, adds quotes, cross-refs
- **abg-wordsmith** = Sharpens prose to Lewis/Spurgeon level
- **abg-psychologist** = Why people resist God's sovereignty
- **abg-visionary** = Generates new content ideas
- **abg-catalyst** = Reads site as visitor, improves agent prompts
- **overseer** = Quality control on all output
- **site-qa-enforcer** = Deep dive error hunter (Puppeteer + source scan)
- **visual-layout-qa** = Every page at 6 screen sizes
- **visual-qa-watchdog** = Quick visual rendering check
- **abg-integrator** = Broken links, sitemap, cross-references
- **auto-push-site** = Git push to deploy changes
- **abg-deploy** = Pre-deploy checks + Netlify

---

## IF YOU ONLY HAVE 5 MINUTES

Fire these 3 and walk away:
1. **abg-builder**
2. **abg-storyteller**
3. **auto-push-site**

---

## IF AN AGENT LOOKS STUCK

If a task shows "running" for more than 1 hour, it's stuck. There's no kill button yet (reported to Anthropic). Skip it and fire the next agent on the schedule. The stuck session will eventually time out on its own.
