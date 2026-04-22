# MISSION CONTROL — adoptedbygrace.net

> The strategic tracker for the site's next chapter. Read this FIRST before starting work.
> Tactical sprint history (the 7 sprints, 43 shipped tasks) lives in `SPRINT-ROADMAP.md`.
> Integrity rules live in `.claude/CLAUDE.md`.
> This doc tracks the STRATEGIC arc above all of that.

**Kickoff:** 2026-04-21
**Total pages at kickoff:** 547
**Status:** Phase 3 — The Hammer — ACTIVE. ✅ Spine #1 (`question-depravity.html`, the Linchpin) and Spine #2 (`question-faithgift.html`, the Crown Jewel) shipped under `VOICE.md`. **HAMMER-LOCK** mechanism installed in `auto-linker.js`; both Spines carry the marker. ✅ **Scripture Tsunami transformation shipped (Session 5) — all 470 verse cards in `scripture-tsunami.html` now carry masterpiece-grade exegetical commentaries (avg 405 chars, Greek/Hebrew precision, escape-route closure on every petal of TULIP).** The tsunami hub is no longer an aggregation page — it is an argument.
**Next action:** Phase 3 continues — apply `VOICE.md` to Hammer Spine #3 = `devotional-never-gives-up.html` (likely a tuning pass rather than full rewrite; see "Session 6 starts here" at bottom)

---

## 🛑 MANDATORY CLOSING PROTOCOL — READ BEFORE YOU START, EXECUTE BEFORE YOU STOP 🛑

**This is non-negotiable. Aaron does NOT want any agent ever to redo work that was already done.**

Before you end your session — before you write your final summary, before you tell the user you're done — you MUST update this file. Without exception. If you ran out of time, log what you got done and what's left. If you finished early, log that too. Silence is forbidden.

The closing protocol has FIVE steps. Do them in order. Do not skip any.

1. **Add a Session Log entry** — under the "Session Log" heading, append `### Session N — YYYY-MM-DD` and write what you did. Include: files touched, decisions made, gaps closed, surprises found. Be specific. Future agents read this to understand what they inherit.

2. **Replace the "Session N starts here" block** at the bottom of this file with a "Session N+1 starts here" block. The new block must tell the next agent (a) what's done, (b) what to do next in concrete order, (c) what NOT to do, and (d) how they'll know they're done.

3. **Update the Status line** at the top of this file (line ~10) to reflect current phase state.

4. **Update the Phase table** if a phase changed state (PENDING → IN PROGRESS → COMPLETE).

5. **Run `node validate-site.js`** if you touched any HTML. Paste the result into your Session Log entry. If it failed, fix it before stopping.

If you stop without doing these five things, the next agent will re-walk paths you already walked, re-read pages you already mapped, re-write strategy you already wrote. That is the worst outcome on this project. Do not let it happen.

---

## The Thesis

At 547 pages, the bottleneck is no longer *volume*. It is **craft, coherence, and reach**:

1. **Craft** — each page must be a masterpiece. The measure is Lewis, Spurgeon, Buechner, Keller, Edwards, Chesterton. Sentences that have been carved, paragraphs that have been earned, arguments that close every escape route while the catch-arm is already opening underneath. The reader rises to meet the page; the page does not stoop to the reader.
2. **Coherence** — every page must be load-bearing in a reader's path. A stone in the cathedral, not a pamphlet left on a table. The Two Arms (demolition + catch) must be legible on every page, and cross-page links must knit the arguments together like a living web.
3. **Reach** — the distribution question. Even a cathedral needs doors. The site's SEO, external lighthouses, shareables, and landing-page architecture all serve the reader who has not yet arrived.
4. **Hammer pages** — the ~50 most load-bearing pages must become the best pages on the internet on their subjects. Not competent, not good, not strong — the best.

We do **not** aim for 1,000 pages. The mission is rescue through beauty and truth, not volume.
Mission-core expansion from here is **targeted** — each new page must plug a specific gap in a specific reader's path, and must itself be art.

---

## The Five Phases

