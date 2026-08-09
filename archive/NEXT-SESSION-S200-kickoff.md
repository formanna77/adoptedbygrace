# S200 KICKOFF — adoptedbygrace.net

You are the lead. Read `VOICE.md` **in full** (it is the standard, never sampled), then `CLAUDE.md`, then the top **two** entries of `MISSION-CONTROL.md`'s Session Log — **`Session 199` and `Session 198`, those two only**, never `MISSION-CONTROL-ARCHIVE.md`.

**No skip-lists. No label exempts a page** — DIAMOND, CONSECRATED, HAMMER-LOCKED, born-apex are historical notes on what was *last* reviewed, never a shield. Scan everything for everything.

---

## THE STATE YOU INHERIT

| | |
|---|---|
| `validate-site.js` | **20 checks, all passing.** The next one you add is **CHECK 21.** |
| Build pipeline | **EIGHT scripts.** `generate-manifest.js` is the eighth, after `build-search-index.js`. |
| Render checks | **TWO.** Desktop (`archive/s196-render-check.js`) and mobile (`archive/s198-mobile-check.js`) at 390 and 768. Both are law. Both pass. |
| Corpus | 687 HTML / **611 canonical prose** · search-index 683 · mega-menu 655 |
| Open ratchets | CHECK 10 at 724/235 · CHECK 17 at **62** · CHECK 19 at **5,675** — all ratchet-only |
| Zero-tolerance gates | CHECK 18 (JSON-LD parses) · **CHECK 20 (JSON-LD answer prose)** — never soften these into ratchets |

**Load-bearing, do not delete or "clean up":** `archive/manifest-dates.json` (write-once date ledger — deleting it re-dates the corpus and destroys "Recently Added" permanently) · `archive/s198-mobile-check.js` (the only tool here that has ever measured a phone) · `scripture-niv.js` (a **runtime asset served to readers**, not a fixture).

**Housekeeping:** `archive/_s194infra.tmp` is a leftover the sandbox could not delete (`rm` returned *Operation not permitted*). Harmless — `archive/` is 410'd — but delete it locally.

---

## PRIORITY 0.0 — BOTH RENDER CHECKS. THE RECIPE, CONFIRMED WORKING IN S199.

```bash
cd /tmp && npm i playwright-core @playwright/browser-chromium
node /tmp/node_modules/@playwright/browser-chromium/install.js      # REQUIRED — npm i alone does NOT fetch the browser
mkdir -p /tmp/libs && cd /tmp/libs && apt-get download libxdamage1 && dpkg-deb -x libxdamage1*.deb ./x
cd <repo> && PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright NODE_PATH=/tmp/node_modules \
  LD_LIBRARY_PATH=/tmp/libs/x/usr/lib/aarch64-linux-gnu node archive/s196-render-check.js
#   ...same env for:
  node archive/s198-mobile-check.js               # ~2 min for all 97 pages
  node archive/s198-mobile-check.js <page.html>   # single page, ~15s — use for pages you edited
```

**S199 note:** `npm i` printed an `npm error` line and **still installed correctly** — check for `install.js` on disk before concluding it failed. The chromium download is ~195 MB; the extracted lib dir does **not** persist between bash calls, so re-extract if chromium exits 127 on `libXdamage.so.1`. Background processes do not survive between calls. **Max `timeout_ms` is 600000 — do not pass more, the call is rejected outright.**

---

## THE LAW: COLD-READ WHAT S199 SHIPPED, BEFORE YOU BUILD ANYTHING NEW

S193 → 2 of 4 failed. S194 → 5 of 5. S195 → 3 of 3. S196 → 3 of 4. S197 → incomplete in the way it had itself documented. **S198 → its scaffold survived on a fourth page nobody had listed.**

S199 got its cold read (three bounded agents, all returned). **Yours is to read what S199 *wrote*.** Read these side by side — the fingerprint test (§XI.20) is honest only against a session's whole output:

- **`question-chosen`** — the Amos paragraph was cut 193 → 128 words and six other edits landed on the same page (H2, close, antithesis, Winnicott, middle voice). **A page edited in seven places by one mind in one sitting is the condition that produces an incoherent page.** Read it whole, aloud, cold. Does the compressed Amos paragraph still earn its place, or should it now go entirely in favour of the 1 Peter 1:20 route — *"He was chosen before the creation of the world"*, the same verb the page is arguing about, rendered **chosen** by the reader's own NIV, inside the exact phrase Ephesians 1:4 already used? That option was researched and deliberately not taken; take it if the page reads better for it.
- **`analogy-adoption`** — a new doorway (*the greeting card that always opens at the moment the family arrives*) and a new section closer. **It is now the fourth page in this family and was written last, with the other three in view. Check it is not simply the fourth costume.**
- **`anxious-mind-what-if-not-chosen`** — three separate repairs inside one page's catch arm. Read the whole catch arm as one movement; three correct sentences written independently can still fail to be a paragraph.
- **`psychology-cognitive-biases`**, **`secular-billion-decisions`**, **`philosophy-infinite-regress-of-choice`**, **`question-freewill`** — each had one passage replaced. Read the seams.

