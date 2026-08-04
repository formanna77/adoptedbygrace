# S198 KICKOFF — adoptedbygrace.net

*Rewritten 2026-08-04 after the four-pass pre-session audit. The original version of this file was written before that audit and is now wrong in three ways that would cost you real work: it said FIFTEEN checks, it told you to add the clone ceiling as CHECK 16, and it listed seven build scripts. Read this version.*

You are the lead. Read `VOICE.md` **in full** (it is the standard, never sampled), then `CLAUDE.md`, then the top **two** entries of `MISSION-CONTROL.md`'s Session Log — **`Session 198-PRE` and `Session 197`, those two only**, not the log and never `MISSION-CONTROL-ARCHIVE.md`.

**Read `Session 198-PRE` first and read it carefully.** Four diagnostic passes ran between S197's close and your start. Two new checks, one rewritten build script, a new load-bearing ledger, a new standing tool, four new laws in CLAUDE.md, and a 192-item queue all landed in that window. Everything below assumes you know it.

**No skip-lists. No label exempts a page** — DIAMOND, CONSECRATED, HAMMER-LOCKED, born-apex are historical notes on what was *last* reviewed, never a shield. Scan everything for everything.

---

## THE STATE YOU INHERIT — READ BEFORE YOU PLAN

| | |
|---|---|
| `validate-site.js` | **17 checks, all passing.** The next one you add is **CHECK 18.** |
| Build pipeline | **EIGHT scripts.** `generate-manifest.js` is the eighth, after `build-search-index.js`. |
| Render checks | **TWO.** Desktop (`archive/s196-render-check.js`) *and* mobile (`archive/s198-mobile-check.js`) at 390px and 768px. Both are law. |
| Corpus | 687 HTML / **611 prose** · manifest 606 · search-index 683 |
| Open ceilings | CHECK 10 at 724/235 · CHECK 17 at 203 misquotations · both ratchet-only, never raised |

**Three things are now load-bearing and must not be deleted or "cleaned up":**

1. **`archive/manifest-dates.json`** — write-once date ledger. Deleting it re-dates the entire corpus to today and destroys "Recently Added" ordering permanently.
2. **`archive/S198-scripture-queue.txt`** — 192 distinct misquotations, sorted by edit distance. This is your Priority 1.
3. **`archive/s198-mobile-check.js`** — the only tool on this site that has ever measured a phone.

---

## PRIORITY 0.0 — RUN BOTH RENDER CHECKS. THEY WORK. MOSTLY WAITING.

```bash
cd /tmp && npm i playwright-core @playwright/browser-chromium
node /tmp/node_modules/@playwright/browser-chromium/install.js      # REQUIRED — npm i alone does NOT fetch the browser
mkdir -p /tmp/libs && cd /tmp/libs && apt-get download libxdamage1 && dpkg-deb -x libxdamage1*.deb ./x
cd <repo> && PLAYWRIGHT_BROWSERS_PATH=$HOME/.cache/ms-playwright NODE_PATH=/tmp/node_modules \
  LD_LIBRARY_PATH=/tmp/libs/x/usr/lib/aarch64-linux-gnu node archive/s196-render-check.js
# ...then the same env for:
  node archive/s198-mobile-check.js
```

**Three traps, each of which has cost a full cycle:** `npm i` leaves `~/.cache/ms-playwright` holding only `__dirlock` — the postinstall does not run, so `install.js` must be invoked by hand. **`apt-get download` fails silently and produces no file if the sandbox network is not yet up** — if `/tmp/libs` is empty, retry; do not conclude the library is unavailable. Chromium exits 127 on `libXdamage.so.1` and the message is unmistakable.

Desktop asserts: Playfair and Inter actually loaded, no Times/Arial fallback, wordmark not overlapping the first nav link, nav not wrapped, no horizontal overflow, no empty element painting a visible band. Mobile asserts the same overflow condition at **390 and 768** by walking element rects — **never trust `scrollWidth`; `body { overflow-x: hidden }` has been falsifying it for months.** Expect `the-mirror` to report ~8px: that is deliberate full-bleed on a sticky bar and must be left alone.

Both **PASSED clean** at the close of the pre-audit. Any output is a regression you caused.

---

## THE LAW, NOW FIVE-FOR-FIVE — AND IT CHANGED SHAPE

**Cold-read what the previous session shipped, before you build anything new.**

S193 shipped 4 unread → 2 failed. S194 → 5 of 5. S195 → 3 of 3. **S196 → 3 of 4, and the defect was not on any one page.** Two of the three were individually excellent and failed *against each other*: they closed with the same sentence. The fingerprint test (§XI.20) is not "is this page good," it is "could this page be swapped, paragraph for paragraph, with the last one you wrote" — and the honest way to run it is to read the session's output **side by side**, not one at a time.