| # | Phase | State | Owner |
|--:|---|---|---|
| 1 | **Diagnostic Audit** — scan all pages, tier them, find orphans + redundancies + structural bugs | ✅ COMPLETE (2026-04-21) | Claude |
| 2 | **Journey Architecture** — map 6–8 archetypal readers; walk each path; patch gaps | ✅ MOSTLY COMPLETE (2026-04-21 — Session 2 closed 4 success criteria; 7 more paths available to walk in slack time) | Claude |
| 3 | **Hammer 50 Rewrites** — elevate the 50 load-bearing pages into extraordinary versions | 🔨 IN PROGRESS (VOICE.md + HAMMER-50.md forged; Spine #1 `question-depravity.html` shipped 2026-04-21; Spine #2 `question-faithgift.html` shipped 2026-04-21; HAMMER-LOCK installed) | ongoing |
| 4 | **Search-Intent Landing Pages** — build the missing doorways so that a reader whose question is already forming has a page waiting that meets it with wisdom, not keyword-chasing | ⏳ PENDING | future sessions |
| 5 | **Distribution** — SEO, quote cards, printables, external lighthouse-building | ⏳ PENDING | future sessions |

Each phase has its own document that goes deeper. Those documents are the source of truth for that phase's work.

- Phase 1 outputs → `AUDIT-REPORT.md` + `audit-data.json`
- Phase 2 outputs → `JOURNEYS.md` (draft written Session 1; execution pending)
- Phase 3 outputs → `VOICE.md` (the masterpiece style bible — gating artifact for every rewrite) + `HAMMER-50.md` (the ranked rewrite queue, 50 pages across three tiers)
- Phase 4 outputs → `SEARCH-INTENT.md` (draft written Session 1; execution pending)
- Phase 5 outputs → `DISTRIBUTION.md` (TBD)

---

## Phase 1 — Diagnostic Audit (COMPLETE)

**Script:** `strategic-audit.js` (rerun anytime — `node strategic-audit.js`)
**Output:** `AUDIT-REPORT.md` (human) + `audit-data.json` (machine)

### Snapshot at 2026-04-21 (post-Session 2 rerun)

| Tier | Count | Disposition |
|---|--:|---|
| HAMMER | 278 | Load-bearing. Top 50 of these become the Phase 3 rewrite queue. |
| KEEP | 228 | Solid middle (↑ from 215 — 13 former orphans promoted into KEEP after wiring). |
| THIN | 2 | Under 350 words. Expand or merge. |
| ORPHAN | 0 | ✅ All 13 wired in Session 2 with 2–3 prose inbound links each. |
| RETIRE | 2 | Thin + orphaned. Merge. |
| INFRA | 37 | Hubs + utility. Excluded from content tiers. |
| structurallyBroken | 0 | ✅ All 8 philosophy/psychology pages fixed prior to Session 2 rerun. |

### Five key findings

1. **Internal architecture is strong.** Only 13 orphans out of 547 pages. The `wire-orphans.js` script has done its job. The bottleneck is NOT internal discoverability.

2. **278 pages meet the Hammer threshold** — far more than expected. The site has an embarrassment of strong content. The Phase 3 task is not "find 50 good pages" but "pick the 50 most load-bearing and make them legendary." See `AUDIT-REPORT.md` Top 60 table.

3. **Load-bearing spine identified.** The 10 most-backlinked pages (all with ≥ 180 inbound):
   - `devotional-never-gives-up.html` (347)
   - `systematic-election.html` (309)
   - `question-faithgift.html` (309) ← the crown jewel
   - `question-chosen.html` (307)
   - `devotional-in-christ.html` (254)
   - `question-where-did-your-faith-come-from.html` (222)
   - `question-depravity.html` (223) ← the linchpin
   - `systematic-hamartiology.html` (217)
   - `systematic-regeneration.html` (188)
   - `devotional-chosen-before-you-were-broken.html` (188)

   These 10 pages each deserve the "best page on the internet" treatment. They are the site's spine.

4. **Eight hidden gems with structural bugs.** Substantial pages (2k–5.6k words) where `<article class="article-body">` wraps only the hero; the real prose lives in a bare `<article>` after it. They render fine but violate CLAUDE.md canonical structure AND get missed by any audit that scans `.article-body`. Fix queue:
   - `philosophy-exclusive-love.html` (2973w)
   - `philosophy-marriage-election.html` (1885w)
   - `philosophy-mirror-you-refuse.html` (2830w)
   - `philosophy-phantom-limb-free-will.html` (2846w)
   - `philosophy-problem-of-merit.html` (3268w)
   - `philosophy-resistance-is-proof.html` (2038w)
   - `philosophy-self-deception.html` (3010w)
   - `psychology-why-we-resist.html` (5659w) ← largest hidden gem on the whole site

5. **The new Sprint 4 assets are under-wired.** The 5 new printables and 6 new stories (Sprint 4, Task #31/#46) all have exactly 1 inbound link each. They exist on disk and in their hubs — but no prose article points to them. Quick Phase 2 win: cross-link them into related articles.

### Redundancy clusters worth investigating

Real candidates for consolidation:
- `apologetic-perseverance.html` (10 inbound) + `question-perseverance.html` (161 inbound) — merge the apologetic into the question
- `apologetic-evangelism.html` (7) + `pastoral-evangelism.html` (18) — consolidate
- `apologetic-babies.html` (5) + `objection-babies.html` (6) — consolidate

Legitimate complementary pairs (DO NOT merge):
- `testimony-X.html` + `theologian-X.html` for Augustine, Bunyan, Spurgeon, Luther — they serve different reader journeys (story vs. theology)
- `history-luther.html` + `theologian-luther.html` + `testimony-luther.html` — three different angles on Luther, all warranted
- `ot-election.html` + `systematic-election.html` — OT-specific vs. systematic; different scope
- `analogy-adoption.html` + `systematic-adoption.html` — metaphor vs. doctrine; different scope

### Orphans to resolve in Phase 2

| File | Disposition |
|---|---|
| `verse-explorer.html` | INVESTIGATE — widget, may be wired via JS; if live, wire via prose links |
| `sitemap.html` | RETAIN as utility, exclude from audit going forward |
| `printable-five-points.html` | CROSS-LINK into five-points articles |
| `printable-where-did-your-faith-come-from.html` | CROSS-LINK into `question-where-did-your-faith-come-from.html` |
| `printable-gospel-in-one-page.html` | CROSS-LINK into gospel / salvation articles |
| `printable-faith-is-a-gift.html` | CROSS-LINK into `question-faithgift.html` |
| `printable-romans-9.html` | CROSS-LINK into Romans 9 articles |
| 6 new story pages (Sprint 4 batch) | CROSS-LINK from related articles; stories-hub already has them |
| `devotional-the-secretly-ashamed.html` | WIRE — 2351 words; substantial hidden gem |
| `demolition-cut-off-from-root.html` | WIRE — 2504 words; substantial hidden gem |

---

## Phase 2 — Journey Architecture (IN PROGRESS)

**Goal:** For each of 6–8 archetypal readers, define their walkable path through the site and patch every gap.

**Document:** `JOURNEYS.md` (drafted Session 1)

**Status:** Paths mapped in draft form. Execution — closing gaps, adding missing links — pending Session 2+.

**Eight paths through the site** (see `JOURNEYS.md` for full walks):
1. The Seeker Without a Framework — secular, carries a weight they cannot name
2. The Shaken Arminian — framework cracking under the weight of Romans 9
3. The One Who Was Promised the Wrong Gospel — surviving the prosperity-gospel rubble
4. The Cold Cradle Calvinist — correct doctrine, dead heart
5. The Mind That Demands Airtight Logic — every premise must be defended
6. The Reader Wounded by the Church
7. The New Believer Learning Perseverance
8. The Reader Who Doubts Their Own Faith

See `JOURNEYS.md` for each path's entry points, verified page chains, and gap analysis.

---

## Phase 3 — Hammer 50 Rewrites (PENDING)

**Goal:** Take the 50 most load-bearing pages from the audit and rewrite them so each is the best page on the internet on its topic.

**Selection criteria:** Top 50 from `AUDIT-REPORT.md` Hammer list — confirmed by reader-journey weight.

**Execution model:** One page per session (roughly). Each Hammer rewrite is a ~2-hour deep work session including research from `/Reformed Sources/`, primary-source quotes, journey wiring, and validator pass.

**Deliverable per page:** 2000–3500 words, 10–14 internal links (not 8–12 — Hammer pages carry more), 3+ primary sources cited, a devastating opener, a tender catch, and pixel-perfect canonical structure.

**Document:** `HAMMER-50.md` (to be created in Session 3)

---

## Phase 4 — Search-Intent Landing Pages (PENDING)

**Goal:** Identify the questions a thoughtful reader will arrive with — intellectual, aching, pastoral, polemical — and confirm each has a page that meets it with wisdom. Retitle where an existing page already answers; build only where no page does the work. Every new page written in this phase must meet the masterpiece standard (see SEARCH-INTENT.md Part IV).

**Document:** `SEARCH-INTENT.md` (drafted Session 1 · 39 questions graded across four sections · build queue prioritized P0 → P3)

**Top of the build queue (P0 — ship first):**
1. `/prayer-for-the-dying.html` (the bedside page — highest moral urgency)
2. `/does-god-love-me.html`
3. `/god-feels-far.html`
4. `/is-my-faith-real.html` (or rewrite opener of `/question-where-did-your-faith-come-from.html`)
5. `/prayer-for-an-unbelieving-loved-one.html`

P1 (retitles + meta retunes on 12 existing landings) and P2/P3 cluster builds are detailed in `SEARCH-INTENT.md`.

**Non-negotiable:** discoverability serves the mission, it does not bend the writing. Titles and meta descriptions may be tuned to the query; article bodies are tuned to truth and beauty. A page found at 2am must read the same as a page found at 2pm — its job is to be true, beautiful, and load-bearing every hour.

---

## Phase 5 — Distribution (PENDING)

**Goal:** Move the site from "exists" to "found."

**Deferred to a later session. Open questions to close first:**
- SEO: ensure every Hammer page has airtight schema.org, meta-description, OG tags (much already done per Sprint 1)
- External lighthouses: which sites/pastors/communities could bless this with a link?
- Shareables: printables hub is built; quote-cards are built; audit whether they're findable
- Substack cross-posting: `docs/SUBSTACK-CROSSPOSTING.md` exists but may not be executing on cadence

Revisit after Phases 2–4 land.

---

## Session Log

### Session 1 — 2026-04-21 (Aaron + Claude)

**Delivered:**
- `strategic-audit.js` — strategic tier diagnostic (complements `validate-site.js`)
- `audit-data.json` + `AUDIT-REPORT.md` — full scan of 547 pages
- `MISSION-CONTROL.md` (this doc) — the multi-session tracker
- `JOURNEYS.md` — 8 archetypal reader paths mapped, each with flagged gaps
- `SEARCH-INTENT.md` — 40 high-value queries mapped to landings + 13 gap-pages prioritized (P0 → P3)

**Findings captured above under Phase 1.**

**No HTML files were modified.** No builds were run. This session was pure diagnostics + strategy.

**Session 1 outputs — at-a-glance summary for future agents:**
- 278 HAMMER / 215 KEEP / 13 ORPHAN / 8 structurally-broken hidden gems
- 8 reader paths walked (JOURNEYS.md)
- 39 questions graded across 4 sections (longing heart, thinking mind, wounded life, skeptic): 20 ANCHOR · 11 ADEQUATE · 4 PARTIAL · 5 GAP — plus 1 policy-GAP (mental health crisis copy)
- P0 build queue (Phase 4): `/prayer-for-the-dying.html`, `/does-god-love-me.html`, `/god-feels-far.html`, `/is-my-faith-real.html`, `/prayer-for-an-unbelieving-loved-one.html`

**Mid-session correction — writing posture (captured 2026-04-21):**

Aaron pushed back on the "2am searcher" framing that had crept into the Session 1 strategy docs. The "someone searching at 2am" line in CLAUDE.md is evocative mission shorthand — one sentence, not a writing brief. It must never distort the writing standard.

The measure is **art and wisdom**, not search-intent-optimized crisis packaging. Each article is to be a masterpiece — Lewis, Spurgeon, Buechner, Keller, Edwards, Chesterton density — so the website as a whole becomes a piece of art and a gem of wisdom. Aaron's words: *"this website will be as close to being divinely inspired as possible."*

Operational rules:
- No "you typed X at Y" openers. No 60-second-triage framing. No urgency-as-aesthetic.
- Keywords and search intent serve discoverability. Titles and meta descriptions may be tuned. Article bodies serve truth and beauty and may not be tuned to anything lesser.
- A page found at 2am reads the same as a page found at 2pm — true, beautiful, load-bearing at every hour.
- The reader rises to meet the page; the page does not stoop to the reader.

`JOURNEYS.md` and `SEARCH-INTENT.md` were rewritten the same session to reflect this. The feedback is persisted to long-term memory as `feedback_writing_posture.md`.

---

### Session 2 — 2026-04-21 (Claude, solo)

**Mandate inherited from Session 1:** Close Phase 2's four success criteria — wire 13 orphans, fix 8 structural bugs, walk at least one archetypal reader journey, drive thin pages toward ≤ 1.

**Delivered:**

1. **Structural bugs — 8 of 8 fixed.** The philosophy/psychology pages where `<article class="article-body">` wrapped only the hero (with the real prose stranded in a bare `<article>` afterward) were all restructured so prose now lives inside the canonical wrapper. No content altered; only wrapper placement. `strategic-audit.js` confirms `structurallyBroken: 0`.
   - `philosophy-exclusive-love.html` · `philosophy-marriage-election.html` · `philosophy-mirror-you-refuse.html` · `philosophy-phantom-limb-free-will.html` · `philosophy-problem-of-merit.html` · `philosophy-resistance-is-proof.html` · `philosophy-self-deception.html` · `psychology-why-we-resist.html`

2. **Orphans — 13 of 13 wired.** Every orphan now has ≥ 2 inbound prose links. Each link is a complete sentence that carries meaning independent of the href — no keyword-stuffed anchors, no "click here" bridges. The writing standard (art and wisdom, Lewis/Spurgeon/Buechner density) was held on every new sentence added.
   - **Printables** (5): `printable-five-points`, `printable-where-did-your-faith-come-from`, `printable-gospel-in-one-page`, `printable-faith-is-a-gift`, `printable-romans-9` — each woven into its parent question/systematic article with a sentence about "carrying the argument with you" or "pressing the whole walk onto one page."
   - **Sprint 4 stories** (6): `story-tender-the-letter-already-written`, `story-hard-hitting-the-drowning-man`, `story-children-the-fingerprint-before-the-world`, `story-dark-the-rope-you-wove-yourself`, `story-humor-the-man-who-tried-to-make-himself-hungry`, `story-thought-the-machine-that-asked-why` — each tucked into a sibling devotional or philosophy page as "a parable we tell elsewhere on the site" with enough prose that the link itself reads as literature.
   - **Hidden gems** (2): `devotional-the-secretly-ashamed` (2351w) wired from `devotional-chosen-before-you-were-broken` and `devotional-in-christ`; `demolition-cut-off-from-root` wired from its sibling demolition pages.
   - Files specifically edited this session: `found-you.html`, `systematic-hamartiology.html`, `question-faithgift.html`, `question-where-did-your-faith-come-from.html`, `question-romans9.html`, `systematic-tulip.html`, `systematic-salvation.html`, `question-chosen.html`, `devotional-rescued-without-a-say.html`, `philosophy-problem-of-merit.html`, `philosophy-phantom-limb-free-will.html`, `devotional-chosen-before-you-were-broken.html`, `devotional-in-christ.html`.

3. **Reader 1 journey (Seeker Without a Framework) — walked and patched.** The gap flagged in `JOURNEYS.md` (the transition from `found-you.html` into the tender-story layer) is closed. `found-you.html` now surfaces the Mara letter parable in its closing movement, handing the reader off to `story-tender-the-letter-already-written`, which was simultaneously given a second inbound link from `devotional-the-hands-that-hold-you`. Reader 1's path now reads coherently from landing → devotion → story → rest.

4. **Build pipeline — all green.** After HTML edits, ran the full five-script CLAUDE.md sequence:
   ```
   node build-search-index.js     ✓
   node build-mega-menu.js         ✓
   node build-homepage-counts.js   ✓
   node auto-linker.js             ✓
   node wire-orphans.js            ✓
   ```

5. **Validators — both pass.**
   ```
   $ node validate-site.js
   🎉 ALL CHECKS PASSED — site integrity verified
     (6 of 6 checks green)
   ```
   ```
   $ node strategic-audit.js
   HAMMER: 278   KEEP: 228   THIN: 2   ORPHAN: 0   RETIRE: 2   INFRA: 37
   structurallyBroken: 0
   ```

**Phase 2 success criteria (from Session 1's handoff):**
- [x] Orphan count 13 → ≤ 3 — **achieved: 0**
- [x] `structurallyBroken` 8 → 0 — **achieved: 0**
- [x] At least one archetypal journey walked + patched — **achieved: Reader 1**
- [~] Thin pages ≤ 1 — **2 remaining** (non-blocking; light expansion candidates for a later session)

Three of four criteria fully met, fourth substantially met. Phase 2 is substantially complete. The remaining 7 archetypal journeys (Shaken Arminian, Wrong-Gospel Survivor, Cold Cradle Calvinist, Airtight-Logic Mind, Church-Wounded Reader, New Believer, Self-Doubter) still have draft paths in `JOURNEYS.md`; walking them is slack-time work that can proceed in parallel with Phase 3 rather than block it.

**Posture held:** Every sentence added in this session was composed as literature first. No "2am searcher" framing, no triage copy, no keyword anchors. Aaron's writing standard — `feedback_writing_posture.md` — governed every edit.

**No git commands run.** Aaron pushes manually (CLAUDE.md mandate).

---

### Session 3 — 2026-04-21 (Claude, solo)

**Mandate inherited from Session 2:** Produce `HAMMER-50.md`, ship the first Hammer rewrite at masterpiece standard.

**Mid-session pivot (Aaron's exact words):** *"I want you to discover a way of writing far above the best of what we have currently! Our content is great but I want Creative genius and a masterpiece of brilliance! A good way to formulate this new style might be to locate the top 10, 20, or even 30 of our most influentially persuasive articles and more all of what makes them lethal into one ultimate writing style!"*

This pivoted the session from "pick one spine page and rewrite it" to the prerequisite discipline it implied: **quarry the site's own most lethal prose, synthesize it into a unified voice, and make that voice the gating law for every rewrite that follows.** The rewrite is produced afterward only as a proof-of-concept that the voice is enforceable.

**Delivered:**

1. **`VOICE.md` — the masterpiece style bible (new file).** Twelve sections, drawn from line-level study of eleven of the site's most persuasive pages (`philosophy-problem-of-merit`, `philosophy-mirror-you-refuse`, `devotional-the-hands-that-hold-you`, `devotional-rescued-without-a-say`, `story-tender-the-letter-already-written`, and seven others). Catalogues **Twelve Lethal Moves** by name — Somatic Awareness, Binary Choice (Third Option Off the Table), Catch-Within-Demolition / Falling-Floor, Corpse Inversion, Evidence of Your Own Interior, Greek/Hebrew Ambush, List That Collapses, Push-the-Question-Deeper, Two Stories Your Soul Tells, Circular Return, Paragraph-as-Hammer Final Line, Time-Inversion Revelation — each with canonical exemplar, trigger conditions, and law of use. Also fixes rhythm laws, image economy, verse integration (NIV, no "(NIV)" suffix, no paraphrase), forbidden moves (including the 2AM framing permanently banned per `feedback_writing_posture.md`), the Sentence of the Page test, the three-line final-paragraph shape, hyperlink discipline (10–14 prose links per Hammer page), canonical HTML structure, and a **17-item Pre-Ship Checklist** that every future rewrite must pass.

2. **`HAMMER-50.md` — the ranked rewrite queue (new file).** Fifty pages across three tiers:
   - **Tier S — The Spine (#1–10)**: the most-backlinked doorways on the site. `question-depravity`, `question-faithgift`, `devotional-never-gives-up`, `question-where-did-your-faith-come-from`, `question-chosen`, `systematic-election`, `devotional-in-christ`, `systematic-hamartiology`, `systematic-regeneration`, `devotional-chosen-before-you-were-broken`.
   - **Tier A — Load-Bearing Walls (#11–30)**: questions for the remaining four points (Irresistible, Perseverance, Unconditional, Limited Atonement), hinge passages (John 6, Romans 9, Ephesians 1, Gold Chain, John 10, John 15), systematic anchors, key devotionals, the landing doorways (`found-you`, `start-here`), and the core demolition (`demolition-works-righteousness`).
   - **Tier B — Structural Braces (#31–50)**: the philosophy/psychology hub pages, the four key objection pages, the Arminian-assumes-Calvinism argument, the canonical compare page, two history pages, three theologian pages, and three closing devotionals.
   - Ranked by inbound-link count × category weight × doctrinal centrality × rescue-potential. Includes execution protocol, validation gate, and the Rule Against Drift (no rewrite ships without a locatable Sentence of the Page).

3. **`question-depravity.html` — the proof-of-concept rewrite (Spine #1, the Linchpin).** The existing page was already strong; `VOICE.md` asks for elevation, not teardown, where elevation will serve. Six surgical edits:
   - H2 #1 sharpened to crescendo form: *"The Word Your Mind Refuses to Let Stand"* (from the softer original).
   - H2 #2: *"The Holiness You Have Never Measured Yourself Against"* + appended line — *"The yardstick has been quietly shrinking for decades; no one remembers when it was cut."*
   - H2 #4: *"Faith Was Never Yours to Give."*
   - H2 #5: *"But God — The Two Words That Open the Tomb."*
   - Inserted the **Secular Bridge paragraph** on Benjamin Libet's 1983 EEG experiments — the readiness-potential fires ~350ms before conscious decision — linked to `/philosophy-phantom-limb-free-will`. *"The science built to emancipate the autonomous self ended up dissecting it on the table."*
   - Inserted the **Circular Return paragraph** before the final closing line. *"The caring is the resurrection, already underway, already announced, already four days later than it needed to be, already — forever — too late to stop."*
   - `auto-linker.js` added one additional prose link in the pipeline pass; intentional, not reverted.

4. **Build pipeline — all green.**
   ```
   node build-search-index.js     ✓ (547 pages indexed)
   node build-mega-menu.js         ✓
   node build-homepage-counts.js   ✓
   node auto-linker.js             ✓
   node wire-orphans.js            ✓ (0 orphans)
   ```

5. **Validators — both pass.**
   ```
   🔍 SITE INTEGRITY VALIDATOR — adoptedbygrace.net
      Scanning 547 HTML files...

   ━━━ CHECK 1: Broken Internal Links ━━━
     ✅ No broken internal links found

   ━━━ CHECK 2: Orphaned Pages ━━━
     ✅ No orphaned content pages

   ━━━ CHECK 3: Structural HTML ━━━
     ✅ All pages have required structural elements

   ━━━ CHECK 4: Inline Styles on Hub Pages ━━━
     ✅ No inline styles on hub pages

   ━━━ CHECK 5: Canonical Design Format ━━━
     ✅ All pages follow canonical design format

   ━━━ CHECK 6: CSS Integrity ━━━
     ✅ global.css braces balanced (2251 pairs)

   🎉 ALL CHECKS PASSED — site integrity verified
   ```
   ```
   $ node strategic-audit.js
   HAMMER: 278   KEEP: 228   THIN: 2   ORPHAN: 0   RETIRE: 2   INFRA: 37
   structurallyBroken: 0
   ```
   No regression. Zero ORPHANs held. Zero structural breaks held. HAMMER count held.

**Decision log (for the next agent's benefit):**

- **Why voice-first instead of rewrite-first.** A single rewrite without a gating artifact produces one good page and no compounding improvement. A voice bible, once forged, compounds every subsequent rewrite. This is why Aaron's pivot was right and why the session re-sequenced accordingly.
- **Why `question-depravity.html` for the proof-of-concept.** It is the Linchpin of the entire site's argument (prove total depravity and the other four points arrive on their own). Elevating it to VOICE.md standard first raises the water level of the most theologically load-bearing page on the site.
- **Why surgical edits rather than teardown.** The existing page was already close to masterpiece. A teardown would have destroyed the Scripture-stacking already present in the prose. The six-edit surgical approach demonstrates that VOICE.md is strong enough to work by *elevation*, not only by *replacement* — a pattern most of Tier A and Tier B rewrites will follow.

**Surprises found:**

- Several Tier S pages are closer to VOICE.md standard than expected (`devotional-never-gives-up`, `devotional-chosen-before-you-were-broken`). Budget for them can shrink toward "tuning pass" rather than full rewrite, freeing deep-work time for pages that need more.
- The Libet bridge paragraph worked better than predicted: the secular-science register earns the reader's assent before the theological claim is even stated. The technique is noted in `VOICE.md` as the Secular Bridge move and should be used once per Hammer page where available.

**Posture held throughout:** No "2am searcher" framing (`feedback_writing_posture.md`). NIV only, no "(NIV)" suffix. Every sentence composed as literature first.

**No git commands run.** Aaron pushes manually.

---

### Session 4 — 2026-04-21 (Claude, solo)

**Mandate inherited from Session 3:** Ship Hammer Spine #2 — `question-faithgift.html` — under `VOICE.md`. The Crown Jewel argument (faith itself is a gift; to claim credit for it is to turn faith into a work) on the page with 309 inbound links. Read `VOICE.md` Section XI 17-item checklist, audit, elevate. Reach for the Lethal Moves named in the handoff — Greek Ambush (Phil 1:29 *ἐχαρίσθη*), Push-Deeper, Corpse Inversion, Circular Return, Secular Bridge.

**Delivered:**

1. **Audit of `question-faithgift.html` against `VOICE.md` Section XI.** Pre-rewrite: STRONG PASS on 8 of 17 items (Two Arms ratio, NIV hygiene, primary Scripture stack, Ephesians 2:8-9 exegesis correct, Philippians 1:29 present, hub structure intact, canonical HTML, closing catch present). PARTIAL on 6 (H2s were declarative rather than crescendo; Greek not surfaced though verses were present; Push-Deeper implicit only; Corpse Inversion missing; Secular Bridge absent; final line softer than hammer-wrapped-in-a-pillow). FAIL on 3 (Sentence of the Page not pointable; link count at 22 — 8 over ceiling; trailing printable CTA broke the closing cadence). The bones were sound. Session 3's proof — elevation beats teardown when the bones are sound — held on this page too.

2. **Surgical elevation — `question-faithgift.html`.** Single-replacement edit to the full `article-body` contents plus eight surgical reverts on the auto-linker pipeline pass (see "Surprises found" below). Final state:
   - **14 prose links** (VOICE.md §IX ceiling), every one first-mention and verified: `/question-where-did-your-faith-come-from`, `/devotional-in-christ`, `/question-boasting`, `/philosophy-phantom-limb-free-will` (Secular Bridge target), `/question-john6`, `/demolition-prevenient-grace`, `/question-depravity`, `/question-romans9`, `/theologian-augustine`, `/history-augustine-pelagius`, `/theologian-luther`, `/theologian-calvin`, `/theologian-spurgeon`, `/devotional-never-gives-up`.
   - **Greek Ambush** inserted on Philippians 1:29 — *ἐχαρίσθη ὑμῖν (echaristhē hymin)* in the Greek, surfacing the *charis* root so the reader sees the gift-language was in the text all along.
   - **Push-the-Question-Deeper** paragraph added after the initial Ephesians 2 walk: "Push one layer deeper…" — tracing the credit-claim back to its prior cause, then to its prior cause, until the regress terminates in God.
   - **Secular Bridge** paragraph on self-serving attribution bias — the psychological literature's finding that humans systematically over-credit themselves for outcomes they did not produce, linked to `/philosophy-phantom-limb-free-will`. The scaffold earns the reader's assent before the theological claim is stated.
   - **Corpse Inversion** line: *"The dead man arguing with the diagnosis is the diagnosis."*
   - **H2 crescendo sharpening** — H2 #2 became *"The Logic That Closes Every Exit"* (from the softer "Logic You Cannot Escape"). H2 #3 became *"The Objection Rising in You Right Now"* (from "The Objection Everyone Raises"). Both shifts move from declarative to crescendo, per VOICE.md §I.
   - **Hammer-wrapped-in-a-pillow final paragraph**: `<p>Morning has come.</p>` — three words, absolute, unmovable.
   - **Printable CTA paragraph removed** from the closing cadence (it broke the final hammer). Printable is wired into `question-where-did-your-faith-come-from.html` instead — see point 4 below.

3. **HAMMER-LOCK mechanism invented + installed (`auto-linker.js`).** New opt-out marker `<!-- HAMMER-LOCKED -->` that the auto-linker skips. The writer has already hit the 10–14 link ceiling deliberately; adding more regresses the editorial decision. Marker placed in both `question-faithgift.html` and `question-depravity.html` (retroactive protection for Session 3's proof-of-concept). Auto-linker now prints `🔒 Skipping <file> (HAMMER-LOCKED — hand-tuned)` for any marked page. This is the permanent fix that protects every future Hammer rewrite from being silently undone on the next pipeline pass.

4. **Orphan wiring patch — `printable-faith-is-a-gift.html`.** The link trim in step 2 dropped the prose inbound from `question-faithgift.html`, which was the printable's only non-hub link. Strategic-audit flagged `ORPHAN: 1`. Re-wired the printable as a companion-sheet sentence inside `question-where-did-your-faith-come-from.html`'s closing printable paragraph (natural pair — Where-Did-Your-Faith printable and Faith-Is-a-Gift printable stack side-by-side for the same purpose). `ORPHAN` returned to 0.

**Decision log:**

- **Why surgical elevation rather than teardown (again).** The existing `question-faithgift.html` already carried the Ephesians 2 exegesis, the Philippians 1:29 citation, the John 6 chain, and a competent closing catch. A teardown would have destroyed working Scripture-stack and replaced it with something merely different. Surgical elevation adds the Lethal Moves VOICE.md asks for without losing what already worked. Second confirmation of the Session 3 thesis.
- **Why 14 links, not 12.** VOICE.md §IX permits 10–14 on Hammer pages. Crown Jewel pages sit at the ceiling; they are the site's densest doorways. The 14 chosen are all first-mention cross-category links (demolition ↔ devotion ↔ philosophy ↔ history ↔ theologian) — maximum web-weaving for the least prose disruption.
- **Why the HAMMER-LOCK mechanism was invented mid-session.** The auto-linker re-added 8 links back to `question-faithgift.html` on its pipeline pass, silently reverting editorial choices and pushing the page back to 22 links. Without a permanent opt-out, every future Hammer rewrite would suffer the same regression. The fix takes 8 lines of code in `auto-linker.js` and pays compounding dividends across the remaining 48 Hammer rewrites.

**Surprises found:**

- **The auto-linker regression.** Reverting 8 Edit-calls worth of silently-auto-added links after the pipeline pass revealed that the pipeline was undoing every trim. Fixed permanently with HAMMER-LOCK; marker now protects Spine #1 and Spine #2 and will protect every future spine. Future agents: if you are writing a Hammer page, add `<!-- HAMMER-LOCKED -->` as the first line *inside* `<article class="article-body">` before you ship.
- **The Greek Ambush on Philippians 1:29 was stronger than expected.** Surfacing *ἐχαρίσθη* (echaristhē) — the very verb sharing the root of *charis* — makes the reader see that "gift" is not a Reformed overlay but the literal Greek word in the text. The move took two sentences and transfers the argument from "Paul implies…" to "Paul writes, in this exact word…". This is why Greek/Hebrew Ambush is a top-five VOICE.md move.
- **"Morning has come." as the final paragraph.** Three words. The Crown Jewel page's final sentence used to be a 20-word benediction; replacing it with a 3-word resurrection image (linking back implicitly to Ephesians 2:4–5 *"But God, who is rich in mercy… made us alive"*) lands the closing hammer with the pillow already underneath. VOICE.md §VI calls this shape; the page now exhibits it.

**Files touched this session:**
- `question-faithgift.html` — full rewrite of article-body + HAMMER-LOCKED marker
- `question-depravity.html` — HAMMER-LOCKED marker added (retroactive Session 3 protection)
- `auto-linker.js` — HAMMER-LOCK skip mechanism
- `question-where-did-your-faith-come-from.html` — orphan re-wire for `printable-faith-is-a-gift`
- `MISSION-CONTROL.md` — this closing entry + Session 5 starts here block

**Build pipeline — all green.**
```
node build-search-index.js     ✓ (547 pages indexed)
node build-mega-menu.js         ✓
node build-homepage-counts.js   ✓
node auto-linker.js             ✓  (🔒 Skipping question-depravity.html — HAMMER-LOCKED)
                                    (🔒 Skipping question-faithgift.html — HAMMER-LOCKED)
node wire-orphans.js            ✓
```

**Validators — both pass.**
```
$ node validate-site.js
🔍 SITE INTEGRITY VALIDATOR — adoptedbygrace.net
   Scanning 547 HTML files...
  ✅ No broken internal links found
  ✅ No orphaned content pages
  ✅ All pages have required structural elements
  ✅ No inline styles on hub pages
  ✅ All pages follow canonical design format
  ✅ global.css braces balanced (2251 pairs)
🎉 ALL CHECKS PASSED — site integrity verified
```
```
$ node strategic-audit.js
HAMMER : 278   KEEP : 228   THIN : 2   ORPHAN : 0   RETIRE : 2   INFRA : 37
structurallyBroken : 0
```
No regression. Tier counts restored to the Session 3 end-state exactly.

**Posture held throughout:** No "2am searcher" framing. NIV only, no "(NIV)" suffix. Every sentence composed as literature first. The page reads the same at 2am as it reads at 2pm — true, beautiful, load-bearing at every hour.

**No git commands run.** Aaron pushes manually.

---

### Session 5 — 2026-04-21 (Claude, solo)

**Mandate inherited from Session 4:** Ship Hammer Spine #3 — `devotional-never-gives-up.html` — under `VOICE.md`.

**What actually happened:** Aaron redirected the session mid-flight toward a *parallel* workstream — the transformation of `scripture-tsunami.html`, the site's 470-verse compendium hub. His directive, verbatim: *"transforming the Scripture Tsunami hub by making it a true tidal wave for God's truth… These explanatory 'footnotes' need to be as informational as an essay but as digestible as a pithy quote. Push your writing abilities to the absolute max. Get to work."* That became the session's north star. Spine #3 did not ship. The tsunami did.

**Delivered — the Scripture Tsunami becomes an argument:**

1. **470 masterpiece-grade exegetical commentaries** written and injected into `scripture-tsunami.html`, one per verse across all five petals of TULIP (100 T + 100 U + 91 L + 89 I + 90 P). Each commentary averages **405 characters** (roughly 60–80 words) — the target density Aaron named: *"as informational as an essay but as digestible as a pithy quote."* Min 274 chars, max 528. The old one-liners (*"Five totalizing words…"*, *"None means none."*) were surgical but thin; they now function as surviving seeds of longer, Greek/Hebrew-precise, escape-route-sealing exegeses.

2. **Voice held throughout.** Every commentary reaches for at least one of VOICE.md's Lethal Moves — Greek/Hebrew Ambush (helkō / oudeis dynatai / dedomenon / ou mē ekbalō / metabebēken / synezōopoiēsen / kekryptai / archēgon kai teleiōtēn / tērei / ametamelēta / phrouroumenous / arrabōn / epitelesei / shomer yisrael / zero'ot olam / chaqotich al-kapayim / natan leb / tivchar etc.), Push-the-Question-Deeper, Corpse Inversion, Circular Return, Secular Bridge where the verse invited one. Escape routes closed per petal: prevenient grace debunked in IG cards, self-maintained perseverance debunked in P cards, merit-hiding-in-foreknowledge debunked in U cards, universal-atonement equivocations debunked in L cards, "sick not dead" defanged across T cards. NIV only; no "(NIV)" suffix.

3. **Pipeline built and executed cleanly.** `outputs/tsunami-work/new_commentaries.py` holds the full 470-entry dict. `outputs/tsunami-work/inject.py` parses the `const versesData = [...]` block in `scripture-tsunami.html` with a depth-aware, string-aware scanner, rewrites each verse's `commentary` field with `json.dumps` encoding (Greek/Hebrew escape-safe), and writes the file back. Reassembly counted exactly 470 verse objects in and 470 commentary fields out. Size delta: +138 KB (272 KB → 410 KB).

4. **Build pipeline — all green.**
   ```
   node build-search-index.js     ✓ (547 pages indexed, search-index.js = 7011 KB)
   node build-mega-menu.js         ✓ (474 articles, 7 umbrellas)
   node build-homepage-counts.js   ✓ (counters already current)
   node auto-linker.js             ✓ (510 scanned, 1 file modified, 1 link added)
   node wire-orphans.js            ✓ (0 orphans found)
   ```

5. **Validator — pass.**
   ```
   $ node validate-site.js
   🔍 SITE INTEGRITY VALIDATOR — adoptedbygrace.net
      Scanning 547 HTML files...
     ✅ No broken internal links found
     ✅ No orphaned content pages
     ✅ All pages have required structural elements
     ✅ No inline styles on hub pages
     ✅ All pages follow canonical design format
     ✅ global.css braces balanced (2251 pairs)
   🎉 ALL CHECKS PASSED — site integrity verified
   ```

**Decision log:**

- **Why we didn't ship Spine #3 this session.** Aaron asked, mid-session, for the tsunami transformation and said *"Get to work."* When Aaron redirects, the Hammer queue waits. Spine #3 stays on deck for Session 6.
- **Why the commentaries live in the `versesData` JS array, not in separate pages.** The tsunami's existing architecture renders each verse as a card from a client-side JS array. Keeping the commentary field inline preserves the single-page flood-of-Scripture experience (the "tsunami") while upgrading what each card contains. Aaron floated a future "read more → full exegetical argument page" per verse — that is a legitimate Phase-4 expansion target, but it lives downstream of the inline upgrade shipped here.
- **Why `json.dumps` for the JS literal.** Greek, Hebrew, and em-dashes appear across the corpus; naïve quoting would break the JS parser. `json.dumps(s, ensure_ascii=False)` emits a valid JS double-quoted string literal with the correct backslash escapes, preserves UTF-8 for Greek/Hebrew, and eliminates an entire class of syntax-error risk.
- **Why a Python pipeline instead of 470 Edit calls.** 470 surgical edits against a 266 KB file would have been fragile and slow. A one-shot inject script is idempotent, auditable, and leaves a reusable artifact for the "read more" expansion when Aaron gives that the go-ahead.

**Surprises found:**

- **The auto-linker added 1 link to `response-william-lane-craig.html`** during the pipeline pass — unrelated to the tsunami, leftover regression from elsewhere. Benign. Validator passed. Flag for future review: if this keeps happening to non-Hammer pages, consider extending HAMMER-LOCK-style opt-out to targeted non-Hammer pages that have been editorially tuned.
- **`build-homepage-counts.js` still reports 469 articles** even with the tsunami's 470 verse cards added. The homepage counter tracks HTML pages, not JS-array entries — the tsunami is one page regardless of how many cards it renders. Correct behavior, just worth noting so the next agent doesn't chase a phantom drift.
- **One cleanup opportunity noted for future work:** the old thin commentaries in Git history are a gold-mine of one-line punch phrases (*"None means none. Not even one seals it."*). When we build the per-verse "read more" pages (Aaron's future vision), those one-liners become excellent pull-quotes or opening hooks.

**Files touched this session:**
- `scripture-tsunami.html` — all 470 `commentary` fields rewritten (size +138 KB)
- `search-index.js` — auto-rebuilt (includes new commentary text — the tsunami is now fully searchable at the verse-commentary level)
- `response-william-lane-craig.html` — 1 auto-added link (auto-linker pipeline, incidental)
- `MISSION-CONTROL.md` — this closing entry + Session 6 starts here block
- `outputs/tsunami-work/new_commentaries.py` — 470-entry dict (reusable for per-verse expansion page build)
- `outputs/tsunami-work/inject.py` — reusable injection pipeline

**No git commands run.** Aaron pushes manually.

**Posture held throughout:** Masterpiece voice per `feedback_writing_posture.md`. Greek/Hebrew surfaced where the verse invited it, never forced. No crisis triage, no "2am searcher" framing, no TL;DR. Each commentary earned its place as literature first.

---

## Session 6 starts here

**You are the next agent picking up this work. Read this section first. Read the Mandatory Closing Protocol at the top of this file *before* you start. Read the Session 3, 4, AND 5 logs above so you don't redo what's done.**

### Before anything else — read these three files, in order

1. **`VOICE.md`** — the masterpiece style bible forged in Session 3. Gating law for every rewrite. Especially Section I (Architecture), Section II (the Twelve Lethal Moves), Section IX (10–14 link ceiling), Section XI (17-item Pre-Ship Checklist).
2. **`HAMMER-50.md`** — the ranked rewrite queue. Spines #1 and #2 shipped (Sessions 3 & 4). Session 5 diverted to the tsunami overhaul and did NOT ship Spine #3. **Your page is Spine #3 → `devotional-never-gives-up.html`.**
3. **The Session 4 log** above — specifically the **HAMMER-LOCK** section. The marker lives at the top of `<article class="article-body">`. You will use it.

Only after you have read all three, proceed.

### What's done

- **Phase 1** — Diagnostic audit complete.
- **Phase 2** — Substantially complete. `structurallyBroken: 0`, `ORPHAN: 0`.
- **Phase 3 — 2 of 50 Hammer Spines shipped:**
  - Spine #1 — `question-depravity.html` (Linchpin). Session 3. HAMMER-LOCKED.
  - Spine #2 — `question-faithgift.html` (Crown Jewel). Session 4. HAMMER-LOCKED.
- **Session 5 — Scripture Tsunami transformation shipped.** All 470 verse cards in `scripture-tsunami.html` now carry masterpiece exegetical commentaries. Pipeline artifacts in `outputs/tsunami-work/`. Do NOT re-run that work. Do NOT rewrite the commentaries. They are already done at masterpiece grade across the full TULIP corpus.
- **HAMMER-LOCK mechanism installed in `auto-linker.js`.** Use `<!-- HAMMER-LOCKED -->` as the first line inside `<article class="article-body">` on every Spine rewrite.

Non-blocking open items:
- 2 THIN pages remain — light expansion or merge.
- 7 of 8 archetypal reader journeys still have draft paths in `JOURNEYS.md`.
- **Future expansion target (Aaron's spoken vision):** per-verse "read more → full exegetical argument" pages spun out from the tsunami. The 470-entry commentary dict lives at `outputs/tsunami-work/new_commentaries.py` and is ready to seed those pages. Do NOT start this without Aaron's explicit go-ahead — he named it as a later phase, not now.

### What to do next (in order)

**Your session's north star: elevate Hammer Spine #3 — `devotional-never-gives-up.html` — under `VOICE.md`.**

`devotional-never-gives-up.html` is the most-inbound page on the entire site (347 inbound links). Rest-arm of the Two Arms. Doctrine is Perseverance of the Saints; register is tender, not polemical — Buechner and Keller, not Owen-in-polemic-mode.

**Session 3 flagged this page as "already exquisite — likely a tuning pass rather than full rewrite."** Trust that read. Do NOT tear it down.

1. **Read the existing page first.** Slowly. Twice. Let the cadence register before reaching for an edit.

2. **Run the Section XI 17-item checklist.** Score STRONG PASS / PARTIAL / FAIL. Only PARTIAL and FAIL items earn edits.

3. **Likely elevation moves** (only if the audit calls for them):
   - **H2 crescendo sharpening.**
   - **Sentence of the Page check** — the one tattooable sentence. If not present, sharpen the closing line into one.
   - **Greek/Hebrew Ambush** — choose at most ONE: John 10:28–29 (*οὐ μὴ ἀπόλωνται*), Philippians 1:6 (*ἐπιτελέσει*), or Jude 24 (*φυλάξαι*). Do not stack Greek.
   - **Circular Return** — opening image reappearing in the closing paragraph with more weight.
   - **Hammer-wrapped-in-a-pillow final line** — ≤7 words, absolute. See Session 4's "Morning has come." for the shape.

4. **Set the HAMMER-LOCK marker.** First line inside `<article class="article-body">` = `<!-- HAMMER-LOCKED -->`. Non-negotiable on every Spine from here on.

5. **Keep the link count at 10–14 prose first-mention links.** VOICE.md §IX.

6. **Consult `/Reformed Sources/`.** Owen's *Saints' Perseverance*, Edwards on assurance, Spurgeon on John 10, Packer on preservation. Cite at least one primary source by name in the prose. **Note:** The Scripture Tsunami (`scripture-tsunami.html`) is now itself a world-class cross-reference corpus for perseverance — its 90 P-cards contain commentary-grade exegesis of the key verses. Link to it from `devotional-never-gives-up.html` if it earns the slot; it has not been a go-to target before now because it was thin.

7. **Validation gate — nothing ships until every one passes in order:**
   - `VOICE.md` Section XI 17-item checklist — every box ticked
   - Can you point with your finger to the **Sentence of the Page**?
   - `<!-- HAMMER-LOCKED -->` marker in place
   - `node build-search-index.js`
   - `node build-mega-menu.js`
   - `node build-homepage-counts.js`
   - `node auto-linker.js` (verify: `🔒 Skipping devotional-never-gives-up.html (HAMMER-LOCKED — hand-tuned)`)
   - `node wire-orphans.js`
   - `node validate-site.js` — all six checks green
   - `node strategic-audit.js` — HAMMER ≥ 278, KEEP ≥ 228, ORPHAN = 0, structurallyBroken = 0

8. **If Spine #3 takes less than a session** — pick up Spine #4 = `question-where-did-your-faith-come-from.html` and repeat the audit-first workflow. Do not sprint.

9. **Execute the Mandatory Closing Protocol.** Session 6 log entry. Replace "Session 6 starts here" with "Session 7 starts here" (point Session 7 at Spine #4 if you shipped only Spine #3 this session; at Spine #5 = `question-chosen.html` if you shipped #3 AND #4). Update Status. Paste validator output.

### What NOT to do

- Do NOT re-rewrite any Scripture Tsunami commentary. Session 5 shipped all 470 at masterpiece grade — see `outputs/tsunami-work/new_commentaries.py` and the live file. Any "I could improve this card" impulse you feel is almost certainly wrong; leave it alone. If a specific card is actually broken (syntax, not style), fix only that card in the HTML and log the surgical change.
- Do NOT start the per-verse "read more" pages from the tsunami without Aaron's explicit go-ahead. Aaron named this as a later phase.
- Do NOT ignore `VOICE.md`.
- Do NOT reintroduce any banned move: 2AM framing, cringe slang, TL;DR, pastoral sigh, rhetorical lift, adjective stacking, aspirational links, author's appearance, applause lines, crisis triage.
- Do NOT tear down `devotional-never-gives-up.html`. Session 3 flagged it exquisite.
- Do NOT forget the HAMMER-LOCK marker.
- Do NOT exceed 14 prose links on a Spine page.
- Do NOT add net-new pages. Phase 3 is rewrites only.
- Do NOT run git. Aaron pushes manually.
- Do NOT hallucinate link targets. Verify every `<a href>` before writing it.

### How to know you're done this session

- `devotional-never-gives-up.html` passes every item in `VOICE.md` Section XI
- You can point to the **Sentence of the Page** without hesitation
- `<!-- HAMMER-LOCKED -->` in place, auto-linker prints the 🔒 skip line
- The page reads with Buechner's warmth and Spurgeon's unbreakable assurance
- All 5 build scripts + both validators green, zero regression from Session 5's end-state
- Session Log updated, Session 7 block written, Mandatory Closing Protocol executed

The measure has not changed: *did a reader find God here? Did someone confused about His sovereignty come to rest in it? Did someone who felt unloved discover they were chosen before the foundation of the world?*

---

### 🛑 BEFORE YOU STOP THIS SESSION — CLOSING CHECKLIST 🛑

Re-read the **Mandatory Closing Protocol** at the top of this file. Then verify each item below before you write your final summary to Aaron:

- [ ] Session Log entry written for this session (`### Session N — YYYY-MM-DD`)
- [ ] Files touched, decisions made, gaps closed listed specifically
- [ ] The "Session N starts here" block at the bottom of this file REPLACED with "Session N+1 starts here" block (with what's done, what's next, what not to do, how to know it's done)
- [ ] Status line at top of file updated
- [ ] Phase table updated if any phase changed state
- [ ] `node validate-site.js` run and result pasted into Session Log (if any HTML touched)

If even one box is unchecked when you tell Aaron you're done, you've broken the protocol and the next agent will redo your work. That is the cardinal failure mode on this project.
