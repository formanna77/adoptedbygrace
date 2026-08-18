# SESSION 210 — KICKOFF

## WHERE S209 LEFT IT

**Four of the seven Lane C pages never had the defect — the instrument did.** Three
detectors were counting card rails as prose for one structural reason, and fixing that
reason took `the-two-arms` off both queues without a word of it being rewritten.
17 pages shipped: 12 from three factory agents (all three survived), 5 by hand. All 21
checks green, three ratchets lowered, none raised.

| | S208 close | S209 close |
|---|---|---|
| **Lane C** rebuild | 7 | **3** |
| **Lane B** surgical | 14 | **12** |
| **Lane A** confirm | 389 | 371 |
| gospel-absence | 13 | **5** |
| multiplied-close | 6 | **4** |
| feeling-slip | 9 | **7 SLIP + 2 LAUNDERED** |
| §XXIII coverage | 227 | **240** |

Ratchets — three lowered: **CHECK 10 = 466/59** · **CHECK 17 = 61** · **CHECK 19 = 5261.**

---

## FIRST TWO COMMANDS

```
node archive/session-brief.js
node archive/make-factory-brief.js feeling-slip all
```

---

## §THE SINGLE MOST USEFUL THING ON THIS PAGE

**Launch five agents in the first wave, not three.** S209 ended with context to spare
and three of five briefable agents run — the limiting factor was the lead's own
verification loop, not a compute cap. The whole factory shape exists so the lead is not
the bottleneck. Brief five, launch five, then do the detector work while they run.

Lane B roster is 12 pages: **feeling-slip 7** (two batches) · **gospel-absence 4**
(`compare-calvinism-molinism`, `start-here-phase4`, `story-the-room-where-you-chose`,
`invisible-wall-prayer-feels-empty`) · **multiplied-close 1**
(`philosophy-copernican-revolution`). That is four agents' worth. Give the fifth a
**Lane A confirm run of 10–12 pages** — the cheapest work on the board and it has not
been delegated in four sessions.

The S209 lead gate is on disk and reusable: `archive/s209-splice.js` (rename per
session) refuses on `count(anchor) != 1`, rejects a region that escapes `<article>` or
contains furniture, verifies every `href` against `PAGE-MANIFEST.txt`, checks tag
balance. `archive/s209-scripture-gate.js` diffs every quotation against
`scripture-niv.js`. **Run both before splicing. The splicer's three link WARNs became
CHECK 11's three errors verbatim — a gate that predicts the failure beats one that
catches it.**

---

## §THE DETECTOR LAW IS SETTLED. STOP ADDING NAMES TO LISTS.

S206, S207 and S208 each added a missing container name to an allowlist. S209 found the
same bug in two more places on the same day and replaced the habit with three structural
rules, now shared by `detect-gospel-absence.js` and `detect-multiplied-close.js`:

1. **An `<a>` that wraps block-level elements is a card, never prose.** No writer puts a
   `<div>` inside a sentence.
2. **The suffix rule** — a class whose last segment is `-title` / `-desc` / `-tag` /
   `-label` / `-cat` / `-arrow` / `-eyebrow` / `-meta` / `-badge` / `-number` / `-read`
   is a card part, whatever the component is called. `-body` and `-verse` are
   deliberately excluded: `fork-body` and `panel-body` hold real prose.
3. **The heading rule** — some furniture has no class at all ( `analogy-chess-grandmaster`
   closes with a class-less, inline-styled "Continue Your Journey" rail whose anchors
   `dedupe-prose-links.js` had already unwrapped, making it invisible to 1 and 2 at
   once). Truncate at a furniture heading, **guarded**: only when no paragraph of 25+
   words follows, because `psychology-autonomy-illusion` puts its real catch under
   "Where to Go Next".

**Two lessons worth more than the rules.**

> **The order of a fix is part of the fix.** Rule 1 was first placed before the
> balanced-tag excision it was meant to back up. Blanking an `<a>` containing a `<div>`
> removes an opening tag whose closer survives, the depth count goes negative, and the
> `keep-reading` rail stops being excised. The body GREW 1786w → 1821w and the "catch"
> window ended on card text. **Summary counts did not move.** It would have shipped.

> **Plant the injected defect where the instrument is actually looking.** Two S209
> injection tests landed in regions the detector had already truncated, proved nothing,
> and looked like passes. The valid ones: a card rail planted mid-prose gave the pre-fix
> gospel-absence detector 26 words and **13 free Christ-hits** (post-fix: 0 and 0); four
> extra landings spliced above the real one still score 10 on the fixed close detector.

