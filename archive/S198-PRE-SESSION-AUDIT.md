# PRE-S198 DIAGNOSTIC SWEEP — 2026-08-04

Run before S198 opened, at Aaron's request: *"can you find anything within the website that needs to be done before we continue."* Method was deliberately not the kickoff's queue — a fresh sweep of the whole machine, on the assumption that anything the last session already knew about would be in its own carry-forward list, and that what matters is what nobody is looking at.

The gate was green when this started. **All 15 checks passed.** Two live reader-facing defects were sitting underneath it, and neither was findable by any check the site owned.

---

## 1. THE HOMEPAGE'S THREE DISCOVERY DOORS HAD BEEN STALE SINCE APRIL

`content-manifest.js` was last generated **2026-05-27**, with its newest entry dated **2026-04-04**. It powers three things on the front door, and only these three:

- **Spotlight** — 3 cards, reshuffled on every visit
- **Discover Random** — the "show me something" button
- **Recently Added** — the 8-item list of what is newest

Pool was **533 entries against 611 canonical prose pages.** **127 pages — 20% of the corpus, including every `analytical-*` page — could not be reached through any of the three.** And the "Recently Added" list, the site's own claim about what it has been doing lately, had been advertising April articles as new for four months.

Verified in a browser before the fix, not inferred. The eight items it rendered were dated 2026-03-30 to 2026-04-04.

### Why no check caught it

The hrefs are built at runtime from a JavaScript array. CHECK 1 scans `href` attributes in HTML — there are none to scan. This is the same class of blindness as Times New Roman on 347 pages: the HTML was perfectly valid, and the defect lived in what the page *did* with it. It took loading the homepage and reading what the widgets actually painted.

### Why it went stale — the part worth keeping

`generate-manifest.js` derived every page's date by shelling out to `git log --diff-filter=A`. **GIT POLICY reads "Do not run any git commands. ZERO EXCEPTIONS."** So no session would run it, it quietly fell out of the pipeline, and the artifact rotted. The script and the policy had been in direct contradiction since the policy was written, and the artifact lost silently.

**The general law, now in CLAUDE.md: a build script that no session is willing to run is a stale artifact with extra steps. If a tool conflicts with a standing policy, the conflict is the bug — fix the tool.**

### The fix

`generate-manifest.js` is rewritten and git-free.

- Dates live **write-once** in `archive/manifest-dates.json` — stamped the first time a page is seen, never recomputed. 533 existing dates were recovered from the old manifest (they came from real git history and are the most trustworthy signal available); the remaining 115 were stamped from each page's own JSON-LD `datePublished`, so the homepage and the structured data can never contradict each other.
- **mtime is deliberately not used.** The pipeline rewrites files constantly; mtime would reshuffle "Recently Added" on every run.
- The ledger lives in `archive/` because the repo root is served — covered by the forced splat, no new `_redirects` line to forget. It is load-bearing and says so in its own `_README` key.
- The article filter now keys on `<article class="article-body">`, the same canonical definition the other 21 scripts use, so the manifest and `tags.json` cannot drift.
- `node generate-manifest.js --check` reports staleness and writes nothing.
- **`generate-manifest.js` is now the eighth script in the pipeline in CLAUDE.md**, positioned after `build-search-index.js`, which it reads.

**Result: 533 → 606 entries, 0 dead URLs, 0 duplicates.** Verified in a browser: manifest loads at 606, Spotlight and Recently Added render, every rendered href returns 200, and a 40-URL random sample (a Discover Random simulation) came back all-200.

*The two dead URLs the old manifest carried (`/golden-chain`, `/demolition-matt23-37`) were rescued by forced 301s in `_redirects`, so no reader ever hit a 404. Checked before reporting it as one.*

---

## 2. THE EMOJI BAN HAD NOTHING ENFORCING IT

CLAUDE.md's most absolute rule — *"NO EMOJIS, ANYWHERE, EVER. Absolute, zero exceptions"* — was the only major law on this site with no check behind it. **The word "emoji" appeared in `validate-site.js` zero times.**

Two survivors, and the second is the instructive one.

**`global.css:7279` — `✕` (U+2715)** in a `content:` property, painting a dingbat into every row of the cannot-list on `question-dead-man-visual`. Not a face, not a flag — just a dingbat inside the U+2600–U+27BF range CLAUDE.md names explicitly. Replaced with a CSS-drawn disc and a single bar struck through it: the line drawn through a name.

