# S195 KICKOFF — adoptedbygrace.net

You are the lead. Read `VOICE.md` **in full** (it is the standard, never sampled), then `CLAUDE.md`, then the **S194** entry at the top of `MISSION-CONTROL.md` — that entry only, not the log and never `MISSION-CONTROL-ARCHIVE.md`.

**No skip-lists. No label exempts a page** — DIAMOND, CONSECRATED, HAMMER-LOCKED, born-apex are historical notes on what was *last* reviewed, never a shield. Scan everything for everything.

---

## THE ONE THING S194 PROVED, AND IT IS NOW A LAW

**Cold-read what the previous session shipped, before you build anything new.**

Two sessions running, the pages that failed the P0 audit were *the previous session's own rebuilds*. S194 read the four pages S193 had rebuilt and shipped unread: **two of the four failed**, and one of them (`history-open-theism`) failed on a **logical non sequitur** — its entire spine proved present omniscience while claiming to refute *fore*knowledge, which the ablest open theist kills in one sentence.

The generalization is the useful part: **a repair session verifies facts and structure and has no instrument for checking whether the argument it just wrote survives the strongest opponent.** Nothing in the pipeline can see it. Only the cold read can, and only if someone runs it.

---

## PRIORITY 0 — SAMPLE-READ AUDIT (before anything else)

Cold-read **5–10 pages live** against the landing-force and sapiential bar. The live read trumps every scanner.

**Start with the five S194 rebuilt, because nobody has read the result:**

- `history-open-theism` — rebuilt twice now. Judge the **petition argument** hard: does "you begged an owner, not a witness" actually hold against Greg Boyd, or is it a second beam in the same place? Does the John 18:4 close land?
- `reformed-apologetics-moral-argument` — new opener, new Mackie, new Street section, new Euthyphro answer, new close. Is the Euthyphro relocation answer *convincing* or merely *clever*? A hostile philosopher is the reader to imagine.
- `theologian-owen` — four factual corrections plus a deleted pivot sentence. Check the seam where "And now the sentence turns and faces you" was removed.
- `shattered-lens-taught-wrong` — four slips de-conditionalized and three seams repaired. Read for new seams.
- `devotional-you-were-wanted-before-you-were` — new "What the Wanting Cost" section. Does it read as the page's own ending or as a bolted-on gospel paragraph?

Then read **3–5 unmarked pages** from categories nobody has sampled recently. Failing pages go on the surgical queue before any new work begins.

---

## PRIORITY 1 — FINISH THE UNDER-LINKED QUEUE (44 → 0)

44 article pages still sit below the CLAUDE.md floor of 8–12 internal prose links. **`terms` and `privacy` are utility pages and exempt — do not pad them. The real queue is 42.**

`archive/s194-page-inventory.txt` holds all 618 valid article slugs with titles. **Regenerate it if you add or delete pages**, and give it to any subagent doing link work with a hard rule: *every href must appear verbatim in this file.* That constraint produced 66 links across 10 pages in S194 with **zero broken and zero duplicates.**

Regenerate the queue with:

```
python3 -c "
import re,glob
CARD=re.compile(r'<(?:div|nav|section|aside|footer)[^>]*class=\"[^\"]*(?:related-articles|related-explore|cross-refs|continue-journey|keep-reading|article-continue|next-steps|further-reading|explore-more|read-next)[^\"]*\"[\s\S]*?</(?:div|nav|section|aside|footer)>',re.I)
low=[]
for f in glob.glob('*.html'):
    h=open(f,encoding='utf-8',errors='ignore').read()
    i=h.find('<article class=\"article-body\"')
    if i<0: continue
    b=CARD.sub(' ',h[h.find('>',i)+1:h.rfind('</article>')])
    u=set(re.findall(r'<a href=\"(/[^\"#]*)\"',b))
    if len(u)<8: low.append((len(u),f))
low.sort()
print(len(low)); [print(n,f) for n,f in low]
"
```

**Known imprecision:** this snippet's mask list misses some deck classes, so a page it reports at 4 may really be at 3 (`devotional-the-quiet-after-the-storm` was). It under-reports severity; it never over-reports.

Rules: prose only, first mention only, cross-category preferred, every target verified before writing. CHECK 11 fails the build on any duplicate.

---

## PRIORITY 2 — THE GOSPEL-ABSENCE QUEUE (128 NO LANDING / 28 THIN)

The Diamond Pass stands: **build nothing new; perfect what exists.** Run `node detect-gospel-absence.js --queue` for the list in word-count-descending order and `--closes=N` to read the endings.

**The craft law, proven over five sessions: derive the catch from the page's own central image.** A generic gospel paragraph bolted onto the end is worse than the absence. S194's five examples — the garden crossing for a page about foreknowledge, *lavished*-beside-*blood* for a page about being wanted, the incarnation-in-the-rubble for a page about a collapsing worldview — each came out of material the page already had and had walked past.

