#!/usr/bin/env node
/**
 * archive/make-laneA-brief.js — S210.
 *
 * Lane A is 371 pages and has not been delegated in four sessions, because the
 * work ("spot cold-read opener + close, then stamp") reads as if it needs the
 * whole file. It does not. It needs exactly two windows, and the same law that
 * built make-factory-brief.js applies: DO NOT TELL AN AGENT TO READ LESS, HAND
 * IT LESS. This extracts the opener (first ~180 words of prose) and the close
 * (last ~220 words of prose) for N pages, via archive/prose-body.js so neither
 * window can land on a card rail.
 *
 * The agent returns a verdict per page. The LEAD runs the coverage stamp — an
 * agent that can write to the ledger can corrupt provenance for 371 pages.
 */
const fs = require('fs');
const path = require('path');
const { extractBody } = require('./prose-body.js');
const ROOT = path.join(__dirname, '..');
const N = Number(process.argv[2] || 12);
const SEED = Number(process.argv[3] || 0);

const { matrix } = JSON.parse(fs.readFileSync(path.join(__dirname, 'defect-matrix.json'), 'utf8'));
const laneA = Object.entries(matrix).filter(([, v]) => v.lane === 'A');
// prefer the UNTAGGED locks — 127 of them, the ones no session has confirmed.
const untagged = laneA.filter(([, v]) => v.untagged).map(([s]) => s).sort();
const pick = untagged.slice(SEED, SEED + N);

const L = ['# LANE A CONFIRM BRIEF — S210', '',
  'These pages are detector-clean. Your job is the LIVE COLD READ the detectors',
  'cannot do: does the opener and does the close carry the undeniable force of',
  'truth? You are given both windows verbatim. Do not open the source files.', ''];

for (const p of pick) {
  const f = path.join(ROOT, p + '.html');
  if (!fs.existsSync(f)) continue;
  const body = extractBody(fs.readFileSync(f, 'utf8'));
  if (!body) continue;
  const text = body.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
  const w = text.split(' ');
  L.push(`## ${p}   (${w.length}w)`, '',
    '**OPENER**', '', '> ' + w.slice(0, 180).join(' '), '',
    '**CLOSE**', '', '> ' + w.slice(-220).join(' '), '', '---', '');
}
const out = path.join(__dirname, 'factory-briefs', `laneA-confirm-${SEED}.md`);
fs.writeFileSync(out, L.join('\n'));
console.log(`wrote ${path.relative(ROOT, out)} (${pick.length} pages, ${(fs.statSync(out).size/1024).toFixed(0)} KB)`);