---

## PRIORITY 1 — THE INLINE `style=` GAP (new, S199, and it is CHECK 21)

**233 prose pages carry 713 inline `style=` attributes inside `<article class="article-body">`.** CLAUDE.md's allowlist and CHECK 8 govern inline `<style>` **tags** and are structurally blind to the attribute form, which does the same thing one layer down.

This is not theoretical tidiness — **it has already corrupted a number this site ratchets on.** A promo card pasted into five devotionals uses inline styles and *no class*, so `stripClassedDivs` in `detect-shared-phrases.js` cannot see it, and its 31 words of boilerplate are counted as cloned authorial prose in CHECK 19.

```bash
grep -c 'style="' <page>.html
node -e '…'   # S199's counter is in the Session 199 entry; re-derive, do not trust a pasted number
```

**Before you write CHECK 21, decide what the condition is** — and remember S198-PRE's law: *a guard that enumerates known offenders only ever catches the past; enumerate the condition, not the instances.* Some inline styles are legitimate (the CSS-diagram pages, the widgets). The honest gate is probably a **budget on prose-article pages specifically**, ratchet-only, with the widget/diagram/printable archetypes excluded the way CHECK 8's three categories already are. **Prove it fails before you trust it passing, and make sure your injected defect trips CHECK 21 and not some earlier gate** — S199 lost a cycle to exactly that.

Two consumers to fix in the same session, or the number stays dirty: `detect-shared-phrases.js` (`stripClassedDivs` should also strip unclassed inline-styled promo blocks) and anything else keying on class names to find boilerplate.

---

## PRIORITY 2 — THE GOSPEL-ABSENCE QUEUE (133 pages, 4 worked, three sessions old)

`node detect-gospel-absence.js --queue` for word-count order, `--closes=N` to read endings. **Sort by hit count, not word count.**

**The detector is sound — S199 verified this after first accusing it wrongly.** It strips related-articles properly; an ad-hoc reimplementation did not. Only **3 of 133** closes are contaminated by hub-card text (`letters-senior-demon-arminianism`, `psychology-cognitive-biases`, `philosophy-problem-of-merit`). Read those three by hand; trust the rest.

**The CAPACITY sweep is DONE and CLEAN — do not redo it.** S199 ran it over every prose page's true close: the line the S199 kickoff named on `secular-genetics-sovereignty` is already gone, and all eight remaining hits are correct usage (regeneration *creating* capacity, depravity described, or an explicit denial). **Zero real capacity failures site-wide.** Spend the time on the catches instead.

**The craft law, proven over ten sessions: derive the catch from the page's own central image.** S199's model is `psychology-cognitive-biases`, where a conditional catch (*"if your biases feel like prison walls, there is a name for what you are feeling"*) was repaired using the page's own subject against itself — *a mind grading its own clarity has already failed the exam it is setting.*

---

## PRIORITY 3 — RATCHET BOTH NUMBERS DOWN

**CHECK 19 at 5,675 / 306 passages.** `node detect-shared-phrases.js --top 60`, `--tail` for closing quarters. **Read past the head** — it is Scripture and the golden chain's verb list, and those are legitimate. Confessional quotations (Westminster 3.1 across `history-confessions-story` ↔ `westminster-chapter-3-plain-english`) are also legitimate. Real remaining prose clones:

- `objection-why-believe` ↔ `question-depravity` (47 words) and `objection-why-believe` ↔ `start-here-phase1` (33) — the seraphim/holiness module across three pages, **still undissolved**
- `for-deconstructed` ↔ `secular-neuroscience-human-inability` (40)
- `question-dead-in-sin-meaning` ↔ `question-freewill` — one of three was dissolved in S199; check what remains

**CHECK 17 at 62 misquotations.** `archive/S198-scripture-queue.txt` is stale — regenerate from `scripture-audit-report.txt`. Most of the 62 are genuine. **The compression category is theological work and must not be automated:** a shortened verse inside quotation marks is not a typo, it is the page quietly improving on Scripture.

---

## WATCH ITEMS

