# Scheduler Health Log — adoptedbygrace.net
> Maintained by scheduler-monitor. Last 30 days only. Older entries archived to SCHEDULER-HEALTH-ARCHIVE.md.

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

### New Tasks (no data yet):
- the-dramaturg — 4pm/9pm daily (first run expected today 22:01 UTC)
- best-reads-refresh — Sunday 10am weekly (first run scheduled Apr 12)

### Pattern Detection:
1. **Non-daily schedules are unreliable.** All 4 missed/severely-late tasks use day-of-week crons (Tue+Fri, Mon+Thu, Tue+Sat, Sun+Wed). Daily tasks hit 83% on-time; day-of-week tasks hit 20%. The scheduler appears to lose track of which day it is after a stall.
2. **Stampede at 15:51 UTC.** Three tasks fired simultaneously, indicating a scheduler freeze lasting ~1-2 hours. The overseer was dragged forward 7 hours, which means the catchup logic doesn't respect future scheduling — it fires everything in the queue regardless of whether it's early.
3. **Multi-run tasks only show one recent run.** Enhancer (3x/day), guardian (3x/day), and weaver (3x/day) only have one confirmed run timestamp. Impossible to verify if all scheduled slots fired. Likely losing runs on later slots.
4. **Catch-up runs cluster on the wrong day.** Storyteller, scout, and apologist all caught up on Sunday despite being scheduled for Fri/Thu/Sat. The scheduler batched missed runs rather than running them individually.

### Compute Budget:
- Estimated daily burn: ~215-330min/day (range due to multi-run uncertainty)
- Days to Friday 4pm CT reset: ~4.8
- Projected remaining compute: ~1030-1584min
- Budget status: UNCERTAIN — cannot verify multi-run task execution
- Recommendation: **HOLD STEADY** — the real problem is reliability, not volume. Fix the scheduler stalls before adjusting frequencies. If budget allows, the-bridge (currently disabled) should be re-enabled at 1x/day.

### Root Cause Hypothesis:
The scheduler appears to enter a sleep/freeze state periodically (possibly when the host Mac sleeps or the app loses focus). When it wakes, it fires ALL overdue tasks simultaneously regardless of their original scheduling. Non-daily tasks suffer most because they have longer windows where a stall can cause them to miss their narrow firing window entirely.

### Recommendations:
1. **Investigate host sleep.** If Aaron's Mac is sleeping at night, tasks scheduled during sleep hours will miss. The 15:51 UTC stampede = 9:51am CDT — possibly when the Mac was woken up in the morning.
2. **Convert day-of-week tasks to daily.** The-storyteller, the-scout, the-apologist, and analytics-feedback-loop would be far more reliable as daily tasks with lighter workloads than as multi-day tasks that miss 60%+ of their slots.
3. **Spread multi-run tasks wider.** Enhancer, guardian, and weaver each run 3x/day. If the scheduler stalls, all three slots can pile up into a stampede. Consider spacing them so at least one slot hits during typical "Mac awake" hours (8am-10pm CDT).

### Reliability Trend:
- Today: 56% (first entry — baseline established)
- 3-day avg: N/A (no prior data)
