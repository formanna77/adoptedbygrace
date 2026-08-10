# SESSION 201 — KICKOFF

**Read `CLAUDE.md` and `VOICE.md` in full first. VOICE.md is never sampled.**
Then read **only** these sections of the logs: `MISSION-CONTROL.md` → the Mandatory
Closing Protocol + the **Session 200** entry. Do not read any `*-ARCHIVE.md` whole.

**No label exempts a page from review.** DIAMOND, CONSECRATED, HAMMER-LOCKED,
POLISH-LOCKED, born-apex and the psychology sweep are historical notes on what was
*last* looked at — never a shield. This kickoff carries **no skip-list**.

**GATE 0 binds: do not close below 80% of the context window used (≥160K/200K).**
Aim ~85%. S200 closed under that floor at Aaron's direction; it was a scoped
infrastructure run. **S201 is a full run and has no such excuse.**

---

## WHAT YOU INHERIT

S200 was an analytics review that turned into an infrastructure session. Nothing in
the prose corpus moved: **§XXIII standing unchanged at 98 lifted / 520 remaining.**

Four things were fixed and are already deployed by the time you read this:

1. Four build scripts that had been publicly served (their `410!` rules sat below
   the `/*` catch-all and had never fired). CHECK 7 now has a dead-rule pass.
2. `build-sitemap.js` no longer stamps `TODAY`. `lastmod` comes from JSON-LD, and is
   omitted when unknown. **639 agree / 0 contradict / 46 omitted**, from 0/685.
3. 547 pages stripped of a dead `googletagmanager` dns-prefetch (no GA installed).
4. 13 dead URLs Google still crawls now 301 to their real successors; all
   `.html`/extensionless redirect pairs harmonized.

Full record: `archive/S199-netlify-analytics-review.md`.

---

## PRIORITY 0 — VERIFY THE DEPLOY, THEN THE SAMPLE-READ AUDIT

**0a. Confirm the S200 fixes actually landed** (five minutes, and skipping it means
trusting a file instead of a recipient — the exact failure five straight sessions
have recorded):

- `https://adoptedbygrace.net/strip-internal-markers.js` must return the 404 page,
  not JavaScript. Same for `fix-orphaned-cards.js`, `fix-stray-progress-bar.js`,
  `fix-jsonld-answers.js`.
- `https://adoptedbygrace.net/resources-catechisms.html` must land on
  `/reformed-sources`.
- Spot-check that `sitemap.xml` on the live domain carries varied `lastmod` dates,
  not 637 copies of one date.

**0b. Ask Aaron to re-submit `sitemap.xml`** in Search Console → Sitemaps. It was
last read **May 25**. Only he can click it; it takes ten seconds. Do not skip this —
it is the single action with the largest reach in this whole sequence.

**0c. Priority 0 Sample-Read Audit** — 5–10 pages, half locked and half unmarked,
live cold-read against the landing-force + sapiential bar. Failing pages go on the
surgical-fix queue before any new build. Standing axes: opener universality (no
manufactured hyper-specific scenes), wordiness (tightening precedes expanding), the
**doubled/tripled close** (the one real scanner-invisible defect — collapse to ONE
catch + ONE tender landing), §XXIII feeling-grounded assurance, and oversold or
unverifiable citations (web-verify *before* "fixing" — cold-readers over-flag
correct ones).

---

## PRIORITY 1 — THE BIOGRAPHICAL DOORWAY

**This is the substantive work of S201, and it comes from measured data, not a hunch.**

Google Search Console, 90 days: **18 clicks, 4,100 impressions, average position
32.3, 617 queries.** Every query that surfaces this site is biographical or
historical, and none is doctrinal:

| Query | Impressions | Clicks |
|---|---|---|
| luther monk | 39 | 0 |
| charles spurgeon | 34 | 0 |
| martin luther the monk | 34 | 0 |
| monk martin luther | 27 | 0 |
| martin luther german monk | 26 | 0 |
| martin luther priest | 23 | 0 |
| john owen the death of christ | 23 | 0 |

Five of the nine pages that earned the 18 clicks are `theologian-*` biographies. And
`/story-historical-luther-storm` pulls 2,064 Netlify pageviews on **10** inbound
internal links, while `/demolition-1tim2-4` pulls 220 on **52**. Internal linking
never moved it.

