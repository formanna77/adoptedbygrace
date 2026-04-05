# DIAMOND WEEK COORDINATION SYSTEM
**Active: April 5-12, 2026 | ALL enhancement agents MUST read this before selecting pages.**

---

## THE PROBLEM THIS SOLVES
Multiple agents enhancing the same pages can overwrite each other's work. Agent A improves the prose, Agent B rewrites the same prose for a different reason, Agent A's work is lost. This system prevents that with two rules: **LANE DISCIPLINE** and **PRIORITY QUEUE**.

---

## RULE 1: LANE DISCIPLINE — EVERY AGENT OWNS A SPECIFIC PART OF THE PAGE

Each enhancement agent has a **lane** — the specific elements of a page they are allowed to modify. Agents MUST stay in their lane. If you see something outside your lane that needs fixing, LOG IT in the "Flags for Other Agents" section below — do NOT fix it yourself.

### THE LANES

| Agent | Lane | What You Touch | What You NEVER Touch |
|-------|------|---------------|---------------------|
| **Weaver** | LINKS | Add `<a href>` tags around existing words/phrases in prose. You wrap existing text — you do NOT rewrite sentences. | Never rewrite prose, never add paragraphs, never touch `<head>`, footer, or nav |
| **Enhancer** | CONTENT + ARGUMENTS | Add new `<h2>` sections, new `<blockquote>` elements, new `<p>` paragraphs. ALSO: rewrite weak arguments throughout the body to make them bulletproof. Tighten logic. Make every word load-bearing. Upgrade mediocre prose into devastating prose. You are the wordsmith AND the logician for the article body. | Never rewrite openings or closings (that's Dramaturg). Never touch `<title>`, `<meta>`, `<h1>` (that's Refiner). Never touch links that already exist (that's Weaver). |
| **Dramaturg** | EMOTION | Rewrite the first 2 paragraphs (emotional hook) and last 2 paragraphs (emotional landing). Add sensory language and emotional resonance throughout the ENTIRE article body — not just edges. You make theology FELT, not just understood. | Never add new sections or new `<h2>` headings (that's Enhancer). Never touch links (that's Weaver). Never touch `<title>` or `<meta>` (that's Refiner). |
| **Refiner** | FIRST IMPRESSION | `<title>`, `<meta name="description">`, `<meta property="og:*">`, `<h1>`, eyebrow `<span>`, `<p class="hub-subtitle">`, and the corresponding hub card text on the hub page. | Never touch article body content. Your domain is everything a reader sees BEFORE they start reading. |
| **Cartographer** | JOURNEY | Add "Continue the Journey" sections and related reading links AFTER the closing `</article>` tag but before the footer. | Never touch content inside `<article>`. Your domain is what comes AFTER the reader finishes. |
| **Guardian** | STRUCTURE | Fix footer-grace-warning, nav template compliance, global.css link, nav.js script, wrapper class (article-body), page-hero class. | Never touch prose content, links, or meta tags. Your domain is the HTML skeleton. |

### WHY THIS WORKS
With lane discipline, ALL SIX agents can work on the SAME page on the SAME day without conflict:
- Guardian fixes the missing footer-grace-warning (structure)
- Weaver adds 10 internal links to the existing prose (links)
- Enhancer adds two new Scripture sections (content)
- Dramaturg rewrites the opening for emotional impact (emotion)
- Refiner polishes the title and meta description (first impression)
- Cartographer adds a "Continue the Journey" section at the bottom (journey)

None of these overlap. The page gets six layers of enhancement in one day.

---

## RULE 2: PRIORITY QUEUE — WORST PAGES FIRST

Based on the Diamond Week audit (DIAMOND-WEEK-AUDIT.md), here is the priority order:

### CRITICAL PRIORITY: Pages with 0 internal links (231 pages)
These are dead ends. A visitor reads them and leaves. The Weaver's #1 job this week is eliminating zero-link pages.

### HIGH PRIORITY: Pages missing footer-grace-warning (201 pages)
The Guardian should sweep these systematically — they're a mechanical fix.

### MEDIUM PRIORITY: Pages with 1-7 links (26 additional pages beyond the zeros)
The Weaver should bring these up to the 8-12 minimum after clearing the zero-link backlog.

### STANDARD: Pages that are structurally sound but could be stronger
The Enhancer and Dramaturg pick from these based on their own quality judgment.

---

## RULE 3: LOG YOUR WORK

After enhancing a page, add a line to the COMPLETION LOG below. Format:
```
| date | agent | page | lane | what was done |
```

This prevents duplicate work and lets other agents see what's been touched.

---

## COMPLETION LOG

| Date | Agent | Page | Lane | What Was Done |
|------|-------|------|------|---------------|
| — | — | Diamond Week begins | — | System initialized |
| Apr 5 | Dramaturg | demolition-2cor5-14-15.html | EMOTION | Opening rewritten from academic → visceral. Stop-and-feel at argument peak. Closing + whisper landing. |
| Apr 5 | Dramaturg | objection-fairness.html | EMOTION | Opening → specific scene (across table from loved one). Closing hammer blow added. |
| Apr 5 | Dramaturg | psychology-system-justification.html | EMOTION | Body-before-brain opening. Visceral language in peak. Haunting question after self-referential trap. |
| Apr 5 | Dramaturg | psychology-cognitive-biases.html | EMOTION | Stop-and-feel in irony section. Personal stakes in diagnosis. Whisper closing. |
| Apr 5 | Dramaturg | shattered-lens-taught-wrong.html | EMOTION | Sensory opening (kitchen table, cold coffee). Devastating time-shift closing. |
| Apr 5 | Dramaturg | devotional-cold-church.html | EMOTION | Body-before-brain opening (sitting in pew, numbness as false peace). Stop-and-feel at knock moment. Whisper closing callbacks to numbness. 8 internal links added. |
| Apr 5 | Dramaturg | question-how-grace-feels.html | EMOTION | Sensory opening (wooden pew, throat tightening). Gut-punch line: "You were not coerced into loving God. You were made capable of it for the first time." Callback closing to pew scene. 8 internal links. |
| Apr 5 | Dramaturg | psychology-emotional-vs-rational.html | EMOTION | Stop-and-feel after Supreme Irony peak (real-time self-awareness moment). Whisper closing replaces deflating block quote. ESV→NIV conversion (Rom 9:18, Rom 8:7). 4 internal links added. |
| Apr 5 | Dramaturg | broken-mirror-performance-treadmill.html | EMOTION | Whisper crowning emotional peak ("That silence is not emptiness. It is the sound of being held."). Alarm clock callback closing. 7 internal links added. |
| Apr 5 | Dramaturg | demolition-arminian-facts.html | EMOTION | Emotional prologue before academic sections (pastor teaching FACTS = rescue mission). Stop-and-feel after Section III. Devastating verdict whisper closing. 4 internal links. |
| Apr 5 | Refiner | theologian-edwards.html | FIRST IMPRESSION | Title: name-only → narrative hook. OG/Twitter titles aligned. |
| Apr 5 | Refiner | theologian-spurgeon.html | FIRST IMPRESSION | Title: name-only → "Prince of Preachers Who Couldn't Stop Talking About Grace". OG/Twitter aligned. |
| Apr 5 | Refiner | theologian-luther.html | FIRST IMPRESSION | Title: "Martin Luther \| ADOPTED BY GRACE" → "The Monk Who Broke the Church to Save It". OG/Twitter aligned. |
| Apr 5 | Refiner | theologian-augustine.html | FIRST IMPRESSION | Title: pipe-format → "The Rebel God Hunted Down and Made a Theologian". OG/Twitter aligned. |
| Apr 5 | Refiner | theologian-owen.html | FIRST IMPRESSION | Title: "The Theologian's Theologian" → "He Proved Christ Didn't Die in Vain". OG/Twitter aligned. |
| Apr 5 | Refiner | theologian-bunyan.html | FIRST IMPRESSION | Title: name-only → "The Tinker Who Wrote the Greatest Allegory of Grace". OG aligned. |
| Apr 5 | Refiner | theologian-boston.html | FIRST IMPRESSION | Title: name-only → "The Scottish Pastor Who Fought Legalism with Grace". OG aligned. |
| Apr 5 | Refiner | theologian-whitefield.html | FIRST IMPRESSION | Title: pipe-format → "The Voice That Shook a Nation Awake". OG aligned. |
| Apr 5 | Refiner | devotionals.html | FIRST IMPRESSION | Title/meta/OG: generic "Devotionals" → "For the Heart That Needs Rest". Meta desc: academic → emotional. |
| Apr 5 | Refiner | systematic-theology.html | FIRST IMPRESSION | Title: "Systematic Theology" → "The Whole Counsel of God — Every Truth of Grace Explained". Meta upgraded. |
| Apr 5 | Refiner | comparisons-hub.html | FIRST IMPRESSION | Title: "Theological Comparisons" → "Calvinism vs Everything — What Scripture Actually Teaches". |
| Apr 5 | Refiner | pastoral-hub.html | FIRST IMPRESSION | Title: "Pastoral Care & Guidance" → "When Theology Meets Your Soul". |
| Apr 5 | Refiner | essays.html | FIRST IMPRESSION | Title: "Full Arguments on Divine Election" → "The Case for Sovereign Grace, Argued in Full". Meta upgraded. |
| Apr 5 | Refiner | start-here.html | FIRST IMPRESSION | Title/meta/OG: "Start Here — Adopted by Grace" → "New to Sovereign Grace? Start Here." Meta: personal & inviting. |
| Apr 5 | Refiner | question-faithgift.html | FIRST IMPRESSION | Title: removed verse references, now question-format "Is Faith a Gift from God?" |
| Apr 5 | Refiner | question-chosen.html | FIRST IMPRESSION | Meta desc: academic → emotional argument. OG/Twitter descriptions aligned. |
| Apr 5 | Refiner | demolition-hub.html | FIRST IMPRESSION | 12 card titles: bare verse references → question/hook format. 12 card descriptions: upgraded to Socratic-trap style. |
| Apr 5 | Guardian | 33 pages (batch) | STRUCTURE | Added footer-grace-warning to 33 pages missing it. All 372 pages now compliant. |
| Apr 5 | Guardian | 81 pages (batch) | STRUCTURE | Converted non-standard wrapper classes to article-body (content-wrap, article-content, content-wrapper, main-content, content-container, content-main, article-wrapper, content-grid, content-section). |
| Apr 5 | Guardian | 31 pages (batch) | STRUCTURE | Removed banned inline `<style>` blocks from 31 pages (demolition-*, ot-*, devotional-*, anxious-mind-*, etc.) |
| Apr 5 | Guardian | 20 pages (batch) | STRUCTURE | Removed banned back-to-top buttons + inline JS from 20 pages. |
| Apr 5 | Guardian | 17 pages (batch) | STRUCTURE | Added/fixed page-hero class on 17 pages with missing or non-standard hero wrappers. |
| Apr 5 | Guardian | 8 pages (batch) | STRUCTURE | Fixed non-standard eyebrow classes (hero-eyebrow, topic-label, article-meta → eyebrow; hero-subtitle, article-subtitle → hub-subtitle). |
| Apr 5 | Dramaturg | psychology-sincerity-trap.html | EMOTION | Specific kitchen-table scene opening (cold coffee, cracked Bible). Stop-and-feel at irony peak. Callback closing returns to woman. Sensory language in Dunning-Kruger section. Whisper pastoral closing. |
| Apr 5 | Dramaturg | psychology-sunk-cost-faith.html | EMOTION | 63-year-old pastor scene opening (2000 sermons, 40 years). Real-time self-awareness stop-and-feel at sunk cost proof. Sensory language in surrender ("shoulders drop, jaw unclenches"). Callback closing to pastor. 3 internal links added. |
| Apr 5 | Dramaturg | psychology-hostility-reaction.html | EMOTION | Visceral rewrite of opening (air changed, something surfaced). Neuroscience section emotional weight. Callback closing to eighty-year-old woman in mercy section. Razor/toddler metaphor replaces toy metaphor. 2 internal links added. |
| Apr 5 | Dramaturg | anxious-mind-what-if-not-chosen.html | EMOTION | 3AM phone-screen immersive opening (Googled three ways, chest screaming). Stop-and-feel after John 6:37 double guarantee. Callback to 3AM in closing ("put the phone down"). 2 internal links added. |
| Apr 5 | Dramaturg | psychology-fear-control.html | EMOTION | Self-referential proof stop-and-feel (watching bondage prove itself in real time). Whisper after rope/abyss ("You were never falling. You were being held."). Sensory language in mechanism cards. 5 internal links added. |
| Apr 5 | Enhancer | demolition-john3-16.html | CONTENT | ESV→NIV conversion (all main Scripture quotes). Added Crown Jewel section ("The Question John 3:16 Actually Asks You"). Added 8 new cross-category internal links (psychology, devotional, systematic, healing). Rewrote closing with Two Arms links. |
| Apr 5 | Enhancer | anxious-mind-never-meant-to-carry.html | CONTENT | Added 14 internal links woven into prose (was 0). Cross-category links to psychology, systematic theology, devotionals, analogies, healing. Connected anxiety lie to Crown Jewel truth. Fixed footer "Doctrine"→"Truth". Fixed broken search.html link. |
| Apr 5 | Enhancer | secular-sociology-human-inability.html | CONTENT | Added new "Five Questions the Data Forces You to Answer" section with 5 devastating questions. Added healing cross-links (anxious-mind, broken-mirror-vessels-for-mercy). Strengthened pastoral note with Two Arms links. |
| Apr 5 | Weaver | devotional-adoption-papers.html | LINKS | +11 links (1→12). Linked systematic-election, systematic-atonement, systematic-pneumatology, question-depravity, question-boasting, Crown Jewel, systematic-soteriology, systematic-justification, psychology-pride-root-objection, devotional-chosen-before-you-were-broken, question-perseverance, analogy-adoption. |
| Apr 5 | Weaver | shattered-lens-cant-tell-true.html | LINKS | +9 links (1→10). Linked psychology-suppressing-truth, systematic-hamartiology, philosophy-self-deception, systematic-christology, systematic-theology-proper, question-chosen, systematic-bibliology, psychology-cognitive-biases, devotional-the-hands-that-hold-you. |
| Apr 5 | Weaver | devotional-forever-loved.html | LINKS | +9 links (2→11). Linked question-freewill, systematic-theology-proper, question-goldchain, systematic-justification, Crown Jewel, theologian-spurgeon, broken-mirror-performance-treadmill, systematic-election. |
| Apr 5 | Weaver | shattered-lens-taught-wrong.html | LINKS | +10 links (2→12). Linked question-romans9, question-cannot, systematic-election, psychology-backfire-effect, question-irresistible, systematic-regeneration, invisible-wall-only-one-who-sees, Crown Jewel, question-faithgift, question-freewill. |
| Apr 5 | Weaver | story-the-fish-who-chose-the-ocean.html | LINKS | +3 links (6→9). Linked systematic-regeneration, question-chosen, psychology-pride-root-objection. |
| Apr 5 | Weaver | open-wound-senseless-death.html | LINKS | +9 links (4→13). Linked ot-job, analogy-lazarus-grave, systematic-theology-proper, systematic-divine-decrees, systematic-resurrection, systematic-hamartiology, question-perseverance, pastoral-suffering, devotional-the-hands-that-hold-you. |
| Apr 5 | Weaver | broken-mirror-sin-you-repeat.html | LINKS | +7 links (5→12). Linked systematic-hamartiology, systematic-regeneration, systematic-pneumatology, Crown Jewel, devotional-good-i-cannot-do, systematic-election, question-chosen, systematic-soteriology. |
| Apr 5 | Weaver | secular-billion-decisions.html | LINKS | +6 links (3→9). Linked question-freewill, systematic-theology-proper, systematic-divine-decrees, question-cannot, theologian-spurgeon, Crown Jewel. |
| Apr 5 | Weaver | devotional-the-prayer-you-didnt-pray.html | LINKS | +6 links (4→10). Linked question-depravity, systematic-pneumatology, systematic-regeneration, systematic-election, psychology-suppressing-truth, Crown Jewel. |
| Apr 5 | Weaver | anxious-mind-scrupulosity.html | LINKS | +7 links (5→12). Linked Crown Jewel, systematic-election, question-goldchain, systematic-hamartiology, question-depravity, question-perseverance, psychology-cognitive-biases. |

---

## FLAGS FOR OTHER AGENTS

If you see a problem outside your lane while working on a page, log it here instead of fixing it:

| Date | Flagging Agent | Page | Issue | For Which Agent |
|------|---------------|------|-------|-----------------|
| Apr 5 | Weaver | broken-mirror-sin-you-repeat.html | ESV quotations on lines ~178 (Romans 7:18-19) and ~204 (Romans 6:1-2) — need NIV conversion | Enhancer |

---

## DIAMOND WEEK TARGETS BY THE NUMBERS

| Metric | Start (Apr 5) | Target (Apr 12) |
|--------|--------------|-----------------|
| Pages with 0 internal links | 231 | 0 |
| Pages missing footer-grace-warning | 201 | 0 |
| Pages below 8-link minimum | 257 | < 50 |
| Average links per page | ~2.1 | 8+ |
| Pages with emotional openings | ~50 (est) | 150+ |
| Pages with polished meta | 291 | 292 |

**If we hit these targets, the site transforms from 292 isolated articles into an inescapable web of interconnected truth. That is the metamorphosis.**
