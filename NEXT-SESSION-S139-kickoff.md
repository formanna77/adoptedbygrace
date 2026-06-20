# NEXT SESSION — S139 — THE DIAMOND PASS, batch 5 (Aaron's directive, 2026-06-19)

**THE DIRECTIVE (still in force).** *No new content until every existing page is a perfect diamond — "perfectly powerful prose, perfect arguments, perfect length, perfect wisdom, perfect resonance… every article should prove to the reader that this site is worthy of their time."* Build nothing new. Perfect what exists. Every lift is mostly SUBTRACTION. Verify-don't-blind-strip on every cut; preserve cohesion (rewrite whole passages, never fragment).

## THE UNIVERSAL FINDING — this is the bar (do NOT re-derive it)
Across S136–S138, ~30 fresh pages from a dozen registers have now been live-read, and the verdict is consistent: **the one real, scanner-invisible defect is the DOUBLED / TRIPLED / QUADRUPLED / QUINTUPLED CLOSE** — a page lands its catch, then re-lands the identical beat across a "what this means" section + a second catch + a stinger (and sometimes a Circular Return to the opener). **Almost every page carries it.** The fix is almost pure SUBTRACTION: collapse to ONE clean catch + ONE final tender landing. `audit-prose.js` cannot see this (its top is genre/exegesis sentence-length, NOT bloat — do NOT keep hammering canons-of-dort / tetagmenoi / lydias-heart / the-unbroken-chain / eulogy / cardiac expecting apex defects; they have none). **The live cold-read is the only bar.**

Two secondary catches the live read keeps surfacing in the CATCH arm — watch for both:
1. **Doctrinal slips that flatter the reader or make grace the sinner's possession** (S138 found 3: "not your achievement but your *grace*" → should be "rescue"; "you're not broken. You're not a fake" — self-esteem drift; "in some high proportion" — a hedge that lets the reader keep a sliver of autonomy). Harden these to the page's own thesis.
2. **Manufactured-scene openers** that invent the reader's moment (S138 found 1: the "kitchen floor / dark phone / refrigerator" tableau on devotional-the-prayer-you-didnt-pray). When present they are often the page's whole recurring SPINE (8 references), so the fix is a site-wide de-stage to a universal anchor ("that moment"), not just an opener swap. Banned per CLAUDE.md (the calibration case is the bedroom tableau).

Other recurring defects: editor-facing scaffolding in prose ("That sentence deserves a moment", "Here is where the argument turns tender"); reader-body coaching ("Notice what your body just did. You sat up", "the catch behind your sternum"); stacked adjectives/adverbs; verbatim-duplicated sentences across sections.

## CONTEXT — what S138 did (do NOT redo)
- **Batch 1 (12 pages, 6 locked + 6 unmarked, demolition/question/systematic/devotional/psychology/objection/OT): 11 lifted + 1 DIAMOND.** DIAMOND ship-as-is: **demolition-john15-2**. Lifted: demolition-1john2-2, question-am-i-chosen, systematic-atonement, devotional-drawn-not-dragged, psychology-anosognosia-of-sin, ot-jacob-esau, systematic-reprobation, psychology-suppressing-truth, objection-free-will, devotional-the-prayer-you-didnt-pray, question-what-is-the-gospel.
- **Batch 2 (4 pages, story/joy/broken/philosophy): all 4 lifted.** story-cross-examination, joy-security-changes-everything, broken-mirror-imposter-syndrome, philosophy-self-deception.
- All 15 lifts were SUBTRACTION + 3 doctrinal hardenings + 3 doctrinal-slip fixes. Pipeline GREEN; counts unchanged.

## READ FIRST (sections only — never an `*-ARCHIVE.md` whole)
`.claude/CLAUDE.md` → `MISSION-CONTROL.md` Session 138 (+ 137) → `VOICE.md` §I.2, §VI ("The Manufactured Crisis Scene", "Wordiness"), §VIII (closing protocol — ONE tender landing), §XV–XVII → `SAPIENTIAL-AUDIT.md` (tail).

## PRIORITY 0 — PRE-FLIGHT + STANDING SAMPLE-READ
1. `ls -1 *.html | wc -l` (**685** at S138 close) · `node sapiential-audit.js` (expect 609 prose / T1 0 / T2 156 / T3 453) · `node audit-prose.js` (note the ranking, but the top is genre length, not bloat) · `node validate-site.js` · `node canonical-conformance.js` · `node verify-scripture.js` (expect 0 "(NIV)"; DIVERGENT ~270).
2. **STANDING P0 SAMPLE-READ:** 5 pages, parallel READ-ONLY subagents (Read tool, macOS path), across registers, half locked + half unmarked. Rubric: doubled-close + landing-force + §XVI sapiential + opener-universality + wordiness + two-arms + tattooable + banned moves + **doctrinal-slip-in-the-catch**. Locks are NOT exemptions. Lead agent WRITES the apex fixes (never delegate the writing).

## PRIORITY 1 — CONTINUE THE COLD-READ MARCH (the real bar)
Dispatch batches of ~8–12 parallel READ-ONLY auditors returning DIAMOND vs NEEDS-LIFT + line-level quotes; the lead agent writes the apex fixes. The merged P0+P1 single-batch-of-12 model worked well in S138 — use it.

**S139 should sample the registers still thin or un-swept** (each big one has had only ~3–4 pages read so far): **history (24), theologian (18), compare (15), analytical (11), secular (14), ethics (12), printable (15), shattered (9), open (9), invisible (9), anxious (9), testimony (7), response (8), reformed (8), the-* (8)** — plus keep drawing from the big four still mostly unread: **question (78), demolition (55), devotional (41), systematic (37), psychology (30).** Pick a fresh spread each batch; half locked + half unmarked. Skip every page already read in S136–S138 (see those three logs). **~560 prose pages remain un-live-read = multi-session march.**

NOTE on genre: history/theologian pages risk a DRY/textbook opener and a biographical-drift middle more than a doubled close; analytical/secular risk over-selling a study or philosopher (verify the citation). Devotional "tonight"/evening voice and first-person author voice are SANCTIONED — do not flag them.

## NON-NEGOTIABLES
- **NO git, ever** (print the push command at close). **NO emojis on site pages.** NIV 2011 only; never append "(NIV)". Keep In Brief at 609/609.
- Write apex prose yourself; never delegate the writing. Preserve cohesion. After edits: banned-move grep + bare `<article class="article-body">` check + emoji scan + link-count sanity on heavily-cut pages.

## CLOSE
Full pipeline GREEN: `build-search-index` · `build-mega-menu` · `build-homepage-counts` · `auto-linker` (expect 0 modified — the blockquote guard holds) · `wire-orphans` → `validate-site` → `sapiential-audit` → `audit-prose` (v3+v4 must stay 0/685) → `canonical-conformance` → `verify-scripture`. Update `MISSION-CONTROL.md` (roll the oldest live entry — **S133** — to `MISSION-CONTROL-ARCHIVE.md` to keep ~6 live; use the in-place `cat >` block-move, NOT `mv` — the mount blocks `mv` over existing files). Write `NEXT-SESSION-S140-kickoff.md`. Print the push command.

**Counts at S138 close: 609 prose / 685 HTML. In Brief 609/609 (100%). Pipeline GREEN.**

**THE MEASURE.** Every doorway must leave the reader not merely persuaded but wiser — and prove, in its own prose, that this site is worth their time. A page that lands its catch four times has not earned more force; it has diluted the one landing it had. One catch. One tender landing. Perfect the diamonds.
