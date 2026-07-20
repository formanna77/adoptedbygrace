# S68 KICKOFF — paste this into the next session

NEXT SESSION — S68 — Sapiential Deepening Run, Leg 9 — **TIER-3 INVENTORY PASS** + TIER 2 DESCENT (21-40) + REGISTER LIFT + FAN-OUT CYCLE 2.

CONTEXT: S67 closed the Tier-2 top-20 (16 newly consecrated + 4 prior; the apex flagship corpus holds at §XVI). The session's most consequential discovery: a **single ESV slip on John 6:44 had propagated to 14 unique files** — body prose, anchor text, meta descriptions, og/twitter descriptions, JSON-LD. The per-verse fan-out check (Aaron's S66 prescription) caught it; 110 files now correctly render NIV 2011 "draws them." Acts 13:48 fixed on 2 files ("appointed to" → "appointed for"). The In-Brief on `scripture-tsunami` (most-linked page, 655 inbound) is finally installed — longest-standing flagship task closed.

**THE NEW FRAMING (Aaron, S67 close):** The campaign's finish-line is not "the high-leverage flagships" — it is **every prose page a reader can land on, re-read against §XVI and either lifted to the bar or confirmed at it.** Leverage-pruning the long tail would close the campaign operationally and compromise the standard theologically — the Spirit can drop someone on a 56-inbound page at 2 a.m. as easily as on the most-linked one; if it sags, the standard sagged. The S68 leverage rule therefore changes: **before descending Tier 2, run a one-time TIER-3 INVENTORY PASS** to discover the real work-remaining (separating "born-apex, no marker" from "actually needs deepening" from "structural-not-prose, exempt"). That pass turns the abstract 431-page tail into a real, prioritized queue, and almost certainly collapses the true number to 200-250.

READ FIRST: SAPIENTIAL-AUDIT.md §I (rubric) + §XIII (S67 log = your work order with the S68 rotation). Then VOICE.md §XVI and §XV. Then CLAUDE.md.

PRIORITY 0: run `node sapiential-audit.js`. Run the structural-rot pre-flight: `grep -lE "fonts.googleapis.com/css2" *.html` + article-tag balance scan. Run the widened ESV tell-tale grep on the S67 locks you plan to spot-check (`question-faithgift`, `question-where-did-your-faith-come-from`, `scripture-tsunami`, `question-depravity`).

---

## PRIORITY 1 — THE TIER-3 INVENTORY PASS (new, must run first)

**Why this exists.** The CONSECRATED-marker grep currently counts 177 pages, but a large fraction of the 431 Tier-3 pages were *born* CONSECRATED + HAMMER-LOCKED in the Phase G / Phase D builds across S43-S58 (the apologetic-* series, the ethics-* cluster, the presuppositional-* set, several systematic-* anchors, the reformed-apologetics-* set). They were written to the apex bar at birth, but the build process did not all install the explicit `<!-- CONSECRATED -->` HTML comment, so the marker-grep undercounts. The current 405-remaining estimate is therefore inflated. The inventory pass discovers the real number.

**Build a small node script** (`tier3-inventory.js`) that does this:

1. Read `sapiential-audit-report.txt` (regenerate first via `node sapiential-audit.js`). Take the Tier-3 list (431 pages).
2. For each Tier-3 page, classify into one of four buckets:
   - **BUCKET A — STRUCTURAL-EXEMPT** (not a prose doorway, no sapiential bar): `printable-*`, `*-hub.html` that uses `.hub-grid` not `<article class="article-body">`, `objection-builder`, `testimony-wall`, `verse-navigator`, `verse-explorer`, `belief-assessment`, `question-faith-origin-test`, `404`, `about`, `contact`, `support`, `connections`, `sitemap`, `all-content`, `search`, `topics`, `quotes`, `start-here` (the staircase hubs, not the phase pages). Heuristic: page lacks `<article class="article-body">` OR is in an explicit allowlist.
   - **BUCKET B — BORN-APEX, NEEDS MARKER ONLY**: page has `<article class="article-body">`, has an In-Brief (`.tldr` block), has length ≥ 1200 words, has at least one §XV transliterated Greek/Hebrew word in italics OR was created in S43-S58 (file mtime check OR filename match against the Phase G / Phase D build list — `apologetic-*`, `ethics-*`, `presuppositional-*`, `reformed-apologetics-*`, several named systematic pages). Heuristic: passes a 5-signal apex sniff test on automated metrics alone.
   - **BUCKET C — GENUINELY NEEDS DEEPENING**: prose article, not BUCKET A or B. The real S69+ work queue.
   - **BUCKET D — UNCERTAIN / NEEDS LIVE-READ**: passes some apex signals but not all (e.g., has In-Brief but short; long but no §XV). Spot-read these in S68; reassign to B or C.

3. Output `tier3-inventory.txt` with the four buckets listed, counts, and per-page reason codes.

4. **For BUCKET B**: install the CONSECRATED marker via a batch python pass (right after `<article class="article-body">`, same pattern as S67). These are closed for the campaign.

5. **For BUCKET A**: write to `tier3-structural-exempt.md` as an explicit, audited list. Once written, these are documented as out-of-scope for §XVI and no future session has to re-investigate them.

