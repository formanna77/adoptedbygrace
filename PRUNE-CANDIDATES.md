# PRUNE-CANDIDATES — The Tier 3 Pruning Audit Ledger

> Generated 2026-04-27 by `prune-audit.js`. Re-run anytime to refresh.
> Surfacer only. No HTML mutated. Cuts and elevations are human-sign-off.
> Source criteria: `HAMMER-EXPANSION.md` §"Tier 3 — The Pruning Audit."

## Executive summary

| Disposition | Count | Action |
|---|--:|---|
| RETIRE-STUB | 3 | Below publication grade. Cut, redirect inbound wiring. *(1 of 3 reclassified as KEEP-AS-IS in Session 26 — `creeds-confessions.html` is a deliberate meta-refresh redirect, false positive.)* |
| RETIRE-LOW-VALUE | 1 | Short + almost unlinked. Cut, redirect wiring. |
| MERGE-CANDIDATE | 0 | Fold into a stronger sibling. |
| ELEVATE | 20 | Load-bearing but undersized. Promote to Tier 1 rebuild. **9 of 20 ELEVATED to HAMMER-LOCKED across Sessions 25–27: `scripture-tsunami.html`, `for-pastors.html`, `joy-hub.html`, `two-arms.html`, `for-skeptics.html`, `broken-mirror-imposter-syndrome.html`, `start-here-phase5.html`, `shattered-lens-pastor.html`, `the-mirror.html`. 11 ELEVATE candidates remain.** |
| KEEP-AS-IS | 243 | Passes Tier 3 thresholds — not flagged this run. |
| POLISH-LOCKED (skipped) | 200 | Already on the polished shelf. |
| HAMMER-LOCKED (skipped) | ~~49~~ → 58 | Already on the cathedral spine. (9 added Sessions 25–27.) |
| INFRA (skipped) | 37 | Hubs + utility pages — out of scope for content pruning. |

**Total surfaced for human review: 24 pages. Resolved: 10 (9 HAMMER-LOCKED + 1 false-positive). Remaining for Aaron's sign-off after travel: 14 (11 ELEVATE + 3 RETIRE).**

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

_No candidates flagged in this disposition._

---

## ELEVATE — load-bearing but undersized

> Pages with `≥ 6 inbound` and `< 1500 words` that are NOT yet HAMMER-LOCKED or POLISH-LOCKED. They carry weight in the internal traversal but their bodies are too small for what they are doing. Promote to Tier 1 for a full Hammer-Spine rebuild.

