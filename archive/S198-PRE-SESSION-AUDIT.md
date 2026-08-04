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

---

# SECOND PASS — after the first fixes were pushed

Aaron pushed the above, then asked the same question again. A second sweep went at angles the first had not touched: payload, mobile, Scripture fidelity, and the live site. It found three more, and one of them was the largest defect in the whole audit.

## 3. THE SEARCH PAGE SHIPPED 10.4 MB

Measured in a browser at 390px: **`/search.html` transferred 10.41 MB. The homepage transfers 0.21 MB.** The search page was **fifty times heavier than the front door.**

9.44 MB of it was `search-index.js` — the full body text of all 683 pages, ~12 KB each, 98.2% of the file — loaded **render-blocking**, with no `defer`, right in the markup. A reader on a phone waited for the entire corpus to arrive before the search box would paint. Against CLAUDE.md's own words: *"We can out-argue every peer site on the page and still lose the reader who never got to the page."*

**Fixed by lazy-loading, with zero loss of search quality.** The index is now fetched on demand by `ensureIndex()` — a three-state loader (`idle → loading → ready|error`) that every entry point funnels through, so ordering cannot be got wrong. A query arriving before the index says "Searching…" and runs the moment it lands. Warm-up listeners fire on click, touch, or hover over a topic pill.

**The subtle part, and it is the whole fix:** those listeners are bound **on the next tick**. The input carries `autofocus`, which fires during page load, before any human has done anything — so binding immediately meant every visitor still pulled 9.4 MB whether they searched or not. The first implementation did exactly that and measured no better than before. Binding late is what makes it work.

| | before | after |
|---|---|---|
| lands, does not search | 10.41 MB | **0.97 MB** |
| types a query | 10.41 MB | 10.41 MB (unchanged, on demand) |
| deep link `?q=` | 10.41 MB | 10.41 MB (fetched immediately, correct) |

Verified in a browser across four paths: cold load, typing, clicking a popular topic, and a `?q=` deep link. Full-text matching, deep-body terms, snippets, and the no-results state all behave exactly as before.

## 4. CHECK 12 WAS AN ALLOWLIST WEARING A BUDGET'S CLOTHES

CHECK 12 was supposed to guard page weight. It named three files: `/nav.js`, `/scripture-niv.js`, `/content-manifest.js` — the three that happened to be a problem in S194. **9.4 MB was not on a list of three, so the check printed green over it every session since.**

Rewritten as a **size budget, deny-by-default**: any script over 100 KB must `defer`, whatever it is called, forever. The threshold sits below `nav.js` (181 KB) so the known offender stays caught. It now also prints what it weighed, so the number is visible rather than assumed.

**Proven to fail first:** the blocking tag was reintroduced and the check reported `search.html — /search-index.js (9671 KB)`. Restored, and it passes.

**The general form, now in CLAUDE.md: a guard that enumerates known offenders only ever catches the past. Enumerate the condition, not the instances.**

### And it nearly broke search on the way

Moving to a dynamic `s.src = '/search-index.js'` made the file vanish from CHECK 7's runtime-asset set — it only matched a literal `src="..."` attribute. CHECK 7 reclassified it as an unserved internal file and **printed the exact `410!` line that would have taken site search offline.** It now also matches `.src =`, `import(...)` and `fetch(...)`.

**A check that recommends a fix must be right about what the fix does.** Do not paste a validator's suggested redirect without asking what actually loads that file.

## 5. NOBODY HAD EVER TESTED A PHONE

Every render check the site owned measured 1196px and 1600px — two desktop widths, on a site whose readers are overwhelmingly on phones.

Worse: `global.css` line 88 sets `body { overflow-x: hidden }`. That does not prevent overflow, it **conceals** it. `documentElement.scrollWidth` reports zero no matter how far content spills off the right edge. No scrollbar. No warning. The content is simply gone, and nothing in a validator can see it.

Two live defects, invisible for months:

**`psychology-why-we-resist`** — `.pairing-scripture` carried `white-space: nowrap`, left over from a design where it held a short verse reference. Every one of its **15 live uses across 3 pages holds real prose** (73–748 characters), so whole Scripture quotations rendered on a single unbreakable line **3,182px wide.** On a 390px phone the reader saw roughly **12% of Romans 1:18** and had no way to know the rest existed. It was broken at *every* width, desktop included — the mask hid it there too. Fixed: `nowrap` removed, `overflow-wrap: break-word` added. Worst element now 317px at 390px viewport, 959px at 1196px.

**`the-golden-chain`** — `.chain-cta` is a grid inside a flex parent, and a flex item's default `min-width: auto` refuses to shrink below min-content, which `minmax(250px, 1fr)` computes as 782px. **432px of the closing call-to-action sat off-screen** on a flagship interactive page. Fixed with `minmax(min(250px, 100%), 1fr)` plus `min-width: 0`.

**Not fixed, and correctly so:** `the-mirror`'s `.mirror-progress` extends 8px past the viewport by way of `margin: 0 -1.5rem` — deliberate full-bleed for a sticky bar, with its own inner padding, so nothing is clipped. Triage, not verdict.

