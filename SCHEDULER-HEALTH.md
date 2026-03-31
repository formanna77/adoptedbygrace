# SCHEDULER HEALTH LOG — adoptedbygrace.net

Maintained by the `scheduler-monitor` task. Tracks reliability, drift, missed runs, compute burn, and patterns.

---

# ⚠️ RELIABILITY ALERT — 56% — Action Required

## [2026-03-31] Scheduler Health Check — 56% Reliability

**Tasks Monitored:** 9 enabled | **Disabled:** 54 | **Runs Expected (last confirmed per task):** 9 | **Runs On Time:** 5
**Compute Burn Rate (est):** ~321 min/day (~5.4 hr/day)

### Reliability (based on last confirmed run of each enabled task)
- On Time (≤10min drift): 5 ✅ — evangelist, daily-summary, the-creator, the-guardian, scheduler-monitor
- Late (10-30min drift): 0
- Very Late (>30min drift): 4 ⚠️ — the-enhancer, the-strategist, log-gardener, analytics-feedback-loop

### Late/Missed Details
- **the-enhancer** — expected 7:00am CT (3/31), ran 7:51am CT (+51min) ⚠️
- **the-strategist** — expected 11:00am CT (3/30), ran 7:12pm CT (+8h 12min) ⚠️⚠️ — today's 11am run pending
- **log-gardener** — expected Sun 3/29 11:00pm CT, ran Mon 3/30 9:32am CT (+10h 32min) ⚠️⚠️
- **analytics-feedback-loop** — expected Sun 3/29 8:00pm CT, ran Mon 3/30 9:36am CT (+13h 36min) ⚠️⚠️

### Stampede Check
- 3/30 ~15:20–15:36 UTC: site-qa-enforcer, abg-catalyst, visual-layout-qa, log-gardener, analytics-feedback-loop all fired within 16 min window. Classic catch-up stampede — scheduler likely stalled overnight Sun→Mon and flushed the backlog Monday morning.

### Compute Budget (Weekly reset: Fri 4pm CT)
- Daily burn rate: ~321 min/day (the-creator 165, the-enhancer 90, the-guardian 45, the-strategist 8, evangelist 8, utilities 5)
- Days to Friday 4pm reset: ~3.6
- Projected remaining burn: ~1,156 min (~19.3 hr)
- **the-creator alone (11x/day) consumes 51% of daily compute** — this is the biggest lever for throttling if needed
- Budget status: UNKNOWN (first log entry — no baseline to compare against yet). Recommend Aaron confirm weekly compute cap so future entries can project overages.

### Pattern Detection (First Entry — Establishing Baselines)
- **Sunday night is a dead zone.** Both weekly tasks (log-gardener, analytics-feedback-loop) scheduled Sun evening were 10-13 hours late, caught up in a Mon morning stampede. Hypothesis: the app was closed or the machine was asleep overnight Sunday.
- **the-strategist (1x/day at 11am) was 8+ hours late on 3/30.** Possible cause: heavy contention from 11 creator/enhancer/guardian runs that day. Single-run daily agents get starved when multi-run agents dominate the queue.
- **the-enhancer drifting.** 51min late is not catastrophic but suggests queue contention at the 7am slot (the-guardian runs at 5am, the-creator at 6am — back-to-back heavies before the-enhancer's 7am slot).
- **54 disabled tasks remain in the scheduler.** These are legacy agents from the pre-consolidation era. Consider deleting them to reduce noise in diagnostics.

### Recommendations
1. **Move Sunday tasks to Monday morning.** If the machine sleeps Sunday night, schedule log-gardener and analytics-feedback-loop for Mon 6am instead — avoids the overnight miss + stampede pattern entirely.
2. **Space the heavy agents.** the-creator (11x), the-enhancer (6x), and the-guardian (3x) total 20 heavy runs/day. Stagger their cron times so no two heavies fire within 30min of each other.
3. **Confirm weekly compute cap.** Cannot project overages without knowing the ceiling.
4. **Prune disabled tasks.** 54 disabled tasks are dead weight. Archive their prompts and delete them from the scheduler.

### Reliability Trend
- Today: 56%
- 3-day avg: N/A (first entry)
