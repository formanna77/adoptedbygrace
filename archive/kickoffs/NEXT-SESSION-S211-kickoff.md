# SESSION 211 — KICKOFF

## WHERE S210 LEFT IT

**Three queues are at zero. The one that matters is the one that was never measured.**
23 pages shipped from six factory agents (all six survived) plus hand work. All 21
checks green, one ratchet lowered, none raised.

| | S209 close | S210 close |
|---|---|---|
| **Lane C** rebuild | 3 | **0** |
| **Lane B** surgical | 12 | **41** ← the instrument improved; see below |
| **Lane A** confirm | 371 | 361 (109 untagged) |
| gospel-absence | 5 | **0** |
| multiplied-close | 4 | **0** |
| feeling-slip | 9 | 40 (5 SLIP/LAUNDERED + **35 PREDICATION**) |
| §XXIII coverage | 240 | **265** |

Ratchets — one lowered: **CHECK 10 = 464/59** · CHECK 17 = 61 · CHECK 19 = 5261.

**Lane B went UP because a new detector branch surfaced 35 previously-invisible hits,
not because 29 defects appeared.** Do not report it as a regression.

---

## FIRST TWO COMMANDS

```
node archive/session-brief.js
node archive/make-laneA-brief.js 12 0
```

Note the second one. It is not the factory brief.

---

## §THE SINGLE MOST USEFUL THING ON THIS PAGE

**Lane A is not the cheap lane. It is the UNMEASURED lane, and it is where the
defects are.**

S210 delegated it twice — 12 pages per run, drawn from the untagged locks, pages every
detector on this site calls clean. Run one: **6 NEEDS-WORK of 12.** Run two, twelve
different pages: **6 of 12.** Four of run one's six were the same defect, all four
invisible to `detect-feeling-slip.js`.

**A 50% live-defect rate in the stratum we call clean** means five sessions of lane
ordering were backwards. The queues only ever showed what the greps already knew how to
name. **Launch two Lane A confirm runs every session, first, before anything else** —
`node archive/make-laneA-brief.js 12 <offset>` builds the brief (opener + close windows
only, extracted through `archive/prose-body.js`, ~26KB), and the agent returns verdicts
plus a `CLAUSE:` you paste straight into the coverage stamp. The lead runs the stamps;
an agent that can write the ledger can corrupt provenance for 361 pages.

**Then brief the repairs with `--pages`.** That mode is new in S210 and exists because
until now there was no way to route a finding a human eye made — the roster came only
from the matrix, so cold-read findings died in a report file.

```
node archive/make-factory-brief.js laneA-repair --pages a,b,c,d
```

---

## SIX PAGES ARE ALREADY DIAGNOSED AND UNREPAIRED — BRIEF THEM FIRST

From S210's second Lane A run. Findings verbatim in `archive/s210-findings-laneA-1.txt`.

- `apologetic-loved-darkness-rather-than-light` — the banned staccato-negation coin,
  *"Men loved the darkness. Not endured it. Not settled for it. Loved it."* Substance is
  sound; the Judge going into the dark after the condemned is the best move in the window.
- `apologetic-lydias-heart` — multiplied close (three consecutive terminal beats), and
  **two word-level errors in live prose**: Lydia is *"a worshipper of God already in some
  unclothed sense"* (nothing supports "unclothed"; the sense wanted is unformed), and the
  close sets the reader's yes *"against the centripetal force of forty more years"* —
  centripetal pulls inward, the opposite of what the image needs.
- `apologetic-the-everlasting-covenant` — feeling-certificate on *"the holy unease you
  feel"*, and no Christ in the catch. Two classes on one page.
- `apologetic-the-unbroken-chain` — the Romans 8:29 catch names the Father and the Spirit
  and never the Son.
- `argument-arminianism-secretly-assumes-calvinism` — a four-sentence reading list
  occupies the final 20%, then three more landings.
- `broken-mirror-vessels-for-mercy` — six landings, two verse callouts inside one close,
  final line a participle list.

**And a corpus-level watch item, live:** five of the twelve closes in that run reach for
the same *"your grip"* image. That is exactly the §XXI.1 risk — the second use is craft,
the fortieth is wallpaper. Grep it before any agent writes another catch.