**And a fourth failure mode that is not a boundary at all — VOCABULARY.**
`apologetic-you-did-not-choose-me` closes on *"a hand it could not see had planted it in the
living Vine"* and the detector said the page never reaches the Savior, because `GOSPEL` knew
*lamb of god* and *high priest* but not *the vine*. Fifteen unambiguous Christ-titles added.
*The rock* and a bare *the shepherd* were deliberately left out — Scripture gives both to the
Father as well, and a triage detector may miss a real absence far more cheaply than it may
clear a page that has one. **When a detector flags a page whose prose you have just read and
found sound, check its vocabulary before you rewrite anything.**

**Still to audit with the same three rules: `archive/session-brief.js`'s freshness-ledger
`closer` extraction.** It is contaminated — the top closer cadence corpus-wide is
**"Read" on 65 pages** (the card-rail "Read →" label) and *"2026 Adopted by Grace Soli
Deo Gloria"* on four (the footer). The ledger is what stops parallel agents converging on
the same image, and its closer column is currently measuring furniture.

---

## §`detect-structural-rot.js` IS NOT A LANE. DO NOT ROUTE IT.

It reports **0 structural rot** across 687 files. The "687 pages" in the S208 kickoff was
the *scanned* count read as a finding. The 124 in the ADVISORY column is secondary
findings: **80** raw-script Greek/Hebrew runs (§XV wants transliteration — a real, low
priority backlog), **51** `</article>`-before-related-articles (site convention, ruled
benign in S206), and 3 genuine defects. S209 fixed one (a link inside a `sop-pullquote`,
§IX.4). The two remaining are `<a>` inside `<h5>` on `secular-economics-depravity` — card
markup, judged not worth breaking a rail for. **Delete the ADVISORY column from the
session brief or relabel it; it has been read as noise for five sessions because it is.**

---

## §THE LAUNDERED CERTIFICATE — the class exists now, and it does not say SLIP

`detect-feeling-slip.js` classifies `LAUNDERED` **in front of** the denial branch: a
denial, a contrastive pivot, and a residue that independently re-issues a certificate.
The rest of the test order is untouched and still load-bearing.

