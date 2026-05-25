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

*Generated S59, 2026-05-24. Triage verdicts (8 pages) added S59. S60 execution log (§VI, 11 pages) added 2026-05-24. S61 execution log (§VII, 19 pages — the full pages-12–30 rotation) added 2026-05-24/25. S62 execution log (§VIII, 13 pages + 1 §XV fix) added 2026-05-25. S63 execution log (§IX, 10 rotation consecrations + 1 legacy-catalog rebuild [`theologian-bunyan`] + 2 structural short-repairs) added 2026-05-25. S64 execution log (§X, 12 consecrations + 3 §XV fixes on locks [`question-psalm139`, `scripture-tsunami`, `open-wound-senseless-death`] + 2 structural repairs [`question-ezekiel37`, `invisible-wall-friend-who-left`]) added 2026-05-25. Re-run `node sapiential-audit.js` to regenerate `sapiential-audit-report.txt`.*
