# NEXT SESSION — CONTEXT-OPTIMIZATION RUN (Aaron, 2026-06-21)

**LAUNCH:** this brief is the PRIORITY 0 for the next run. Do all of it FIRST, then continue the Diamond Pass per `NEXT-SESSION-S143-kickoff.md` to fill the window to ≥80%.

## THE MANDATE
Aaron's goal: **maximize the share of the context window spent on page CONTENT; minimize the share spent on process/intake.** Integrate or remove language that is redundant or unnecessary for every agent to read — WITHOUT losing a single load-bearing fact or weakening the constitution. This is surgical compression, the same discipline as the Diamond Pass (cut repetition, keep substance), applied to the project's own docs.

**The standing context rule still binds this run** (MISSION-CONTROL GATE 0): never close under 80% used; aim ~85%; ~90% is the degradation ceiling — stop adding NEW heavy work there. So: do the optimization, then lift Diamond-Pass pages until ≥80%.

## MEASURED BASELINE (do NOT re-measure from scratch — these are exact char-count÷4 token estimates as of S142 close)
- Per-session intake the agent pays: **CLAUDE.md ~4.4K (AUTO-LOADS — never Read it with the tool), VOICE.md sections ~6K (of 18.9K total), MISSION-CONTROL S142+S141 ~4K, kickoff ~3.4K, SAPIENTIAL tail ~3K ≈ ~21K controllable intake.**
- Bash/audit output: ~10–20K if un-piped (an un-piped `verify-scripture` alone dumps ~8K of file-list). FIX: pipe everything to `| tail`/`| grep`. (Already encoded in the S143 kickoff "CONTEXT ECONOMY" note.)
- Harness/tool-schema overhead: ~30–45K, NOT editable from the repo (set by Cowork + which plugins/MCPs are connected). This is Task D below — Aaron's decision, not the agent's.
- Live MISSION-CONTROL.md is **~33K tokens / 132 KB**; entries S142–S137 run **1,286 / 1,646 / 1,184 / 904 / 1,056 / 548 words**. Boilerplate repeated across the live log: `"NO git (Aaron pushes)"` ×7, the `build-search-index 682 / mega-menu 653…` pipeline litany ×7, `"UNIVERSAL FINDING HELD…"` ×5, `"all SUBTRACTION"` ×20.

## GUARDRAILS (read before cutting anything)
- **Cut redundancy, never facts.** Every entry's counts (HTML/prose/T-tiers/quotes/DIVERGENT), the specific page names lifted + what was done to each, the citation/doctrinal lessons, and each "carry-forward" must survive compression. If unsure whether a line is load-bearing, keep it.
- **Do not touch `MISSION-CONTROL-ARCHIVE.md`** (~307K tokens — reference only; never Read whole, never edit).
- **Preserve all integrity laws verbatim** in CLAUDE.md: NO git ever, NIV-2011 only / never append "(NIV)", NO emojis (the banned-range list stays), the 5-build-script pipeline, the hyperlink mandate, the structure rules, the eliminated-features list. These are the constitution — compress prose, never delete a law.
- **The ≥80% context floor + ~90% ceiling language stays** (GATE 0 + memory + kickoff).
- NO git. Run the full validator pipeline at close even though most edits are .md (cheap insurance).

## TASK A — Standardize + compress the MISSION-CONTROL live log
1. Define a fixed SHORT entry format and put a one-line spec at the top of the "Session Log" section, e.g.:
   `### Session N — DATE — title` then **Shipped:** (pages + one-clause each) · **Fixed:** (citations/doctrine/NIV) · **Carries forward:** (the live targets) · **Pipeline:** one line (`GREEN — 685/609; v3+v4 0/685; 0 "(NIV)"; DIVERGENT 270; quotes NNNN`).
