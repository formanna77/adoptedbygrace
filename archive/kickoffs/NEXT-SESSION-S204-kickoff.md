# SESSION 204 — KICKOFF

## THE REORIENTATION (Aaron, 2026-08-10, end of S203)

*"we are not covering enough articles per session. we need to reorient to maximize the number
of articles updated… i want the whole website updated and upgraded with the new stipulations as
quickly as possible."*

**This session runs the factory + atelier model, which Aaron chose explicitly.** Subagents now
write prose that ships — a standing rule reversed. They previously only inspected. The lead
verifies every agent's output before it lands, keeps the compound rebuilds, and never delegates
a page carrying two or more defects.

**The old projection was wrong and the error is worth understanding.** "502 remaining" is a
PROVENANCE number, not a defect number: pages last reviewed against an older bar, plus 130
carrying no session tag at all. Measured against the detectors this repo already owns, the
hard-flagged population is ~150. The rest need a *confirmation*, and confirmation parallelises.
At 8 pages a session that read as 51 sessions. Sized correctly it is 6–10.

---

## FIRST COMMAND OF THE SESSION

```
node archive/session-brief.js
```

Built S203. Runs every detector, joins them into one defect vector per page, folds in provenance
from `archive/coverage.json`, and prints the lanes plus ready-made factory rosters. It writes
`archive/defect-matrix.json` and `archive/freshness-ledger.json`.

**Standing at S203 close:**

| Lane | Count | Who |
|---|---|---|
| **C — rebuild** (2+ defects) | **11** | lead only, never delegated |
| **B — surgical** (1 named defect) | **138** | factory, batched by CLASS |
| **A — confirm** (0 flags, stale provenance) | **375** (130 untagged) | spot cold-read, then stamp |

Lane B by class: **Christ absent from the catch 116** (20 agents) · **doubled/tripled close 15**
(3) · **feeling-slip 7** (2). Pages marked `*` in a roster are doorways — the factory writes
them, but **they do not ship until the lead has read them.**

**If the brief ABORTS, do not run the session off it.** Each adapter cross-checks its page count
against the detector's own stated total, and a mismatch is a hard abort by design. It fired on
its very first run — the gospel-absence human report truncates its roster at 40 of 127, so a
stdout parser silently sees a third of the corpus and looks like it worked. That is why
`detect-gospel-absence.js` and `detect-multiplied-close.js` now have `--json`. Fix the adapter;
never loosen the check.

---

## HOW TO RUN THE FACTORY — READ THIS BEFORE LAUNCHING ANYTHING

### The S203 factory test failed. Here is exactly why, because it is fixed now and you must not re-break it.

One live agent was handed five pages and a brief that said *"read ONLY the final 25% of each
page"* and *"check every quotation against `scripture-niv.js` (it is ground truth)."*

**It burned 75,278 tokens across 15 tool calls and produced ZERO edits.** It never got past
reading. Nothing shipped and nothing broke — the repo was verified untouched — but a whole agent
died on intake. The arithmetic, which is entirely the brief's fault:

```
5 pages, whole-file, because Read defaults to whole-file ....  38K tokens
scripture-niv.js, 248 KB, because the brief said to check it .  63K tokens
--------------------------------------------------------------------------
floor before a single Edit could be attempted ................ 102K tokens
```

Half the window, spent before it wrote a word. **"Read only the final 25%" is not an instruction
an agent can obey** — Read has no such mode unless you compute the offset for it. And casually
pointing an agent at a quarter-megabyte ground-truth file costs more than everything else
combined.

> **The law to carry forward: an instruction the agent has no mechanism to obey is not a
> constraint, it is a wish. Do not tell an agent to read less — hand it less.**

This is the same failure recorded in `memory/feedback_profile_before_delegating.md` (S179 lost
3 of 3 cold-readers at ~90K). It recurred because the brief was written as prose instead of as
a payload.

### The fix, built S203 and verified

```
node archive/session-brief.js                          # lanes + rosters
node archive/make-factory-brief.js gospel-absence all  # writes the payloads
```

