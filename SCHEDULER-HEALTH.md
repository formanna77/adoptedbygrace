---

## [2026-04-04] Scheduler Health Check — 38% Reliability

**Tasks Monitored:** 10 enabled | **Expected Runs (24h):** ~36 | **Last-Run Confirmed On-Time:** 3
**Compute Used (est):** ~352min/day | **Budget Reset:** Friday Apr 10 4pm CT

### Reliability (Last-Run Snapshot)
- On Time (≤10min drift): 3 ✅ (auto-push, scheduler-monitor, the-creator)
- Late (10-30min): 0 ⚡
- Very Late (>30min): 5 ⚠️ (daily-summary 38m, the-enhancer 1h42m, the-guardian 3h45m, the-strategist unclear, abg-evangelist 12h+)
- Weekly tasks (log-gardener, analytics-feedback-loop): last ran Mar 30 — next due Apr 5/6 ✓

### 🚨 STAMPEDE EVENT — 8:42-8:56am CST
Five tasks fired within 14 minutes despite being scheduled hours apart:
- abg-evangelist     14:42:06 UTC (sched 8pm — 12h35m late)
- daily-summary-email 14:42:06 UTC (sched 8am — 38m late)
- the-enhancer       14:45:06 UTC (sched 7am — 1h42m late)
- the-guardian       14:51:05 UTC (sched 5am — 3h45m late)
- the-strategist     14:56:05 UTC (sched 11am prev day — ~22h late)

**Root cause:** App was almost certainly closed overnight. Opened ~8:40am CST, scheduler caught up on all missed tasks in rapid burst. Every overnight slot (midnight-8am) for creator/enhancer/guardian/auto-push was likely delayed.

### On-Time Tasks (ran during app-active hours):
- auto-push          16:02:28 UTC — 10am slot ✅ (2min drift)
- scheduler-monitor  16:02:28 UTC — 10am slot ✅ (2min drift)
- the-creator        15:04:06 UTC — 9am slot ✅ (4min drift)

### Compute Budget
- Daily burn rate: ~352min/day (5.9h)
  - the-creator 11×15min=165 | the-enhancer 6×15min=90 | the-guardian 3×15min=45
  - auto-push 12×2min=24 | abg-evangelist 1×15min=15 | the-strategist 1×8min=8
  - scheduler-monitor 1×2min=2 | daily-summary 1×2min=2 | weekly tasks ~1.4min/day
- Days to Friday reset: 6.3
- Projected weekly burn: ~2,464min
- Budget status: UNKNOWN — no budget ceiling documented yet
- Recommendation: Document the weekly compute ceiling so this monitor can track burn vs. cap

### Pattern Detection
- **App-closed overnight = dominant failure mode.** Every reliability miss traces to the app being closed. When active, tasks fire within 2-6min of schedule (excellent).
- **Stampede risk is HIGH.** 11 creator + 6 enhancer + 3 guardian + 12 auto-push = 32 runs/day. If the app is closed for 8h, ~10-12 tasks queue up and stampede simultaneously, burning massive compute in a burst.
- **Stagger gap insufficient.** Creator (0,2,3,6,9,12,14,16,18,19,22) and enhancer (1,4,7,13,15,21) interleave well in theory, but stampede obliterates the staggering.
- **53 of 63 total tasks are DISABLED.** The fleet was massively consolidated. Only 10 remain active.

### Recommendations
1. **Keep app running overnight** or accept that overnight slots will stampede on wake.
2. **Add stampede guard:** If implementing a catchup policy, space missed runs 5-10min apart instead of firing all at once.
3. **Document compute budget ceiling** so this monitor can project overages.

### Reliability Trend
- Today: 38% (stampede day — misleading; active-hours reliability ~100%)
- 3-day avg: N/A (first entry)
- True active-hours reliability: ~100% — the scheduler works perfectly when the app is running.
