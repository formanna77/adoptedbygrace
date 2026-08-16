# SESSION 207 — KICKOFF

## WHERE S206 LEFT IT

**A weekly compute cap killed all five factory agents before one of them landed an edit.
The board still moved, because the lane the last two sessions kept deferring is the one
that needs no agents.** Two Lane C compound rebuilds shipped from the lead's own hands,
one detector bug was found and fixed, and all 21 checks closed green.

| | S205 close | S206 close |
|---|---|---|
| **Lane C** rebuild | 11 | **9** |
| **Lane B** surgical | 36 | **35** |
| **Lane A** confirm | 377 | 380 |
| gospel-absence | 24 | 24 |
| multiplied-close | 22 | 22 |
| feeling-slip | 12 | **11** (one confirmed FP removed by fixing the detector) |

Ratchets: **CHECK 10 lowered 471/60 → 469/59.** CHECK 17 (62) and CHECK 19 (5367)
unchanged, none added.

---

## §THE SINGLE MOST USEFUL THING ON THIS PAGE

**`archive/S207-agent-prompts.md` holds five complete, ready-to-launch factory prompts.**
They were built and validated in S206 and died with their agents. Every Scripture anchor
in them is pre-verified against `scripture-niv.js`; every territory is disjoint; every
guardrail is written out. **Paste the shared block plus one agent section and launch — no
preparation required.** That file is the difference between S207 starting from zero and
S207 shipping 23 pages before lunch.

Re-run `node archive/make-factory-brief.js <class> all` first anyway, so the batch
partition on disk matches the roster.

---

## FIRST TWO COMMANDS

```
node archive/session-brief.js
node archive/make-factory-brief.js gospel-absence all
```

---

## §LANE C FIRST — AND NOT FOR THE REASON THE LAST KICKOFF GAVE

S206 was told to write two Lane C pages before launching a single agent, because Lane C had
lost to the factory two sessions running. It obeyed, and **that instruction is the only
reason the session shipped anything at all** — both pages were finished and verified before
the cap hit. The five agents produced nothing.

So the rule now has a second and stronger justification: **Lane C needs no subagents, which
makes it the one lane a compute failure cannot take from you.** Write two before launching
anything, every session, permanently.

**The nine that remain:** `analogy-chess-grandmaster`, `apologetic-you-did-not-choose-me`,
`compare-calvinism-molinism`, `invisible-wall-prayer-feels-empty`,
`philosophy-resistance-is-proof`, `story-real-conversions`, `story-the-room-where-you-chose`,
`the-fork`, `the-two-arms`. Compound defects — read the whole page, rebuild the spine, and
go to the primary source before rewriting.

---

## §WHAT THE TWO LANE C REBUILDS FOUND (do not re-derive)

**`question-how-grace-feels`** was built on the drowning-man-and-lifeguard image — **the
bridge the ledger marks 57 uses, WALLPAPER, BANNED** — and closed three times. Two
transferable findings came out of rebuilding it:

1. **There was an unworked §XV seam sitting in plain sight.** The NIV renders John 18:18 as
   "a fire" and John 21:9 as "a fire of burning coals." Both are *anthrakia* — a noun that
   occurs **twice in the New Testament, both times in John**, once where Peter denied him and
   once where Jesus made him breakfast — and **Bible Gateway's own cross-reference at John
   21:9 points back to John 18:18.** The editors saw it; the English cannot carry it. Zero of
   618 pages had used it. **There are more of these.** When a page's argument leans on a
   word, check whether the NIV is flattening something, and check whether the corpus has
   already spent it.
2. **Luke 22:32 is the cleanest compatibilism proof text on the board** and no page used it:
   *"and **when** you have turned back"* — no *ean*, an aorist participle, a free future act
   named before the man performed it, with his own first-person account of living through it
   surviving in the same Gospel.

**`objection-desire`** repeated the S205 pattern exactly: **the detector named the wrong
sentence and was right that the paragraph needed a human.** The flagged clause described a
mechanism legitimately; the real §XXIII slip was the sentence that *ended* the paragraph —
*"the desire you were so sure was your own contribution turns out to be the surest evidence
that He was already there"* — a certificate issued on a longing, on a page whose whole
argument is that the heart cannot be its own witness. A second slip gated the closing
invitation on a feeling. **Read the sentences around every flag, not the flagged span.**

And the gospel-absence fix on that page is the model: **do not import a territory when the
page is already holding one.** It closed on a shepherd climbing a hill in the dark and never
said His name. It does now.

---

## §THE DETECTOR FIX, AND THE ONE FALSE POSITIVE STILL STANDING

`detect-feeling-slip.js` strips tags before splitting sentences and was **not** stripping the
nav, the mega-menu, or the related-articles block. Because those are byte-identical on every
page, card titles and the entire navigation were being welded onto real clauses to
manufacture **sentences that appear nowhere on the page.** That produced the
`response-william-lane-craig` flag: *"The same lie that fuels your anxious spiral fuels every
theology… Browse All Articles → Explore by Topic → Truth Best Reads Start Here…"*

Fixed in S206, and **deliberately still scanning JSON-LD and meta**, where §XXIII.2 says the
worst slips live. Proven both directions: the junk match is gone (12 → 11) and an injected
slip on `objection-love` was still caught, then reverted.

