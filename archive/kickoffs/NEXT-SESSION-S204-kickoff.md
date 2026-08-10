# SESSION 204 — KICKOFF

**Read `CLAUDE.md` and `VOICE.md` in full first. VOICE.md is never sampled** — it is 680 lines
and the Read tool will page it; read the second page too. Then read **only** these sections of
the logs: `MISSION-CONTROL.md` → the Mandatory Closing Protocol + the **Session 203** entry.
Do not read any `*-ARCHIVE.md` whole.

**No label exempts a page from review.** DIAMOND, CONSECRATED, HAMMER-LOCKED, POLISH-LOCKED,
born-apex and the psychology sweep are historical notes on what was *last* looked at — never a
shield. This kickoff carries **no skip-list.**

**GATE 0 binds: do not close below 80% of the context window used (≥160K/200K).** Aim ~85%.

---

## WHAT YOU INHERIT

S203 closed both P0 doorway pages against primary sources, swept 75 pages at 390px and 33 at
768px, closed six Christless catches, ratcheted CHECK 10 from 713/233 to **471/60**, and added
CHECK 21. Full record: `MISSION-CONTROL.md` Session 203.

**Two things it learned that will save you an hour and are now canon:**

1. **`fetch(url, {cache:'reload'})` does not cache-bust the loaded document's own subresources.**
   S203's probe fetched fresh HTML into an iframe `srcdoc` — and the iframe's
   `<link rel="stylesheet" href="/global.css">` came straight out of the HTTP cache. It reported
   *both* of S202's corpus-wide fixes as dead, with the CSSOM agreeing, while a `fetch` of the
   same stylesheet in the same tab returned them present. **Rewrite `href="/global.css"` to
   carry `?cb=<ts>` in the HTML before setting `srcdoc`.** CLAUDE.md law 12.
2. **The "skip self-clipping elements" rule hides truncated text.** It is right for structure and
   blind to content. `/scripture-tsunami` was slicing five of six TULIP filter labels off
   mid-word (19–47px, no ellipsis, no scrollbar) inside an `overflow:hidden` the rule tells you
   to skip. **Law 8 now requires a second pass inside clip roots** — no `text-overflow:
   ellipsis`, text-bearing descendant with `scrollWidth - clientWidth > 3` = report it.

**Do not re-open P0a/P0b (S202) or the S202 grid/breadcrumb fixes.** All verified live and
correct in a cache-busted browser twice now.

---

## PRIORITY 0 — FINISH THE PHONE-WIDTH SWEEP, INCLUDING THE CLIP PASS

S203 swept 75 pages of 687 with the structural probe and only **26** with the new clipped-text
probe. The clipped-text probe is the one that found a real reader-facing defect on its first
outing, and it has barely been run.

Build both probes per CLAUDE.md law 8 (**falsify each before trusting a clean result** — inject a
100-char `white-space:nowrap` `<p>`; S202's first probe returned zero on nineteen pages and was
simply broken). Then sweep **60–80 fresh pages** at 390px, weighted toward:

- the 60 pages still carrying inline `style=` attributes (they are the ones with bespoke layout),
- any page with a `<style>` tag on the CHECK 8 allowlist (27 of them — widgets and CSS-diagrams),
- the 15 printables, which nothing has ever render-checked at phone width.

`/scripture-tsunami` still reports 4px on `main` + `article`; the `overflow-wrap` fix may absorb
it. Re-measure before chasing it.

---

## PRIORITY 1 — THE GOSPEL-ABSENCE QUEUE, AT 127

The deepest theological defect on the list and the one most worth a session: a page that lands
the reader in sovereignty **without a Savior**. `node detect-gospel-absence.js`, sort by hit
count, take the 1-hit pages first.

S203 did six and the pattern held every time: **the catch was already good, and the fix was one
paragraph that located Christ inside the page's own image** — fairness at Golgotha falling on the
wrong man on purpose; two intercessors, one at each end of the call; the destroyer reading the
doorframe rather than the family; Jesus weeping outside a grave He was about to open. Do not
bolt on a gospel presentation. Find the thing the page has already built and put Christ at the
bottom of it.

Two disciplines while you are in the catch — it is the densest defect real-estate on the site:

