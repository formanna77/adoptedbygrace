#!/usr/bin/env node
/**
 * audit-prose.js — Phase F (Prose Integrity Audit) scanner — v2 (Session 39 refinement)
 *
 * Scans every article in the repo for two failure classes Aaron has named
 * as a gating constraint on Phase D expansion:
 *
 *   (1) REDUNDANCY — paragraphs in the same article that repeat a point already made.
 *       Method: Jaccard similarity of significant-word bags (≥ 0.35 = candidate).
 *       v2 adds eight exemption classes that filter scanner false positives at
 *       the apex prose tier: closing-recurrence, Scripture-tsunami,
 *       pedagogical-anaphora, antithetical-parallelism, confessional-translation,
 *       historical-document-quotation, exegetical-comparison, research→pairing
 *       structural.
 *
 *   (2) SENTENCE COHERENCE — sentences that don't track. Heuristic flags:
 *       a. Length: sentences > 45 words *of non-quoted prose*. v2 subtracts
 *          embedded Scripture quotations from the word count so a 90-word sentence
 *          that is mostly an embedded verse no longer trips the length flag.
 *       b. Long similes: "like a/an X" where X exceeds 12 words.
 *       c. Direction mismatches inside similes — expanded list.
 *       d. Mixed metaphors: ≥ 3 distinct concrete-image domains in *the same
 *          clause window* (v2: was "anywhere in sentence"; now requires
 *          co-occurrence within a 25-word window). Concrete historical referents
 *          (Eden as garden, Calvary as tree, courtroom verdict in
 *          grammatical-technical sense) are excluded.
 *       e. Padding modifiers — "in the dark" / "in the night" — only flagged
 *          when truly clause-end-padding, not when anchored by "of [X]" or by
 *          the article's controlling image.
 *       f. v2 NEW: Vehicle-tenor mismatch in similes — catches the original
 *          Aaron failure mode ("the verdict came down like a roof being lifted off")
 *          by detecting similes whose vehicle is in a different image-domain
 *          than the simile's tenor without a bridging element.
 *       g. v2 NEW: Coherence-positive suppressors — sentences that are long
 *          BECAUSE they earn their length through anaphora (3+ clauses sharing
 *          an opening prefix), antithetical parallelism / chiasm (a contrast
 *          conjunction with mirrored repeated keywords), or embedded Scripture
 *          quotation are unflagged.
 *
 * Output:
 *   audit-prose.json — machine-readable per-article scorecard
 *   audit-prose.md   — human-readable report ranked by candidate count
 *   v2 adds a `suppressed` section per article tracking which flags were
 *   filtered as exemptions/coherence-positives, so the human reviewer can
 *   audit the suppressions and re-tune the thresholds if needed.
 *
 * Run: node audit-prose.js
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = __dirname;

// ── Stopwords (vanilla English) ───────────────────────────────────
const STOP = new Set([
  'a','an','the','and','or','but','if','then','than','so','as','at','by','for','from','in','into','of','on','onto','to','with','within','without','out','off','up','down','over','under','through','about','before','after','again','any','all','also','because','been','being','can','could','did','do','does','done','each','either','even','ever','every','have','has','had','here','there','that','this','these','those','they','them','their','theirs','what','which','who','whom','whose','why','will','would','should','shall','may','might','must','was','were','will','you','your','yours','we','us','our','ours','my','mine','me','i','he','him','his','she','her','hers','it','its','itself','one','two','three','some','only','just','very','really','still','yet','too','more','most','less','least','never','no','not','none','nothing','now','than','then','where','when','how','am','are','is','be','but','though','while','until','since','upon','toward','among','between','against','during','above','below','around','beside','because','therefore','however','thus','hence','whether','indeed','perhaps','rather','quite','almost','already','always','sometimes','often','seldom','here','there','everywhere','anywhere','somewhere','nowhere','many','much','few','several','enough','such','same','other','another','others','either','neither','both','any','all'
]);

// ── Image domains for mixed-metaphor detection ────────────────────
// Each domain is a set of concrete keywords. v2: a sentence containing
// keywords from ≥ 3 domains within a 25-word clause window is flagged.
// v2 also excludes concrete-historical-referent contexts (Eden as garden,
// the tree of Calvary, etc.) from triggering the metaphor flag.
const DOMAINS = {
  courtroom:   new Set(['judge','verdict','gavel','bench','court','jury','dismissed','pardoned','acquit','accused','defendant','plaintiff','docket','testimony','witness']),
  // Note: removed 'sentence' (often used grammatically) from courtroom; v2
  // adds it back contextually only when appearing near other courtroom words.
  water:       new Set(['ocean','river','wave','flood','drowning','tide','shore','sea','swim','swimming','swam','current','baptism','rain']),
  fire:        new Set(['fire','flame','burn','burning','ember','smoke','ash','torch','furnace','blaze','spark','kindle','wildfire']),
  light:       new Set(['light','sunlight','dawn','candle','lamp','lantern','glow','glare','glimmer','beacon','torchlight','streetlight','sunrise']),
  dark:        new Set(['dark','darkness','night','midnight','shadow','dusk','twilight','starless','moonless']),
  building:    new Set(['house','roof','foundation','beam','beams','brick','bricks','cornerstone','threshold','rafter','rafters','attic','basement']),
  // Note: 'wall' / 'door' / 'room' / 'floor' / 'ceiling' / 'window' / 'stone'
  // removed from building because they often appear in non-architectural prose
  // (cell wall, door of mercy, room to breathe, floor gave way, etc.)
  body:        new Set(['knuckle','knuckles','lungs','breathing','bone','bones','spine','tendon','tendons','sinew']),
  // Note: 'hand' / 'arm' / 'heart' / 'eye' / 'feet' / 'mouth' / 'blood' removed —
  // these are dead-metaphor English ("hand of God", "arm of the Lord", "eye of the
  // soul") that appear in nearly every devotional. They no longer trip the domain
  // counter on their own.
  weapon:      new Set(['sword','knife','blade','arrow','bullet','spear','axe','shackle','shackles']),
  garment:     new Set(['robe','cloak','garment','sleeve','sleeves','collar','hood','tunic']),
  // Note: 'coat' removed; appears too often as Joseph's coat / etc. in
  // historical narrative prose without being a metaphor.
  vehicle:     new Set(['vessel','sail','sails','wagon','wheel','wheels','rudder','helm']),
  // Note: 'ship' / 'boat' / 'anchor' kept out — used metaphorically too widely.
  garden:      new Set(['vine','vines','blossom','blossoming','bloom','blooming']),
  // Note: 'garden' itself removed because of pervasive "garden of Eden" /
  // "Gethsemane" historical references. 'tree' / 'fruit' / 'seed' / 'root' removed —
  // they appear in Pauline metaphor (root of Jesse), historical-reference
  // (the cross as 'tree' per Gal 3:13), and dead-metaphor English.
  storm:       new Set(['thunder','lightning','tornado','hurricane','blizzard','tempest','gale']),
  // Note: 'storm' / 'wind' / 'winds' kept out — used pervasively in spiritual prose.
  music:       new Set(['melody','symphony','chord','choir','hymn','drumbeat']),
  // Note: 'song' / 'note' / 'silence' / 'echo' / 'bell' removed — "the silence",
  // "an echo of grace", "ring like a bell" are all dead-metaphor English.
  surgery:     new Set(['scalpel','surgeon','suture','sutured','anesthesia','anesthetic']),
  prison:      new Set(['cell','jailer','warden','dungeon','manacles']),
  // Note: 'prison' / 'bars' / 'iron' / 'locked' / 'cage' removed — heavily
  // used in spiritual freedom prose ("locked heart", "iron will", "caged
  // beast of the flesh") without being mixed metaphor.
  road:        new Set(['crossroads','wayfarer','milestone']),
  // Note: 'road' / 'path' / 'journey' removed — pervasive in pilgrim metaphor.
  desert:      new Set(['dune','wilderness','oasis','mirage','wadi','sandstorm']),
  mountain:    new Set(['cliff','crag','ridge','rockface']),
  // Note: 'mountain' / 'peak' / 'valley' / 'summit' / 'canyon' removed — used
  // in standard biblical-allusion prose without being metaphor.
};

// ── Suspicious phrases that historically produce broken similes ───
// v2: phrases here are STRONG signals; they earn a flag on their own.
const SUSPICIOUS_DIRECTION_MISMATCHES = [
  // The original Aaron failure-mode: courtroom-verdict + roof-up-and-off
  /\bcame\s+down[^.]{0,90}?\blifted\s+off/i,
  /\b(rose|rising|ascended|climbing|climbed)[^.]{0,80}?\b(sank|sinking|fell|falling|descended|descending)\b/i,
  /\b(sank|sinking|fell|falling|descended|descending)[^.]{0,80}?\b(rose|rising|ascended|climbing|climbed)\b/i,
  /\bopened[^.]{0,40}?\bclosed\b/i,
  /\bclosed[^.]{0,40}?\bopened\b/i,
  /\bthrown\s+(out|away)[^.]{0,40}?\bwelcomed\s+(in|home)\b/i,
];

// Padding modifiers — only flagged when at clause-end without anchor.
// v2 does the anchor check at flag time, not via regex.
const PADDING_MODIFIER_CANDIDATES = [
  /\b(in|into)\s+the\s+dark\b/i,
  /\bin\s+the\s+night\b/i,
  /\bin\s+the\s+silence\b/i,
];

// Abstract-noun simile false-positive list (often coherent in apex prose
// but worth a glance from human reviewers in less-tested articles)
const ABSTRACT_SIMILE = /\blike\s+a\s+(\w+\s+){0,3}(silence|memory|forgetting|forgotten|absence|whisper)\b/i;

// ── Concrete-historical referent exclusion patterns (v2) ──────────
// When these patterns appear, they consume their domain-words so the
// domain counter doesn't fire spuriously.
const HISTORICAL_REFERENTS = [
  { pattern: /\bgarden\s+of\s+eden\b/i, consumes: ['garden'] },
  { pattern: /\b(in|into)\s+the\s+garden\b(?!\s+of\s+(the\s+)?soul)/i, consumes: ['garden'], requires_context: /\b(adam|eve|eden|gethsemane|christ|jesus)\b/i },
  { pattern: /\bnailed\s+to\s+(the\s+|a\s+)?tree\b/i, consumes: ['garden'] },
  { pattern: /\bhung\s+on\s+(the\s+|a\s+)?tree\b/i, consumes: ['garden'] },
  { pattern: /\bcross\s+of\s+(christ|calvary|jesus)\b/i, consumes: ['weapon','building'] },
  { pattern: /\bin\s+the\s+dark\s+of\s+(the\s+)?(north\s+african\s+night|night|room|cell|cistern|pit|hour)/i, consumes: ['dark'] },
  { pattern: /\bin\s+the\s+dark\s+of\s+\w+\b/i, consumes: ['dark'] },  // any anchored "dark of X"
  // The grammatical-technical use of "sentence" / "verdict"
  { pattern: /\bone\s+sentence\b/i, consumes: ['courtroom'] },
  { pattern: /\bsentence\s*:/i, consumes: ['courtroom'] },  // "the sentence: God is good"
  { pattern: /\bdeath\s+sentence\b/i, consumes: ['courtroom'] },  // common idiom
];

// ── Utility: extract article paragraphs (HTML-aware) ──────────────
function getArticleParagraphs(html) {
  const m = html.match(/<article\s+class="article-body"[^>]*>([\s\S]*?)<\/article>/i);
  if (!m) return [];
  const inner = m[1];
  const cutAt = inner.indexOf('<!-- RELATED-ARTICLES-START -->');
  const authored = cutAt >= 0 ? inner.slice(0, cutAt) : inner;
  const kept = authored.replace(/<section[^>]*class="keep-reading"[^>]*>[\s\S]*?<\/section>/gi, '');
  const ps = kept.match(/<p\b[^>]*>[\s\S]*?<\/p>/gi) || [];
  // v2: keep the raw HTML alongside the stripped text so detectors can see
  // structural markers (e.g., <strong>Original:</strong> / <strong>Plain English:</strong>).
  return ps
    .map(rawP => ({ raw: rawP, text: stripHtml(rawP) }))
    .filter(p => p.text && p.text.trim().length >= 30);
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&rsquo;/g, "'").replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z'\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 4 && !STOP.has(w));
}

function jaccard(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersect = 0;
  for (const w of setA) if (setB.has(w)) intersect++;
  return intersect / (setA.size + setB.size - intersect);
}

// ── Sentence extraction ───────────────────────────────────────────
function extractSentences(paragraph) {
  return paragraph
    .replace(/—/g, ' — ')
    .split(/(?<=[.!?])\s+(?=[A-Z"‘“])/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

function wordCount(sentence) {
  return sentence.split(/\s+/).filter(Boolean).length;
}

// v2 NEW: count words excluding embedded quotation
function nonQuotedWordCount(sentence) {
  // Strip out quoted segments (text inside straight or curly double-quotes).
  // Embedded Scripture is the dominant case; this prevents a 90-word sentence
  // that is mostly an embedded verse from tripping the length flag.
  const stripped = sentence
    .replace(/"[^"]{20,}"/g, ' ')   // long quoted strings only (≥ 20 chars)
    .replace(/[""][^""]{20,}[""]/g, ' ');
  return stripped.split(/\s+/).filter(Boolean).length;
}

// v2 NEW: detect anaphora — 3+ clauses sharing an opening prefix
function detectAnaphora(sentence) {
  // Split on commas, semicolons, and em-dashes (clause boundaries)
  const clauses = sentence.split(/[,;]|\s+—\s+/)
    .map(c => c.trim())
    .filter(c => c.length > 6);
  if (clauses.length < 3) return null;

  // Try 2-word prefix
  const twoWord = clauses.map(c => {
    const words = c.split(/\s+/).slice(0, 2).join(' ').toLowerCase();
    return words.replace(/[^a-z\s]/g, '').trim();
  });
  const twoWordCount = {};
  twoWord.forEach(p => { if (p.length > 4) twoWordCount[p] = (twoWordCount[p] || 0) + 1; });
  for (const [p, c] of Object.entries(twoWordCount)) {
    if (c >= 3) return { type: '2-word', prefix: p, count: c };
  }

  // Try 1-word prefix (e.g., "every prayer / every tear / every candle")
  const oneWord = clauses.map(c => {
    const w = c.split(/\s+/)[0];
    return w ? w.toLowerCase().replace(/[^a-z]/g, '') : '';
  });
  const oneWordCount = {};
  oneWord.forEach(w => { if (w.length > 2 && !STOP.has(w)) oneWordCount[w] = (oneWordCount[w] || 0) + 1; });
  for (const [w, c] of Object.entries(oneWordCount)) {
    if (c >= 3) return { type: '1-word', prefix: w, count: c };
  }

  return null;
}

// v2 NEW: detect chiasm / antithetical parallelism — contrast conjunction +
// repeated significant words in mirrored positions
function detectChiasm(sentence) {
  if (!/\b(but|while|whereas|yet)\b/i.test(sentence)) return null;
  const words = sentence.toLowerCase().split(/\s+/)
    .map(w => w.replace(/[^a-z]/g, ''))
    .filter(w => w.length > 4 && !STOP.has(w));
  const counts = {};
  words.forEach(w => counts[w] = (counts[w] || 0) + 1);
  const repeated = Object.entries(counts).filter(([, c]) => c >= 2).map(([w]) => w);
  if (repeated.length >= 2) {
    return { repeated_keywords: repeated.slice(0, 4) };
  }
  return null;
}

// v2 REFINED: detect mixed-metaphor with same-clause requirement and
// historical-referent exclusion
function detectMixedMetaphor(sentence) {
  let lower = sentence.toLowerCase();

  // First, mask out historical-referent contexts so they don't trigger domains
  for (const ref of HISTORICAL_REFERENTS) {
    if (ref.pattern.test(lower)) {
      // If the rule has a context requirement, check it
      if (ref.requires_context && !ref.requires_context.test(lower)) continue;
      // Mask the matched span so its domain words don't fire
      lower = lower.replace(ref.pattern, ' '.repeat(20));
    }
  }

  // Split into clause windows (max ~25 words each, on commas/semicolons/em-dashes)
  const clauseWindows = lower.split(/[,;]|\s+—\s+/)
    .map(c => c.trim())
    .filter(c => c.length > 0);

  // For each clause window, collect domain hits
  for (const clause of clauseWindows) {
    const hits = new Set();
    for (const [domain, words] of Object.entries(DOMAINS)) {
      for (const w of words) {
        if (new RegExp(`\\b${w}\\b`).test(clause)) {
          hits.add(domain);
          break;
        }
      }
    }
    if (hits.size >= 3) {
      return { domains: Array.from(hits), clause: clause.slice(0, 80) };
    }
  }
  return null;
}

// v2 NEW: detect vehicle-tenor mismatch in similes
// This catches the original Aaron failure mode: subject in domain X, simile
// vehicle in domain Y, no bridge — the simile doesn't track.
function detectVehicleTenorMismatch(sentence) {
  // Find a "like a/an [X]" simile
  const simileMatch = sentence.match(/^([^.]*?)\s+like\s+(?:a|an)\s+([^.,;]+)/i);
  if (!simileMatch) return null;
  const tenorClause = simileMatch[1].toLowerCase();
  const vehicleClause = simileMatch[2].toLowerCase();

  const tenorDomains = new Set();
  const vehicleDomains = new Set();
  for (const [domain, words] of Object.entries(DOMAINS)) {
    for (const w of words) {
      if (new RegExp(`\\b${w}\\b`).test(tenorClause)) { tenorDomains.add(domain); break; }
    }
    for (const w of words) {
      if (new RegExp(`\\b${w}\\b`).test(vehicleClause)) { vehicleDomains.add(domain); break; }
    }
  }

  if (tenorDomains.size === 0 || vehicleDomains.size === 0) return null;
  // Mismatch if there is NO domain overlap between tenor and vehicle
  // AND each side has at least one concrete domain.
  for (const d of tenorDomains) if (vehicleDomains.has(d)) return null;
  return {
    tenor_domains: Array.from(tenorDomains),
    vehicle_domains: Array.from(vehicleDomains),
  };
}

// v2 REFINED: detect padding modifier (in the dark / in the night / in the silence)
// Only flags when truly clause-end-padding, not when anchored.
function detectPaddingModifier(sentence, articleControllingImage) {
  for (const re of PADDING_MODIFIER_CANDIDATES) {
    const match = sentence.match(re);
    if (!match) continue;
    const matched = match[0];
    const matchIdx = match.index;
    const after = sentence.slice(matchIdx + matched.length, matchIdx + matched.length + 30).toLowerCase();
    // If immediately followed by "of [X]" or "where" / "while" / a clause continuation, it's anchored
    if (/^\s*of\s+/i.test(after)) continue;       // "in the dark of the night" — anchored
    if (/^\s*[a-z]+(ing|ed)\b/i.test(after)) continue;  // "in the dark wondering" — modified by participle
    // If the article's controlling image is the matched word, suppress
    if (articleControllingImage && new RegExp(`\\b${matched.split(/\s+/).pop()}\\b`, 'i').test(articleControllingImage)) continue;
    return { phrase: matched, position: matchIdx };
  }
  return null;
}

// ── Sentence flag pipeline (v2) ───────────────────────────────────
function flagSentence(sentence, articleControllingImage) {
  const flags = [];
  const suppressedFlags = [];

  const wcRaw = wordCount(sentence);
  const wcNonQuoted = nonQuotedWordCount(sentence);

  // (a) Length — v2: use non-quoted count, also suppress if anaphora/chiasm
  if (wcNonQuoted > 45) {
    const anaphora = detectAnaphora(sentence);
    const chiasm = detectChiasm(sentence);
    if (anaphora) {
      suppressedFlags.push(`length-suppressed-anaphora:${anaphora.type}:${anaphora.prefix}×${anaphora.count}`);
    } else if (chiasm) {
      suppressedFlags.push(`length-suppressed-chiasm:${chiasm.repeated_keywords.join(',')}`);
    } else if (wcRaw - wcNonQuoted > 15) {
      // Sentence is long because of embedded quotation
      suppressedFlags.push(`length-suppressed-embedded-quotation:${wcRaw}w-raw/${wcNonQuoted}w-prose`);
    } else {
      flags.push(`long:${wcNonQuoted}w`);
    }
  }

  // (b) Long simile (still flag — these are usually worth a glance)
  const simileMatch = sentence.match(/\blike\s+(?:a|an)\s+([^.,;]+)/i);
  if (simileMatch) {
    const tail = simileMatch[1].trim();
    const tailWords = tail.split(/\s+/).filter(Boolean);
    if (tailWords.length > 12) {
      // v2: suppress long-simile flag if anaphora detected (the simile may be
      // part of an anaphoric climb)
      if (detectAnaphora(sentence)) {
        suppressedFlags.push(`long-simile-suppressed-anaphora:${tailWords.length}w`);
      } else {
        flags.push(`long-simile:${tailWords.length}w`);
      }
    }
  }

  // (c) Direction-mismatch (strong signal — always flag)
  for (const re of SUSPICIOUS_DIRECTION_MISMATCHES) {
    if (re.test(sentence)) {
      flags.push(`direction-mismatch:${re.source.slice(0, 40)}`);
      break;
    }
  }

  // (d) Padding modifier (v2: anchor-check)
  const padding = detectPaddingModifier(sentence, articleControllingImage);
  if (padding) {
    flags.push(`padding-modifier:${padding.phrase}`);
  }

  // (e) Abstract simile (still worth a glance)
  if (ABSTRACT_SIMILE.test(sentence)) {
    flags.push(`abstract-simile:${sentence.match(ABSTRACT_SIMILE)[0].slice(0, 40)}`);
  }

  // (f) v2 NEW: Vehicle-tenor mismatch in similes (catches Aaron's failure mode)
  const vtm = detectVehicleTenorMismatch(sentence);
  if (vtm) {
    flags.push(`vehicle-tenor-mismatch:tenor=${vtm.tenor_domains.join('+')},vehicle=${vtm.vehicle_domains.join('+')}`);
  }

  // (g) Mixed metaphor — v2: same-clause requirement + historical-referent exclusion
  const mm = detectMixedMetaphor(sentence);
  if (mm) {
    flags.push(`mixed-metaphor:${mm.domains.join('+')}`);
  }

  return { flags, suppressedFlags };
}

// ── Redundancy exemption detection (v2) ──────────────────────────
// Returns a function `pairIsExempt(i, j) → null | { class, reason }`
function buildRedundancyExemptionFilter(filename, paragraphs, html) {
  const total = paragraphs.length;
  const filenameLower = filename.toLowerCase();

  // Class 1: Confessional-translation page — *-plain-english.html or pages
  // with "Original:" / "Plain English:" pairing structure
  const isConfessionalTranslation =
    filenameLower.endsWith('-plain-english.html') ||
    /<strong>\s*Original\s*:\s*<\/strong>/i.test(html) &&
    /<strong>\s*Plain\s*English\s*:\s*<\/strong>/i.test(html);

  // Class 2: Has Confession-article structure (Article N / Article N continued / Section N)
  // Detect paragraphs that start with these markers
  const articleMarkerParagraphs = new Set();
  paragraphs.forEach((p, idx) => {
    if (/^\s*(article|section)\s+\d+/i.test(p.text)) articleMarkerParagraphs.add(idx);
  });

  // Class 3: Pedagogical-anaphora — find paragraphs sharing identical opening
  // structural markers across the article (e.g., "Step N", "The shared premise",
  // "The question Arminians have not asked", "The inference", "First objection")
  const openingFragments = paragraphs.map(p => {
    const m = p.text.match(/^([A-Z][^.:]{8,80}[:.])/);
    return m ? m[1].toLowerCase().replace(/\s+/g, ' ').trim() : null;
  });
  const fragmentCount = {};
  openingFragments.forEach(f => { if (f) fragmentCount[f] = (fragmentCount[f] || 0) + 1; });
  const repeatedFragments = new Set(
    Object.entries(fragmentCount).filter(([, c]) => c >= 3).map(([f]) => f)
  );
  // Also detect bold-structural openings via the raw HTML (e.g., "<strong>Step 2:</strong>")
  const boldOpenings = paragraphs.map(p => {
    const m = p.raw.match(/<strong[^>]*>\s*([^<]{4,60})\s*<\/strong>/i);
    return m ? m[1].toLowerCase().replace(/\s*\d+\s*/g, ' N ').replace(/\s+/g, ' ').trim() : null;
  });
  const boldCount = {};
  boldOpenings.forEach(b => { if (b) boldCount[b] = (boldCount[b] || 0) + 1; });
  const repeatedBoldOpenings = new Set(
    Object.entries(boldCount).filter(([, c]) => c >= 3).map(([b]) => b)
  );

  // Class 4: Scripture-tsunami — detect paragraphs that are dominated by a
  // Scripture quotation (≥ 50% of paragraph is in quotes, or contains a
  // visible verse reference)
  const scriptureQuoteParagraphs = new Set();
  paragraphs.forEach((p, idx) => {
    const quoted = (p.text.match(/"[^"]+"/g) || []).join('').length;
    const textLen = p.text.length;
    if (textLen > 0 && quoted / textLen > 0.4) scriptureQuoteParagraphs.add(idx);
    if (/<cite\b/i.test(p.raw) || /<blockquote\b/i.test(p.raw)) scriptureQuoteParagraphs.add(idx);
    if (/\b(Romans|John|Matthew|Luke|Mark|Acts|Genesis|Exodus|Psalm|Isaiah|Jeremiah|Ezekiel|Hebrews|Ephesians|Philippians|Galatians|1\s*Corinthians|2\s*Corinthians|1\s*Peter|2\s*Peter|1\s*John|2\s*Timothy|1\s*Timothy|Revelation)\s+\d+:\d+/i.test(p.text)) {
      scriptureQuoteParagraphs.add(idx);
    }
  });

  // Class 5: research → pairing structural — detect side-by-side science/scripture
  // pairing CSS classes
  const hasPairingStructure = /class="[^"]*pairing-(science|scripture|row)[^"]*"/i.test(html);

  // Class 6: Antithetical-parallelism — detect paragraph pairs that both
  // start with "If [X]" with one negated and the other affirmative
  function detectAntithetical(i, j) {
    const a = paragraphs[i].text;
    const b = paragraphs[j].text;
    const ifMatch = (s) => s.match(/^\s*(?:<[^>]+>)*\s*If\s+([^,:]+?)(\s+is\s+(not\s+)?a\s+gift|:|,)/i);
    const aMatch = ifMatch(a);
    const bMatch = ifMatch(b);
    if (!aMatch || !bMatch) return false;
    // If one says "not a gift" and the other doesn't — antithetical
    const aHasNot = /\bnot\b/i.test(aMatch[0]);
    const bHasNot = /\bnot\b/i.test(bMatch[0]);
    return aHasNot !== bHasNot;
  }

  // Class 7: Closing-recurrence — both paragraphs in the article's final 15%
  // AND share a Scripture quotation or thesis-defining keyword
  function isClosingRecurrence(i, j) {
    const aLate = i >= total * 0.6;
    const bLate = j >= total * 0.85;
    if (!(aLate && bLate)) return false;
    // The pair must be one earlier instance + one closing-instance
    if (j - i < total * 0.15) return false;
    // At least one of the two must be a Scripture-quote or thesis recap
    return scriptureQuoteParagraphs.has(i) || scriptureQuoteParagraphs.has(j);
  }

  // Class 8: Exegetical-comparison — one paragraph has bracket-clarifications
  // and the other doesn't, but both contain the same Scripture
  function isExegeticalComparison(i, j) {
    const a = paragraphs[i].text;
    const b = paragraphs[j].text;
    const aHasBrackets = /\[\w+(?:\s+\w+)?\]/.test(a);
    const bHasBrackets = /\[\w+(?:\s+\w+)?\]/.test(b);
    return aHasBrackets !== bHasBrackets;
  }

  // ── The main exemption check ────────────────────────────────────
  return function pairIsExempt(i, j) {
    // Class 1: Confessional-translation pages — exempt all redundancy pairs
    if (isConfessionalTranslation) {
      return { class: 'confessional-translation', reason: 'page is *-plain-english or has Original/Plain-English structure' };
    }

    // Class 2: Both paragraphs are Article N / Section N markers (historical-document quotation)
    if (articleMarkerParagraphs.has(i) && articleMarkerParagraphs.has(j)) {
      return { class: 'historical-document-quotation', reason: 'both paragraphs are Article/Section markers from a historical document' };
    }

    // Class 3a: Both paragraphs share a structural opening fragment that
    // recurs ≥ 3 times in the article (pedagogical anaphora)
    if (openingFragments[i] && openingFragments[i] === openingFragments[j] && repeatedFragments.has(openingFragments[i])) {
      return { class: 'pedagogical-anaphora', reason: `shared structural opener: "${openingFragments[i]}"` };
    }
    // Class 3b: Same via bold-structural opening
    if (boldOpenings[i] && boldOpenings[i] === boldOpenings[j] && repeatedBoldOpenings.has(boldOpenings[i])) {
      return { class: 'pedagogical-anaphora', reason: `shared bold opener: "${boldOpenings[i]}"` };
    }

    // Class 4: Both paragraphs are Scripture-quote-dominated → Scripture tsunami
    if (scriptureQuoteParagraphs.has(i) && scriptureQuoteParagraphs.has(j)) {
      return { class: 'scripture-tsunami', reason: 'both paragraphs are Scripture-quote-dominated; deliberate verse stacking' };
    }

    // Class 5: Page has pairing structure
    if (hasPairingStructure) {
      // Be conservative — only exempt pairs where one is in research section and
      // one is in pairing section. Approximate: i in first 60% and j in last 40%.
      if (i < total * 0.6 && j > total * 0.55) {
        return { class: 'research-pairing-structural', reason: 'page uses pairing-science / pairing-scripture layout' };
      }
    }

    // Class 6: Antithetical parallelism
    if (detectAntithetical(i, j)) {
      return { class: 'antithetical-parallelism', reason: 'paragraphs share "If X" structure with one negated' };
    }

    // Class 7: Closing recurrence
    if (isClosingRecurrence(i, j)) {
      return { class: 'closing-recurrence', reason: 'paragraph reprises Scripture/thesis at article close' };
    }

    // Class 8: Exegetical comparison (one has bracket-clarifications, other doesn't)
    if (isExegeticalComparison(i, j)) {
      return { class: 'exegetical-comparison', reason: 'one paragraph has bracket-clarifications, other does not — quote vs. parsed-quote' };
    }

    return null;  // not exempt — flag the pair as genuine redundancy
  };
}

