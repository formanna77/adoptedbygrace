#!/usr/bin/env node
/**
 * rank-for-expansion.js — Phase 3.5 Polish-Pass queue generator.
 *
 * Reads `audit-data.json` (produced by strategic-audit.js) and produces
 * `HAMMER-200.md` — the ranked Polish-Pass queue for Tier 2 of
 * HAMMER-EXPANSION.md. Pages already HAMMER-LOCKED (the 49 shipped
 * Hammer-50 article-body spines) or POLISH-LOCKED are excluded from the
 * queue automatically — we never re-queue a locked page.
 *
 * Ranking model (per HAMMER-EXPANSION.md §"First-encounter likelihood
 * ranking for Tier 2"):
 *
 *   composite = firstEncounterWeight(prefix) + log2(inboundCount + 1) * 5
 *
 * where firstEncounterWeight captures how likely a random arriving reader
 * lands on this prefix-family first (question > demolition > devotional >
 * objection > apologetic > systematic > story/analogy > theologian/history
 * > healing-series > misc), and the log-scaled inbound bonus is the
 * tiebreaker that prefers well-trafficked pages within a cluster.
 *
 * Output: `HAMMER-200.md` at repo root — ranked queue, plain text, same
 * shape as HAMMER-50.md. Target list length is the top ~200 pages.
 *
 * Usage: node rank-for-expansion.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const AUDIT_JSON = path.join(ROOT, 'audit-data.json');
const OUTPUT_MD = path.join(ROOT, 'HAMMER-200.md');
const QUEUE_CAP = 200;

// ─── First-encounter weights ───────────────────────────────────────
// The higher the weight, the more likely a page in this cluster is
// the reader's first door into the site. Values are deliberately
// coarse — the log-scaled inbound bonus handles intra-cluster ordering.
const PREFIX_WEIGHT = {
    // HIGHEST — explicit query match ("does God predestine…")
    'question-':          100,
    // HIGH — apologetics/objection seekers
    'demolition-':         92,
    'objection-':          86,
    'apologetic-':         82,
    'argument-':           80,
    'counter-':            78,
    'compare-':            76,
    // MEDIUM-HIGH — comfort and assurance queries
    'devotional-':         74,
    // MEDIUM — study seekers
    'systematic-':         64,
    // MEDIUM — psychology/philosophy arguments carry strong SEO
    'psychology-':         62,
    'philosophy-':         60,
    // VARIABLE — stories, analogies (some viral potential)
    'story-':              56,
    'analogy-':            54,
    // MEDIUM-LOW — name-specific searches (lower volume)
    'theologian-':         48,
    'history-':            46,
    'testimony-':          44,
    // OT-specific
    'ot-':                 58,
    // Healing series — first-impression-critical for wounded readers
    'open-wound-':         70,
    'invisible-wall-':     68,
    'shattered-lens-':     68,
    'anxious-mind-':       70,
    'broken-mirror-':      68,
    // Pastoral, response, joy
    'pastoral-':           60,
    'response-':           56,
    'joy-':                52,
    // Secular-evidence
    'secular-':            50,
    // Printables (high-value shareables — first encounter via referrer)
    'printable-':          38,
    // Dialogues, letters, hymns — narrower audiences
    'dialogue-':           40,
    'letters-':            38,
    'hymn-':               30,
    // Scripture-specific landings
    'scripture-':          52,
    'verse-':              48,
    'word-':               36,
    'romans-':             64,
    'creed-':              30,
    'resistance-':         50,
    'fork-':               44,
    'the-':                36,
    'two-':                44,
    'all-':                 0, // all-content: infra
    'for-':                40,
    'golden-':             30,
    'westminster-':        34,
    'best-':                0, // best-reads: hub
    'canons-':             30,
    'start-':              30,
    'found-':              46,
    'just-':               30,
    'explore-':             0, // explore-map: hub
};

// Defaults for prefixes not in the table
const DEFAULT_WEIGHT = 32;

// ─── Exclusions ────────────────────────────────────────────────────
// Hubs, utilities, and infrastructure pages — not content for polish.
const HUB_FILES = new Set([
    'questions.html', 'demolition-hub.html', 'psychology-hub.html',
    'philosophy-hub.html', 'stories.html', 'devotionals.html',
    'analogies-illustrations.html', 'secular-evidence.html',
    'systematic-theology.html', 'theologians.html', 'history-timeline.html',
    'ot-hub.html', 'essays.html', 'invisible-wall-hub.html',
    'open-wound-hub.html', 'shattered-lens-hub.html', 'broken-mirror-hub.html',
    'anxious-mind-hub.html', 'pastoral-hub.html', 'comparisons-hub.html',
    'sermons.html', 'for-doubters.html', 'printables.html',
    'testimony-hub.html', 'quotes.html', 'all-content.html',
    'topics.html', 'connections.html', 'explore-map.html', 'best-reads.html',
    'start-here.html', 'start-here-assessment.html', 'testimony-wall.html',
    'scripture-tsunami.html', 'belief-assessment.html', 'verse-explorer.html',
    'question-faith-origin-test.html', 'for-skeptics.html', 'for-pastors.html',
    'for-students.html', 'for-the-suffering.html', 'for-the-searching.html',
    'for-the-curious.html', 'for-the-wounded.html',
]);

const UTILITY_FILES = new Set([
    'index.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html',
    'donate.html', '404.html', 'search.html', 'sitemap.html',
    '_nav-template.html',
]);

// ─── Marker detection ──────────────────────────────────────────────
// We physically open each candidate page and inspect the first ~1200
// bytes for a HAMMER-LOCKED or POLISH-LOCKED comment. Either marker
// means the page is already at spec; excluding them keeps the queue
// pointed at the work that remains.

function isLocked(file) {
    // The marker lives as the first line inside <article class="article-body">,
    // which sits well past the <head> and nav — typically line 200+ of the
    // file. We read the whole file; 200 * ~30KB is cheap and unambiguous.
    const p = path.join(ROOT, file);
    let html;
    try {
        html = fs.readFileSync(p, 'utf8');
    } catch (e) {
        return false;
    }
    return html.includes('<!-- HAMMER-LOCKED -->') ||
           html.includes('<!-- POLISH-LOCKED -->');
}

function prefixOf(file) {
    // Honor multi-word prefixes first
    const multi = [
        'anxious-mind-', 'broken-mirror-', 'open-wound-',
        'invisible-wall-', 'shattered-lens-', 'start-here-',
    ];
    for (const p of multi) if (file.startsWith(p)) return p;
    const m = file.match(/^([a-z]+)-/);
    return m ? m[1] + '-' : 'misc';
}

function firstEncounterWeight(prefix) {
    return Object.prototype.hasOwnProperty.call(PREFIX_WEIGHT, prefix)
        ? PREFIX_WEIGHT[prefix]
        : DEFAULT_WEIGHT;
}

function compositeScore(page) {
    const w = firstEncounterWeight(page.prefix);
    const inbound = page.inboundCount || 0;
    return w + Math.log2(inbound + 1) * 5;
}

// ─── Main ──────────────────────────────────────────────────────────

if (!fs.existsSync(AUDIT_JSON)) {
    console.error(`✖ ${AUDIT_JSON} not found — run strategic-audit.js first`);
    process.exit(1);
}

const audit = JSON.parse(fs.readFileSync(AUDIT_JSON, 'utf8'));
const pages = audit.pages || {};

const candidates = [];
let skippedLocked = 0;
let skippedHub = 0;
let skippedUtility = 0;
let skippedInfra = 0;
let skippedTier = 0;
let skippedThin = 0;

for (const [file, page] of Object.entries(pages)) {
    if (HUB_FILES.has(file) || page.isHub) { skippedHub++; continue; }
    if (UTILITY_FILES.has(file) || page.isUtility) { skippedUtility++; continue; }
    if (page.tier === 'INFRA') { skippedInfra++; continue; }
    // Leave RETIRE pages for Tier 3 pruning; they're a separate question
    if (page.tier === 'RETIRE') { skippedTier++; continue; }
    // THIN pages (<350 words) go to elevation review, not Polish Pass
    if (page.tier === 'THIN') { skippedThin++; continue; }
    // Already forged — no re-queue
    if (isLocked(file)) { skippedLocked++; continue; }

    const prefix = prefixOf(file);
    const record = {
        file,
        prefix,
        inboundCount: page.inboundCount || 0,
        wordCount: page.wordCount || 0,
        tier: page.tier,
        title: page.title || '',
    };
    record.weight = firstEncounterWeight(prefix);
    record.score = compositeScore(record);
    candidates.push(record);
}

candidates.sort((a, b) => b.score - a.score);
const queue = candidates.slice(0, QUEUE_CAP);

// ─── Emit HAMMER-200.md ────────────────────────────────────────────

const now = new Date().toISOString().slice(0, 10);

const lines = [];
lines.push('# HAMMER-200 — The Polish-Pass Queue');
lines.push('');
lines.push(`> Generated ${now} by \`rank-for-expansion.js\`. Rebuild anytime.`);
lines.push('> Target list length: top 200 pages ranked by first-encounter likelihood.');
lines.push('> Already HAMMER-LOCKED or POLISH-LOCKED pages are excluded automatically.');
lines.push('> Treatment: the 9-item Polish-Pass checklist from `HAMMER-EXPANSION.md` §"Tier 2".');
lines.push('> Gating doctrine: `HAMMER-EXPANSION.md` (Tier 2 spec) + `VOICE.md` §II (Twelve Lethal Moves), §IX (link ceiling / no `.html`), §XI (Pre-Ship — 17-item list for reference; 9-item used for Polish Pass).');
lines.push('');
lines.push('## How to use this queue');
lines.push('');
lines.push('Walk top-down. Each page gets ~8–10 minutes, ~4K tokens. Floor per fresh-context run is 8 polished pages. Ceiling is context exhaustion (not a number). After each polish, stamp `<!-- POLISH-LOCKED -->` inside the body wrapper as the first line; auto-linker will then skip the page.');
lines.push('');
lines.push('Promotion rule: if a page fails 5+ items of the §XI checklist catastrophically, tag `PROMOTE TO TIER 1` in the session log and move on — do not attempt a full rebuild inside a Polish-Pass batch.');
lines.push('');
lines.push('## Queue');
lines.push('');
lines.push('| # | Score | Inbound | Words | Prefix | File | Title |');
lines.push('|--:|--:|--:|--:|---|---|---|');

queue.forEach((p, i) => {
    const title = (p.title || '').replace(/\|/g, '\\|').slice(0, 70);
    lines.push(`| ${i + 1} | ${p.score.toFixed(1)} | ${p.inboundCount} | ${p.wordCount} | ${p.prefix} | \`${p.file}\` | ${title} |`);
});

lines.push('');
lines.push('## Cluster breakdown');
lines.push('');
const byPrefix = {};
queue.forEach(p => {
    byPrefix[p.prefix] = (byPrefix[p.prefix] || 0) + 1;
});
const prefixRows = Object.entries(byPrefix)
    .sort((a, b) => b[1] - a[1]);
lines.push('| Prefix | Count in top-200 |');
lines.push('|---|--:|');
prefixRows.forEach(([prefix, count]) => {
    lines.push(`| ${prefix} | ${count} |`);
});

lines.push('');
lines.push('## Exclusion summary');
lines.push('');
lines.push(`- Total pages scanned: ${Object.keys(pages).length}`);
lines.push(`- Already locked (HAMMER or POLISH): ${skippedLocked}`);
lines.push(`- Hubs skipped: ${skippedHub}`);
lines.push(`- Utility/infra skipped: ${skippedUtility + skippedInfra}`);
lines.push(`- RETIRE / THIN deferred to Tier 3: ${skippedTier + skippedThin}`);
lines.push(`- Eligible candidates: ${candidates.length}`);
lines.push(`- Queued (cap ${QUEUE_CAP}): ${queue.length}`);
lines.push('');
lines.push('---');
lines.push('');
lines.push('*Re-run `node rank-for-expansion.js` to rebuild this file after polishing a batch; locked pages fall off, the next-highest pages rise.*');
lines.push('');

fs.writeFileSync(OUTPUT_MD, lines.join('\n'), 'utf8');

console.log(`\n🔨 rank-for-expansion — Polish-Pass queue generated`);
console.log(`   Pages scanned:     ${Object.keys(pages).length}`);
console.log(`   Already locked:    ${skippedLocked}`);
console.log(`   Hubs skipped:      ${skippedHub}`);
console.log(`   Utility/infra:     ${skippedUtility + skippedInfra}`);
console.log(`   RETIRE/THIN:       ${skippedTier + skippedThin}`);
console.log(`   Eligible:          ${candidates.length}`);
console.log(`   Queued:            ${queue.length}`);
console.log(`   Output:            ${path.relative(ROOT, OUTPUT_MD)}`);
console.log('');
