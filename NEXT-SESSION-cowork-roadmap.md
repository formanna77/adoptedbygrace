# NEXT SESSION — Cowork Roadmap Track (kickoff)

*Paste-ready brief for the next agent. This is the "mechanical/UX/SEO/content-gap"
track started from a roadmap, distinct from the autonomous content-writing campaign
(the `NEXT-SESSION-S{N}` files). Last session: 2026-06-29.*

---

## WHO / WHAT / MISSION

You are continuing improvement work on **adoptedbygrace.net** (owner: Aaron Forman),
a Reformed/Calvinist site presenting and defending the doctrines of grace. Mission:
reach the people God is drawing and help them rest in sovereign grace. Treat the
doctrines of grace as true and glorious. You are running inside the project source.

**Guiding lens (read first).** The original roadmap graded the site on "persuasive
power toward undecided visitors." That is partly the wrong scoreboard. The job is
faithful, beautiful, clear witness — the Spirit regenerates, not rhetoric (John 6:44).
So: take mechanical/UX/SEO/multimedia improvements eagerly; do NOT soften the theology
or add "both-sides balance" for its own sake; pastoral care for wounded/anxious/
scrupulous consciences is on-mission.

## HARD CONSTRAINTS (never bend)

- **No git, ever.** No `git add/commit/push`. Aaron pushes manually. Save to files and stop. Print him a copy-paste push command at the close.
- **No emojis anywhere** the user can see (CLAUDE.md, absolute). Ordinary typographic arrows (→ ↻) are fine; pictographic/dingbat emoji are not.
- **NIV 2011 only**, quoted verbatim, no "(NIV)" suffix.
- **VOICE.md is the canonical style bible** — read it in full before writing any reader-facing prose.
- **Run the build pipeline + `node validate-site.js`** before closing (see below). It must pass clean.
- Follow CLAUDE.md site-structure rules (global.css, verbatim nav from `_nav-template.html`, footer-grace-warning, `<article class="article-body">` for prose pages, `.hub-card` family for hubs, no inline `<style>`).

## THE PIPELINE (now SEVEN scripts — order matters)

After creating/modifying HTML:
```
node build-testimonies.js   # render testimonies.json into testimony-hub (run FIRST if it changed)
node build-tags.js          # canonical article index (tags.json)
node build-all-content.js   # re-bake static crawlable /all-content + counts
node build-search-index.js
node build-mega-menu.js
node build-homepage-counts.js
node auto-linker.js
node wire-orphans.js
node build-sitemap.js       # when pages were added/removed
node validate-site.js       # must pass clean
```
`build-tags.js` + `build-all-content.js` were added to CLAUDE.md this session; they
were the missing step that let `tags.json` go 3 months stale. Always run them first.

---

## WHAT THE 2026-06-29 SESSION COMPLETED (do NOT redo) — full detail in `docs/session-summary-2026-06-29.md`

- **Reader testimony stream + moderated intake (gap #4) — BUILT.** New
  `share-your-story.html` (Netlify Forms intake, honeypot, consent), new
  `testimony-thank-you.html` (noindex), new `testimonies.json` (empty on purpose —
  never fabricate) + `build-testimonies.js` render pipeline, and a "Voices of the
  Still-Being-Rescued" section on `testimony-hub.html` (invitation panel until real
  stories are approved). **Two manual steps are on AARON** — see OPEN item 2.
- **Start-here staircase — COMPLETED.** Phases 1, 2, 5 now have the same prev/next
  `.phase-nav` + "Phase N of 5" indicator + back-link that 3 & 4 already had. All
  five phase pages now orient the reader and move both directions.
- **Diamond Pass — 6 prose fixes** (Newton encyclopedia-opener → forceful cold-open;
  two-arms manufactured "she" scene → offered 2nd-person; devotional pastoral-sigh
  cut; testimony-hub stat/subtitle reconcile; intake-page tightening).
- Canonical **607 preserved** (new utility pages excluded from build-tags /
  search / sitemap as appropriate). `validate-site.js` 6/6 on 685 files.

## WHAT THE 2026-06-28 SESSION COMPLETED (do NOT redo) — full detail in `docs/session-summary-2026-06-28.md`

The #1 roadmap bug (counter/index) is FIXED and validated:
- **One canonical number: 607** (pages with `<article class="article-body">`), flowing from `tags.json` → homepage total → `/all-content` → meta. `build-tags.js` now filters to that set.
- **Homepage counts show without JS:** `build-homepage-counts.js` rewritten to bake the real number as VISIBLE TEXT (was hardcoded `0` + JS animation). Every tile now an honest per-category count.
- **/all-content is crawlable:** new `build-all-content.js` bakes 607 static `<a>` cards; JS only layers filtering (no fetch). Big SEO win.
- **Homepage meta upgraded** (title + description, mirrored to og/twitter/schema); stray heart emoji removed; stale "290+/367+/490+" swept to "600+".
- **New `/author` page** (humble, Christ-exalting, John 3:30, NIV, ends in catch). Discoverable from 322 article bylines (repointed `By Aaron Forman` → `/author`), the About footer, and the sitemap. `add-bylines.js` updated for future bylines. **It invents no biographical specifics — Aaron must personalize.**
- Sitemap regenerated (685 URLs, incl. `/author`). `validate-site.js` passes 6/6.

