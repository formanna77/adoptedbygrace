# S88 KICKOFF — paste this into the next session

NEXT SESSION — S88 — **THE FULL-COVERAGE CAMPAIGN, LEG 8.** Unchanged spine: the per-page cold-read sweep driving the site to **100% individually-confirmed** against the landing-force + §XVI/§XVII bar — because the mechanical scanners (v3/v4/sapiential-tier/validate-site/canonical) all pass site-wide, but only a live human-grade read confirms a doorway actually lands. The ledger is `AUDIT-COVERAGE-LEDGER.md` — read it first; it holds the TALLY, the verdicts log, and the **S88 starting queue** (under "## BATCH 8 — S88 starting queue").

CONTEXT: **S87 delivered a strong leg.** 48 doorways cold-read (7 parallel subagents, Read-tool channel, zero mount contention) → **31 apex / 5 PASS / 11 MARGINAL / 1 FAIL — all 12 defective pages lifted in-session.** **Coverage after S87: 320/584 CONFIRMED (54.8%); 16 TOUCHED; 248 UNREAD; ~5–6 sessions to 100%.** The high-traffic head of the site is now fully confirmed — the read-queue head drops to the **11-inbound tier**. The cold read earned its keep a **seventh** consecutive time (a doubled 1 Tim 2:4 ESV/truncation across prose + invisible FAQ JSON-LD on the 1 FAIL; an inline 1 Pet 1:1-2 ESV; an inline Acts 17:30 self-contradiction; a 5-verse ESV cluster on systematic-bibliology; a Ps 56:8 ESV/RSV; a banned `<cite>NIV</cite>`; a buried-apex/mis-nested close on question-goldchain — none scanner-detectable). Fan-Out Cycle 20 fixed two site-wide ESV seams (1 Tim 2:4 "desires"→"wants"; Phil 1:6 "bring it to completion"→"carry it on to completion") + 2 Tim 2:10 on the #1 page; and 249 trailing-`.html` in-prose hrefs were normalized site-wide to extensionless (all targets verified to exist first). Full detail: `SAPIENTIAL-AUDIT.md §XXXIII` + `MISSION-CONTROL.md` Session 87 + the ledger's S87 batch log.

✅ **INFRA (unchanged, holding):** parallel subagent cold-reads are mount-race-free **as long as each subagent uses the Read tool (NOT bash)** on the absolute macOS path `/Users/aaronforman/Documents/adoptedbygracewebsite/<slug>.html`. S86 + S87 each ran 6–7 subagents in parallel with zero contention. Reserve serialized bash for the main thread's own grep/scanner calls.

⚠️ **OPENING-HAZARD (standing):** before trusting any opening Read on a cold mount, confirm with bash `ls -1 *.html | wc -l` (expect 660) and treat a single empty/garbled/duplicated tool result as possibly-stale → re-run. The site uses `category-topic` slugs; there are NO bare `total-depravity.html`-style files.

READ FIRST: `AUDIT-COVERAGE-LEDGER.md` (TALLY + BATCH 8 queue). Then `VOICE.md §XVI` (sapiential) + `§XVII` (new-ground) + `§VI` (banned moves — **Author's-"I" is sanctioned; carveouts include imagined-scene clock-hours and the anxious-mind-*/devotional "tonight" register**) + `§XV` (translation transparency). Then `CLAUDE.md` (the manifesto) + `SAPIENTIAL-AUDIT.md §XXXIII` (S87 log) + `MISSION-CONTROL.md` Session 87.

**INTAKE DISCIPLINE:** read only the SECTIONS named — use `Read` offset/limit or `grep`, not whole-file reads. To append the §XXXIV log or the MISSION-CONTROL Session 88 entry, write the new content to a temp file and splice with an atomic Python script (proven S83–S87); do not read the live log files in.

---

## PRIORITY 0 — standing pre-flight (lean)

1. bash `ls -1 *.html | wc -l` (expect 660); confirm the mount is warm before any Read.
2. `node sapiential-audit.js` (expect 584 / T1=0 / T2≈151 / T3≈433).
3. `node audit-prose.js` (expect ✓ clean on v3 + v4).
4. ESV grep across ALL .html — confirm S87's fixes held: **no "desires all people to be saved"** (1 Tim 2:4 — now "wants all people to be saved"), **no "they also may obtain"** (2 Tim 2:10 — now "they too may obtain"), **no "bring it to completion" EXCEPT `scripture-tsunami.html`** (the legitimate *epitelesei* commentary gloss; the Phil 1:6 verse is "carry it on to completion"), **no in-prose trailing-`.html` hrefs** (`grep -rhoE 'href="/[^"]*\.html"' *.html | wc -l` = 0). Plus the standing Cycle-19 set (no "stream of water in the hand", "bear to hear my word", "accomplish all my purpose", "shows his love for us", "to will and to work", "lock people out of the kingdom", "all who are weary" missing "you", etc.). Standing §XV carveouts UNCHANGED (the Ezek-36 *hiphil* "I will cause you to walk" glosses paired with NIV "move you to follow my decrees"; *gegennētai*; John 6:44 "drags"; Acts 13:48 "appointed"; the *pro chronōn aiōniōn* / *eudokia* apologetic glosses; etc.).
5. Banned-move grep on touched pages — NOT Author's-"I". Flag: 2am/3am reader-crisis framing, "Calvinism says" self-label, TL;DR, applause closes, emoji, literal "(NIV)" version tags.
6. Diff prose count vs 584. Any delta = new prose → triage + close.