**So: your P0 is the pages S197 touched substantively** — `analogy-adoption` (largest rebuild, the institutionalised-orphan section), `question-what-is-sovereign-grace`, `psychology-anosognosia-of-sin`, `anxious-mind-what-if-not-chosen`, `question-is-salvation-my-choice-or-gods`, `question-chosen`, `secular-genetics-sovereignty` (new catch), `question-goldchain` (new cross paragraph). **Read them cold and read them against each other.** Fifteen depravity mirrors were written in one session by one mind; the whole point was that they be different, and that is exactly the claim most likely to be false.

*(The pre-audit touched 12 pages, but only mechanically — CSS, a lazy loader, seven Scripture corrections, skip links. `word-study-every-all` and `secular-genetics-sovereignty` had prose changed around the Amos 3:2 and 1 Timothy 6:10 fixes and are worth a look while you are in the cold read.)*

---

## PRIORITY 1 — THE SCRIPTURE QUEUE. THIS IS THE CENTRAL PROMISE OF THE SITE.

`archive/S198-scripture-queue.txt` — **192 distinct misquotations across 203 occurrences**, every one diffed against `scripture-niv.js` (992 real NIV passages), sorted by edit distance:

- **45 one word off** — unambiguous and mechanical. Do these first; they are pure profit.
- **52 two or three words**
- **45 short rewrites**
- **50 compressions or truncations** — **these are the theological work and must not be automated.** Each needs a decision: restore the NIV, mark the omission with an ellipsis, or move the paraphrase out of quotation marks and into the page's own prose. *A compressed verse inside quotation marks is not a typo. It is the page quietly improving on Scripture — which is the exact posture this site exists to argue against.*

**CHECK 17 is a ratchet at 203. Lower it as you work the queue; never raise it.** Re-run `node verify-scripture.js` after a batch and drop the ceiling to the new number in the same session.

**Watch for the Amos 3:2 pattern — it is the best finding in the audit and there will be more of it.** A page argued *yada* means covenantal love and quoted "You only have I **known**" to prove it — a KJV/ESV rendering. The NIV says **"chosen."** The reader's own Bible made the page's point *better than the page did*. When you find a non-NIV rendering being leaned on, do not just swap the words: ask whether the NIV strengthens the argument, and apply §XV (quote the NIV, then surface the original).

---

## PRIORITY 2 — THE CLONE CEILING. IT IS **CHECK 18**, NOT 16.

`node detect-shared-phrases.js` is rebuilt and works (12-word seeds extended to maximal passages, threshold 2, Scripture suppressed, ranked by duplicated volume). **S197 read only the top of its report.**

- **271 cloned passages / 4,944 duplicated words remain.** The head is the golden chain's own verb list, which is legitimate. **Read down past it** — `--top 60`, and `--tail` for the closing 25% of pages, which is where a closing machine would live.
- Add a duplicated-volume ceiling as **CHECK 18**, ratcheted exactly like CHECK 10 and CHECK 17. **Above the verdict block, and update the banner number in the same edit** — the verdict prints last for a reason. **Prove it fails before you trust it passing**: inject a cloned paragraph, watch it fail, restore.
- Two lessons worth carrying: **a threshold is a selector** (`--min 3` was structurally blind to the two-page clone that was the actual defect), and **an unreadable report is not a check** (1,110 rows of Ephesians 1:4 is silence with extra steps). When a detector has never once flagged anything, suspect its output shape before you trust its all-clear.

---

## PRIORITY 3 — THE GOSPEL-ABSENCE QUEUE (134 pages, 3 worked)

`node detect-gospel-absence.js --queue` for word-count-descending order, `--closes=N` to read the endings.

**Sort by hit count, not word count.** S197's three real findings were all 1-hit pages; the high-word-count head mostly has fine closes. And **one of the three was a false positive** — `presuppositional-impossibility-of-the-contrary` says *"the loud and bleeding center of history, the Logos made flesh"*; the selector just does not count it. Read before you rewrite.

**The craft law, proven over eight sessions: derive the catch from the page's own central image.** A genetics page whose catch had no cross got Adam's inheritance and a second head — *"You did not write the code you were born with, and you did not write the one you were born again with."* A Romans 8:29-30 page got it at the fourth link — *"The chain is unbreakable because one of its links is a body."*

**And watch for the fruit-gate failure while you are in there.** `secular-genetics-sovereignty` closed on *"you were created capable of receiving that love"* — a page on this site contradicting total depravity in its final sentence, for who knows how long. Grep the catches of the whole queue for capacity language.

---

## OPEN DECISION S198 OWNS — THE 373 STALE DATES

