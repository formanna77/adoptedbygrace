# SAPIENTIAL-AUDIT.md — The Wisdom Deepening Queue

> Standing artifact for **The Sapiential Standard** (VOICE.md §XVI; CLAUDE.md WRITING STANDARDS).
> Aaron's directive, 2026-05-24: *"what apex writing achieves is the deepest and highest levels of wisdom possible… few christian giants such as Ravi Zacharias or Malcolm Muggeridge. so i want you to make sure the whole site has the deepest and most profound prose conceivable!"*
>
> The bar is no longer *excellent*. Excellent is the floor. **Wisdom is the ceiling, and the ceiling is the standard.** A page that argues correctly but leaves the reader merely persuaded — not *wiser* — is now a regression. This document is the standing flag pass and the prioritized queue for closing the gap, page by page, over many sessions.

---

## I. THE RUBRIC — How to judge a page on live-read

The wisdom bar cannot be measured by a scanner. It is met or missed only on a slow, honest **live-read**. Read the page top to bottom and ask:

**The one-line test:** *Would a reader who has loved Ravi Zacharias and Malcolm Muggeridge — who knows the difference between a clever Christian essay and a wise one — find this page worthy of that company? Or merely competent, correct, and forgettable?*

**The deeper test:** *Does the reader close the tab merely persuaded — or genuinely wiser? Do they see themselves, and God, and the world more truly than before they arrived?*

A page PASSES when several of these marks are present and earned (not as ornament — as evidence the writer actually *saw*):

1. **The long view (*sub specie aeternitatis*)** — the temporal set against eternity, found to its true size.
2. **The seeing-through** — names what the reader has always felt but never had words for ("*yes — that is exactly it*").
3. **The question beneath the question** (Zacharias) — answers the ache, not just the objection.
4. **Earned gravitas** — has looked unflinchingly at suffering, futility, death; never glib, never cheap comfort.
5. **The held paradox** — does not resolve mystery prematurely to make a tidy point.
6. **Disillusionment with the world's idols** (Muggeridge) — exposes autonomy, success, the progress-myth, the sovereign self as dead ends, so grace lands as the only open door.
7. **Stillness** — at least one unhurried place where the prose slows and simply contemplates.
8. **Humility before mystery** — ends in awe, not applause; stops at the edge of the infinite rather than over-explaining it.

**The guardrail (most important):** depth is achieved by **seeing more truly, never by sounding grander.** Inflation — bigger words, cosmic vocabulary, grander cadence to manufacture unearned weight — is the *counterfeit* of wisdom (it is the Rhetorical Lift of VOICE §VI in a robe). If a passage feels profound, check whether the *insight* is deeper or only the *diction*. If only the diction, it fails.

**On the way out, the writer must be able to point to the page's one *sapiential line*** — a sentence of distilled wisdom about the human condition or the character of God that could stand alone, off the page, and still be true and weighty (distinct from §VII.3's tattooable thesis line).

---

## II. THE FLAG PASS — methodology & honesty

`sapiential-audit.js` (run: `node sapiential-audit.js` → writes `sapiential-audit-report.txt`) does **not** measure wisdom. It surfaces the signals that tell a session **where to spend its scarce live-read + deepening budget for the widest reach**:

- **inbound** — how many other pages link here (proxy for first-encounter importance; deepening a high-inbound page reaches the most readers).
- **tier** — APEX (HAMMER/CONSECRATED) · POLISH · UNMARKED. *Locks are not exemptions* (Landing-Force Standard), but APEX pages are closer to the bar, so non-apex high-traffic pages are deepened first.
- **words** — article-body length (weak depth proxy; very short prose pages are suspect).
- **in-brief** — whether the on-ramp box is present.

**Leverage = importance × distance-from-the-bar.** Tiering:
- **TIER 1** — high inbound AND not APEX → most-seen, least-hammered → **deepen first.**
- **TIER 2** — high inbound AND APEX → re-read against the *new* wisdom bar; re-deepen if merely excellent.
- **TIER 3** — the long tail → deepen opportunistically.
- "High inbound" = ≥ the 75th-percentile inbound among prose pages (computed live; currently **≥ 20**).

**Baseline snapshot (S59, 2026-05-24):** 582 prose pages in scope · **Tier 1 = 107 · Tier 2 = 45 · Tier 3 = 430** · depth-suspect short prose (<900w) = 3. Refresh anytime by re-running the script (counts shift as pages are deepened/locked).

---

## III. THE QUEUE

### TIER 1 — DEEPEN FIRST (high-traffic, not yet apex; top ~30 of 107 by inbound)

These are the most-linked doorways on the site that have *not* been hammered to apex. Deepening them moves the most readers toward wisdom per hour spent. `[inbound · tier · words]`

