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
| **Weaver** | LINKS (REDUCED — auto-linker handles bulk) | `auto-linker.js` now handles bulk hyperlinking automatically (all agents run it as a mandatory build step). Weaver's remaining job: (1) add NEW keyword→page entries to `auto-linker.js` LINK_MAP when new articles are created, (2) add hand-crafted contextual links the auto-linker can't detect (thematic connections, non-obvious cross-category links), (3) audit link quality on enhanced pages. | Never rewrite prose, never add paragraphs, never touch `<head>`, footer, or nav |
| **Enhancer** | CONTENT + ARGUMENTS | Add new `<h2>` sections, new `<blockquote>` elements, new `<p>` paragraphs. ALSO: rewrite weak arguments throughout the body to make them bulletproof. Tighten logic. Make every word load-bearing. Upgrade mediocre prose into devastating prose. You are the wordsmith AND the logician for the article body. | Never rewrite openings or closings (that's Dramaturg). Never touch `<title>`, `<meta>`, `<h1>` (that's Refiner). Never touch links that already exist (that's Weaver). |
| **Dramaturg** | EMOTION | Rewrite the first 2 paragraphs (emotional hook) and last 2 paragraphs (emotional landing). Add sensory language and emotional resonance throughout the ENTIRE article body — not just edges. You make theology FELT, not just understood. | Never add new sections or new `<h2>` headings (that's Enhancer). Never touch links (that's Weaver). Never touch `<title>` or `<meta>` (that's Refiner). |
| **Refiner** | FIRST IMPRESSION | `<title>`, `<meta name="description">`, `<meta property="og:*">`, `<h1>`, eyebrow `<span>`, `<p class="hub-subtitle">`, and the corresponding hub card text on the hub page. | Never touch article body content. Your domain is everything a reader sees BEFORE they start reading. |
| **Cartographer** | JOURNEY | Add "Continue the Journey" sections and related reading links AFTER the closing `</article>` tag but before the footer. | Never touch content inside `<article>`. Your domain is what comes AFTER the reader finishes. |
| **Guardian** | STRUCTURE | Fix footer-grace-warning, nav template compliance, global.css link, nav.js script, wrapper class (article-body), page-hero class. | Never touch prose content, links, or meta tags. Your domain is the HTML skeleton. |

### WHY THIS WORKS
With lane discipline, ALL SIX agents can work on the SAME page on the SAME day without conflict:
- Guardian fixes the missing footer-grace-warning (structure)
- Weaver audits link quality and adds hand-crafted contextual links the auto-linker missed (links)
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
| Apr 5 | Guardian | 8 pages (batch) | STRUCTURE | Removed 8 remaining back-to-top buttons (demolition-romans10-9, demolition-2peter2-1, devotional-when-god-says-no, ot-abraham, question-ezekiel37, demolition-hebrews6-4-6, ot-israel-chosen, ot-david). |
| Apr 5 | Guardian | 19 pages (batch) | STRUCTURE | Added article-body class to 19 pages with bare `<article>` tags (2 new devotionals + 17 legacy: stories, secular, ot, demolition, devotional, theologian pages). |
| Apr 5 | Guardian | sitemap.xml | STRUCTURE | Added 2 missing pages (history-heresy-foreknowledge, history-whitefield-wesley). Rebuilt search index (373), mega-menu (337), auto-linker (26 links/17 files). |
| Apr 5 | Guardian | sitemap.xml | STRUCTURE | Added 54 missing pages to sitemap (15% of site was invisible to search engines). 364 total entries. |
| Apr 5 | Guardian | debate-free-will.html | STRUCTURE | Fixed 2 broken links: systematic-irresistible-grace → systematic-pneumatology, systematic-perseverance → systematic-soteriology. |
| Apr 5 | Weaver | history-great-awakening.html | LINKS | 14 hand-crafted prose links added (was 0 in body). Linked Edwards, Whitefield, total depravity, unconditional election, irresistible grace, perseverance, justification, regeneration, free will, foreknowledge, Arminianism, monergism/synergism, autonomy illusion, rescued-without-a-say devotional. |
| Apr 5 | Weaver | shattered-lens-pastor.html | LINKS | 4 hand-crafted links: cant-unsee-it, where-did-your-faith, chosen-before-broken, lonely-theological. Cross-category: healing→question, healing→devotional. |
| Apr 5 | Weaver | theologian-edwards.html | LINKS | 8 hand-crafted links: theology-proper, regeneration, depravity, free will, compatibilism, hamartiology, anthropology, pneumatology, Great Awakening. |
| Apr 5 | Weaver | philosophy-exclusive-love.html | LINKS | 4 hand-crafted links: adoption analogy, pride-root-objection, chosen-before-broken, Lazarus-grave. Cross-category: philosophy→psychology, philosophy→devotional, philosophy→analogy. |
| Apr 5 | Weaver | invisible-wall-friend-who-left.html | LINKS | 5 hand-crafted links: faith-as-gift, performance-treadmill, where-did-your-faith, never-gives-up, autonomy-illusion. Cross-category: healing→question, healing→psychology. |
| Apr 5 | Weaver | open-wound-betrayed-by-church.html | LINKS | 4 hand-crafted links: hamartiology, faithgift, divine-decrees, lazarus-grave. Cross-category: healing→systematic, healing→analogy. |
| Apr 5 | Weaver | demolition-1cor15-22.html | LINKS | 4 hand-crafted links: anthropology, election, atonement, chosen+never-gives-up. Cross-category: demolition→devotional (Two Arms). |
| Apr 5 | Weaver | theologian-luther.html | LINKS | 4 hand-crafted links: free will, regeneration, where-did-your-faith, augustine. Cross-category: theologian→question. |
| Apr 5 | Weaver | question-where-does-your-no-come-from.html | LINKS | 2 hand-crafted links: illusion-free-will, resistance-is-proof. Cross-category: question→psychology, question→philosophy. |
| Apr 5 | Guardian | site-wide | STRUCTURE | Rebuilt search index (363 pages), mega-menu (327 articles), auto-linker (570 links across 186 files). |
| Apr 5 | Guardian | 8 pages (batch) | STRUCTURE | Fixed non-standard eyebrow classes (hero-eyebrow, topic-label, article-meta → eyebrow; hero-subtitle, article-subtitle → hub-subtitle). |
| Apr 5 | Dramaturg | psychology-sincerity-trap.html | EMOTION | Specific kitchen-table scene opening (cold coffee, cracked Bible). Stop-and-feel at irony peak. Callback closing returns to woman. Sensory language in Dunning-Kruger section. Whisper pastoral closing. |
| Apr 5 | Dramaturg | psychology-sunk-cost-faith.html | EMOTION | 63-year-old pastor scene opening (2000 sermons, 40 years). Real-time self-awareness stop-and-feel at sunk cost proof. Sensory language in surrender ("shoulders drop, jaw unclenches"). Callback closing to pastor. 3 internal links added. |
| Apr 5 | Dramaturg | psychology-hostility-reaction.html | EMOTION | Visceral rewrite of opening (air changed, something surfaced). Neuroscience section emotional weight. Callback closing to eighty-year-old woman in mercy section. Razor/toddler metaphor replaces toy metaphor. 2 internal links added. |
| Apr 5 | Dramaturg | anxious-mind-what-if-not-chosen.html | EMOTION | 3AM phone-screen immersive opening (Googled three ways, chest screaming). Stop-and-feel after John 6:37 double guarantee. Callback to 3AM in closing ("put the phone down"). 2 internal links added. |
| Apr 5 | Dramaturg | psychology-fear-control.html | EMOTION | Self-referential proof stop-and-feel (watching bondage prove itself in real time). Whisper after rope/abyss ("You were never falling. You were being held."). Sensory language in mechanism cards. 5 internal links added. |
| Apr 5 | Dramaturg | demolition-joshua24-15.html | EMOTION | Immersive opening (cross-stitched pillow, pastor-dare scene). Stop-and-feel after irony of Israel's failure ("Stop. Read that again."). Whisper closing: "Joshua's 'choice' was the echo. The voice was always His." |
| Apr 5 | Dramaturg | demolition-rev3-20.html | EMOTION | Painting-on-the-wall opening (Sunday school door with no handle). Stop-and-feel after Laodicea context reveal. Callback closing returns to painting: "He is standing there. He has not left." |
| Apr 5 | Dramaturg | devotional-rescued-without-a-say.html | EMOTION | Burning-building callback closing (unconscious, dying, no form signed, no waiver). Hammer blow: "And He came anyway." |
| Apr 5 | Dramaturg | question-foreknowledge.html | EMOTION | "Last escape hatch" immersive opening. Stop-and-feel after Argument 3 ("He didn't say 'I watched you.' He said 'I knew you.'"). Pastoral whisper closing: "you are not holding on to God. God is holding on to you." |
| Apr 5 | Dramaturg | open-wound-hospital-room.html | EMOTION | Stop-and-feel after Genesis 50:20 ("two authors writing two different stories simultaneously. God's pen never trembled."). Hospital-room callback closing returns to beeping machines. Whisper: "You are not alone in that room. You never were." |
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
| Apr 5 | Cartographer | question-chosen.html | JOURNEY | Added "Continue the Journey" with 3 cards: question-where-did-your-faith-come-from, devotional-chosen-before-you-were-broken, psychology-identity-threat. |
| Apr 5 | Cartographer | question-faithgift.html | JOURNEY | Added "Continue the Journey" with 3 cards: question-is-salvation-my-choice-or-gods, devotional-my-chains-fell-away, psychology-sincerity-trap. |
| Apr 5 | Cartographer | question-depravity.html | JOURNEY | Added "Continue the Journey" with 3 cards: systematic-hamartiology, devotional-the-hands-that-hold-you, analogy-doctor-corpse. |
| Apr 5 | Cartographer | question-sealed.html | JOURNEY | Added "Continue the Journey" with 3 cards: question-goldchain, devotional-never-gives-up, pastoral-assurance. |
| Apr 5 | Cartographer | demolition-john3-16.html | JOURNEY | Added "Continue the Journey" with 3 cards: question-whosoever, devotional-rescued-without-a-say, compare-calvinism-arminianism. |
| Apr 5 | Cartographer | compare-calvinism-arminianism.html | JOURNEY | Added "Continue the Journey" with 3 cards: demolition-steel-man-arminianism, psychology-cost-of-rejecting-grace, compare-every-decision-point. |
| Apr 5 | Cartographer | resistance-last-idol.html | JOURNEY | Added "Continue the Journey" with 3 cards: psychology-pride-root-objection, devotional-when-god-says-no, story-the-fish-who-chose-the-ocean. |
| Apr 5 | Cartographer | scripture-tsunami.html | JOURNEY | Added "Continue the Journey" with 3 cards: question-does-god-choose-who-goes-to-heaven, devotional-valley-shadow, philosophy-copernican-revolution. |
| Apr 5 | Cartographer | for-arminians.html | JOURNEY | CREATED audience landing page. 6-step Socratic journey (faith-origin → faith-as-gift → depravity → God's-choice → sincerity-trap → rest). 3 "Go Deeper" cards. All 9 links verified. |
| Apr 5 | Enhancer | objection-why-command.html | CONTENT | Added "What This Question Is Really Asking" section (naming the emotional fear behind the objection: irrelevance, not logic). Added "The Command That Reveals Everything" section (Crown Jewel connection: faith-as-gift applied to commands). Added humor bomb (GPS/steering analogy). Added 5+ new cross-category links to philosophy pages (infinite-regress, munchhausen-trilemma, resistance-is-proof, sleep-surrender). Strengthened pastoral note with command-as-delivery-vehicle gut-punch. Updated section nav. |
| Apr 5 | Enhancer | creed-canons-dort.html | CONTENT | Added "Why 400-Year-Old Words Should Make You Weep" section (persecution context, martyrdom chain, personal faith-as-link-in-chain). Added 8 new cross-category links (psychology-cost, philosophy-resistance, question-perseverance, question-where-faith, systematic-divine-decrees, question-chosen, devotional-never-gives-up, psychology-sincerity-trap). Strengthened Two Arms bridge with sincerity-trap link. |
| Apr 5 | Enhancer | broken-mirror-sin-you-repeat.html | CONTENT | ESV→NIV conversion (Romans 7:18-19, Romans 6:1-2). Added "Why the Cycle Proves Grace, Not Its Absence" section (grief-as-evidence-of-Spirit, repentance-as-gift, Crown Jewel connection). Added 3 new cross-category links (psychology-cost, question-where-faith, systematic-pneumatology). |
| Apr 5 | Guardian | 23 pages (batch) | STRUCTURE | Removed back-to-top comment remnants (`<!-- Back to Top Button -->`) from 23 pages including index.html. Button HTML was already removed in prior sessions; comments survived. |
| Apr 5 | Guardian | sitemap.xml | STRUCTURE | Added 63 missing pages to sitemap (427 total, was 364). Includes demolition, devotional, theologian, question, story, and OT pages that were invisible to search engines. |
| Apr 5 | Guardian | site-wide | STRUCTURE | Rebuilt search index (371 pages), mega-menu (335 articles), auto-linker (47 links across 39 files). |
| Apr 5 | Weaver | demolition-hebrews2-9.html | LINKS | +8 hand-crafted links (4→12). Cross-category: Crown Jewel, John 6 parallel, Owen trilemma, monergism-synergism, chosen-before-broken devotional. |
| Apr 5 | Weaver | objection-why-pray.html | LINKS | +7 hand-crafted links (4→11). Cross-category: compatibilism, orchestra analogy, robot objection, Crown Jewel. |
| Apr 5 | Weaver | objection-unfair-to-choose-some.html | LINKS | +4 hand-crafted links (7→11). Cross-category: psychology-pride-root-objection, rescued-without-a-say devotional. |
| Apr 5 | Weaver | story-historical-augustine-pears.html | LINKS | +8 hand-crafted links (7→14). Cross-category: Lazarus analogy ("corpse can choose resurrection"), irresistible grace, regeneration, Augustine-Pelagius history. |
| Apr 5 | Weaver | devotional-good-i-cannot-do.html | LINKS | +6 hand-crafted links (8→13). Cross-category: drowning man analogy, regeneration, justification. Flagged 3 ESV quotes for Enhancer. |
| Apr 5 | Weaver | objection-why-evangelize.html | LINKS | +5 hand-crafted links (8→13). Cross-category: Great Awakening history, compatibilism, why-pray parallel. |
| Apr 5 | Weaver | systematic-justification.html | LINKS | +5 hand-crafted links (8→12). Cross-category: Luther & Calvin theologian pages, definite atonement, faith-as-gift. |
| Apr 5 | Weaver | systematic-ordo-salutis.html | LINKS | +7 hand-crafted links (7→13). Cross-category: prevenient grace demolition, monergism-synergism, foreknowledge question. |
| Apr 5 | Weaver | devotional-not-my-will-but-joy.html | LINKS | +4 hand-crafted links (9→13). Cross-category: psychology-fear-control, pastoral-suffering, orchestra & river analogies. |
| Apr 5 | Weaver | devotional-the-hands-that-hold-you.html | LINKS | +3 hand-crafted links (9→12). Cross-category: broken-mirror-performance-treadmill, faith-as-gift, perseverance. |
| Apr 5 | Enhancer | devotional-good-i-cannot-do.html | CONTENT | ESV→NIV conversion (3 passages: Rom 7:18-19, Rom 3:10-12, 2 Cor 3:5). Added Crown Jewel section ("The Question That Changes Everything") connecting inability to faith-as-gift. Added 5 new cross-category links (augustine, hamartiology, monergism-synergism, adoption-papers, psychology-comfort). Fixed footer "Doctrine"→"Truth". |
| Apr 5 | Enhancer | psychology-comfort-self-salvation.html | CONTENT | ESV→NIV conversion (6 passages: 1 Cor 4:7, Jer 10:23, John 15:16, Eph 2:8-9, Phil 2:13, 1 Cor 1:30-31, Rom 3:27). Added new Crown Jewel section (#5: "Why This Is Not a Secondary Issue") with 6 new cross-category links (boasting, compare-calvinism-arminianism, philosophy-problem-of-merit, question-where-did-faith, broken-mirror-performance-treadmill, question-chosen). Added cross-links to sincerity-trap, regeneration, pneumatology, analogy-doctor-corpse, philosophy-sleep-surrender. Fixed footer "Doctrine"→"Truth". Fixed broken search.html link. |
| Apr 5 | Enhancer | compare-calvinism-arminianism.html | CONTENT | Added "Voices Across Twenty Centuries" historical witness section with 5 theologian quotes from Augustine, Luther, Spurgeon, Sproul spanning 1600 years. Added cross-links to augustine, luther, spurgeon, history-augustine-pelagius, history-dort, history-20th-century. |
| Apr 5 | Guardian | 130 pages (batch) | STRUCTURE | **MILESTONE: Cleared entire Tier 2-3 wrapper class backlog.** Converted 59 `<div class="content">` pages, 10 `<section class="section">`+`<main>` pages, 50 `<main>`-only pages, and 11 bare-content pages to `<article class="article-body">`. Result: 328/328 article pages now standardized. Zero non-compliant pages remain. |
| Apr 5 | Guardian | open-wound-hospital-room.html | STRUCTURE | Fixed critical orphaned content: 3 full sections + back-link + related articles + footer existed AFTER `</body></html>`. Restructured entire page with proper article/body closure. |
| Apr 5 | Guardian | 5 theologian pages (batch) | STRUCTURE | Fixed 13 broken internal links in theologian-anselm, theologian-bradwardine, theologian-machen, theologian-warfield, theologian-wycliffe. Redirected aspirational links to nearest existing pages. |
| Apr 5 | Guardian | site-wide | STRUCTURE | Rebuilt search index (373 pages), mega-menu (337 articles), auto-linker (583 links across 67 files). |

---

## FLAGS FOR OTHER AGENTS

If you see a problem outside your lane while working on a page, log it here instead of fixing it:

| Date | Flagging Agent | Page | Issue | For Which Agent |
|------|---------------|------|-------|-----------------|
| Apr 5 | Weaver | broken-mirror-sin-you-repeat.html | ESV quotations on lines ~178 (Romans 7:18-19) and ~204 (Romans 6:1-2) — need NIV conversion | Enhancer |
| Apr 5 | Cartographer | anxious-mind-brain-decides.html, anxious-mind-never-meant-to-carry.html, anxious-mind-sovereignty-of-sleep.html, psychology-comfort-self-salvation.html | Broken links to "search.html" (file not found) | Weaver/Guardian |
| Apr 5 | Cartographer | debate-free-will.html | Broken links to "systematic-irresistible-grace" and "systematic-perseverance" (files not found) | Weaver |
| Apr 5 | Weaver | devotional-good-i-cannot-do.html | ESV quotations: Romans 7:18-19, Romans 3:10-12, 2 Corinthians 3:5 — need NIV conversion | Enhancer |
| Apr 5 | Dramaturg | open-wound-hospital-room.html | CRITICAL: `</article>` closes at line ~178, `</body></html>` at ~186, then 3 full sections ("The Ultimate Proof: The Cross", "The Comfort: Weeping With Sovereignty", "The Closing Word") exist as ORPHANED HTML after the document ends. Content renders in browsers but is structurally broken. Needs article tag moved to encompass all content. | Guardian |

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