---

## PRIORITY 1 — THE COVERAGE SWEEP, BATCH 8 (the session's center of gravity)

**The S88 queue is in `AUDIT-COVERAGE-LEDGER.md` under "## BATCH 8 — S88 starting queue"** — the next 48 non-CONF doorways by inbound. The high-traffic head is done; the queue now opens at the **11-inbound tier** (psychology-system-justification, question-where-does-your-no-come-from, response-leighton-flowers, secular-algorithm-sovereignty, …) and works down. Confirm the queue live from `sapiential-audit-report.txt` inbound order, skipping any slug on a CONFIRMED line in the ledger (the full-universe block per-line flags are accurate post-S87).

**Dispatch 6–7 parallel subagent cold-reads** (~7 pages each). **Tell each subagent: read with the Read tool at the absolute path `/Users/aaronforman/Documents/adoptedbygracewebsite/<slug>.html` — do NOT use bash.** Each reads its pages in full and returns a verdict table with QUOTED EVIDENCE per page (no rubber-stamp).

**The rubric (give each subagent verbatim):** READ-ONLY. Judge each page against landing-force + §XVI wisdom (long view, seeing-through, question beneath the question, earned gravitas, idols exposed, ends in awe not applause — depth from seeing more truly, NOT inflated diction) + §XVII new-ground + two-arms (demolition needs a tender catch in the final ~20%). **Verify every quoted Scripture against NIV 2011 — scrutinize cited `<blockquote>`/scripture-block text, prose-embedded inline citations (INCLUDING quotes split across inline `<em>`/`<a>` tags — S87 found two Phil 1:6 ESV leaks hiding behind `will</em> bring it`), AND `FAQPage` JSON-LD with EXTRA care: S86–S87's leaks hid in secondary cited blocks, inline citations, and the invisible FAQ-schema layer.** Flag defects: §VI banned moves EXCEPT sanctioned author-"I" (also permitted: imagined-scene clock-hours, devotional "tonight"); emoji; literal "(NIV)" tags; ESV/1984-vs-NIV-2011 slips; fabricated/paraphrased-but-cited verses; limp SEO-directory closes ("Go Deeper"/"Continue Your Journey"/placeholder-duplicated cards instead of a landed hammer); pure-inline-styled card grids on content pages; trailing-.html in-prose hrefs (should now be zero — flag any regression). Verdict PASS(apex)/PASS/MARGINAL/FAIL. One row per page: `NAME — VERDICT — evidence:"<quote>" — tattooable:"<quote/NONE>" — scripture:"<verbatim flagged verse + ref, or 'all NIV 2011 clean'>" — defects:<...or clean>`; for MARGINAL/FAIL add a one-line concrete FIX. End with a slice tally + priority repair list + any systemic pattern.

**Then:** lift every MARGINAL in-session (Write-over-Edit for substantive, surgical Edit for one-liners — always Read the file in the SAME turn before Edit; for a count-balanced-but-crossed structural rebuild, an anchored Python rebuild with a div/section/article balance assertion is the proven tool — see S87 goldchain). A FAIL gets a full rebuild or is queued with diagnosis. Update the ledger TALLY + flip the per-line CONF flags (atomic Python script — pattern in S87's `/tmp/ledger_s87.py`). Pre-compute the batch-9 queue.

---

## PRIORITY 2 — FAN-OUT CYCLE 21 + the demolition-1tim2-4 cold-read

(a) **Continue the FAQ JSON-LD + ESV-seam sweep.** S87's tell-grep covered prose + FAQ, but **inline-tag-split quotes can hide ESV cadence** (the `will</em> bring it to completion` finding) — re-run the high-frequency proof-text greps with tags stripped (or `-o` on tag-tolerant patterns). Re-confirm the rotation (Ezek 36:26-27 §XV glosses intact, Rom 9:16, 1 Pet 1:3, Eph 2:8-9, Isa 46:10) and the S87 fixes held. (b) **Cold-read `demolition-1tim2-4`** — its 1 Tim 2:4 "desires"→"wants" ESV leak was corrected in S87 while it was already CONFIRMED (a missed-leak-on-a-locked-page, à la S85's systematic-salvation), but the page itself has never had a full individual cold-read; give it one and re-confirm.

