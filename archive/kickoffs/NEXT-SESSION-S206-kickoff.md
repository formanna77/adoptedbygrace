# SESSION 206 — KICKOFF

## WHERE S205 LEFT IT

**41 pages shipped, all 21 checks green, and the session was cut off mid-flight by an
API session limit rather than by running out of work.** Gospel-absence **67 → 24**.
Lane B **78 → 36**. The factory model is proven twice over now; do not re-derive it.

| | S204 close | S205 close |
|---|---|---|
| **Lane C** rebuild | 11 | **11** (untouched — compute) |
| **Lane B** surgical | 78 | **36** |
| **Lane A** confirm | 375 | 377 |
| gospel-absence | 67 | **24** |
| multiplied-close | 22 | 22 |
| feeling-slip | 11 | 12 (one is a known false positive — see §FP) |

Ratchets moved: **CHECK 19 lowered 5369 → 5367.** CHECK 10 (471/60) and CHECK 17 (62)
unchanged, none added.

---

## FIRST TWO COMMANDS

```
node archive/session-brief.js
node archive/make-factory-brief.js gospel-absence all
```

Re-run `make-factory-brief.js` for every class you intend to work. **The briefs on disk
are stale for gospel-absence** — S205 cleared 40 of its 56 pages, so the old batch files
describe a partition that no longer exists. The multiplied-close and feeling-slip briefs
were generated in S205 and never consumed; they are still accurate, but regenerate anyway
rather than trusting that sentence.

---

## §THE ONE THING THAT COST S205 ITS SECOND HALF

**Six agents launched in one message is the safe ceiling. Twelve in a session is not.**

Wave 1 (6 agents, 30 pages) returned complete. Wave 2 launched 6 more and **four of them
were killed by `You've hit your session limit` partway through.** Two of the four had
already printed "Now the edits" before dying — which is the exact scenario the S204
kickoff warned is *more* dangerous than dying early.

**They landed nothing. Verified, not assumed.** The first action on resuming was a
damage assessment: re-run the detector and confirm every page in batches 9–12 was still
flagged and still identical. It was. But that verification is not optional and it is not
inferable from the agent transcript — an agent that says "now the edits" and dies may
have landed one, three, or five of them, and the report you never received is the only
place that would have said so. **Reconcile the roster against the filesystem, not against
what the agents told you.**

Practical consequence for you: **run waves of 5–6 and check the board between them.**
If a wave comes back with deaths, do the damage sweep before launching anything else.

---

## §FP — THE FEELING-SLIP FLAG ON `question-predestined-to-hell` IS A FALSE POSITIVE

Do not "fix" it. It will cost you an hour and make the page worse.

