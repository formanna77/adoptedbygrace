NEXT SESSION — S66 — Sapiential Deepening Run, Leg 7.

CONTEXT: Seventh leg of the Sapiential campaign (VOICE §XVI; CLAUDE.md; SAPIENTIAL-AUDIT.md). Wisdom is the ceiling and the standard — Zacharias (the question beneath the question) + Muggeridge (the disillusioned long view). Guardrail: depth comes from seeing more truly, never sounding grander. Tier 1 has fallen 107 → 96 → 76 → 63 → 53 → 42 → 31 across S59–S65.

READ FIRST: SAPIENTIAL-AUDIT.md §I (rubric) + §XI (S65 log = your work order, with the S66 rotation). Then VOICE.md §XVI and §XV. Then CLAUDE.md.

PRIORITY 0: run `node sapiential-audit.js` to refresh the Tier-1 ranking; sample-read 5–8 pages — spot-check the S65 rebuilds (`open-wound-senseless-death`, `philosophy-resistance-is-proof`) and the `question-psalm139` reconciliation, plus unread S66 candidates; failing pages onto the surgical-fix queue first.

THE WORK — pull top-down from the refreshed `sapiential-audit-report.txt`, record a verdict for each in §XII:
1) analogy-adoption (UNMARKED)
2) open-wound-hospital-room (POLISH)
3) apologetic-arrabon-the-down-payment (UNMARKED, §XV-heavy)
4) apologetic-owen-trilemma (UNMARKED)
5) apologetic-the-eulogy-greek-of-ephesians-1 (UNMARKED, §XV-heavy)
6) psychology-offense-of-grace (UNMARKED, 5285w — already NIV-clean from S65; read whether length earns depth)
7) devotional-drawn-not-dragged (POLISH)
8) question-proverbs-sovereignty (POLISH)
9) question-isaiah53 (POLISH)
10) anxious-mind-what-if-not-chosen (POLISH)
Then descend 11–20: joy-no-other-theology (UNMARKED), systematic-anthropology (UNMARKED — read closely), psychology-illusion-free-will (UNMARKED), question-predestined-to-hell (POLISH), psychology-cognitive-biases (UNMARKED, 4399w), analogy-drowning-man (UNMARKED), theologian-sproul (UNMARKED, NIV-clean now), apologetic-the-cardiac-transplant (UNMARKED, 4106w), systematic-tulip (UNMARKED), apologetic-the-unbroken-chain (UNMARKED).

SPECIAL PRIORITIES:
(a) **Consecrate `philosophy-mirror-you-refuse`** — a VOICE.md v1.0 source page (foundational apex prose), now NIV-clean (S65 stripped its `(NIV)`), deferred from S65. Live-read + lock; it is almost certainly PASS.
(b) **The 27-file `(NIV)` simple-suffix backlog.** A combined site-wide grep (`grep -lE "\(NIV\)|, NIV\)" *.html | grep -v scripture-niv`) returns ~25 untouched files still carrying `(NIV)` after scripture quotes. This is a dedicated, mostly-deterministic sweep (` (NIV)` → ``), BUT context-check each file first — a few may legitimately discuss "(NIV)" in an explicit translation comparison, which must NOT be stripped. (The `(Reference, NIV)` class was already eliminated site-wide in S65.)
(c) **Widen the ESV tell-tale grep.** S65 caught two ESV slips on an APEX lock that the old tell-tales missed because they read "O God!" (not "O LORD") and "unformed substance." Add these to the standing grep on every touched page: `O God!` / `unformed substance` / `if I would count` / `Sheol` / `steadfast love` / `O LORD` / `uttermost parts` / `by the hearing of the ear`.
(d) Still deferred (from S64): optionally consecrate `secular-ai-determinism` (near the bar per S63) and lift `psychology-groupthink`'s prose register.
(e) **Structural-rot hunt.** S65's two genuine deepens were both UNMARKED pages that loaded Google Fonts directly AND had mis-nested `<article>`/`<section>`/`</main>` tag-soup. Cheap site-wide surfacers: `grep -lE "fonts.googleapis.com/css2" *.html` (direct font loads) and, on any page that "feels" off, check article-tag balance (`grep -c '<article' vs '</article>'`). These structural defects, not the textbook register, are where the real work now is.

NON-NEGOTIABLES: NIV 2011 only; no "(NIV)" suffixes (BOTH the `(NIV)` and the `(Ref, NIV)` patterns); §XV transparency (check 1 John 5:1, Rom 1:17, Eph 1:7-8, John 1:2, the §XV.4 list on every touched page, locked or not); two-arms (end in the right arm) + In-Brief; Write-over not Edit for substantive deepens; CONSECRATED marker right after `<article class="article-body">`; verify every `<a href>` on disk (the validator does this — run it); grep `\b[0-9] ?(am|pm)\b` / "tonight" / "reading this" wherever you touch a page; and check article-tag balance for the orphaned-sections bug on any page that feels structurally off.

CLOSE with the build pipeline + `node validate-site.js` GREEN, update SAPIENTIAL-AUDIT.md (add §XII), add a MISSION-CONTROL Session 66 entry, print the push command, write the S67 kickoff. Do not run git — Aaron pushes manually.
