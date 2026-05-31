# S87 KICKOFF — paste this into the next session

NEXT SESSION — S87 — **THE FULL-COVERAGE CAMPAIGN, LEG 7.** Unchanged spine: the per-page cold-read sweep driving the site to **100% individually-confirmed** against the landing-force + §XVI/§XVII bar — because the mechanical scanners (v3/v4/sapiential-tier/validate-site/canonical) all pass site-wide, but only a live human-grade read confirms a doorway actually lands. The ledger is `AUDIT-COVERAGE-LEDGER.md` — read it first; it holds the TALLY, the verdicts log, and the **S87 starting queue** (under "## BATCH 7 — S87 starting queue").

CONTEXT: **S86 resolved the S85 mount-race crisis and delivered a strong leg.** 47 doorways cold-read (35 apex / 8 PASS / 4 MARGINAL all lifted / 0 FAIL); Fan-Out Cycle 19 fixed 15 ESV-cadence leaks across 9 pages; a banned "(NIV)" tag removed. **Coverage after S86: 272/584 CONFIRMED (46.6%); 23 TOUCHED; 289 UNREAD; ~6 sessions to 100%.** Full detail: `SAPIENTIAL-AUDIT.md §XXXII` + `MISSION-CONTROL.md` Session 86 + the ledger's S86 batch log.

✅ **THE INFRA BREAKTHROUGH (changes how you dispatch):** the S85 singleton-mount `RPC … already running` failures are a **bash** problem only. **Subagents read the site reliably via the Read tool on the absolute macOS path** `/Users/aaronforman/Documents/adoptedbygracewebsite/<slug>.html` — a separate channel from the bash mount. S86 ran **6 subagents in parallel with zero contention.** So: **parallel subagent cold-reads are mount-race-free** as long as each subagent uses the **Read tool (NOT bash)**. Tell every subagent so explicitly. Reserve serialized bash for the main thread's own grep/scanner calls (still fire main-thread bash one heavy call at a time on a cold mount; warm mounts have been fine).

⚠️ **OPENING-HAZARD (still standing from S85):** before trusting any opening Read on a cold mount, confirm with bash `ls -1 *.html | wc -l` (expect 660) and treat a single empty/garbled/duplicated tool result as possibly-stale → re-run. The site uses `category-topic` slugs; there are NO bare `total-depravity.html`-style files.

