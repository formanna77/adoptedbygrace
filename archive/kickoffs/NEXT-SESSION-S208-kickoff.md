# SESSION 208 — KICKOFF

## WHERE S207 LEFT IT

**A detector fix went one layer deeper than S206 reached, and the first thing it
surfaced was a page whose entire thesis is the site's most dangerous defect.**
Twelve pages shipped: two Lane C rebuilds by the lead, ten from the two factory
agents that survived a session compute cap. All 21 checks green, no ratchet raised.

| | S206 close | S207 close |
|---|---|---|
| **Lane C** rebuild | 9 | **8** |
| **Lane B** surgical | 35 | **28** |
| **Lane A** confirm | 380 | 377 |
| gospel-absence | 24 | **17** |
| multiplied-close | 22 | **16** |
| feeling-slip | 11 | **8** |

Ratchets unchanged and none added: **CHECK 10 = 469/59 · CHECK 17 = 62 · CHECK 19 = 5367.**

---

## FIRST TWO COMMANDS

```
node archive/session-brief.js
node archive/make-factory-brief.js gospel-absence all
```

---

## §THE SINGLE MOST USEFUL THING ON THIS PAGE

**The three gospel-absence agent prompts in `archive/S207-agent-prompts.md` were
never spent — their agents died before writing a word, for the second session
running.** Agents 1, 2 and 3 (High Priest / cornerstone / firstborn) are still
valid, still pre-verified against `scripture-niv.js`, still disjoint. Agents 4 and
5 shipped in S207 and their territories (**the Lamb slain from the creation of the
world**, **captivity broken by a death**) are now SPENT — add them to the banned
list before launching anything.

Re-run `node archive/make-factory-brief.js gospel-absence all` first; S207 worked
no gospel-absence pages by hand, so batches 1–3 should partition identically, but
confirm rather than assume.

---

## §THE ENVIRONMENT CHANGE THAT MADE THE FACTORY WORK — KEEP IT

S207's agents could not reach the repository at all. They were briefed to **return
prose, not to `Edit` files**, and the lead spliced every page by hand. Keep this
even when direct edits are possible:

- Nothing ships unread. Every Scripture quotation, every link, every §XXIII close
  passed a human gate before it touched disk.
- **"An agent transcript cannot tell you how many of its Edits landed" stops being
  a risk**, because the lead lands them and sees the byte counts.
- Both surviving agents self-reported honestly — one partial fix and two CHECK-11
  risks — which a factory that writes straight to disk never has to do.

The prompt shape that worked: give each agent one brief path, a manifest of every
valid page name to `grep -x` for link verification, and demand output as
`ANCHOR:` (a string occurring exactly once) + `REPLACEMENT:` (the whole span).
Every anchor came back unique and every splice applied first time.

---

## §THE DETECTOR FIX — AND WHY IT MATTERS MORE THAN THE PAGES IT FOUND

`detect-feeling-slip.js` strips every remaining tag to a space, then splits on
terminal punctuation. **Any block element that does not end in `.`/`!`/`?` gets
welded to the text after it.** S206 removed the nav and the related-articles cards
for exactly this reason; the same failure was still running one layer down on
headings and `<cite>` tags. `<h2>The First Instinct Is to Put God on Trial, Not
Yourself</h2>` had been fused to the paragraph beneath it and reported as a SLIP
for three sessions.

Fixed: closing **block** tags become a period before the generic strip. **Inline
tags are deliberately excluded** — a boundary on `<a>` or `<em>` would shatter
every sentence carrying a prose link, which here is most of them. `<br>` excluded;
it lives inside quotations. Proven both directions: phantom gone, injected slip on
`objection-love` still caught, reverted, diff clean.

**The transferable law, third session in a row it has paid: when many pages score
for the same odd reason, suspect the tool.** And the corollary S207 adds — *a
detector that concatenates two elements is not noisy, it is hallucinating, and
recall is silently wrong in both directions.* The fix removed one false positive
and **surfaced one real page nobody had ever looked at.**

---

## §THE FIND THAT SHOULD SHAPE S208: THE SLIP AS A PAGE'S ENGINE

`broken-mirror-imposter-syndrome` was on no lane list. Its thesis was *a real fraud
would not worry about being a fraud* — **the exact claim §XXIII was canonized to
refuse — running as the argument, in eight places**, including the hero subtitle,
the pullquote, the In Brief, and all five description carriers, on the page written
for the most frightened readers on the site.

The repair is the reusable move and it belongs in every future brief:

> **The observation is sound as a demolition of the test and forbidden as a
> certificate.** The anxiety does not prove the reader is saved. It proves the
> instrument is broken. Bunyan screaming in the woods and Bunyan finishing his
> allegory are one man, one standing before God, two opposite readings off the same
> gauge.

