# Scheduler Health Log — adoptedbygrace.net
> Maintained by scheduler-monitor. Last 30 days only. Older entries archived to SCHEDULER-HEALTH-ARCHIVE.md.

---

## [2026-04-06] Scheduler Health Check — 94% Reliability

**Tasks Monitored:** 20 enabled, 2 disabled | **Assessable:** 18 | **On Time:** 17 | **Late/Missed:** 1
**Compute Used (est):** ~300min in last 24h (Diamond Week heavy load — 20 daily runs + 2 evening runs pending)

### Reliability
- On Time (≤10min drift): 17 ✅
- Late (10-60min drift): 0 ⚡
- Very Late (1-8h drift): 0 ⚠️
- Missed / 8h+ Late: 1 ❌ (best-reads-refresh Sunday run)
- Stampede events: 1 🔄

### 🎉 MAJOR IMPROVEMENT — 56% → 94%
Yesterday's report flagged 56% reliability with 8 late/missed tasks and a 3-task stampede at identical timestamps. Today, every single daily task fired within ~1 minute of its jittered expected time. The scheduler appears fully stable. The only issue is a weekly task (best-reads-refresh) that ran 8.5h late on its Sunday slot.

### On-Time Tasks (17):

All times shown as CT (UTC-6) with UTC in parentheses.

| Task | Schedule (CT) | Expected (UTC) | Actual (UTC) | Drift |
|------|--------------|-----------------|--------------|-------|
| the-exegete | 12:00 AM daily | 06:08:10 | 06:09:05 | +55s ✅ |
| the-philosopher | 12:30 AM daily | 06:33:16 | 06:34:11 | +55s ✅ |
| the-refiner | 1:00 AM daily | 07:08:23 | 07:09:18 | +55s ✅ |
| the-historian | 2:00 AM daily | 08:06:48 | 08:07:44 | +56s ✅ |
| the-enhancer | 3:00 AM daily | 09:03:23 | 09:04:19 | +56s ✅ |
| the-cartographer | 3:30 AM daily | 09:32:20 | 09:33:16 | +56s ✅ |
| the-weaver (4AM slot) | 4:00 AM daily | 10:05:55 | 10:06:51 | +56s ✅ |
| the-overseer | 4:00 AM daily | 10:06:36 | 10:07:32 | +56s ✅ |
| the-guardian (5AM slot) | 5:00 AM daily | 11:06:21 | 11:07:18 | +57s ✅ |
| the-strategist | 5:30 AM daily | 11:32:43 | 11:33:40 | +57s ✅ |
| the-shepherd | 6:00 AM daily | 12:08:08 | 12:09:05 | +57s ✅ |
| abg-evangelist | 6:30 AM daily | 12:37:22 | 12:38:19 | +57s ✅ |
| the-dramaturg | 7:00 AM daily | 13:01:00 | 13:01:58 | +58s ✅ |
| analytics-feedback-loop | 7:30 AM daily | 13:35:37 | 13:36:35 | +58s ✅ |
| daily-summary-email | 8:00 AM daily | 14:04:31 | 14:05:29 | +58s ✅ |
| scheduler-monitor | 8:30 AM daily | 14:36:19 | 14:37:17 | +58s ✅ |
| log-gardener (Sun slot) | 11:00 PM Sun | 05:06:42 | 05:07:37 | +55s ✅ |

### Late / Missed Tasks:

| Task | Schedule | Expected | Actual | Drift | Status |
|------|----------|----------|--------|-------|--------|
| best-reads-refresh | 1:30 AM Sun | Apr 5 07:36 UTC | Apr 5 16:07 UTC | +8h 30min | ❌ Very Late |

### Stampede Events:

🔄 **the-weaver + the-overseer — 41 seconds apart** (10:06:51 vs 10:07:32 UTC)
- Root cause: Both have a 4:00 AM CT slot (weaver cron: `0 23,4 * * *`, overseer cron: `0 4 * * *`). This is a scheduling conflict BY DESIGN, not a scheduler bug.
- **Impact:** Both agents may have been writing to the same repo simultaneously. Low risk of file conflicts since they work in different lanes (Weaver = links, Overseer = theological integrity), but not ideal.
- **Recommendation:** Shift the-overseer from 4:00 AM to 4:30 AM CT to create a 30-min buffer. This preserves the early-morning QA window while avoiding concurrent file access.