---

## §THE 35 PREDICATION HITS — HAND-READ, DO NOT BULK-FIX

`detect-feeling-slip.js` gained a branch that keys on **grammar, not phrases**: an
interior-state noun as the subject of a copula whose predicate is a divine person, an
evidential noun, or a negated mundane cause (*"That ache is not coincidence, and it is
not personality"* — denying every natural explanation IS the supernatural claim).

Precision measured ~50% on a hand sample. **It is its own column and deliberately does
not say SLIP**, for the reason §XXIII.2 gives: no phrase-grep separates a slip from a
sanctioned interior paragraph. Every hit needs an eye. Known false-positive shapes:
doctrinal exposition about the drawing itself (*"The drawing is God's."*), and sentences
that deny rather than assert.

Two tightenings already applied took it 59 → 35 at no cost to recall. **If you tighten
further, re-run the recall test first** — the four known-positive pages are
`apologetic-darkened-in-their-understanding`, `apologetic-a-slave-to-sin`,
`apologetic-arrabon-the-down-payment`, `apologetic-born-not-of-human-will` (all now
repaired, so use `git`-free copies or pick fresh positives from the queue).

---

## §THE LESSON THAT KEEPS COSTING SESSIONS, NOW IN ITS FIFTH COSTUME

**A new instrument placed behind the old filter inherits the old filter's blindness.**

`copulaPredication()` returned **true on three of four known certificates** and the
detector still reported all four pages clean — because `scan()` runs
`if (!TRIGGER.test(s)) continue` before any verdict, and TRIGGER is the phrase
enumeration the new branch exists to get past. It looked like the branch did not work.

Same session, same shape, three more times:
- `make-factory-brief.js` truncated at a five-name `BOUNDARIES` list, so
  `start-here-phase4`'s brief was 100% furniture and two sessions produced nothing on it.
- The freshness ledger's closer column read the raw body, so the top closing cadence
  corpus-wide was **"Read" on 65 pages** (a card rail) and the site footer on four.
- The splice gate's tag check measured a proxy (self-balance, then balance-delta) and
  rejected three of five *correct* replacements before being rewritten to splice the
  document and compare the article's tag signature before and after.

**All four are now routed through `archive/prose-body.js` — the single implementation of
the prose/furniture boundary.** If you write a fifth consumer, require that module. Do
not copy the rules.

---

## §THE GATES ARE ON DISK AND PROVEN TO FAIL

`archive/s210-splice.js` — anchor uniqueness, region-inside-`<article>`, furniture
rejection, link verification against `PAGE-MANIFEST.txt`, emoji in **four** encodings,
forbidden moves, tag-signature equality, **and GATE 5: the replacement itself scanned for
fresh feeling-certificates.** `archive/s210-scripture-gate.js` — every quotation diffed
against `scripture-niv.js`, attribute values stripped first so `href`s stop reading as
quotations.

Rename to `s211-*`, point `S210_OUT` at your output dir (the env override exists so the
gate can be probed), and **plant a defect in each gate before you trust a clean run.**
S210 fired all five by name on planted defects, including `&#128270;` — a magnifying
glass as a decimal HTML entity, pure ASCII in the source, the encoding that walked past
every codepoint sweep the site has ever run.

---

## §RESIDUALS — SMALL, REAL, RECORDED NOT FIXED

1. **19 pages carry no skip-to-content anchor**: the 15 `printable-*`, `printables.html`,
   `quote-cards.html`, `the-breath-prayer.html`, `_nav-template.html`. The three
   non-printables are real reader-facing pages. `fix-skip-links.js` skips them.
2. **The S203 phone-probe rule needs a carve-out.** "Report a clip root that truncates
   its own text without `text-overflow: ellipsis`" **fires on the standard visually-hidden
   pattern by construction** — `width:1px;height:1px;overflow:hidden` clips its own text on
   purpose. Exempt boxes of ≤1px or positioned at `left:-9999px`. The rule is right; it is
   missing that clause, and it cost S210 a false lead.
3. **Stale factory briefs from S204–S209 are still in `archive/factory-briefs/`** and
   describe pages long since repaired. A session that grabs `gospel-absence-batch-10.md`
   will do dead work. Move them to `archive/_to_delete/` (`device_bash` cannot `rm`).
4. **The §XV raw-script queue: 80 pages** carrying raw Greek/Hebrew where §XV wants
   transliteration in italics. `node detect-structural-rot.js --verbose | grep raw-script`.
   Mechanical, delegable, unclaimed for four sessions.
5. `detect-structural-rot.js` reports **0 structural rot**. Its ADVISORY column is not a
   lane and has been read as noise for six sessions. Relabel it or delete it.

---

## §STILL UNWORKED — the §XV seam

Luke 22:32 — *"and **when** you have turned back"* — remains the cleanest compatibilism
proof text on the board and is still unused. **Not in `scripture-niv.js`; ground-truth it
before any agent may quote it.** Same for the *anthrakia* pair (John 18:18 / 21:9, "a
fire" and "a fire of burning coals" — the same charcoal fire where Peter denied Him and
where Jesus made him breakfast), though *the charcoal fire* territory is spent.

---

## NON-NEGOTIABLES

- **Read `CLAUDE.md` and `VOICE.md` in full first.** VOICE.md is 679 lines; read the
  second page. Never sampled.
- **No label exempts a page from review. No skip-lists.**
- **Waves of 5–6, reconcile against the filesystem between them.** Agents write
  `ANCHOR:` / `END_ANCHOR` / `REPLACEMENT:` / `END_REPLACEMENT` to a file **after each
  page, not at the end.**
- **Re-run EVERY detector after splicing, not only the one whose class you fixed.**
  S210 caused three regressions this way and caught all three: a gospel repair stacked a
  fourth landing, and two close-repairs each removed a page's only Christ-token.
- **Moving files container → device:** one gzipped tarball through `SendUserFile` +
  `device_commit_files`. `device_bash` cannot `rm`; `mv` into `archive/_to_delete/`.
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
Bridegroom · the kernel of wheat that falls and dies · the High Priest who prayed and was not
spared · the player who came down onto the board · the verdict already entered in a joined
case · the living Vine.

**Spent in S210, so do not reuse:** *election's address* (the plan was never a world, it was
a Son) · *the weapon that was never a weapon* (John 3:16's main verb is **gave**) · *the
centre that came out to the edge* (a Copernican revolution corrects the account and moves
nothing; this one moved) · *the prayer that received no answer* (the cry of dereliction) ·
*the only person who ever decided to be born* · *the knot at the end of the rope* · *the
manumitter's signature* · *the payer's solvency* · *He is where God keeps His chosen*.

**Unspent, and worth a session's best page:** *the firstborn among the dead as the one who
went in first* — not the legal angle, which is spent, but the ordinal one: someone has
already been through the door you are afraid of, and came back out. Ground-truth
Colossians 1:18 and 1 Corinthians 15:20 first; **neither is in `scripture-niv.js`.**

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

Then: coverage stamps (`node archive/coverage.js stamp <page>.html 211 lifted "<clause>"`),
`node archive/coverage.js report`, MISSION-CONTROL Session 211 entry, roll the oldest live
entry to the archive, write `archive/kickoffs/NEXT-SESSION-S212-kickoff.md`, and end with
the fenced push command followed by the fenced kickoff pointer.

**Report the lane deltas to Aaron.** S206: Lane C 11 → 9. S207: Lane B 35 → 28. S208:
Lane B 28 → 14. S209: Lane C 7 → 3, gospel-absence 13 → 5. S210: Lane C 3 → **0**,
gospel-absence 5 → **0**, multiplied-close 4 → **0** — and the honest headline is not any
of those. It is that **half the pages we call clean fail a live cold read.**

One last thing, carried forward because it has now held for a seventh session. The pages
that moved were the ones where the writer noticed what the page was **already carrying** —
a deposit, a rope of ten thousand strands, a fortress with a loaded objection behind it,
a birth nobody chose — and put the Savior inside it. The ones that fail arrive with a
cross bolted on from outside. A page shipped flat is a door that opens onto a wall.