And the pastoral half: the usual comfort **still makes the interior the evidence —
it has only changed which reading counts as a pass**, and it convicts the reader
whose worry has lifted through medication, exhaustion or grief.

**S208 should hunt this class deliberately.** The detector cannot see it: the
sentence carries no second person, so no TRIGGER branch fires. Grep candidates —
`would not worry`, `a real .* would not`, `too busy performing`, `never doubt
themselves`, `the ones most genuinely`. Check hero subtitles and In Briefs first;
that is where a page states its thesis.

---

## LANE C — the eight that remain (lead writes these; never delegated)

`analogy-chess-grandmaster` · `apologetic-you-did-not-choose-me` ·
`compare-calvinism-molinism` · `invisible-wall-prayer-feels-empty` ·
`story-real-conversions` · `story-the-room-where-you-chose` · `the-fork` ·
`the-two-arms`

`philosophy-resistance-is-proof` came off this list in S207. Two findings from it
worth carrying:

1. **A page can unsay its own title in the last paragraph and pass every detector.**
   That one closed *"Your recoil was never the proof of anything against you"* on a
   page called *The Resistance Is the Proof*. Read the close against the H1, always.
2. **Three images in the final two paragraphs is the ordinary state of a page that
   was closed by adding rather than by choosing.** Courtroom, then a mirror, then a
   locked door. The rebuild kept one and the page got shorter and harder.

Unspent Christological seam used there, now SPENT: **the silent defendant** —
Matthew 27:12-14, Pilate's two on-record findings of innocence, and the inference
that *a man who is innocent and intends to be convicted cannot mount a defense.*
Also spent in S207: **Thomas and the kept wounds** (John 20:25, 20:27).

---

## §STILL UNWORKED — the §XV seam S206 found and nobody has mined

The NIV renders John 18:18 as "a fire" and John 21:9 as "a fire of burning coals";
both are *anthrakia*, twice in the New Testament, both in John, once where Peter
denied Him and once where Jesus made him breakfast. **There are more of these.**
When a page's argument leans on a word, check whether the NIV is flattening
something and whether the corpus has already spent it. Luke 22:32 — *"and **when**
you have turned back"* — is still the cleanest compatibilism proof text on the board
and still unused.

---

## LANE A — 377, and 129 untagged

Detector-clean + spot cold-read of **opener and close only** against the
landing-force test, then
`node archive/coverage.js stamp <page>.html 208 lifted "confirmed clean — <clause>"`.
Delegable 10–12 per agent. Cheapest work on the board. **Do not tag by provenance
alone.**

---

## NON-NEGOTIABLES

- **Read `CLAUDE.md` and `VOICE.md` in full first.** VOICE.md is 680 lines and the
  Read tool pages it — read the second page. Never sampled.
- **No label exempts a page from review. No skip-lists.**
- **Waves of 5–6, and reconcile against the filesystem between them.** S205 lost
  four agents to a session cap, S206 five to a weekly cap, S207 three to a session
  cap. **Assume you will lose some.** Write Lane C first, every session — it is the
  one lane a compute failure cannot take from you, and it is the only reason the
  last three sessions shipped anything.
- **GATE 0: do not close below 80% of the context window used.** *(S205, S206 and
  S207 all failed this because compute limits ended the run, not the plan. If it
  happens again, say so plainly rather than padding.)*
- **No git commands. Ever.** Aaron pushes manually.
- **New internal docs go in `archive/`** — covered by the forced `410!` splat.
- **`stamp-modified.js` only on pages with real content changes**, always BEFORE
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
**CHECK 19 = 5367**. Expect CHECK 11 to fail once if `auto-linker.js` added a link;
clear with `node dedupe-prose-links.js`.

Then: coverage stamps, `node archive/coverage.js report`, MISSION-CONTROL Session
208 entry, roll the oldest live entry to the archive, write
`archive/kickoffs/NEXT-SESSION-S209-kickoff.md`, and end with the fenced push
command followed by the fenced kickoff pointer.

**Report the lane deltas to Aaron.** The number is not "pages touched" but Lane B
and Lane A shrinking, session over session. S205: Lane B 78 → 36. S206: Lane C
11 → 9. S207: Lane B 35 → 28, Lane C 9 → 8.

One last thing, carried forward because it has now held for a fourth session. The
pages that moved were the ones where the writer noticed what the page was **already
carrying** — a courtroom, a broken gauge, a score written before the players — and
put the Savior inside it. The ones that fail arrive with a cross bolted on from
outside. A page shipped flat is a door that opens onto a wall.
