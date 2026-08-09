# S199 KICKOFF — adoptedbygrace.net

You are the lead. Read `VOICE.md` **in full** (it is the standard, never sampled), then `CLAUDE.md`, then the top **two** entries of `MISSION-CONTROL.md`'s Session Log — **`Session 198` and `Session 198-PRE`, those two only**, never `MISSION-CONTROL-ARCHIVE.md`.

**No skip-lists. No label exempts a page** — DIAMOND, CONSECRATED, HAMMER-LOCKED, born-apex are historical notes on what was *last* reviewed, never a shield. Scan everything for everything.

---

## THE STATE YOU INHERIT

| | |
|---|---|
| `validate-site.js` | **19 checks, all passing.** The next one you add is **CHECK 20.** |
| Build pipeline | **EIGHT scripts.** `generate-manifest.js` is the eighth, after `build-search-index.js`. |
| Render checks | **TWO.** Desktop (`archive/s196-render-check.js`) and mobile (`archive/s198-mobile-check.js`) at 390 and 768. Both are law. Both pass. |
| Corpus | 684 HTML / **611 prose** · search-index 683 · mega-menu 655 |
| Open ratchets | CHECK 10 at 724/235 · **CHECK 17 at 62** · **CHECK 19 at 5,866** — all ratchet-only |

**Load-bearing, do not delete or "clean up":** `archive/manifest-dates.json` (write-once date ledger — deleting it re-dates the corpus and destroys "Recently Added" permanently) · `archive/s198-mobile-check.js` (the only tool here that has ever measured a phone) · `scripture-niv.js` (a **runtime asset served to readers**, not a fixture — see below).

---

## PRIORITY 0.0 — BOTH RENDER CHECKS. THE SETUP RECIPE, CORRECTED.

```bash
cd /tmp && npm i playwright-core @playwright/browser-chromium
node /tmp/node_modules/@playwright/browser-chromium/install.js      # REQUIRED — npm i alone does NOT fetch the browser
mkdir -p /tmp/libs && cd /tmp/libs && apt-get download libxdamage1 && dpkg-deb -x libxdamage1*.deb ./x
cd <repo> && PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright NODE_PATH=/tmp/node_modules \
  LD_LIBRARY_PATH=/tmp/libs/x/usr/lib/aarch64-linux-gnu node archive/s196-render-check.js
#   ...same env for:
  node archive/s198-mobile-check.js            # ~2 min for all 97 pages
  node archive/s198-mobile-check.js <page.html>  # single page, ~15s — use this for pages you edited
```

**Four traps, each of which cost time in S198.** `npm i` leaves `~/.cache/ms-playwright` holding only `__dirlock`; `install.js` must be invoked by hand. **The chromium download is ~195 MB and will not survive a short command timeout** — run it and poll, and note that a killed install leaves `/tmp/node_modules` in a state where `install.js` is missing entirely and must be reinstalled. `apt-get download` produces no file if the sandbox network is not yet up — retry rather than concluding it is unavailable; and **the extracted lib directory does not persist between calls**, so re-extract if chromium exits 127 on `libXdamage.so.1`. **Background processes do not survive between bash calls** — the full 97-page mobile sweep must run inside one call, or be run per-page.

---

## THE LAW: COLD-READ WHAT S198 SHIPPED, BEFORE YOU BUILD ANYTHING NEW

S193 → 2 of 4 failed. S194 → 5 of 5. S195 → 3 of 3. S196 → 3 of 4. **S197 → the fix was incomplete in the exact way S197 had itself documented.**

**S198 did not get its qualitative cold read. Subagent capacity ran out mid-session and the two cold-read agents died before returning. That debt is yours, and it is your P0.**

Read these **side by side**, not one at a time — the fingerprint test (§XI.20) is *"could this page be swapped, paragraph for paragraph, with the last one you wrote,"* and the honest way to run it is against the session's whole output:

