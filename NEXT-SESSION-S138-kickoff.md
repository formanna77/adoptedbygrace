# NEXT SESSION — S138 — THE DIAMOND PASS, batch 4 (Aaron's directive, 2026-06-19)

**THE DIRECTIVE (still in force).** *No new content until every existing page is a perfect diamond — "perfectly powerful prose, perfect arguments, perfect length, perfect wisdom, perfect resonance… every article should prove to the reader that this site is worthy of their time."* Build nothing new. Perfect what exists. Every lift is mostly SUBTRACTION (doubled closes, circular restatement, editor-facing scaffolding, manufactured-scene openers). Verify-don't-blind-strip on every cut.

## CONTEXT — what S137 did (do NOT redo)
- **P0 sample-read (5 pages):** demolition-matt11-28, devotional-love-before-the-world, objection-robots, story-the-orphanage all DIAMOND; **psychology-backfire-effect lifted** (cut a tripled "trust the Spirit / fortress" close; added the reader's-own-past-backfire mirror — "the fortress fell because the King walked in"; hammer "Every brick is a confession of the chains"; softened the oversold "shocked the academic world" claim the page later walks back). One-word grammar fix on devotional-love-before-the-world.
- **P1A — the "Five-Point Proliferation" template fault is CLOSED (do NOT re-hunt it).** The editor-facing `<h2>The Diamond from Yet Another Facet</h2>` catalog was cut from all 8 carrier pages; the 5 two-paragraph carriers had their multiplied close (catalog + "What X Means for the Believer Tonight" + "The Catch Beneath the…") collapsed to one catch + one bold button; the 6 mention-only pages were de-labeled. **`grep -rl "Five-Point Proliferation" *.html` and `grep -rl "Diamond from Yet Another Facet" *.html` both return 0.** All 8 carriers still hold 14–59 in-body prose links.
- **P1B — 8-page register cold-read:** question-repentance-total-depravity, systematic-glorification, philosophy-i-found-jesus-t-shirt, history-luther, ethics-power-authority, analogy-doctor-corpse, compare-predestination-foreknowledge all DIAMOND; **secular-ai-determinism lifted** (universalized the ChatGPT opener; hardened God-as-predictor → "He is not the forecaster of your will. He is its Maker"; concrete depravity mirror; cut a doubled parable close).
- **DURABLE FIX done at the root:** `blockquote` was added to `auto-linker.js`'s `unsafeTagNames`. Auto-linker can no longer inject links into ANY verse quote site-wide. The question-is-it-too-late re-injection hazard is permanently solved (the post-auto-linker blockquote re-check is now belt-and-suspenders, not load-bearing).

## CARRY-FORWARD KEY FINDING (from S136, still true)
`audit-prose.js`'s most-broken ranking is topped by **confessional-translation / Greek-exegesis pages whose long sentences are FAITHFUL renderings, not bloat** (canons-of-dort-plain-english 28, tetagmenoi, lydias-heart, not-because-but-because, the-unbroken-chain, eulogy, cardiac). **Do NOT keep hammering these expecting apex-prose defects — they have none.** The scanner cannot see the real defects (doubled closes, sapiential gaps); the **live cold-read is the standard.**

## READ FIRST (sections only — never an `*-ARCHIVE.md` whole)
`.claude/CLAUDE.md` → `MISSION-CONTROL.md` Session 137 (+ 136) → `VOICE.md` §I.2, §VI, §XV–XVII → `SAPIENTIAL-AUDIT.md` (tail).

## PRIORITY 0 — PRE-FLIGHT + STANDING SAMPLE-READ
1. `ls -1 *.html | wc -l` (**685** at S137 close) · `node sapiential-audit.js` (expect T1 0 / 609 prose) · `node audit-prose.js` (note ranking — but the top is genre length, not bloat; see above) · `node validate-site.js` · `node canonical-conformance.js` · `node verify-scripture.js` (expect 0 "(NIV)").
2. **STANDING P0 SAMPLE-READ:** 5 pages, parallel READ-ONLY subagents (Read tool, macOS path), across registers, half locked + half unmarked. Rubric: landing-force + §XVI sapiential + opener-universality + wordiness + two-arms + tattooable line + banned moves. **Locks are NOT exemptions.** Fix what it flags first; lead agent writes the apex fixes.

## PRIORITY 1 — CONTINUE THE COLD-READ MARCH DOWN THE REGISTERS (the real bar)
Batches of ~8–12 parallel READ-ONLY auditors returning DIAMOND vs NEEDS-LIFT + line-level quotes; the lead agent WRITES the apex fixes (never delegate the writing). **~575 prose pages remain un-live-read this campaign = multi-session march.** Registers sampled so far carry one page each (apologetic heavily); **S138 should sample the big un-swept registers**: demolition (~55), question (~78), systematic (~37), devotional (~41), psychology (~30), plus the smaller ones not yet touched (ot, printable, shattered, open, invisible, anxious, joy, broken, testimony, response, reformed, analytical, secular, objection). Pick a fresh spread each batch; half locked + half unmarked.

The recurring real defects the live read keeps surfacing (watch for them): **(a) doubled/tripled closes** (a "what this means" section + a "catch" section + a stinger landing the same beat); **(b) doctrinal softness** where a page argues less than its own thesis (e.g. God reduced to foreknower when the page's logic makes Him the author); **(c) non-universal / manufactured openers**; **(d) editor-facing scaffolding** in reader-visible prose. Collapse, harden, universalize, strip.

## OPTIONAL FUTURE LEG (Aaron's call)
Many pages carry **pre-existing `<a>` links inside `<blockquote>` verse quotes** (predating S137's guard, which only stops NEW injection). If Aaron wants verse quotes link-free, a site-wide strip of links-inside-blockquotes is a clean, scriptable Diamond-Pass leg. Not started — flagged only.

## HOUSEKEEPING
A `.s137-bak/` scratch dir was created S137 and is **mount-locked against deletion** (EPERM in the sandbox). It is gitignored (`.gitignore` now lists `.s137-bak/` and `*-bak/`), so it will NOT deploy. If your environment can delete it, do so; otherwise leave it — it is harmless. **Do not create backup dirs inside the repo; use the sandbox `/tmp` instead.**

## NON-NEGOTIABLES
- **NO git, ever** (print the push command at close). **NO emojis on site pages.** NIV 2011 only; never append "(NIV)". Keep In Brief at 609/609.
- Write apex prose yourself; never delegate the writing. Preserve cohesion — rewrite whole passages, don't fragment. After edits: banned-move grep + bare `<article class="article-body">` check.

## CLOSE
Full pipeline GREEN: `build-search-index` · `build-mega-menu` · `build-homepage-counts` · `auto-linker` · `wire-orphans` → `validate-site` → `sapiential-audit` → `audit-prose` → `canonical-conformance` → `verify-scripture`. Update `MISSION-CONTROL.md` (roll the oldest live entry — S132 — to `MISSION-CONTROL-ARCHIVE.md` to keep ~6 live). Write `NEXT-SESSION-S139-kickoff.md`. Print the push command.

**Counts at S137 close: 609 prose / 685 HTML. In Brief 609/609 (100%). Pipeline GREEN.**

**THE MEASURE.** Every doorway must leave the reader not merely persuaded but wiser — and prove, in its own prose, that this site is worth their time. A page that scans clean but reads merely good is the failure state. Perfect the diamonds.