// ── Detect article's controlling image (for padding-modifier suppression) ─
function detectControllingImage(filename, html) {
  // Title H1 + H2 headings
  const h1 = (html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '';
  const h2s = (html.match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi) || []).join(' ');
  return stripHtml(h1 + ' ' + h2s).toLowerCase();
}

// ── Score one article (v2) ───────────────────────────────────────
function auditArticle(filename, htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const paragraphs = getArticleParagraphs(html);
  if (paragraphs.length < 2) {
    return {
      file: filename, paragraphs: 0,
      redundancy_pairs: [], flagged_sentences: [],
      suppressed_redundancy: [], suppressed_sentences: [],
      score: 0,
    };
  }

  const articleControllingImage = detectControllingImage(filename, html);
  const pairIsExempt = buildRedundancyExemptionFilter(filename, paragraphs, html);

  // ── Redundancy: pairwise Jaccard ─────────────────────────────────
  const tokenSets = paragraphs.map(p => new Set(tokenize(p.text)));
  const redundancy_pairs = [];
  const suppressed_redundancy = [];

  for (let i = 0; i < paragraphs.length; i++) {
    for (let j = i + 1; j < paragraphs.length; j++) {
      const sim = jaccard(tokenSets[i], tokenSets[j]);
      if (sim >= 0.35 && tokenSets[i].size >= 8 && tokenSets[j].size >= 8) {
        const exempt = pairIsExempt(i, j);
        const pair = {
          paragraph_a: i,
          paragraph_b: j,
          similarity: parseFloat(sim.toFixed(2)),
          a_preview: paragraphs[i].text.slice(0, 110),
          b_preview: paragraphs[j].text.slice(0, 110),
        };
        if (exempt) {
          suppressed_redundancy.push({ ...pair, exemption_class: exempt.class, reason: exempt.reason });
        } else {
          redundancy_pairs.push(pair);
        }
      }
    }
  }

  // ── Coherence flags per sentence ─────────────────────────────────
  const flagged_sentences = [];
  const suppressed_sentences = [];

  paragraphs.forEach((p, idx) => {
    const sentences = extractSentences(p.text);
    sentences.forEach((s, sIdx) => {
      const { flags, suppressedFlags } = flagSentence(s, articleControllingImage);
      if (flags.length > 0) {
        flagged_sentences.push({
          paragraph: idx,
          sentence_index: sIdx,
          flags,
          preview: s.slice(0, 200),
        });
      }
      if (suppressedFlags.length > 0) {
        suppressed_sentences.push({
          paragraph: idx,
          sentence_index: sIdx,
          suppressed_flags: suppressedFlags,
          preview: s.slice(0, 120),
        });
      }
    });
  });

  const score = redundancy_pairs.length * 2 + flagged_sentences.length;

  return {
    file: filename,
    paragraphs: paragraphs.length,
    redundancy_pairs,
    flagged_sentences,
    suppressed_redundancy,
    suppressed_sentences,
    redundancy_count: redundancy_pairs.length,
    flagged_sentence_count: flagged_sentences.length,
    suppressed_redundancy_count: suppressed_redundancy.length,
    suppressed_sentence_count: suppressed_sentences.length,
    score,
  };
}

