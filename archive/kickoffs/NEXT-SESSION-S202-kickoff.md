# SESSION 202 — KICKOFF

**Read `CLAUDE.md` and `VOICE.md` in full first. VOICE.md is never sampled.**
Then read **only** these sections of the logs: `MISSION-CONTROL.md` → the Mandatory
Closing Protocol + the **Session 201** entry. Do not read any `*-ARCHIVE.md` whole.

**No label exempts a page from review.** DIAMOND, CONSECRATED, HAMMER-LOCKED,
POLISH-LOCKED, born-apex and the psychology sweep are historical notes on what was
*last* looked at — never a shield. This kickoff carries **no skip-list.**

**GATE 0 binds: do not close below 80% of the context window used (≥160K/200K).**
Aim ~85%. S201 met it. There is no excuse available to you.

---

## WHAT YOU INHERIT

S201 was the first full prose run since S193. Twelve biographical/search-doorway
pages cold-read: **eleven NEEDS-LIFT, one FAILS, zero DIAMOND.** §XXIII standing
moved 98 → 108, remaining 520 → 510. Three infrastructure findings landed
alongside — one of them corpus-wide and visual. Full record: `MISSION-CONTROL.md`
Session 201.

---

## PRIORITY 0 — THREE THINGS, IN THIS ORDER

**0a. RE-FETCH THE FOUR SCRIPTS ON THE LIVE DOMAIN.** This is now a two-session
open defect and it must not become a third.

- `https://adoptedbygrace.net/strip-internal-markers.js`
- `https://adoptedbygrace.net/fix-orphaned-cards.js`
- `https://adoptedbygrace.net/fix-stray-progress-bar.js`
- `https://adoptedbygrace.net/fix-jsonld-answers.js`

Each must return the 404 page, **not** JavaScript. S200 moved them above the
catch-all and declared victory; S201 fetched them and all four still served 200
`application/javascript`, while `/build-tags.js` — an identical `410!` rule 94
lines earlier — correctly returned the 404 page. S201 therefore moved the four
*inside* the proven block. **If they still serve JS after this deploy, position is
not the cause and the block is not the cause** — go to Netlify's deploy log and
the published-file list, and stop hypothesising from the repo. *No validator can
confirm a redirect fires. Only an HTTP request can.*

**0b. VERIFY THE `.sop-pullquote` FIX IN A REAL BROWSER.** S201 discovered that
`.sop-pullquote` (556 pages) and `.sentence-of-the-page` (23) were defined in **no
stylesheet at all**, so VOICE §VII.3's Sentence of the Page — the site's own
authorial line — fell through to the bare `blockquote` rule, which is the
*Scripture* treatment. Verified live: the authorial sentence computed to
`border-left: rgb(184,169,232)` = `--accent-scripture`, purple gradient,
decorative quote glyph. **The site was presenting its own sentences as Bible
verses on 553 pages.** Rules were added to `global.css` and could not be checked
in a browser because they were not yet deployed. Load a page carrying the class
(e.g. `/analogy-the-prodigal-already-home`), confirm gold, confirm no `::after`
glyph, and confirm it does not overflow at phone width.

**0c. MEASURE 390px AND 768px — S201 COULD NOT.** `resize_window` was refused
below Chrome's window minimum (`innerWidth` stayed 1321 after requesting 390).
Find a method that works — device emulation, a headless run, or a second browser —
because CLAUDE.md law 8 requires it and **`body { overflow-x: hidden }` makes
`scrollWidth` lie**, so walk elements and compare `getBoundingClientRect().right`
against the viewport. The overflow walk that works is in the S201 transcript; it
returned clean at 1321px, which proves nothing about a phone.

---

## PRIORITY 1 — FINISH THE COMPRESSION THE COLD-READS ORDERED

S201 fixed every factual error, every §XXIII slip, and the worst multiplied
closes, but **deliberately did not take the compression cuts** — the doorway
pages still run long, and *tightening precedes expanding.* Named, quoted, and
waiting:

