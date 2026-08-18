# S212 KICKOFF — FINISH THE GOLDEN THREAD

Read `CLAUDE.md` and `VOICE.md` in full first. VOICE.md is never sampled.

## Priority 0 — Sample-Read Audit (mandatory, before any build)
5-10 pages, half locked / half unmarked, live cold read against the landing-force
test. Failing pages go on the surgical-fix queue before new work. No label is an
exemption; no skip-lists.

## Priority 1 — the remaining Golden Thread eras
S211 deepened the six shortest of the twelve eras on the homepage strip
(apostolic, medieval, luther, calvin-geneva, spurgeon-downgrade, today) to
2,600-3,100 words each. These are still thin, in order of need:

| page | words | the substance that is missing |
|---|---|---|
| `history-dort-deep` | 1,480 | the Remonstrance's five articles quoted and answered one at a time; Oldenbarnevelt's execution; the 8 nations, the 154 sessions |
| `history-great-awakening` | 2,243 | Northampton 1734-35 and Edwards' *Faithful Narrative*; Whitefield's open-air numbers; the *Enfield* sermon read as a grace text, not a scare text |
| `history-augustine-pelagius` | 2,254 | Caelestius at Carthage 411; *da quod iubes et iube quod vis*; Ephesus 431; Zosimus reversing himself |
| `history-dort` | 2,374 | why Dort's ORDER is TULIP's order and what that proves |
| `history-council-of-orange` | 2,414 | canon 5 on the *initium fidei*; semi-Pelagianism as the respectable version; why 529 settled it and 1500 forgot it |
| `history-puritans` | 2,825 | Westminster's actual drafting; Owen's *Death of Death* argument in one paragraph |
| `history-20th-century` | 2,952 | Warfield and Princeton; Machen's trial; Lloyd-Jones at Westminster Chapel |

Method that worked in S211: pull the **specific, checkable, seldom-quoted fact**
(a date, a vote count, a thesis number, a register), then turn it so the reader
sees something about himself. Every added section ends toward the catch.
Meet the strongest opponent inside the page — Servetus, the celebrity collapses —
never around it.

## Priority 2 — front page follow-through
S211 cut the homepage from 31 tiles to 13 and deleted the "Rest in Grace" strip.
Check with Aaron whether the same cull should reach `topics.html` and
`all-content.html`, which still present the wide taxonomy.

## Standing
- Eight build scripts in order; `stamp-modified.js` BEFORE `build-sitemap.js`; then
  `node validate-site.js` (21 checks) and fix everything flagged.
- `dedupe-prose-links.js` after `auto-linker.js` if CHECK 11 fires.
- **Open real pages in a real browser at 390px and 1196px, and prove the probe can
  fail before trusting a clean result.** The validator cannot see the page.
- Never run git. Aaron pushes.
