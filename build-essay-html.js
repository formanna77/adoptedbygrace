// build-essay-html.js
// Converts 5 PDF essays (already extracted to /tmp/<name>.txt) into full HTML pages
// conforming to site conventions. Writes to /essays/<slug>.html so existing
// /essays/<slug>.pdf links continue to work via a companion update in essays.html.

const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const ESSAYS_DIR = path.join(ROOT, 'essays');

const TXT = {
  'essays/solideogloria.html':         { txt: '/tmp/solideogloria.txt',            slug: 'essays/solideogloria' },
  'essays/re-formed.html':             { txt: '/tmp/RE-FORMED.txt',                slug: 'essays/re-formed' },
  'essays/the-architecture.html':      { txt: '/tmp/The_Architecture.txt',         slug: 'essays/the-architecture' },
  'essays/the-institutes-book-3.html': { txt: '/tmp/The Institutes Book 3 essay.txt', slug: 'essays/the-institutes-book-3' },
  'essays/you-cannot-escape-the-text.html': { txt: '/tmp/you cannot escape the text.txt', slug: 'essays/you-cannot-escape-the-text' },
};

const META = {
  'essays/solideogloria.html': {
    title: 'Soli Deo Gloria — A Comprehensive Biblical Defense of Sovereign Grace',
    subtitle: 'From Him, Through Him, To Him Are All Things',
    desc: 'A sustained, exegetical, unapologetic argument that the doctrines of grace are not one permissible reading of the Bible — they are the reading the biblical text demands.',
    pdf: '/essays/solideogloria.pdf',
    reading: '45 min read — 8,000 words',
    eyebrow: 'Flagship Essay',
    skipLines: 0,
  },
  'essays/re-formed.html': {
    title: 'Re-Formed — A Testimony',
    subtitle: 'How Scripture Dismantled Every Argument I Used Against God\'s Sovereignty',
    desc: 'The account of a theological conversion — not from unbelief to belief, but from a God who waits on human permission to a God who saves by sovereign decree.',
    pdf: '/essays/RE-FORMED.pdf',
    reading: '10 min read — 2,000 words',
    eyebrow: 'Testimony',
    skipLines: 0,
  },
  'essays/the-architecture.html': {
    title: 'The Architecture of Grace',
    subtitle: 'Calvin\'s Institutes Book III, Walked End to End',
    desc: 'Calvin did not invent election. He organized what Scripture already taught. A thorough walk through the logic of Book III, from faith to perseverance.',
    pdf: '/essays/The_Architecture.pdf',
    reading: '55 min read — 10,900 words',
    eyebrow: 'Reformed Theology',
    skipLines: 0,
  },
  'essays/the-institutes-book-3.html': {
    title: 'The Institutes: Book III — An Academic Examination',
    subtitle: 'How Faith, Predestination, and Perseverance Interlock in Calvin\'s Soteriology',
    desc: 'A rigorous academic examination of Calvin\'s soteriology in Book III. For those who want to engage Calvin\'s actual arguments, not the caricatures.',
    pdf: '/essays/The Institutes Book 3 essay.pdf',
    reading: '55 min read — 10,800 words',
    eyebrow: 'Academic Essay',
    skipLines: 0,
  },
  'essays/you-cannot-escape-the-text.html': {
    title: 'You Cannot Escape the Text',
    subtitle: 'Romans 9, Ephesians 1, and John 6 Read in Greek',
    desc: 'Three of the most contested election passages — read in Greek, in context, without flinching. No honest exegesis avoids the conclusion.',
    pdf: '/essays/you cannot escape the text.pdf',
    reading: '32 min read — 6,300 words',
    eyebrow: 'Exegetical',
    skipLines: 0,
  },
};

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function normalize(s) {
  return s
    // Page break → treat as blank line separator (not indent)
    .replace(/\f/g, '\n')
    .replace(/\u2014/g, '—')
    .replace(/\u2013/g, '–')
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201C|\u201D/g, '"')
    .replace(/\u2026/g, '…')
    .replace(/\u00A0/g, ' ')
    .replace(/\uFB00/g, 'ff').replace(/\uFB01/g, 'fi').replace(/\uFB02/g, 'fl').replace(/\uFB03/g, 'ffi').replace(/\uFB04/g, 'ffl');
}