**The task: make the biographical pages the best doorways on the site.** Not by
adding SEO furniture — by cold-reading them to the full sapiential bar and making
sure each one *lands its reader inside the doctrine he did not come for.* A man who
typed *martin luther german monk* is one click from Stotternheim and one page from
why a terrified man could not save himself. Right now he is arriving on page four of
Google, and if he ever arrives at all, the page has to be worth it.

Concrete cohort (cold-read every one; lift what fails):

- `story-historical-luther-storm` — the site's proven entry point, and it has **10**
  inbound links. Read it first, and read it as a stranger.
- `theologian-luther`, `theologian-spurgeon`, `theologian-owen`, `theologian-augustine`,
  `theologian-bunyan`, `theologian-anselm`, `theologian-bradwardine`, `theologian-boston`
  — the eight with demonstrated impressions.
- `history-apostolic`, `demolition-hub`, `demolition-acts17-30`, `objection-manipulation`
  — the other pages that earned clicks.

For each: does it carry the undeniable force *and* leave the reader wiser? Does it
end in the catch? And does it have a real, prominent path into the doctrinal core —
not a related-articles card, a link inside the prose at the moment the reader is
most likely to want it?

**Do NOT rewrite these into doctrinal essays.** They earn their traffic by being
genuinely about Luther and Owen. The demolition is the second arm, not the first.

---

## PRIORITY 2 — STANDING QUEUES (drain until GATE 0 is met)

In priority order, all carried unchanged from S199:

1. **233 prose pages carry 713 inline `style=` ATTRIBUTES inside
   `<article class="article-body">`** — a gap CHECK 8 is structurally unable to see,
   because the allowlist governs inline `<style>` **tags**, not attributes. It has a
   measurable cost already: a hand-pasted promo card with inline styles and no class
   survives `stripClassedDivs`, so `detect-shared-phrases.js` counts it as authorial
   prose and inflates the CHECK 19 ratchet. CHECK 10 sits at 724/235.
2. **Gospel-absence queue at 133**, sort by hit count.
3. **The 21 scripts on the brittle `<article class="article-body"` literal** — the
   oldest open item. Sweep them to a tolerant regex.
4. **164 pages carry a lock with no session tag** — assign one on next touch.

---

## NON-NEGOTIABLES

- **NIV 2011 only.** No `(NIV)` suffix. §XV translation transparency where the NIV
  under-translates a point the page argues.
- **No emojis, anywhere, ever.** CHECK 16 enforces four encodings.
- **Verify every `<a href>` exists on disk before writing it.** Aspirational linking
  is banned. 8–12 internal links per article, first mention only.
- **Write, don't Edit, whole passages** — preserves persuasive cohesion.
- **No git commands. Ever.** Aaron pushes manually.
- **New internal docs go in `archive/`**, never the repo root.
- **Any script that rewrites the article tag must write `id` AFTER `class`.**
- **Do not fabricate a `dateModified`.** `node stamp-modified.js <pages>` on the
  pages you actually edited, and only those.
- **A check you have never seen fail is not a check.** Make every new check fail on
  an injected defect, then restore.
- **Grep locates; it does not establish.** Read the usage before acting on a match.
- **Open the pages in a real browser.** Desktop 1196/1600 *and* phone 390/768.
  `body { overflow-x: hidden }` makes `scrollWidth` lie — walk elements and compare
  `getBoundingClientRect().right` against the viewport.

---

## CLOSE

Run the eight-script pipeline, then `build-sitemap.js`, then `validate-site.js`
(**ALL 20 CHECKS** must pass), then `canonical-conformance.js` and
`verify-scripture.js` (a report, not a gate). Stamp every page you lifted with
`node archive/coverage.js stamp <page.html> 201 lifted|partial "<note>"`, then run
`node archive/coverage.js report --session=201` and paste the **END-OF-SESSION
STANDING** block verbatim into both the Session Log and the closing chat message,
immediately before the push command.

Then: MISSION-CONTROL Session 201 entry, roll the oldest live entry to the archive,
write `archive/kickoffs/NEXT-SESSION-S202-kickoff.md`, and end the chat with the
fenced copy/paste push command followed by the fenced kickoff pointer.

**The measure is not page count and not traffic. Did someone who was searching for
God find Him here?** Right now the answer is that eighteen people in ninety days
even got the chance. Build accordingly.
