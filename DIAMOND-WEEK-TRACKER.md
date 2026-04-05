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

---

## FLAGS FOR OTHER AGENTS

If you see a problem outside your lane while working on a page, log it here instead of fixing it:

| Date | Flagging Agent | Page | Issue | For Which Agent |
|------|---------------|------|-------|-----------------|
| — | — | — | — | — |

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