2. Drop per-entry boilerplate that is now canon elsewhere: the full pipeline litany → the one-line form above; `"NO git (Aaron pushes)"` → delete (it's a CLAUDE.md law); the repeated `"THE UNIVERSAL FINDING HELD AN Nth TIME"` paragraph → one short standing line in the Session Log header, not re-stated per entry.
3. Retro-compress the 6 live entries (S142→S137) to the new format, **preserving every page name, count, fix, and carry-forward**. Target ≈350–450 words/entry (from 550–1,650). Expected live-MC shrink: ~33K → ~12–15K tokens.
4. Re-confirm the rolling rule still holds: keep ~6 live entries; oldest rolls to ARCHIVE at each close (S137 is next to roll).

## TASK B — Make the kickoff the single authoritative intake (kill the double-read)
The kickoff currently re-states the universal finding, the four secondary catches, and the non-negotiables that ALSO live in CLAUDE.md/VOICE.md, and THEN tells the agent to read those docs too — ~6–10K of overlap every session.
1. Keep the kickoff as the canonical short statement of: the directive, the universal finding, the 4 secondary catches, the non-negotiables, the context rule.
2. Change the kickoff "READ FIRST" so VOICE.md/SAPIENTIAL sections are **lazy-load** — read a specific § ONLY when a page in hand needs it (e.g., open VOICE §XV when a citation is in question), NOT as blanket pre-flight. The only mandatory pre-flight reads become: the kickoff itself + the last MISSION-CONTROL entry. (CLAUDE.md auto-loads — never re-read.)
3. Verify nothing essential is reachable ONLY via the now-lazy reads; if so, fold the one-liner into the kickoff.

## TASK C — Consolidate memory (`memory/` dir + MEMORY.md index)
1. MEMORY.md lists the kickoff-prompt feedback **twice** (the "write the next session's kickoff" line and the "session-close kickoff box" line) — merge to one.
2. Several entries are Hammer-50/Phase-F-era and partly obsolete under the Diamond Pass (e.g., spine-count framing already superseded by the ≥80% v3). Reconcile/merge; do NOT delete anything still in force (the ≥80% floor, apex-rhetoric protocol, landing-force standard, universal-openers + sharp prose, subagent-read-channel, intake discipline, Write-over-Edit, structural-rot v5).
3. Keep MEMORY.md to one tight line per memory; ensure each line states the actionable rule, not history.

## TASK D — (AARON'S DECISION, not the agent's) prune unused connectors
The biggest single controllable win (~10–25K/session) is disconnecting plugins/MCPs this solo website-prose project never uses (Apollo, Common Room, Salesforce Slack, Snowflake, Box, Figma, the sales/marketing/finance suites, etc.). **Do not attempt this from the repo.** Leave Aaron a one-line note in the close summary recommending he prune connectors in Cowork settings, listing which are clearly unused here.

## LEAN CONSTITUTION DRAFTS — for Aaron's review, do NOT overwrite the live files
Produce `CLAUDE.lean-proposal.md` and `VOICE.lean-proposal.md` as SEPARATE proposed files. Compress prose, merge the CLAUDE.md writing-standards bullets that duplicate VOICE §VI, fold near-duplicate VOICE subsections — but change NO rule's substance. At close, present both as proposals with a 3–5 line rationale each and the before/after token counts. Aaron approves before anything replaces the live CLAUDE.md/VOICE.md.

## VERIFY (before close)
- Grep the compressed MISSION-CONTROL entries for the key tokens to prove no fact was lost: every lifted page name still present, every count (HTML/prose/quotes/DIVERGENT) present, every "carries forward" present.
- Re-measure intake-doc token cost (CLAUDE + kickoff + MC last-2 + VOICE-mandatory) and report the before→after savings in the close summary (baseline above).
- Run the full pipeline GREEN (`build-search-index` → … → `verify-scripture`), each command piped to `| tail`/`| grep`. Doc edits shouldn't move HTML counts; confirm 685/609, v3+v4 0/685, 0 "(NIV)", DIVERGENT 270.

## THEN — fill the window
Optimization done, continue the Diamond Pass per `NEXT-SESSION-S143-kickoff.md` (execute its PRE-MAPPED batch — devotional-your-name-in-the-book + systematic-imputation — then fresh cold-read batches) until context is ≥80% used. Close per the (newly compressed) MISSION-CONTROL protocol; write the next kickoff; print the push command.
