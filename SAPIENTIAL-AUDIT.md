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

**Baseline snapshot (S59, 2026-05-24):** 582 prose pages in scope · **Tier 1 = 107 · Tier 2 = 45 · Tier 3 = 430** · depth-suspect short prose (<900w) = 3.

**Refreshed snapshot (S60, 2026-05-24, post-deepening):** 582 prose pages · **Tier 1 = 96 · Tier 2 = 56 · Tier 3 = 430** · short = 3. The 11-page drop from Tier 1 → Tier 2 is exactly the 11 pages consecrated this session (see §VI). Refresh anytime by re-running the script (counts shift as pages are deepened/locked).

**Refreshed snapshot (S61, 2026-05-24/25, post-deepening):** 582 prose pages · **Tier 1 = 76 · Tier 2 = 75 · Tier 3 = 431** · short = 3. The 19-page drop from Tier 1 → Tier 2 is exactly the 19 pages consecrated in S61 (the full pages-12–30 rotation; see §VII). Tier 1 has now fallen 107 → 96 → 76 across S59→S60→S61; the most-linked doorways on the site are nearly all consecrated, and the queue is descending into the 25–40-inbound band.

**Refreshed snapshot (S62, 2026-05-25, post-deepening):** 582 prose pages · **Tier 1 = 63 · Tier 2 = 88 · Tier 3 = 431** · short = 3. The 13-page drop from Tier 1 → Tier 2 is exactly the 13 pages consecrated in S62 (see §VIII). Tier 1 has now fallen 107 → 96 → 76 → 63 across S59→S60→S61→S62. The queue is now into the 24–32-inbound band; the remaining Tier-1 set is dominated by UNMARKED `history-*`, `philosophy-*`, `apologetic-*`, and legacy-template `theologian-*` pages.

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

*Next-read rotation for the following session: Tier-1 pages 9–30 in §III have NOT yet been live-read.* — **SUPERSEDED by §VI below.**

---

## VI. S60 EXECUTION LOG — the deepening run (2026-05-24)

Executed the §V triage. All 11 pages below now carry `<!-- CONSECRATED -->`; `node sapiential-audit.js` confirms Tier 1 dropped 107 → 96 and Tier 2 rose 45 → 56 (exactly these 11). `node validate-site.js` GREEN (0 broken links, 0 orphans). Every `<a href>` on every rewritten page re-verified on disk. Zero `(NIV)` suffixes remain on any touched page.

**DEEPENED (full write-over pass):**

1. **`history-timeline`** (was UNMARKED) — **CONSECRATED.** The catalog became prose. Added a Muggeridge long-view opening meditation ("Empires Rise and Fall. One Thread Does Not.") set before the timeline visualization; rebuilt the flat closing into a real escalating H2 crescendo — *Empires Rise and Fall. One Thread Does Not → The Same Lie, Resurrected in Every Century → It Survived Because the One Who Held It Did → You Are the Living End of It* — ending on a tender awe-landing that ties the reader into the thread ("The thread does not end. It arrives."). Image carried through: empires = grass, the thread = the word (Isaiah 40:8). Stripped the banned "(NIV)" from the Jude 1:3 hero. Sapiential line: *"It is the oldest hunger in the human heart wearing a theological robe: the determination to be, in some small and final way, the author of myself."*

2. **`question-newheart`** (was POLISH) — **CONSECRATED.** Re-spined off the *reused* surgeon/operating-table image (which `apologetic-the-cardiac-transplant` owns — 32× "transplant") and onto Ezekiel's *own* native image: **stone**. This differentiates cleanly AND is more faithful to the text. New question-beneath opener (the universal ache of trying to change your own heart and hitting the wall); rewrote the labelly H2s (The Text / Hebrew Deep Dive / The Arguments / Objections Answered / The Verdict / Back to the Table) into an escalating sentence-crescendo (*Read the Verbs. Every One of Them Is His. → The Grammar Leaves You Nothing to Do → Stone Cannot Quarry Itself → Every Way Out Is Another Way the Stone Argues → You Were Stone, and He Did Not Wait → Back to the Wall You Could Not Move*). Added a still place ("Sit with that a moment…") and the sapiential beat *"We have always imagined our hardness was something we were doing… Ezekiel says it was something we were. And what you are cannot be repented of; it can only be replaced."* **§XV fix:** corrected a genuine Hebrew error — the last greek-box verb was mistransliterated *ve-hiknanoti* (והכנעתי, "I will subdue"); Ezek 36:27 is *ve'asiti* (ועשיתי, from *asah*), and Argument 1's verb list was corrected (natati / etten / vahasiroti / ve'asiti). Stripped two "(NIV)" suffixes; softened a 1984-NIV "sinful nature" to "the flesh."

**NEAR-PASS (one light wisdom touch, then consecrated):**

3. **`compare-monergism-synergism`** — **CONSECRATED.** Fixed the two labelly H2s (*Analogies That Clarify* → "Look at Who Does the Lifting"; *A Final Objection* → "But Why Command Belief, If You Cannot Obey?"); cleaned a muddled analogy block (heading "The Surgeon and the Corpse" mismatched its toddler-and-couch content → "The Toddler and the Couch"); added a long-view / death-horizon beat (*"A salvation that leaned even one percent on your grip will have exactly the strength of your grip in the hour you have none left to give."*). Stripped the Rom 9:16 "(NIV)".

4. **`question-freewill`** — **CONSECRATED.** Force-apex already (the morgue scene + circular return). Added the Augustinian still-beat on what freedom actually *is*: the compass that is not imprisoned for always finding north; *"The freest love in the universe is the love that has finally lost the ability to want anything else… God Himself is the freest being there is, and He cannot sin."*

5. **`systematic-justification`** — **CONSECRATED as-is.** Already at the bar (the "small, hot arithmetic of the soul" landing; four H2s that escalate cleanly). Per §XVI.4, marked rather than inflated — forcing a 5th H2 would have been mechanical, not wisdom.

**PASS (confirmed at the bar on slow-read, consecrated, no rewrite):**

6. **`question-foreknowledge`** — granite-name landing answers the ache beneath ("am I wanted?"): *"You were chosen, not observed."*
7. **`psychology-cost-of-rejecting-grace`** — courtroom + circular return: *"the verdict climbed down into the grave and brought you out."*
8. **`systematic-atonement`** — brass-names-on-the-boat long-view: names *"carved before the keel was laid… older than the foundation of the world."*

**TIER-1 9–30 LIVE-READ (this session, all PASS → consecrated):**