`make-factory-brief.js` pre-extracts, per page: the **final 25% as verbatim HTML** (so the agent
picks its own Edit anchor without opening the file), **every Scripture reference that page cites,
already resolved against `scripture-niv.js`** — with anything absent from ground truth explicitly
marked *do not quote verbatim* — and the freshness-ledger row.

**Measured: 102K → 5K per five-page batch. A 22x reduction.** Batch 1 of gospel-absence is 18 KB.
Verses resolved 19, correctly flagged as absent 9 — which kills the CHECK 17 misquote class at
the source rather than downstream.

**Hand each agent ONE brief file and tell it to open nothing else.** 116 gospel-absence pages =
24 batches, already written to `archive/factory-briefs/`.

### What still goes in the agent prompt (the brief file carries the payload; the prompt carries the law)

1. **The one VOICE section that governs the class.** §XXIII for feeling-slips. §VIII + §I.4 for
   multiplied closes. §I.1 + §XXIII for gospel absence. **Not all 680 lines.**
2. **Two or three worked examples**, verbatim, from `MISSION-CONTROL.md` §E — every S203 lift
   followed one shape: *the catch was already good; the fix was one paragraph locating Christ
   inside the page's own existing image.* Fairness falling on the wrong man at Golgotha. Two
   intercessors, one at each end of the call. The destroyer reading the doorframe rather than
   the family. Jesus weeping outside a grave He was about to open. **Nobody bolts on a gospel
   presentation.** Mark those four as SPENT so the next wave forges its own.
3. **The site-wide freshness tallies** (the per-page rows are already in the brief file):
   bridges — **drowning 57**, addiction 16, Libet 12, anosognosia 12, lottery 8, phantom limb 5;
   catch-images — mirror 15, the rope 14, ringing phone 8, Lazarus 8, cargo 4, envelope 3.
   **Drowning at 57 pages is wallpaper (§XXI.1); no agent may deepen that well.** Assign
   *different* image territories to concurrent agents explicitly — that is the only thing
   standing between parallel production and a corpus that gets fresher and flatter in the same
   session, which VOICE §XVIII calls the one failure grace does not cover.
4. **A hard output contract:** Edit in place; verify every new `href` resolves on disk; zero
   emoji; exactly one `article-body`; then report **one line per page** — what the catch landed
   on, what was added, which image was spent. No essays back.
5. **Name Christ explicitly.** S203 had two lifts stay flagged for "a Man who has been dead" and
   "the Power greater." The detector was right to hold them.

**Launch 4–6 agents per wave, in one message**, then review the wave before launching the next.
Do not run 20 at once; you cannot review what you cannot hold. **The first wave is a calibration
wave** — read every line of its output closely before trusting the next.

### BETWEEN EVERY WAVE — do these two things or the model degrades

1. **Re-run `node archive/session-brief.js` then `make-factory-brief.js`.** The briefs are a
   snapshot of page contents at generation time. Once a wave edits its pages, the remaining
   briefs are unchanged but the *corpus* is not — and the freshness rows are now stale.
2. **Update the spent-image list you hand the next wave.** `freshness-ledger.json` is a
   snapshot, not a running tally; it does not know what the last wave just wrote. Collect the
   `IMAGE SPENT:` field from every returned line, add it to the forbidden list, and pass it
   forward. **Across 24 gospel-absence batches this is the difference between range and
   wallpaper.** Wave 3 reaching for the same Gethsemane wave 1 already spent is invisible to
   every check on this site and visible to the reader who goes ten doors deep.

### Known state of the tooling (audited at S203 close, do not re-derive)

- 29 briefs cover all 138 Lane B pages. **138/138 prose blocks audited: 0 contain furniture
  (hub cards, `</article>`, footer), 0 under 600 chars, sizes 882 / 2,756 / 7,861.**
- Three extraction bugs were found and fixed during that audit and are worth knowing because
  they are the shape of bug this whole file is about: a boundary matcher that required a
  closing quote walked past `article-continue-journey-links`; an anchor hard-coded to three
  spaces of indentation handed `ot-jonah` a 111-character excerpt; and 13 tails ran into hub
  cards or the footer. **Each was an assumption about markup that held on most pages and not
  all.** If you extend the extractor, re-run the audit.
