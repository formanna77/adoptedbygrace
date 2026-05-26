# S68 KICKOFF — paste this into the next session

NEXT SESSION — S68 — Sapiential Deepening Run, Leg 9 — TIER 2 DESCENT (21-40) + REGISTER LIFT + FAN-OUT CYCLE 2.

CONTEXT: S67 closed the Tier-2 top-20 (16 newly consecrated + 4 prior; the apex flagship corpus holds at §XVI). The session's most consequential discovery: a **single ESV slip on John 6:44 had propagated to 14 unique files** — body prose, anchor text, meta descriptions, og/twitter descriptions, JSON-LD. The per-verse fan-out check (Aaron's S66 prescription) caught it; 110 files now correctly render NIV 2011 "draws them." Acts 13:48 fixed on 2 files ("appointed to" → "appointed for"). The In-Brief on `scripture-tsunami` (most-linked page, 655 inbound) is finally installed — longest-standing flagship task closed. The S68 leverage rule is **descent + cycle 2**: descend Tier-2 21-40 with marker + sapiential read, open per-verse fan-out cycle 2 on the next-most-frequent verses, lift the deferred `psychology-groupthink` register, and run the In-Brief label standardization sweep site-wide.

READ FIRST: SAPIENTIAL-AUDIT.md §I (rubric) + §XIII (S67 log = your work order with the S68 rotation). Then VOICE.md §XVI and §XV. Then CLAUDE.md.

PRIORITY 0: run `node sapiential-audit.js`. Run the structural-rot pre-flight: `grep -lE "fonts.googleapis.com/css2" *.html` + article-tag balance scan. Run the widened ESV tell-tale grep on the S67 locks you plan to spot-check (`question-faithgift`, `question-where-did-your-faith-come-from`, `scripture-tsunami`, `question-depravity`).

THE WORK — Tier 2 descent + cycle 2 (pull and record verdicts in SAPIENTIAL-AUDIT.md §XIV):

21. `question-goldchain` (120 inbound, APEX)
22. `question-newheart` (109 in, APEX)
23. `theologian-augustine` (108 in, APEX)
24. `systematic-divine-decrees` (104 in, APEX)
25. `devotional-rescued-without-a-say` (101 in, APEX)
26. `question-john10` (95 in, APEX)
27. `psychology-cost-of-rejecting-grace` (93 in, APEX)
28. `systematic-atonement` (89 in, APEX)
29. `systematic-soteriology` (81 in, APEX)
30. `pastoral-assurance` (77 in, APEX)
31. `theologian-spurgeon` (77 in, APEX)
32. `psychology-autonomy-illusion` (75 in, APEX)
33. `theologian-calvin` (69 in, APEX)
34. `secular-philosophy-free-will` (66 in, APEX)
35. `theologian-edwards` (61 in, APEX)
36. `romans-9-deep-dive` (61 in, 6705w — the longest flagship)
37. `analogy-lazarus-grave` (56 in, APEX)
38. `systematic-pneumatology` (52 in, APEX)
39. `ot-jacob-esau` (51 in, APEX)
40. `systematic-effectual-calling` (51 in, APEX)

SPECIAL PRIORITIES:

(a) **Lift the register on `psychology-groupthink`** — deferred from S67. The page is empirically dense (Asch, Janis, social-proof, conformity research) with a strong catch-arm in Section 10, but the body lacks the sapiential mid-page lift the §XVI standard calls for. Candidate insertion: a single short paragraph in Section 1 between the empirical "you think this is thinking for yourself" punchline and the Section 2 mechanics — the wisdom-line should name **why** the consensus feels like freedom (because in fallen creatures, agreement with the tribe is reflexively mistaken for agreement with reality). The page has the apparatus; it needs the seeing-through that names what the reader has always felt but never had words for.

(b) **Per-verse fan-out cycle 2** — sweep these high-frequency verses for the same propagation defect John 6:44 carried: **John 6:37, John 6:65, John 10:28-29, Ephesians 1:11, Romans 9:15-18, Romans 9:21, 1 John 4:19, Titus 3:5.** Each appears on >5 pages. Use the same protocol: grep the NIV 2011 anchor text + the ESV variant + the KJV variant, then reconcile.

(c) **The In-Brief label site-wide sweep** — grep `<strong>(The Answer|The Truth|The Diagnosis|The Verdict):</strong>` inside `.tldr` blocks and standardize to "In Brief:" per CLAUDE.md. S67 fixed 5 flagship instances; site-wide there are likely more on Tier-3 pages. Expected fix count: 10-30 files.

(d) **Standing pre-flight** — structural-rot grep + article-tag imbalance scan at the START of the rotation. The 5-session pattern (one defect per rotation) held through S66; S67 broke the pattern (no structural defects) but the per-verse fan-out caught a different propagation class. The check stays standing.

NON-NEGOTIABLES:
- NIV 2011 only; zero `(NIV)` suffixes (class eliminated S66; keep it that way; only legitimate occurrence is `connections.html` line 836).
- §XV transparency on every quoted verse where the NIV under-translates the original.
- Widened ESV grep: `O God!` / `unformed substance` / `if I would count` / `uttermost parts` / `by the hearing of the ear` / `draws him` / `raise him up on the last day` / `appointed to eternal life`.
- Two-arms + In-Brief on every flagship.
- Write-over not Edit for substantive deepens; surgical Edit for one-line fixes.
- CONSECRATED S68 marker right after `<article class="article-body">`.
- Verify every `<a href>` on disk before writing it.
- Banned-move grep on every touched page: `\b[0-9] ?(am|pm)\b` / "tonight" / "reading this article" (with the page-native pastoral-framing carveout from S64/S66/S67 for anxious-mind + devotional-shame pages where the time-of-day IS the page's subject).
- Check article-tag balance on any page that feels structurally off.
- Floor 4 spines / stretch 5-6 per run. Pre-close context audit mandatory; >30K unused context at close = run failed.

Close with the build pipeline + `node validate-site.js` GREEN, update SAPIENTIAL-AUDIT.md (add §XIV), add a MISSION-CONTROL Session 68 entry, print the push command, write the S69 kickoff. Do not run git — Aaron pushes manually.