- **`question-chosen`** — the largest prose change: a new multi-sentence passage on Amos 3:2, *yada*, and the NIV's "chosen." **Scrutinise it hard for overstatement and for whether it earns its length.** It makes a claim about what a translation committee concluded; make sure the claim is exactly true and not one turn grander than the evidence.
- **`psychology-anosognosia-of-sin`**, **`question-what-is-sovereign-grace`**, **`anxious-mind-what-if-not-chosen`** — all three got a *new opening doorway* into their depravity section, written in one sitting by one mind to replace a clone. **That is precisely the condition that produces the next clone.** Read the three new doorways against each other first.
- Then sample ~6 of the ~100 pages touched by the Scripture corrections (list: the FIXED lines in `Session 198` §F). The edits were bounded and verified, but **a restored clause can leave the sentence around it limping** — read for prose damage at the seams, not for fidelity.

---

## PRIORITY 1 — THE GOSPEL-ABSENCE QUEUE (134 pages, 3 worked, untouched for two sessions)

`node detect-gospel-absence.js --queue` for word-count order, `--closes=N` to read endings.

**Sort by hit count, not word count.** S197's three real findings were all 1-hit pages; the high-word-count head mostly has fine closes. And **read before you rewrite** — `presuppositional-impossibility-of-the-contrary` was a false positive (its catch names *"the loud and bleeding center of history, the Logos made flesh"*; the selector just does not count it).

**The craft law, proven over nine sessions: derive the catch from the page's own central image.** A genetics page got Adam's inheritance and a second head — *"You did not write the code you were born with, and you did not write the one you were born again with."* A Romans 8:29-30 page got it at the fourth link — *"The chain is unbreakable because one of its links is a body."*

**And grep the whole queue's catches for CAPACITY language while you are in there.** `secular-genetics-sovereignty` closed on *"you were created capable of receiving that love"* — a page on this site contradicting total depravity in its final sentence, for who knows how long. That is the §XVII.4 fruit gate failing silently.

---

## PRIORITY 2 — RATCHET BOTH NUMBERS DOWN

**CHECK 19 at 5,866 duplicated words / 311 passages.** `node detect-shared-phrases.js --top 60`, and `--tail` for the closing 25% of pages. The head of the report is the golden chain's own verb list (*foreknown, predestined, called, justified, glorified*) and is legitimate — **read down past it.** As of S198 there are **13 passages of 25+ words**, all two-page, and those are the real defects. Known live pairs worth dissolving:

- `objection-why-believe` ↔ `question-depravity` (47 words) and `objection-why-believe` ↔ `start-here-phase1` (33) — the seraphim/holiness module across three pages
- `philosophy-mirror-you-refuse` ↔ `secular-billion-decisions` (43)
- `philosophy-infinite-regress-of-choice` ↔ `question-freewill` ↔ `demolition-cut-off-from-root` — the Augustine two-volitions formulation (41 + 26)
- `question-dead-in-sin-meaning` ↔ `question-freewill` — **three separate shared passages, 94 words total**

**CHECK 17 at 62 misquotations.** `archive/S198-scripture-queue.txt` is now stale — regenerate from `scripture-audit-report.txt`. Most of the 62 are genuine; expect a residue of false positives from range-citation edge cases.

**The S198 lesson, and it is the one to carry: when a detector will not flag something you KNOW is there, suspect the detector.** Both of its blindnesses were found by pasting a paragraph onto a second page and watching the total not move.

---

## WATCH ITEMS