373 pages claim `dateModified: 2026-04` after a summer of rewrites; 228 article pages carry none at all; nothing has a `datePublished` past 2026-06-30. The pre-audit **deliberately did not bulk-fix this**, and you should understand why before you decide: there is no honest record of when each page changed (git is off-limits by policy, `coverage.json` holds session numbers without dates, mtime is meaningless because the pipeline rewrites everything). **Stamping them all with today announces to every crawler that 600+ pages changed in one day — untrue, and a spam signal.** The current error understates freshness; the fabricated one would overstate it, which is the direction that deceives.

`node stamp-modified.js --check` reports the distribution. **Stamp only pages you actually edit** (`node stamp-modified.js <pages>`). If you decide to do something about the historical 373, the decision must be defensible as *true*, not merely as *tidier*.

---

## WATCH ITEMS

1. **The 21 scripts still use the brittle `includes('<article class="article-body">')` exact-match.** CHECK 14 is the guardrail, not the cure. **Oldest open item by a wide margin.** Related and fresh: `fix-skip-links.js` was found writing `id` before `class` — the exact S194 trap, harmless only by luck. **Any script that rewrites the article tag must write the `id` AFTER the class.** Grep the repair scripts for others.
2. **167 pages carry a lock but no session tag** in `archive/coverage.js` — assign one on next touch.
3. **CHECK 10 sits at 724 attributes / 235 pages.** Ratchet — do not raise it. `secular-genetics-sovereignty` styles its paragraphs inline; if you touch it, keep the count flat or lower.
4. `detect-feeling-slip.js` remains triage and over-reports. **The hand-read obligation is permanent** — S197 found a live one by hand on `anxious-mind-what-if-not-chosen`, a conditional catch on the page whose whole subject is the fear of not being chosen. **The worst slips sit on the pages whose reader is least able to survive them.**
5. **Tools carry hardcoded sandbox paths.** `archive/s196-count-prose-links.js` had S196's mount path baked in and threw EACCES in every later session. **Grep `archive/*.js` for `/sessions/` before trusting any of them.** That script also does not write the file older kickoffs claim it writes — redirect stdout yourself.
6. **Bounded subagents work.** Two 9-page link agents both survived and produced 81 verified links, zero broken, zero duplicates. The constraint that does it: *every href must appear verbatim in `archive/s196-page-inventory.txt`*. Verify their output yourself regardless.
7. **The under-linked queue is empty** — every prose page carries 8+ internal links. Confirm with `node archive/s196-count-prose-links.js > archive/s198-underlinked-queue.txt`; do not assume.
8. **Any new root-level script or doc needs its own forced `410!` line in `_redirects` in the same session.** CHECK 7 prints the exact line. Anything in `archive/` is covered by the splat. **But read what a file actually does before pasting a validator's suggested redirect** — CHECK 7 offered a `410!` for `search-index.js` that would have taken site search offline.

---

## CLOSING PROTOCOL — NON-NEGOTIABLE

1. Run all **eight** build scripts in order (tags → all-content → search-index → **manifest** → mega-menu → homepage-counts → auto-linker → wire-orphans), then `node validate-site.js` — **SEVENTEEN checks** (eighteen if you add the clone ceiling). Fix everything it flags. Also run `canonical-conformance.js` and `verify-scripture.js`. **New checks go ABOVE the verdict block, must update the banner's number in the same edit, and must be proven to fail before they are trusted passing.**
2. **Run BOTH render checks** (Priority 0.0) — desktop *and* mobile. The validator cannot see the page, and until the pre-audit nothing had ever seen a phone.
3. Run `node fix-orphaned-cards.js --dry-run` and `node fix-stray-progress-bar.js --dry-run` — both inert on a clean corpus, so any output at all is a regression.
4. `node stamp-modified.js <every page you edited>`.
5. Stamp every page you lift: `node archive/coverage.js stamp <page.html> 198 lifted|partial "<note>"`, then `node archive/coverage.js report --session=198` and copy the **END-OF-SESSION STANDING** block into both the Session Log and the closing chat message.
6. Write the S198 entry at the **top** of `MISSION-CONTROL.md`'s Session Log, **above `Session 198-PRE`**; roll the oldest entry into `MISSION-CONTROL-ARCHIVE.md` (keep ~6 live — S193 was rolled off when 198-PRE was added).
7. Write `archive/NEXT-SESSION-S199-kickoff.md`. **If the state changes after you write it, rewrite it — a kickoff that describes a state that no longer exists is worse than none.**
8. **Never run git.** End the session by printing a copy-paste push command as the literal last thing in chat.
9. New internal docs go in `archive/`, never the repo root.

**Close above 80% context used. No batch count is ever sufficient to close.**
