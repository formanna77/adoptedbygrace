# SESSION 209 — KICKOFF

## WHERE S208 LEFT IT

**A detector that routes work was counting the card rail as the page's ending, and
the slip no detector can see was found running inside six live catches — one of them
on the doorway built for skeptics.** 22 pages shipped: 16 from four factory agents
that survived a session compute cap, 6 §XXIII repairs by hand. All 21 checks green,
two ratchets lowered, none raised.

| | S207 close | S208 close |
|---|---|---|
| **Lane C** rebuild | 8 | **7** |
| **Lane B** surgical | 28 | **14** |
| **Lane A** confirm | 377 | 389 |
| gospel-absence | 17 | **13** |
| multiplied-close | 16 | **6** |
| feeling-slip | 8 | 9 |
| §XXIII coverage | 211 | **227** |

Ratchets — two lowered: **CHECK 10 = 468/59** · **CHECK 17 = 62** · **CHECK 19 = 5329.**

---

## FIRST TWO COMMANDS

```
node archive/session-brief.js
node archive/make-factory-brief.js gospel-absence all
```

---

## §THE SINGLE MOST USEFUL THING ON THIS PAGE

**`gospel-absence-batch-1` has now had its agent die mid-run three sessions in a row.**
The prompt is written, the territory is unspent, the Scripture is ground-truthed. Pages:
`shattered-lens-pastor` · `shattered-lens-silence-of-god` ·
`shattered-lens-when-prayer-stopped-working` · `start-here-phase1` · `start-here-phase4`.

Territory: **the High Priest who prayed and was not spared — and the throne you can now
walk up to.** The seam: all five are written for a reader whose *access* feels broken.
The answer is not "pray harder." It is that the one who represents you prayed with a
breaking voice, was refused what He asked, and the text says **he was heard.** Being
heard and being spared are different things.

Verified NIV, quote only these: **Hebrews 5:7** · **Hebrews 4:15-16** · **Hebrews 7:25**.

**Launch it first, in the first wave, before anything else.** Three sessions of it
sitting at the front of the queue is three sessions of the same five pages waiting.

---

## §THE DETECTOR LAW, NOW WITH ITS COROLLARY — AND THE AUDIT S209 OWES

Three sessions running, a detector has been counting furniture as prose:

- S206 — nav and related-article cards inside `detect-feeling-slip.js`.
- S207 — block tags welded to the text beneath them, same detector.
- S208 — **`detect-multiplied-close.js` scoring the cross-link card rail as eight
  consecutive hammer closes.** `compare-monergism-synergism` scored 16 on a one-beat
  close. `compare-calvinism-molinism` sat on **Lane C** for sessions without ever
  having the defect.

Two bugs, one structural. `TRAILING_FURNITURE` is an *allowlist of container names*, and
`<div class="cross-links">` was never on it — but the deeper one is that **`bodyOf()`
never stopped at `</article>`**, so nine pages ran their "article body" into the site
footer and scored `.footer-section` as a close. Both fixed; `</article>` is now a hard
boundary and the allowlist is a second line of defence.

> **The corollary: a fix applied to one detector is not a fix.** Every detector that
> walks the article tail has this failure mode, and an allowlist guarantees it recurs
> the moment a new component ships.

**P1 for S209 — audit `detect-gospel-absence.js` and `detect-structural-rot.js` for the
same `</article>` boundary bug.** `detect-structural-rot.js` currently reports **687
pages**, which is every file on the site including non-prose. A detector that flags
everything is reporting nothing, and it has been sitting in the ADVISORY column for
several sessions being read as noise. Find out what it is actually measuring before the
next session treats it as a lane.

And when you fix one: **prove it can still fail.** Inject the defect into a clean page,
confirm the score, revert, confirm the score drops. S208's fix was proven both
directions (12 injected, 2 reverted). A check you have never seen fail is not a check.

---

## §THE SLIP AS A PAGE'S ENGINE — WHY THE DETECTOR CLEARS IT, AND THE FIX TO MAKE

S207 assigned this hunt. Six live certificates were found, and **`detect-feeling-slip.js`
cleared every one of them.** The reason is precise and fixable.

Its test order is REPUDIATE/DENIED → STRONG_ELECT → DEPRAVE → ELECT+GOD_REF, and
REPUDIATE fires first. Every one of the six carries a denial in the same sentence —
**of a different proposition**:

> *"The ache you feel for a God you think you have lost is not evidence that you have
> been abandoned — it is the trace of having been reached."*

That denies abandonment and issues a certificate, and the `not evidence` token launders
it through the first branch. **A denial does not launder a certificate. The detector must
check what the denial denies.**

**P1 for S209.** The likely shape: REPUDIATE should only clear a sentence when the
denied object is itself in `ELECT`/`STRONG_ELECT` — a denial whose object is in some
other class is not a repudiation, it is a setup. Guard it exactly as §XXIII.2 guards the
token lists, and re-run the six repaired pages as a regression set: they must stay clean,
and the pre-repair versions (in git history) must score.

**Until it is fixed this class is hand-work.** The grep that found all six: an
interior-state subject (*the ache / your fear / the fact that you…*) followed by an
evidence predicate (*proves / is evidence / is the sign / means you*), minus a genuine
repudiation. 27 candidates across 687 files; 18 were the corpus correctly naming the
comfort in order to refuse it. **Check hero subtitles, In Briefs, meta descriptions and
pullquotes as well as prose — a repaired catch above an unrepaired meta description is a
page that contradicts itself three inches apart.**

---

## §THE FACTORY — KEEP THE SHAPE THAT SURVIVED THE CAP

Four of five agents were killed mid-run by a session compute cap. **Three of the four had
already written their output files**, and 16 of 21 briefed pages shipped anyway.

That is entirely because of the S207 shape, now proven under failure: **agents cannot
reach the repository, so they return `ANCHOR:` / `END_ANCHOR:` / `REPLACEMENT:` prose,
written to a file, and the lead splices.** The file-write is the load-bearing part — it
lands a durable artifact at the end of the agent's *work*, not the end of its *session*.
Under a direct-Edit factory, four dead agents are four total losses.

**Mechanics that worked, keep all of them:**

- Write the shared block to one file and hand every agent its path. It costs the lead
  almost nothing and every agent gets the whole law.
- Stage the brief files into the container the agents can read; **do not paste briefs
  into prompts.**
- Give every agent `PAGE-MANIFEST.txt` (`ls *.html | sed 's/\.html$//' | sort`) and make
  link verification a `grep -x` against it.
- Splice with a script that refuses on `count(anchor) != 1`. All 16 were unique and every
  splice applied first time.

**And run the lead gate — it caught five defects every agent had self-reported clean:**
a new duplicate prose link (CHECK 11 regression), an invented terminal period on
Ephesians 5:25 (which runs on into v26 and has none), a lowercased first letter of
1 Peter 2:8 to fit a sentence, and two told-superlatives. **An agent verifying its own
Scripture checks it against the brief, not against `scripture-niv.js` — punctuation and
capitalisation survive that check intact.** Verify every quotation against the ground
truth yourself, and check for duplicate links *before* splicing, not after.

---

## §THE TRAP S208 FELL INTO — DO NOT REPEAT IT

Two cross-link cards on `analogy-orchestra` rendered with no `<a>` wrapper. They looked
like dead cards and were "repaired." CHECK 11 failed immediately.

**A stripped anchor inside a card rail is the intended output of
`dedupe-prose-links.js`** — it unwraps the second link to a concept the prose already
links once. It is the deduper working, not a bug. Reverted by re-running the deduper.

---

## LANE C — the seven that remain (lead writes these; never delegated)

`analogy-chess-grandmaster` · `apologetic-you-did-not-choose-me` ·
`invisible-wall-prayer-feels-empty` · `story-real-conversions` ·
`story-the-room-where-you-chose` · `the-fork` · `the-two-arms`

`compare-calvinism-molinism` came off this list in S208 — not by being rebuilt, but by the
detector fix proving it never had the defect. **Re-check the remaining seven against the
corrected detector before writing any of them.** `the-two-arms` (13) and
`analogy-chess-grandmaster` (11) still score high and are worth confirming by hand first;
`the-fork` and `story-the-room-where-you-chose` both score 7 with `callout` in the mix,
which on this site is often a styled component rather than a fourth landing.

Two Lane C pages — `apologetic-you-did-not-choose-me` and `story-real-conversions` — carry
**feeling-slip** in their defect set. Write those two with §XXIII.3 open in front of you.

---

## §STILL UNWORKED — the §XV seam nobody has mined