1. **`scripture-niv.js` IS SERVED TO READERS** (`textContent`, decodes nothing). Three entries still need a source that is not this repo and **must NOT be authored**: `Luke 16:31` (missing *"He said to him,"*), `Hebrews 2:13` (lost `And again, "` and its internal quotation marks), `Ephesians 2:4` (holds the text of 2:4-5). `John 3:20` has no entry. Fill only from a real NIV, or leave them.
2. **The 21 scripts still key on the brittle `includes('<article class="article-body">')` literal.** CHECK 14 is the guardrail, not the cure. **Oldest open item by a wide margin.** Any script that rewrites the article tag must write the `id` AFTER the class.
3. **164 pages carry a lock but no session tag** in `archive/coverage.js` — assign one on next touch.
4. **The stale `dateModified` were deliberately left again** (CLAUDE.md Law 11). 32 pages stamped in S199, only ones actually edited. `node stamp-modified.js --check` for the distribution. It stamps in sandbox UTC — check the date it writes.
5. **`detect-feeling-slip.js` remains triage and over-reports; the hand-read obligation is permanent.** S199 found one by hand on `psychology-cognitive-biases` and three on `anxious-mind-what-if-not-chosen` — **all four in catches, which remains the densest slip real-estate on the site.**
6. **Bounded subagents work, and the constraint is what does it.** S199 ran three cold-readers to completion (~120–150K tokens each) by giving each a rule checkable afterward: *every criticism must quote the exact span verbatim or be discarded.* They returned real findings **and** confidently wrong ones — one claimed a closer was verbatim on four pages when a grep showed one. **Verify before you act; the quoted-span rule is what makes verification cheap.** Budget cold-readers early, not last.
7. **`<div class="tldr">` still sits on ~631 pages** — a class named for the construct CLAUDE.md bans by name. Rendered text already says *In Brief*. **`.tldr` must be grepped against all 21 literal-string consumers first.** Your call.
8. **Three root PDFs are served and linked from nowhere** — `Jesus' Path to Eternal Life.pdf`, `The Institutes Book 3 essay.pdf`, `The_Question_of_the_Hour.pdf`. Checked clean for the RE-FORMED failure mode. Wire them into `/reformed-sources` or `410` them.
9. **132 page titles exceed 65 characters** and truncate in search results. Top-traffic doorways only.
10. **45 body-level heading skips remain**, deliberately not automated — `node fix-heading-hierarchy.js --report`.
11. **Any new root-level script or doc needs its own forced `410!` line in `_redirects` in the same session.** CHECK 7 prints the exact line — **but read what the file actually does before pasting it.** CHECK 7 once offered a `410!` that would have taken site search offline. S199 verified `fix-jsonld-answers.js` was build-time-only before adding its rule.
12. **The FAQ ANSWERS ARE STILL A SCRAPE.** CHECK 20 guarantees they are *well-formed English* now. It does **not** guarantee they describe the current page. A drift probe found that on many pages ≥80% of an answer's sentences no longer appear in the body at all — `question-chosen`'s FAQ still references `kataboles`, `horizo` and *"mass of humanity"*, none of which survive in its prose. **That measurement is unreliable** (hand-written summaries would look identical to drift), so it was deliberately **not** bulk-fixed and must not be. If you take it on, take a small sample, read them, and decide whether these blocks should be *authored* rather than scraped.

---

## CLOSING PROTOCOL — NON-NEGOTIABLE

1. Run all **eight** build scripts in order (tags → all-content → search-index → **manifest** → mega-menu → homepage-counts → auto-linker → wire-orphans), then `node validate-site.js` — **TWENTY checks.** Also `canonical-conformance.js` and `verify-scripture.js`. **New checks go ABOVE the verdict block, must update the banner's number in the same edit, and must be PROVEN TO FAIL before they are trusted passing — with an injection that trips the new check and not an older one.**
2. **Run BOTH render checks** — desktop *and* mobile. The validator cannot see the page.
3. `node fix-orphaned-cards.js --dry-run`, `node fix-stray-progress-bar.js --dry-run`, `node fix-jsonld-answers.js --dry-run` — inert on a clean corpus, so any output is a regression.
4. `node stamp-modified.js <every page you actually edited>`.
5. `node archive/coverage.js stamp <page.html> 200 lifted|partial "<note>"`, then `node archive/coverage.js report --session=200`.
6. Write the S200 entry at the **top** of `MISSION-CONTROL.md`'s Session Log, above `Session 199`; roll the oldest entry into `MISSION-CONTROL-ARCHIVE.md` (keep ~6 live — S194-INFRA was rolled off when S199 was added).
7. Write `archive/NEXT-SESSION-S201-kickoff.md`. **If the state changes after you write it, rewrite it.**
8. **Never run git.** End the session by printing a copy-paste push command as the literal last thing in chat.
9. New internal docs go in `archive/`, never the repo root.

**Close above 80% context used. No batch count is ever sufficient to close.**