---

## INSERTED BY THE S194-INFRA RUN (2026-07-29) — read this before Priority 0

A separate, infrastructure-only session ran after this kickoff was written. **It edited no prose and no argument.** Full record: `archive/S194-forensic-audit-and-fix-order.md`. Four things above change what you should do:

1. **The validator now runs FOURTEEN checks, and its verdict prints LAST.** It used to print `ALL CHECKS PASSED` after CHECK 6, before CHECKS 7–11 had run — so every session for months closed on a green banner that had seen 6 of 11 checks. New: **CHECK 12** (critical-path payload), **CHECK 13** (web fonts + undefined CSS vars), **CHECK 14** (the article-tag literal contract). If you add CHECK 15, add it *above* the verdict block.

2. **Watch item 1 below is now ENFORCED, and it was worse than "harmless today."** In the shipped corpus **11 pages** carried `id`-before-`class` on the article tag — invisible to all 21 scripts since the day they were written, and therefore never counted, never audited, never linted. They have been normalised. **CHECK 14 fails the build if it ever recurs.** If you need an anchor on an article, put it on a sibling: `<span id="main-content" tabindex="-1"></span>`. Never on that tag. (`contact`/`donate`/`sitemap` remain `id`-first *on purpose* — utility pages deliberately outside the article index.)

3. **CHECK 10 was re-baselined 224/639 → 235/724, and this was NOT the ratchet loosening.** Those 11 newly-visible pages brought 85 pre-existing inline style attributes into view for the first time. The debt was always there; it is now counted. Do not raise it further.

4. **Presentation is now law.** CLAUDE.md has a new **PRESENTATION INTEGRITY** section and a **LITERAL-STRING TRAP** section. Read both. The short version: `global.css` demanded Playfair Display and Inter and supplied neither, and **362 pages — 347 of them live articles — had been rendering in Times New Roman and Arial.** Separately, `--font-heading`/`--font-body`/`--font-mono` were used 127 times and defined nowhere, which fails *silently* by resolving to `inherit` rather than to the rule you expect. Both fixed; both now enforced.

**The big remaining infrastructure job is the `global.css` critical-CSS split** — 348 KB of blocking CSS is now the entire critical path, since all JS is deferred. It was deliberately NOT attempted with a low compute budget: its failure mode is all 687 pages rendering broken with no visual regression test in the repo. Take it only with a full budget, and finish it. Do not bulk-prune `global.css`: a conservative analysis found only 36 KB confidently dead across ~150 scattered families — poor payoff, catastrophic downside. The one genuinely dead family (obsolete v2 mega-menu) was already removed.

**Repair scripts, all idempotent:** `fix-script-payload.js`, `fix-missing-webfonts.js`, `fix-skip-links.js`, `strip-stale-nav-comment.js`.

---

## WATCH ITEMS

1. ~~**21 scripts still use the brittle exact-match** `includes('<article class="article-body">')`. Harmless today (only 3 pages carry an attribute on that tag); it will lie the moment a fourth does.~~ **SUPERSEDED — see inserted item 2 above.** It was not 3 pages, it was 11, and they had been dark for their whole lives. CHECK 14 now holds the contract. **The underlying debt is still real: those 21 scripts should be swept to a tolerant regex.** Until then, CHECK 14 is the guardrail, not the cure.
2. **171 pages carry a lock but no session tag** in `archive/coverage.js` — assign one on next touch.
3. **CHECK 10 was re-baselined in S194** (733 → 639 attributes, 224 pages). The ratchet ceiling is now lower; do not raise it.
4. `detect-feeling-slip.js` remains ~triage. **The hand-read obligation is permanent** — every session since S186 has found slips the detector cannot see, and the closing catch is still the densest slip real-estate on the site.

---

## CLOSING PROTOCOL — NON-NEGOTIABLE

1. Run all seven build scripts, then `node validate-site.js`. Fix everything it flags. Also run `canonical-conformance.js` and `verify-scripture.js` (the latter is a report, not a gate).
2. Stamp every page you lift: `node archive/coverage.js stamp <page.html> 195 lifted|partial "<note>"`, then `node archive/coverage.js report --session=195` and copy the **END-OF-SESSION STANDING** block into both the Session Log and the closing chat message.
3. Write the S195 entry at the **top** of `MISSION-CONTROL.md`'s Session Log; roll the oldest entry into `MISSION-CONTROL-ARCHIVE.md` (keep ~6 live).
4. Write `archive/NEXT-SESSION-S196-kickoff.md`.
5. **Never run git.** End the session by printing a copy-paste push command as the literal last thing in chat.
6. New internal docs go in `archive/`, never the repo root.