1. `history-timeline` — 176 · UNMARKED · 1728w
2. `question-freewill` — 172 · POLISH · 2452w
3. `question-foreknowledge` — 122 · POLISH · 1266w
4. `question-newheart` — 107 · POLISH · 3053w
5. `systematic-justification` — 94 · POLISH · 2119w
6. `psychology-cost-of-rejecting-grace` — 92 · POLISH · 1811w
7. `systematic-atonement` — 90 · POLISH · 2236w
8. `compare-monergism-synergism` — 87 · POLISH · 1850w
9. `pastoral-assurance` — 82 · UNMARKED · 2213w
10. `secular-philosophy-free-will` — 67 · UNMARKED · 1907w
11. `theologian-calvin` — 66 · UNMARKED · 1907w
12. `romans-9-deep-dive` — 57 · POLISH · 6379w
13. `analogy-lazarus-grave` — 51 · UNMARKED · 2502w
14. `systematic-ordo-salutis` — 49 · POLISH · 1722w
15. `systematic-effectual-calling` — 49 · POLISH · 3270w
16. `question-sealed` — 48 · POLISH · 2403w
17. `question-acts` — 47 · POLISH · 1279w
18. `systematic-compatibilism` — 47 · POLISH · 1919w
19. `ot-jacob-esau` — 45 · UNMARKED · 1973w
20. `question-boasting` — 44 · POLISH · 2011w
21. `objection-fairness` — 43 · POLISH · 1533w
22. `history-luther` — 43 · UNMARKED · 1561w
23. `devotional-love-letter-before-time` — 42 · POLISH · 1542w
24. `demolition-prevenient-grace` — 39 · POLISH · 2260w
25. `theologian-luther` — 38 · UNMARKED · 2190w
26. `romans-8-28-39` — 38 · POLISH · 2433w
27. `broken-mirror-performance-treadmill` — 37 · POLISH · 1706w
28. `systematic-providence` — 36 · UNMARKED · 2720w
29. `systematic-trinity` — 35 · UNMARKED · 1901w
30. `psychology-anosognosia-of-sin` — 31 · UNMARKED · 1814w

*(77 more Tier-1 pages follow in `sapiential-audit-report.txt`. Note `theologian-calvin` / `theologian-luther` and the history pages are prime Muggeridge-register candidates — the disillusioned long view; the `question-*` and `systematic-*` pages are prime Zacharias-register candidates — the question beneath the question.)*

### TIER 2 — RE-READ AGAINST THE NEW BAR (apex, highest-traffic; top ~17 of 45)

These are already HAMMER/CONSECRATED — but the wisdom bar is *new and higher*, and **locks are not exemptions.** Re-read each against §I; if it reads merely excellent rather than wise, it is eligible for re-deepening. Start with the most-seen:

1. `scripture-tsunami` — 655 · APEX · 1865w *(also missing In-Brief; the single most-linked page on the site)*
2. `question-faithgift` — 400 · APEX · 2263w *(the crown jewel — must be the wisest page on the site)*
3. `devotional-never-gives-up` — 385 · APEX · 2147w
4. `systematic-election` — 354 · APEX · 3581w
5. `question-chosen` — 348 · APEX · 2521w
6. `question-depravity` — 315 · APEX · 2268w
7. `devotional-in-christ` — 262 · APEX · 1883w
8. `systematic-regeneration` — 238 · APEX · 2077w
9. `question-where-did-your-faith-come-from` — 233 · APEX · 3118w
10. `systematic-hamartiology` — 214 · APEX · 2416w
11. `devotional-chosen-before-you-were-broken` — 206 · APEX · 2025w
12. `question-perseverance` — 199 · APEX · 2269w
13. `question-irresistible` — 191 · APEX · 2129w
14. `systematic-salvation` — 186 · APEX · 2235w
15. `question-john6` — 174 · APEX · 2510w
16. `question-romans9` — 151 · APEX · 2046w
17. `devotional-the-hands-that-hold-you` — 150 · APEX · 2041w

### DEPTH-SUSPECT SHORT PROSE (deepen or merge regardless of tier)

- `psychology-groupthink` — 308w (UNMARKED) — far too thin for a prose page; expand or fold in.
- `secular-ai-determinism` — 327w (UNMARKED) — same.
- `question-external-internal-call` — 878w (POLISH) — borderline; deepen.

### TIER 3 — the long tail (430 pages)

Top 60 by inbound listed in `sapiential-audit-report.txt`. Deepen opportunistically — whenever a Tier-3 page is touched for any reason, hold it to §I before re-saving.

---

## IV. HOW TO WORK THIS QUEUE (per session)