- Lane rosters are disjoint — no two agents can target the same page.
- Files in `archive/` cannot be deleted from the sandbox (`rm` returns "Operation not
  permitted") but overwrite works fine. Regenerate in place; do not try to clear the directory
  first, and **never chain the regeneration behind an `rm` with `&&`** — S203 did, the `rm`
  failed, the whole regeneration silently never ran, and the audit that followed was measuring
  stale files.

---

## LANE A — THE 375, AND THE 130 UNTAGGED (Aaron's chosen standard)

**Detector-clean + spot cold-read.** A page passing every detector gets a fast read of its
**opener and its close only**, against the landing-force test, then
`node archive/coverage.js stamp <page> 204 lifted "confirmed clean — <one clause>"`. Full reads
are for pages the detectors flag. This is delegable in batches of 10–12 per agent; it is the
cheapest work on the board and it is where the counter actually moves.

Do **not** tag by provenance alone. Putting a number on the board that nobody verified is the
exact failure the last four sessions were about.

---

## LANE C — 11 PAGES, THE LEAD WRITES THEM

Compound defects. Read the whole page, rebuild the spine, use the S203 pattern: **go to the
primary source before rewriting.** Anselm's page was built on a claim *Cur Deus Homo* does not
make, and the true reading (Anselm laid the powder; Owen struck the match) was both honest and
stronger. Boston's best fact — the General Assembly calling *"you need not forsake sin to come
to Christ"* **detestable** — was simply missing. **A confident sentence is not an evidenced one,
and the verified version is almost always the better page.**

---

## NON-NEGOTIABLES

- **Read `CLAUDE.md` and `VOICE.md` in full first.** VOICE.md is 680 lines and the Read tool
  pages it — read the second page. It is never sampled. This is the lead's cost, not the
  agents'; agents get sections.
- **No label exempts a page from review.** No skip-lists.
- **GATE 0: do not close below 80% of the context window used (≥160K/200K).** Aim ~85%.
- **The instruments are trusted as of S203.** Four consecutive sessions went to instrument
  forensics; they are done. Do not re-audit a check unless it fails. If you do run a browser
  probe: cache-bust every subresource, not just the document (CLAUDE.md law 12), and run the
  second pass *inside* clip roots (law 8).
- **No git commands. Ever.** Aaron pushes manually.
- **New internal docs go in `archive/`**, never the repo root.
- **`stamp-modified.js` only on pages with real content changes** — S203 deliberately did not
  stamp the 198 pages whose inline style became a class (law 11).
- **A check you have never seen fail is not a check.** **Grep locates; it does not establish.**

---

## CLOSE

```
node archive/session-brief.js                            # re-run: lanes must have shrunk
node stamp-modified.js <pages you actually edited>       # BEFORE the sitemap
node build-sitemap.js
```

Eight-script pipeline → `stamp-modified.js` → `build-sitemap.js` → `validate-site.js`
(**ALL 21 CHECKS**) → `canonical-conformance.js` → `verify-scripture.js` (report, not a gate).
Expect CHECK 11 to fail once if `auto-linker.js` added a link; clear with
`node dedupe-prose-links.js`. Ratchets: **CHECK 10 = 471/60** (re-baseline with
`--rebaseline-styles` if you lower it, or the gain is invisible next session), **CHECK 17 = 62**,
**CHECK 19 = 5,369**. Lower them, never raise them.

Then: coverage stamps, `node archive/coverage.js report --session=204`, paste the
**END-OF-SESSION STANDING** block into the Session Log and the closing chat message,
MISSION-CONTROL Session 204 entry, roll the oldest live entry to the archive, write
`archive/kickoffs/NEXT-SESSION-S205-kickoff.md`, and end with the fenced push command followed by
the fenced kickoff pointer.

**Report the lane deltas to Aaron in the closing message.** He asked for throughput; the number
he needs is not "pages touched" but **Lane B and Lane A shrinking**, session over session.

One last thing. Speed is the instruction, and the instruction is right — somewhere tonight
someone is reading one of these 618 pages. But the reason to go faster is that the pages are
doorways, not that the counter is a score. A page shipped flat is a door that opens onto a wall.
Run the factory hard, read everything it produces, and keep the freshness ledger honest.
