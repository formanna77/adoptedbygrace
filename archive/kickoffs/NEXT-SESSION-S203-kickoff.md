# SESSION 203 — KICKOFF

**Read `CLAUDE.md` and `VOICE.md` in full first. VOICE.md is never sampled** — it is 680 lines
and the Read tool will page it; read the second page too. Then read **only** these sections of
the logs: `MISSION-CONTROL.md` → the Mandatory Closing Protocol + the **Session 202** entry.
Do not read any `*-ARCHIVE.md` whole.

**No label exempts a page from review.** DIAMOND, CONSECRATED, HAMMER-LOCKED, POLISH-LOCKED,
born-apex and the psychology sweep are historical notes on what was *last* looked at — never a
shield. This kickoff carries **no skip-list.**

**GATE 0 binds: do not close below 80% of the context window used (≥160K/200K).** Aim ~85%.

---

## WHAT YOU INHERIT

S202 closed both standing P0 defects — and found that **neither had been broken.** Two sessions
of "still serving JavaScript" and one of "still rendering purple" were **instrument error**, not
site error. It also found that CLAUDE.md's phone-width law had been prescribing a test that is
structurally blind to the bug the law cites as its reason for existing. Three doorway pages
lifted; three corpus-wide render fixes shipped. Full record: `MISSION-CONTROL.md` Session 202.

**Do not re-open P0a or P0b.** They are verified closed in a real browser. If you want to
re-confirm, use the browser's own network stack — never `web_fetch` — and cache-bust.

---

## PRIORITY 0 — TWO PAGES THE COHORT STILL OWES

S201 cold-read twelve biographical pages and named findings on five. S202 took three. **These
two were not reached, and their findings are factual errors sitting live on search doorways.**

**`theologian-anselm`** — three separate problems, all verifiable in an afternoon:
- *Cur Deus Homo* does **not** teach definite atonement. The page's *"To say otherwise is to
  deny Anselm's logic"* overreaches badly — it claims a medieval satisfaction theory entails a
  Reformed doctrine of the atonement's extent, which is exactly the kind of inference §XVII.4's
  Scripture gate exists to kill. Rebuild the claim at the strength the text actually bears.
- Aquinas **rejected** the ontological argument (*ST* I q.2 a.1). So *"could not finally evade
  Anselm's God"* is false as written. Web-verify before rewriting; do not trust this line.
- *Aliquid quo nihil maius cogitari* **potest**, not *possit*. One word.

**`theologian-boston`** — still four closes deep in places (VOICE §VIII: one clean catch, one
tender landing; the multiplied close is the loudest structural tell in the corpus), and the
620-word demolition section *"The Word You Keep Adding"* carries **zero internal links** at the
reader's most-opened moment. §IX floor is 10–14 per page; verify every href on disk.

---

## PRIORITY 1 — THE NEW RENDER METHOD, APPLIED WIDELY

S202 built a working phone-width probe and used it on ~19 pages. **The corpus is 687.** The
method now lives in CLAUDE.md law 8 — read it before writing your own, because the obvious
implementation is the broken one.

The three fixes S202 shipped were each corpus-wide (631 pages, 66 declarations, every article
page). It is very likely more remain. Sweep a real sample — 40–60 pages across every archetype
— at **390px and 768px**. Two things that will save you an hour:

1. **Falsify the probe before trusting a clean result.** Inject a 100-character
   `<p style="white-space:nowrap">` and confirm it is reported. S202's first probe returned
   zero overflows on nineteen pages and was simply not working.
2. **Skip elements whose own `overflow-x` is not `visible`**, and their descendants — except
   `html`/`body`, which is the site-wide mask, not a deliberate clip. Without this you will
   chase `footer` (113px) and `.chain-hero` (279px), and both are correct as they stand.

---

## PRIORITY 2 — STANDING QUEUES (drain until GATE 0 is met)

1. **Inline `style=` attributes: 713 across 233 pages** (CHECK 10). CHECK 8 governs `<style>`
   *tags* and structurally cannot see attributes. **The `.sop-pullquote` and
   `.related-articles-grid` fixes are the model**: find the class the inline style is imitating,
   define it once in `global.css`, strip the duplicates. Enumerate the distinct style strings
   first — S201 expected hundreds and found three.