// Classify each non-empty line by its role.
function classifyLine(raw, prevLineWasHeading) {
  if (!raw.trim()) return { kind: 'blank' };
  if (/^\s*[•✦★*]+(?:\s*[•✦★*]+)*\s*$/.test(raw)) return { kind: 'divider' };
  const indent = raw.match(/^(\s*)/)[0].length;
  const text = raw.replace(/^\s+/, '').replace(/\s+$/, '');

  // Heading continuation (check FIRST, before standalone heading patterns, so an all-caps
  // centered continuation like "RAISES" under "THE SPIRIT" doesn't become its own heading).
  // Must be short AND either all-caps-centered OR Title Case (not a normal sentence).
  if (prevLineWasHeading && !/[.?!:,;]$/.test(text)) {
    const isAllCaps = text === text.toUpperCase() && /[A-Z]{3,}/.test(text);
    const words = text.split(/\s+/);
    const smallWords = new Set(['of','the','and','a','an','in','on','to','for','or','with','by','from','as','at','vs','vs.','nor']);
    let titleCaseCount = 0;
    for (const w of words) {
      if (/^[A-Z]/.test(w)) titleCaseCount++;
      else if (smallWords.has(w.toLowerCase())) titleCaseCount++;
      else { titleCaseCount = -1; break; }
    }
    const isTitleCase = titleCaseCount >= Math.max(2, words.length - 1) && words.length >= 1 && words.length <= 8;
    // All-caps continuation: accept at any non-trivial indent (centered or modest-indent).
    if (isAllCaps && text.length < 70 && words.length <= 10) {
      return { kind: 'heading-cont', text };
    }
    if (isTitleCase && indent < 5 && text.length < 60) {
      return { kind: 'heading-cont', text };
    }
  }

  // Heading patterns (order matters — most specific first)
  if (/^(?:PART|Part)\s+[IVXLCDM]+\s*[:.]/.test(text)) return { kind: 'heading', text };
  if (/^(?:CHAPTER|Chapter|SECTION|Section)\s+\d+\s*[:.]/.test(text)) return { kind: 'heading', text };
  if (/^(?:PROLOGUE|EPILOGUE|INTRODUCTION|CONCLUSION|PREFACE|FOREWORD)(?:\s*[:.]|$)/i.test(text) && text.length < 120) return { kind: 'heading', text };
  // Roman numeral heading at any indent: "I. The Question That..." or "XIII. Title"
  if (/^[IVX]{1,4}\.\s+[A-Z]/.test(text) && text.length < 160) return { kind: 'heading', text };
  // Bare Roman numeral on its own line (centered), e.g. "I." or "IV." alone — section marker
  if (/^[IVX]{1,4}\.$/.test(text) && indent > 15) return { kind: 'heading', text };
  // Arabic heading with indent: "1. Title"
  if (/^\d{1,2}\.\s+[A-Z]/.test(text) && text.length < 120 && indent > 2) return { kind: 'heading', text };
  // All-caps short line, heavily indented — centered heading like "A WORD BEFORE WE BEGIN"
  if (indent > 20 && text === text.toUpperCase() && text.length < 80 && /[A-Z]{3,}/.test(text) && !/^[—-]/.test(text)) {
    return { kind: 'heading', text };
  }

  // Attribution line: "— Matthew 13:44" (allow en-dash/em-dash)
  if (/^[—–-]\s+[A-Z][^.!?]{1,80}$/.test(text) && indent >= 6) {
    return { kind: 'attrib', text };
  }
  // Scripture reference at end of a deeply indented line, no leading dash
  if (indent >= 15 && /^(?:[1-3]\s+)?[A-Z][a-z]+\s+\d+:\d+(?:[–-]\d+)?$/.test(text)) {
    return { kind: 'attrib', text: '— ' + text };
  }

  // Quote: very deeply indented (>= 10), not a heading
  if (indent >= 10) return { kind: 'quote', text, indent };
  // Body
  return { kind: 'body', text, indent };
}

