# S213 KICKOFF — THE GOLDEN THREAD, STILL UNFINISHED

Read `CLAUDE.md` and `VOICE.md` in full first. VOICE.md is never sampled.
Then read the **Session 212** entry in `MISSION-CONTROL.md` — it is the top entry
and it is the only record of what S211 and S212 actually did.

**Standing:** at §XXIII **272 / 618**; remaining **346**. Canon is FROZEN at §XXIII
until full coverage — a genuinely new law goes in `archive/PARKED-CANON.md`, never
into VOICE.md.

---

## Priority 0 — Sample-Read Audit (mandatory, before any build)
5–10 pages, half at-bar / half unmarked, live cold read against the landing-force
test. No label is an exemption; no skip-lists. **S210 found 6 of 12 twice. S212
found 10 of 10.** Assume the detectors are blind and the reading is the work.

Two things S212 learned about how to run this, both worth reusing:
- **Do not tell the second agent which pages are tagged at-bar.** It judged all five
  identically and the tagged ones failed at the same rate.
- **Ask for the cross-page section explicitly.** Both agents' most valuable output
  was the "CORPUS-LEVEL PATTERNS" block, not the per-page findings. That is where
  the category defects live.

---

## Priority 1 — the six remaining thin Golden Thread eras

S211 deepened the six shortest homepage-strip eras. S212 verified and repaired that work,
then took **`history-dort-deep` from 1,480 to 2,402** — the Remonstrance's five articles
quoted verbatim and answered one at a time. **Use it as the template for the other six:**
let the opponent's own document speak at full length before a word of answer, then kill it
on its own internal sequence rather than from outside. Prose word counts:

| page | words | the substance that is missing |
|---|---|---|
| `history-great-awakening` | 2,243 | Northampton 1734-35 and Edwards' *Faithful Narrative*; Whitefield's open-air numbers; the *Enfield* sermon read as a grace text, not a scare text |
| `history-augustine-pelagius` | 2,254 | Caelestius at Carthage 411; *da quod iubes et iube quod vis*; Ephesus 431; Zosimus reversing himself |
| `history-dort` | 2,374 | why Dort's ORDER is TULIP's order and what that proves |
| `history-council-of-orange` | 2,414 | canon 5 on the *initium fidei*; semi-Pelagianism as the respectable version; why 529 settled it and 1500 forgot it |
| `history-puritans` | 2,825 | Westminster's actual drafting; Owen's *Death of Death* argument in one paragraph |
| `history-20th-century` | 2,952 | Warfield and Princeton; Machen's trial; Lloyd-Jones at Westminster Chapel |

**Method that worked in S211 and S212:** pull the specific, checkable, seldom-quoted
fact (a date, a vote count, a thesis number, a register), then turn it so the reader
sees something about himself. Meet the strongest opponent inside the page, never
around it.

**AND THE THING S212 PROVED ABOUT THIS FAMILY — apply it to all seven before you
write a word of new material:**

> **A history page's catch defaults to an abstraction.** Five of five history pages
> ended on *the grace / the truth / the wind / the hand / a God / the One* and named
> Jesus Christ nowhere in the page's own closing voice. A page that ends on a
> surviving **idea** has told the reader the doctrine is durable; it has not put him
> in anyone's arms. Check each of the seven for this FIRST — it is cheaper to fix
> than to write around, and it is almost certainly present on all seven.

> **And four of five ran the same closing beat** — *the truth crossed all of history
> and has now arrived at YOU, reading this* — of which three were §XXIII feeling-slips.
> The repair template is `history-apostolic`'s clause: *"whatever it feels like from
> inside."* At most one of the seven may keep an arrival beat.

**Christological territory already spent — do NOT reuse:** the uninterrupted
priesthood (Heb 7:25) · the beggar's open hand (*Wir sind Bettler* + 2 Cor 5:21) ·
I will build (Matt 16:18) · I must bring them also (John 10:16) · the source has a
face · election's address · the weapon that was never a weapon · the centre that came
out to the edge · the prayer that received no answer · the only person who ever
decided to be born · the knot at the end of the rope · the manumitter's signature ·
the payer's solvency · He is where God keeps His chosen.

---

## Priority 2 — five pages left half-repaired by S212 (stamped `partial`)

S212 fixed every integrity defect on these and ran out of compute before the prose.
Each has a full findings list in the S212 MISSION-CONTROL entry §G. In order of need:

1. **`devotional-the-god-who-wastes-nothing`** — NOT EDITED AT ALL. Conditional catch
   (`"If you carry the weight of wasted time — if there is a chapter that makes you
   wince… hear this"`); a nine-sentence prayer box sitting *after* a perfect final line
   (`"The locusts had orders too."`); `"David wrote half the Psalter"` and Paul's
   invented `"best decade"`; Luke 15 fused to John 10; the Joel 2:25 quotation cut one
   clause short of *"my great army that I sent among you"* — the clause that makes the
   locusts God's.
2. **`2-thessalonians-2-13`** — the worst slip in the sample (`"the believing is the
   proof that the chain has run all the way through to your chest"`), which contradicts
   its own In Brief; an encyclopedia opener; ~18 Greek terms with a Greek word as the
   first H2; 5 landings; a 35-word final line.
3. **`question-freewill`** — best prose in the sample, 6 landings, and its own
   pillow-hammer fires four paragraphs early. `"the dead do not choose their own
   resurrection"` appears **eight times in one file** (meta ×3, two JSON-LD blocks,
   subtitle, pullquote, body). `nekros` is falsely called "the coroner's word".
4. **`philosophy-copernican-revolution`** — 4 landings; the thesis restated fourteen
   times; two pull-quotes carry fake attributions to the site's own sentences.
5. **`objection-why-believe`** — middle third still in explainer register beside
   apex prose; five throat-clearings; a labelled applause line; `The Holiness You've
   Never Seen` is off-topic AND contains a passage cloned near-verbatim onto
   `question-freewill` (the seraphim). Cut it from one of them.

---

## Standing
- **`node build-tags.js` and `node build-all-content.js` run FIRST**, then
  search-index → mega-menu → homepage-counts → auto-linker → wire-orphans →
  `stamp-modified.js <pages you actually edited>` → `build-sitemap.js` →
  `node validate-site.js` (21 checks). `dedupe-prose-links.js` if CHECK 11 fires.
- **CHECK 19 ceiling is now 5225** (lowered this session). Ratchet down only.
- **`archive/coverage.js stamp <page> <session> [lifted|partial] <note>`** — stamp every
  page you lift. Aaron is waiting on the 618 denominator; an unstamped lift is invisible.
- **The RELATED-ARTICLES block inside `<article class="article-body">` is the site
  convention on 591 of 687 pages. It is NOT a defect. Three sessions have now spent
  attention on it. Count the corpus before believing a structural finding.**
- **Never run git.** Aaron pushes.
- **Write the MISSION-CONTROL entry and the S214 kickoff before you stop.** S211 did
  not, and S212 spent its Priority 0 recovering from that.
