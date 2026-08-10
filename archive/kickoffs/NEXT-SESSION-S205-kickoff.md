# SESSION 205 — KICKOFF

## WHERE S204 LEFT IT

**The factory works and the number is not close.** S204 ran 12 agents in two waves and closed
**60 Christless catches** — against ~8 in a typical session. Gospel-absence **127 → 67**.
Lane B **138 → 78**. Remaining **502 → 449**, the largest single-session move in the ledger.
Wave 1 cleared **30 of 30 on the first pass.** Every agent finished with window to spare.

**So do not re-derive the model, and do not re-audit the instruments.** Five sessions were spent
on instrument forensics; they are done. Run the factory hard, read everything it produces, and
spend your own hands on Lane C.

---

## FIRST TWO COMMANDS

```
node archive/session-brief.js
node archive/make-factory-brief.js gospel-absence all
```

`session-brief.js` was fixed in S204 and **`batch N` in its roster is now literally
`archive/factory-briefs/<class>-batch-N.md` on disk.** It was not before — see §THE TRAP below.
Re-run `make-factory-brief.js` for every class you intend to work; the briefs are a snapshot of
page contents and go stale the moment a wave edits.

**Standing at S204 close:**

| Lane | Count | Who |
|---|---|---|
| **C — rebuild** (2+ defects) | **11** | lead only, never delegated |
| **B — surgical** (1 named defect) | **78** | factory, batched by CLASS |
| **A — confirm** (0 flags, stale provenance) | **375** (130 untagged) | spot cold-read, then stamp |

Lane B by class: **Christ absent from the catch 56** (12 agents) · **doubled/tripled close 15**
(3) · **feeling-slip 7** (2). Pages marked `*` are doorways — the factory writes them, the lead
reads them before they ship.

---

## HOW TO RUN A WAVE (this is the procedure, not advice)

**Hand each agent ONE brief file and tell it to open nothing else.** The brief carries the
payload — the final 25% as verbatim HTML, every Scripture the page cites already resolved
against ground truth with absent ones marked *do not quote*, and the freshness row. 5K tokens.
**The prompt carries the law**, and it needs exactly five things:

1. **The one VOICE section that governs the class.** §I.1 + §XXIII for gospel absence.
   §VIII + §I.4 for multiplied closes. §XXIII in full for feeling-slips. Not all 680 lines.
2. **A distinct Christological territory per agent**, named and argued — see §FRESHNESS.
3. **The site-wide freshness tallies + the spent list.**
4. **A hard output contract:** Edit in place; every new `href` verified on disk (or write none —
   all 12 S204 agents took that option and it cost nothing); zero emoji; one `article-body`;
   then **one block per page including the added prose VERBATIM.** No essays.
5. **`SLIP FOUND:` as a required optional line.** Keep this. See §D below.

**Launch 5–6 per wave in one message. Review the wave before launching the next.** Re-run
`session-brief.js` + `make-factory-brief.js` between waves, and carry the spent-image list
forward — `freshness-ledger.json` is a snapshot and does not know what the last wave wrote.

### The three verification checks, in order — the third is the one that catches prose

1. **Re-run the detector.** Objective, cheap. It is what caught `history-every-revival-sovereign-grace`
   in S204: a fine paragraph about a man "despised and rejected," "His own brothers," "the Father
   raised Him on the third day" — and **the name never once appears.** *Pronoun drift is the
   factory's characteristic failure and only the detector sees it.* Same class as S203's "a Man
   who has been dead" and "the Power greater."
2. **Read the verbatim prose in the reports.** 30 paragraphs a wave, ~4K tokens, and it is the
   only way to judge quality without opening 30 files.
3. **Read the pages whose agent never reported.** S204's batch-10 agent was cut off *after* its
   Edits landed and *before* it wrote its report — five pages live and unreviewed, with nothing
   anywhere to flag them. They were excellent, but that was luck. **An agent that dies after its
   Edits is more dangerous than one that dies before.** Reconcile reports against the roster
   every wave.

---

## §THE TRAP S204 FOUND — read this before you write a single agent prompt

`session-brief.js` printed rosters of **six**; `make-factory-brief.js` wrote payload files of
**five**. So `batch 3` in the brief the lead reads and `gospel-absence-batch-3.md` on disk named
**different pages**, drifting further with every batch.

Nothing catches this. Both numbers are internally consistent, the rosters stay disjoint, every
page is covered exactly once, and no validator has an opinion. **The damage lands entirely on the
lead**, who writes each agent's territory, register warning and per-page cautions *from the
roster* and hands them to an agent holding a different five. Two S204 agents opened their brief,
found none of the pages they had been briefed on, and said so; a third was told it was closing
escape routes in Hebrews 6 while holding philosophy pages.

Fixed — `const BATCH = 5`, coupling named in a comment. **The general form: two independent
computations of the same partition will diverge, and a partition that is merely *consistent* is
not the same as *correct*.** If you add a third consumer of the roster, derive it, do not retype it.

---

## §D — KEEP THE `SLIP FOUND:` LINE

S204's agents surfaced **four §XXIII slips the detector does not see**, in prose they had to read
to place their paragraph — on top of the 11 `detect-feeling-slip.js` flags:

