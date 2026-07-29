# S194 KICKOFF — adoptedbygrace.net

You are the lead. Read `VOICE.md` **in full** (it is the standard, never sampled), then `CLAUDE.md`, then the **S193** entry at the top of `MISSION-CONTROL.md` — that entry only, not the log and never `MISSION-CONTROL-ARCHIVE.md`.

**No skip-lists. No label exempts a page** — DIAMOND, CONSECRATED, HAMMER-LOCKED, born-apex are historical notes on what was *last* reviewed, never a shield. Scan everything for everything.

---

## WHAT S193 LEFT YOU

S193 was a repair session, not a build session. The site now passes **eleven** validator checks (CHECK 11 is new). Do not re-derive these; they are closed:

- Public exposure of internals — CHECK 7 is now **deny-by-default**. `RE-FORMED.pdf` (the real-name testimony) and 26 other internal files are off the public root.
- Prose-link duplication — 5,047 duplicates removed across 542 pages; `auto-linker.js` is now **idempotent** and aborts on a dead keyword target.
- Two factual errors (ETS 2003 vote; John 6:39 Greek), three manufactured crisis scenes, four page lifts, 31 broken skip-links, 8 nonstandard footers.

**Canonical count is 611.** Pipeline baseline for this session: search-index 683 · mega-menu 655 · homepage 611 · all-content 611 · auto-linker **0** · wire-orphans 0 orphans / 75 unmapped · validate ALL 11 PASS (106 rules).

---

## PRIORITY 0 — SAMPLE-READ AUDIT (before anything else)

Cold-read **5–10 pages live** against the landing-force and sapiential bar — half locked, half unmarked. The live read trumps every scanner. Failing pages go on the surgical queue before any new work begins.

**Start with these four, because S193 changed them and nobody has cold-read the result:**

- `open-wound-the-prayer-god-didnt-answer` — fully rebuilt (1,346 → ~2,000 words). Judge hard: does the Romans 8:26 move actually land, or is it clever? Does the Heb 7:25 catch hold a reader who feels **nothing**?
- `history-open-theism` — new opener, new close, new Molinism section.
- `shattered-lens-taught-wrong` — six surgical cuts; check the seams read as one piece.
- `theologian-owen` — new catch appended; check it does not read as bolted on.

---

## PRIORITY 1 — THE 54 UNDER-LINKED PAGES

The dedupe made a **pre-existing** shortfall visible: 54 article pages now sit below the CLAUDE.md floor of 8–12 internal prose links. (Deduplication cannot lower a unique-target count — these pages were always thin; the repeats were hiding it.)

Worst offenders, at **3 unique links**: `apologetic-light-shine-out-of-darkness`, `reformed-apologetics-moral-argument`. Then at 4: `apologetic-the-lord-knows-those-who-are-his`, `devotional-the-quiet-after-the-storm`, `devotional-you-were-wanted-before-you-were`, `ethics-abortion`, `presuppositional-borrowed-capital`, `reformed-apologetics-resurrection`, `reformed-apologetics-transcendental`, `testimony-spurgeon`.

Regenerate the full list with:

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

**Add links in prose only, first mention only** — CHECK 11 will fail you otherwise. Verify every target exists before writing the href; aspirational linking is banned. Prefer cross-category links (demolition → devotion, psychology → story), which is where the web is thinnest.

---

## PRIORITY 2 — STANDING WORK

The **Diamond Pass** remains the directive: build nothing new; perfect what exists. The gospel-absence queue from S192 stands at **133 NO LANDING / 29 THIN** — run `node detect-gospel-absence.js --queue` for the list in word-count-descending order and `--closes=N` to read the endings.

---

## WATCH ITEMS

1. **21 scripts still use the brittle exact-match** `includes('<article class="article-body">')`. Harmless today (only 3 pages carry an attribute on that tag, and `build-tags.js` was fixed). It will lie the moment a fourth does. Consider a sweep to regex.
2. **CHECK 10 shows "down 93"** (733 → 640 inline `style=` attributes). Run `node validate-site.js --rebaseline-styles` to lower the ratchet ceiling and lock the gain in.
3. **12 previously-unforced `_redirects` rules were forced in S193.** If you add a root file that cannot move to `archive/`, the trailing `!` is load-bearing — CHECK 7 will print the exact line.

---

## CLOSING PROTOCOL — NON-NEGOTIABLE

1. Run all eight build scripts, then `node validate-site.js`. Fix everything it flags.
2. Write the S194 entry at the **top** of `MISSION-CONTROL.md`'s Session Log; roll the oldest entry into `MISSION-CONTROL-ARCHIVE.md` (keep ~6 live).
3. Write `archive/NEXT-SESSION-S195-kickoff.md`.
4. **Never run git.** End the session by printing a copy-paste push command as the literal last thing in chat.
5. New internal docs go in `archive/`, never the repo root.
