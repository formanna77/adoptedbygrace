# S197 KICKOFF — adoptedbygrace.net

You are the lead. Read `VOICE.md` **in full** (it is the standard, never sampled), then `CLAUDE.md`, then the **S196** entry at the top of `MISSION-CONTROL.md` — that entry only, not the log and never `MISSION-CONTROL-ARCHIVE.md`.

**No skip-lists. No label exempts a page** — DIAMOND, CONSECRATED, HAMMER-LOCKED, born-apex are historical notes on what was *last* reviewed, never a shield. Scan everything for everything.

---

## PRIORITY 0.0 — RUN THE RENDER CHECK. IT NOW WORKS IN-SANDBOX. TWO MINUTES.

```bash
cd /tmp && npm i playwright-core @playwright/browser-chromium
mkdir -p /tmp/libs && cd /tmp/libs && apt-get download libxdamage1 && dpkg-deb -x libxdamage1*.deb ./x
cd <repo> && LD_LIBRARY_PATH=/tmp/libs/x/usr/lib/aarch64-linux-gnu node archive/s196-render-check.js
```

S195 could not run this (arm64 sandbox vs x86-64 bundled Chrome). **Playwright ships an arm64 Linux Chromium**, and the one missing shared library comes from `apt-get download` without root. The script serves the repo over local HTTP and drives a real browser **against the working tree, not the deployed site.**

It asserts: Playfair and Inter actually loaded, the `h1` is not silently falling back to Times, body copy is not falling back to Arial, the wordmark does not overlap the first nav link, the nav has not wrapped, nothing overflows horizontally, and **no empty element paints a visible band in normal flow.**

That last one is the S196 finding and it is the shape to remember: `<div class="progress-bar"></div>` was on **104 pages**, looked like a reading bar, and resolved to the *quiz track* — 8px, gold-tinted, **not** `position: fixed`. It painted a 1196×8 band between the nav and the hero on the first screen. Fifteen static checks passed on every one of those pages, because the HTML was valid and both the class and the CSS rule existed. **The defect lived in the gap between the class the markup asked for and the rule it resolves to.** No grep finds that. Only a browser does.

---

## THE LAW, NOW FOUR-FOR-FOUR

**Cold-read what the previous session shipped, before you build anything new.**

