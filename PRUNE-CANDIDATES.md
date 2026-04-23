# PRUNE-CANDIDATES — The Tier 3 Pruning Audit Ledger

> Generated 2026-04-23 by `prune-audit.js`. Re-run anytime to refresh.
> Surfacer only. No HTML mutated. Cuts and elevations are human-sign-off.
> Source criteria: `HAMMER-EXPANSION.md` §"Tier 3 — The Pruning Audit."

## Executive summary

| Disposition | Count | Action |
|---|--:|---|
| RETIRE-STUB | 3 | Below publication grade. Cut, redirect inbound wiring. |
| RETIRE-LOW-VALUE | 1 | Short + almost unlinked. Cut, redirect wiring. |
| MERGE-CANDIDATE | 3 | Fold into a stronger sibling. |
| ELEVATE | 23 | Load-bearing but undersized. Promote to Tier 1 rebuild. |
| KEEP-AS-IS | 334 | Passes Tier 3 thresholds — not flagged this run. |
| POLISH-LOCKED (skipped) | 103 | Already on the polished shelf. |
| HAMMER-LOCKED (skipped) | 49 | Already on the cathedral spine. |
| INFRA (skipped) | 37 | Hubs + utility pages — out of scope for content pruning. |

**Total surfaced for human review: 30 pages.**

Walk top-down within each section. Aaron signs off on every cut. The scaffold flags; the pastor decides.

---

## RETIRE-STUB — below publication grade

> Pages with `< 500 words` AND `≤ 2 inbound`. Almost certainly stubs or abandoned drafts. Cut after redirecting any inbound link.

| File | Words | Inbound | Tier | Reason |
|---|--:|--:|---|---|
| `verse-explorer.html` | 94 | 0 | RETIRE | 94w · 0 inbound — below publication grade |
| `sitemap.html` | 341 | 0 | RETIRE | 341w · 0 inbound — below publication grade |
| `donate.html` | 471 | 2 | KEEP | 471w · 2 inbound — below publication grade |

---

## RETIRE-LOW-VALUE — short body and unlinked

> Pages with `< 700 words` AND `≤ 1 inbound`. Body is small enough that the argument is almost certainly carried better elsewhere; the only reason this URL exists is residual wiring. Redirect the wiring, then cut.

| File | Words | Inbound | Tier | Reason |
|---|--:|--:|---|---|
| `printable-gospel-in-one-page.html` | 662 | 1 | ORPHAN | 662w · 1 inbound — wiring redirectable |

---

## MERGE-CANDIDATE — fold into a stronger sibling

> Two patterns: (1) the explicit duplicate pairs from MISSION-CONTROL §Phase 1, (2) same-stem siblings across `apologetic-` / `question-` / `objection-` / `pastoral-` / `demolition-` / `compare-` where one page out-pulls the other. Fold the weaker into the stronger and 301 the URL.

| File | Merge → into | Words | Inbound | Reason |
|---|---|--:|--:|---|
| `apologetic-babies.html` | `objection-babies.html` | 2200 | 5 | known duplicate pair (MISSION-CONTROL §Phase 1) |
| `apologetic-evangelism.html` | `pastoral-evangelism.html` | 1844 | 7 | known duplicate pair (MISSION-CONTROL §Phase 1) |
| `apologetic-perseverance.html` | `question-perseverance.html` | 2103 | 8 | known duplicate pair (MISSION-CONTROL §Phase 1) |

---

## ELEVATE — load-bearing but undersized

> Pages with `≥ 6 inbound` and `< 1500 words` that are NOT yet HAMMER-LOCKED or POLISH-LOCKED. They carry weight in the internal traversal but their bodies are too small for what they are doing. Promote to Tier 1 for a full Hammer-Spine rebuild.

