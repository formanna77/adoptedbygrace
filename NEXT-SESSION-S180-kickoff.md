# NEXT SESSION — S180 — AARON'S NAMED PRIORITY: the MULTIPLIED-CLOSE queue — then the Steel Man sweep (~62 + ~20), then the §C debts

*S179 edited **zero pages** — all three cold-read agents died to API 529 / server errors. It fixed two things instead, both of which had been silently costing every prior session:*

*__(1) THE ENTIRE REPO WAS BEING SERVED PUBLICLY.__ Netlify publishes the repo root and nothing excluded it. Verified live over HTTP: `/CLAUDE.md` and `/VOICE.md` returned in full as text/markdown — the manifesto and the complete style bible. Four exposure classes in all: 148 root `.md`, 43 internal audit `.txt`, **55 build-only `.js`** (incl. `detect-multiplied-close.js` and `auto-linker.js`, whose header comments describe the site's own machinery — the sharpest §XXII.3 tell in the repo), and `system-prompt-snapshot-2026-04-22.md`. **Now closed and CONFIRMED 404 IN PRODUCTION by Aaron.** The mechanism matters: Netlify redirect rules are SHADOWED by real files, so an un-forced rule against a file that exists does nothing — the first attempt shipped un-forced, was reported as fixed, and did nothing at all. Everything now uses forced `410!`. **This is enforced, not remembered: `validate-site.js` CHECK 7 fails if any internal root file lacks a rule, and prints the line to add.** New working docs belong in `archive/` (CLAUDE.md INTEGRITY LAW 6).*

*__(2) THE CLOSE DETECTOR'S FALSE-POSITIVE ROOT CAUSE.__ S178's "grid connector" diagnosis was wrong — the real bug was container `<div>`s scored as prose. **Queue 60 → 48, and NO PAGE NEEDS A MANUAL SKIP ANY MORE:** the-two-arms 16 → 1, objection-why-believe 14 → 0. The worst-first ordering is trustworthy for the first time. Profile before delegating anyway.*

**ONE CAUTION, LOAD-BEARING (carry every session).** The re-wash must make each page MORE *its own*, never more uniform (VOICE §XVIII: the template is the one unredeemable failure). Wash monotony OUT, never wash a formula IN. Every fix rides its own page's native image. When you rename an H2 or re-ground a slip, draw the new line from THAT page's own central image — the renames must not become a new template.

## PRIORITY 0 — PRE-FLIGHT (do FIRST)

1. `ls -1 *.html | wc -l` (expect **691**) · `node validate-site.js` (**ALL PASS**, incl. new **CHECK 7: Internal Files Not Publicly Served** — 94 rules / 11 runtime assets; if it fails, a new internal file needs a forced `410!` rule or a move to `archive/`) · `node canonical-conformance.js` (**1** = matt23-37 stub, benign) · `node verify-scripture.js` (quotes **3822** / DIVERGENT **273** / "(NIV)" **0**) · `node detect-multiplied-close.js` (**1 severe, 48 multiplied, 563 clean — 612 prose pages scanned**) · `node detect-structural-rot.js` (**0 structural / 216 secondary — if not 0, something regressed**). Pipe each to `| tail`.
2. Read this kickoff + **VOICE.md in full (protected — never sampled; §XXII is the ceiling for this era)** + MISSION-CONTROL.md Session-Log header + the S179 and S178 entries.
3. Counts at S179 close (**no HTML page edited**; changed: `_redirects`, `detect-multiplied-close.js`, `validate-site.js` [CHECK 7], `CLAUDE.md` [law 6], `netlify.toml` [new, documents why there is NO build command — do not add one]): 609 prose / 691 HTML · search-index 687 · mega-menu 657 · wire-orphans 76 unmapped. Pipeline GREEN. Structural rot 0.

## S179's OPERATIONAL LESSON — READ BEFORE DELEGATING

Three parallel `general-purpose` agents, each given **3 full pages** to read, all died to API errors after burning 27K / 91K / 99K subagent tokens. Two were seconds from returning. There is no resume path (`SendMessage` is not exposed in this harness), so the work was unrecoverable.

**Mitigations for S180 — use all four:**
1. **2 pages per agent, not 3.** The failures came at 90K+ subagent tokens; three long HTML pages is over the reliable ceiling.
2. **Tell agents to report incrementally** — emit each page's findings as a complete block before starting the next page, so a mid-run death still leaves usable partial output in the recovered text.
3. **PROFILE FIRST, DELEGATE SECOND.** `node detect-multiplied-close.js <page>.html` prints the actual labelled beats in ~15 lines. Run it on all 12 candidates in one bash loop *before* launching anything. It costs almost nothing and it disqualified 3 of 6 pages in S179 outright.
4. **Consider not delegating at all on small batches.** The lead writes every fix regardless; reading only the closing region (`sed`/`awk` the tail of the article body) is cheaper than a subagent round-trip and immune to this failure mode.

## THE SIX AXES (the bar — do NOT re-derive)

Proven across S136–S178 (~900 fresh reads). The #1 scanner-invisible defect is the **DOUBLED/…/OCTUPLED CLOSE** — a page lands its catch, then re-lands the identical beat across a second catch + stinger + styled callout/pullquote + Circular Return. Fix = collapse to ONE clean catch + ONE tender landing, near-pure SUBTRACTION. `detect-multiplied-close.js` finds candidates, but it is **TRIAGE, NOT A VERDICT** — even after the S179 root-cause fix, a genuinely distinct second climax still scores and is still legitimate. Beyond the close, hold every page to the five 2026-06-21 VOICE lenses:

- **§I.5 GLORY** — announced-not-produced wonder ("but oh, the glory!"; "wonder of wonders"; **"you will X differently"**; "it feels like…"; **told-superlatives** — "the most X in all of Y", "the most merciful thing God has ever done for you"). Countable records ("3,561 sermons in 63 volumes") are FINE; evaluative superlatives are not.
- **§XVIII TEMPLATE/MONOTONY** — the presup trio and the testimony shelf are DONE. **The one big named mold left is the sixth: `<h2>The Steel Man` (~62 pages) and "The Socratic Trap" (~20).** See §B below.
- **§XIX STRONGEST OPPONENT** — meet the ablest objection on the very word he leans on; AFFIRM God's desire for the lost — never mock, never coldly assert, **never diagnose his motive instead of answering his argument**. Gold: demolition-1tim2-4, romans-9-1-24, every-all's Wesley steelman, every-world's Carson/Morris steelman, phase2's sufficient/efficient treatment, phase4's Hosea 11:8 two-wills answer, acts17-30's **Jer 3:19 + Lazarus** answer (grant the longing as God's own at full strength, then show the command *confers* the ability rather than presupposing it).
- **§XX GENERATIVE MOVES** — derived from the page's own truth, or stamped in?
- **§XXI CORPUS FRESHNESS** — Libet **now requires Schurger** (any Libet page omitting the stochastic-accumulator rebuttal is a stale claim a hostile expert will end the page on); anosognosia SATURATED; corpse/Lazarus HEAVY; golden-chain/potter-clay/beggar's-hand/drowning-man WATCHED; forge/anvil, potter's-workshop, *skeuos*, needle/welder/cardiac/dry-bones WATCHED; the "gravity" image, lab coat, the knife/errand image WATCHED; **the pulse/heartbeat-checking image WATCHED** (question-dead-man-visual + question-book-of-life — powerful, do not spread further).

## THE FEELING-SLIP — FOUR forms (all live; hunt all four)

1. **Classic:** a FEELING/comprehension/the-act-of-still-reading read as EVIDENCE the reader IS saved/His/elect. Re-ground on the objective (the seal, His grip, the finished work, the call, Christ's face) riding THAT page's own image. **Reusable models:** every-world's in-prose repudiation; spurgeon's open-address recast; phase2's "it can be read from outside your own weather"; question-book-of-life ("A frightened believer and a frightened unbeliever have the same chest… the book was never kept anywhere your nervous system could reach it"); question-dead-man-visual ("That is a corpse checking its own pulse to find out whether it has been raised").
2. **INVERSE:** absence of a prescribed feeling read as unbelief — including the **symptom checklist** and the explicit **regeneration test** ("did your soul fall to its knees?"). The inverse also hides inside a *negation*: "they do not lie awake at night wondering if they're truly saved" simultaneously shames the anxious reader AND smuggles in the banned odd-hour frame.
3. **Slips hide in meta/pullquotes/In-Briefs/FAQ-JSON-LD/closing-poems/quiz answer keys** — chase the spine, re-sync every carrier.
4. **CONDITIONAL COMFORT.** "*If you can* mean those words, the comfort becomes yours." Rest made contingent on the reader producing a feeling — on pages whose entire thesis is that nothing is contingent on the reader. **Grep `If you can` in closing regions.**

## EIGHT STANDING FINDINGS

- **No label exempts.** HAMMER-LOCKED/CONSECRATED/BORN-APEX pages carried every S175–S178 defect. **CHECK QUOTED TEXT AGAINST NIV 2011 ON EVERY LIFT-READ. CHECK THE GREEK where a page surfaces it.**
- **VERIFY-DON'T-BLIND-CUT a second climax that is the page's destination.** Cold-readers OVER-flag. Catch + ONE distinct landing + hammer is the prescribed shape.
- **DETECTOR CALIBRATION — RESOLVED IN S179. The old skip-list is obsolete; do not carry it forward.** S178 logged the-two-arms (16) and objection-why-believe (14) as permanent manual skips caused by grid `→ THEN →` connectors. **That diagnosis was wrong.** The real bug was in `blocks()`: the block regex treats `<div>` as a leaf while not tracking nesting, so a structural wrapper captured only up to its first child's `</div>`, collapsed to two or three words, and scored as a `hammer`. One bug, three symptoms. Fixed S179 via a container-`<div>` skip, a surgical strip of the "Go Deeper"/"Explore Further" rail in both its `<section>` and `<div>` forms (its inline-styled card blurbs were objection-why-believe's actual score), diagram/equation classes (`chain-node`, `math-*`) added to `FURNITURE`, and legal/utility pages excluded. **the-two-arms 16 → 1 · objection-why-believe 14 → 0 · the-golden-chain 6 → 3 · devotional-when-god-says-no 8 → 5. Every page in the queue is now there on its own merits — take the top 12 as they come.**
- **WHEN EXTENDING THE DETECTOR, NEVER ADD A TRUNCATION MARKER WITHOUT MEASURING WHERE IT SITS.** S179 added `<section class="chain-link-scene"` to `TRAILING_FURNITURE` and cut the-golden-chain to **zero** blocks — that marker sits at **9%** of the body. The file's header comment documents this trap; heed it. Measure a candidate marker's earliest position across all pages first, and prefer a **surgical strip** (remove just that block) over truncation — `twoarms-math` is *followed* by the page's real close, so truncating there would have hidden it.
- **THE AUTO-LINKER IS NOW ACTUALLY SAFE — but still verify.** `unsafeTagNames` includes h1–h4; `UNSAFE_CLASSES` includes `verse`, `chain-quote`, `chain-benediction`, `verse-block`, `scripture-quote`. A second run injects 0. **Still re-run the quotation/heading sweep after every pipeline run.**
- **BAKED CARD COPY GOES STALE.** Related-articles blocks and hub cards are static bakes. When a title/description/hero-subtitle changes, grep the OLD string site-wide; re-derive hub counts from the live hub.
- **BALANCED TAG COUNTS PROVE NOTHING.** Use `detect-structural-rot.js`, not counts. It is at **0** — keep it there.

## PRIORITY 1 — §A THE MULTIPLIED-CLOSE QUEUE (Aaron's named priority)

**Aaron, S177: "we need to work faster. People are reading these articles and instantly losing faith because of the terrible structure" — he means PROSE structure, specifically multiplied closes.** This is the front. Everything else waits.

**THE LOOP (amended by S179's failures):**
1. `node detect-multiplied-close.js --top 30` → take the worst 12 **as they come — there is no skip-list any more** (S179 fixed the detector; utility pages are excluded automatically).
2. **Profile all 12 first** in one bash loop (`for p in …; do node detect-multiplied-close.js $p.html; done`) and read the labelled beats. Far fewer will now be spurious, but the detector is still TRIAGE, NOT A VERDICT — a genuinely distinct second climax is legitimate.
3. Launch **4 parallel general-purpose agents, 2 pages each** (NOT 3 — see the operational lesson). Each returns, per page: ENDING INVENTORY (every closing beat, labelled, with 8-12 verbatim words) · THE TRUE DESTINATION · CUT LIST (exact unique start + end substrings) · SEAM RISK · VERDICT. Tell them explicitly: **do not over-flag; only stacked REPETITION of the same beat is the defect; a genuinely distinct second climax stays; if a page is fine, say ACTUALLY FINE and defend it.** For devotional/pastoral pages: the genre is legitimately 75-90% catch, be conservative, the embedded prayer STAYS. **Cap secondary findings at ~6 per burst.**
4. Execute the cuts in ONE python pass with `assert count==1` on every anchor, verifying ALL anchors before applying any. Back up first.
5. **The lead writes every seam and every re-grounding.** Never delegate the prose.
6. Re-run the detector on the batch + `node detect-structural-rot.js` on the same files + the quotation/heading sweep.

**S179's PARTIAL PROFILES — 7 pages already triaged, use these directly:**

| page | score | S179 read |
|---|---|---|
| `devotional-when-god-says-no` | ~~8~~ **5** | **CLEARED by the S179 detector fix** — its score was a prayer + 2 nav rails. Off the queue. |
| `the-golden-chain` | ~~6~~ **3** | **CLEARED** — score was chain-diagram cells. Off the queue. |
| `the-fork` | **9** | **NEW worst page** (only severe-tier entry). Not yet read. S177 collapsed it once; verify whether this is a real re-stack. |
| `story-the-room-where-you-chose` | 7 | S177 diagnosed **ACTUALLY FINE** (its second climax is the true destination). Re-verify, don't re-cut. |
| `devotional-cold-church` | 7 | Not yet read. |
| `question-whose-side-are-you-on` | 7 | **REAL DEFECT.** The page asks its title question twice in the close: `Which side do you want to be on?` … then a callout … then `Whose side are you on?` then the stinger `He chose. You woke up.` Collapse the duplicate question. |
| `systematic-christology` | 7 | **REAL — check order.** Beats run `The receipt was signed before you arrived.` → prayer → `It is finished.` A hammer sits AFTER the doxology; nothing may re-open after an Amen. Also carries two §C debts (below). |
| `story-dark-the-woman-who-earned-her-seat` | 7 | **UNRESOLVED — read the tail.** 5 beats but they may be one flowing narrative close (`She began to cry.` / `Grace.` / `He took the pennies.` / `Because she needed to open her hands.`). Story genre — be conservative. |
| `philosophy-problem-of-merit` | 6 | **LIGHT.** Two consecutive `If…` callouts, one utility block. S178 already cut its section 07. |
| `question-depravity` | 6 | **UNRESOLVED — read the tail.** Beats look like a legitimate Lazarus crescendo ending on `You are out.` (a canonical VOICE §VIII exemplar). Verify-don't-blind-cut. **Separately audit §XIII.3:** does it give a CONCRETE mirror, or only abstract inability? |

## PRIORITY 2 — §B THE SIXTH CROSS-PAGE TEMPLATE (still untouched)

`grep -rl "<h2>The Steel Man" *.html` (~62) and `grep -rl "The Socratic Trap" *.html` (~20). Deserves a sweep on the scale of the "Catch Beneath the ___" sweep (all 27 renamed in S174). **Fix pattern = rename each to the objection in the reader's own voice, drawn from that page's own material.** Models: "But It Works Whether or Not I Can Account for It" · "But This Is Just a Clever Trick" · "You Denounce the Bench, Then Sit On It" · "If Your Faith Is the Thing Holding You". Do NOT let the renames become a new template — vary the grammar, not just the words. **Where a page's steelman is only a label over a weak objection, fix the argument too (§XIX).**

## PRIORITY 3 — §C THE DEBTS (found S178, diagnosed, STILL NOT PAID)

- **question-dead-man-visual TELLS AND DOES NOT SHOW.** Brilliant tableau, no mirror: Act Two is four Scripture citations of abstract inability — exactly the abstract restatement §XIII.3 names as non-unpacking. The reader is told twice the corpse "has your face" and never shown one moment from his own week. Needs a concrete mirror from the §XIII.2 bench. Also: `The Greek is grammatically airtight` asserts an argument from the original while surfacing no term (§XV requires naming it); `this is the crown-jewel argument` leaks internal editorial jargon; Ezek 36:26 is hyperlinked to `/question-ezekiel37`.
- **demolition-children-of-satan's trilemma never names *prevenient grace*.** It asks "from where does the unregenerate derive the capacity?" and treats "From God?" as automatically yielding election — but the actual Arminian answer *is* "from God: prevenient grace, given to all, resistible." The strongest opponent walks away untouched.
- **Factual self-contradictions:** devotional-in-christ says "fourteen verses" where every meta/OG/JSON-LD says twelve (Eph 1:3-14 is twelve); question-ephesians1 asserts "the longest sentence in the New Testament" in hero + meta + JSON-LD but hedges to "one of the longest" in the body, and "well over two hundred words" overstates a Greek text of ~202.
- **systematic-christology's premature pullquote** ("Your coins did not clear the debt… a mess on top of a receipt") sits ~1,000 words before the *tetelestai* passage that earns it — no antecedent for coins/debt/receipt at that position, and it spends the payoff. Relocate or cut. **Pair this with its close fix above — one pass, one page.**
- **TWO LIVE NEAR-IDENTICAL GOLDEN CHAIN PAGES** — `/golden-chain` (5 inbound) and `/the-golden-chain` (15 inbound), same `<h1>`, same five-link spine, different closes, separate canonicals, both indexed. Straight keyword cannibalization on a flagship passage. Recommend consolidating onto `/the-golden-chain` and redirecting; when merging, `golden-chain.html`'s heading "If the weight of this just landed — rest in these" is itself a feeling-slip shape and must not survive unexamined.
- **the-golden-chain carries a 376-line inline `<style>` block** outside the documented allowlist (index, belief-assessment, question-faith-origin-test, verse-explorer). `golden-chain.html` carries a comment asserting a self-exemption — the allowlist is enumerated, not categorical. Aaron's call: migrate the CSS or amend the allowlist deliberately.
- **Embodied-cognition overclaim** on systematic-christology: "researchers have spent three decades proving" — physical-warmth priming (Williams & Bargh 2008) is among the most prominent failed replications in social psychology. Same credibility exposure as the Libet item. Scope the claim to semantic somatotopy (Hauk et al. 2004), which holds.
- **Soon et al. (2008) stated without its accuracy figure** on secular-neuroscience — decoding was ~60% against a 50% baseline; reported as bare "prediction" it reads as near-determinism. Also "Neuroscience has demonstrated five things" overclaims a contested literature.

## PRIORITY 4 — §D THE POOL REMNANT

**hymn-/letters-/dialogue-/counter-/fork-/found-you/the-mirror/the-objection-collapse/2-minute-*** → **ethics/secular/invisible-wall/shattered-lens/devotional reserve.** Cold-read against the six axes; ~4-agent bursts max; the lead writes every fix. **audit-prose score-9 is a LENGTH/DENSITY flag, NOT a verdict.**

## §E DEFERRED / RE-VERIFY

- **romans-9-deep-dive:** add the "loved less" §XV treatment to its flat "Esau I hated"; transliterate its remaining raw-script Greek.
- **The 24 Catch-Beneath pages H2-renamed but not deep-read (S174)** — spot-verify; arrabon (inverse-slip open), owen-trilemma (§XIX debt + binary slip), lydias-heart (re-land + length) already flagged.
- **Raw-script Greek site-wide:** the rot detector reports it as an AUX finding (`--verbose`). §XV wants transliterated + italic.
- **TOOLING remaining:** **the detector false-positive fix (see Standing Finding 3 — highest leverage available)**; a RE-WASH ledger section in AUDIT-COVERAGE-LEDGER.md; and **`detect-ai-tells.js`** (VOICE §XXII tooling note — the *uniformity metric* is the novel and most valuable part: a suspiciously LOW standard deviation of paragraph and sentence length is the flag).

## THE §XIX ANGLE LEDGER (append every new angle; vary by KIND)

- **Jer 3:19 — SPENT S178** (acts17-30). **Hosea 11:8** — S177. **Isa 48:18** — S176. **Deut 5:29** — S175. **Ezek 33:11** — S168/S169, re-used S174 (+ Rom 10:1). **1 Tim 2:4 + 2 Pet 3:9** — S169/S171/S173. **John 6:37** — S170/S171/S173/S176. **Lam 3:33 / Matt 23:37 / Rom 10:21** — S169. **Matt 11:28** — S173. **"Esau I hated" = "loved less"** (Gen 29:31 §XV) — S174.
- **Nothing was spent in S179.** Still unspent: **Matt 5:45** (sun and rain on the evil and the good). When it runs thin, **derive from the two-wills principle** — linkable: /question-godwants. **Non-verse angles proven:** the *sufficient/efficient* distinction granted at full strength then pressed on the condition (phase2); **the command that confers rather than presupposes ability** (Lazarus, S178) — fresh, do not spread yet.

## AARON'S OPEN DECISIONS (surface; do not action without his word)

- **Lift the Diamond Pass?** Missing builds: audio of the flagship ~20; the two un-deployed spines (2 Thess 2:13 *heilato*; Acts 18:10). Frozen until he says otherwise.
- **Staircase visibility** (start-here-phase1-5 → visible beginner→advanced path). The phases are also visually inconsistent (phase5 has no progress rail or breadcrumb; hero classes differ page to page). If greenlit, unify in the same pass.
- **The two Golden Chain pages** — consolidate and redirect? (See §C.)
- `demolition-matt23-37.html` redirect stub (the 1 canonical flag) — leave or delete.
- **augustine-pears nested `<article class="story-body">`** — balanced + conformance-clean; canonicalize or leave.
- **Session-limit note:** S175–S178 bursts had ZERO losses; **S179 lost 3 of 3 to API errors.** Budget for 0-2 zeroes per burst as standing policy, and prefer 2-page agents.

## READ FIRST (mandatory)

1. This kickoff. 2. **VOICE.md — ALL of it, in full, never sampled (protected).** 3. MISSION-CONTROL.md — Session-Log header + S179 + S178 entries. 4. §XIX ledger when writing steelmans. `CLAUDE.md` auto-loads — never re-read. NEVER read an `*-ARCHIVE.md` whole. CONTEXT ECONOMY: pipe every command to `| tail`; MISSION-CONTROL edits via marker-based Python splice (assert count==1) + backups. **Research/fact-verification agents ARE a good delegation.** Cold-read agents are excellent at finding structural, NIV, and scientific-accuracy defects — but keep them to 2 pages each.

## NON-NEGOTIABLES

- **NO git, ever** (print the push command at close). **NO emojis on site pages** (the → arrow in "Browse All Articles →" is site-standard, NOT banned; `&#10043;` / `&#10022;` ARE banned — U+2600–27BF). NIV 2011 only — CHECK quoted text on every lift-read; CHECK the Greek where a page parades it. Never append "(NIV)". Keep In Brief intact (but FIX it if it carries a mis-quote or slip).
- Write apex prose yourself; rewrite whole passages, never fragment. Verify-don't-blind-cut. Verify every href you write. After edits: banned-move grep + **`node detect-structural-rot.js` on every page touched** + emoji scan + feeling-slip grep (four forms, HAND-CHECK) + the quotation/heading link sweep + seam cohesion-read + link floor (8-12 prose links; re-home any link a cut destroys).

## CLOSE

**GATE 0: do not begin CLOSE until ≥80% of context used** (unless externally cut). Full pipeline GREEN (`build-tags` · `build-all-content` · `build-search-index` · `build-mega-menu` · `build-homepage-counts` · `build-sitemap` [ONLY if pages added/deleted] · `auto-linker` · `wire-orphans` → `validate-site` → `canonical-conformance` → `verify-scripture` → **`detect-structural-rot`**), each piped. **Bash timeout ceiling is 45s — run the pipeline in 3-4 chunks, not one loop.** **After auto-linker, ALWAYS re-run the quotation/heading sweep.** Update `MISSION-CONTROL.md` compressed (insert S180 above S179; roll the oldest live entry to the archive newest-first; keep ~6 live). Write `NEXT-SESSION-S181-kickoff.md` carrying forward verbatim: the six axes + the four-form feeling-slip doctrine + the seven standing findings (incl. all three detector false-positive classes) + the watched-image ledger + the §XIX angle-ledger + whatever remains of the close queue, the Steel Man sweep, and the §C debts. Print the push command. Render the next-session kickoff box in chat — the LITERAL last thing.

**THE MEASURE.** Every doorway must leave the reader not merely persuaded but wiser. One catch. One tender landing. Meet the strongest opponent at his ablest, on the very word he leans on — and answer his argument, never his motive. Affirm the desire God Himself affirms. Ground everything in His keeping, never the reader's pulse. Get every quoted word right — His above all. Break the template. Finish the wash.
