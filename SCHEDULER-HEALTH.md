# Scheduler Health Log — adoptedbygrace.net


---

## [2026-03-30] Scheduler Health Check — 45% Reliability

# ⚠️ RELIABILITY ALERT — 45% — Stampede Detected

**Tasks Monitored:** 17 enabled w/ cron | **Expected Runs (24hr):** ~71 | **Confirmed On-Time:** ~3
**Compute Used (est):** ~180min (stampede compressed runs) | **Budget Reset:** Friday 4pm CT (~5.2 days)

### Reliability
- On Time (≤10min drift): 3 ✅ (visionary, refiner, auto-push)
- Late (10-30min drift): 2 ⚡ (psychologist ~60min, site-qa ~20min)
- Very Late (>30min drift): 5 ⚠️ (builder, storyteller, catalyst, deploy, visual-layout-qa — all stampede)
- Catchup/Wrong Window: 4 (overseer, integrator, wordsmith, daily-summary ran at bizarre times)

### 🚨 STAMPEDE — 10:20am CT (15:20 UTC)
10 tasks fired within 23 minutes. 3 at the EXACT SAME SECOND:
- 15:20:38 UTC — abg-builder, site-qa-enforcer, abg-storyteller (SAME SECOND)
- 15:26-27 UTC — abg-deploy, abg-catalyst
- 15:31-32 UTC — auto-push-site, visual-layout-qa, log-gardener
- 15:36 UTC — analytics-feedback-loop
- 15:43 UTC — scheduler-monitor (this run)

**Cause:** App likely closed/crashed between ~7am-10am CT. Scheduler dumped all pending tasks on reopen.

### Earlier Off-Schedule Runs (possible overnight restart):
- overseer: 03:18 UTC (should be noon CST=18:00 UTC — 15hr late, prior-day catchup)
- abg-integrator: 05:27 UTC (should be 4pm CST=22:00 UTC — catchup)
- daily-summary-email: 05:48 UTC (should be 5pm CST=23:00 UTC — catchup)
- abg-wordsmith: 09:07 UTC (should be 1pm CST=19:00 UTC — catchup)

### Compute Budget (est):
- Daily target burn: ~365min/day (HEAVY×15: 225 + MED×8: 40 + LIGHT×2: 100)
- Actual today so far: ~180min (stampede compressed many runs, some slots missed)
- Days to Friday reset: 5.2
- Projected weekly: ~1900min (under-burning due to missed slots)
- Budget status: UNDER — missing runs = wasted capacity
- **Recommendation:** The problem isn't agent frequency — it's APP UPTIME. Fix the crash/close gap first.

### Pattern Detection:
- **DST mismatch:** System appears to use CST (UTC-6) not CDT (UTC-5). All nextRunAt values are 1hr later than expected for CDT. Not a bug per se but affects analysis.
- **App uptime is the #1 bottleneck.** Tasks that fire during stable uptime windows (midnight-5am) run on time. Tasks in the 7am-10am window consistently get swept into stampedes.
- **Stampede = wasted compute.** When 10 tasks fire simultaneously, they compete for resources and may produce lower-quality output than when properly spaced.
- **LaunchAgents may not be recovering fast enough.** The auto-recovery (installed 2026-03-29) should prevent long outages, but a 3+ hour gap suggests it isn't catching all crashes.

### Reliability Trend:
- Today: 45%
- 3-day avg: N/A (first health check entry)
- **Baseline established.** Future entries will track improvement.

### Recommendations:
1. **Investigate app crash between 7-10am CT today.** Check Console.app or system logs.
2. **Verify LaunchAgent is configured for rapid restart** (not just login-triggered).
3. **Consider reducing builder from 6x to 4x/day** until uptime stabilizes — fewer slots = fewer misses.
4. **auto-push at 48x/day (every 30min) is overkill** — 12x/day (every 2hrs) would save ~72min of LIGHT compute daily.