- S193 shipped 4 unread → S194 read them → **2 failed.**
- S194 shipped 5 unread → S195 read them → **5 of 5 failed.**
- S195 shipped 4 unread → S196 read them → **3 of 3 failed** (the fourth was S196's own P1).

**So: your P0 is the four pages S196 touched** — `theologian-owen`, `reformed-apologetics-moral-argument`, `devotional-you-were-wanted-before-you-were`, `shattered-lens-taught-wrong`. Read them cold. Expect to find something. Two of them were substantially rewritten this session and one had a whole new section added.

**Three sharpenings earned this session, in the order they cost the most:**

1. **When you check a language claim, check the lexeme AND the parse.** S195's failure was a bad *weld* (two English words, two different Greek words). S196 found the next form on the same page: a bad **parse** — John 6:39's ἵνα called a purpose clause when it is appositional, and Acts 13:48's τεταγμένοι asserted as passive when it is morphologically middle-or-passive and the middle reading is the *entire* opposing case. Ask three questions of every original-language move: *is it the same lexeme, is the parse right, and is the parse contested?*
2. **Verify the quotation against the reader's own Bible, not against the argument.** `devotional-you-were-wanted-before-you-were` claimed Eph 1:4 and 1:7 were "the same sentence." True in Paul's Greek; **false in the NIV, which sets a full stop at the end of v.6** — so a reader doing exactly what this site tells him to do finds the claim broken. The repair (surface the Greek, concede the English) is *stronger* than the error. Same page: "in the middle of Ephesians 1:4" for words 5 and 6 of 20, and "the Gospel writers" for a word Mark does not use.
3. **A detector's silence is only as wide as its selector.** `fix-orphaned-cards.js` printed "corpus clean" with eight orphans still live, because it keyed on `<div class="card-number">` and a second deck generator leads with `<div class="card-meta">` and carries no card-number at all. Before trusting any all-clear, ask what the detector is actually looking *at*.

---

## PRIORITY 1 — THE TWO STANDING QUEUES

**Under-linked: 18 pages left** (down from 28; `terms`/`privacy` exempt). Regenerate with `node archive/s196-count-prose-links.js` (writes `archive/s196-underlinked-queue.txt`). **`archive/s196-page-inventory.txt` is current — 618 valid article slugs.** Give it to any subagent doing link work with the hard rule: *every href must appear verbatim in this file.* That constraint has now produced 120 links across 20 pages over two sessions with zero broken and zero duplicates.

**Gospel-absence: untouched for three sessions.** `node detect-gospel-absence.js --queue` for word-count-descending order, `--closes=N` to read the endings. **The craft law, proven over seven sessions: derive the catch from the page's own central image.** S196's example — `shattered-lens-taught-wrong` had spent 2,000 words on a house whose sand foundation was giving way, and its close had Christ entering *"a world in precisely this condition,"* which reassigns the rubble to the world instead of to the reader's own collapsed floor. Corrected inside the page's own image: *"He has been sitting in the rubble of this house since before the first board gave way."*

---

## PRIORITY 2 — THE COMPRESSION JUDGMENT THAT WAS DEFERRED, NOT DUCKED

`reformed-apologetics-moral-argument` came out of S196 at **3,650 words** (from 4,242) against a sibling range of **2,024–3,273**. Every redundancy is gone — the tripled Mackie pass, the meta-narration, the applause line, the scoring commentary. **The remaining ~380 words of overage sit in load-bearing argument**: error theory, relativism, non-naturalist robust realism, Street's dilemma, the noetic-suppression cost, third-factor accounts, Euthyphro, the second-order Euthyphro, the forgiveness asymmetry, the gospel.

Shaving working prose to hit a number is not compression, it is damage. **The real question is whether a whole *move* should leave** — most plausibly the "I can be good without God" paragraph, which the page itself concedes answers a question nobody asked. Decide it deliberately; do not nibble.

---

## WATCH ITEMS

1. **The card-mask bug is fixed in two places — do not let a third appear.** `dedupe-prose-links.js` and `validate-site.js` CHECK 11 both carried the identical non-greedy regex; one *stripped* card anchors, the other *counted* them as prose and reported 25 false offenders. Both are now tag-balance walkers, and the linker has a second guard refusing to unwrap any anchor containing card markup. **If you write anything that masks a block of nested HTML, do not reach for a regex.**
2. **The 21 scripts still use the brittle `includes('<article class="article-body">')` exact-match.** CHECK 14 is the guardrail, not the cure. Sweeping them to a tolerant regex is still owed and is now the oldest open item.
3. **177 pages carry a lock but no session tag** in `archive/coverage.js` — assign one on next touch.
4. **CHECK 10 sits at 724 attributes / 235 pages.** Ratchet — do not raise it.
5. `detect-feeling-slip.js` remains triage. **The hand-read obligation is permanent** — every session since S186 has found slips the detector cannot see, and the closing catch is still the densest slip real-estate on the site.
6. **Subagents get killed by session limits, and it happened twice this session.** Both were mid-edit on live pages. **Check every file they touched for structural integrity before doing anything else** (article tags balanced, `<p>`/`<div>`/`<a>` balanced, nav / footer-grace-warning / global.css / `</body>` present) — then finish their work by hand rather than re-dispatching. Both S196 casualties had in fact completed their substantive spec and died during a compression pass, which is only knowable by checking. **Give agents bounded scope; the 10-page link agent survived comfortably.**
7. **`.fuse_hidden*` files are FUSE mount artifacts, not repo files.** CHECK 7 skips them by pattern; they are gitignored. If `rm` returns `Operation not permitted`, that is the sandbox, not the repo.
8. **Any new root-level script needs its own forced `410!` line in `_redirects` in the same session.** CHECK 7 prints the exact line. `fix-orphaned-cards.js` and `fix-stray-progress-bar.js` got theirs this session.

---

## CLOSING PROTOCOL — NON-NEGOTIABLE

1. Run all seven build scripts, then `node validate-site.js` — **FIFTEEN checks**. Fix everything it flags. Also run `canonical-conformance.js` and `verify-scripture.js` (the latter is a report, not a gate). If you add CHECK 16, add it **above** the verdict block — and **prove it fails before you trust it passing** (PRESENTATION INTEGRITY law 3).
2. **Run `node archive/s196-render-check.js`** (Priority 0.0). The validator cannot see the page.
3. Also run `node fix-orphaned-cards.js --dry-run` and `node fix-stray-progress-bar.js --dry-run` — both are idempotent and inert on a clean corpus, so any output at all is a regression.
4. Stamp every page you lift: `node archive/coverage.js stamp <page.html> 197 lifted|partial "<note>"`, then `node archive/coverage.js report --session=197` and copy the **END-OF-SESSION STANDING** block into both the Session Log and the closing chat message.
5. Write the S197 entry at the **top** of `MISSION-CONTROL.md`'s Session Log; roll the oldest entry into `MISSION-CONTROL-ARCHIVE.md` (keep ~6 live).
6. Write `archive/NEXT-SESSION-S198-kickoff.md`.
7. **Never run git.** End the session by printing a copy-paste push command as the literal last thing in chat.
8. New internal docs go in `archive/`, never the repo root.