The flagged sentence hands the reader the standard comfort — *your fear itself proves you
are chosen* — **in order to refuse it**, and the refusal lands in the next two sentences
("Set it down. It is a certificate issued on the strength of a mood, and it is refused
here." / "Dread is not a credential…"). That is §XXIII.3 move 3, *name the trick and
refuse it out loud*, and §XXIII.1 classifies it as **MODEL**, not slip.

`detect-feeling-slip.js` cannot see it, and this is structural rather than a bug:
§XXIII.2 says outright that *no phrase-grep separates a slip from a sanctioned interior
paragraph, because the words are identical and only the object differs.* The detector's
repudiation test only inspects the matched span; a refusal that arrives in the following
sentence is invisible to it. Tightening the prose to put the refusal *inside* the matched
span was tried in S205 and the detector still flagged it.

**The general form: when a triage tool and a hand-read disagree about prose, the hand-read
wins — that is what "TRIAGE, NOT VERDICT" in its own header means.** Record the exception;
do not deform the page to make a scanner quiet.

**And the reason the flag was still worth having:** chasing it turned up a *real* §XXIII
slip two sentences below, on the same doorway page — *"If you want Him, He has already
wanted you… If you are reaching for Him, it is because He reached for you first."* A
textbook tender conditional (§XXIII.2), which refuses fear as a credential and then
quietly installs *wanting* as one, locking out the numb reader who most needs the door.
Repaired in S205 by relocating the ground to John 15:16's past-tense verb and covering the
reader who feels nothing in the same breath. **The detector was wrong about the sentence
it named and right that the passage needed a human.**

---

## §THE CHECK 19 TRAP — LOCATE BEFORE YOU REWRITE

CHECK 19 failed at close: **5382 across 295 passages, ceiling 5369.** The obvious
inference — 40 new paragraphs of new prose pushed it up — was wrong, and acting on it
would have meant rewriting good new work.

Two false leads were followed first: a Colossians 2:14 clause the batch-2 agent had reused
across five of its own pages (real over-repetition, genuinely worth fixing, **moved the
number zero**), and a John 3:14-15 quotation the batch-1 agent had put verbatim on two
pages of its own batch (also real, also worth fixing, **also moved it zero** — quoted
Scripture is suppressed by the detector).

The actual culprit: a **15-word rhetorical clone that had sat on `question-dead-in-sin-meaning`
and `question-freewill` for months** — *"you are aware. You see holiness. And you choose
something else. Every single time."* — which only crossed the reporting threshold when the
surrounding prose grew. It was found by computing shared 11-grams across only the edited
pages and filtering for pairs, not by reading the report, which never printed it.

Two things worth keeping:
1. **A ratchet failure after a large write is not evidence the write caused it.** Locate
   the passage computationally before you touch a word of new prose.
2. **The cloned copy also carried "Every. Single. Time."** — the staccato triple, banned
   twice over (§XIII.1 slogan-trap, §XXII.4 AI tell). The clone and the tell were the same
   sentence, which is not a coincidence: **cloned prose is prose nobody re-saw.** When
   CHECK 19 names a passage, expect to find a second defect sitting in it.

---

## §FRESHNESS — TWENTY-TWO CHRISTOLOGICAL TERRITORIES ARE NOW SPENT

S205 gave each agent a disjoint facet of Christ's work and got eight genuinely different
registers out of it. **All of these are now spent — do not reassign them:**

S204's twelve: the ransom actually paid · the great exchange running both directions ·
Gethsemane and the cup · the empty tomb as a unit of measurement · the living intercession ·
the descent into a body · the Good Shepherd's double grip · the sin-bearer and the public
undoing of shame · the Man of Sorrows rejected by His own · love demonstrated rather than
declared · the firstfruits and the death of death · the Logos as the ground outside the system.

S203's four: Golgotha and the wrong man · two intercessors at each end of the call · the
destroyer reading the doorframe · Jesus weeping outside a grave He is about to open.

**S205's six (all shipped and verified):**
> the bronze serpent lifted (Num 21 / John 3:14) — the cure requiring no diagnostic
> competence · the handwritten certificate of debt nailed up (Col 2:14, *cheirographon*) —
> itemized, agreed, and cancelled · the priest who sat down (Heb 10:11-12) — the tabernacle
> had no chair · the second Adam and federal headship (Rom 5, 1 Cor 15) — condemned in
> absentia, acquitted the same way · the face set toward Jerusalem (Luke 9:51, John 10:18) —
> the freest will in history and where it went · the Passover lamb chosen four days early
> (Ex 12:3-6) — chosen, kept, inspected, and the Lamb chosen *before* the reader was.

**Assigned but never written** (the four agents died before editing) — these are free, and
they were built to fit the exact batches still on the board, so reuse the pairing:
- **the Author who wrote Himself into the book** — was for the secular/consciousness batch
- **the kinsman-redeemer's *go'el* right** (Lev 25, Ruth 4) — was for the bondage/inability batch
- **the temple rebuilt in three days** (John 2:19) — was for the `shattered-lens-*` batch,
  and it is the best fit on the board: a structure predicted down, a body raised, and
  Saturday in between
- **the scapegoat driven out** (Lev 16) — was for the `story-*` batch
- **the firstborn among many brothers** (Rom 8:29) — was for the `systematic-*` batch
- **the seed crushed at the heel** (Gen 3:15) — was for `theologian-sproul`

Still unworked beyond those: the Bridegroom's covenant oath · the veil torn from the top ·
the cornerstone the builders rejected · the Lamb standing as though slain, scars kept.

**Bridges:** drowning **57 — wallpaper, banned** · addiction 16 · Libet 12 · anosognosia 12 ·
lottery 8 · phantom limb 5. **Catch images:** mirror 15 · rope 14 · ringing phone 8 ·
Lazarus 8 · cargo 4 · envelope 3.

**Warn each agent about its own batch, not only about the other agents.** Both S205
collisions were *inside a single agent's five pages*, and neither was caught by the
freshness ledger — one surfaced through CHECK 19 and one only through a hand-written
n-gram scan.

---

## §SCRIPTURE — THE GROUND-TRUTH GAP IS REAL AND YOU MUST CLOSE IT BY HAND

The factory brief resolves every verse a page *already cites* against `scripture-niv.js`.
It cannot resolve a verse an agent decides to quote for the first time — and a new
Christological territory means new verses by definition. S205's agents quoted **John 3:14-15,
Hebrews 10:11-12, Colossians 2:14, 1 Corinthians 15:45, Acts 9:4-5, John 10:18 and Luke 9:51,
none of which exist in the 992-passage ground-truth file.** CHECK 17 cannot see them; it
reported "62 — at the ceiling, none added" while seven unverifiable quotations sat in
freshly-shipped prose.

All seven were verified by hand against Bible Gateway NIV and all seven were verbatim-exact.
**That was luck plus good agents, not a process.** Do the same check every session:
after each wave, grep the added prose for quotation marks, list every reference, and diff
the ones absent from `scripture-niv.js` against a real NIV. Budget one `web_fetch` — a
multi-passage Bible Gateway URL returns them all at once, and `mcp__workspace__web_fetch`
will spill it to a file you can grep rather than read.

---

## LANE C — 11 PAGES, THE LEAD WRITES THEM, AND THEY HAVE NOW SLIPPED TWO SESSIONS

`analogy-chess-grandmaster`, `apologetic-you-did-not-choose-me`, `compare-calvinism-molinism`,
`invisible-wall-prayer-feels-empty`, `objection-desire`, `philosophy-resistance-is-proof`,
`question-how-grace-feels`, `story-real-conversions`, `story-the-room-where-you-chose`,
`the-fork`, `the-two-arms`.

**Do these first this time.** They were deferred in S204 and deferred again in S205, both
times because the factory was producing and the lane that needs the lead's own hands lost
to the lane that does not. That is a bad equilibrium and it will repeat unless you break
it deliberately: **write two Lane C pages before launching a single agent.** Compound
defects — read the whole page, rebuild the spine, and **go to the primary source before
rewriting.** A confident sentence is not an evidenced one.

## LANE A — 377, and 130 untagged

Detector-clean + spot cold-read of **opener and close only** against the landing-force
test, then `node archive/coverage.js stamp <page>.html 206 lifted "confirmed clean — <one clause>"`.
Delegable 10–12 per agent. Cheapest work on the board. **Do not tag by provenance alone.**

---

## NON-NEGOTIABLES

- **Read `CLAUDE.md` and `VOICE.md` in full first.** VOICE.md is 680 lines and the Read
  tool pages it — read the second page. Never sampled. Lead's cost; agents get sections.
- **No label exempts a page from review. No skip-lists.**
- **GATE 0: do not close below 80% of the context window used.** Aim ~85%. *(S205 could not
  meet this — the API session limit ended the run, not the plan. If that happens again,
  say so plainly rather than padding.)*
- **No git commands. Ever.** Aaron pushes manually.
- **New internal docs go in `archive/`** (covered by the forced `410!` splat), never the repo root.
- **`stamp-modified.js` only on pages with real content changes**, and always BEFORE `build-sitemap.js`.
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

Ratchets — lower them, never raise: **CHECK 10 = 471/60** · **CHECK 17 = 62** ·
**CHECK 19 = 5367**. Expect CHECK 11 to fail once if `auto-linker.js` added a link; clear
with `node dedupe-prose-links.js`.

Then: coverage stamps, `node archive/coverage.js report`, MISSION-CONTROL Session 206 entry,
roll the oldest live entry to the archive, write `archive/kickoffs/NEXT-SESSION-S207-kickoff.md`,
add the `410!` line for it in `_redirects`, and end with the fenced push command followed by
the fenced kickoff pointer.

**Report the lane deltas to Aaron.** The number is not "pages touched" but **Lane B and
Lane A shrinking**, session over session. S204: 502 → 449. S205: Lane B 78 → 36.

One last thing, carried forward from S204 because it held again. The 41 pages moved because
each agent had one page's own image in front of it and was asked to find Christ *inside it* —
a spring, a ledger, a cracked lens, a genome, an unanswered prayer. The paragraphs that
worked were the ones that noticed the page was already carrying something and put the Savior
in it. The ones that would have failed are the ones that would have arrived with a cross
bolted on from outside. Keep that. A page shipped flat is a door that opens onto a wall.
