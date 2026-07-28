#!/usr/bin/env node
/*
 * coverage.js — prose-corpus review-freshness tracker for adoptedbygrace.net
 *
 * Answers "exactly where are we" against the NEWEST prose standard (VOICE.md).
 * It tracks, per prose page, the session it was last DELIBERATELY lifted and the
 * VOICE era that lift was held to — NOT a live pass/fail. A page last lifted at
 * S58 may still read beautifully; the point is it has not been re-read against
 * the current bar (right now §XXII: the no-AI-tells / uniformity standard, which
 * did not exist before 2026-07-19). "Behind" therefore means "review is stale vs.
 * the current standard," not "known-failing."
 *
 * Data lives in archive/coverage.json (unserved: archive/* is 410'd by _redirects,
 * so internal review state never reaches the public). This file lives in archive/
 * for the same reason. Run it FROM THE REPO ROOT:
 *
 *   node archive/coverage.js seed            # (re)build ledger from HTML markers; never overwrites a stamp
 *   node archive/coverage.js stamp <page.html> <session> [lifted|partial] [note...]
 *   node archive/coverage.js report          # print dashboard + write archive/coverage-report.txt
 *
 * The historical seed is APPROXIMATE (markers are inconsistent). Entries with
 * source:"stamp" are exact. Every future lift should stamp the page; the "behind
 * + unknown" number then falls by exactly the pages lifted, each session.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const LEDGER = path.join(ROOT, 'archive', 'coverage.json');
const REPORT = path.join(ROOT, 'archive', 'coverage-report.txt');

// The current standard and the session its era begins. VOICE.md §XXII was appended
// 2026-07-19; S183 (2026-07-20) is the first session held to it. Update BOTH lines
// when Aaron appends a newer dated section to VOICE.md.
const CURRENT = { section: '§XXII', date: '2026-07-19', sinceSession: 183 };

// Rough session->era map, for the histogram only (older boundaries are approximate;
// only the §XXII threshold is load-bearing).
const ERAS = [
  { name: '§XXII (2026-07-19)',      min: 183, max: Infinity },
  { name: '§XVIII-XXI (2026-06-21)', min: 150, max: 182 },
  { name: '§XVII/XVI (2026-05)',     min: 100, max: 149 },
  { name: 'pre-§XVI (<=S99)',        min: 1,   max: 99 },
];

function proseFiles() {
  return fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html'))
    .filter(f => {
      try { return fs.readFileSync(path.join(ROOT, f), 'utf8').includes('<article class="article-body">'); }
      catch (_) { return false; }
    })
    .sort();
}

const MARKER_RE = /<!--[^>]*?(?:CONSECRATED|HAMMER-LOCKED|POLISH-LOCKED|DIAMOND|BORN-APEX)[\s\S]*?-->/gi;

function scanMarker(html) {
  const comments = html.match(MARKER_RE) || [];
  if (!comments.length) return { lastSession: null, voiceRef: null, hasMarker: false };
  const blob = comments.join(' ');
  let lastSession = null;
  const sess = blob.match(/S(\d{1,3})\b/g);
  if (sess) lastSession = Math.max(...sess.map(s => parseInt(s.slice(1), 10)));
  let voiceRef = null;
  const vr = blob.match(/§[XVILC]+/g);
  if (vr) voiceRef = vr[vr.length - 1];
  return { lastSession, voiceRef, hasMarker: true };
}

function loadLedger() {
  if (fs.existsSync(LEDGER)) {
    try { return JSON.parse(fs.readFileSync(LEDGER, 'utf8')); } catch (_) {}
  }
  return { meta: {}, pages: {} };
}
function saveLedger(l) {
  l.meta = Object.assign({}, l.meta, {
    currentVoice: CURRENT,
    updated: new Date().toISOString().slice(0, 10),
    note: 'Historical seed from HTML markers is approximate (review-freshness, not pass/fail). source:"stamp" entries are exact.',
  });
  fs.writeFileSync(LEDGER, JSON.stringify(l, null, 2) + '\n');
}

function cmdSeed() {
  const l = loadLedger();
  const files = proseFiles();
  let added = 0, refreshed = 0, keptStamps = 0;
  for (const f of files) {
    const existing = l.pages[f];
    if (existing && existing.source === 'stamp') { keptStamps++; continue; } // never clobber a stamp
    const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
    const m = scanMarker(html);
    const entry = {
      lastSession: m.lastSession,
      voiceRef: m.voiceRef,
      status: m.lastSession != null ? 'seeded' : (m.hasMarker ? 'seeded-nosession' : 'unknown'),
      source: 'marker',
    };
    if (!existing) added++; else refreshed++;
    l.pages[f] = entry;
  }
  // drop ledger entries whose file no longer exists
  for (const k of Object.keys(l.pages)) if (!files.includes(k)) delete l.pages[k];
  saveLedger(l);
  console.log(`seed: ${files.length} prose pages | added ${added} | refreshed ${refreshed} | kept ${keptStamps} stamps`);
}

function cmdStamp(argv) {
  const [page, sessionRaw, statusRaw, ...noteParts] = argv;
  if (!page || !sessionRaw) { console.error('usage: coverage.js stamp <page.html> <session> [lifted|partial] [note...]'); process.exit(1); }
  const session = parseInt(String(sessionRaw).replace(/^S/i, ''), 10);
  if (!Number.isFinite(session)) { console.error('session must be a number (e.g. 189 or S189)'); process.exit(1); }
  if (!fs.existsSync(path.join(ROOT, page))) { console.error(`no such file: ${page}`); process.exit(1); }
  const status = (statusRaw && ['lifted', 'partial'].includes(statusRaw)) ? statusRaw : 'lifted';
  const note = noteParts.join(' ') || (statusRaw && !['lifted', 'partial'].includes(statusRaw) ? [statusRaw, ...noteParts].join(' ') : '');
  const l = loadLedger();
  l.pages[page] = { lastSession: session, voiceRef: CURRENT.section, status, source: 'stamp', note: note || undefined };
  saveLedger(l);
  console.log(`stamped ${page} -> S${session} ${status}${note ? ' (' + note + ')' : ''}`);
}

function bar(n, total, width = 28) {
  const filled = total ? Math.round((n / total) * width) : 0;
  return '█'.repeat(filled) + '·'.repeat(width - filled);
}

function cmdReport(argv) {
  const l = loadLedger();
  const files = proseFiles();
  // ensure every file is represented (seed-on-the-fly for any missing)
  for (const f of files) if (!l.pages[f]) {
    const m = scanMarker(fs.readFileSync(path.join(ROOT, f), 'utf8'));
    l.pages[f] = { lastSession: m.lastSession, voiceRef: m.voiceRef, status: m.lastSession != null ? 'seeded' : (m.hasMarker ? 'seeded-nosession' : 'unknown'), source: 'marker' };
  }
  const entries = files.map(f => ({ f, ...l.pages[f] }));
  const total = entries.length;
  const current = entries.filter(e => e.lastSession != null && e.lastSession >= CURRENT.sinceSession);
  const behind = entries.filter(e => e.lastSession != null && e.lastSession < CURRENT.sinceSession);
  const unknown = entries.filter(e => e.lastSession == null);
  const remaining = behind.length + unknown.length;
  const rate = parseInt((argv.find(a => a.startsWith('--rate=')) || '--rate=10').split('=')[1], 10) || 10;
  const eta = Math.ceil(remaining / rate);
  const pct = n => ((n / total) * 100).toFixed(1) + '%';

  // --- session history / delta ---
  const sessionArg = argv.find(a => a.startsWith('--session='));
  const session = sessionArg ? parseInt(sessionArg.split('=')[1], 10) : null;
  l.meta.history = Array.isArray(l.meta.history) ? l.meta.history : [];
  const prior = l.meta.history.filter(h => session == null || h.session < session).slice(-1)[0];
  let recorded = false;
  if (session != null) {
    const row = { session, date: new Date().toISOString().slice(0, 10), total, atCurrent: current.length, behind: behind.length, unknown: unknown.length, remaining };
    const i = l.meta.history.findIndex(h => h.session === session);
    if (i >= 0) l.meta.history[i] = row; else l.meta.history.push(row);
    l.meta.history.sort((a, b) => a.session - b.session);
    recorded = true;
  }
  const dAt = prior ? current.length - prior.atCurrent : null;
  const dRem = prior ? remaining - prior.remaining : null;
  const sign = n => (n >= 0 ? '+' : '') + n;

  const L = [];
  L.push('='.repeat(72));
  L.push('  COVERAGE — adoptedbygrace.net prose corpus — review freshness vs. the newest bar');
  L.push('='.repeat(72));
  L.push(`  Current standard: ${CURRENT.section} (${CURRENT.date}); era begins ~S${CURRENT.sinceSession}`);
  L.push(`  Ledger updated:   ${l.meta.updated || '(unsaved)'}   |   prose pages: ${total}`);
  L.push('');
  L.push(`  At current standard (${CURRENT.section})  ${String(current.length).padStart(4)}  ${pct(current.length).padStart(6)}  ${bar(current.length, total)}`);
  L.push(`  Behind (older bar, dated)         ${String(behind.length).padStart(4)}  ${pct(behind.length).padStart(6)}  ${bar(behind.length, total)}`);
  L.push(`  Unknown (locked, no session tag)  ${String(unknown.length).padStart(4)}  ${pct(unknown.length).padStart(6)}  ${bar(unknown.length, total)}`);
  L.push('');
  L.push(`  REMAINING for the ${CURRENT.section} pass: ${remaining} pages (behind + unknown).`);
  L.push(`  At ${rate} pages/session: ~${eta} sessions to full ${CURRENT.section} coverage.  (tune rate with --rate=N)`);
  L.push('');
  L.push('  ── END-OF-SESSION STANDING ──');
  if (prior) {
    L.push(`  Since S${prior.session} (${prior.date}): at ${CURRENT.section} ${prior.atCurrent} -> ${current.length} (${sign(dAt)});  remaining ${prior.remaining} -> ${remaining} (${sign(dRem)}).`);
  } else {
    L.push('  (first recorded snapshot — session-over-session deltas begin next session.)');
  }
  if (l.meta.history.length) {
    L.push('  Remaining trend: ' + l.meta.history.slice(-8).map(h => `S${h.session}:${h.remaining}`).join('  '));
  }
  L.push('');
  // era histogram
  L.push('  Last-lifted era (approximate for older sessions):');
  for (const era of ERAS) {
    const n = entries.filter(e => e.lastSession != null && e.lastSession >= era.min && e.lastSession <= era.max).length;
    L.push(`    ${era.name.padEnd(26)} ${String(n).padStart(4)}  ${bar(n, total)}`);
  }
  L.push(`    ${'unknown / untagged'.padEnd(26)} ${String(unknown.length).padStart(4)}  ${bar(unknown.length, total)}`);
  L.push('');
  // most recently lifted (exact stamps first)
  const stamps = entries.filter(e => e.source === 'stamp').sort((a, b) => b.lastSession - a.lastSession);
  L.push(`  Exactly-tracked lifts (source: stamp) — ${stamps.length}:`);
  for (const e of stamps.slice(0, 30)) L.push(`    S${e.lastSession}  ${e.status.padEnd(7)}  ${e.f}${e.note ? '  — ' + e.note : ''}`);
  L.push('');
  // oldest known (highest-priority re-read candidates), then a sample of unknowns
  const oldest = behind.slice().sort((a, b) => (a.lastSession || 0) - (b.lastSession || 0)).slice(0, 20);
  L.push('  Longest-un-lifted (oldest tagged session — first candidates for a §XXII re-read):');
  for (const e of oldest) L.push(`    S${String(e.lastSession).padStart(3)}  ${e.f}`);
  L.push('');
  L.push(`  (${unknown.length} pages carry a lock but no session tag; they need a session assigned on next touch.)`);
  L.push('='.repeat(72));

  const out = L.join('\n');
  console.log(out);
  fs.writeFileSync(REPORT, out + '\n');
  if (recorded) saveLedger(l);
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === 'seed') cmdSeed();
else if (cmd === 'stamp') cmdStamp(rest);
else if (cmd === 'report' || !cmd) cmdReport(rest);
else { console.error('commands: seed | stamp <page> <session> [status] [note] | report [--rate=N]'); process.exit(1); }