| File | Inbound | Words | Tier | Reason |
|---|--:|--:|---|---|
| ~~`scripture-tsunami.html`~~ | 550 | ~~384~~ → ~2200 | ✅ **HAMMER-LOCKED Session 25 (2026-04-27)** — Tier-1 rebuild executed: 1824-word masterpiece introduction (Two Arms architecture, linchpin Total Depravity argument, Crown Jewel faith-as-gift) + tender catch after the verses-grid. The highest-leverage ELEVATE on the entire ledger is now closed. |
| ~~`for-pastors.html`~~ | 24 | ~~1453~~ → ~2497 | ✅ **HAMMER-LOCKED Session 26 (2026-04-27)** — Tier-1 rebuild executed: ~1044 added words of Apex Rhetoric Protocol prose. The Saturday-Night Moment opener, the Witness of the Faithful Pulpit (Augustine/Edwards/Spurgeon/MLJ), Why People Resist (the spiritual not theological diagnosis), 6-step preaching method, pastoral catch. 14 unique prose links. Final-line hammer: "Open the Book. Trust the Spirit. Carry it." |
| ~~`joy-hub.html`~~ | 21 | ~~723~~ → ~2505 | ✅ **HAMMER-LOCKED Session 26 (2026-04-27)** — Hub-intro expansion: ~1782 added words. The sailor-and-the-rail opener, the founder's fifteen-year wrestle as testimony, "Why This Joy Has No Crack in It" steel-man-then-demolish on Arminian fragility, the seven-doors map, closing "If You Have Walked All Seven" doxological catch with Spurgeon/Edwards/Augustine triangulation. Final-line hammer: "The joy was His. So is the song." |
| `creeds-confessions.html` | 20 | 5 | ✅ **FALSE POSITIVE — DELIBERATE REDIRECT** | 116-line deliberate meta-refresh redirect to `/history-timeline` (Aaron consolidated this content). The 5-word body is the redirect notice. Script's word-count metric does not detect meta-refresh; flag was inaccurate. **Recommend: KEEP-AS-IS, mark in audit script to exclude redirects from prune-audit going forward.** No action required. |
| ~~`for-skeptics.html`~~ | 16 | ~~447~~ → ~2565 | ✅ **HAMMER-LOCKED Session 26 (2026-04-27)** — Hub-intro rebuild: ~2118 added words. The "we will take your skepticism more seriously than you do" opener, the Münchhausen-trilemma-applied-to-belief move, the Crown Jewel translated for the skeptic (presented as a formal syllogism), the Libet/Wegner/Haynes neuroscience-of-autonomy diagnostic, closing "If You Walked All Seven" Augustine/Pascal/Lewis/Picard/Collins ladder. Final-line hammer: "Follow the evidence. The evidence has a Name." |
| ~~`broken-mirror-imposter-syndrome.html`~~ | 15 | ~~1460~~ → ~2342 | ✅ **HAMMER-LOCKED Session 27 (2026-04-27)** — Added "The Saints You Think Were Stronger Than You" (Bunyan's *Grace Abounding* / Spurgeon's depression / Cowper's collapse — every great saint has had imposter syndrome), "Why Your Brain Insists You Are a Fraud" (metacognitive function as evidence of regeneration), "The Pelagian Root Underneath the Shame" (auditing your faith as if it were the meritorious cause). 14 unique prose links. Final-line hammer: "The fraud was never you. It was the lie." |
| ~~`start-here-phase5.html`~~ | 14 | ~~1372~~ → ~2043 | ✅ **HAMMER-LOCKED Session 27 (2026-04-27)** — Added "The Day After You Saw It" opener (gravity-not-furniture frame; the bedrock-under-the-foundation metaphor) + "What This Looks Like Tomorrow Morning" practical 5-shift section (prayer / worship / patience-with-others / sleep-when-bad-news-comes / loving-spouse-and-children-differently). 14 unique prose links. Final-line hammer: "You were chosen. You are held. Now go and live like it." |
| ~~`shattered-lens-pastor.html`~~ | 12 | ~~1440~~ → ~1831 | ✅ **HAMMER-LOCKED Session 27 (2026-04-27)** — Added "The Pastors Who Walked This Path Before You" (Augustine's break with Pelagian bishops / Luther's exit from Rome / Spurgeon's Down-Grade Controversy / Lloyd-Jones's 1966 evangelical-alliance call). The historical witness section anchors the reader in a fifteen-century lineage of believers who saw clearly and paid the cost. 14 unique prose links. Final-line hammer: "You did not break the lens. He cleared it." |
| ~~`the-mirror.html`~~ | 11 | ~~772~~ → ~1750 | ✅ **HAMMER-LOCKED Session 27 (2026-04-27)** — Interactive 12-question widget; visual-catalog convention applied. Added substantial PROSE PREAMBLE before the widget ("What This Mirror Is For" / "The Logic Underneath the Twelve Questions" / "How to Take the Mirror Honestly") and a closing CATCH meditation after the verdict ("If the Mirror Just Did Its Work" — the resurrection-not-self-improvement principle). 9 unique prose links (visual-catalog exception). Final-line hammer: "The mirror showed the death. He shows the resurrection." |
| `shattered-lens-cant-tell-true.html` | 11 | 1458 | HAMMER | 11 inbound but only 1458w — promote to Tier 1 |
| `philosophy-observer-effect-sin.html` | 10 | 1293 | KEEP | 10 inbound but only 1293w — promote to Tier 1 |
| ~~`two-arms.html`~~ | 10 | ~~1334~~ → ~2700 | ✅ **HAMMER-LOCKED Session 26 (2026-04-27)** — Tier-1 rebuild: ~1366 added words. The architectural exposition of the entire site's gospel architecture. New sections: "The Biblical Pattern Behind Both Arms" (Ephesians 2 / Ezekiel 36 / Romans 6 / John 3 architecture proof), "The Historical Pattern" (Augustine/Edwards/Spurgeon as proof-of-concept across fifteen centuries), "Why the Human Heart Will Always Default to One Arm" (the secular vs religious failure modes), "A Worked Example — One Reader, Both Arms" (a hypothetical 30-year Arminian walking the architecture). Final-line hammer: "Both arms. Always. Never one without the other." |
| `theologian-bradwardine.html` | 10 | 1484 | HAMMER | 10 inbound but only 1484w — promote to Tier 1 |
| `for-arminians.html` | 9 | 650 | KEEP | 9 inbound but only 650w — promote to Tier 1 |
| `theologian-lloydjones.html` | 9 | 1327 | HAMMER | 9 inbound but only 1327w — promote to Tier 1 |
| `ot-election.html` | 8 | 1080 | KEEP | 8 inbound but only 1080w — promote to Tier 1 |
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

*Generated by `prune-audit.js` on 2026-04-27.*