6. **For BUCKET C + D**: write to `SAPIENTIAL-AUDIT.md` as the standing §XIV "true Tier-3 work queue" — the actual remaining campaign surface, prioritized by inbound count.

**Expected outcome:** the 431 Tier-3 number splits into something like 80-120 BUCKET A (structural-exempt, documented), 150-200 BUCKET B (born-apex, marker installed in this pass), 100-150 BUCKET C+D (the real remaining work). The true finish-line for "every prose doorway carries the undeniable force" becomes visible.

**Time-box:** the inventory pass should be ~1/3 of the S68 budget. The script writing + run + batch-marker pass should not exceed 30-40% of the context budget. The remaining 60-70% goes to Tier-2 descent + special priorities below.

---

## PRIORITY 2 — TIER 2 DESCENT (21-40)

Pull and record verdicts in SAPIENTIAL-AUDIT.md §XIV. These are all APEX-flagged by the audit script; expect most to need marker + light spot-check only, with isolated banned-move recasts.

21. `question-goldchain` (120 inbound)
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

---

## SPECIAL PRIORITIES (after Priority 1 + as time allows)

(a) **Lift the register on `psychology-groupthink`** — deferred from S67. The page is empirically dense (Asch, Janis, social-proof, conformity research) with a strong catch-arm in Section 10, but the body lacks the sapiential mid-page lift the §XVI standard calls for. Candidate insertion: a single short paragraph in Section 1 between the empirical "you think this is thinking for yourself" punchline and the Section 2 mechanics — the wisdom-line should name **why** the consensus feels like freedom (because in fallen creatures, agreement with the tribe is reflexively mistaken for agreement with reality). The page has the apparatus; it needs the seeing-through that names what the reader has always felt but never had words for.

(b) **Per-verse fan-out cycle 2** — sweep these high-frequency verses for the same propagation defect John 6:44 carried: **John 6:37, John 6:65, John 10:28-29, Ephesians 1:11, Romans 9:15-18, Romans 9:21, 1 John 4:19, Titus 3:5.** Each appears on >5 pages. Use the same protocol: grep the NIV 2011 anchor text + the ESV variant + the KJV variant, then reconcile.

(c) **The In-Brief label site-wide sweep** — grep `<strong>(The Answer|The Truth|The Diagnosis|The Verdict):</strong>` inside `.tldr` blocks and standardize to "In Brief:" per CLAUDE.md. S67 fixed 5 flagship instances; site-wide there are likely more on Tier-3 pages. Expected fix count: 10-30 files. (This sweep is implicitly accelerated by the BUCKET B batch pass — combine the two operations into one pass if cleanly possible.)

(d) **Standing pre-flight** — structural-rot grep + article-tag imbalance scan at the START of the rotation. The 5-session pattern (one defect per rotation) held through S66; S67 broke the pattern (no structural defects) but the per-verse fan-out caught a different propagation class. The check stays standing.

---

NON-NEGOTIABLES:
- NIV 2011 only; zero `(NIV)` suffixes (class eliminated S66; keep it that way; only legitimate occurrence is `connections.html` line 836).
- §XV transparency on every quoted verse where the NIV under-translates the original.
- Widened ESV grep: `O God!` / `unformed substance` / `if I would count` / `uttermost parts` / `by the hearing of the ear` / `draws him` / `raise him up on the last day` / `appointed to eternal life`.
- Two-arms + In-Brief on every flagship.
- Write-over not Edit for substantive deepens; surgical Edit for one-line fixes.
- CONSECRATED S68 marker right after `<article class="article-body">` (or `CONSECRATED S43-S58 BORN-APEX` for BUCKET B pages — distinguish the source).
- Verify every `<a href>` on disk before writing it.
- Banned-move grep on every touched page: `\b[0-9] ?(am|pm)\b` / "tonight" / "reading this article" (with the page-native pastoral-framing carveout from S64/S66/S67 for anxious-mind + devotional-shame pages where the time-of-day IS the page's subject).
- Check article-tag balance on any page that feels structurally off.
- Floor 4 spines / stretch 5-6 per run. Pre-close context audit mandatory; >30K unused context at close = run failed.

Close with the build pipeline + `node validate-site.js` GREEN, update SAPIENTIAL-AUDIT.md (add §XIV with the tier-3 inventory results + Tier-2 21-40 verdicts), add a MISSION-CONTROL Session 68 entry that surfaces the new true-remaining number as the headline metric, print the push command, write the S69 kickoff. Do not run git — Aaron pushes manually.

---

## THE REAL FINISH-LINE (new, established S67 close)

Per Aaron: "no matter what page someone lands on they must feel the undeniable force of truth within its words." The campaign is not closed until every prose page a reader can land on has been re-read against §XVI and either lifted to the bar or confirmed at it. Hubs and printables and utility shells are explicitly out-of-scope (BUCKET A); everything else is in-scope until consecrated. Post-S68, the true-remaining number replaces the inflated 405 in MISSION-CONTROL as the headline campaign metric. The estimate at S67 close is ~200-250 real-deepening pages remaining + ~150-200 born-apex needing only the marker; the S68 inventory pass converts this estimate into a count.