**New standing tool: `archive/s198-mobile-check.js`.** Measures 390px and 768px, walks element rects rather than trusting `scrollWidth`, excludes deliberate horizontal scrollers, and prints progress so a slow run is distinguishable from a hung one. Two implementation notes worth keeping: it calls `getBoundingClientRect` *before* `getComputedStyle` — the first draft did the reverse and never finished on `all-content.html`'s ~20k nodes — and a long-running check that prints nothing looks exactly like a broken one, which cost two restarts before anyone could tell.

## 6. SCRIPTURE AUDIT — THE REPORT IS TOO NOISY TO USE

`verify-scripture.js` reports **269 divergent references across 3,892 quotations**, and it is currently unusable as a signal. Its extractor grabs any quoted string near a reference, so the report is dominated by headings, prose fragments, and card text scraped out of `all-content.html`. Real findings are in there — e.g. 1 Corinthians 15:22 appears both as *"As in Adam all die, so in Christ all will be made alive"* and as the compressed *"In Adam all die; in Christ all will be made alive"*, the second presented as a quotation — but they are buried.

This is the same lesson S197 recorded about the clone detector: **an unreadable report is not a check.** Tightening the extractor to quotations actually marked as such, and excluding generated pages like `all-content.html`, should come before anyone works the queue. Left for S198 deliberately; NIV fidelity is the site's central promise to the reader and deserves a real pass, not a skim.

## 7. FOUND, NOT FIXED — S198 SHOULD SCOPE THESE

**Stale JSON-LD dates, at scale.** PRESENTATION INTEGRITY law 7 says plainly that a stale `dateModified` is a machine-readable falsehood. The corpus currently reads:

- `dateModified` — **373 pages still claim 2026-04**, 18 claim June, 5 claim August. Sessions S180–S197 rewrote hundreds of pages in July and August. Most of those pages are telling Google they have not been touched since April.
- `datePublished` — **nothing in the corpus is dated later than 2026-06-30.** Pages built in July and August are inheriting old dates or never getting stamped.

This has a real consequence beyond honesty: "Recently Added" is now correctly derived from `datePublished`, so it is only as truthful as that field. The fix is not a blanket bump — that would trade one falsehood for another. `archive/coverage.js` carries per-page session stamps and is the honest signal for which pages actually changed and when.

**Everything S197 recorded as carried forward is still open and unchanged:** CHECK 17 for the clone ceiling (271 passages / 4,944 duplicated words); the gospel-absence queue at 134 with 3 worked; the 21 scripts keyed to the brittle `<article class="article-body">` literal, still the oldest open item; 167 pages carrying a lock with no session tag; CHECK 10 at 724/235.

**Note on numbering:** the clone ceiling was called "CHECK 16" in the S198 kickoff. That number is now taken by the emoji check. **It is CHECK 17.**

---

## 8. VERIFIED CLEAN

`validate-site.js` **ALL 16 CHECKS PASSED** · desktop render check passed at 1196px and 1600px across all six archetypes with Playfair confirmed loaded · **mobile render clean at 390px and 768px across all six archetypes** · `canonical-conformance` 686/686 · `fix-orphaned-cards --dry-run` and `fix-stray-progress-bar --dry-run` both inert · `generate-manifest.js --check` reports current · sitemap correct (the three absences are `_nav-template`, `index` as root `/`, and a `noindex` thank-you page) · every root `.md` carries its forced `410!` · no hardcoded sandbox paths in `archive/*.js` · `tags.json`, `/all-content` and the homepage all agree at 611.

Full eight-script pipeline run: tags, all-content, search-index, **manifest**, mega-menu, homepage-counts, auto-linker (0 added — idempotent), wire-orphans (0 orphans).

Live site checked over HTTP after the first push: `/CLAUDE.md` and `/archive/manifest-dates.json` both return empty (410 holding), `/content-manifest.js` serving.

---

## THE LESSON BOTH SWEEPS TAUGHT, TWICE

Five defects, every one of them sitting under a green gate, and not one findable by reading a file.

- The stale manifest needed a **browser**, because the hrefs did not exist until JavaScript built them.
- The `search.html` emoji needed a **check written badly first** — the draft that caught `✨` and waved through `\2728` is the only reason the encoded forms went in, and the hardened version found the decimal entity on its first real run.
- The 9.4 MB payload needed a **network measurement**, because the markup was valid and the file was never mentioned in any rule.
- The two mobile defects needed a **phone-width viewport and a distrust of `scrollWidth`**, because `overflow-x: hidden` had been quietly swallowing the evidence at every width for months.

The pattern underneath all four: **every one of these lived in the gap between what a file says and what a reader receives.** Grep, and even a sixteen-check validator, only ever reads the first half of that sentence.

And a rule worth carrying into every session that adds a guard: **CHECK 12 failed not because it was wrong, but because it enumerated instances instead of the condition.** It named the three heavy scripts of S194 and was therefore structurally incapable of seeing the fourth. Every allowlist is a bet that the future resembles the past.

*Files touched across both passes: `generate-manifest.js` (rewritten, git-free), `validate-site.js` (CHECK 16 new; CHECK 12 rewritten as a size budget; CHECK 7 runtime detection widened), `search.html` (lazy loader + entity), `global.css` (three CSS fixes), `the-golden-chain.html` (grid min-width), `CLAUDE.md` (pipeline, CHECK 12/16, mobile law, on-demand law), `archive/manifest-dates.json` (new, load-bearing), `archive/s198-mobile-check.js` (new standing tool), plus regenerated pipeline artifacts.*
