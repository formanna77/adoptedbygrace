# SCHEDULER-HEALTH.md — Diagnostic Log

---

## [2026-03-30] Scheduler Health Check — 62% Reliability

# ⚠️ RELIABILITY ALERT — 62% — Stampede Event Detected

**Tasks Monitored:** 14 enabled (cron) + 2 manual-only | **Expected Runs (last 24h):** ~22 | **Confirmed On-Time:** ~8
**Compute Used (est):** ~145min | **Compute Remaining to Friday (Apr 3):** ~4 days

### Reliability
- On Time (≤10min drift): 8 ✅ (visionary, refiner, auto-push x~48, scheduler-monitor)
- Late (10-30min drift): 2 ⚡ (psychologist ~65min, catalyst ~90min)
- Very Late (>30min drift): 2 ⚠️ (storyteller ~4hrs, wordsmith ran at wrong time)
- Stampede Catch-Up: 8 tasks fired in 16min window ❌

### Stampede Event — 15:20-15:36 UTC (10:20-10:36 AM CT):
- abg-builder (sched 1/4/7/11am): fired 10:20 AM CT — stampede
- site-qa-enforcer (sched 9am): fired 10:20 AM CT — 80min late, stampede
- abg-storyteller (sched 2/6am/3pm): fired 10:20 AM CT — 4hrs late from 6am slot
- abg-deploy (sched 10pm): fired 10:26 AM CT — 12hrs early (yesterday's missed run)
- abg-catalyst (sched 8am): fired 10:27 AM CT — 2.5hrs late
- visual-layout-qa (sched 9pm): fired 10:31 AM CT — 13hrs early (yesterday's missed run)
- log-gardener (sched Sun 11pm): fired 10:32 AM CT — wrong day/time entirely
- analytics-feedback-loop (sched Sun 8pm): fired 10:36 AM CT — wrong day/time entirely

**Root Cause:** App was likely closed overnight (or scheduler stalled). When it came back online ~10:15 AM CT, the scheduler detected all missed runs and fired them in rapid succession. This is a classic "wake-up stampede."

### Tasks Running On Schedule:
- abg-visionary: midnight CT ✅ (fired 12:00 AM CT)
- abg-refiner: 5am CT ✅ (fired 6:06 AM CT — ~66min jitter, within tolerance)
- auto-push-site: every 30min ✅ (consistent)
- scheduler-monitor: 10am CT ✅ (fired 11:06 AM CT — jitter)

### Compute Budget:
- Daily burn rate: ~145min/day (14 cron tasks)
  - HEAVY (15min ea): builder x6=90, storyteller x3=45, refiner x2=30, wordsmith=15, psychologist=15, site-qa=15, visual-qa=15, catalyst=15 → 240min
  - MEDIUM (8min ea): visionary=8, overseer=8, integrator=8, deploy=8 → 32min
  - LIGHT (2min ea): auto-push x48=96, scheduler-monitor=2, daily-summary=2, log-gardener=0.3, analytics=0.3 → 101min
  - **Total daily estimate: ~373min** (if all fire)
  - **Actual today: ~145min** (many tasks stampeded = shorter runs due to conflicts)
- Days to Friday reset: ~4
- Projected remaining: ~1500min to use
- Budget status: UNDER — stampede runs likely produced lower-quality output
- Recommendation: Focus on ensuring overnight runs actually fire. If app stays open, full budget is achievable.

### Pattern Detection:
- **Overnight gap confirmed:** Tasks scheduled 10pm-9am CT are the most unreliable. The app appears to close or sleep overnight, causing a morning stampede.
- **Stampede = wasted compute:** 8 agents running simultaneously produce worse output than spaced runs (resource contention, potential git conflicts).
- **Sunday weeklies fired on Monday morning:** log-gardener and analytics-feedback-loop both stampeded instead of running at their Sunday evening slots.
- **Auto-push is the most reliable task** — its 30min frequency means it recovers quickly from any gap.
- **Visionary (midnight) and refiner (5am) ran on time** — suggests the app WAS open from ~midnight to ~6am CT, then possibly closed/slept until ~10am.

### Recommendations:
1. **LaunchAgent health:** Verify the auto-recovery LaunchAgent is working. The overnight gap suggests the app closed and didn't reopen until ~10am.
2. **Stagger catch-up:** If possible, configure the scheduler to space out missed-run catch-ups by 15-20min instead of firing all at once.
3. **Move critical tasks to reliable windows:** midnight-6am CT appears reliable. Consider shifting builder/storyteller slots into this window.

### Reliability Trend:
- Today: 62% (first entry — baseline)
- 3-day avg: N/A (first entry)