READ FIRST: `AUDIT-COVERAGE-LEDGER.md` (TALLY + BATCH 7 queue). Then `VOICE.md §XVI` (sapiential) + `§XVII` (new-ground) + `§VI` (banned moves — **Author's-"I" is sanctioned; carveouts include imagined-scene clock-hours and the anxious-mind-*/devotional "tonight" register**) + `§XV` (translation transparency). Then `CLAUDE.md` (the manifesto) + `SAPIENTIAL-AUDIT.md §XXXII` (S86 log) + `MISSION-CONTROL.md` Session 86.

**INTAKE DISCIPLINE:** read only the SECTIONS named — use `Read` offset/limit or `grep`, not whole-file reads. To append the §XXXIII log or the MISSION-CONTROL Session 87 entry, write the new content to a temp file and splice with an atomic Python script (proven S83–S86); do not read the live log files in.

---

## PRIORITY 0 — standing pre-flight (lean)

1. bash `ls -1 *.html | wc -l` (expect 660); confirm the mount is warm before any Read.
2. `node sapiential-audit.js` (expect 584 / T1=0 / T2≈151 / T3≈433).
3. `node audit-prose.js` (expect ✓ clean on v3 + v4).
4. ESV grep across ALL .html — confirm S86's Cycle-19 fixes held (no "stream of water in the hand", no "bear to hear my word", no "many in this city who are my people", no "accomplish all my purpose", no "shows his love for us", no "fruit should abide", no "but on God, who has mercy", no "to will and to work", no "work out your own salvation", no 2 Tim 2:10 "they also may obtain", no Matt 23:13 "lock people out of the kingdom", no Matt 11:28 "all who are weary" missing "you"). Standing §XV carveouts unchanged (apologetic-his-own-purpose-and-grace *pro chronōn aiōniōn*, apologetic-god-works-the-willing *eudokia*, tetagmenoi survey, *gegennētai*, John 6:44 "drags", Acts 13:48 "appointed", Rom 7:18 "sinful nature", the Ezek-36 *hiphil* glosses, etc.).
5. Banned-move grep on touched pages — NOT Author's-"I". Flag: 2am/3am reader-crisis framing, "Calvinism says" self-label, TL;DR, applause closes, emoji, literal "(NIV)" version tags.
6. Diff prose count vs 584. Any delta = new prose → triage + close.

---

## PRIORITY 1 — THE COVERAGE SWEEP, BATCH 7 (the session's center of gravity)

**The S87 queue is in `AUDIT-COVERAGE-LEDGER.md` under "## BATCH 7 — S87 starting queue"** — the next 48 non-CONF doorways by inbound. **NOTE: the top four are high-inbound TOUCHED pages still awaiting a full cold-read — `question-faithgift` (405 inbound, the 2nd-most-linked page on the entire site), `question-foreknowledge` (123), `question-goldchain` (120), `demolition-philippians2-12-13` (24).** Confirm the queue live from `sapiential-audit-report.txt` inbound order, skipping any slug on a CONFIRMED line in the ledger (the ledger's full-universe block per-line flags are now accurate post-S86, so this is clean).

**Dispatch parallel subagent cold-reads — the mount race is solved.** Run 6–7 subagents at once, ~7 pages each. **Tell each subagent: read with the Read tool at the absolute path `/Users/aaronforman/Documents/adoptedbygracewebsite/<slug>.html` — do NOT use bash.** Each reads its pages in full and returns a verdict table with QUOTED EVIDENCE per page (no rubber-stamp).

**The rubric (give each subagent verbatim):** READ-ONLY. Judge each page against landing-force + §XVI wisdom (long view, seeing-through, question beneath the question, earned gravitas, idols exposed, ends in awe not applause — depth from seeing more truly, NOT inflated diction) + §XVII new-ground + two-arms (demolition needs a tender catch in the final ~20%). **Verify every quoted Scripture against NIV 2011 — scrutinize cited `<blockquote>`/scripture-block text, prose-embedded inline citations, AND `FAQPage` JSON-LD with EXTRA care: S86's leaks hid in secondary cited blocks, inline citations, and the invisible FAQ-schema layer.** Flag defects: §VI banned moves EXCEPT sanctioned author-"I" (also permitted: imagined-scene clock-hours, devotional "tonight"); emoji; literal "(NIV)" tags; ESV/1984-vs-NIV-2011 slips; fabricated/paraphrased-but-cited verses; limp SEO-directory closes ("Go Deeper"/"Continue Your Journey"/placeholder-duplicated cards instead of a landed hammer); pure-inline-styled card grids on content pages; trailing-.html in-prose hrefs (site convention is extensionless). Verdict PASS(apex)/PASS/MARGINAL/FAIL. One row per page: `NAME — VERDICT — evidence:"<quote>" — tattooable:"<quote/NONE>" — defects:<...or clean>`; for MARGINAL/FAIL add a one-line concrete FIX. End with a slice tally + priority repair list + any systemic pattern.

**Then:** lift every MARGINAL in-session (Write-over-Edit for substantive, surgical Edit for one-liners — always Read the file in the SAME turn before Edit). A FAIL gets a full rebuild or is queued with diagnosis. Update the ledger TALLY + flip the per-line CONF flags for the confirmed pages (use an atomic Python script — proven pattern in S86's `/tmp/ledger_s86.py`). Pre-compute the batch-8 queue.

---

## PRIORITY 2 — FAN-OUT CYCLE 20: THE FAQ JSON-LD VERSE SWEEP (new; S86 finding)

S86's subagents surfaced a leak-zone no visual cold-read catches: **`FAQPage` JSON-LD `acceptedAnswer` blocks can carry ESV/garbled verse text** (S86 caught a fabricated Rom 3:11 "There is no one who seeks God, no one even one" buried in one). **Grep every `"@type": "Answer"` / FAQ JSON-LD block site-wide for quoted Scripture, diff against NIV 2011, fix any leak.** Also re-sweep the standing high-frequency proof-texts for ESV cadence (1 Cor 1:30, Col 2:13, John 15:16, Acts 18:10, Rom 5:8, Phil 2:13, 2 Tim 1:9 — most fixed in Cycle 19, confirm they held) plus the rotation (Ezek 36:26-27, Rom 9:16, 1 Pet 1:3, Eph 2:8-9, Isa 46:10). NIV is the text; gloss the Greek/Hebrew as warrant where §XV applies — never translation-shop the proof-text.

---

## PRIORITY 3 — LIVE-MIRROR / DEPRAVITY-MIRROR DIVERSIFICATION (carried from S84/S85/S86)

Apex rewriting of load-bearing turns, NOT mechanical substitution: (1) the "watch what your mind/body just did" live-mirror turn (20+ pages; `psychology-hostility-reaction` owns it) — rotate lower-stakes instances to different self-recognition shapes; (2) the "dead men don't reach / corpses don't ache" depravity-mirror (6+ pages) — break the near-verbatim convergence. S86 found the move used freshly (not saturating) on the swept pages, so this is not urgent — act if context allows after the sweep + Cycle 20; otherwise carry to S88 with the page list.

---

## SPECIAL — STANDING PROTOCOL

(a) v3 + v4 detectors clean before AND after every edit run. (b) Manual §II banned-move grep on touched pages (Author's-"I" sanctioned). The human/subagent read does work the scanners cannot — S81 author-voice, S82 13-page ESV-Eph2, S83 fabricated Rom 7:19, S84 fabricated James 5:17, S85 five ESV cited-block leaks + card-rot, **S86 six fidelity defects incl. a fabricated Rom 3:11 in invisible FAQ JSON-LD** — none scanner-detectable. (c) NIV 2011 only; §XV transparency; Read-then-Edit in the same turn; Write-over-Edit for substantive deepens. (d) **Full close pipeline (canonical, all 9):** `node build-search-index.js && node build-mega-menu.js && node build-homepage-counts.js && node build-sitemap.js && node auto-linker.js && node wire-orphans.js && node validate-site.js && node canonical-conformance.js && node verify-scripture.js`. First eight GREEN; verify-scripture is a REPORT (~268 divergent = standing noise; (NIV) files should stay 0; act only on a NEW divergence on a touched page). (e) **Pre-close context audit mandatory.** (f) Keep the ledger TALLY honest (CONFIRMED only on a real cold-read PASS). (g) **HOUSEKEEPING:** S86 rolled Session 80 → MISSION-CONTROL-ARCHIVE.md and §XXVI → SAPIENTIAL-AUDIT-ARCHIVE.md; live now holds Sessions 81–86 (6) and §XXVII–§XXXII (6). At S87 close, roll Session 81 / §XXVII to the archives. (h) **Clean up any helper `.py` scripts you create** (write them to the sandbox /tmp, not the repo; S86 left none in the repo).

---

CLOSE with the full pipeline GREEN, append `## §XXXIII. S87 EXECUTION LOG` to `SAPIENTIAL-AUDIT.md`, update `AUDIT-COVERAGE-LEDGER.md` (TALLY + per-line flips + batch-8 queue), add a MISSION-CONTROL Session 87 entry (newest-at-top, above Session 86), roll Session 81/§XXVII to the archives, print the push command, write the S88 kickoff. **Do not run git — Aaron pushes manually.**

---

## THE REAL FINISH-LINE

Per Aaron: *"no matter what page someone lands on they must feel the undeniable force of truth within its words"* — and by §XVI that force must be *wisdom*, by §XVII the wisdom must *break new ground*. Six legs in: **272 confirmed (46.6%)**, zero un-lifted FAILs across the highest-traffic doorways, and the live read has earned its keep **six** times — an author-voice question (S81), a 13-page ESV-Ephesians-2 leak (S82), a fabricated Romans 7:19 block (S83), a fabricated James 5:17 (S84), five ESV cited-block leaks + a card-rot (S85), and six fidelity defects incl. a fabricated Rom 3:11 in invisible FAQ JSON-LD (S86) — none scanner-detectable. Drive it to 100% — ~47 doorways per session, highest-traffic first — until there is no page a searching soul can land on that has not been held to the bar and found to carry the force.

**Then — Aaron's standing post-campaign direction (2026-05-30):** when coverage reaches 100% (≈S92–93), the site returns to **Phase D — expansion.** Open a remaining register (analytical theology, philosophy of theology, formalized polemic, or `compare-[tradition]` under comparative-theology-hub) with net-new apex builds, or run a Phase G Five-Point Proliferation batch. Builds born CONSECRATED + HAMMER-LOCKED, Write-not-Edit, wired into hub + mega-menu + homepage, every href Glob-verified. The coverage campaign is the priority *until* it closes; Phase D resumes the moment it does. (See memory `project_post_campaign_phase_d`.)