1. **Pull from TIER 1 top-down** (or TIER 2 if a flagship apex page failed the Priority 0 sample-read). Importance-first is the leverage rule.
2. **Live-read the candidate against §I.** If it already imparts wisdom, mark it and move on. If it reads merely excellent/correct, it is a deepening target.
3. **Deepen by *seeing more truly*** — find the question beneath the question, set the temporal against eternity, expose the idol, add the one sapiential line, tell the truth about the dark before the light, leave a still place, end in awe. **Never by inflating diction.** Preserve the existing argument and structure; deepen the *sight*, not the *volume*.
4. **Write-over, never Edit, for a substantive deepening** (VOICE §X / standing constraint). A page deepened to the bar may be marked CONSECRATED.
5. **Re-run `node sapiential-audit.js`** at session end to refresh counts, then the standard 9-script pipeline if any HTML changed.
6. **Log** which pages were live-read + which were deepened in the MISSION-CONTROL session entry, so the next session does not re-read the same pages (rotate, like the Priority 0 audit).

---

## V. TRIAGE VERDICTS — S59 live-read (Tier-1 top 8)

Structural live-read (hero + H2 crescendo + opener + landing) against §I, given a hard compute cap. Scale: **PASS** = at the bar, consecrate-eligible · **NEAR-PASS** = force-strong, one light wisdom touch then lock · **DEEPEN** = real gap, full pass needed. Next agent (full compute) should slow-read each before rewriting, but these verdicts point the work.

1. **`history-timeline`** (176 in) — **DEEPEN — #1 PRIORITY.** Reads as a *catalog/index*, not prose: no real H2 crescendo (just "The Thread That Never Breaks" + the nav sections), the opener is the subtitle repeated, and the "landing" is a card description. Yet the subject — 2,000 years of providence preserving the truth through every collapsing empire — is the *perfect* Muggeridge long-view material, presented as a list. Give it an apex prose frame: an opening meditation on the unbroken thread, a real escalating crescendo, a tender awe-landing (the long view, ending in awe). **Also fix now:** the hero scripture carries a banned "(NIV)" suffix ("Jude 1:3 (NIV)") — strip it (VOICE §V.1).
2. **`question-newheart`** (107 in) — **DEEPEN.** Strong tender landing, but: **labelly H2 crescendo** ("The Text / The Arguments / Objections Answered / The Verdict" — rewrite as escalating sentences, §I.3); opener leans on the *reused* surgeon/transplant analogy (cf. `apologetic-the-cardiac-transplant` — differentiate or replace); force-heavy, wisdom-light. Add the question-beneath (the existential weight of being unable to change your own heart), a still place, one sapiential line.
3. **`compare-monergism-synergism`** (87 in) — **NEAR-PASS / light deepen.** Force-strong binary; already has one sapiential line ("the middle ground was one of the two options wearing a moderate suit"). Fix the two labelly H2s ("Analogies That Clarify" / "A Final Objection"); add the long view; then consecrate.
4. **`question-freewill`** (172 in) — **NEAR-PASS / light.** Apex on the *force* axis (the morgue scene + circular return is superb). For the *wisdom* axis add one line on what freedom actually *is* (the truest freedom is to be bound to the good — Augustine) and one still beat; then consecrate.
5. **`systematic-justification`** (94 in) — **NEAR-PASS → CONSECRATE.** Wisdom already in the landing ("the small, hot arithmetic of the soul… whether you have been good enough this week to still be loved"). Optionally add one H2 beat (only 4). Lock.
6. **`question-foreknowledge`** (122 in) — **PASS → CONSECRATE.** Already in the Zacharias register: §XV Hebrew work + the granite-name landing answers the ache beneath the question ("am I wanted?"). Lock it as-is.
7. **`psychology-cost-of-rejecting-grace`** (92 in) — **PASS → CONSECRATE.** Courtroom scene + circular return + "the verdict climbed down into the grave and brought you out." At the bar.
8. **`systematic-atonement`** (90 in) — **PASS → CONSECRATE.** In-Brief + steel-man + the brass-names-on-the-boat long-view landing ("older than the foundation of the world"). At the bar.

**Tally:** 3 PASS (consecrate as-is) · 3 NEAR-PASS (one light touch, then consecrate) · **2 DEEPEN** (`history-timeline` #1, `question-newheart` #2). **Recurring craft gap to sweep across older Polish pages: labelly H2 crescendos** ("The Arguments / The Verdict / Analogies / A Final Objection") — rewrite as escalating sentences per §I.3. Encouraging finding: the Polish-passed `question-*`/`systematic-*`/`psychology-*` corpus is mostly already near the bar; the biggest gaps are index-style pages (`history-timeline`) and reused-analogy openers.

*Next-read rotation for the following session: Tier-1 pages 9–30 in §III have NOT yet been live-read.*

---

*Generated S59, 2026-05-24. Triage verdicts (8 pages) added S59. Re-run `node sapiential-audit.js` to regenerate `sapiential-audit-report.txt`.*