**`search.html:498` — a magnifying glass written as the decimal HTML entity `&#128270;`.** This one is why the check exists. It is **pure ASCII in the source**, so every codepoint sweep the site has ever run — including S74's, which cleared the corpus — walked straight past it. It sat in the no-results state of the search page, which is to say: on the screen of every reader who searched for something and did not find it. Replaced with a CSS-drawn open lens.

### CHECK 16

Added above the verdict block; banner updated to SIXTEEN in the same edit. It decodes **four** encodings, not one:

| form | example |
|---|---|
| literal glyph | `✨` |
| CSS escape | `content: "\2728"` |
| HTML entity, hex and decimal | `&#x1F525;` · `&#10024;` |
| JS escape | `✨` · `\u{1F600}` |

Scope is what the reader can see — `.html`, `.css`, and runtime-loaded `.js` — gated by the same `isPublic` test CHECK 7 uses, so the two cannot drift apart. Build scripts print check-marks to a terminal and are 410'd; they are correctly out of scope. Arrows (U+2190–U+21FF) are deliberately **not** banned: `→` is typography, and "Read →" is load-bearing on the homepage.

**Proven to fail before being trusted to pass**, per PRESENTATION INTEGRITY law 3. It was injected with all four encodings and caught all six planted characters, naming the encoding of each.

**And the first draft of it failed that proof honestly.** It caught the literal `✨` and waved through `content: "\2728"` on the very next line — same rendered character, invisible to a codepoint walk. That miss is the only reason the encoded forms are in there, and it is the reason `search.html` was found at all: the hardened version turned it up on its first real run. *Grep locates; it does not establish.*

---

## 3. FOUND, NOT FIXED — S198 SHOULD SCOPE THESE

**Stale JSON-LD dates, at scale.** PRESENTATION INTEGRITY law 7 says plainly that a stale `dateModified` is a machine-readable falsehood. The corpus currently reads:

- `dateModified` — **373 pages still claim 2026-04**, 18 claim June, 5 claim August. Sessions S180–S197 rewrote hundreds of pages in July and August. Most of those pages are telling Google they have not been touched since April.
- `datePublished` — **nothing in the corpus is dated later than 2026-06-30.** Pages built in July and August are inheriting old dates or never getting stamped.

This has a real consequence beyond honesty: "Recently Added" is now correctly derived from `datePublished`, so it is only as truthful as that field. The fix is not a blanket bump — that would trade one falsehood for another. `archive/coverage.js` carries per-page session stamps and is the honest signal for which pages actually changed and when.

**Everything S197 recorded as carried forward is still open and unchanged:** CHECK 17 for the clone ceiling (271 passages / 4,944 duplicated words); the gospel-absence queue at 134 with 3 worked; the 21 scripts keyed to the brittle `<article class="article-body">` literal, still the oldest open item; 167 pages carrying a lock with no session tag; CHECK 10 at 724/235.

**Note on numbering:** the clone ceiling was called "CHECK 16" in the S198 kickoff. That number is now taken by the emoji check. **It is CHECK 17.**

---

## 4. VERIFIED CLEAN

`validate-site.js` **ALL 16 CHECKS PASSED** · render check passed at 1196px and 1600px across all six archetypes with Playfair confirmed loaded · `canonical-conformance` 686/686 · `fix-orphaned-cards --dry-run` and `fix-stray-progress-bar --dry-run` both inert · `generate-manifest.js --check` reports current · sitemap correct (the three absences are `_nav-template`, `index` as root `/`, and a `noindex` thank-you page) · every root `.md` carries its forced `410!` · no hardcoded sandbox paths in `archive/*.js` · `tags.json`, `/all-content` and the homepage all agree at 611.

Full eight-script pipeline run: tags, all-content, search-index, **manifest**, mega-menu, homepage-counts, auto-linker (0 added — idempotent), wire-orphans (0 orphans).

---

## THE LESSON THIS SWEEP ACTUALLY TAUGHT

Both defects were invisible to a green gate, and both were found the same way — by asking what the reader sees rather than what the file contains. One needed a browser. The other needed a check to be written badly first, and then honestly tested.

The site now has sixteen checks. The two that found something today are the two that were written after somebody looked at a page.

*Files touched: `generate-manifest.js` (rewritten), `validate-site.js` (CHECK 16), `global.css` (two CSS marks), `search.html` (one entity), `CLAUDE.md` (pipeline + CHECK 16 + the policy-conflict law), `archive/manifest-dates.json` (new, load-bearing), plus regenerated pipeline artifacts.*
