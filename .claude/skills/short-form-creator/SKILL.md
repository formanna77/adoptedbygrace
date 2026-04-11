---
name: short-form-creator
description: "Create new short-form content for adoptedbygrace.net — compact formats designed for quick engagement: One Truth pages (~300 words), Quick Answer pages (~500 words), Scripture Spotlights (~400 words), and micro-devotionals (~400 words). Use when: create short content, quick reads, bite-sized content, micro devotional, one truth, quick answer, scripture spotlight, short page, fast read, snackable content, new short article. MANDATORY TRIGGER: any request to create new compact or short-form content for adoptedbygrace.net."
---

# Short-Form Creator — New Compact Content Types

You create short-form content for adoptedbygrace.net — new page formats designed for the phone scroller, the 2am searcher, the person who will give you 3 minutes but not 15.

## BEFORE YOU CREATE ANYTHING — MANDATORY READS

1. `/.claude/CLAUDE.md` — the full site mission, Two Arms, Crown Jewel, writing standards
2. `/FLEET-DOCTRINE-PARADIGM-SHATTER.md` — the paradigm shatter doctrine (if it exists)
3. `/REFORMED-SOURCES-INDEX.md` — the master index of 114 Reformed theology PDFs in `/Reformed Sources/`. Before writing ANY short-form page, check this index for source material. A 300-word One Truth page that includes a single devastating quote from Spurgeon or Edwards carries more authority than 3,000 words of unsourced prose. A Quick Answer backed by Augustine's actual words from 426 AD proves this isn't a modern invention. The library is organized by site category (demolition, systematic-theology, psychology, devotionals, philosophy, history, pastoral, questions, comparisons) — find the sources that match your page's topic and read the actual PDFs at `/Reformed Sources/[filename].pdf` for precise quotes.

## WHY THIS EXISTS

The site's current content is overwhelmingly long-form (1,500-8,000 words). But not every truth needs 1,500 words. Some truths need 300. Some need a single devastating question and 5 sentences of answer. Some need one Scripture passage and 3 paragraphs showing why it means what the reader hoped it didn't.

Short-form content serves three strategic purposes:
1. **Entry points** — A 2-minute read is a lower commitment. Readers who would bounce from a 10-minute article will finish a 2-minute one — and then click the link to the longer treatment.
2. **Internal linking fuel** — Every short page is a new node in the site's web. More pages = more links = more paths for readers to go deeper.
3. **Different learning styles** — Some people learn by reading long arguments. Others learn by encountering a single devastating idea stated perfectly. Both are valid. Both need to be served.

## THE FOUR SHORT FORMATS

### 1. ONE TRUTH (~300 words)
**What it is:** A single theological truth stated with maximum density and beauty. No argument. No defense. Just the truth, rendered so precisely that it stops the reader cold.

**Structure:**
```html
<div class="tldr">
    <strong>The Truth:</strong> [One sentence — the entire page compressed]
</div>
<p>[2-3 paragraphs delivering the truth with concrete examples]</p>
<blockquote><p>"[Scripture that seals it]"</p><cite>REFERENCE</cite></blockquote>
<p>[1 paragraph — the implication for the reader's life RIGHT NOW]</p>
```

**Filename pattern:** `truth-[topic].html`
**Eyebrow:** Devotionals
**Hub:** devotionals.html
**Word count:** 250-350

**Example topics:** "Your faith is not yours," "You were chosen before you were born," "Grace is not a reward," "The prayer you pray was given to you," "Dead men don't decide"

### 2. QUICK ANSWER (~500 words)
**What it is:** A focused answer to a single question — the kind someone types into Google. No preamble. Question → Answer → Scripture → Implication → Link to deeper treatment.

**Structure:**
```html
<div class="tldr">
    <strong>Quick Answer:</strong> [2-3 sentences — the direct answer]
</div>
<h2>[Restate the question as a section header]</h2>
<p>[3-5 paragraphs delivering the answer with Scripture support]</p>
<p>[Final paragraph linking to the full-length treatment: "For the complete argument, see <a href="...">longer article</a>."]</p>
```

**Filename pattern:** `quick-[question-topic].html`
**Eyebrow:** Questions
**Hub:** questions.html
**Word count:** 400-600

**Example topics:** "Does God choose who goes to heaven?", "What does 'dead in sin' actually mean?", "Did I choose God or did God choose me?", "Can you lose your salvation?", "What is irresistible grace?"

These are SEO gold — they match the exact queries people type into Google and provide immediate value.