- `demolition-rev22-17` — *"The desire is already there… You are the evidence that He has been
  working in you all along."* A certificate issued on the strength of thirst, on a page whose
  subject is a free invitation, silently excluding anyone arriving numb.
- `demolition-ezekiel33-11` — *"If you are turning, that is not your decision activating."*
- `found-you` — *"the reason your body will not let the weight go…"*
- `philosophy-self-deception` — *"if… you have the faint sensation of a hand loosening on a lid…"*

All four repaired. The last one is the model: §XXIII.3 move 3 (**name the trick and refuse it
out loud**) is *stronger* than the original on a self-deception page, because the instrument the
reader would be consulting is the one under examination. **`detect-feeling-slip.js`'s 11 is a
floor, not a census.**

---

## §FRESHNESS — assign disjoint territories or the corpus gets flatter as it gets fresher

Twelve agents writing into one defect class is exactly VOICE §XXI.1's nightmare. S204 gave each a
**disjoint facet of Christ's work** and got twelve genuinely different paragraphs. **All twelve
are now SPENT:**

> the ransom actually paid · the great exchange running both directions · Gethsemane and the cup ·
> the empty tomb as a unit of measurement · the living intercession · the descent into a body ·
> the Good Shepherd's double grip · the sin-bearer and the public undoing of shame · the Man of
> Sorrows rejected by His own · love demonstrated rather than declared · the firstfruits and the
> death of death · the Logos as the ground outside the system

Plus the four S203 lifts: Golgotha and the wrong man · two intercessors at each end of the call ·
the destroyer reading the doorframe · Jesus weeping outside a grave He is about to open.

**Forge new ones.** Still unworked: the second Adam and federal headship · the Bridegroom's
covenant oath · the temple He said He would rebuild in three days · the seed crushed at the heel ·
the scapegoat driven out · the firstborn among many brothers · the Author who wrote Himself into
the book · the kinsman-redeemer's right to buy back · the Passover Lamb chosen four days early.

**Bridges:** drowning **57 — wallpaper, banned** · addiction 16 · Libet 12 · anosognosia 12 ·
lottery 8 · phantom limb 5. **Catch images:** mirror 15 · rope 14 · ringing phone 8 · Lazarus 8 ·
cargo 4 · envelope 3.

The one S204 collision was two pages inside a *single* agent's batch (Hebrews 13:13 on
`for-pastors` + `history-calvin-geneva`) and it surfaced as **CHECK 19 going exactly 12 words over
ceiling — the length of the shared clause.** The ratchet works. Warn agents about their own batch,
not just about each other.

---

## LANE C — 11 PAGES, THE LEAD WRITES THEM, AND THEY ARE NOW THE BIGGEST BLOCK ON THE BOARD

Untouched in S204 and no longer deferrable. `analogy-chess-grandmaster`,
`apologetic-you-did-not-choose-me`, `compare-calvinism-molinism`,
`invisible-wall-prayer-feels-empty`, `objection-desire`, `philosophy-resistance-is-proof`,
`question-how-grace-feels`, `story-real-conversions`, `story-the-room-where-you-chose`,
`the-fork`, `the-two-arms`. Compound defects: read the whole page, rebuild the spine, and **go to
the primary source before rewriting** — S203's Anselm page was built on a claim *Cur Deus Homo*
does not make, and the verified reading was both honest and stronger. **A confident sentence is
not an evidenced one.**

---

## LANE A — 375, and 130 untagged

Detector-clean + spot cold-read of **opener and close only** against the landing-force test, then
`node archive/coverage.js stamp <page>.html 205 lifted "confirmed clean — <one clause>"`.
Delegable 10–12 per agent. Cheapest work on the board. **Do not tag by provenance alone.**

---

## NON-NEGOTIABLES

- **Read `CLAUDE.md` and `VOICE.md` in full first.** VOICE.md is 680 lines and the Read tool pages
  it — read the second page. Never sampled. Lead's cost; agents get sections.
- **No label exempts a page from review. No skip-lists.**
- **GATE 0: do not close below 80% of the context window used.** Aim ~85%.
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

Ratchets — lower them, never raise: **CHECK 10 = 471/60** · **CHECK 17 = 62** · **CHECK 19 = 5,369**.
Expect CHECK 11 to fail once if `auto-linker.js` added a link; clear with `node dedupe-prose-links.js`.
If CHECK 19 goes over, the overage in words usually *is* the length of the cloned clause — find it
with `detect-shared-phrases.js` filtered to the pages you edited this session.

Then: coverage stamps, `node archive/coverage.js report`, paste the **END-OF-SESSION STANDING**
block into the Session Log and the closing chat message, MISSION-CONTROL Session 205 entry, roll
the oldest live entry to the archive, write `archive/kickoffs/NEXT-SESSION-S206-kickoff.md`, and
end with the fenced push command followed by the fenced kickoff pointer.

**Report the lane deltas to Aaron.** He asked for throughput; the number is not "pages touched"
but **Lane B and Lane A shrinking**, session over session. S204 moved remaining 502 → 449. Beat it.

One last thing. The speed is real and it is the instruction. But 60 pages moved because 12 agents
each had one page's own image in front of them and were asked to find Christ *inside it* — not
because anyone went faster. The paragraph that worked every time was the one that noticed the page
was already carrying a spring, or a rope, or a chair, and put the Savior in it. Keep that. A page
shipped flat is a door that opens onto a wall.