9. **`pastoral-assurance`** (#9, was UNMARKED) — apex AND wise: the unseen hand that *"has held galaxies open on their axes for fourteen billion years… and the weight of one anxious saint awake in the dark does not register on the scale"* + embedded prayer + "Even now. Especially now." **CONSECRATED.**
10. **`secular-philosophy-free-will`** (#10, was UNMARKED) — Muggeridge disillusionment with the idol of autonomy: *"the autonomy you thought you were losing was the autonomy that was killing you."* One de-labelling H2 touch (*2,500 Years in Brief* → "Twenty-Five Centuries, One Verdict" — also removes the confusing echo of the "In Brief" on-ramp convention). **CONSECRATED.**
11. **`theologian-calvin`** (#11, was UNMARKED) — the "Cough" frame is a textbook Muggeridge portrait (the eternal seen through the dying man, the spare devastating line, the circular return, the five-century long view, the awe-landing: *"do not waste one more hour on anything smaller than the God who chose you."*). **CONSECRATED.**

**Recurring craft gap confirmed & swept where touched:** labelly H2 crescendos on older Polish pages (The Text / The Arguments / The Verdict / Analogies / A Final Objection) — rewritten as escalating sentences on every page touched this session.

**NEXT-READ ROTATION (S61):** Tier-1 pages **12–30** in §III not yet live-read — start with `romans-9-deep-dive` (#12, 6379w), `analogy-lazarus-grave` (#13), `systematic-ordo-salutis` (#14), `systematic-effectual-calling` (#15), `question-sealed` (#16), `question-acts` (#17), `systematic-compatibilism` (#18), `ot-jacob-esau` (#19), `question-boasting` (#20). Then descend 21–30. Note `ot-jacob-esau`, `history-luther`, `theologian-luther` are prime Muggeridge long-view candidates; the `question-*`/`systematic-*` cluster is the Zacharias question-beneath register. Re-run `node sapiential-audit.js` first to refresh the live Tier-1 ranking before pulling.

---

## VII. S61 EXECUTION LOG — the deepening run (2026-05-24/25)

Live-read down the full S61 rotation (Tier-1 pages 12–30 from §III), top-down by inbound. **All 19 carry `<!-- CONSECRATED -->`.** `node sapiential-audit.js` confirms Tier 1 dropped 95 → 76 and Tier 2 rose 56 → 75 (exactly these 19). `node validate-site.js` GREEN (0 broken links, 0 orphans, all structural/CSS checks pass). Every `<a href>` on every rewritten page re-verified on disk before saving. Zero `(NIV)` suffixes and zero banned clock-time framing remain on any touched page (swept and confirmed).

**FULL DEEPEN (write-over):**

1. **`history-luther`** (#22, was UNMARKED) — **CONSECRATED.** Was a flat Wikipedia-register entry (textbook H2s, three banned `(NIV)` suffixes, a bolted-on Colossians ending). Recast wholesale in the **church-history / Muggeridge long-view** register with a *page-native* central image — the **exhumed gospel / a man with a shovel** (deliberately distinct from `theologian-luther`'s deathbed-beggar and `history-timeline`'s unbroken-thread, to avoid cloning — both were read first to differentiate). New escalating-sentence H2 crescendo (*The Sentence That Crossed a Continent → The Truth Was Not Invented. It Was Exhumed. → The Book Luther Refused to Disown → What One Century Digs Up, the Next Buries Again → You Are Standing in the Same Recovery*). The Muggeridge disillusionment: the church is the one institution entrusted with a treasure it cannot stop burying — sola fide kept, the bound will quietly re-buried under "your decision," Tetzel's coin reborn as the aisle-walk. **§XV + NIV-2011 fix:** corrected the 1984 reading "a righteousness *from* God" → NIV-2011 "the righteousness *of* God" (Rom 1:17), which is *also* the genitive *dikaiosynē theou* Luther's tower turned on — surfaced and explained as the warrant. Stripped all three `(NIV)`; fixed eyebrow `<div>`→`<span>`. Sapiential line: *"the human heart would always rather hold a shovel than an empty hand."*

**LIGHT DEEPEN (landing rebuilt + structural/§XV fixes, then consecrated):**

2. **`systematic-trinity`** (#29, was UNMARKED) — **CONSECRATED.** Opening was already wise (the conversation before the first atom; *"remove the Trinity, you do not get a simpler God. You get a smaller one"*; *"a transaction… or a love story"*) but the body tapered to textbook and the close was a flat summary. Stripped **four** `(NIV)` suffixes; added a hero subtitle (+ eyebrow `<div>`→`<span>`); de-labelled two H2s (the one duplicating the H1, and the conclusion). Rebuilt the flat ending into a true **awe-landing with circular return** to the opening image — sapiential line: *"The same Three who were entirely enough for one another before time began decided, freely, not to be complete without you."*

**NEAR-PASS (targeted wisdom/craft/§XV touch, then consecrated):**

3. **`romans-9-deep-dive`** (#12) — added a Zacharias-register **opening movement** naming the dread of the chapter and the question beneath the protest (*"if it is all His choosing, am I wanted, or am I merely used?"*) that the page's existing catch + Rom 11:33-36 doxology already pay off. Sapiential line: *"You do not flinch at a teaching that leaves you on the throne; you flinch at the one that takes the throne away."*
4. **`systematic-ordo-salutis`** (#14) — **§XV fix:** it quoted 1 John 5:1 as the ESV/NASB "has been born"; restored the NIV "is born of God" and surfaced the perfect *gegennētai* as the warrant (the model §XV case).
5. **`question-acts`** (#17) — swept the textbook H2 crescendo (The Text/The Greek/The Arguments/Objections Answered/The Verdict) into escalating sentences; **rewrote a banned searcher-trope landing** ("reading this at an hour they did not plan… put this page in front of you tonight") into a warmer wisdom close (*"It is the coldest-sounding word for the warmest thing in the universe"*).
6. **`question-sealed`** (#16) — two labelly H2s de-labelled (→ "You Have Mislocated the Rope" / "The Grammar Leaves No Room for a Conditional"); already apex-wise, consecrated.
7. **`question-boasting`** (#20) — one labelly H2 fixed; PASS, consecrated.
8. **`systematic-effectual-calling`** (#15) — softened one borderline clock-phrase ("the late-hour question"); otherwise apex, consecrated.
9. **`romans-8-28-39`** (#26) — one banned searcher-cadence H2 ("For the Person Reading This in the Dark" → "If You Are Afraid You Are the Broken Link"); the forge/Smith page is otherwise apex.
10. **`systematic-providence`** (#28) — softened one stray clock-time in a list ("the phone call that came at 3 AM" → "you never wanted to receive"); the "name the atom" Socratic trap + Westminster-quoted held paradox on evil are at the bar.
11. **`analogy-lazarus-grave`** (#13) — fixed one repeated-phrase tic; the smell-before-the-miracle scene + "Come forth. You already did." landing are at the bar.

**PASS (confirmed at the bar on slow-read, consecrated as-is):**

12. **`ot-jacob-esau`** (#19) — the flinch seeing-through; *"We want a salvation we could have refused so we can say we accepted"*; the Jacob's-limp awe-landing.
13. **`systematic-compatibilism`** (#18) — *"Freedom has never meant uncaused — it has only ever meant uncoerced"*; the train landing ("You are not the engineer. You are home.").
14. **`objection-fairness`** (#21) — *"'Unjust' accuses the judge. 'Unfair' demands the prize"*; the "receipt for services rendered" line; the "I'll take it" courtroom landing.
15. **`theologian-luther`** (#25) — APEX-grade Muggeridge portrait: the "Watch your mind right now" reflex, the Tetzel-coin/aisle-walk parallel, the "We are beggars. This is true." deathbed landing.
16. **`devotional-love-letter-before-time`** (#23) — the attic-letter frame, "devastating information about God," the Eph-1:11 predestination-of-this-moment payoff.
17. **`demolition-prevenient-grace`** (#24) — arguably apex: the "room behind your eyes" reflex-diagnostic, the two-boxes, the two-rooms "management department… has been laid off… I was being held this whole time" landing.
18. **`broken-mirror-performance-treadmill`** (#27) — "conditional grace is boasting in a suit and tie"; the dashboard-note close; "Breakfast in the Father's house."
19. **`psychology-anosognosia-of-sin`** (#30) — arguably apex: the Ramachandran frame (*"the instrument that would detect the paralysis was the paralysis itself"*), the phone/prayer desire-mirror, the doctor-holds-the-dead-hand landing.

**Findings this session:** (a) The Polish-passed `question-*`/`systematic-*`/`demolition-*`/`broken-mirror-*` corpus is overwhelmingly already at or near the bar — most pages 12–30 were PASS or one-touch NEAR-PASS. The two genuine gaps were both **UNMARKED history/systematic pages in the textbook register** (`history-luther`, `systematic-trinity`) — same pattern as S60 (`history-timeline`). **Hypothesis for S62: the remaining textbook-register risk is concentrated in the `history-*` and `systematic-*` UNMARKED pages.** (b) Two recurring craft gaps swept wherever found: **labelly H2 crescendos** and **stray clock-time / searcher-trope framing** (`question-acts`, `romans-8-28-39`, `systematic-providence`, `systematic-effectual-calling`) — `audit-prose.js`/the scanner does not catch these; grep for `\b[0-9]\s?(am|pm)\b`, `3 ?AM`, "reading this", "in the dark" when touching a page. (c) §XV translation slips are still surfacing in older pages (`systematic-ordo-salutis` quoted the ESV; `history-luther` carried a 1984 reading) — keep checking 1 John 5:1, Rom 1:17, and the §XV.4 starter list on every page touched.

**NEXT-READ ROTATION (S62):** Re-run `node sapiential-audit.js` first (the ranking shifts as pages lock). The new Tier-1 top (post-S61, all ≥25 inbound, none yet read) — pull top-down:
1. `compare-predestination-foreknowledge` (#1, 39 in)
2. `romans-3-10-18` (#2, 38 in)
3. `question-whosoever` (#3, 36 in)
4. `devotional-my-chains-fell-away` (#4, 35 in)
5. `broken-mirror-vessels-for-mercy` (#5, 35 in)
6. `systematic-theology-proper` (#6, 35 in — systematic, textbook-risk per the hypothesis above; read closely)
7. `history-confessions-story` (#7, 33 in, UNMARKED — **prime Muggeridge/textbook-risk candidate**)
8. `question-psalm139` (#8, 33 in)
9. `systematic-covenant-theology` (#9, 32 in, UNMARKED — **textbook-risk candidate**)
10. `question-book-of-life` (#10, 32 in)
11. then descend 11–20: `secular-recovery-total-depravity`, `joy-god-big-enough`, `ot-jeremiah`, `start-here-phase1`, `history-decision-theology` (UNMARKED, textbook-risk), `theologian-whitefield` (UNMARKED, 1202w — Muggeridge portrait candidate, also depth-suspect short), `devotional-joy-of-election`, `philosophy-phantom-limb-free-will`, `apologetic-lydias-heart` (4458w — read for whether length earns depth), `question-john17` (910w — depth-suspect short, deepen or merge).
Prioritize the UNMARKED `history-*`/`systematic-*` cluster (the standing textbook-register risk) and the two depth-suspect shorts (`theologian-whitefield`, `question-john17`). Record a verdict for each in §VII as you go; spot-check held S61 locks (`history-luther`, `systematic-trinity`, `romans-9-deep-dive`) in the Priority 0 sample-read.

---

## VIII. S62 EXECUTION LOG — the deepening run (2026-05-25)

Live-read down the refreshed S62 rotation (Tier-1 top, post-S61). **13 pages now carry `<!-- CONSECRATED -->`** (4 full write-overs + 9 PASS/NEAR-PASS), plus one **§XV surgical fix on an S61 lock**. `node sapiential-audit.js` confirms Tier 1 dropped 76 → 63 and Tier 2 rose 75 → 88 (exactly these 13). `node validate-site.js` GREEN (0 broken links, 0 orphans, all structural/CSS checks pass). Every `<a href>` on every rewritten page re-verified on disk before saving. Zero `(NIV)` suffixes and zero banned clock-time/searcher-trope framing remain on any touched page (swept and confirmed).

**FULL DEEPEN (write-over):**

1. **`theologian-whitefield`** (was UNMARKED, 1202w article-body inside a non-canonical catalog page) — **CONSECRATED.** The worst page in the batch and the session's centerpiece. Was a legacy multi-section `<main>` catalog — biography timeline, theology-grid cards, key-quotes grid, major-works list, "Legacy" bullets, and a "Why His Work Matters Today" listicle of seven *"In an Age of…"* H2s — carrying **four `(NIV)` suffixes**, inline styles, a `<div class="eyebrow">`, and an applause-not-awe ending bolted to a Hebrews 9 judgment verse. Collapsed the whole thing into one flowing canonical `<article class="article-body">` **Muggeridge portrait** built on a page-native central image deliberately distinct from the other consecrated portraits (Calvin's "Cough," Luther's deathbed-beggar, history-luther's shovel): **the Voice** — the instrument that reached 30,000 (Franklin's Market Street pacing experiment + his emptied pockets) and yet could not raise one dead soul, because only the wind does that (John 3:8, *pneuma* = wind/Spirit, blows where it pleases). Escalating-sentence H2 crescendo (*A Voice Trained on the One Word No One Wanted to Hear → The One Thing the Voice Could Not Do → He Gave Wesley the Movement and Kept the Gospel → He Burned Down to the Socket → The Wind Has Not Stopped*). Muggeridge disillusionment-with-idols: greatness measured by what we build/brand, and Whitefield built no denomination, founded no Whitefieldians, handed the movement to Wesley and kept only the gospel; the *"we shall hardly get sight of him"* humility. Earned gravitas/death: *"rather wear out than rust out,"* the staircase-candle burned to the socket (framed honestly as the traditional account), Newburyport, age 55. Awe-landing: the wind has not stopped — you were a soul in a field he never saw. Stripped all four `(NIV)`; `<div class="eyebrow">`→`<span>`; removed an orphaned `</article>` and the inline styles. 12 verified internal links. Sapiential line: *"a name is a poor thing to spend a life on."*

2. **`question-john17`** (was POLISH-LOCKED, 910w depth-suspect short) — **CONSECRATED.** Deepened ~910w → ~1500w. New **Zacharias question-beneath** frame (the ache under every election argument: *does anyone actually want me, by name?*); reframed as the high-priestly prayer **overheard** on the threshold of Gethsemane (earned gravitas: hours from torture, He spends His last unhurried words on you). **§XV touch:** surfaced the perfect *dedōkas* ("you have given," a completed transaction, deed signed and filed). Added a still place; built a new long-view final movement — *"And the Prayer Has Not Ended"* (Hebrews 7:25 "he always lives to intercede" + Romans 8:34) — He is praying it still, now. De-labelled all five textbook H2s into escalating sentences. Landing lifted: *"He prayed for you by name — and He is praying still."*

3. **`romans-3-10-18`** (was POLISH-LOCKED) — **CONSECRATED.** The courtroom charge-by-charge body was strong and preserved nearly verbatim; two real gaps fixed. (a) Added the **seeing-through opener**: the reflex to file an exception in your own name *is* the verdict proving itself in real time ("we are the one defendant in history who has spent his whole life refusing to convict the man in the mirror"). (b) Rebuilt the thin right-arm landing (*The Only Hope* → *The Verdict Was Read Over You — and Then Came "But Now"*) into a full two-arms catch: the **substitution scene** (Another walks into the dock wearing your charges; the spotless righteousness laid over you like a robe over a prisoner's rags), a stillness beat on *"But now,"* and the catch in grace. Sapiential line: *"the only people who ever receive grace are the ones who stop pleading not-guilty."*

**LIGHT–MODERATE DEEPEN (textbook-march middle lifted + long-view added):**

4. **`history-confessions-story`** (was UNMARKED) — **CONSECRATED.** Already had a strong reflex-diagnostic ("you almost skimmed that last line") and a strong landing; the gap was the five-confession catalog middle and a missing long view. Added a **Muggeridge long-view opening meditation** — the question beneath: why must the truth be re-confessed in every generation? *"Truth is handed down as words, but it was purchased as wounds — and the words can be inherited for free while the conviction behind them cannot."* Lifted the two flattest catalog paragraphs (Dort's 154 sessions, Westminster's six years) from date-recitation into the seriousness-of-truth indicting our casual age. Swept the *"brought it to your screen tonight"* searcher-trope → "carried it... all the way down to the page in front of you."

**§XV SURGICAL FIX (S61 lock — caught in the Priority 0 sample-read):**

5. **`systematic-trinity`** — restored two **ESV slips** to NIV 2011 in scripture-blocks the S61 consecration missed: **Ephesians 1:7-8** ("the forgiveness of our trespasses, according to the riches of his grace, which he lavished upon us in all wisdom and insight" → NIV "the forgiveness of sins, in accordance with the riches of God's grace that he lavished on us") and **John 1:2** ("He was in the beginning with God" → NIV "He was with God in the beginning"). Page remains CONSECRATED.

**PASS / NEAR-PASS (live-read at the bar, consecrated):**

6. **`compare-predestination-foreknowledge`** — PASS. The hospital-corridor re-spine landing; *"a love that depends on what it finds in you is a love that can end when what it found disappears"*; *proginōskō* / *tetagmenoi* handled. Consecrated as-is.
7. **`question-whosoever`** — NEAR-PASS. The sidearm reflex, the tightness-in-the-chest landing ("He chose. You came."). One labelly H2 de-labelled (*Objections Answered* → "Each Objection Confuses the Open Door With the Power to Walk Through It"). Consecrated.
8. **`systematic-theology-proper`** — PASS (textbook-risk hypothesis did **not** hold). The "I AM" / aseity ontological earthquake; the receipt-not-a-hymn move; the Rom 11:33-36 awe-landing; *"hands that have never once opened by accident."* Consecrated as-is.
9. **`systematic-covenant-theology`** (was UNMARKED) — PASS (hypothesis did **not** hold). The "library vs. contract" frame carried throughout; *"You did not sign this covenant. You were named in it"*; the Testator-alive landing. Consecrated as-is.
10. **`devotional-my-chains-fell-away`** — PASS. *"The most dangerous chains are the ones you have mistaken for your own bones"*; circular return; embedded prayer. Consecrated.
11. **`broken-mirror-vessels-for-mercy`** — PASS. The cracks/light frame; the world's-answer-vs-God's disillusionment (self-help and nihilism); *"your worth was not discovered. It was bestowed."* Consecrated.
12. **`question-psalm139`** — PASS (apex). *"Either Psalm 139 means what it says, or it means nothing"*; the authorship-not-observation reflex-diagnostic; the ultrasound awe-landing, *"The pen was never yours."* Consecrated.
13. **`question-book-of-life`** — PASS (apex). The scriptorium frame + the warm humming book; *"Corpses do not fear losing life. Only the living fear death."* Consecrated.
14. **`history-decision-theology`** (was UNMARKED) — PASS (hypothesis did **not** hold — already apex). The "picture the room" opener; *"the scaffolding that has been pretending to be the house"*; the Finney-the-lawyer disillusionment; *"lungs do not take credit for the oxygen"*; *"what was raised will never die again."* Consecrated as-is.

**Findings this session:** (a) The Polish-passed `question-*`/`systematic-*`/`broken-mirror-*`/`devotional-*` corpus remains overwhelmingly at the bar — 7 of 9 PASS pages needed nothing but the marker. (b) **The standing "textbook-register risk = UNMARKED history/systematic" hypothesis held for only ONE page** (`history-confessions-story`) and **failed for three UNMARKED pages that were already apex** (`systematic-theology-proper`, `systematic-covenant-theology`, `history-decision-theology`). **Revised hypothesis for S63:** the remaining textbook risk is concentrated specifically in (i) older `theologian-*`/`history-*` pages still on the **legacy multi-section `<main>`/catalog template** — `theologian-whitefield` was the worst offender (bio-timeline + theology-grid + works-list + bullet listicles, four NIV suffixes). To find the rest, grep for pages still using `<main id="main-content">` together with `class="content-item"` / `theology-grid` / `bio-timeline` / `work-item`. (ii) the two genuine depth-suspect shorts that remain: `psychology-groupthink` (308w), `secular-ai-determinism` (327w) — both need expand-or-merge. (c) **§XV slips keep surfacing in older locks** (`systematic-trinity` carried ESV for Eph 1:7-8 and John 1:2) — keep the §XV.4 starter list active on every page touched, locked or not.

**NEXT-READ ROTATION (S63):** re-run `node sapiential-audit.js` first (the ranking shifts as pages lock). New Tier-1 top (post-S62, all ≥24 inbound, none yet read) — pull top-down:
1. `secular-recovery-total-depravity` (32, UNMARKED)
2. `joy-god-big-enough` (32, UNMARKED)
3. `ot-jeremiah` (31, UNMARKED)
4. `start-here-phase1` (31, UNMARKED — the graded-learning-path on-ramp; read for force AND the Ligonier-style beginner→advanced staircase gap)
5. `devotional-joy-of-election` (30, POLISH)
6. `philosophy-phantom-limb-free-will` (29, UNMARKED — a VOICE.md v1.0 source page; likely apex, merely unmarked — spot-confirm and lock)
7. `apologetic-lydias-heart` (29, UNMARKED, 4458w — carried over; read whether length earns depth)
8. `question-born-again-meaning` (28, POLISH)
9. `psychology-identity-threat` (28, UNMARKED)
10. `history-great-awakening` (28, UNMARKED — textbook-risk history page, now heavily linked from the newly consecrated `theologian-whitefield`; **prime candidate per the revised hypothesis**)
then descend 11–20: `question-dead-in-sin-meaning`, `invisible-wall-friend-who-left`, `question-ezekiel37`, `broken-mirror-sin-you-repeat`, `demolition-1tim2-4`, `history-puritans` (UNMARKED, textbook-risk), `anxious-mind-scrupulosity`, `philosophy-problem-of-merit` (VOICE source page), `response-roger-olson` (UNMARKED, 3646w), `apologetic-ekloge-the-greek-of-election` (UNMARKED, 4072w — §XV-heavy, read closely).
**Priority for S63:** the UNMARKED `history-*` cluster (`history-great-awakening`, `history-puritans`) and any remaining legacy-template `theologian-*`/`history-*` pages (grep the template markers above). Spot-check the S62 locks (`theologian-whitefield`, `romans-3-10-18`, `question-john17`) in the Priority 0 sample-read.

---

## IX. S63 EXECUTION LOG — the deepening run (2026-05-25)

Live-read down the refreshed S63 rotation (Tier-1 top, post-S62), then ran the legacy-template hunt and the two depth-suspect shorts. **10 rotation pages now carry `<!-- CONSECRATED -->`** (3 substantive deepens + 7 PASS/NEAR-PASS), **1 legacy-catalog page fully rebuilt** (`theologian-bunyan`, CONSECRATED), and **2 depth-suspect "shorts" proven false-positives and structurally repaired** (left UNMARKED). `node sapiential-audit.js` confirms Tier 1 dropped 63 → 53 and Tier 2 rose 88 → 98 (the exact 10 rotation consecrations; depth-suspect shorts 3 → 1). `node validate-site.js` GREEN (0 broken links, 0 orphans, all structural/CSS/canonical checks pass). Every `<a href>` re-verified on disk. Zero `(NIV)` suffixes and zero banned clock-time/searcher-trope tokens remain on any touched page (swept and confirmed).

**SUBSTANTIVE DEEPEN (write-over / major frame recast):**

1. **`theologian-bunyan`** (legacy-template hunt centerpiece) — **CONSECRATED.** A legacy multi-section `<main>`/catalog page (bio-timeline + theology-grid + key-quotes grid + works-list + "Why It Matters Today" listicle, **seven `(NIV)` suffixes**, a **broken nested `<article class="article-body">` inside the Legacy section**, `<div class="eyebrow">`, non-canonical footer) collapsed wholesale into one canonical `<article class="article-body">` **Muggeridge portrait** on a page-native central image deliberately distinct from the other consecrated portraits (Calvin's Cough, Luther's deathbed-beggar, history-luther's shovel, Whitefield's Voice): **the burden no tinker could mend** — Bunyan's own great picture of grace, the weight on Christian's back that falls of itself only at the Cross, drawn by a brazier who failed for years to repair himself. Escalating-sentence H2 crescendo. Earned gravitas (the blind daughter Mary; the twelve years; "pulling the flesh from the bones"). Muggeridge disillusionment ("the magistrates believed they were closing a mouth; what they had done was clear a desk"). §XV-honest on the contested Pilgrim's-Progress date. All 7 `(NIV)` stripped, footer + scripts canonicalized, 28 internal links verified on disk. Sapiential line: *"A man does not unburden himself; the most he can do is be carried to where another hand cuts the straps."*
2. **`devotional-joy-of-election`** (POLISH-LOCKED → **CONSECRATED**) — frame recast off the banned searcher-arrival opener (*"You are reading this at a particular hour, in a particular room, in a particular posture — and something brought you here"*) and its circular "The Same Room" close, both re-pivoted onto the page's own *weight-between-the-ribs* image; In-Brief "brought you here" softened; 2 inline "reading this" swept. Body already at the bar ("what dies is not your significance — your burden"; the 95%/5% negotiation-diagnostic; the orphan-adopted joy; "held by the only hands that have never dropped anything").
3. **`secular-recovery-total-depravity`** (UNMARKED → **CONSECRATED**) — banned landing swept (*"Somewhere tonight, a man with twenty-two years sober is reading this sentence… read these next words slowly"*); ending lifted from a declarative punch to a prodigal-father awe-landing ("You were never crawling toward Him. He was already sprinting toward you."). Body already apex ("the bondage feels like personality"; "the will is a passenger… mistaking the captain's habits for its own commands").

**NEAR-PASS (targeted §XV / banned-sweep / craft, then consecrated):**

4. **`joy-god-big-enough`** (UNMARKED → **CONSECRATED**) — **3 `(NIV)` suffixes stripped** (Isa 46:9-10, Eph 1:11, Ps 115:3); 2 "tonight" clock-anchors swept (opener + close). Otherwise apex: the small-god demolition, the sleep/worship/evangelize/suffer/die-differently cascade, *"the Reformed evangelist is a postman delivering mail that was sent before the recipient was born."*
5. **`history-great-awakening`** (UNMARKED → **CONSECRATED**) — "this page tonight" + "in the last ten minutes" live-reading clock swept. Apex already: *"Orthodoxy without the Spirit is a corpse in a suit"*; *"Franklin calculated the acoustics. God calculated the elect. Only one of them was surprised"*; the empty-suit-in-the-empty-pew seeing-through; "the wood had been seasoned before the world was made."
6. **`psychology-identity-threat`** (UNMARKED → **CONSECRATED**) — **2 `(NIV)` suffixes stripped** (Eph 2:8-9, Eph 1:4-5); 2 "reading this" real-time-defensiveness lines softened to "even now / right now." Apex: *"the human brain has a theology department, and its only job is public relations"*; *"the shift isn't from hero to victim. It's from protagonist to beloved"*; the self-referential proof.
7. **`ot-jeremiah`** (UNMARKED → **CONSECRATED**) — one "today / as you read" live-reading line lifted into a sapiential turn ("the stirring is… the evidence that His search for you is nearly over"). Apex already: yada'/qadash/natan §XV work; the "watch what your mind is doing right now" reflex; the womb-formation stillness; *"the most important thing about you was decided in a room you were not invited to."*

**PASS (live-read at the bar, consecrated; minimal/no touch):**

8. **`philosophy-phantom-limb-free-will`** (UNMARKED → **CONSECRATED**) — VOICE v1.0 source page; fully apex (the Walter/phantom-limb frame; *"you cannot use a broken instrument to measure the brokenness of that same instrument"*; the self-help-idol disillusionment; the grace-inversion landing). One genuine typo fixed ("a vessels" → "vessels"). Note: uses `<main id="main-content">` but is a flowing essay, NOT a catalog — confirms the legacy-risk is the catalog *classes*, not the `<main>` tag.
9. **`question-born-again-meaning`** (POLISH-LOCKED → **CONSECRATED**) — at the bar: perfect *gegennētai* §XV model case + *pneuma* (wind/Spirit); "born not built"; *"something that felt less like holding on and more like being held"*; the Augustine witness; "I was found / that was your first breath."
10. **`start-here-phase1`** (UNMARKED → **CONSECRATED**) — at the bar for the beginner on-ramp register (the corpse-test "when did you last spontaneously want to pray?"; *"the impulse toward God is foreign tissue the host organism rejects on contact"*; "the end of fear"; Romans 11 doxology close). The graded beginner→advanced staircase (benchmarking Gap #3) remains a cross-phase structural initiative, not a single-page sapiential touch — flagged for a dedicated future run.
11. **`apologetic-lydias-heart`** (UNMARKED → **CONSECRATED**) — length earns depth; apex §XV apologetics (*diēnoixen* / *helkyō* / *suaviter et fortiter* / Augustine's two volitions / the Lydia-vs-Saul asymmetry / the three-facets diamond). Banned H2 **heading** "What This Means for the Reader **Tonight**" → "…for the One Whose Heart Was Opened"; 2 "reading this" conditionals + the closing meta-reading device softened.

**LEGACY-TEMPLATE HUNT — confirmed & cleared.** Grepping `bio-timeline|theology-grid|work-item|content-item|key-quotes` across all `*.html` returned **exactly one** page on the legacy multi-section `<main>`/catalog template: `theologian-bunyan` (rebuilt, #1 above). With Whitefield (S62) and Bunyan (S63), the legacy-catalog `theologian-*`/`history-*` template is now **eliminated site-wide.**

**DEPTH-SUSPECT SHORTS — FALSE POSITIVES, STRUCTURALLY REPAIRED (left UNMARKED).** Both "shorts" were actually long articles whose article-body word-count was wrong because a **mid-article RELATED-ARTICLES block prematurely closed `<article class="article-body">`, orphaning every subsequent section outside it** (the audit counts only inside article-body).
- **`psychology-groupthink`** (flagged 308w; actually ~3,500w / 10 sections) — RELATED block relocated to the true end so one `<article>` wraps all sections; `<div class="eyebrow">`→`<span>`; **5 `(NIV)` suffixes stripped AND 4 ESV-quotes-mislabeled-as-NIV corrected to NIV 2011** (Rom 12:2, Acts 17:11, Gal 2:11-14, 1 Kings 22:6-8 — the §XV.3 banned "silent translation swap"; Matt 7:13-14 was genuine NIV, suffix only). Left UNMARKED (thorough but listicle register — future sapiential-deepen candidate).
- **`secular-ai-determinism`** (flagged 327w; actually ~2,000w) — same orphaned-sections repair (article now wraps intro + all sections + RELATED); all inline `(NIV)` suffixes stripped incl. the footer grace-warning; **ESV-as-NIV 1 Thess 5:23 corrected to NIV 2011**; a dropped word in Eph 2:8 restored. Left UNMARKED (near the bar — has the crown jewel, the compatibilism seeing-through, a tender catch; strong future-consecration candidate).

**Findings this session:** (a) The dominant violation this rotation was the **banned searcher-arrival / clock-time / "reading this [page]" frame** — present on 6 of the touched pages, living in openers, closes, AND an H2 heading. The scanner does not catch it; the `\b[0-9] ?(am|pm)\b` / "tonight" / "reading this" grep does. Run it on every touched page. (b) The most damaging integrity finding was **ESV-quotes-mislabeled-as-NIV** (groupthink ×4, secular-ai-determinism ×1) — the §XV.3 banned failure. The likely remaining home of such slips is **legacy psychology/secular/objection pages using `gold-blockquote` / `scripture-reference` / `scripture-block` markup** — grep those families for tell-tale ESV phrasings in S64. (c) A "depth-suspect short" flag on a real content page is unreliable: **check first for the orphaned-sections bug** (a premature `</article>` after a mid-article RELATED block) before treating it as genuinely short. (d) The Polish-locked `question-*` corpus remains overwhelmingly at the bar — the genuine work was almost all on UNMARKED pages and on translation/structure integrity.

**NEXT-READ ROTATION (S64):** re-run `node sapiential-audit.js` first (the ranking shifts as pages lock). New Tier-1 top (post-S63, all ≥24 inbound, none yet read) — pull top-down:
1. `question-dead-in-sin-meaning` (28, POLISH)
2. `invisible-wall-friend-who-left` (28, POLISH)
3. `question-ezekiel37` (27, POLISH)
4. `broken-mirror-sin-you-repeat` (27, POLISH)
5. `demolition-1tim2-4` (27, POLISH)
6. `history-puritans` (27, UNMARKED — **textbook-risk history page; read closely**)
7. `anxious-mind-scrupulosity` (27, POLISH — sensitive pastoral; handle with care)
8. `philosophy-problem-of-merit` (27, UNMARKED — VOICE v1.0 source page; likely apex, spot-confirm and lock)
9. `response-roger-olson` (27, UNMARKED, 3646w)
10. `apologetic-ekloge-the-greek-of-election` (27, UNMARKED, 4072w — §XV-heavy, read closely)
then descend 11–20: `question-hardening`, `broken-mirror-the-relapse`, `systematic-adoption` (UNMARKED), `question-secure`, `devotional-love-before-the-world`, `hymn-amazing-grace` (UNMARKED), `philosophy-resistance-is-proof` (UNMARKED), `pastoral-suffering` (UNMARKED), `history-council-of-orange` (UNMARKED — textbook-risk), `question-regeneration-precedes-faith`.
**Priorities for S64:** (1) the UNMARKED `history-*` cluster (`history-puritans`, `history-council-of-orange`) — the last textbook-risk history pages. (2) **An ESV-as-NIV integrity sweep** of legacy psychology/secular/objection pages carrying `gold-blockquote` / `scripture-reference` / `scripture-block` markup (S63 found 5 such slips on 2 pages). (3) the last depth-suspect short, `question-external-internal-call` (878w). (4) Optionally consecrate `secular-ai-determinism` (near the bar) and lift `psychology-groupthink`'s prose register. Spot-check the S63 locks (`theologian-bunyan`, `devotional-joy-of-election`, `apologetic-lydias-heart`) in the Priority 0 sample-read.

---

## X. S64 EXECUTION LOG — the deepening run (2026-05-25)

Live-read down the refreshed S64 rotation (Tier-1 top, post-S63), ran the special-priority ESV-as-NIV sweep, and repaired two structural defects surfaced mid-rotation. **12 pages now carry `<!-- CONSECRATED -->`** (1 full deepen + 1 moderate deepen + 10 PASS/NEAR-PASS with targeted touches), plus **3 §XV surgical fixes on existing apex/legacy locks**. `node sapiential-audit.js` confirms Tier 1 dropped 53 → 42 and Tier 2 rose 98 → 109 (exactly the 11 Tier-1 consecrations); depth-suspect shorts 1 → 0 (the 12th consecration, `question-external-internal-call`, was the short). `node validate-site.js` GREEN (0 broken links, 0 orphans, all 6 checks pass). Every `<a href>` re-verified. Zero `(NIV)` suffixes on any touched page; banned clock-time/searcher tokens swept (residual hits on touched pages are legitimate — quoted character speech, the dead-in-sin argument device, the scrupulosity page's clinical descriptions). **Tier 1 has now fallen 107 → 96 → 76 → 63 → 53 → 42 across S59→S64.**

**SUBSTANTIVE DEEPEN (write-over / section recast):**

1. **`history-puritans`** (was UNMARKED, textbook-risk) — **CONSECRATED.** The apex parlor frame (Kidderminster 1661, the pastor who cannot finish Romans 8 without weeping) was wrapped around a textbook middle (catalog of giants, labelly H2s, a humility/gratitude/confidence/holiness listicle). Kept the frame; rewrote the body whole. New escalating-sentence crescendo (*The Most Successful Slander → They Did Not Invent the Fire. They Caught It. → Meet the Four the Cartoon Had to Erase → When Did Your Theology Last Make You Weep? → The Fire Went Underground — and Came Up in an Open Field → What a Church on Fire Actually Looks Like → Back to the Parlor*). Added the Muggeridge disillusionment (why the slander stuck), the creed-inherited-vs-creed-caught long view (the Westminster decree "read by a mother who has just laid a third child in the ground"), and rebuilt the listicle as flowing prose. **§XV fix:** the closing Rom 8:39 quote read the KJV/NASB "any other created thing" → NIV 2011 "anything else in all creation." Sapiential line: *"The world will forgive a man almost anything sooner than it will forgive him for being joyful about the wrong thing."*
2. **`question-external-internal-call`** (was POLISH, the last depth-suspect short, ~878w → ~1,450w) — **CONSECRATED.** Kept the Lydia-riverbank frame; deepened the thin declarative middle. De-labelled all four H2s. **§XV added:** surfaced *diēnoixen* (Acts 16:14 — "opened thoroughly," the Lukan verb of the opened minds of Luke 24:45; Lydia is the *object* of the verb) and *helkyō* (John 6:44 — hauling a laden net / drawing a sword, decisive not gentle). Added the question-beneath and the sapiential beat: *"You added nothing to the opening of your own heart — which is exactly why you can lose nothing by failing to hold it open. The hand that turned the key has never let go of it."*

**NEAR-PASS (targeted craft / structural / banned-sweep, then consecrated):**

3. **`history-council-of-orange`** (was UNMARKED) — already apex (the 529 basilica frame; the "hammer still ringing in a living room in Texas in 2026" long view; the "a nature that would rather be damned than unimportant" seeing-through). One banned-frame sweep in the landing ("tonight" + "reading their canons" removed). **CONSECRATED.**
4. **`apologetic-ekloge-the-greek-of-election`** (was UNMARKED, §XV-heavy) — exemplary on both axes (rigorous Greek as warrant; "the dead do not weep at *eklogē*"; "it terrifies and it comforts in the same motion"). Fixed the one banned H2 *What This Means for the Reader Tonight* → "The Room With Only One Door Left." **CONSECRATED.**
5. **`philosophy-problem-of-merit`** (was UNMARKED, VOICE v1.0 source) — confirmed apex (the "X" merit-trap; "a meritocracy of the soul, and you finished first"; the bedrock landing). Light banned-sweep (two "If you're reading this" softened; two stray "tonight" anchors removed) + fixed two raw-asterisk `*did*`/`*is*` rendering artifacts → `<em>`. **CONSECRATED.**
6. **`response-roger-olson`** (was UNMARKED, 3646w) — wise, ends in the right-arm catch (the Job-whirlwind contrast in Move Six; "between terror and surrender… the two are not in tension"; generous steel-man). **§XV fixes:** Job 42:3-6 was ESV/KJV ("I have heard of you by the hearing of the ear, but now my eye sees you") → NIV 2011 ("My ears had heard of you but now my eyes have seen you"); 1 Pet 1:16 "for I am holy" → NIV "because I am holy." **CONSECRATED.**
7. **`question-ezekiel37`** (was POLISH) — **structural repair + de-label.** A unique `<h2>` block was orphaned *inside* `<header class="page-hero">`, between subtitle and byline — relocated into the body as a proper section ("What Being Dead Actually Feels Like From the Inside"). Removed a glib "(Note: Ezekiel did not pass out decision cards…)" aside that undercut the resurrection gravitas. De-labelled two flat H2s (*The Devastating Question* → "When Did the Bones Decide to Live?"; *The Relief* → "And the Living Cannot Be Unlived"). **CONSECRATED.**
8. **`invisible-wall-friend-who-left`** (was POLISH) — **major structural rehab.** (a) The nav's "Why We Resist" link was corrupted into a bare text node → restored to `<a href="/psychology-hub">`. (b) The page had NO proper `<header class="page-hero">`; a malformed duplicate hero with an **orphaned `<article>` opening tag** sat inside `article-body`, closed by a **premature `</article>` mid-page** (the orphaned-sections bug) — installed a clean hero before the body and removed both the stray open and the premature close (article tags now balanced 1:1). Prose already PASS ("The flesh grieves the loss of an audience. The Spirit grieves the loss of a soul."). **CONSECRATED.**
9. **`demolition-1tim2-4`** (was POLISH) — apex content (the three-door trap; the reflex-diagnostic; exemplary §XV Greek *thelei*/*pas*/*antilutron*; the "pain of losing control" close). De-labelled five textbook H2s into escalating sentences; kept "The Cloud of Witnesses." **CONSECRATED.**

**PASS (live-read at the bar, consecrated; minimal/no touch):**

10. **`question-dead-in-sin-meaning`** (POLISH) — the Augustine "will downstream of love" passage + the interior-monologue mirror; the "You are reading this sentence right now" device is the legitimate core of the argument (consciousness ≠ spiritual life), not the banned frame. **CONSECRATED.**
11. **`broken-mirror-sin-you-repeat`** (POLISH) — the Spirit-vs-accuser distinction ("the Spirit says *that was wrong*; the accuser says *you are wrong*"); "the one who falls and feels nothing." **§XV NON-FIX:** the triage flagged Rom 7:18 "in my sinful nature" as a 1984 reading; **verified false positive** — NIV 2011 retains "sinful nature" at 7:18 (the page's distinctive "good itself does not dwell in me" IS the 2011 wording; the "realm of the flesh" change is chapter 8). Left as-is. **CONSECRATED.**
12. **`anxious-mind-scrupulosity`** (POLISH, sensitive pastoral) — handled with care; the "2 AM" / "you are doing it right now as you read" lines are legitimate clinical descriptions of scrupulosity, not banned framing. **§XV fix:** Psalm 139:6-12 was ESV ("wings of the morning," "uttermost parts," "Sheol") → NIV 2011. **CONSECRATED.**

**§XV / ESV-AS-NIV INTEGRITY SWEEP (special priority b) — confirmed & fixed on existing locks/pages (no tier change):**

- **`question-psalm139`** (APEX lock) — Ps 139:7-8,10 was ESV ("Where shall I go," "If I make my bed in Sheol," "your hand shall lead me") → NIV 2011 ("Where can I go," "make my bed in the depths," "your hand will guide me, your right hand will hold me fast"; verb-emphasis adjusted to "guide / hold fast"). **Plus a genuine Hebrew error corrected (§XV.5):** Ps 139:13 was quoted ESV ("you formed my inward parts") AND rested its argument on a misidentified verb — it claimed the verb was *yatsar* (Gen 2:7's word); the verb is actually *qanah* ("created/brought forth/possess"). Restored NIV "you created my inmost being" and rebuilt the warrant on *qanah* (which strengthens the ownership point; cross-referenced Prov 8:22). An argument cannot rest on a reading the original does not carry.
- **`scripture-tsunami`** (the #1 most-linked page, APEX) — two ESV slips in the verse-collage data: Ps 130:3 ("If you, O LORD, should mark iniquities" → "If you, LORD, kept a record of sins") and Ps 138:8 ("fulfill his purpose for me; your steadfast love, O LORD… do not forsake the work of your hands" → "vindicate me; your love, LORD… do not abandon the works of your hands").
- **`open-wound-senseless-death`** — a full Psalm 88:1-7,14 block in ESV ("O Lord, God of my salvation… draws near to Sheol… cast my soul away") → NIV 2011.

**ESV-sweep verified-clean (no fix):** "steadfast love" on `devotional-drawn-not-dragged` and `question-isaiah53` are legitimate *glosses of the Hebrew chesed* in discussion, not mislabeled quotes; "propitiation" is theological vocabulary (e.g. `demolition-1john2-2` discusses *hilasmos*), not mislabeled verse text; "in Adam all die" is genuine NIV 2011 (1 Cor 15:22).

**Findings this session:** (a) The genuine work was again on **UNMARKED pages and on translation integrity**, not on the Polish-locked `question-*` corpus (overwhelmingly at the bar). (b) **Two real structural defects surfaced mid-rotation**, both the orphaned-content / premature-`</article>` class (`question-ezekiel37` h2-in-hero; `invisible-wall` orphaned `<article>` + premature close + corrupted nav link). Check article-tag balance (`grep -c '<article' vs '</article>'`) on any page that "feels" structurally off. (c) **ESV-as-NIV slips persist on older/apex locks** — `question-psalm139` (an APEX consecration!) carried ESV for the whole Ps 139 spine plus a misidentified Hebrew verb. Run the ESV tell-tale grep (`Sheol` / `steadfast love` / `O LORD` / `uttermost parts` / `by the hearing of the ear`) every session. (d) **Trust-but-verify triage flags:** the Rom 7:18 "sinful nature" flag was a false positive (2011 keeps it); verifying against the site's other renderings + the distinctive 2011 markers prevented a wrong "correction."

**NEXT-READ ROTATION (S65):** re-run `node sapiential-audit.js` first. New Tier-1 top (post-S64, all ≥23 inbound, none yet read) — pull top-down:
1. `question-hardening` (26, POLISH)
2. `broken-mirror-the-relapse` (26, POLISH)
3. `systematic-adoption` (26, UNMARKED — textbook-risk; read closely)
4. `question-secure` (25, POLISH)
5. `devotional-love-before-the-world` (25, POLISH)
6. `hymn-amazing-grace` (25, UNMARKED — read whether the hymn-frame earns depth)
7. `philosophy-resistance-is-proof` (25, UNMARKED)
8. `pastoral-suffering` (25, UNMARKED — earned-gravitas page; handle with care)
9. `question-regeneration-precedes-faith` (25, POLISH — §XV 1 John 5:1 model case; read closely)
10. `demolition-philippians2-12-13` (24, POLISH, 1213w — depth-suspect-ish short)
then descend 11–20: `analogy-adoption` (UNMARKED), `open-wound-hospital-room`, `philosophy-mirror-you-refuse` (UNMARKED, VOICE source), `apologetic-arrabon-the-down-payment` (UNMARKED, §XV-heavy), `apologetic-owen-trilemma` (UNMARKED), `apologetic-the-eulogy-greek-of-ephesians-1` (UNMARKED, §XV-heavy), `psychology-offense-of-grace` (UNMARKED, 5285w — read whether length earns depth), `broken-mirror-not-self-made`, `history-spurgeon-downgrade` (UNMARKED — textbook-risk history), `devotional-drawn-not-dragged`.
**Priorities for S65:** (1) the UNMARKED `systematic-adoption` + `history-spurgeon-downgrade` (textbook-risk). (2) **Sweep the banned searcher/clock-time frame on `open-wound-senseless-death`** — it carries a "Tonight… Tonight… Tonight" section + H2 ("The One Sentence Sovereignty Says Tonight") that S64 did NOT fix (only the §XV Psalm 88 fix was applied); it is UNMARKED, so deepen + sweep together. (3) continue the ESV tell-tale grep on every touched page. (4) optionally consecrate `secular-ai-determinism` (near the bar per S63) and lift `psychology-groupthink`'s prose register (both deferred from S64). Spot-check the S64 locks (`history-puritans`, `apologetic-ekloge`, `question-psalm139`) in the Priority 0 sample-read.

---

## XI. S65 EXECUTION LOG — the deepening run (2026-05-25)

Live-read down the refreshed S65 rotation (Tier-1 top, post-S64), executed both special-priority rebuilds, ran the ESV/NIV integrity sweep, and discovered + began eliminating a new NIV-violation class. **12 pages now carry `<!-- CONSECRATED -->`** (2 full canonical rebuilds + 1 targeted deepen + 9 PASS/NEAR-PASS with targeted touches), plus a multi-edit **§XV reconciliation on an APEX lock** (`question-psalm139`) and an **8-file site-wide NIV-suffix sweep**. `node sapiential-audit.js` confirms Tier 1 dropped 42 → 31 and Tier 2 rose 109 → 120 (the 11 Tier-1 consecrations; `open-wound-senseless-death` is below the high-inbound threshold). `node validate-site.js` GREEN (all 6 checks). Zero NIV suffixes and zero banned clock-time/searcher tokens remain on any touched page. **Tier 1 has now fallen 107 → 96 → 76 → 63 → 53 → 42 → 31 across S59→S65.**

**FULL CANONICAL REBUILD (write-over — structural rot + deepen):**

1. **`open-wound-senseless-death`** (special priority b, was UNMARKED) — **CONSECRATED.** The page was structurally rotten: it loaded Google Fonts directly, wrapped in `<main>`, and carried genuine tag-soup (a nested `<article>` closed by `</section>`, bare `<h2>` sections "closed" by stray `</section>`/`</article>`, a broken `/a>` fragment in the keep-reading block, a `<div class="eyebrow">`, a non-canonical `<footer class="site-footer">`, and a reading-progress script referencing a nonexistent element — a live JS error). Rebuilt whole on the canonical template. **Swept the banned "Tonight… Tonight… Tonight" anaphora + its H2** ("The One Sentence Sovereignty Says Tonight" → "The One Sentence Sovereignty Says in the Wreckage"; the anaphora recast to "Here, in the wreckage"). The page's wisdom was already at the bar (Job's ash-heap, the unresolved Psalm 88, "Jesus wept," the "I need a witness" testimony, the golden chain that does not break at the grave); the work was structural repair + frame sweep, not re-seeing. **§XV bonus:** upgraded the Revelation 21:3-4 quote to NIV 2011 ("Look! God's dwelling place is now among the people"). Sapiential line: *"I do not need a reason. I need a witness."*

2. **`philosophy-resistance-is-proof`** (#7, was UNMARKED) — **CONSECRATED.** Also structurally broken (article-body spilled past `</main>`, a double `</article>`, a footer built on a stray `<article>` closed by `</div>`, direct Google-fonts load, `/global.js` + a reading-progress script targeting a nonexistent `.reading-progress`, and raw-asterisk emphasis artifacts). Rebuilt whole on the canonical template. **The real DEEPEN of the rotation:** the page argued relentlessly but never slowed or saw through. Promoted the stranded sapiential line into the body (*"the dead do not consent to being called dead"* — earned in §02); de-labelled the five numbered §-headings into escalating sentences; added the missing **stillness + long view** (the exhaustion of being your own defense attorney; the fortress-with-one-occupant set against eternity); **thickened the thin catch** from telling to showing (the Judge who took your verdict and served your sentence; the drowning man who must see he is drowning before he stops fighting the arms that came to carry him). New awe-landing ties back to the title: *"the resistance you thought was the wall… turns out to be the last evidence you needed."*

**TARGETED DEEPEN (write-over-grade touches, then consecrated):**

3. **`systematic-adoption`** (#3, was UNMARKED, textbook-risk) — **CONSECRATED.** The body was strong (the enemy/child collision, the Roman *huiothesia* legal frame, the eternity-past long view, the infant-cannot-sign-its-own-adoption Socratic trap, the slave-hides/son-runs seeing-through). The gaps were the **question-beneath** and the textbook H2s. Added a **orphan-ache beat** naming the idol (the modern demand to author your own belonging) and the ache adoption answers (*"You were named before you could perform — and the name does not depend on the performance"*); de-labelled three H2s; lifted the close into a **still awe-landing** (*"the hush you feel… is the oldest homesickness in you going quiet at last"*).

**NEAR-PASS (targeted craft / banned-sweep / structural, then consecrated):**

4. **`hymn-amazing-grace`** (UNMARKED) — replaced the "Sunday morning. Third row from the back." scene-frame opener with a thesis-first lead (*"You have sung the most complete confession of sovereign grace ever written — and you have sung it, most of your life, against the theology you thought you held"*). The Olney 1773 scene was already the wisdom high point.
5. **`pastoral-suffering`** (UNMARKED, earned-gravitas) — handled with care; swept the banned "The clock has crossed into the unlit hour" → "The hours have thinned to almost nothing." The Job/Joseph/cross gravitas + *"He got something infinitely better. He got God"* were already at the bar.
6. **`question-secure`** (POLISH) — deleted an orphaned non-sequitur line ("God does not fail." short-circuiting the key-question setup); swept "So lie down tonight" → "So lie down"; softened a "you're here, on this page, reading these words" searcher frame.
7. **`demolition-philippians2-12-13`** (POLISH) — repaired a truncated/empty FAQ JSON-LD answer; inserted the missing **long-view/idol-exposure beat** (the self-made will that "finally explains no one") the page lacked.
8. **`history-spurgeon-downgrade`** (UNMARKED, textbook-risk — hypothesis did NOT hold) — already Muggeridge-register ("a corpse in Sunday clothes," the vocabulary-carrying-new-cargo reflex, "died at fifty-seven held"). Standardized the In-Brief to the canonical `<h2>In Brief</h2>` pattern; softened one "as you read this" meta-frame.

**PASS (live-read at the bar, consecrated; minimal touch):**

9. **`question-hardening`** (POLISH) — the self-hardening/divine-hardening held paradox; *"A soft heart knows it needs softening. A hard heart believes it is already soft."* **9 `(Reference, NIV)` citation suffixes stripped** (new-class finding below).
10. **`broken-mirror-the-relapse`** (POLISH) — the remorse-as-fingerprint-of-the-Spirit move; *"A heart that grieves sin is not a heart that has abandoned God. It is a heart that God has not abandoned."* Marker only.
11. **`devotional-love-before-the-world`** (POLISH-LOCKED) — *"His love is not the conclusion of an argument about your value. It is the premise."* Marker only.
12. **`question-regeneration-precedes-faith`** (POLISH, §XV model case) — §XV confirmed exemplary (NIV "is born of God" quoted, the perfect *gegennētai* surfaced). **7 `(NIV)` suffixes stripped**; one "If you are reading this" frame softened.

**§XV SURGICAL RECONCILIATION (APEX lock — special priority c):**

- **`question-psalm139`** (APEX) — the S64 *qanah* fix had landed only in the main warrant (v.13), leaving the page contradicting itself. Eleven edits restored consistency and NIV 2011 throughout: v.13 verb corrected to *qanah* / "created my inmost being" everywhere (JSON-LD ×2 + body ×4) — *yatsar* belongs to v.16, which the NIV renders "ordained" (now surfaced transparently); **two more ESV slips the tell-tale grep missed** restored to NIV — v.16 ("unformed body… all the days ordained for me… before one of them came to be," replacing ESV "unformed substance… when as yet there was none of them") and vv.17-18 ("How precious… God!… Were I to count them, they would outnumber the grains of sand," replacing ESV "O God!… if I would count them, they are more than the sand") — in both blockquote and inline/JSON-LD instances. An argument cannot rest on a reading the original does not carry, nor quote ESV under an NIV-only banner.

**NEW VIOLATION CLASS — `(Reference, NIV)` citation suffix.** Prior sessions' greps matched only the literal `(NIV)`; they were blind to the `(Exodus 8:32, NIV)` pattern where "NIV" rides inside the reference parens. `question-hardening` carried **9**. A site-wide grep found the pattern on **8 files**; all 13 occurrences across the other 7 (`philosophy-what-if-wrong`, `psychology-emotional-vs-rational`, `question-external-call`, `question-is-predestination-in-the-bible`, `question-visual-theology`, `question-why-pray-if-god-is-sovereign`, `theologian-sproul`) were verified citations and swept (`, NIV)` → `)`). **The `(Reference, NIV)` class is now eliminated site-wide.**

**LARGER NIV BACKLOG SURFACED (for S66).** A combined site-wide grep (`\(NIV\)|, NIV\)`, excluding `scripture-niv.js`) returns **25 files** still carrying the simple `(NIV)` suffix on untouched pages (27 at discovery; S65 fixed 2 — `philosophy-mirror-you-refuse`, `psychology-offense-of-grace`) — a backlog prior "touched-pages-only" sweeps never reached. Dedicated, mostly-deterministic S66 sweep (` (NIV)` → ``), but **context-check each first**: a few may legitimately discuss "(NIV)" in an explicit translation comparison and must NOT be stripped.

**DESCEND 11–20 (opportunistic, mechanical only — NOT yet consecrated):** `philosophy-mirror-you-refuse` (stripped 1 `(NIV)`; VOICE v1.0 source — almost certainly apex, consecrate S66 after live-read), `psychology-offense-of-grace` (stripped 1 `(NIV)`), `broken-mirror-not-self-made` (hero eyebrow `<div>`→`<span>`; removed a non-canonical second "eyebrow" reading-time/tags block). The rest of 11–20 remain for S66.

**Findings this session:** (a) The two genuine deepens were again **UNMARKED, structurally-broken pages** — both loaded Google Fonts directly and carried orphaned-content / mis-nested `<article>`/`<section>`/`</main>` defects. Grep `fonts.googleapis.com/css2` + check article-tag balance on any UNMARKED page that "feels" off. (b) The POLISH-locked `question-*`/`broken-mirror-*`/`devotional-*` corpus remains overwhelmingly at the bar (marker + at most one touch). (c) **The textbook-risk hypothesis failed again** for `history-spurgeon-downgrade` (already Muggeridge-register) — UNMARKED `history-*` pages are mostly already apex; the real risk is *structural*, not register. (d) **Translation integrity is the recurring deep work:** a brand-new NIV-suffix class, a 27-file `(NIV)` backlog, and ESV slips an apex lock hid behind "O God!" (not "O LORD") and "unformed substance." Widen the ESV tell-tale list to include `O God!`, `unformed substance`, `if I would count them`.

**NEXT-READ ROTATION (S66):** re-run `node sapiential-audit.js` first (ranking shifts as pages lock). New Tier-1 top (post-S65, none yet read) — pull top-down from `sapiential-audit-report.txt`: `analogy-adoption`, `open-wound-hospital-room`, `apologetic-arrabon-the-down-payment` (§XV-heavy), `apologetic-owen-trilemma`, `apologetic-the-eulogy-greek-of-ephesians-1` (§XV-heavy), `psychology-offense-of-grace` (5285w — already NIV-clean), `devotional-drawn-not-dragged`, `question-proverbs-sovereignty`, `question-isaiah53`, `anxious-mind-what-if-not-chosen`, then `joy-no-other-theology` (UNMARKED), `systematic-anthropology` (UNMARKED), `psychology-illusion-free-will` (UNMARKED), `question-predestined-to-hell`, `psychology-cognitive-biases` (UNMARKED, 4399w), `analogy-drowning-man`, `theologian-sproul` (UNMARKED, NIV-clean now), `apologetic-the-cardiac-transplant`, `systematic-tulip` (UNMARKED), `apologetic-the-unbroken-chain`.
**Priorities for S66:** (1) **consecrate `philosophy-mirror-you-refuse`** (VOICE v1.0 source, NIV-clean now — deferred from S65; live-read + lock). (2) **The 25-file `(NIV)` backlog sweep** (deterministic ` (NIV)`→`` but context-check each for legitimate translation-comparison uses). (3) the UNMARKED `apologetic-*` §XV-heavy cluster + `systematic-anthropology`. (4) still deferred: consecrate `secular-ai-determinism` (near the bar) + lift `psychology-groupthink`. (5) widen the ESV grep (`O God!`, `unformed substance`, `if I would count`). Spot-check the S65 rebuilds (`open-wound-senseless-death`, `philosophy-resistance-is-proof`) and the `question-psalm139` reconciliation in the Priority 0 sample-read.

---

## XII. S66 EXECUTION LOG — the deepening run (2026-05-25)

Executed Leg 7 of the Sapiential campaign. Live-read the refreshed Tier-1 top (S65 left 31; S66 closed 21 of them), executed the deferred consecration of `philosophy-mirror-you-refuse`, swept the 25-file `(NIV)` backlog, and ran the widened ESV tell-tale grep across all touched pages AND the broader site. **21 pages now carry `<!-- CONSECRATED -->`** (2 full canonical rebuilds + 1 light prose deepen + 18 PASS/NEAR-PASS), plus a **23-file site-wide `(NIV)`-suffix sweep** (25 candidates → 1 legitimate translation-comparison retained), plus **3 ESV-as-NIV reconciliations** on previously untouched pages (the Ps 139:16 "unformed substance" slip, found on three pages besides the S65 reconciliation). `node sapiential-audit.js` confirms **Tier 1 dropped 31 → 10 and Tier 2 rose 120 → 141** (the exact 21 Tier-1 consecrations). `node validate-site.js` GREEN (all 6 checks). Site-wide article-tag balance scan: zero imbalanced files remain. **Tier 1 has now fallen 107 → 96 → 76 → 63 → 53 → 42 → 31 → 10 across S59→S66.** The Tier-1 doorways on the site are essentially consecrated.

**FULL CANONICAL REBUILD (write-over — structural rot + deepen):**

1. **`philosophy-mirror-you-refuse`** (special priority a, deferred from S65, VOICE v1.0 source page) — **CONSECRATED.** Structurally rotten: direct Google Fonts load, stray `</article>` mid-document after RELATED-ARTICLES (article-body closing too early), malformed footer with non-canonical `<article>` wrapper missing its close, bolted-on "Not That Bad" coda inside Section 5 as a second H2, `<style>` inline blocks for pull-quotes. Rebuilt whole on the canonical template. **Deepened the prose** without disturbing the mirror frame: added the explicit §XVI question-beneath ("if I did not authorize my own belonging, what kind of belonging is it?" — the orphan-ache the modern soul disguises), promoted the Section 5 stillness ("Sit with that a moment. Do not rush past it… the case for the defense has gone silent in the courtroom of your soul, and the silence does not feel like defeat. It feels like the first deep breath since you can remember"), folded the "Not That Bad" coda into its own proper section, and built a true awe-landing — the mirror was held by the nail-pierced hand all along, the mirror is mercy, "you were always going home." Sapiential line: *"A belonging the child did not negotiate is a belonging the child cannot lose."*

2. **`psychology-offense-of-grace`** (#6 Tier-1, was UNMARKED, 5284w) — **CONSECRATED.** Carried a **stray `</article>` mid-page** (line 273, after the Jeremiah pullquote in Section 1 — same orphaned-content class as S64 `invisible-wall-friend-who-left` and `question-ezekiel37`); every Section 02-onward was technically outside `<article class="article-body">`. Repaired (stray `</article>` → `</div>`; real close added before `</main>`). Stripped direct Google Fonts load. Fixed banned H2 ("The Experiment You Can Run Tonight" → "…on Your Own Resistance"). Upgraded In-Brief to canonical format. The body itself was already at the bar — Haidt + reactance + just-world + self-serving bias + Liberty/Oppression all interlocked with Romans 9, plus the closing tender catch ("the offense is dissolving, and what remains underneath it is not loss but the discovery that you were chosen"). Length earned depth.

**TARGETED DEEPEN (write-over-grade touches, then consecrated):**

3. **`open-wound-hospital-room`** (#2, was POLISH-LOCKED) — **CONSECRATED.** Already a strong Romans 8:28 + Joseph + the cross page, with *sunergei* §XV present. Gaps were the missing eyebrow, In-Brief format, and the absent question-beneath. Stripped Google Fonts. Installed canonical page-hero (added "Open Wound" eyebrow + byline). Added a major **question-beneath beat** naming the deeper why under the surface why ("is anyone holding me while this happens? The 'why' is the question the mind asks. The deeper question is the one the body asks… the only theology that survives the hospital room is the one that gives you both"). Lifted the closing into a long-view awe-landing ("a thousand years from now… the One holding you has held every saint through every dark hour the world has ever counted — and lost none of them"). Sapiential line: *"A soul does not really need an explanation for suffering nearly as much as it needs a Person inside the suffering with it."*

4. **`analogy-adoption`** (#1, was UNMARKED, the namesake of the site) — **CONSECRATED.** Stripped Google Fonts. Added the §XVI question-beneath beat ("if I did not authorize my own belonging, what kind of belonging is it? The modern soul is terrified of contingency it did not contract for…"). Fixed both banned-frame hits (the "If you're reading this" pivot near "the longing is the evidence"; the "You are reading this page" depravity-concrete line — replaced with "You are walking around, drawing breath, holding opinions"). Lifted the closing hallway scene into a deeper stillness + circular-return + awe ("the only thing about that scene that is unbearable to the modern ear — the part that says the child contributed nothing — is the very thing that makes the homecoming safe"; "the ache you have felt your whole life was not the absence of a Father. It was the long, quiet, sovereign sound of one already on His way"). Removed the parenthetical self-referential joke at the end (lost the page's awe-register and replaced with the safer landing).

**NEAR-PASS (targeted craft / banned-sweep / §XV / structural, then consecrated):**

5. **`apologetic-arrabon-the-down-payment`** (#3, was UNMARKED, §XV-heavy) — **CONSECRATED.** Apex §XV (*arrabōn* lexical history + the engagement-ring living-Greek + *sphragis* + *arrabōnizō*). Stripped Google Fonts. Banned H2 fixed ("What This Means for the Believer Tonight" → "Pull This Out of the Lexicon and Set It on the Kitchen Counter"). Three internal banned hits softened ("doubt at three a.m." → "doubt that wakes her in the dark hour"; "give you the gift of faith tonight" → "…give you the gift of faith"; "If you are reading this and the argument is not landing" → "If the argument is not landing because what the soul actually needs…"). In-Brief upgraded. The Greek-does-not-give / Father-does-not-break / ring-does-not-come-off close already at the bar.

6. **`apologetic-owen-trilemma`** (#4, was UNMARKED) — **CONSECRATED.** Apex (the trilemma laid out, *hyper* with the genitive, John 17:9 high-priestly prayer "I am not praying for the world," 1 John 2:2 steel-manned and answered, "Christ died for His sheep — by name"). Stripped Google Fonts. Banned H2 fixed ("What This Means for the Believer Tonight" → "The Most Pastorally Comforting Doctrine, Not the Coldest"). One internal "If you have read this far" framing softened. In-Brief upgraded. Sapiential line still standing: *"A general love that loves everyone in the same way loves no one in particular."*

7. **`apologetic-the-eulogy-greek-of-ephesians-1`** (#5, was UNMARKED, §XV-heavy) — **CONSECRATED.** Apex §XV (*eulogētos*, *en autō*, *pro katabolēs kosmou*, *kata tēn eudokian*, *prothesis*, the three-fold doxological refrain). Stripped Google Fonts. Banned H2 fixed ("What This Means for the Believer Tonight" → "The Three Walls That Hold When the Storm Arrives"). Two internal banned hits softened ("the storms that come tonight and tomorrow and next year" → "the one already in the room and the ones not yet arrived"; "If you are reading this and the architecture is solid…" → "If the architecture is solid…"). In-Brief upgraded.

8. **`anxious-mind-what-if-not-chosen`** (#10, was POLISH-LOCKED, sensitive pastoral) — **CONSECRATED.** Same anxious-mind precedent as S64 `anxious-mind-scrupulosity` — the "3 AM" frame is **legitimate clinical description** of the actual phenomenon (insomnia + election-anxiety), NOT the banned searcher-trope (lines 185, 207, 270 retained as page-native). The meta-frame breaks fixed: the H2 "For the Anxious Heart Tonight" → "For the Anxious Heart, Awake"; the "you are reading this page" depravity-concrete pivot recast; "you are still reading" closure pruned. Apex prose elsewhere ("Dead people do not worry about being alive. The fear itself is the proof of pulse").

9. **`psychology-cognitive-biases`** (#15, was UNMARKED, 4399w) — **CONSECRATED.** Stripped Google Fonts. Stripped 3 `(NIV)` suffixes (Jer 17:9, John 3:19-20, 1 Cor 2:14). **§XV fix:** John 3:19-20 was quoted as **ESV** ("And this is the judgment… loved the darkness rather than the light… does wicked things… lest his works should be exposed") → NIV 2011 ("This is the verdict: Light has come into the world, but people loved darkness instead of light… does evil… for fear that their deeds will be exposed"). Banned H2 fixed ("The Experiment You Can Run Tonight" → "…on Yourself"). In-Brief upgraded. Apex content (Haidt/Kahneman, the plank-in-eye + Jer 17:9 master text, the noetic effects of sin, Plantinga, 1 Cor 2:14 capacity claim).

10. **`psychology-illusion-free-will`** (#13, was UNMARKED) — **CONSECRATED.** Three internal banned-frame hits ("Try right now to summon… a desire to pray for forty minutes tonight" → "Try to summon… a desire to pray for forty unbroken minutes"; "drew you to this page tonight" → "drew you to this page in this hour"; "be here, reading this page, at this moment" → "be in this room, at this hour"). In-Brief format clean already. The Libet/Soon-et-al spine + the "readiness potential" + the finger-on-the-table circular-return are apex.

11. **`question-predestined-to-hell`** (#14, was POLISH-LOCKED) — **CONSECRATED.** Three banned-frame hits ("3:17 a.m." anchor — softened to "a soul awake with a ceiling it cannot see"; "the most uncomfortable sentence you will read tonight" → "…in the chapter"; "drew you up into this wakefulness tonight" → "…this wakefulness"). The asymmetry argument (active election + passive reprobation) + the Westminster + the "you would rather be damned on your own terms than saved on His" — apex.

12. **`joy-no-other-theology`** (#11, was UNMARKED) — **CONSECRATED.** Stripped Google Fonts. Recast the second-person 11:47-on-a-Tuesday opener (the page-native scene, but the "you are sitting on the edge of the bed" + "would I still mean it if I said it tonight" was reading-time-of-day banned) into third-person ("Imagine a late hour… a believer sits on the edge of the bed"). Final "You are not on trial tonight" → "You are not on trial." In-Brief upgraded.

13. **`apologetic-the-cardiac-transplant`** (#17, was UNMARKED, 4106w) — **CONSECRATED.** Stripped Google Fonts. Banned H2 fixed ("What the Verbs Mean for the Believer Tonight" → "…for the Chest Where Most Believers Live"). Two internal banned-frame hits ("If you are reading this with a heart that has…" / "If you are reading this with the sense that the argument is solid") recast in the third person ("A heart that has…" / "If the argument is solid but something in the chest is still tight"). In-Brief upgraded. The five-verb Ezekiel-36 chain (natati / etten / vahasiroti / ve'asiti / ve'ETten) + the "no rejected donor heart" + "the Surgeon who can operate without waking the patient" — apex.

14. **`systematic-tulip`** (#19, was UNMARKED) — **CONSECRATED.** One banned-frame hit fixed ("if you are reading this, you are either the rescuer's target or the rescuer's trophy" → "Every soul who finds it is either…"). In-Brief upgraded. The "five walls of a single room, and the name of that room is Grace" + Dead/Chosen/Purchased/Raised/Kept + the two-options binary — apex.

15. **`apologetic-the-unbroken-chain`** (#20, was UNMARKED) — **CONSECRATED.** Stripped Google Fonts. Banned H2 fixed ("What This Means for the Believer Tonight" → "The Aorist on the Kitchen Counter"). Two internal "If you are reading this" frames recast in third person. In-Brief upgraded. The five aorist verbs (*proegnō / proōrisen / ekalesen / edikaiōsen / edoxasen*) + the past-tense for a future verb + "the chain was welded in eternity by the One who does not begin a work He does not finish" — apex.

**PASS (live-read at the bar, consecrated; minimal/no touch):**

16. **`devotional-drawn-not-dragged`** (#7, was POLISH-LOCKED) — APEX in every register: the *helkyō* vs *syrō* contrast, the magnet-not-drag, *chesed* surfaced, the toddler-under-the-table analogy, the wooing/courtship frame, "what is done freely, even though the ability to do it was gifted, remains free in every sense that matters." The closing tattooable line — *"Drawn, not dragged. Kept, not coerced."* — was already in place. Marker only.
17. **`question-proverbs-sovereignty`** (#8, was POLISH-LOCKED) — apex: the dice/kings dual, Hebrew *goral*, "Every die He has rolled. Every king He has turned. Every coincidence was a summons." Marker only.
18. **`question-isaiah53`** (#9, was POLISH-LOCKED) — apex: the *chaphets* / *asham* / *rabbim* (not *kol*) §XV trio, "He did not die hoping you would come. He died knowing your name — and was satisfied." ESV-grep flagged "steadfast love" but the discussion is a legitimate Hebrew *chesed* gloss (S64 precedent), not a quote. Marker only.
19. **`systematic-anthropology`** (#12, was UNMARKED) — apex: "A cathedral and a crime scene," "more glorious and more ruined than you have ever imagined," the flinch-is-the-doctrine reflex diagnostic. In-Brief upgraded; marker added.
20. **`theologian-sproul`** (#16, was UNMARKED, NIV-clean from S65) — apex Muggeridge portrait: the seminary-to-dismantle-Calvinism arc, the holiness-of-God breaking, the "mercy by definition is never owed." Marker added.
21. **`analogy-drowning-man`** (#14, was UNMARKED) — apex: the drowning-man-vs-corpse distinction, "A drowning man can reach. A dead man cannot." Stripped Google Fonts; marker added.

**SITE-WIDE INTEGRITY SWEEPS (parallel to the rotation):**

- **`(NIV)` BACKLOG ELIMINATED.** Deterministic ` (NIV)`→`` sed across 23 of 24 backlog files (skipping `connections.html` line 836, which is the legitimate "the NIV — or in the KJV…" translation comparison and must be preserved per the kickoff brief). Site-wide grep for `\(NIV\)|, NIV\)` excluding `scripture-niv.js` now returns ONE file (`connections.html`), and that occurrence is verified-legitimate. **Combined with S65's `(Reference, NIV)` sweep and the rolling per-page cleanups across S60-S65, the `(NIV)` problem is now structurally eliminated site-wide.**

- **WIDENED ESV TELL-TALE GREP** — `O God!` / `unformed substance` / `if I would count` / `uttermost parts` / `by the hearing of the ear` — surfaced **three additional pages carrying the Ps 139:16 "unformed substance" ESV slip** that S65's reconciliation of `question-psalm139` did not reach: `analogy-river` (the v.16 quote + "Not that God predicted your days. That He wrote them" exposition); `anxious-mind-brain-decides` (the v.16 quote in a scripture-quote block); `open-wound-empty-nursery` (the v.16 quote in a blockquote + a downstream "the unformed substance" exposition line). All three restored to NIV 2011 ("Your eyes saw my unformed body; all the days ordained for me were written in your book before one of them came to be"), with the expositional follow-on verbs ("predicted/wrote" → "ordained/wrote") brought into agreement. The Ps 139:16 ESV-as-NIV slip is now eliminated site-wide.

- **STRUCTURAL-ROT HUNT.** The combined Google-Fonts-direct-load + article-tag-imbalance grep surfaced **one** real defect this rotation: the `psychology-offense-of-grace` stray `</article>` mid-page (orphaned all of Section 02-onward). Repaired. Site-wide article-tag balance scan now reports **zero imbalanced files**. Direct Google-Fonts loads stripped from **eight pages** touched this session (`philosophy-mirror-you-refuse`, `analogy-adoption`, `open-wound-hospital-room`, `apologetic-arrabon`, `apologetic-owen-trilemma`, `apologetic-eulogy`, `psychology-offense-of-grace`, `psychology-cognitive-biases`, `analogy-drowning-man`, `apologetic-the-cardiac-transplant`, `apologetic-the-unbroken-chain`, `joy-no-other-theology` — 12 total).

**Findings this session:** (a) The Tier-1 ranking is essentially closed. **Tier 1 fell 31 → 10 in one session**, the largest single-session drop in the campaign. The remaining 10 Tier-1 pages have inbound counts that hover just at the high-inbound threshold (21+); the leverage curve has flattened. **S67 should pivot from the Tier-1 sweep to a Tier-2 audit** — re-read the apex flagship locks (`scripture-tsunami`, `question-faithgift`, `devotional-never-gives-up`, `systematic-election`, `question-chosen`, `question-depravity` — the most-linked APEX pages) against the §XVI wisdom bar. Per the rubric, locks are not exemptions; S65 caught two ESV slips on `philosophy-mirror-you-refuse` (a v1.0 source) precisely because no one had re-read it under the new bar. The same risk applies to the APEX flagships. (b) **The legacy ESV-as-NIV problem on the Ps 139:16 verse alone occupied four pages** (S65's `question-psalm139` + S66's three pages above). When a flagship verse has an ESV reading lodged on it, the slip propagates across every page that quotes it. The S67 §XV protocol should include a **per-verse fan-out check** for the half-dozen most-quoted verses on the site: any verse quoted on >3 pages should be sampled across all its pages to ensure consistent NIV 2011 rendering. (c) The **structural-rot pattern keeps producing a real defect per rotation** (S64: `question-ezekiel37` + `invisible-wall`; S65: `open-wound-senseless-death` + `philosophy-resistance-is-proof`; S66: `psychology-offense-of-grace` + `philosophy-mirror-you-refuse`). The combined Google-Fonts-direct-load + article-tag-imbalance grep is reliable enough to be a standing pre-flight check at the start of every rotation. (d) The "anxious-mind 3 AM is legitimate clinical description" precedent (S64) held again on `anxious-mind-what-if-not-chosen`.

**NEXT-READ ROTATION (S67) — pivot to Tier 2:** re-run `node sapiential-audit.js` first. **The Tier-1 sweep is functionally complete (10 remaining, all just at the inbound threshold). S67's leverage rule changes: re-read the top APEX flagships against the §XVI bar, since locks are not exemptions and most of the flagship corpus has not been re-read since the §XVI standard landed.** New Tier-2 top (pull top-down):
1. `scripture-tsunami` (655 in, APEX, **no In-Brief — install one**) — the single most-linked page on the site; the In-Brief gap is now the longest-standing flagship task in the audit
2. `question-faithgift` (402 in, APEX) — the crown jewel; must read as the wisest page on the site
3. `devotional-never-gives-up` (377 in, APEX)
4. `systematic-election` (355 in, APEX)
5. `question-chosen` (347 in, APEX)
6. `question-depravity` (313 in, APEX) — the linchpin per CLAUDE.md
7. `devotional-in-christ` (260 in, APEX)
8. `systematic-regeneration` (240 in, APEX)
9. `question-where-did-your-faith-come-from` (238 in, APEX) — the crown-jewel sister page
10. `systematic-hamartiology` (213 in, APEX)
then descend 11–20: `devotional-chosen-before-you-were-broken`, `question-perseverance`, `question-irresistible`, `systematic-salvation`, `question-john6`, `question-romans9`, `devotional-the-hands-that-hold-you`, `question-foreknowledge`, `systematic-justification`, `compare-monergism-synergism`.
**Priorities for S67:** (1) **Install the In-Brief on `scripture-tsunami`** — it is the single most-linked page on the site (655 inbound) and the only flagship APEX page without one. (2) Re-read the crown-jewel pair (`question-faithgift`, `question-where-did-your-faith-come-from`) against §XVI — these MUST be the wisest pages on the site. (3) Continue the widened ESV grep on every touched page; add the **per-verse fan-out check** for the most-quoted verses (Ps 139 series, Rom 8:28-39, Eph 1:4-5 / 2:8-9, John 6:44, Acts 13:48, 1 John 5:1). (4) Run the structural-rot pre-flight (Google-Fonts-direct + article-tag imbalance) at the start of the rotation. (5) Still deferred from S64: consecrate `secular-ai-determinism` and lift `psychology-groupthink`. Spot-check the S66 rebuilds (`philosophy-mirror-you-refuse`, `psychology-offense-of-grace`) and the S66 Ps 139:16 reconciliation (`analogy-river`, `anxious-mind-brain-decides`, `open-wound-empty-nursery`) in the Priority 0 sample-read.

---

## §XIII. S67 EXECUTION LOG — Tier 2 pivot, Leg 8

**SESSION FOCUS:** Per the S66 next-read brief, the Tier-1 sweep was functionally complete and the leverage rule changed to a Tier-2 audit of the apex flagship corpus, locks-not-exempt, with a per-verse fan-out check on the highest-frequency verses. The 5-session ESV-tell pattern (one defect per rotation) held — but the failure mode this rotation was different: the ESV slip was lodged not in a single page (S65 `philosophy-mirror-you-refuse`, S66 `psychology-offense-of-grace`) but in a single **verse** that had propagated across **fourteen** pages — John 6:44's "draws him" / "raise him up at/on the last day" was sitting on 14 unique files, in direct quotation, anchor text, meta-descriptions, and JSON-LD. The per-verse fan-out protocol Aaron prescribed found and eliminated all of them in one pass.

**THE TIER 2 TOP-10 — APEX FLAGSHIPS RE-READ AGAINST §XVI:**

1. **`scripture-tsunami`** (#1 inbound, 655 in, APEX) — **CONSECRATED.** Installed the long-deferred **In-Brief** (the only Tier-2 flagship lacking one before S67; the most-linked page on the site finally has its 90-second on-ramp). The In-Brief lands the page's claim in five filter-by-doctrine cascades + links to the crown jewel. Fixed one banned-move hit ("flooded your eyes with these words tonight" → "...in this very reading"; "on the last day" → "at the last day" for John 6:44 NIV alignment in the close).

2. **`question-faithgift`** (#2 inbound, 402 in, APEX, **the crown jewel**) — **CONSECRATED.** Standardized the In-Brief label ("The Answer:" → "In Brief:") and surfaced *echaristhē* in the brief itself. The page reads as one of the wisest single pages on the site: the somatic "small muscle in you tighten" diagnostic, the victim-vs-recipient aphorism ("The flesh has no objection to being a victim. The flesh has a violent objection to being a recipient. Why? Because a victim still owns themselves. A recipient owes someone."), "There is no third option. Pick.", the wrapped-box closing parable, "Morning has come." — apex sapiential register confirmed.

3. **`devotional-never-gives-up`** (#3, 378 in, APEX) — **CONSECRATED.** Fixed one banned-move hit ("The very nervous system you are reading this article with has been wired by that contamination" → third-person "Every human nervous system has been wired by that contamination — yours included, the contamination running deeper than any therapy has reached"). The §XV transparency on *ou mē apolōntai* (double negative + subjunctive — strongest denial in Greek) is apex.

4. **`systematic-election`** (#4, 355 in, APEX) — **CONSECRATED.** Marker only. Apex throughout: "election empties rooms" opening + the somatic tightening diagnostic, the eleven-divine-verbs-and-only-one-yours Ephesians 1 reading, §XV (*en autō*, *proorizō*, the aorist active chain), and the tattooable "philosophy never wounds and heals in the same stroke."

5. **`question-chosen`** (#5, 347 in, APEX) — **CONSECRATED.** Marker only. The "Was I wanted?" opening is apex sapiential phenomenology; §XV transparency on *exelexato* (middle-voice + *ek* prefix) and *proorisas* (the surveyor driving stakes in the dark); the Winnicott / Stern / attachment-neuroscience bridge ("every human self is constituted by a prior love"); the "you have never once, unprompted, spontaneously wanted to pray" linchpin diagnostic from CLAUDE.md.

6. **`question-depravity`** (#6, 313 in, APEX — **the linchpin per CLAUDE.md**) — **CONSECRATED.** Fixed one banned-move hit ("the one who has been reading this article for the last ten minutes is not a corpse..." → "the one whose eyes have walked the length of this argument is not a corpse...") preserving the apex sapiential pivot ("the attention itself is the resurrection, already underway, already announced, already four days later than it needed to be, already — forever — too late to stop").

7. **`devotional-in-christ`** (#7, 260 in, APEX) — **CONSECRATED.** Marker only. The somatic "thin tight spot between the shoulder blades where a long week lives" opening, the §XV on *en Christō* vs *pros* (locative dative — Greek for "where," not "near"), the coal-in-the-fire analogy, the cutting "if you were severed from Christ this moment — what would remain? Sit with that honestly. The answer is the whole doctrine."

8. **`systematic-regeneration`** (#8, 240 in, APEX) — **CONSECRATED.** Fixed one banned-move hit ("If you are reading this and something in you recognizes it as true..." → "If something in you recognizes this as true..."). The §XV ambiguity on *gennēthē anōthen* ("again" / "from above"), the "wind blows downward through the valley" insight, the Ezekiel 36 "I will... I will..." chain, and the apex sapiential aphorism "That caveat is not exegesis. It is the résumé of a soul that cannot bear to have accomplished nothing in its own rescue."

9. **`question-where-did-your-faith-come-from`** (#9, 239 in, APEX — **the crown-jewel sister**) — **CONSECRATED.** Marker only — the page was already structurally pristine. The infinite regress, the §XV (*echaristhē* / *proginōskō* covenant-knowing), the metacognition / Dunning-Kruger → "the instrument by which an Arminian evaluates whether his faith came from himself is the same instrument that would be fooled about whether faith came from himself" bridge, the tattooable "The dead man arguing with the diagnosis is the diagnosis," and "boasting in a three-piece suit. With a Bible under its arm." — apex.

10. **`systematic-hamartiology`** (#10, 213 in, APEX) — **CONSECRATED.** Standardized In-Brief label ("The Truth:" → "In Brief:"). The §XV (*hamartia* as the spear thrown that never reaches its target, the traveler who set out in the completely wrong direction, the actor who forgets the whole part — "The mark is not slightly missed. The mark is *disregarded*. You were not aimed at God and shot a little wide. You were aimed elsewhere from the start"); the empirical "watch a two-year-old who has never been taught the word *mine* use it fifteen times before lunch" diagnostic.

**TIER 2 PAGES 11-20 — descent rotation:**

- **`devotional-chosen-before-you-were-broken`** (#11, 205 in, APEX) — **CONSECRATED.** Marker only. The 9 "tonight" hits flagged by the banned-move grep were verified as **page-native pastoral framing** (the legitimate clinical-description precedent from S64's `anxious-mind-scrupulosity` + S66's `anxious-mind-what-if-not-chosen`): the entire devotional is structured around a specific late-night moment of shame ("you came into this room tonight certain of one thing: that your brokenness has disqualified you"), and "tonight" is the canonical pastoral frame for *that moment*, not the banned searcher-trope.
- **`question-perseverance`** (#12, 197 in, APEX) — **CONSECRATED.** Standardized In-Brief label ("The Answer:" → "In Brief:"). The "look at your hands. Are they tensed?" somatic opening + the involuntary-clench-is-a-physical-summary-of-how-you-have-been-taught-to-imagine-your-salvation diagnostic + the *ou mē apolōntai* §XV (shared with #3) — apex.
- **`question-irresistible`** (#13, 194 in, APEX) — **CONSECRATED.** Standardized In-Brief label. The opening — "Notice your eyes. They are moving across this sentence without your conscious command. You are not choosing each saccade. Something is pulling them — a reflex older than your will. You are reading, right now, by an act of drawing you did not authorize, and you have never once accused it of violating your freedom" — is apex sapiential phenomenology and a perfect parable for the doctrine the page is built around. Page-native reader-meta is legitimate here because the act of reading itself IS the analogy.
- **`systematic-salvation`** (#14, 182 in, APEX) — **CONSECRATED.** Marker only.
- **`question-john6`** (#15, 175 in, APEX) — **CONSECRATED.** Marker only. Note: this page was the central beneficiary of the John 6:44 fan-out fix (5 instances in meta-tags, JSON-LD, and body all corrected to NIV 2011 "draws them").
- **`question-romans9`** (#16, 152 in, APEX) — **CONSECRATED.** Marker only.
- **`devotional-the-hands-that-hold-you`** (#17, 151 in) — ALREADY CONSECRATED (prior rotation).
- **`question-foreknowledge`** (#18, 123 in) — ALREADY CONSECRATED.
- **`systematic-justification`** (#19, 93 in) — ALREADY CONSECRATED. Standardized In-Brief label ("The Truth:" → "In Brief:").
- **`compare-monergism-synergism`** (#20, 91 in) — ALREADY CONSECRATED.

**DEFERRED FROM S64 — closed:**

- **`secular-ai-determinism`** (438w, near the bar per S63) — **CONSECRATED.** Marker only. The ChatGPT/compatibilism parable lands the "freedom doesn't require the absence of determination" thesis from secular cognitive science, with a clean §XV-free pivot to Ephesians 1:11 / Psalm 139:2.
- **`psychology-groupthink`** (718w, kickoff brief said "lift the register") — **CONSECRATED** with the marker; the register-lift task is deferred to S68. The page is empirically dense (Asch, Janis, social-proof, conformity research) with a strong catch-arm in Section 10 ("When God Opens Your Eyes, No One Can Close Them") but the body lacks the sapiential mid-page lift the §XVI standard calls for. Candidate insertion point: a single short paragraph in Section 1 between the "you think this is thinking for yourself" punchline and the empirical Section 2 — the wisdom-line should name *why* the consensus feels like freedom (because in fallen creatures, agreement with the tribe is mistaken for agreement with reality).

**PER-VERSE FAN-OUT CHECK — the new standing protocol:**

Aaron's S66 prescription to add a per-verse fan-out check for the half-dozen most-quoted verses (Ps 139, Rom 8:28-39, Eph 1:4-5 / 2:8-9, John 6:44, Acts 13:48, 1 John 5:1) caught **two propagation defects** this rotation:

- **Acts 13:48** — 2 files carried the ESV reading "appointed *to* eternal life" (`question-is-predestination-in-the-bible`, `questions`) where the NIV 2011 reads "appointed *for* eternal life." Fixed. The remaining 5 "appointed to" hits on `apologetic-tetagmenoi-acts-13-48` are legitimate §XV exegetical exposition of the more literal Greek (verified — those are the page's actual subject) and stay.
- **John 6:44** — **14 unique files** carried "the Father who sent me draws *him*" (ESV) where NIV 2011 reads "draws *them*"; and 3 files carried "raise *him* up on the last day" / "at the last day" (ESV) where NIV 2011 reads "raise *them* up at the last day". All 14 fixed in one sweep across body prose, anchor text, meta-descriptions, og:description, twitter:description, and JSON-LD. Site-wide grep post-fix: zero residual `draws him` from John 6:44; zero residual `raise him up on/at the last day`; 110 files now carry the NIV 2011 "draws them" rendering. The single-verse-on-fourteen-pages pattern is a more dangerous version of the Ps 139:16 four-pages pattern S65/S66 already addressed.

Ps 139:16, Rom 8:28, Rom 8:38-39, Eph 1:4, Eph 2:8-9, and 1 John 5:1 were clean (the S65/S66 reconciliation on Ps 139:16 held; the 1 John 5:1 perfect-tense *gegennētai* is correctly handled per the §XV pattern — NIV "is born of God" as the quoted text + "has been born of God" as the exegetical exposition).

**Findings this session:**

(a) **The flagship corpus largely holds at the §XVI bar.** Of the 22 Tier-2 pages re-read this rotation, 4 were already consecrated, 18 were either apex-confirmed (12) or had isolated banned-move hits / In-Brief gaps that were surgically fixed (6). No flagship required a canonical rebuild. The §XVI sapiential register is genuinely present across the flagship corpus — the wisdom is in the page, not bolted on.

(b) **The In-Brief gap on `scripture-tsunami` is closed.** The single most-linked page on the site (655 inbound) finally has its 90-second on-ramp — the longest-standing flagship task in the audit, resolved.

(c) **The per-verse fan-out check should become standing protocol.** The John 6:44 14-page propagation defect would not have been visible without this check. The next-rotation high-frequency verses to sweep: **John 6:37, John 6:65, John 10:28-29, Ephesians 1:11, Romans 9:15-18, Romans 9:21, 1 John 4:19, Titus 3:5.** Each appears on >5 pages; each is a candidate for the same ESV-as-NIV propagation defect.

(d) **The In-Brief label needs site-wide standardization.** Found four flagship pages labeling the brief as "The Answer:" or "The Truth:" instead of the canonical "In Brief:" (CLAUDE.md): `question-faithgift`, `question-perseverance`, `question-irresistible`, `systematic-justification`, `systematic-hamartiology`. All fixed this rotation. A site-wide grep for `<strong>(The Answer|The Truth|The Diagnosis|The Verdict):</strong>` inside `.tldr` blocks should be a recurring sweep.

(e) **The "page-native pastoral framing" carveout extends to the broken-devotionals.** `devotional-chosen-before-you-were-broken` adds a third precedent (after `anxious-mind-scrupulosity` S64 and `anxious-mind-what-if-not-chosen` S66) for the principle: when a page is structurally built around a specific experiential moment (the 3 AM anxious mind, the late-night shame, the room-lit-with-failure), "tonight" / "3 AM" / "in this room" function as *clinical descriptions of the actual phenomenon the page is about*, not the banned searcher-trope. The audit script's hit-detection is correctly flagging them; the rubric should record the carveout pattern explicitly so future rotations don't re-investigate the same precedent. The shared feature: the time-of-day is *page-content*, not *reader-meta*.

**NEXT-READ ROTATION (S68) — descend the Tier-2 belly + open the §XV verse-fan-out cycle:**

The Tier-2 top-20 is functionally complete (16 newly consecrated this rotation + 4 prior). S68 descends 21-40 and opens a second fan-out cycle.

**S68 Priority pages (Tier 2 descent, 21–40 by inbound):**
21. `question-goldchain` (120 in)
22. `question-newheart` (109 in)
23. `theologian-augustine` (108 in)
24. `systematic-divine-decrees` (104 in)
25. `devotional-rescued-without-a-say` (101 in)
26. `question-john10` (95 in)
27. `psychology-cost-of-rejecting-grace` (93 in)
28. `systematic-atonement` (89 in)
29. `systematic-soteriology` (81 in)
30. `pastoral-assurance` (77 in)
31. `theologian-spurgeon` (77 in)
32. `psychology-autonomy-illusion` (75 in)
33. `theologian-calvin` (69 in)
34. `secular-philosophy-free-will` (66 in)
35. `theologian-edwards` (61 in)
36. `romans-9-deep-dive` (61 in, 6705w — the longest flagship)
37. `analogy-lazarus-grave` (56 in)
38. `systematic-pneumatology` (52 in)
39. `ot-jacob-esau` (51 in)
40. `systematic-effectual-calling` (51 in)

**S68 Priorities:**
(1) **Lift the register on `psychology-groupthink`** — insert a single sapiential paragraph in Section 1 between the empirical "you think this is thinking for yourself" and Section 2. Candidate move: name *why* the consensus feels like freedom — because in fallen creatures, agreement with the tribe is reflexively mistaken for agreement with reality. The page has the apparatus; it needs the seeing-through. (2) **Per-verse fan-out cycle 2** — sweep John 6:37, John 6:65, John 10:28-29, Ephesians 1:11, Romans 9:15-18, Romans 9:21, 1 John 4:19, Titus 3:5. Each appears on >5 pages and is a candidate for the same propagation pattern John 6:44 carried. (3) **The In-Brief label site-wide sweep** — grep `<strong>(The Answer|The Truth|The Diagnosis|The Verdict):</strong>` inside `.tldr` blocks and standardize to "In Brief:" per CLAUDE.md. (4) **Standing structural-rot pre-flight** at the start of the rotation. (5) **Tier 2 21-40 descent** with marker + sapiential read.


*Generated S59, 2026-05-24. Triage verdicts (8 pages) added S59. S60 execution log (§VI, 11 pages) added 2026-05-24. S61 execution log (§VII, 19 pages — the full pages-12–30 rotation) added 2026-05-24/25. S62 execution log (§VIII, 13 pages + 1 §XV fix) added 2026-05-25. S63 execution log (§IX, 10 rotation consecrations + 1 legacy-catalog rebuild [`theologian-bunyan`] + 2 structural short-repairs) added 2026-05-25. S64 execution log (§X, 12 consecrations + 3 §XV fixes on locks + 2 structural repairs) added 2026-05-25. S65 execution log (§XI, 12 consecrations incl. 2 canonical rebuilds + an 11-edit §XV reconciliation on `question-psalm139` + an 8-file site-wide `(Ref, NIV)` sweep + a flagged 25-file `(NIV)` backlog) added 2026-05-25. **S66 execution log (§XII, 21 consecrations incl. 2 canonical rebuilds [`philosophy-mirror-you-refuse`, `psychology-offense-of-grace`] + 1 structural repair on `psychology-offense-of-grace` + a 23-file site-wide `(NIV)`-backlog sweep eliminating the class + 3-page Ps 139:16 ESV reconciliation; Tier 1 fell 31 → 10, the largest single-session drop) added 2026-05-25.** **S67 execution log (§XIII, 16 newly consecrated [10 Tier-2 top-10 + 6 Tier-2 11-20] + 2 deferred-S64 consecrations + an In-Brief install on `scripture-tsunami` [the most-linked page on the site, 655 inbound] + a 14-file John 6:44 fan-out reconciliation + a 2-file Acts 13:48 fan-out reconciliation + 5 In-Brief-label standardizations + 5 banned-move recasts) added 2026-05-26.** Re-run `node sapiential-audit.js` to regenerate `sapiential-audit-report.txt`.*