function parseEssay(raw, skipLines = 0) {
  raw = normalize(raw);
  let lines = raw.split(/\r?\n/);
  if (skipLines > 0) lines = lines.slice(skipLines);

  const classified = [];
  let prevHeading = false;
  for (const line of lines) {
    const c = classifyLine(line, prevHeading);
    classified.push(c);
    prevHeading = (c.kind === 'heading' || c.kind === 'heading-cont');
  }

  // Merge heading-cont lines into the preceding heading
  for (let i = classified.length - 1; i > 0; i--) {
    if (classified[i].kind === 'heading-cont') {
      // Find most recent heading
      let j = i - 1;
      while (j >= 0 && classified[j].kind === 'blank') j--;
      if (j >= 0 && (classified[j].kind === 'heading' || classified[j].kind === 'heading-cont')) {
        classified[j].text = classified[j].text + ' ' + classified[i].text;
        classified[i] = { kind: 'blank' };
      }
    }
  }

  // STEP 1: Strip table-of-contents (must run before auto-skip, since Contents comes first).
  let tocStart = -1;
  for (let k = 0; k < classified.length; k++) {
    const c = classified[k];
    if (c.kind === 'body' && /^(?:Contents|Table of Contents)$/.test(c.text)) {
      tocStart = k;
      break;
    }
  }
  if (tocStart >= 0) {
    let k = tocStart;
    classified[k] = { kind: 'blank' };
    k++;
    // Strategy: the TOC ends when we see a heading followed (possibly after blanks)
    // by a body line within 2 non-blank items. Once that pattern appears, keep the heading.
    let stop = false;
    while (k < classified.length && !stop) {
      const c = classified[k];
      if (c.kind === 'heading') {
        // Peek ahead
        let m = k + 1;
        let nonBlanksSeen = 0;
        let followedByBody = false;
        while (m < classified.length && nonBlanksSeen < 2) {
          if (classified[m].kind === 'blank') { m++; continue; }
          nonBlanksSeen++;
          if (classified[m].kind === 'body') { followedByBody = true; break; }
          m++;
        }
        if (followedByBody) {
          stop = true;   // keep this heading as-is, stop stripping
        } else {
          classified[k] = { kind: 'blank' };
          k++;
        }
      } else if (c.kind === 'body' && c.text.length >= 100) {
        stop = true;
      } else {
        // quote/attrib/short-body/divider inside TOC region — blank them out
        classified[k] = { kind: 'blank' };
        k++;
      }
    }
  }

  // STEP 2: strip bare page numbers (any kind)
  for (let k = 0; k < classified.length; k++) {
    const c = classified[k];
    if ((c.kind === 'body' || c.kind === 'quote') && /^\d{1,3}$/.test((c.text || '').trim())) {
      classified[k] = { kind: 'blank' };
    }
  }

  // STEP 2b: detect subsection headings (Title Case short line, bordered by blanks on both sides)
  function isTitleCase(s) {
    // All significant words start with a capital. Allow small-words ("of", "the", "and", etc.) lowercase.
    const words = s.split(/\s+/);
    if (words.length < 2 || words.length > 10) return false;
    const smallWords = new Set(['of','the','and','a','an','in','on','to','for','or','with','by','from','as','at','vs','vs.']);
    let capital = 0, lowerOK = 0;
    for (const w of words) {
      if (/^[A-Z]/.test(w)) capital++;
      else if (smallWords.has(w.toLowerCase())) lowerOK++;
      else return false;
    }
    return capital >= Math.max(2, words.length - 2);
  }
  for (let k = 1; k < classified.length - 1; k++) {
    const c = classified[k];
    if (c.kind !== 'body') continue;
    if (c.indent > 4) continue; // subsection titles are at indent 0
    const text = c.text || '';
    if (text.length < 5 || text.length > 70) continue;
    if (/[.?!]$/.test(text)) continue; // no trailing punctuation
    if (!isTitleCase(text)) continue;
    // Previous non-blank must be paragraph end (body ending with .?!) or blank/divider
    let prev = k - 1;
    while (prev >= 0 && classified[prev].kind === 'blank') prev--;
    let next = k + 1;
    while (next < classified.length && classified[next].kind === 'blank') next++;
    const prevOk = prev < 0 || classified[prev].kind === 'divider' ||
                   (classified[prev].kind === 'body' && /[.?!]$/.test(classified[prev].text || ''));
    const nextOk = next < classified.length && classified[next].kind === 'body';
    // Must have blank line between (k - prev >= 2) OR previous is divider
    const separated = (k - prev >= 2);
    if (prevOk && nextOk && separated) {
      classified[k] = { kind: 'subheading', text: c.text };
    }
  }

  // STEP 3: Auto-skip title junk before first real content.
  let firstContentIdx = -1;
  for (let i = 0; i < classified.length; i++) {
    const c = classified[i];
    if (c.kind === 'heading') { firstContentIdx = i; break; }
    if (c.kind === 'body' && c.text.length >= 150) { firstContentIdx = i; break; }
  }
  if (firstContentIdx > 0) {
    // Preserve opening epigraph (blockquote + attrib) within 8 lines before firstContentIdx.
    // Also absorb body lines that clearly belong to the quote (begin with an opening " or
    // directly precede a quote/attrib block) so the opening epigraph is complete.
    let epigraphStart = firstContentIdx;
    let found = false;
    for (let k = firstContentIdx - 1; k >= 0 && k >= firstContentIdx - 8; k--) {
      const kc = classified[k];
      if (kc.kind === 'attrib' || kc.kind === 'quote') {
        epigraphStart = k; found = true;
      } else if (kc.kind === 'body' && found) {
        // Body line adjacent to the epigraph — promote to quote if it looks like quote content
        // (starts with opening quote mark, or is low-indent continuation of a quote).
        const t = kc.text || '';
        if (/^[""']/.test(t) || t.length < 140) {
          classified[k] = { kind: 'quote', text: kc.text, indent: kc.indent };
          epigraphStart = k;
          continue;
        }
        break;
      } else if (kc.kind === 'blank') {
        // continue
      } else if (found) {
        break;
      }
    }
    for (let k = 0; k < epigraphStart; k++) {
      classified[k] = { kind: 'blank' };
    }
  }

  // STEP 4: Collect into blocks.
  const blocks = [];
  let pendingPara = null;
  let pendingQuote = null;

  function flushPara() {
    if (pendingPara) {
      blocks.push({ kind: 'p', text: pendingPara.text.replace(/\s+/g, ' ').trim() });
      pendingPara = null;
    }
  }
  function flushQuote() {
    if (pendingQuote) {
      blocks.push({ kind: 'blockquote', text: pendingQuote.text.replace(/\s+/g, ' ').trim() });
      pendingQuote = null;
    }
  }
  function flush() { flushPara(); flushQuote(); }

  for (let i = 0; i < classified.length; i++) {
    const c = classified[i];
    if (c.kind === 'blank') {
      // Lookahead: peek next non-blank. If pendingPara is clearly mid-sentence and next is
      // a body line that begins with lowercase, don't flush — it's a page-break artifact.
      let j = i + 1;
      while (j < classified.length && classified[j].kind === 'blank') j++;
      const nxt = j < classified.length ? classified[j] : null;
      if (pendingPara && nxt && nxt.kind === 'body') {
        const prevText = pendingPara.text.trim();
        const endsOpen = !/[.?!:;—–"']$/.test(prevText);
        const nextText = (nxt.text || '').trim();
        const nextStartsLower = /^[a-z]/.test(nextText);
        if (endsOpen && nextStartsLower) {
          // Swallow the blank; treat pendingPara as continuing
          continue;
        }
      }
      if (pendingQuote && nxt && (nxt.kind === 'quote' || nxt.kind === 'attrib' || nxt.kind === 'body')) {
        const prevText = pendingQuote.text.trim();
        const endsOpen = !/["'""'']$/.test(prevText) && !/[.?!]["'""'']?$/.test(prevText);
        const nextText = (nxt.text || '').trim();
        const nextStartsLower = /^[a-z]/.test(nextText);
        // If quote is mid-sentence and next body line is lowercase continuation, promote it to quote
        if (endsOpen && nxt.kind === 'body' && nextStartsLower) {
          // Convert the continuation body line to quote kind
          classified[j] = { ...nxt, kind: 'quote' };
          continue;
        }
      }
      flush();
      continue;
    }
    if (c.kind === 'divider') {
      flush();
      blocks.push({ kind: 'divider' });
      continue;
    }
    if (c.kind === 'heading') {
      flush();
      blocks.push({ kind: 'h2', text: c.text });
      continue;
    }
    if (c.kind === 'subheading') {
      flush();
      blocks.push({ kind: 'h3', text: c.text });
      continue;
    }
    if (c.kind === 'attrib') {
      // attach to preceding blockquote
      flushPara();
      if (pendingQuote) {
        blocks.push({ kind: 'blockquote', text: pendingQuote.text.replace(/\s+/g, ' ').trim(), cite: c.text.replace(/^[—-]\s*/, '') });
        pendingQuote = null;
      } else {
        // orphan attribution - render as attribution paragraph
        blocks.push({ kind: 'attrib', text: c.text });
      }
      continue;
    }
    if (c.kind === 'quote') {
      // Close any paragraph
      flushPara();
      if (!pendingQuote) pendingQuote = { text: c.text };
      else pendingQuote.text += ' ' + c.text;
      continue;
    }
    if (c.kind === 'body') {
      // If we have a pendingQuote and this body line is still indented (>= 6),
      // treat it as quote continuation (handles PDF page breaks inside quotes where
      // indent drops just below the strict quote threshold).
      if (pendingQuote && c.indent >= 6 && !pendingPara) {
        pendingQuote.text += ' ' + c.text;
        continue;
      }
      // Close any quote first
      flushQuote();
      // Indent convention: indent >= 3 marks paragraph start.
      // If pendingPara already has content and this line is indented, start new para.
      if (pendingPara && c.indent >= 3) {
        flushPara();
      }
      if (!pendingPara) pendingPara = { text: c.text, indent: c.indent };
      else pendingPara.text += ' ' + c.text;
      continue;
    }
  }
  flush();

  return blocks;
}

function renderBody(items) {
  const out = [];
  for (const it of items) {
    if (it.kind === 'h2') {
      const id = it.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
      out.push(`        <h2 id="${id}">${escHtml(it.text)}</h2>`);
    } else if (it.kind === 'h3') {
      const id = it.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
      out.push(`        <h3 id="${id}">${escHtml(it.text)}</h3>`);
    } else if (it.kind === 'divider') {
      out.push('        <hr class="essay-divider">');
    } else if (it.kind === 'blockquote') {
      const cite = it.cite ? `\n          <cite>— ${escHtml(it.cite)}</cite>` : '';
      out.push(`        <blockquote>\n          <p>${escHtml(it.text)}</p>${cite}\n        </blockquote>`);
    } else if (it.kind === 'attrib') {
      out.push(`        <p class="essay-attribution">${escHtml(it.text)}</p>`);
    } else {
      out.push(`        <p>${escHtml(it.text)}</p>`);
    }
  }
  return out.join('\n');
}

function buildHtml(outFile, meta, items) {
  const slug = '/' + outFile.replace(/\.html$/, '');
  const title = meta.title;
  const bodyHtml = renderBody(items);
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escHtml(title)} | Adopted by Grace</title>

    <!-- Canonical + Meta -->
    <link rel="canonical" href="https://adoptedbygrace.net${slug}">
    <meta name="description" content="${escAttr(meta.desc)}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
    <meta name="theme-color" content="#d4a254">
    <meta name="keywords" content="Reformed theology, doctrines of grace, sovereign grace, election, predestination, Calvinism, soteriology">

    <!-- Open Graph -->
    <meta property="og:site_name" content="Adopted by Grace">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://adoptedbygrace.net${slug}">
    <meta property="og:title" content="${escAttr(title)}">
    <meta property="og:description" content="${escAttr(meta.desc)}">
    <meta property="og:image" content="https://adoptedbygrace.net/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@ForeknownOne">
    <meta name="twitter:title" content="${escAttr(title)}">
    <meta name="twitter:description" content="${escAttr(meta.desc)}">
    <meta name="twitter:image" content="https://adoptedbygrace.net/og-image.png">

    <!-- Fonts + Global -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/global.css">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <!-- JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${escAttr(title)}",
      "description": "${escAttr(meta.desc)}",
      "url": "https://adoptedbygrace.net${slug}",
      "author": { "@type": "Person", "name": "Aaron Forman", "url": "https://adoptedbygrace.net/about" },
      "publisher": { "@type": "Organization", "name": "Adopted by Grace", "url": "https://adoptedbygrace.net" },
      "datePublished": "2026-04-20",
      "mainEntityOfPage": { "@type": "WebPage", "@id": "https://adoptedbygrace.net${slug}" }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adoptedbygrace.net/" },
        { "@type": "ListItem", "position": 2, "name": "Essays", "item": "https://adoptedbygrace.net/essays" },
        { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(title)} }
      ]
    }
    </script>

    <style>
        .essay-divider { width: 120px; height: 1px; margin: 3rem auto; border: none; background: linear-gradient(90deg, transparent, var(--accent-gold, #d4a254), transparent); }
        .essay-attribution { text-align: right; font-style: italic; color: var(--text-secondary); margin-top: -.75rem; }
        .article-body blockquote cite { display: block; margin-top: .5rem; font-style: italic; font-size: .95rem; color: var(--accent-gold); }
        .article-body h2 { text-align: center; font-family: 'Playfair Display', serif; color: var(--accent-gold); margin: 3.5rem 0 2rem; letter-spacing: .05em; }
        .essay-tools { display: flex; gap: .75rem; flex-wrap: wrap; justify-content: center; margin: 2rem 0; }
        .essay-tool-btn { display: inline-flex; align-items: center; gap: .4rem; padding: .6rem 1.2rem; background: rgba(212, 162, 84, .08); border: 1px solid rgba(212, 162, 84, .3); border-radius: 8px; color: var(--accent-gold); text-decoration: none; font-family: 'JetBrains Mono', monospace; font-size: .82rem; letter-spacing: .05em; transition: background .2s ease; }
        .essay-tool-btn:hover { background: rgba(212, 162, 84, .2); color: #fff3dc; }
    </style>
</head>
<body>
    <div class="progress-bar"></div>
    <a href="#content" class="skip-to-content">Skip to main content</a>

    <nav role="navigation" aria-label="Main navigation">
        <div class="nav-container">
            <a href="/" class="nav-site-name">Adopted by Grace</a>
            <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links"></ul>
        </div>
    </nav>

    <main id="content">
    <article class="article-body">
        <header class="page-hero">
            <span class="eyebrow">${escHtml(meta.eyebrow)}</span>
            <h1>${escHtml(title)}</h1>
            <p class="hub-subtitle">${escHtml(meta.subtitle)}</p>
            <div class="hero-divider"></div>
            <p class="intro-text">${escHtml(meta.desc)}</p>
            <div class="essay-tools">
                <a href="${meta.pdf}" class="essay-tool-btn">📄 Download PDF</a>
                <a href="/essays" class="essay-tool-btn">← All Essays</a>
            </div>
            <p style="text-align: center; font-size: .85rem; color: var(--text-secondary); margin-top: 1rem;">${escHtml(meta.reading)}</p>
        </header>

${bodyHtml}

    </article>
    </main>

    <footer role="contentinfo" class="site-footer">
        <div class="footer-container">
            <div class="footer-mission">
                <h3>The Mission</h3>
                <p>Adopted by Grace exists for the one still wrestling at 2am. Scripture, psychology, philosophy, history, and neuroscience — every angle pointing to the same truth: salvation is entirely God's work, and you were held all along.</p>
            </div>
        </div>
        <div class="footer-grace-warning">
            "Shall we go on sinning so that grace may increase? By no means!" — Romans 6:1-2<br>
            Grace is not a license to sin. It is the power that frees us from sin's dominion.
        </div>
        <div class="footer-copyright">
            <p>&copy; 2026 Adopted by Grace. All rights reserved.</p>
        </div>
    </footer>

    <script src="/nav.js"></script>
    <script src="/share-bar.js" defer></script>
</body>
</html>
`;
}

if (!fs.existsSync(ESSAYS_DIR)) fs.mkdirSync(ESSAYS_DIR, { recursive: true });

let made = 0;
for (const [outFile, conf] of Object.entries(TXT)) {
  if (!fs.existsSync(conf.txt)) {
    console.log(`⚠️  Missing source: ${conf.txt}`);
    continue;
  }
  const meta = META[outFile];
  const raw = fs.readFileSync(conf.txt, 'utf8');
  const items = parseEssay(raw, meta.skipLines || 0);
  const html = buildHtml(outFile, meta, items);
  const outPath = path.join(ROOT, outFile);
  fs.writeFileSync(outPath, html);
  made++;
  const h2 = items.filter(b => b.kind === 'h2').length;
  const bq = items.filter(b => b.kind === 'blockquote').length;
  const p = items.filter(b => b.kind === 'p').length;
  console.log(`✅ ${outFile}  (h2=${h2}, bq=${bq}, p=${p}, total=${items.length})`);
}

console.log(`\n✅ ${made} essay HTML pages generated.`);