1. **`scripture-niv.js` IS SERVED TO READERS.** `scripture-popups.js` writes it into the popup with `textContent`, which decodes nothing. S198 cleaned 121 passages of scrape artifacts (`&nbsp;`, glued section headings, stray verse numbers, `[a]` footnote markers, lost line-break spaces) via `node fix-scripture-artifacts.js --dry-run`. **Three entries still need a source that is not this repo and must NOT be authored:** `Luke 16:31` (missing *"He said to him,"*), `Hebrews 2:13` (lost `And again, "` and its internal quotation marks), `Ephesians 2:4` (holds the text of 2:4-5). `John 3:20` has no entry at all. Fill them only from a real NIV, or leave them.
2. **The 21 scripts still key on the brittle `includes('<article class="article-body">')` literal.** CHECK 14 is the guardrail, not the cure. **Oldest open item by a wide margin.** Any script that rewrites the article tag must write the `id` AFTER the class.
3. **167 pages carry a lock but no session tag** in `archive/coverage.js` — assign one on next touch.
4. **The 373 stale `dateModified` were deliberately left again** (CLAUDE.md Law 11). There is still no honest record of when each page changed. `node stamp-modified.js --check` for the distribution; stamp only pages you actually edit. It stamps in sandbox UTC — check the date it writes.
5. **`detect-feeling-slip.js` remains triage and over-reports; the hand-read obligation is permanent.** The worst slips sit on the pages whose reader is least able to survive them.
6. **Bounded subagents work, and the constraint is what does it.** S198 ran nine Scripture agents to completion on one verifiable rule — *every replacement must be a verbatim contiguous NIV span, or verbatim spans joined by an ellipsis* — and they returned ~70 correctly-reasoned false positives alongside ~130 fixes. **Give every delegated task a rule that can be checked mechanically afterward.** Cold-read agents are the expensive ones (~110K tokens each); budget for them early, not last.
7. **`<div class="tldr">` still sits on 631 pages** — a class named for the construct CLAUDE.md bans by name. Rendered text already says *In Brief*. Precedent (S195 stripping `<!-- CONSECRATED -->` from 618 pages) cuts toward renaming, but **`.tldr` must be grepped against all 21 literal-string consumers first.** Your call.
8. **Three root PDFs are served and linked from nowhere** — `Jesus' Path to Eternal Life.pdf`, `The Institutes Book 3 essay.pdf`, `The_Question_of_the_Hour.pdf`. Checked clean for the RE-FORMED failure mode. Dead weight, not exposure: wire them into `/reformed-sources` or `410` them.
9. **132 page titles exceed 65 characters** and truncate in search results. Worth doing for the top-traffic doorways only.
10. **45 body-level heading skips remain**, deliberately not automated — `node fix-heading-hierarchy.js --report`. Choosing between "this h4 should be an h3" and "this h3 should not exist" is a decision about what a section means.
11. **Any new root-level script or doc needs its own forced `410!` line in `_redirects` in the same session.** CHECK 7 prints the exact line — **but read what the file actually does before pasting it.** CHECK 7 once offered a `410!` that would have taken site search offline.

---

## CLOSING PROTOCOL — NON-NEGOTIABLE

1. Run all **eight** build scripts in order (tags → all-content → search-index → **manifest** → mega-menu → homepage-counts → auto-linker → wire-orphans), then `node validate-site.js` — **NINETEEN checks.** Also `canonical-conformance.js` and `verify-scripture.js`. **New checks go ABOVE the verdict block, must update the banner's number in the same edit, and must be PROVEN TO FAIL before they are trusted passing.**
2. **Run BOTH render checks** — desktop *and* mobile. The validator cannot see the page.
3. `node fix-orphaned-cards.js --dry-run` and `node fix-stray-progress-bar.js --dry-run` — inert on a clean corpus, so any output is a regression.
4. `node stamp-modified.js <every page you actually edited>`.
5. `node archive/coverage.js stamp <page.html> 199 lifted|partial "<note>"`, then `node archive/coverage.js report --session=199` and copy the **END-OF-SESSION STANDING** block into the Session Log and the closing chat message.
6. Write the S199 entry at the **top** of `MISSION-CONTROL.md`'s Session Log, above `Session 198`; roll the oldest entry into `MISSION-CONTROL-ARCHIVE.md` (keep ~6 live — S194 was rolled off when S198 was added).
7. Write `archive/NEXT-SESSION-S200-kickoff.md`. **If the state changes after you write it, rewrite it.**
8. **Never run git.** End the session by printing a copy-paste push command as the literal last thing in chat.
9. New internal docs go in `archive/`, never the repo root.

**Close above 80% context used. No batch count is ever sufficient to close.**