- **`theologian-owen`** (4,209 w) — the John 6:39 excursus runs four paragraphs
  where three secure the point; cut *"One more thing the English must smooth"*
  through *"the thing given to the Son is no longer the thing given"*, and the
  clause *"Nor does the mood add anything — after* hina *the subjunctive is
  obligatory"* (answers an objection no reader raised). ~135w. Acts 13:48 is a
  *second* consecutive grammar excursus on a page reached from a biographical
  query — halve it. And three images carry one point ("switched on from
  outside" / "outsources the power to the corpse" / "the condition is supplied by
  the very creature") — keep one.
- **`theologian-bradwardine`** (3,298 w) — lines ~139–153 state one idea **five
  times before the man's life begins**, ~350w. Also: the page is titled *The
  Mathematician Who Proved God's Sovereignty* and **never shows a single piece of
  mathematics** — no proportion, no Bradwardine rule, no equation. That is the
  largest single miss in the cohort and it is an opportunity, not just a cut.
  The chalk/chalkboard motif is a 19th-century instrument used three times.
- **`theologian-augustine`** (3,846 w) — the Bowlby section lands a point already
  landed six paragraphs earlier, ~370w. Also unresolved and weighted: the page
  claims Augustine argued from the **Greek** *helkyō* against "gentle wooing," but
  Augustine worked from the Latin *trahere*, disliked Greek (Conf. I.13–14), and
  in *Tractates on John* 26 glosses the drawing **by delight** — roughly the
  inverse. Rebuild that paragraph on *trahit sua quemque voluptas*; it is the
  page's strongest section resting on its shakiest claim. Lesser: Orange 529
  condemned *semi*-Pelagianism, and its canons were effectively lost until the
  16th century, so "settled catholic teaching for a thousand years" is wrong.
- **`theologian-boston`** — still four closes deep in places; and the 620-word
  demolition section *"The Word You Keep Adding"* carries **zero links** at the
  reader's most-opened moment.
- **`theologian-anselm`** — *Cur Deus Homo* does not teach definite atonement;
  *"To say otherwise is to deny Anselm's logic"* overreaches. Aquinas **rejected**
  the ontological argument, so "could not finally evade Anselm's God" is false.
  *Aliquid quo nihil maius cogitari* **potest**, not *possit*.

---

## PRIORITY 2 — STANDING QUEUES (drain until GATE 0 is met)

1. **Gospel-absence queue at 133**, sort by hit count. Untouched since S199.
2. **The 21 scripts on the brittle `<article class="article-body"` literal** — the
   oldest open item. Sweep to a tolerant regex.
3. **Inline `style=` attributes: 713 across 233 pages** (CHECK 10, rebaselined
   S201 from 724/235). CHECK 8 governs `<style>` *tags* and structurally cannot
   see attributes. **The `.sop-pullquote` fix is the model**: find the class the
   inline style is imitating, define it once in `global.css`, strip the duplicates.
   Enumerate the distinct style strings first — S201 expected hundreds and found
   three.
4. **159 pages carry a lock with no session tag** — assign one on next touch.

---

## NON-NEGOTIABLES

- **NIV 2011 only.** No `(NIV)` suffix. §XV transparency where the NIV
  under-translates a point the page argues. **Check quotations against
  `scripture-niv.js`, which is ground truth and is already in the repo** — that is
  how S201 caught the KJV *"work out your own salvation"* and confirmed that
  Romans 9:15 genuinely reads *"on whom I have mercy"* (only Exodus 33:19 carries
  the second "will"). **Cold-readers over-flag correct citations. Verify before
  "fixing."**
- **No emojis, anywhere, ever.** CHECK 16 enforces four encodings.
- **Verify every `<a href>` exists on disk before writing it.** 8–12 internal
  links per article, first mention only.
- **Write, don't Edit, whole passages** — preserves persuasive cohesion.
- **No git commands. Ever.** Aaron pushes manually.
- **New internal docs go in `archive/`**, never the repo root.
- **Any script that rewrites the article tag must write `id` AFTER `class`.**
- **Do not fabricate a `dateModified`.** `node stamp-modified.js <pages>` on the
  pages you actually edited, and only those.
- **A check you have never seen fail is not a check.** S201 proved the clone-ratchet
  fix by pasting a 45-word paragraph onto a second page, watching the count rise,
  and restoring. Do that every time.
- **Grep locates; it does not establish.** Read the usage before acting on a match.

---

## CLOSE

**ORDER MATTERS, AND S201 GOT IT WRONG BEFORE CATCHING IT.** `build-sitemap.js`
derives each URL's `lastmod` from that page's JSON-LD `dateModified`; `stamp-modified.js`
is what *writes* that field. CLAUDE.md lists them in two different blocks and states
no ordering, so the natural sequence — pipeline, validate, then stamp — is backwards,
and it silently shipped all 11 lifted pages with an **April** `lastmod` against their
own `2026-08-10` JSON-LD. That is the exact "sitemap contradicts its own page" defect
S200 eliminated, reintroduced on the only pages that changed. **So:**

```
node stamp-modified.js <the pages you actually edited>   # BEFORE the sitemap
node build-sitemap.js
```

**General law: any script that writes JSON-LD runs before any script that reads it.**
Verify it, do not assume it — compare `dateModified` against `<lastmod>` for every
page you touched before you close.

Run the eight-script pipeline, then `stamp-modified.js`, then `build-sitemap.js`, then `validate-site.js`
(**ALL 20 CHECKS** must pass), then `canonical-conformance.js` and
`verify-scripture.js` (a report, not a gate). Ratchets stand at **CHECK 17 = 62**,
**CHECK 19 = 5,381**, **CHECK 10 = 713/233** — lower them, never raise them. Stamp
every page you lifted with
`node archive/coverage.js stamp <page.html> 202 lifted|partial "<note>"`, then run
`node archive/coverage.js report --session=202` and paste the **END-OF-SESSION
STANDING** block verbatim into both the Session Log and the closing chat message,
immediately before the push command.

Then: MISSION-CONTROL Session 202 entry, roll the oldest live entry to the archive,
write `archive/kickoffs/NEXT-SESSION-S203-kickoff.md`, and end the chat with the
fenced copy/paste push command followed by the fenced kickoff pointer.

**Eighteen clicks in ninety days.** The doorways now tell the truth about Luther
and Polycarp, and the site's own sentence is no longer wearing Scripture's clothes.
None of that is reach. Ask Aaron about the sitemap re-submission first, then build.
