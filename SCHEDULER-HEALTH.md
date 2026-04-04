# SCHEDULER-HEALTH.md — Diagnostic Log for adoptedbygrace.net Task Scheduler


# ⚠️ RELIABILITY ALERT — 8% — Action Required

---

## [2026-04-04] Scheduler Health Check — 8% Reliability

**Tasks Monitored:** 10 enabled | **Runs Expected (24h):** ~38 | **Runs Confirmed:** 3
**Compute Used (est):** ~19min | **Compute Remaining to Friday (Apr 10):** ~full budget

### Root Cause: ~3-Day Scheduler Outage
The scheduler appears to have been offline from ~April 1 through April 4 morning. Evidence:
- the-creator last ran 2026-04-01T06:04Z (3+ days ago, should run 11x/day)
- the-enhancer last ran 2026-04-01T03:03Z (3+ days ago, should run 6x/day)
- the-guardian last ran 2026-04-01T05:06Z (3+ days ago, should run 3x/day)
- the-strategist last ran 2026-03-31T17:02Z (4 days ago, should run daily)
- auto-push last ran 2026-03-31T22:03Z (3+ days ago, should run every 2h)

### Reliability
- On Time (≤10min drift): 0 ✅
- Late (10-30min drift): 0 ⚡
- Very Late (>30min drift): 0 ⚠️
- Missed (no run in 24h window): 5 ❌ (the-creator, the-enhancer, the-guardian, the-strategist, auto-push)
- Stampede recovery: 3 tasks fired simultaneously at 14:42:06Z

### Stampede Check
- ⚠️ STAMPEDE DETECTED: abg-evangelist, daily-summary-email, and scheduler-monitor ALL fired at 2026-04-04T14:42:06Z — identical timestamp. This is the scheduler catching up after a multi-day outage. The remaining 5 enabled tasks have upcoming nextRunAt times today, suggesting they will recover on their own.

### Late/Missed Tasks (last 24h)
- the-creator — MISSED: 0 of 11 expected runs. Last ran 3 days ago. Next: 15:04 UTC today.
- the-enhancer — MISSED: 0 of 6 expected runs. Last ran 3 days ago. Next: 19:03 UTC today.
- the-guardian — MISSED: 0 of 3 expected runs. Last ran 3 days ago. Next: 23:06 UTC today.
- the-strategist — MISSED: 0 of 1 expected runs. Last ran 4 days ago. Next: 17:02 UTC today.
- auto-push — MISSED: 0 of 12 expected runs. Last ran 3 days ago. Next: 16:03 UTC today.

### Compute Budget
- Daily burn rate (if all tasks fire normally): ~352min/day
- Days to Friday reset (Apr 10): 6
- Actual compute used since last reset (Apr 3 4pm CT): ~19min (near zero due to outage)
- Budget status: MASSIVELY UNDER — outage wasted 3 days of compute
- Recommendation: Once scheduler recovers, monitor for stampede overload. The 5 pending tasks should resume within the next 8 hours. No throttling needed — we need to CATCH UP, not slow down.

### Disabled Task Inventory
- 53 disabled tasks remain from previous fleet configurations (pre-consolidation era)
- These are harmless but create noise. Consider archiving task definitions for disabled tasks that haven't run since March 28.

### Pattern Detection
- FIRST ENTRY — no historical data to compare. Establishing baseline.
- The 3-day outage (Apr 1–4) suggests the Claude desktop app was closed or the scheduler process was suspended. This is not a cron misconfiguration — all nextRunAt values are correctly populated.
- The stampede pattern (3 tasks, identical timestamp) confirms the scheduler fires all overdue tasks simultaneously on restart rather than spacing them out. This could cause compute spikes on recovery.

### Reliability Trend
- Today: 8%
- 3-day avg: N/A (first entry)
- Action: Monitor tomorrow's entry to confirm full recovery. If the-creator and the-enhancer don't resume by end of day, escalate.