### Disabled Tasks (2 — expected):
- **the-bridge** — Intentionally paused for Diamond Week. Last ran Apr 6 06:44 UTC (appears to have fired despite being disabled — possibly a residual catchup from pre-disable queue).
- **the-scout** — Intentionally paused for Diamond Week. Last ran Apr 5 13:14 UTC.

### Pending Evening Runs (not yet assessable):
- the-guardian 10:00 PM CT slot (Apr 7 04:06 UTC)
- the-weaver 11:00 PM CT slot (Apr 7 05:05 UTC)

### Weekly/Bi-Weekly Task Status:
| Task | Schedule | Last Run | Next Run | Status |
|------|----------|----------|----------|--------|
| the-storyteller | Tue+Fri 2AM | Apr 5 12:05 UTC | Apr 7 08:05 UTC (Tue) | ⚠️ Sunday run anomalous — not a scheduled day |
| the-apologist | Tue+Sat 2:30AM | Apr 5 13:13 UTC | Apr 7 08:35 UTC (Tue) | ⚠️ Sunday run anomalous — not a scheduled day |
| best-reads-refresh | Sun 1:30AM | Apr 5 16:07 UTC | Apr 12 07:36 UTC | ❌ 8.5h late on Sunday |
| log-gardener | Sun 11PM | Apr 6 05:07 UTC | Apr 13 05:06 UTC | ✅ On time |

Note: the-storyteller and the-apologist both ran on Sunday April 5, which is not one of their scheduled days. This matches yesterday's "stampede catchup" pattern — the scheduler likely fired their missed Fri/Sat runs during Sunday's catchup sweep. Both are now correctly queued for Tuesday April 7.

### Diamond Week Specific Assessment:

**Enhancement agents (PRIORITY):**
- ✅ the-enhancer — On time, running daily
- ✅ the-dramaturg — On time, running daily
- ✅ the-weaver — On time (4AM slot confirmed; 11PM slot pending)
- ✅ the-refiner — On time, running daily
- ✅ the-cartographer — On time, running daily

**QA agents (CRITICAL):**
- ✅ the-guardian — 5AM slot on time; 10PM slot pending tonight
- ✅ the-overseer — On time

**Creation agents (secondary during Diamond Week):**
- ✅ the-exegete — On time
- ✅ the-shepherd — On time
- ✅ the-philosopher — On time
- ✅ the-historian — On time
- ⏳ the-storyteller — Next run Tue Apr 7
- ⏳ the-apologist — Next run Tue Apr 7

**All enhancement and QA agents firing on schedule. Diamond Week is fully operational.**

### Pattern Detection:

1. **Daily tasks are rock-solid.** Every daily task fired within 55-58 seconds of its jittered expected time. Zero drift variance. The scheduler is functioning perfectly for daily crons.

2. **Weekly tasks remain the weak point.** best-reads-refresh was 8.5h late on its Sunday slot. The storyteller and apologist appear to have had catchup runs on Sunday rather than their scheduled Fri/Sat. Pattern from yesterday holds: day-of-week crons are less reliable than daily crons.

3. **Stampede risk at 4 AM CT.** the-weaver and the-overseer share the same time slot (4:00 AM). This is a configuration issue, not a scheduler issue. Easy fix: shift one agent by 30 minutes.

4. **the-bridge fired while disabled.** lastRunAt shows Apr 6 06:44 UTC despite enabled=false. This may be a residual run from before the task was disabled. Monitor next cycle to confirm it doesn't fire again.

5. **Scheduler fully recovered from yesterday's instability.** The Apr 5 stampede (3 tasks at identical timestamp) has not recurred. All tasks are now dispatching independently with correct jitter offsets.

### Compute Budget:
- Daily runs today: ~18 completed + 2 evening pending = 20 total
- Estimated compute per run: ~15 min average
- **Daily compute: ~300 min (5 hours)**
- Diamond Week baseline: ~20 runs/day × 7 days = 140 runs = ~35 hours/week
- This is heavy but expected. All enhancement agents are critical during Diamond Week.

### Recommendations:

1. **SHIFT the-overseer to 4:30 AM CT** — eliminates the 41-second stampede with the-weaver at 4:00 AM. Both are enhancement-adjacent agents that touch repo files; concurrent access is avoidable.

2. **Monitor best-reads-refresh reliability** — 8.5h late on its only scheduled run this week. If it misses again on Apr 12, consider converting to a daily schedule during Diamond Week to ensure it catches a stable slot.