- **§XXIII.** `ot-moses-pharaoh` carried a textbook conditional catch (*"if you find yourself
  resting in it right now, that rest is His gift"*) that silently excludes the reader who feels
  nothing. Look for it in every close you touch.
- **The detector reads tokens, not theology.** Two S203 lifts named Christ obliquely ("a Man
  who has been dead," "the Power greater") and stayed flagged — correctly. Name Him.

---

## PRIORITY 2 — STANDING QUEUES (drain until GATE 0 is met)

1. **Inline `style=`: 471 across 60 pages** (CHECK 10, re-baselined — the ceiling is 471 now,
   never raise it). The method that worked: **enumerate the distinct style strings first.** S203
   expected a long tail and found that three strings were 257 of the 905. Next largest: a
   17× `color/font-size/line-height/margin-bottom` paragraph style on **one** page; a 13×
   `display:flex; align-items:center; margin-bottom:1rem` on 4 pages; a 10× card style on
   `secular-genetics-sovereignty` (62 attributes, the worst page on the site).
2. **The 21 scripts on the brittle `<article class="article-body"` literal.** CHECK 21 now makes
   divergence loud, but the sweep itself is undone. **Anyone attempting it must decide
   deliberately what happens to the canonical 611** — `contact`/`donate`/`sitemap` and all 15
   printables + `the-60-second-case` currently fall out of the index *by accident of the
   matcher*, and a tolerant regex silently moves the count. Make the exclusion a list, not a
   side effect.
3. **156 pages carry a lock with no session tag** — assign one on next touch.
4. **CHECK 17 = 62 misquotations**, sorted smallest-edit-distance-first in
   `archive/S198-scripture-queue.txt`. Untouched for several sessions. The smallest ones are
   unambiguous and each is a page telling a reader the Bible says something it does not.

---

## NON-NEGOTIABLES

- **NIV 2011 only.** No `(NIV)` suffix. §XV transparency where the NIV under-translates a point
  the page argues. **Check quotations against `scripture-niv.js` — it is ground truth and it is
  already in the repo.** If a verse is *not* in that file, do not quote it verbatim without
  web-verifying first; CHECK 17 has no ground truth for it either.
- **Verify every historical claim on the web before writing it.** S203 found the Anselm page
  asserting that *Cur Deus Homo* teaches definite atonement (it does not — Anselm says "the sins
  of the whole world" and the century after him settled the other way) and that Aquinas "could
  not finally evade Anselm's God" (he **rejected** the ontological argument outright). Both had
  scanned clean for months. **A confident sentence is not an evidenced one** — and the true
  version is almost always the better page.
- **No emojis, anywhere, ever.** CHECK 16 enforces four encodings.
- **Verify every `<a href>` exists on disk before writing it.** 8–12 internal links per article,
  first mention only. `/question-prevenient-grace` does **not** exist; it is
  `/demolition-prevenient-grace`.
- **Write, don't Edit, whole passages** — preserves persuasive cohesion.
- **No git commands. Ever.** Aaron pushes manually.
- **New internal docs go in `archive/`**, never the repo root.
- **Do not fabricate a `dateModified`.** `node stamp-modified.js <pages>` on pages with real
  content changes only. S203 deliberately did **not** stamp the 198 pages whose inline style
  became a class — byte-identical rendering is not a content change (law 11).
- **A check you have never seen fail is not a check.** Prove it fails, then trust it.
- **Grep locates; it does not establish.** Read the usage before acting on a match.

---

## CLOSE

**ORDER MATTERS.** `build-sitemap.js` derives each URL's `lastmod` from that page's JSON-LD
`dateModified`; `stamp-modified.js` is what *writes* that field.

```
node stamp-modified.js <the pages you actually edited>   # BEFORE the sitemap
node build-sitemap.js
```

Run the eight-script pipeline, then `stamp-modified.js`, then `build-sitemap.js`, then
`validate-site.js` (**ALL 21 CHECKS** must pass), then `canonical-conformance.js` and
`verify-scripture.js` (a report, not a gate). **Expect CHECK 11 to fail once** if
`auto-linker.js` added a link — clear it with `node dedupe-prose-links.js`. Ratchets stand at
**CHECK 10 = 471/60**, **CHECK 17 = 62**, **CHECK 19 = 5,369** — lower them, never raise them. If
you lower CHECK 10, run `node validate-site.js --rebaseline-styles` so the next session inherits
the lower ceiling; S203's 242-attribute reduction would otherwise have been invisible.

Verify `dateModified` == `<lastmod>` for every page you touched before you close.

Stamp every page you lifted with
`node archive/coverage.js stamp <page.html> 204 lifted|partial "<note>"`, then run
`node archive/coverage.js report --session=204` and paste the **END-OF-SESSION STANDING** block
verbatim into both the Session Log and the closing chat message, immediately before the push
command.

Then: MISSION-CONTROL Session 204 entry, roll the oldest live entry to the archive, write
`archive/kickoffs/NEXT-SESSION-S205-kickoff.md`, and end the chat with the fenced copy/paste push
command followed by the fenced kickoff pointer.

**Four sessions running, the defect was not where the file said it was — and three of those four
were the instrument, not the site.** S200 verified its check and never verified the site. S201
verified the site with a tool that could not see it. S202 verified the site in a browser holding
a cached stylesheet. S203 cache-busted the document and handed the iframe a cached stylesheet
anyway. The pattern is not carelessness. It is that **every layer between the truth and your eyes
can fail silently, and the layer you did not think about is the one that will.** Build the
instrument, break it on purpose, and only then believe it.

Then go write something that makes a reader set the phone down.
