# HAMMER-EXPANSION — The Sweep Beyond the 50

> **Authorized by Aaron 2026-04-22 (end of Session 11).** The Hammer-50 was scaffolding, not a ceiling. Every page on this site is somebody's first door. A two-tier site is a cathedral with one grand entrance and 497 storage-closet doors, and readers do not get to pick which one Google hands them.

---

## The shift

**Old scope:** 50 pages, ranked by internal inbound link count, elevated to full VOICE.md masterpiece.
**New scope:** every page on the site carried up onto a shelf that feels continuous with Hammer-50, via graduated treatment proportionate to each page's role.

The mission statement in `.claude/CLAUDE.md` does not say "the most powerful instrument of biblical truth on the internet *for its top 50 pages*." It says "the most powerful instrument, period." The expansion is what it takes to honor that sentence.

---

## Three tiers of treatment

Each tier has a defined treatment, a defined marker, and a defined per-page time budget. A future agent picking up any tier should be able to execute without re-deriving the spec.

### Tier 1 — Hammer-50 (IN PROGRESS, 26 of 50 shipped at session-11 close)

**Treatment:** full VOICE.md per `VOICE.md` §XI 17-item Pre-Ship Checklist. Greek ambush (≤2 per page at distinct pivots), secular bridge paragraph, embedded prayer, Somatic Awareness paragraph, Sentence of the Page pullquote, circular return architecture, final-line hammer ≤7 words absolute, link ceiling 10–14 cross-category.
**Marker:** `<!-- HAMMER-LOCKED -->` as first line inside `<article class="article-body">`.
**Budget:** ~22K tokens per spine (rebuild) or ~10K (surgical pass if 15+ of 17 items already pass).
**Cadence:** floor 4 spines/run, stretch 5–6 (per `memory/feedback_batch_multiple_spines.md`).
**Remaining:** 24 spines. Four of those (#13, #14, #17, #26) are net-new as of Aaron's 2026-04-22 greenlight — the queue identified them for a reason and creating them closes doctrinal gaps that substitution would leave open.

### Tier 2 — Hammer-Expansion / The Polish Pass (STARTS AFTER TIER 1 CLOSES)

**Scope:** the ~450 pages classified as HAMMER or KEEP in `audit-data.json`, re-ranked by first-encounter likelihood (below). Target list length: ~200 pages — call it "Hammer-200."

**Treatment — applied as a checklist, NOT a rebuild:**

1. **Cut the Twelve Lethal Moves** (VOICE.md §II). Especially: 2am/3am/midnight/odd-hour framing, TL;DR, "crisis-triage" posture, rhetorical lift, adjective stacking, applause lines, author's appearance, cringe slang, pastoral sigh, aspirational links, "Shall I…?" invitations, leading with a theological label instead of Scripture.
2. **NIV-verify every Scripture block.** Replace non-NIV with NIV. Strip all `(NIV)` parenthetical suffixes. When Romans 9 or John 6 says what it says in the reader's Bible, the translation-bias escape hatch is welded shut.
3. **Strip `.html` from every internal href** (VOICE.md §IX). Regex: `sed -i 's|\(href="/[a-zA-Z0-9-]\+\)\.html"|\1"|g' <file>`.
4. **Add one Sentence of the Page** — a blockquote pullquote near the top, ≤20 words, pointable with a finger.
5. **Add one final-line hammer** — the last `<p>` before `<!-- RELATED-ARTICLES-START -->` or footer, ≤7 words, absolute, no softening clause.
6. **Add one cross-category link in the prose** if none exists (question→devotional, demolition→story, psychology→question, etc.). Cross-category is the highest-value link type because it turns a filing cabinet into a living web.
7. **Glob-verify every `<a href>` target.** Aspirational linking is banned. A page with 6 verified links beats a page with 12 where 5 are broken.
8. **Duplicate-link dedupe.** Trim to first-mention. Cap at 14 unique prose links.
9. **Add `<!-- POLISH-LOCKED -->` marker** as the first line inside the body wrapper (`<article class="article-body">` for articles, or just before the main content block for other layouts).

**What Tier 2 does NOT require** (leave for future Tier 1 promotion):
- Greek ambush
- Secular bridge paragraph
- Embedded prayer
- Somatic Awareness paragraph
- Circular return architecture
- Full H2 rebuild
- Sentence-level prose carving

**Tier 2 budget:** 8–10 minutes / ~4K tokens per page. Six to eight polish-passes per batch run.

**Promotion rule:** If a page fails 5+ §XI items catastrophically during its Tier 2 pass, tag it `PROMOTE TO TIER 1` in the session log and move on. Do NOT attempt a full rebuild inside a Tier 2 batch — the per-page budget is wrong and the batch loses rhythm. A future Tier 1 session will handle it with proper budget.

### Tier 3 — The Pruning Audit (RUNS ONCE, ~2 SESSIONS)

**Scope:** the bottom quartile of pages by combined inbound count + quality signal. Audit each and make a binary cut-or-elevate call.

**Cut criteria** (remove from site, clean up references):
- Duplicate or near-duplicate to a stronger page
- Topic outside the doctrines of grace (this is not a theology encyclopedia — CLAUDE.md §1)
- Stub or abandoned drafts that never reached publication quality
- Pages whose argument is subsumed by a Hammer or polished page's
- Pages that exist only because old wiring depended on them, where the wiring can be redirected

**Elevate criteria** (promote to Tier 1 for a full rebuild):
- Pages flagged during Tier 2 as catastrophic
- Pages carrying a load-bearing argument not covered elsewhere

**Execution:** Tier 3 is not a batch rewrite. It's an audit pass followed by coordinated cuts. `wire-orphans.js` and `validate-site.js` catch any broken links that result.

**Target outcome:** a site of ~400 pages that sing, instead of 547 that mostly hum. Cathedrals get built by knowing what to leave out.

---

## First-encounter likelihood ranking for Tier 2

The Hammer-50 was ranked by **internal inbound count** — how many pages link TO this page. That captures internal traversal but misses the reality that most readers arrive via search.

Tier 2 re-ranks by a different proxy: **how likely is this page a reader's first encounter with the site?**

Pragmatic heuristic — cluster pages by path prefix, then rank within each cluster by existing inbound count as a tiebreaker:

| Prefix cluster | First-encounter rank | Why |
|---|---|---|
| `question-*` | HIGHEST | explicit query match; reader Googling "does God predestine..." lands here |
| `demolition-*` | HIGH | apologetics seekers, objection-searchers |
| `devotional-*` | MEDIUM-HIGH | reader searching for comfort; first-impression-critical |
| `systematic-*` | MEDIUM | study seekers; tend to traverse internally once arrived |
| `analogy-*`, `story-*` | VARIABLE | some carry high SEO potential, others serve internal traversal |
| `theologian-*`, `history-*` | MEDIUM-LOW | specific-name searches but low volume |
| Hub pages | LOW | navigated to, not landed on |
| Utility pages (footer, about) | SKIP | structural, not content |

**Tier 2 queue target (the "Hammer-200"):** all `question-*` + all `demolition-*` + top-N `devotional-*` + top-N `systematic-*` + high-ranking `analogy/story-*`, capped at approximately 200 pages. Generate the full ranked list at the start of Tier 2 with a dedicated `node rank-for-expansion.js` script — build that script as the first task of the first Tier 2 session.

---

## Scripts to build before Tier 2 begins

Two small scripts need to exist before Tier 2 starts. Build them as the opening task of the first Tier 2 session:

1. **`rank-for-expansion.js`** — reads `audit-data.json`, clusters by path prefix, ranks within cluster, writes `HAMMER-200.md` (ranked queue, plain text, like `HAMMER-50.md`).
2. **`auto-linker.js` update** — extend the marker check to recognize `<!-- POLISH-LOCKED -->` in addition to `<!-- HAMMER-LOCKED -->`. Both should cause the auto-linker to skip the page. Print distinct log lines (`🔒 HAMMER` vs `✨ POLISH`) so runs are visible.

These are both small. Roughly 30 minutes of work for a single session.

---

## Execution cadence and timeline

At the current ~5-spine-per-run pace:

- **Tier 1 completion:** 4–5 more runs (24 pages remaining; four of them are net-new which each cost a full 22K token rebuild).
- **Tier 2 sweep:** ~30 runs at 6–8 polish-passes each.
- **Tier 3 pruning audit:** 1 audit session + 1–2 follow-on cut-execution sessions.

At one session/day: ~35–40 calendar days to full sweep.
At two sessions/day: ~18–20 calendar days.
At four sessions/day (feasible given cadence): ~9–10 calendar days.

---

## What this changes about closing-protocol and starts-here blocks

`MISSION-CONTROL.md` now reflects **four** phases for the content work, not five:

| Phase | State |
|---|---|
| 1 Diagnostic Audit | ✅ COMPLETE |
| 2 Journey Architecture | ✅ MOSTLY COMPLETE |
| 3 Hammer-50 | 🔨 IN PROGRESS (26 of 50) |
| **3.5 Hammer-Expansion (Tier 2 + Tier 3)** | ⏳ QUEUED — starts when Phase 3 closes |
| 4 Search-Intent Landing Pages | DEPRECATED — rolled into Tier 2 |
| 5 Distribution | ⏳ PENDING — runs in parallel with Phase 3.5 if capacity allows |

Phase 4's original purpose (search-intent landings) is absorbed into Tier 2's first-encounter ranking. Building explicit SEO-driven landing pages is no longer a distinct phase — the reader who lands on ANY polished page gets a first impression that honors the mission, so separate SEO landings are unnecessary.

---

## The test

The Tier 2 treatment is working if:

1. A reader landing on a random Tier-2-polished page cannot tell it apart from a Tier-1 masterpiece on first read.
2. No page on the site reads "second-tier" — there is a shelf, and the whole site is on it.
3. The final-line hammer on every page lands. A reader who reads only the last sentence still gets hit.
4. Every verse is NIV. Every internal link resolves. Every banned move is gone.

If on a random sample of 10 Tier-2-polished pages any of those four fails, the treatment is insufficient and this spec needs tightening. Log findings in the session log and escalate.

---

## The measure (unchanged from CLAUDE.md)

*Did someone who was searching for God find Him here? Did someone confused about His sovereignty come to rest in it? Did someone who felt unloved discover they were chosen before the foundation of the world?*

Now on every page they might land on, not just 50 of them.
