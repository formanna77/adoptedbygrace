# S89 KICKOFF — paste this into the next session

NEXT SESSION — S89 — **THE FULL-COVERAGE CAMPAIGN, LEG 9.** Unchanged spine: the per-page cold-read sweep driving the site to **100% individually-confirmed** against the landing-force + §XVI/§XVII bar — because the mechanical scanners (v3/v4/sapiential-tier/validate-site/canonical) all pass site-wide, but only a live human-grade read confirms a doorway actually lands. The ledger is `AUDIT-COVERAGE-LEDGER.md` — read it first; it holds the TALLY, the verdicts log, and the **S89 starting queue** (under "## BATCH 9 — S89 starting queue").

CONTEXT: **S88 delivered a strong leg.** 48 doorways cold-read (7 parallel subagents, Read-tool channel, zero mount contention) → **40 apex / 6 PASS / 2 MARGINAL / 0 FAIL — all 8 defective pages lifted in-session.** **Coverage after S88: 368/584 CONFIRMED (63.0%); 13 TOUCHED; 203 UNREAD; ~4 sessions to 100%.** The cold read earned its keep an **EIGHTH** consecutive time — a **whole-page ESV scripture-block cluster on `ot-isaiah-servant`** (14 corrections; the tell was an internal contradiction — the prose said "LORD Almighty" while every block said "LORD of hosts"); a Phil 1:29 "for his sake" ESV on `question-one-question`; an Acts 7:51 clause-order swap on `question-free-will-bible-verses`; a 2 Sam 7:16 "shall…shall" on `ot-david` (block + FAQ); a Rom 9:3 "accursed" in `objection-god-could-save-all`'s FAQ JSON-LD; the `testimony-wall` 19-tile inline-card-wall ported to scoped `.wall-*` classes — none scanner-detectable. **Fan-Out Cycle 21** (the new tag-stripped ESV sweep — catches quotes split across inline `<em>`/`<a>` tags that raw grep misses) found 7 seams beyond the 48 and fixed 5 (Isa 43:1 on analogy-lazarus-grave + scripture-tsunami #1, Isa 6:9-10 on connections, Isa 42:1 on ot-election, Phil 1:6 tag-split on psychology-pride-root-objection); 2 sanctioned carveouts left (the *theopneustos* gloss; the Westminster KJV proof-text). `demolition-1tim2-4` got its first individual cold-read → PASS-apex (one Matt 4:23 seam fixed). Full detail: `SAPIENTIAL-AUDIT.md §XXXIV` + `MISSION-CONTROL.md` Session 88 + the ledger's S88 batch log.

✅ **INFRA (unchanged, holding):** parallel subagent cold-reads are mount-race-free **as long as each subagent uses the Read tool (NOT bash)** on the absolute macOS path `/Users/aaronforman/Documents/adoptedbygracewebsite/<slug>.html`. S86–S88 each ran 6–7 subagents in parallel with zero contention. Reserve serialized bash for the main thread's own grep/scanner calls. **Sandbox note:** write helper `.py` scripts to a *unique* `/tmp` filename per session — `/tmp/splice_logs.py` is a pre-existing read-only sandbox file and will silently run stale; pick e.g. `/tmp/s89_*.py`.

⚠️ **OPENING-HAZARD (standing):** before trusting any opening Read on a cold mount, confirm with bash `ls -1 *.html | wc -l` (expect 660) and treat a single empty/garbled/duplicated tool result as possibly-stale → re-run. The site uses `category-topic` slugs; there are NO bare `total-depravity.html`-style files.