**Residual known false positive: `philosophy-resistance-is-proof`** — an H2 heading welded to
the paragraph beneath it. A heading is not a quotation and not a slip; it is the same
artifact class CHECK 17 already classifies around. That page is on the Lane C list anyway;
when you rebuild it, the flag should resolve on its own. Do not deform prose to quiet it.

---

## §THE 562-PAGE NON-DEFECT — DO NOT "FIX" THIS

`objection-desire` carries its related-articles block *inside* `<article class="article-body">`,
which matches the structural-rot signature exactly. **So do 562 of 618 prose pages. It is the
convention; the 56 exceptions are the odd ones.** Moving that `</article>` would have been a
corpus-wide regression across all 21 scripts that key on the literal article tag. *When many
pages score for the same odd reason, suspect the tool.*

The real finding underneath it: **the "final 20%" window that the catch detectors measure is
contaminated by card text on 264 pages**, where related-articles boilerplate is more than half
the tail. `detect-gospel-absence.js` and `detect-multiplied-close.js` already strip it, so
their numbers are trustworthy. **Any new detector that measures a tail window must strip it
too.** That is the reusable law, not the page count.

---

## §SCRIPTURE — CLOSE THE GAP BY CONSTRUCTION, NOT BY AUDIT

S205 shipped seven quotations CHECK 17 structurally cannot see and got lucky. Its remedy was
to verify after each wave. **S206 adopted a better one and it should be standard: pre-verify
anchor verses for each assigned territory, paste the verbatim NIV into the agent's own prompt,
and forbid verbatim quotation of anything else.** Any other verse may be referenced by name
and never quoted. That makes the failure impossible rather than detectable. All five prompts
in `archive/S207-agent-prompts.md` are already built this way.

Two operational facts, each learned at cost:

- **`scripture-niv.js` holds 992 refs, and its `Matthew 21:33-46` entry is a summary, not
  verbatim NIV.** Do not quote that one. Check the shape of an entry before trusting it.
- **Bible Gateway multi-passage URLs spanning multiple books return no passage text at all** —
  neither the plain nor the `interface=print` variant. Single-book multi-passage works fine
  (`Luke 22:31-34;Luke 22:54-62;John 18:15-18` returned everything). **Fetch by book.** Output
  spills to a file; grep it rather than reading it, or hand the file to a cheap subagent.

---

## LANE A — 380, and 130 untagged

Detector-clean + spot cold-read of **opener and close only** against the landing-force test,
then `node archive/coverage.js stamp <page>.html 207 lifted "confirmed clean — <one clause>"`.
Delegable 10–12 per agent. Cheapest work on the board. **Do not tag by provenance alone.**

---

## NON-NEGOTIABLES

- **Read `CLAUDE.md` and `VOICE.md` in full first.** VOICE.md is 680 lines and the Read tool
  pages it — read the second page. Never sampled. Lead's cost; agents get sections.
- **No label exempts a page from review. No skip-lists.**
- **Waves of 5–6, and reconcile against the filesystem between them.** S205 lost four agents
  to a session cap; S206 lost five to a weekly cap. **An agent transcript cannot tell you how
  many of its Edits landed — only disk can.** Re-run the detectors across the dead agents'
  pages and confirm each is still flagged before launching anything else.
- **GATE 0: do not close below 80% of the context window used.** *(S205 and S206 both failed
  this because compute limits ended the run, not the plan. If it happens again, say so plainly
  rather than padding.)*
- **No git commands. Ever.** Aaron pushes manually.
- **New internal docs go in `archive/`** — covered by the forced `410!` splat at
  `/archive/*`, so files under `archive/kickoffs/` and `archive/*.md` need no new line.
  CHECK 7 is the arbiter; it passed clean this session.
- **`stamp-modified.js` only on pages with real content changes**, and always BEFORE
  `build-sitemap.js`.
- **A check you have never seen fail is not a check. Grep locates; it does not establish.**

---

## CLOSE

```
node archive/session-brief.js                            # lanes must have shrunk
node build-tags.js && node build-all-content.js && node build-search-index.js
node generate-manifest.js && node build-mega-menu.js && node build-homepage-counts.js
node auto-linker.js && node wire-orphans.js
node stamp-modified.js <pages you actually edited>       # BEFORE the sitemap
node build-sitemap.js
node validate-site.js                                    # ALL 21 CHECKS
node canonical-conformance.js
```

Ratchets — lower them, never raise: **CHECK 10 = 469/59** · **CHECK 17 = 62** ·
**CHECK 19 = 5367**. If CHECK 10 reports "down N — run --rebaseline-styles," run it.
Expect CHECK 11 to fail once if `auto-linker.js` added a link; clear with
`node dedupe-prose-links.js`.

Then: coverage stamps, `node archive/coverage.js report`, MISSION-CONTROL Session 207 entry,
roll the oldest live entry to the archive, write `archive/kickoffs/NEXT-SESSION-S208-kickoff.md`,
and end with the fenced push command followed by the fenced kickoff pointer.

**Report the lane deltas to Aaron.** The number is not "pages touched" but **Lane B and Lane A
shrinking**, session over session. S204: 502 → 449. S205: Lane B 78 → 36. S206: Lane C 11 → 9.

One last thing, carried forward because it held for a third session. The pages that moved were
the ones where the writer noticed what the page was **already carrying** — a fire, a hill, a
shepherd, a cracked lens — and put the Savior inside it. The ones that fail are the ones that
arrive with a cross bolted on from outside. A page shipped flat is a door that opens onto a wall.