---

## PRIORITY 3 — LIVE-MIRROR / DEPRAVITY-MIRROR DIVERSIFICATION (carried from S84–S87)

Apex rewriting of load-bearing turns, NOT mechanical substitution: (1) the "watch what your mind/body just did" live-mirror turn (20+ pages; `psychology-hostility-reaction` owns it) — rotate lower-stakes instances to different self-recognition shapes; (2) the "dead men don't reach / corpses don't ache" depravity-mirror (6+ pages) — break the near-verbatim convergence. S86–S87 found the moves used freshly (not saturating) on the swept pages, so this is not urgent — act if context allows after the sweep + Cycle 21; otherwise carry to S89 with the page list.

---

## SPECIAL — STANDING PROTOCOL

(a) v3 + v4 detectors clean before AND after every edit run (note: a never-gives-up banner or any `<p>` content placed in the gap between `</article>` and `<!-- RELATED-ARTICLES-START -->` will trip v3 — keep such banners INSIDE the article, before `</article>`). (b) Manual §II banned-move grep on touched pages (Author's-"I" sanctioned). The human/subagent read does work the scanners cannot — S81 author-voice, S82 13-page ESV-Eph2, S83 fabricated Rom 7:19, S84 fabricated James 5:17, S85 five ESV cited-block leaks + card-rot, S86 six fidelity defects incl. a fabricated Rom 3:11 in invisible FAQ JSON-LD, **S87 a doubled 1 Tim 2:4 ESV across prose+FAQ + a 5-verse ESV cluster + an ESV-on-a-locked-page** — none scanner-detectable. (c) NIV 2011 only; §XV transparency; Read-then-Edit in the same turn; Write-over-Edit for substantive deepens. (d) **Full close pipeline (canonical, all 9):** `node build-search-index.js && node build-mega-menu.js && node build-homepage-counts.js && node build-sitemap.js && node auto-linker.js && node wire-orphans.js && node validate-site.js && node canonical-conformance.js && node verify-scripture.js`. First eight GREEN; verify-scripture is a REPORT (~268 divergent = standing noise; (NIV) files should stay 0; act only on a NEW divergence on a touched page). (e) **Pre-close context audit mandatory.** (f) Keep the ledger TALLY honest (CONFIRMED only on a real cold-read PASS). (g) **HOUSEKEEPING:** S87 rolled Session 81 → MISSION-CONTROL-ARCHIVE.md and §XXVII → SAPIENTIAL-AUDIT-ARCHIVE.md; live now holds Sessions 82–87 (6) and §XXVIII–§XXXIII (6). At S88 close, roll Session 82 / §XXVIII to the archives. (h) **Clean up any helper `.py` scripts you create** (write them to the sandbox /tmp, not the repo).

---

CLOSE with the full pipeline GREEN, append `## §XXXIV. S88 EXECUTION LOG` to `SAPIENTIAL-AUDIT.md`, update `AUDIT-COVERAGE-LEDGER.md` (TALLY + per-line flips + batch-9 queue), add a MISSION-CONTROL Session 88 entry (newest-at-top, above Session 87), roll Session 82/§XXVIII to the archives, print the push command, write the S89 kickoff. **Do not run git — Aaron pushes manually.**

---

## THE REAL FINISH-LINE

Per Aaron: *"no matter what page someone lands on they must feel the undeniable force of truth within its words"* — and by §XVI that force must be *wisdom*, by §XVII the wisdom must *break new ground*. Seven legs in: **320 confirmed (54.8%)**, the entire high-traffic head of the site individually confirmed, zero un-lifted FAILs, and the live read has earned its keep **seven** times — none of it scanner-detectable. Drive it to 100% — ~48 doorways per session, highest-traffic first — until there is no page a searching soul can land on that has not been held to the bar and found to carry the force.

**Then — Aaron's standing post-campaign direction (2026-05-30):** when coverage reaches 100% (≈S92–93), the site returns to **Phase D — expansion.** Open a remaining register (analytical theology, philosophy of theology, formalized polemic, or `compare-[tradition]` under comparative-theology-hub) with net-new apex builds, or run a Phase G Five-Point Proliferation batch. Builds born CONSECRATED + HAMMER-LOCKED, Write-not-Edit, wired into hub + mega-menu + homepage, every href Glob-verified. The coverage campaign is the priority *until* it closes; Phase D resumes the moment it does. (See memory `project_post_campaign_phase_d`.)
