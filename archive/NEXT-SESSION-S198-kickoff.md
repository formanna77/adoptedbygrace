# S198 KICKOFF — adoptedbygrace.net

You are the lead. Read `VOICE.md` **in full** (it is the standard, never sampled), then `CLAUDE.md`, then the **S197** entry at the top of `MISSION-CONTROL.md` — that entry only, not the log and never `MISSION-CONTROL-ARCHIVE.md`.

**No skip-lists. No label exempts a page** — DIAMOND, CONSECRATED, HAMMER-LOCKED, born-apex are historical notes on what was *last* reviewed, never a shield. Scan everything for everything.

---

## PRIORITY 0.0 — RUN THE RENDER CHECK. IT WORKS. FIVE MINUTES, MOSTLY WAITING.

```bash
cd /tmp && npm i playwright-core @playwright/browser-chromium
node /tmp/node_modules/@playwright/browser-chromium/install.js      # REQUIRED — npm i alone does NOT fetch the browser
mkdir -p /tmp/libs && cd /tmp/libs && apt-get download libxdamage1 && dpkg-deb -x libxdamage1*.deb ./x
cd <repo> && PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright NODE_PATH=/tmp/node_modules \
  LD_LIBRARY_PATH=/tmp/libs/x/usr/lib/aarch64-linux-gnu node archive/s196-render-check.js
```

**Two traps S197 hit, both costing a full cycle:** `npm i` leaves `~/.cache/ms-playwright` containing only `__dirlock` — the postinstall does not run, so `install.js` must be invoked by hand. And **`apt-get download` fails silently and produces no file if it runs before the sandbox network is up.** If `/tmp/libs` is empty, retry it; do not conclude the library is unavailable. Chromium exits 127 on `libXdamage.so.1` and the message is unmistakable.

It asserts: Playfair and Inter actually loaded, no Times/Arial fallback, the wordmark does not overlap the first nav link, the nav has not wrapped, nothing overflows horizontally, and no empty element paints a visible band in normal flow. **PASSED clean in S197** at 1196px and 1600px across all six archetypes.

---

## THE LAW, NOW FIVE-FOR-FIVE — AND IT CHANGED SHAPE

**Cold-read what the previous session shipped, before you build anything new.**

S193 shipped 4 unread → 2 failed. S194 → 5 of 5. S195 → 3 of 3. **S196 → 3 of 4, and the defect was not on any one page.** Two of the three pages were individually excellent and failed *against each other*: they closed with the same sentence. The fingerprint test (§XI.20) is not "is this page good," it is "could this page be swapped, paragraph for paragraph, with the last one you wrote" — and the honest way to run it is to read the session's output **side by side**, not one at a time.

**So: your P0 is the pages S197 touched substantively** — `analogy-adoption` (largest rebuild, the institutionalised-orphan section), `question-what-is-sovereign-grace`, `psychology-anosognosia-of-sin`, `anxious-mind-what-if-not-chosen`, `question-is-salvation-my-choice-or-gods`, `question-chosen`, `secular-genetics-sovereignty` (new catch), `question-goldchain` (new cross paragraph). **Read them cold and read them against each other.** Fifteen depravity mirrors were written in one session by one mind; the whole point was that they be different, and that is exactly the claim most likely to be false.

---

## PRIORITY 1 — FINISH WHAT THE CLONE DETECTOR STARTED

`node detect-shared-phrases.js` is rebuilt and now works (12-word seeds extended to maximal passages, threshold 2, Scripture suppressed via `scripture-niv.js`, ranked by duplicated volume). **S197 read only the top of its report.**

- **271 cloned passages / 4,944 duplicated words remain.** The head is now the golden chain's own verb list, which is legitimate. **Read down past it** — `--top 60`, and `--tail` for the closing 25% of pages, which is where a closing machine would live.
- **CHECK 16 is owed and obvious**: a duplicated-volume ceiling in `validate-site.js`, ratcheted exactly like CHECK 10 so the number can only fall. **Add it ABOVE the verdict block, and prove it fails before you trust it passing** (PRESENTATION INTEGRITY law 3) — inject a cloned paragraph, watch it fail, restore.
- Two general lessons worth carrying: **a threshold is a selector** (`--min 3` was structurally blind to the two-page clone that was the actual defect), and **an unreadable report is not a check** (1,110 rows of Ephesians 1:4 is silence with extra steps). When a detector has never once flagged anything, suspect its output shape before you trust its all-clear.

---