READ FIRST: `AUDIT-COVERAGE-LEDGER.md` (TALLY + BATCH 9 queue). Then `VOICE.md §XVI` (sapiential) + `§XVII` (new-ground) + `§VI` (banned moves — **Author's-"I" is sanctioned; carveouts include imagined-scene clock-hours and the anxious-mind-*/devotional "tonight" register**) + `§XV` (translation transparency). Then `CLAUDE.md` (the manifesto) + `SAPIENTIAL-AUDIT.md §XXXIV` (S88 log) + `MISSION-CONTROL.md` Session 88.

**INTAKE DISCIPLINE:** read only the SECTIONS named — use `Read` offset/limit or `grep`, not whole-file reads. To append the §XXXV log or the MISSION-CONTROL Session 89 entry, write the new content to a temp file and splice with an atomic Python script (proven S83–S88); do not read the live log files in.

---

## PRIORITY 0 — standing pre-flight (lean)

1. bash `ls -1 *.html | wc -l` (expect 660); confirm the mount is warm before any Read.
2. `node sapiential-audit.js` (expect 584 / T1=0 / T2≈151 / T3≈433).
3. `node audit-prose.js` (expect ✓ clean on v3 + v4).
4. ESV grep across ALL .html — confirm S88's fixes held: **no "to suffer for his sake"** (Phil 1:29), **no "Behold my servant"** (Isa 42:1 — now "Here is my servant"), **no "Keep on hearing"** (Isa 6:9 — now "Be ever hearing"), **no "Fear not, for I have redeemed"** (Isa 43:1 — now "Do not fear"), **no "shall endure forever"** (2 Sam 7:16 — now "will endure"), **no "I myself were accursed"** (Rom 9:3 — now "cursed and cut off from Christ"), **no in-prose trailing-`.html` hrefs** (`grep -rhoE 'href="/[^"]*\.html"' *.html | wc -l` = 0). Standing S87 set still 0 (1 Tim 2:4 "desires", 2 Tim 2:10 "they also", Phil 1:6 "bring it to completion" EXCEPT scripture-tsunami's *epitelesei* gloss) + the Cycle-19 set. **Re-run the tag-stripped sweep** (the S88 Cycle-21 method — strip `<...>` tags, collapse whitespace, then grep ESV tells): expect ONLY the 2 carveouts — `systematic-prolegomena` ("breathed out by God" = *theopneustos* §XV gloss) and `westminster-chapter-3-plain-english` ("LORD of hosts" = the KJV verse explicitly cited as "THE VERSE THE WESTMINSTER DIVINES QUOTED"). Standing §XV carveouts UNCHANGED (Ezek-36 *hiphil* glosses; *gegennētai*; John 6:44 "drags"; Acts 13:48 "appointed"; *pro chronōn aiōniōn* / *eudokia*; etc.).
5. Banned-move grep on touched pages — NOT Author's-"I". Flag: 2am/3am reader-crisis framing, "Calvinism says" self-label, TL;DR, applause closes, emoji, literal "(NIV)" version tags.
6. Diff prose count vs 584. Any delta = new prose → triage + close.

---

## PRIORITY 1 — THE COVERAGE SWEEP, BATCH 9 (the session's center of gravity)

**The S89 queue is in `AUDIT-COVERAGE-LEDGER.md` under "## BATCH 9 — S89 starting queue"** — the next 48 non-CONF doorways by inbound (led by theologian-bradwardine, theologian-lloydjones, apologetic-babies, apologetic-save-his-people, …). Confirm the queue live from `sapiential-audit-report.txt` inbound order, skipping any slug on a CONFIRMED line in the ledger (post-S88 per-line flags are accurate).

**Dispatch 6–7 parallel subagent cold-reads** (~7 pages each). **Tell each subagent: read with the Read tool at the absolute path `/Users/aaronforman/Documents/adoptedbygracewebsite/<slug>.html` — do NOT use bash.** Each reads its pages in full and returns a verdict table with QUOTED EVIDENCE per page (no rubber-stamp).

**The rubric (give each subagent verbatim):** READ-ONLY. Judge each page against landing-force + §XVI wisdom (long view, seeing-through, question beneath the question, earned gravitas, idols exposed, ends in awe not applause — depth from seeing more truly, NOT inflated diction) + §XVII new-ground + two-arms (demolition needs a tender catch in the final ~20%). **Verify every quoted Scripture against NIV 2011 — scrutinize cited `<blockquote>`/scripture-block text, prose-embedded inline citations (INCLUDING quotes split across inline `<em>`/`<a>` tags), AND `FAQPage` JSON-LD with EXTRA care.** Flag defects: §VI banned moves EXCEPT sanctioned author-"I" (also permitted: imagined-scene clock-hours, devotional "tonight"); emoji; literal "(NIV)" tags; ESV/1984-vs-NIV-2011 slips; fabricated/paraphrased-but-cited verses; limp SEO-directory closes; pure-inline-styled card grids on content pages; trailing-.html in-prose hrefs. Verdict PASS(apex)/PASS/MARGINAL/FAIL. One row per page: `NAME — VERDICT — evidence:"<quote>" — tattooable:"<quote/NONE>" — scripture:"<verbatim flagged verse + ref, or 'all NIV 2011 clean'>" — defects:<...or clean>`; for MARGINAL/FAIL add a one-line concrete FIX. End with a slice tally + priority repair list + any systemic pattern.