| File | Inbound | Words | Tier | Reason |
|---|--:|--:|---|---|
| `scripture-tsunami.html` | 550 | 384 | KEEP | 550 inbound but only 384w — promote to Tier 1 |
| `for-pastors.html` | 24 | 1453 | KEEP | 24 inbound but only 1453w — promote to Tier 1 |
| `joy-hub.html` | 21 | 723 | KEEP | 21 inbound but only 723w — promote to Tier 1 |
| `creeds-confessions.html` | 20 | 5 | THIN | 20 inbound but only 5w — promote to Tier 1 |
| `for-skeptics.html` | 16 | 447 | KEEP | 16 inbound but only 447w — promote to Tier 1 |
| `broken-mirror-imposter-syndrome.html` | 15 | 1460 | HAMMER | 15 inbound but only 1460w — promote to Tier 1 |
| `start-here-phase5.html` | 14 | 1372 | KEEP | 14 inbound but only 1372w — promote to Tier 1 |
| `open-wound-miscarriage.html` | 14 | 1399 | HAMMER | 14 inbound but only 1399w — promote to Tier 1 |
| `devotional-glory-of-divine-choice.html` | 13 | 1407 | HAMMER | 13 inbound but only 1407w — promote to Tier 1 |
| `shattered-lens-pastor.html` | 12 | 1440 | HAMMER | 12 inbound but only 1440w — promote to Tier 1 |
| `the-mirror.html` | 11 | 772 | KEEP | 11 inbound but only 772w — promote to Tier 1 |
| `shattered-lens-cant-tell-true.html` | 11 | 1458 | HAMMER | 11 inbound but only 1458w — promote to Tier 1 |
| `philosophy-observer-effect-sin.html` | 10 | 1293 | KEEP | 10 inbound but only 1293w — promote to Tier 1 |
| `two-arms.html` | 10 | 1334 | KEEP | 10 inbound but only 1334w — promote to Tier 1 |
| `theologian-bradwardine.html` | 10 | 1484 | HAMMER | 10 inbound but only 1484w — promote to Tier 1 |
| `for-arminians.html` | 9 | 650 | KEEP | 9 inbound but only 650w — promote to Tier 1 |
| `theologian-lloydjones.html` | 9 | 1327 | HAMMER | 9 inbound but only 1327w — promote to Tier 1 |
| `ot-election.html` | 8 | 1080 | KEEP | 8 inbound but only 1080w — promote to Tier 1 |
| `objection-unfair-to-choose-some.html` | 8 | 1389 | HAMMER | 8 inbound but only 1389w — promote to Tier 1 |
| `history-20th-century.html` | 8 | 1442 | KEEP | 8 inbound but only 1442w — promote to Tier 1 |
| `for-new-believers.html` | 7 | 534 | KEEP | 7 inbound but only 534w — promote to Tier 1 |
| `theologian-machen.html` | 7 | 1467 | HAMMER | 7 inbound but only 1467w — promote to Tier 1 |
| `the-objection-collapse.html` | 6 | 627 | KEEP | 6 inbound but only 627w — promote to Tier 1 |

---

## Methodology

Source signals:

- `audit-data.json` (built by `strategic-audit.js`) provides per-page wordCount, inboundCount, tier, category, isHub, isUtility.
- HTML files are scanned for `HAMMER-LOCKED` and `POLISH-LOCKED` markers. Locked pages are excluded from active surfacing — they have already been judged worth keeping.
- Hub and utility files are excluded from content-level pruning.

Decision rules (encoded in `prune-audit.js`):

1. **HAMMER-LOCKED or POLISH-LOCKED** → SKIP (already vetted).
2. **Hub or utility** → SKIP (out of scope).
3. **Known merge pair** (`apologetic-perseverance` → `question-perseverance`, etc.) → MERGE-CANDIDATE.
4. **Same-stem sibling** with a stronger page (higher inbound, then higher words) → MERGE-CANDIDATE against the winner.
5. **`words < 500` AND `inbound ≤ 2`** → RETIRE-STUB.
6. **`words < 700` AND `inbound ≤ 1`** → RETIRE-LOW-VALUE.
7. **`inbound ≥ 6` AND `words < 1500`** (and not locked) → ELEVATE.
8. Otherwise → KEEP-AS-IS.

Re-run after any pruning or elevation work to refresh the ledger.

---

*Generated by `prune-audit.js` on 2026-04-23.*
