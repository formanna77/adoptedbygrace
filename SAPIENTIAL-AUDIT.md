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

*Generated S59, 2026-05-24. Triage verdicts (8 pages) added S59. S60 execution log (§VI, 11 pages) added 2026-05-24. S61 execution log (§VII, 19 pages — the full pages-12–30 rotation) added 2026-05-24/25. Re-run `node sapiential-audit.js` to regenerate `sapiential-audit-report.txt`.*