**S88 systemic guidance to carry in:** (a) **weight mid-paragraph secondary citations of non-headline verses** and (b) **early-2026-vintage pages (datePublished 2026-01-01)** — whole-page ESV residue hides where the entire scripture apparatus predates the NIV-only standard (S88's ot-isaiah-servant). **Verify EVERY flagged verse against the authoritative text (Bible Gateway NIV) before editing** — S88 averted 3 false-positives where subagents misremembered NIV-2011-vs-1984.

**Then:** lift every MARGINAL in-session (Write-over-Edit for substantive, surgical Edit for one-liners — always Read the file in the SAME turn before Edit; for a count-balanced-but-crossed structural rebuild, an anchored Python rebuild with a div/section/article balance assertion is the proven tool). A FAIL gets a full rebuild or is queued with diagnosis. Update the ledger TALLY + flip the per-line CONF flags (atomic Python). Pre-compute the batch-10 queue.

---

## PRIORITY 2 — FAN-OUT CYCLE 22

(a) **Continue the tag-stripped ESV sweep** (the S88 Cycle-21 method is the strongest leak-catcher we have — it sees quotes split across inline tags AND in JS verse-data AND in FAQ JSON-LD). Re-run with the standing tell-list + any new ESV cadences the batch-9 cold-reads surface; re-confirm the rotation (Ezek 36 glosses intact, Rom 9:16, 1 Pet 1:3, Eph 2:8-9, Isa 46:10) and that the S88 fixes held. (b) **The testimony-wall inline-card-wall pattern is retired but may have siblings** — run one targeted site-wide grep for `<div style="background:` card/gallery walls on content pages (the manifesto bans them); convert any found to scoped CSS classes as in S88 (`.wall-*` precedent in global.css).

---

## PRIORITY 3 — LIVE-MIRROR / DEPRAVITY-MIRROR DIVERSIFICATION (carried from S84–S88)

Apex rewriting of load-bearing turns, NOT mechanical substitution: (1) the "watch what your mind/body just did" live-mirror turn (20+ pages; `psychology-hostility-reaction` owns it) — rotate lower-stakes instances to different self-recognition shapes; (2) the "dead men don't reach / corpses don't ache" depravity-mirror (6+ pages) — break the near-verbatim convergence. S86–S88 found the moves used freshly (not saturating) on the swept pages, so this is not urgent — act if context allows after the sweep + Cycle 22; otherwise carry to S90 with the page list.

---

## SPECIAL — STANDING PROTOCOL

(a) v3 + v4 detectors clean before AND after every edit run (note: a never-gives-up banner or any `<p>` content in the gap between `</article>` and `<!-- RELATED-ARTICLES-START -->` will trip v3 — keep such banners INSIDE the article, before `</article>`). (b) Manual §II banned-move grep on touched pages (Author's-"I" sanctioned). The human/subagent read does work the scanners cannot — S81–S88 each caught a fidelity defect no scanner sees (S88: a whole-page ESV cluster behind an internal contradiction). (c) NIV 2011 only; §XV transparency; Read-then-Edit in the same turn; Write-over-Edit for substantive deepens; **verify flagged verses against the authoritative text before editing.** (d) **Full close pipeline (canonical, all 9):** `node build-search-index.js && node build-mega-menu.js && node build-homepage-counts.js && node build-sitemap.js && node auto-linker.js && node wire-orphans.js && node validate-site.js && node canonical-conformance.js && node verify-scripture.js`. First eight GREEN; verify-scripture is a REPORT (~268 divergent = standing noise; (NIV) files should stay 0; act only on a NEW divergence on a touched page). (e) **Pre-close context audit mandatory.** (f) Keep the ledger TALLY honest (CONFIRMED only on a real cold-read PASS). (g) **HOUSEKEEPING:** S88 rolled Session 82 → MISSION-CONTROL-ARCHIVE.md and §XXVIII → SAPIENTIAL-AUDIT-ARCHIVE.md; live now holds Sessions 83–88 (6) and §XXIX–§XXXIV (6). At S89 close, roll Session 83 / §XXIX to the archives. (h) **Clean up any helper `.py` scripts you create** (write them to the sandbox /tmp under a unique name, not the repo).

---

CLOSE with the full pipeline GREEN, append `## §XXXV. S89 EXECUTION LOG` to `SAPIENTIAL-AUDIT.md`, update `AUDIT-COVERAGE-LEDGER.md` (TALLY + per-line flips + batch-10 queue), add a MISSION-CONTROL Session 89 entry (newest-at-top, above Session 88), roll Session 83/§XXIX to the archives, print the push command, write the S90 kickoff. **Do not run git — Aaron pushes manually.**

---

## THE REAL FINISH-LINE

Per Aaron: *"no matter what page someone lands on they must feel the undeniable force of truth within its words"* — and by §XVI that force must be *wisdom*, by §XVII the wisdom must *break new ground*. Eight legs in: **368 confirmed (63.0%)**, zero un-lifted FAILs, and the live read has earned its keep **eight** times — none of it scanner-detectable. Drive it to 100% — ~48 doorways per session, highest-traffic first — until there is no page a searching soul can land on that has not been held to the bar and found to carry the force.

**Then — Aaron's standing post-campaign direction (2026-05-30):** when coverage reaches 100% (≈S92–93), the site returns to **Phase D — expansion.** Open a remaining register (analytical theology, philosophy of theology, formalized polemic, or `compare-[tradition]` under comparative-theology-hub) with net-new apex builds, or run a Phase G Five-Point Proliferation batch. Builds born CONSECRATED + HAMMER-LOCKED, Write-not-Edit, wired into hub + mega-menu + homepage, every href Glob-verified. The coverage campaign is the priority *until* it closes; Phase D resumes the moment it does. (See memory `project_post_campaign_phase_d`.)