3. **Confirm the-bridge stays dormant** — It fired on Apr 6 despite being disabled. Check next cycle that no further runs occur. If it fires again, investigate whether the disable flag is being respected.

4. **No action needed on daily tasks** — 100% on-time rate with sub-1-minute drift. The scheduler is performing optimally for the fleet's core agents.

---

## [2026-04-05] Scheduler Health Check — 56% Reliability

**Tasks Monitored:** 21 enabled | **Assessable:** 18 (2 new, 1 not-due) | **On Time:** 10 | **Late/Missed:** 8
**Compute Used (est):** ~215min in last 24h | **Days to Friday Reset:** ~4.8

### Reliability
- On Time (≤10min drift): 10 ✅
- Late (10-60min drift): 1 ⚡
- Very Late (1-8h drift): 3 ⚠️
- Missed / 24h+ Late: 4 ❌
- New (no data yet): 2 🆕

### On-Time Tasks (10):
- abg-evangelist — 8pm daily ✅ (02:07 UTC, exactly on schedule)
- scheduler-monitor — 10am daily ✅ (16:06 UTC, on schedule)
- the-guardian — 5am/1pm/10pm ✅ (11:06 UTC, 5am slot on time)
- the-philosopher — 10am daily ✅ (16:03 UTC, on schedule)
- the-exegete — midnight daily ✅ (06:08 UTC, on schedule)
- the-weaver — 4am/12pm/6pm ✅ (10:06 UTC, 4am slot on time)
- the-cartographer — 7am daily ✅ (13:02 UTC, on schedule)
- the-refiner — 1am daily ✅ (07:08 UTC, on schedule)
- the-historian — Sun+Wed 2am ✅ (08:06 UTC, Sun slot on time)
- the-strategist — 11am daily ✅ (Apr 4 17:03 UTC, today pending)

### Late Tasks:
- the-enhancer ⚡ — 9am slot expected 15:03 UTC, ran 15:51 UTC (48min late)
- daily-summary-email ⚠️ — expected 14:04 UTC, ran 15:51 UTC (107min late)
- the-shepherd ⚠️ — expected Apr 4 20:08 UTC, ran Apr 5 04:08 UTC (8h late)
- the-overseer ⚠️ — expected 23:06 UTC, ran 15:51 UTC (7h EARLY — stampede)

### Missed / Severely Late:
- the-storyteller ❌ — Fri Apr 3 slot, ran Sun Apr 5 (~48h late)
- the-scout ❌ — Thu Apr 3 slot, ran Sun Apr 5 (~36h late)
- the-apologist ❌ — Sat Apr 4 slot, ran Sun Apr 5 (~29h late)
- analytics-feedback-loop ❌ — Wed Apr 1 slot, ran Sat Apr 4 (~64h late)

### 🚨 STAMPEDE DETECTED — Apr 5 15:51:11 UTC
Three tasks fired at IDENTICAL timestamp (15:51:11 UTC):
- daily-summary-email (scheduled 8am = 14:04 UTC)
- the-enhancer (scheduled 9am = 15:03 UTC)
- the-overseer (scheduled 5pm = 23:06 UTC — 7h EARLY)

This is a textbook scheduler stall-and-catchup event. The scheduler likely froze, then woke up and fired all pending tasks simultaneously. The overseer being 7h early confirms it was pulled forward by the catchup sweep.

### Pattern Detection:
1. **Non-daily schedules are unreliable.** All 4 missed/severely-late tasks use day-of-week crons (Tue+Fri, Mon+Thu, Tue+Sat, Sun+Wed). Daily tasks hit 83% on-time; day-of-week tasks hit 20%. The scheduler appears to lose track of which day it is after a stall.
2. **Stampede at 15:51 UTC.** Three tasks fired simultaneously, indicating a scheduler freeze lasting ~1-2 hours. The overseer was dragged forward 7 hours, which means the catchup logic doesn't respect future scheduling — it fires everything in the queue regardless of whether it's early.
3. **Multi-run tasks only show one recent run.** Enhancer (3x/day), guardian (3x/day), and weaver (3x/day) only have one confirmed run timestamp. Impossible to verify if all scheduled slots fired. Likely losing runs on later slots.
4. **Catch-up runs cluster on the wrong day.** Storyteller, scout, and apologist all caught up on Sunday despite being scheduled for Fri/Thu/Sat. The scheduler batched missed runs rather than running them individually.