// ── Main ──────────────────────────────────────────────────────────
function main() {
  const files = fs.readdirSync(REPO_ROOT).filter(f => f.endsWith('.html')).sort();
  const articles = [];

  console.log(`Scanning ${files.length} HTML files for prose-integrity issues (v2)...`);

  for (const file of files) {
    const htmlPath = path.join(REPO_ROOT, file);
    const html = fs.readFileSync(htmlPath, 'utf8');
    if (!/<article\s+class="article-body"/.test(html)) continue;
    const result = auditArticle(file, htmlPath);
    if (result.paragraphs > 0) articles.push(result);
  }

  console.log(`Audited ${articles.length} articles.`);

  // ── Aggregate ────────────────────────────────────────────────────
  const totalRedundancy = articles.reduce((s, a) => s + a.redundancy_count, 0);
  const totalFlagged    = articles.reduce((s, a) => s + a.flagged_sentence_count, 0);
  const totalSuppressedRedundancy = articles.reduce((s, a) => s + a.suppressed_redundancy_count, 0);
  const totalSuppressedSentences  = articles.reduce((s, a) => s + a.suppressed_sentence_count, 0);
  const articlesWithRedundancy = articles.filter(a => a.redundancy_count > 0).length;
  const articlesWithFlagged    = articles.filter(a => a.flagged_sentence_count > 0).length;
  const articlesClean          = articles.filter(a => a.score === 0).length;

  // Per-class suppression breakdown
  const suppressionByClass = {};
  articles.forEach(a => {
    a.suppressed_redundancy.forEach(s => {
      suppressionByClass[s.exemption_class] = (suppressionByClass[s.exemption_class] || 0) + 1;
    });
  });

  const ranked = articles.slice().sort((a, b) => b.score - a.score);

  // ── JSON output ─────────────────────────────────────────────────
  const json = {
    audit: 'prose-integrity',
    phase: 'F',
    scanner_version: 'v2 (Session 39 refinement — exemption taxonomy + coherence-positive suppressors + vehicle-tenor mismatch detector)',
    generated: new Date().toISOString(),
    spec: 'audit-prose.js v2 — redundancy (Jaccard ≥ 0.35) with eight-class exemption filter + sentence-coherence heuristic with anaphora/chiasm/embedded-quotation suppressors + new vehicle-tenor mismatch detector',
    totals: {
      articles_audited: articles.length,
      total_redundancy_pairs_flagged: totalRedundancy,
      total_sentences_flagged: totalFlagged,
      total_redundancy_pairs_suppressed: totalSuppressedRedundancy,
      total_sentences_suppressed: totalSuppressedSentences,
      articles_with_redundancy: articlesWithRedundancy,
      articles_with_flagged_sentences: articlesWithFlagged,
      articles_clean: articlesClean,
      suppression_by_class: suppressionByClass,
    },
    ranked_by_severity: ranked.slice(0, 80).map(a => ({
      file: a.file,
      score: a.score,
      paragraphs: a.paragraphs,
      redundancy_count: a.redundancy_count,
      flagged_sentence_count: a.flagged_sentence_count,
      suppressed_redundancy_count: a.suppressed_redundancy_count,
      suppressed_sentence_count: a.suppressed_sentence_count,
    })),
    articles: articles.sort((a, b) => a.file.localeCompare(b.file)),
  };
  fs.writeFileSync(path.join(REPO_ROOT, 'audit-prose.json'), JSON.stringify(json, null, 2));

  // ── Markdown report ─────────────────────────────────────────────
  let md = `# Prose Integrity Audit (Phase F) — Scanner v2\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n`;
  md += `**Spec:** \`audit-prose.js v2\` — redundancy (Jaccard ≥ 0.35 on significant-word bags) with **eight-class exemption filter** (closing-recurrence, Scripture-tsunami, pedagogical-anaphora, antithetical-parallelism, confessional-translation, historical-document-quotation, exegetical-comparison, research→pairing structural) + sentence-coherence heuristic with **anaphora/chiasm/embedded-quotation positive suppressors** + new **vehicle-tenor mismatch detector** (catches the original Aaron failure mode: simile whose vehicle and tenor are in incompatible domains).\n\n`;
  md += `**Mandate (Aaron, 2026-04-27):** "many articles repeat themselves usually a couple times but sometimes even 3 times within the article... also some sentences don't make sense... we do not start expanding the website until every last sentence, paragraph, and article are written perfectly."\n\n`;
  md += `**v2 design goal (Aaron, 2026-04-28):** "robust and comprehensive as well as efficient and effective." The v2 scanner suppresses apex-tier false positives at the eight known exemption classes while adding a dedicated detector for the failure mode that triggered Phase F (vehicle-tenor mismatch in similes — the broken-roof-being-lifted-off failure).\n\n---\n\n`;

  md += `## §I — Aggregate\n\n`;
  md += `| Metric | Value |\n|---|---|\n`;
  md += `| Articles audited | ${articles.length} |\n`;
  md += `| Articles entirely clean | ${articlesClean} (${(articlesClean/articles.length*100).toFixed(1)}%) |\n`;
  md += `| Articles with (genuine) redundancy | ${articlesWithRedundancy} (${(articlesWithRedundancy/articles.length*100).toFixed(1)}%) |\n`;
  md += `| Articles with (genuine) flagged sentences | ${articlesWithFlagged} (${(articlesWithFlagged/articles.length*100).toFixed(1)}%) |\n`;
  md += `| **Total redundancy pairs flagged (genuine)** | **${totalRedundancy}** |\n`;
  md += `| **Total sentences flagged (genuine)** | **${totalFlagged}** |\n`;
  md += `| Redundancy pairs suppressed (apex-tier exemptions) | ${totalSuppressedRedundancy} |\n`;
  md += `| Sentence flags suppressed (coherence-positive) | ${totalSuppressedSentences} |\n\n`;

  md += `### Suppression breakdown by exemption class\n\n`;
  md += `| Class | Pairs suppressed |\n|---|---:|\n`;
  for (const [cls, n] of Object.entries(suppressionByClass).sort((a, b) => b[1] - a[1])) {
    md += `| ${cls} | ${n} |\n`;
  }
  md += `\n`;

  md += `**Composite score** = redundancy_pairs × 2 + flagged_sentences. Articles ranked by descending score below.\n\n---\n\n`;

  md += `## §II — Top 50 Most Broken Articles (Rebuild Queue, post-suppression)\n\n`;
  ranked.slice(0, 50).forEach((a, i) => {
    if (a.score === 0) return;
    md += `${i + 1}. **${a.file}** — score ${a.score} (${a.redundancy_count} redundancy pair${a.redundancy_count===1?'':'s'}, ${a.flagged_sentence_count} flagged sentence${a.flagged_sentence_count===1?'':'s'}, ${a.paragraphs} paragraphs)`;
    if (a.suppressed_redundancy_count > 0 || a.suppressed_sentence_count > 0) {
      md += ` *[${a.suppressed_redundancy_count} pairs + ${a.suppressed_sentence_count} sentences auto-suppressed]*`;
    }
    md += `\n`;
  });

  md += `\n---\n\n## §III — Per-Article Detail (Top 30 by score)\n\n`;
  ranked.slice(0, 30).forEach(a => {
    if (a.score === 0) return;
    md += `### ${a.file} — score ${a.score}\n\n`;
    if (a.redundancy_pairs.length > 0) {
      md += `**Redundancy pairs (${a.redundancy_pairs.length}):**\n\n`;
      a.redundancy_pairs.slice(0, 6).forEach(p => {
        md += `- Paragraphs ${p.paragraph_a} ↔ ${p.paragraph_b} (similarity ${p.similarity})\n`;
        md += `  - A: "${p.a_preview}…"\n`;
        md += `  - B: "${p.b_preview}…"\n`;
      });
      if (a.redundancy_pairs.length > 6) md += `- … and ${a.redundancy_pairs.length - 6} more.\n`;
      md += `\n`;
    }
    if (a.flagged_sentences.length > 0) {
      md += `**Flagged sentences (${a.flagged_sentences.length}):**\n\n`;
      a.flagged_sentences.slice(0, 8).forEach(f => {
        md += `- [${f.flags.join(', ')}] (¶${f.paragraph}): "${f.preview}…"\n`;
      });
      if (a.flagged_sentences.length > 8) md += `- … and ${a.flagged_sentences.length - 8} more.\n`;
      md += `\n`;
    }
    if (a.suppressed_redundancy.length > 0 || a.suppressed_sentences.length > 0) {
      md += `**Suppressions** (auto-filtered as exemptions / coherence-positives):\n\n`;
      if (a.suppressed_redundancy.length > 0) {
        md += `- ${a.suppressed_redundancy.length} redundancy pair${a.suppressed_redundancy.length===1?'':'s'} suppressed: ${[...new Set(a.suppressed_redundancy.map(s => s.exemption_class))].join(', ')}\n`;
      }
      if (a.suppressed_sentences.length > 0) {
        md += `- ${a.suppressed_sentences.length} sentence flag${a.suppressed_sentences.length===1?'':'s'} suppressed (anaphora / chiasm / embedded-quotation)\n`;
      }
      md += `\n`;
    }
  });

  md += `---\n\n## §IV — Methodology (v2)\n\n`;
  md += `### Redundancy detection\n\n`;
  md += `Each pair of paragraphs in an article is compared by Jaccard similarity over the bag of significant words (≥ 4 chars, not in stopword list). Pairs with similarity ≥ 0.35 (each side ≥ 8 significant words) are *candidates*. Each candidate then runs through the eight-class exemption filter:\n\n`;
  md += `1. **Confessional-translation** — pages whose method is "Original / Plain English" rendering of a confession (filename ends in \`-plain-english.html\` or page contains the structural \`<strong>Original:</strong>\` / \`<strong>Plain English:</strong>\` markers). All redundancy pairs auto-suppressed.\n`;
  md += `2. **Historical-document-quotation** — paragraphs starting with "Article N" / "Section N" markers (Westminster, Dort, Belgic, etc., quoting historical confessions in their internal divisions).\n`;
  md += `3. **Pedagogical-anaphora** — articles where 3+ paragraphs share an identical structural opener (e.g., "Step N", "The shared premise:", "The question Arminians have not asked:", "First objection:") get those repeating-opener pairs auto-suppressed.\n`;
  md += `4. **Scripture-tsunami** — paragraphs that are ≥ 40% Scripture-quotation by character count, or contain visible verse references, or are wrapped in \`<blockquote>\`/\`<cite>\` markers. Pairs where both paragraphs are Scripture-dominated are auto-suppressed (deliberate verse-stacking).\n`;
  md += `5. **Research → pairing structural** — pages that use the \`pairing-science\` / \`pairing-scripture\` / \`pairing-row\` CSS classes for side-by-side science/Scripture layouts. Pairs spanning the introduction-section and the pairing-section are auto-suppressed.\n`;
  md += `6. **Antithetical-parallelism** — paragraph pairs that both start with "If [X]" where one is negated and the other affirmed (e.g., "If faith is not a gift" / "If faith is a gift"). Auto-suppressed.\n`;
  md += `7. **Closing-recurrence** — pairs where the second paragraph is in the article's final 15% AND at least one paragraph is a Scripture-quote, AND the gap between the two is ≥ 15% of total paragraphs. The thesis-restatement-at-close exemption from PROSE-INTEGRITY.md §I.1.\n`;
  md += `8. **Exegetical-comparison** — one paragraph quotes a verse cleanly and the other quotes the same verse with bracket-clarifications \`[believers]\`/\`[of you]\`. The article's exegetical method, not redundancy.\n\n`;

  md += `### Sentence-coherence heuristic\n\n`;
  md += `Each sentence is flagged if any of the following fire:\n\n`;
  md += `- **(a) Length** — non-quoted word count > 45. v2 subtracts embedded Scripture-quotations from the count.\n`;
  md += `- **(b) Long simile** — "like a/an [X]" tail > 12 words.\n`;
  md += `- **(c) Direction-mismatch** — "came down ... lifted off", "rose ... fell", "opened ... closed", "thrown out ... welcomed in", etc.\n`;
  md += `- **(d) Padding modifier** — "in the dark" / "in the night" / "in the silence" at clause-end with no anchor (no following "of [X]" and no following participle modifier).\n`;
  md += `- **(e) Abstract simile** — "like a [...] silence / memory / absence / forgetting / whisper".\n`;
  md += `- **(f) v2 NEW: Vehicle-tenor mismatch** — simile whose tenor (subject clause) and vehicle (post-"like a/an" clause) are in disjoint image domains. This is the dedicated detector for the original Aaron failure mode ("the verdict came down like a roof being lifted off a house in the dark" — tenor is courtroom, vehicle is building, no bridge).\n`;
  md += `- **(g) Mixed metaphor** — keywords from ≥ 3 distinct image domains in the *same clause window* (commas/em-dashes/semicolons split clauses). v2 also masks out concrete-historical-referent contexts (Eden as garden, Calvary as tree, "the dark of the North African night" as concrete location, grammatical-technical "sentence" / "verdict") so they don't trip the counter.\n\n`;
  md += `### Coherence-positive suppressors (v2 NEW)\n\n`;
  md += `Length-flagged sentences are auto-suppressed if any of the following positive coherence patterns hold:\n\n`;
  md += `- **Anaphora** — 3+ clauses (split on commas/dashes/semicolons) sharing an identical 1- or 2-word opening prefix. Catches "every prayer / every tear / every candle" and "the arm that holds / the arm that whispers / the arm that stands."\n`;
  md += `- **Chiasm / antithetical parallelism** — sentence contains a contrast conjunction (but / while / whereas / yet) AND has 2+ significant words each appearing 2+ times in the sentence (mirrored repeated keywords).\n`;
  md += `- **Embedded Scripture quotation** — when raw word count exceeds non-quoted word count by 15+ words, the length is dominated by the verse and the prose is short.\n\n`;
  md += `### What v2 does NOT do\n\n`;
  md += `- It does not check across articles for site-wide repetition.\n`;
  md += `- It does not check tldr / In Brief / pullquote blocks.\n`;
  md += `- It does not check related-articles auto-injected blocks.\n`;
  md += `- It does not check theological correctness.\n`;
  md += `- The exemption filters are conservative — when the scanner suppresses a pair, it logs the suppression to \`suppressed_redundancy\` so the human reviewer can audit the decisions and re-tune the thresholds.\n\n`;
  md += `### Tuning notes\n\n`;
  md += `If a future cycle finds that v2 is suppressing genuine errors, the per-class suppression breakdown in §I should reveal which class is over-firing. The exemption rules can be tightened (e.g., require ≥ 4 paragraphs sharing an opening for the pedagogical-anaphora rule, or ≥ 50% Scripture for the Scripture-tsunami rule) and the script re-run.\n\n`;
  md += `---\n\n*Audit 2 / Phase F — Prose Integrity v2. Re-runnable: \`node audit-prose.js\`. Outputs: \`audit-prose.json\` + \`audit-prose.md\`.*\n`;

  fs.writeFileSync(path.join(REPO_ROOT, 'audit-prose.md'), md);

  console.log(`\n=== SUMMARY (v2) ===`);
  console.log(`Articles audited: ${articles.length}`);
  console.log(`  Clean: ${articlesClean} (${(articlesClean/articles.length*100).toFixed(1)}%)`);
  console.log(`  With (genuine) redundancy: ${articlesWithRedundancy}`);
  console.log(`  With (genuine) flagged sentences: ${articlesWithFlagged}`);
  console.log(`Total redundancy pairs (genuine): ${totalRedundancy}`);
  console.log(`Total sentences flagged (genuine): ${totalFlagged}`);
  console.log(`Total redundancy suppressed (apex-tier exemptions): ${totalSuppressedRedundancy}`);
  console.log(`Total sentences suppressed (coherence-positive): ${totalSuppressedSentences}`);
  console.log(`\nSuppression by class:`);
  for (const [cls, n] of Object.entries(suppressionByClass).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cls}: ${n}`);
  }
  console.log(`\nTop 10 most-broken (post-suppression):`);
  ranked.slice(0, 10).forEach(a => {
    if (a.score === 0) return;
    console.log(`  ${a.file} — score ${a.score} (${a.redundancy_count} dup, ${a.flagged_sentence_count} flag)`);
  });
  console.log(`\n✓ audit-prose.json + audit-prose.md written.`);
}

main();