2. **Gospel-absence queue at 133**, sort by hit count. Untouched since S199.
3. **The 21 scripts on the brittle `<article class="article-body"` literal** — the oldest open
   item. Sweep to a tolerant regex. Any script that rewrites the tag must write `id` AFTER `class`.
4. **159 pages carry a lock with no session tag** — assign one on next touch.
5. `canonical-conformance.js` prints `Pages OK: 686` against `Pages checked: 685`. Off-by-one in
   its own tally. Harmless, but a script that cannot count its own output is worth ten minutes.

---

## NON-NEGOTIABLES

- **NIV 2011 only.** No `(NIV)` suffix. §XV transparency where the NIV under-translates a point
  the page argues. **Check quotations against `scripture-niv.js` — it is ground truth and it is
  already in the repo.** Cold-readers over-flag correct citations. Verify before "fixing."
- **Verify every historical claim on the web before writing it.** S202 found the Augustine page
  had invented an argument from the Greek for a man who worked from the Latin and disliked
  Greek, and the Bradwardine page had put chalk in a 14th-century hand. Both scanned clean for
  months. **A confident sentence is not an evidenced one.**
- **No emojis, anywhere, ever.** CHECK 16 enforces four encodings.
- **Verify every `<a href>` exists on disk before writing it.** 8–12 internal links per article,
  first mention only. `/question-prevenient-grace` does **not** exist; the page is
  `/demolition-prevenient-grace`.
- **Write, don't Edit, whole passages** — preserves persuasive cohesion.
- **No git commands. Ever.** Aaron pushes manually.
- **New internal docs go in `archive/`**, never the repo root.
- **Do not fabricate a `dateModified`.** `node stamp-modified.js <pages>` on the pages you
  actually edited, and only those.
- **A check you have never seen fail is not a check.** Prove it fails, then trust it.
- **Grep locates; it does not establish.** Read the usage before acting on a match.
- **And now: the instrument lies too.** Cache-bust every browser check; do not trust a
  non-browser fetcher on status codes or content types. CLAUDE.md law 12.

---

## CLOSE

**ORDER MATTERS.** `build-sitemap.js` derives each URL's `lastmod` from that page's JSON-LD
`dateModified`; `stamp-modified.js` is what *writes* that field.

```
node stamp-modified.js <the pages you actually edited>   # BEFORE the sitemap
node build-sitemap.js
```

**General law: any script that writes JSON-LD runs before any script that reads it.** Verify it
— compare `dateModified` against `<lastmod>` for every page you touched before you close.

Run the eight-script pipeline, then `stamp-modified.js`, then `build-sitemap.js`, then
`validate-site.js` (**ALL 20 CHECKS** must pass), then `canonical-conformance.js` and
`verify-scripture.js` (a report, not a gate). **Expect CHECK 11 to fail once** if `auto-linker.js`
added a link — clear it with `node dedupe-prose-links.js`, which is the fix the validator itself
prescribes. Ratchets stand at **CHECK 17 = 62**, **CHECK 19 = 5,369**, **CHECK 10 = 713/233** —
lower them, never raise them.

Stamp every page you lifted with
`node archive/coverage.js stamp <page.html> 203 lifted|partial "<note>"`, then run
`node archive/coverage.js report --session=203` and paste the **END-OF-SESSION STANDING** block
verbatim into both the Session Log and the closing chat message, immediately before the push
command.

Then: MISSION-CONTROL Session 203 entry, roll the oldest live entry to the archive, write
`archive/kickoffs/NEXT-SESSION-S204-kickoff.md`, and end the chat with the fenced copy/paste push
command followed by the fenced kickoff pointer.

**Three sessions in a row, the defect was not where the file said it was.** S200 verified its
check and never verified the site. S201 verified the site with a tool that could not see it.
S202 verified the site in a browser that handed back a cached copy. The pattern is not
carelessness — it is that *every layer between the truth and your eyes can fail silently.* Build
the instrument, break the instrument on purpose, and only then believe it. Then go write
something that makes a reader set the phone down.