The NIV renders John 18:18 as "a fire" and John 21:9 as "a fire of burning coals"; both
are *anthrakia*, twice in the New Testament, both in John, once where Peter denied Him and
once where Jesus made him breakfast. **There are more of these.** When a page's argument
leans on a word, check whether the NIV is flattening something. Luke 22:32 — *"and **when**
you have turned back"* — is still the cleanest compatibilism proof text on the board and
still unused. **Note:** Luke 22:32 is **not** in `scripture-niv.js`; ground-truth it before
any agent is permitted to quote it.

---

## LANE A — 389, and 131 untagged

Detector-clean + spot cold-read of **opener and close only** against the landing-force
test, then
`node archive/coverage.js stamp <page>.html 209 lifted "confirmed clean — <clause>"`.
Delegable 10–12 per agent. Cheapest work on the board. **Do not tag by provenance alone.**

---

## NON-NEGOTIABLES

- **Read `CLAUDE.md` and `VOICE.md` in full first.** VOICE.md is 679 lines and the Read
  tool pages it — read the second page. Never sampled.
- **No label exempts a page from review. No skip-lists.**
- **Waves of 5–6, and reconcile against the filesystem between them.** S205 lost four
  agents to a session cap, S206 five to a weekly cap, S207 three, S208 four.
  **Assume you will lose some.** Write Lane C first — it is the one lane a compute
  failure cannot take from you.
- **GATE 0: do not close below 80% of the context window used.** *(S205–S208 all failed
  this because compute limits ended the run, not the plan. If it happens again, say so
  plainly rather than padding.)*
- **No git commands. Ever.** Aaron pushes manually.
- **New internal docs go in `archive/`** — covered by the forced `410!` splat.
- **`stamp-modified.js` only on pages with real content changes**, always BEFORE
  `build-sitemap.js`.
- **A check you have never seen fail is not a check. Grep locates; it does not establish.**

---

## CHRISTOLOGICAL TERRITORIES — SPENT, DO NOT REUSE

the ransom paid · the great exchange · Gethsemane and the cup · the empty tomb as a unit of
measurement · the living intercession · the descent into a body · the Good Shepherd's double
grip · the Shepherd laying down His life · the sin-bearer and public shame · the Man of
Sorrows rejected by His own · love demonstrated not declared · the firstfruits and the death
of death · the Logos outside the system · Golgotha and the wrong man · two intercessors ·
the destroyer reading the doorframe · Jesus weeping outside the grave · the bronze serpent ·
the certificate of debt nailed up · the priest who sat down · the second Adam and federal
headship · the face set toward Jerusalem · the Passover lamb chosen early · the charcoal fire
and Peter's two promises · the Lamb slain from the creation of the world · captivity broken by
a death · the silent defendant before Pilate · Thomas and the kept wounds · **the cornerstone
the builders rejected (S208)** · **the firstborn among many brothers (S208)** · **the prepared
place and the Bridegroom (S208)** · **the kernel of wheat that falls and dies (S208)**.

**Unspent and briefed:** the High Priest who prayed and was not spared (Hebrews 5:7,
4:15-16, 7:25).

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

Ratchets — lower them, never raise: **CHECK 10 = 468/59** · **CHECK 17 = 62** ·
**CHECK 19 = 5329**. Expect CHECK 11 to fail once if `auto-linker.js` added a link; clear
with `node dedupe-prose-links.js`.

Then: coverage stamps, `node archive/coverage.js report`, MISSION-CONTROL Session 209
entry, roll the oldest live entry to the archive, write
`archive/kickoffs/NEXT-SESSION-S210-kickoff.md`, and end with the fenced push command
followed by the fenced kickoff pointer.

**Report the lane deltas to Aaron.** The number is not "pages touched" but Lane B and Lane
A shrinking, session over session. S205: Lane B 78 → 36. S206: Lane C 11 → 9. S207: Lane B
35 → 28. S208: Lane B 28 → 14, multiplied-close 16 → 6.

One last thing, carried forward because it has held for a fifth session. The pages that
moved were the ones where the writer noticed what the page was **already carrying** — a
courtroom, a buried seed, a chair nobody paid for, a stone the professionals threw away —
and put the Savior inside it. The ones that fail arrive with a cross bolted on from
outside. A page shipped flat is a door that opens onto a wall.