**It deliberately does not fold into SLIP.** §XXIII.2 is explicit that no phrase-grep
separates a slip from a sanctioned interior paragraph, and this site already ruled one
member of the exact shape a sanctioned repair (*"The wanting is not YOUR proof; it is His
fingerprint"*, S183). A column ends the silent clearing — which was the whole defect —
without pretending to a verdict it cannot have. **Hand-read every hit.**

It found one live on the first run, on the doorway built for the frightened:
`for-doubters` closed with *"the doubt you are feeling is not evidence against your
salvation — it is often the sharpest evidence of it. The dead do not wrestle. The unloved
do not grieve the distance. The unchosen do not ache to be chosen. Your fear is a pulse."*
Five certificates and a staccato triple. Repaired. **Two remain standing after a
hand-read and are correct as written** — `shattered-lens-when-prayer-stopped-working`
(a diagnosis-and-refusal) and `systematic-reprobation` (the S183 ruling).

---

## §THE GENERATOR BUG THAT HAS COST `start-here-phase4` TWO SESSIONS

`make-factory-brief.js`'s tail window on that page is **100% furniture** — a 50-line
Knowledge Check quiz, `phase-nav`, and the continue-journey rail — so the brief contains
no prose to anchor against, and an agent that obeys "never anchor inside furniture"
correctly refuses to write it. **Raise `TAIL_FRACTION`, or cut from the last `<h2>` above
`knowledge-check`.** This is the same corollary in a fourth costume: the brief generator
counts furniture as prose exactly as the three detectors did. **Fix the generator with
the same three rules and the problem stops recurring.**

---

## LANE C — the three that remain (lead writes these; never delegated)

`the-fork` (7) · `story-the-room-where-you-chose` (7) ·
`invisible-wall-prayer-feels-empty` (7, doxology+callout+hammer)

Four came off in S209. **`the-two-arms` and `apologetic-you-did-not-choose-me` came off by
measurement alone** — the first was scoring its own pair-card diagram, the second lands on
*the living Vine* and the detector did not know the title. `analogy-chess-grandmaster` and
`story-real-conversions` were rebuilt by hand. **`the-fork` and `story-the-room-where-you-chose`
both score 7 with `callout` in the mix; on this site that is often a styled component
rather than a fourth landing. Re-measure before writing.** `the-fork` is a branching
widget, not a linear prose page — S180 already ruled its `fork-actions` button rails
furniture; check whether what is left is real.

Two of the five carry **feeling-slip** as well as gospel-absence. Write those with
§XXIII.3 open in front of you.

---

## §STILL UNWORKED — the §XV seam nobody has mined

The NIV renders John 18:18 as "a fire" and John 21:9 as "a fire of burning coals"; both
are *anthrakia*, twice in the New Testament, both in John, once where Peter denied Him and
once where Jesus made him breakfast. **There are more of these.** When a page's argument
leans on a word, check whether the NIV is flattening something. Luke 22:32 — *"and **when**
you have turned back"* — is still the cleanest compatibilism proof text on the board and
still unused. **Not in `scripture-niv.js`; ground-truth it before any agent may quote it.**

And there is now an 80-page queue for §XV: every page carrying raw-script Greek or Hebrew
(`node detect-structural-rot.js --verbose | grep raw-script`). §XV wants transliterated
and italic. That is a real, delegable, mechanical lane nobody has claimed.

---

## LANE A — 371, and 127 untagged

Detector-clean + spot cold-read of **opener and close only** against the landing-force
test, then
`node archive/coverage.js stamp <page>.html 210 lifted "confirmed clean — <clause>"`.
Delegable 10–12 per agent. **Delegate it this time.** Do not tag by provenance alone.

---

## NON-NEGOTIABLES

- **Read `CLAUDE.md` and `VOICE.md` in full first.** VOICE.md is 679 lines and the Read
  tool pages it — read the second page. Never sampled.
- **No label exempts a page from review. No skip-lists.**
- **Waves of 5–6, and reconcile against the filesystem between them.** Assume you will
  lose some. Agents write `ANCHOR:`/`END_ANCHOR:`/`REPLACEMENT:` to a file **after each
  page, not at the end** — that change is why all 12 S209 pages landed.
- **Moving files container → device:** one gzipped tarball through `SendUserFile` +
  `device_commit_files`. Base64 through `device_bash` costs ~10K tokens for 19KB and
  buys nothing. `device_bash` cannot `rm`; `mv` into `archive/_to_delete/`.
- **GATE 0: do not close below 80% of the context window used.**
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
a death · the silent defendant before Pilate · Thomas and the kept wounds · the cornerstone
the builders rejected · the firstborn among many brothers · the prepared place and the
Bridegroom · the kernel of wheat that falls and dies · **the High Priest who prayed and was
not spared (S209 — Heb 5:7, 4:15-16, 7:25, now spent across four pages)** · **the player who
came down onto the board (S209)**.

**Spent late in S209, so do not reuse it:** *the verdict already entered in a joined case*
(Romans 4:25 — raised FOR our justification; `story-real-conversions`).

**Unspent, and worth a session's best page:** *the firstborn among the dead as the one who
went in first* — not the legal angle, which is now spent, but the ordinal one: someone has
already been through the door you are afraid of, and came back out. Ground-truth
Colossians 1:18 and 1 Corinthians 15:20 first; neither is in `scripture-niv.js`.

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

Ratchets — lower them, never raise: **CHECK 10 = 466/59** · **CHECK 17 = 61** ·
**CHECK 19 = 5261**. Expect CHECK 11 to fail once if `auto-linker.js` added a link; clear
with `node dedupe-prose-links.js`. **If CHECK 19 rises right after a rebuild, look for a
Scripture paraphrase written in the verse's own cadence** — that is what did it in S209,
and recasting it in plain speech fixed the ratchet and a §V.2 violation at the same time.

Then: coverage stamps, `node archive/coverage.js report`, MISSION-CONTROL Session 210
entry, roll the oldest live entry to the archive, write
`archive/kickoffs/NEXT-SESSION-S211-kickoff.md`, and end with the fenced push command
followed by the fenced kickoff pointer.

**Report the lane deltas to Aaron.** The number is not "pages touched" but Lane B and
Lane A shrinking, session over session. S206: Lane C 11 → 9. S207: Lane B 35 → 28.
S208: Lane B 28 → 14, multiplied-close 16 → 6. S209: Lane C 7 → 5, Lane B 14 → 10,
gospel-absence 13 → 7 — **and two of those came off by measurement, not by writing.**

One last thing, carried forward because it has held for a sixth session. The pages that
moved were the ones where the writer noticed what the page was **already carrying** — a
courtroom, a buried seed, a chair nobody paid for, a chessboard with an empty chair — and
put the Savior inside it. The ones that fail arrive with a cross bolted on from outside.
A page shipped flat is a door that opens onto a wall.