### 3. SCRIPTURE SPOTLIGHT (~400 words)
**What it is:** A single passage examined with surgical precision. Show what it actually says, why the common reading misses the point, and what it means for the reader's understanding of grace.

**Structure:**
```html
<div class="tldr">
    <strong>The Passage:</strong> [The Scripture reference and its one-sentence implication]
</div>
<blockquote><p>"[Full passage quoted — NIV]"</p><cite>REFERENCE</cite></blockquote>
<h2>What This Actually Says</h2>
<p>[2-3 paragraphs of precise exegesis]</p>
<h2>Why This Matters</h2>
<p>[1-2 paragraphs connecting to the reader's life and the Crown Jewel]</p>
```

**Filename pattern:** `spotlight-[book-chapter].html`
**Eyebrow:** Questions (or Systematic Theology if doctrinal)
**Hub:** questions.html
**Word count:** 300-500

**Example passages:** John 6:44, Romans 9:11-13, Ephesians 1:4-5, Acts 13:48, Philippians 1:29, 2 Timothy 2:25, John 10:27-29, Romans 8:29-30

### 4. MICRO-DEVOTIONAL (~400 words)
**What it is:** A short devotional meditation — the right arm in miniature. For the reader who just had their worldview cracked and needs to know God is still good. Or for the believer who already knows sovereign grace and needs a 3-minute encounter with the beauty of it.

**Structure:**
```html
<div class="tldr">
    <strong>Rest in this:</strong> [One sentence of comfort]
</div>
<p>[3-5 paragraphs of devotional prose — beautiful, warm, concrete]</p>
<blockquote><p>"[Scripture that holds them]"</p><cite>REFERENCE</cite></blockquote>
<p>[Final paragraph — a prayer, a whisper, a promise]</p>
```

**Filename pattern:** `rest-[topic].html`
**Eyebrow:** Devotionals
**Hub:** devotionals.html
**Word count:** 300-500

**Example topics:** "He knew your name before the stars," "The prayer that proves you're His," "You cannot fall from hands that chose to hold you," "Grace was hunting you before you were born"

## WRITING STANDARDS — ALL FORMATS

### Voice
Channel the site's literary lineage: Lewis's analogies, Spurgeon's fire, Buechner's breathtaking brevity, Edwards's precision. Short-form content must be the site's BEST writing — because every word carries more weight when there are fewer of them.

### No AI Tropes
Banned: "tapestry," "landscape," "delve," "unpack," "nuanced," "robust," "journey," "navigate," "Let that sink in," "in today's world," "it's important to note," "at the end of the day," "let's explore." Write like a human being who has been wrecked by grace and rebuilt by it.

### Crown Jewel Connection
Every short-form page — even a 300-word micro-devotional — must connect to the site's core truth: faith itself is a gift. The connection can be subtle (a single sentence, a well-placed link) but it must exist. No page is an island.

### Two Arms
- Demolition short-form (Quick Answers, some Scripture Spotlights) must end with a link to a devotional or healing page
- Devotional short-form (One Truth, Micro-Devotionals) must contain at least one link to a truth/argument page
- Sword and balm. Always both.

### Internal Links
Even short pages need 4-6 internal links woven into the prose. These pages are nodes in the web — they must connect to the rest of the site.

### NIV Only
All Scripture quotations in NIV. No translation tags. See CLAUDE.md for the strategic rationale.

## HTML TEMPLATE

Every short-form page uses the standard article template from CLAUDE.md:
- `<head>` with meta, canonical, OG tags, `global.css`
- Nav from `/_nav-template.html`
- `<header class="page-hero">` with `.eyebrow`, `<h1>`, `.hub-subtitle`
- `<article class="article-body">` wrapping all content
- Footer with `footer-grace-warning`
- `<script src="/nav.js"></script>`

## AFTER CREATING — MANDATORY BUILD STEPS

After creating any new HTML file:
1. Add a `.hub-card` entry to the appropriate hub page
2. Run all five build scripts:
```bash
node build-search-index.js
node build-mega-menu.js
node build-homepage-counts.js
node auto-linker.js
node wire-orphans.js
```

## SESSION OUTPUT

Report what you created:
```
SHORT-FORM SESSION
══════════════════
Pages created: [count]
  One Truth: [count]
  Quick Answer: [count]
  Scripture Spotlight: [count]
  Micro-Devotional: [count]
Total words written: [count]
Average words per page: [count]
Hub cards added: [count]
Internal links woven: [count]
```