## PRIORITY 2 — THE GOSPEL-ABSENCE QUEUE (134 pages, 3 worked)

`node detect-gospel-absence.js --queue` for word-count-descending order, `--closes=N` to read the endings.

**Sort by hit count, not word count.** S197's three real findings were all 1-hit pages; the high-word-count head of the list mostly has fine closes. And **one of the three 1-hit pages was a false positive** (`presuppositional-impossibility-of-the-contrary` says *"the loud and bleeding center of history, the Logos made flesh"* — the selector just does not count it). Read before you rewrite.

**The craft law, proven over eight sessions: derive the catch from the page's own central image.** S197's: a genetics page whose catch had no cross got Adam's inheritance and a second head — *"You did not write the code you were born with, and you did not write the one you were born again with."* A Romans 8:29-30 page with no cross anywhere got it at the fourth link — *"The chain is unbreakable because one of its links is a body."*

**And watch for the fruit-gate failure while you are in there.** `secular-genetics-sovereignty` closed on *"you were created capable of receiving that love"* — a page on this site, contradicting total depravity in its final sentence, for who knows how long. Grep the catches of the whole queue for capacity language.

---

## WATCH ITEMS

1. **The 21 scripts still use the brittle `includes('<article class="article-body">')` exact-match.** CHECK 14 is the guardrail, not the cure. This is now the oldest open item by a wide margin.
2. **167 pages carry a lock but no session tag** in `archive/coverage.js` — assign one on next touch. (Was 177.)
3. **CHECK 10 sits at 724 attributes / 235 pages.** Ratchet — do not raise it. Note `secular-genetics-sovereignty` styles its paragraphs inline; if you touch it, keep the paragraph count flat or lower.
4. `detect-feeling-slip.js` remains triage and over-reports (its SLIP list is currently dominated by passages correctly grounded in God's work). **The hand-read obligation is permanent** — S197 found a live one by hand on `anxious-mind-what-if-not-chosen`, a conditional catch on the page whose whole subject is the fear of not being chosen. **The worst slips sit on the pages whose reader is least able to survive them.**
5. **Tools carry hardcoded sandbox paths.** `archive/s196-count-prose-links.js` had S196's mount path baked in and threw EACCES in every later session; fixed to `__dirname`. **Grep `archive/*.js` for `/sessions/` before trusting any of them.** Same script also does not write the file older kickoffs claim it writes — redirect stdout yourself.
6. **Bounded subagents work.** Two 9-page link agents both survived comfortably and produced 81 verified links with zero broken and zero duplicates. The constraint that does it: *every href must appear verbatim in `archive/s196-page-inventory.txt`* (618 slugs, all verified present on disk). Verify their output yourself afterwards regardless.
7. **The under-linked queue is empty** — every prose page now carries 8+ internal links. Regenerate with `node archive/s196-count-prose-links.js > archive/s198-underlinked-queue.txt` to confirm it stays that way; do not assume.
8. **Any new root-level script needs its own forced `410!` line in `_redirects` in the same session.** CHECK 7 prints the exact line. Anything in `archive/` is already covered by the splat.

---

## CLOSING PROTOCOL — NON-NEGOTIABLE

1. Run all seven build scripts, then `node validate-site.js` — **FIFTEEN checks** (SIXTEEN if you add the clone ceiling). Fix everything it flags. Also run `canonical-conformance.js` and `verify-scripture.js` (the latter is a report, not a gate). New checks go **above** the verdict block, and must be **proven to fail** before they are trusted passing.
2. **Run `node archive/s196-render-check.js`** (Priority 0.0). The validator cannot see the page.
3. Also run `node fix-orphaned-cards.js --dry-run` and `node fix-stray-progress-bar.js --dry-run` — both idempotent and inert on a clean corpus, so any output at all is a regression.
4. Stamp every page you lift: `node archive/coverage.js stamp <page.html> 198 lifted|partial "<note>"`, then `node archive/coverage.js report --session=198` and copy the **END-OF-SESSION STANDING** block into both the Session Log and the closing chat message.
5. Write the S198 entry at the **top** of `MISSION-CONTROL.md`'s Session Log; roll the oldest entry into `MISSION-CONTROL-ARCHIVE.md` (keep ~6 live).
6. Write `archive/NEXT-SESSION-S199-kickoff.md`.
7. **Never run git.** End the session by printing a copy-paste push command as the literal last thing in chat.
8. New internal docs go in `archive/`, never the repo root.