**SEO reality (corrects the roadmap):** Google Search Console is ALREADY verified
(DNS domain property — no HTML file needed) and reading the site; the sitemap is
submitted; Bing/IndexNow is already wired (`indexnow-ping.js` + key file). Do NOT
"set up GSC." The real issue is young-domain ranking; outreach is tracked in
`docs/outreach-log.md` / `docs/backlink-outreach-plan-2026-05.md`. See `docs/gsc-findings-2026-05.md`.

---

## OPEN / NEXT (confirm priorities with Aaron via AskUserQuestion before big work)

1. **Verify the live fix (do this once Aaron has deployed).** In a real browser /
   on mobile: confirm the homepage shows 607 (not 0) before any scroll and with JS
   disabled; confirm `/all-content` lists all 607 with working filter; confirm long
   essays read comfortably on a phone. (These were UNVERIFIED last session — Chrome/
   serving couldn't reach the deployed site from the sandbox.) **Also now verify:** the
   `/testimony-hub` "Voices" invitation renders, `/share-your-story` displays the form
   cleanly, and (after Forms is enabled) a test submission lands in the Netlify
   dashboard and redirects to `/testimony-thank-you`.

2. **Reader testimonies (gap #4) — BUILT; now needs AARON's two manual steps.**
   (a) **Enable Netlify Forms** (Site config → Forms → detection ON; add a submission
   email notification). The `testimony` form auto-detects on next deploy. Without
   this, submitters still see the thank-you page but stories are NOT captured.
   (b) **Moderate → publish:** read submissions in the Netlify dashboard; for each
   approved one, add an entry to `testimonies.json` and run `node build-testimonies.js`
   + the pipeline. The hub invitation panel becomes a stream of voices automatically.
   Aaron's own testimony ("Christmas Day 2024", per existing meta) is the natural
   first entry — only he can write it. A future agent can help format approved
   stories into `testimonies.json` and verify the live form once Forms is enabled.

3. **Audio / "Rest in Grace" podcast (roadmap gap #6) — was BLOCKED.** The prior
   deliverables (`audio-devotional/` with `make_devotional_audio.py`, the sample mp3,
   the narration format) are NOT in the repo. If Aaron has now dropped them in, port
   the pipeline, render the top devotionals, add a player to flagship pages, and
   publish a podcast RSS. If still absent, it remains blocked — ask him for the files.

4. **Personalize `/author`.** Aaron's task, but you can refine tone/length or weave
   in his real testimony/background if he provides it. Don't fabricate specifics.

5. **Prior deliverables still missing from the repo** (ask Aaron to add):
   `Adopted-by-Grace-Roadmap.md` and `quick-win-1-titles-and-meta.md` (the latter has
   ready-to-paste meta for ~10 hub pages not yet applied — a quick win once present).

6. **Peer-benchmark on-ramps:** the `start-here-phase1–5` staircase is now DONE
   (2026-06-29). "In Brief" is effectively at full coverage (the only article-body
   pages without it are utility/bio: author, privacy, terms, testimony-wall, plus the
   two interactive flagships the-mirror / the-objection-collapse). Remaining optional
   work edges into the content campaign — coordinate.

7. **Diamond Pass carry-overs (subagent-flagged 2026-06-29, not yet done):**
   corpus-freshness — the somatic "watch what your body does on the word *cannot*"
   device recurs across pages (vary it); `question-where-did-your-faith-come-from.html`
   has one slightly-academic metacognition paragraph to compress.

---

## FIRST MOVES

1. Read `docs/session-summary-2026-06-28.md` and this file. Skim `CLAUDE.md` + `VOICE.md`.
2. **Priority-0 sanity check that the prior fix still holds:** confirm `tags.json`
   pageCount, the homepage `total-number` visible text, and `/all-content`'s
   `#articleCount` + static card count all equal the same number; `grep` that no
   homepage count span renders `>0<`; run `node validate-site.js`.
3. Use **AskUserQuestion** to confirm scope (testimonies vs audio vs QA vs other)
   before multi-step work.
4. Execute. Close by running the 7-script pipeline + validator, then print Aaron's
   push command (you never run git yourself):
```
cd "/Users/aaronforman/Documents/adoptedbygracewebsite" && git add -A && git commit -m "<summary>" && git push
```

## FILE MAP (new/changed last session)

- New: `author.html`, `build-all-content.js`, `docs/session-summary-2026-06-28.md`, this file.
- Changed scripts: `build-tags.js`, `build-homepage-counts.js`, `add-bylines.js`, `build-related.js`, `CLAUDE.md` (pipeline now 7 scripts).
- Changed content/data: `index.html`, `all-content.html`, `about.html`, `tags.json`, `sitemap.xml`, `search-index.js`, +13 pages (number sweep), +322 pages (byline → /author).
