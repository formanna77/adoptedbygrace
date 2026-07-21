#!/usr/bin/env node
/*
 * detect-feeling-slip.js — the ASSURANCE-GROUND detector.
 *
 * Built S182, after a sweep found the feeling-slip running on ~25 pages in a
 * form that EVERY prior phrase-grep had missed for eleven sessions.
 *
 * THE DEFECT (CLAUDE.md guardrail; the four-form doctrine in the kickoffs):
 * grounding a reader's assurance in his own interior weather — a feeling, a
 * stirring, a warmth, or the bare fact that he is STILL READING — instead of
 * in God's prior and finished work. It is the site's most dangerous defect
 * because a page arguing that faith is a gift, which then hands the reader a
 * self-administered test for whether he has it, has refuted itself in its own
 * margin. And the reader it hurts most is the one it was written for: the man
 * whose interior returns nothing on the day he most needs an answer.
 *
 * ── THE LOAD-BEARING DESIGN DECISION ────────────────────────────────────────
 * The slip is GRAMMATICALLY IDENTICAL to a SANCTIONED move, and that is
 * exactly why greps never separated them. Both say "your interior state is
 * evidence." They differ only in DIRECTION:
 *
 *   interior state -> evidence of ELECTION / the Spirit / salvation   = SLIP
 *   interior state -> evidence of DEPRAVITY / inability / resistance  = MOVE 4
 *                                          (VOICE §II Move 4, §XX.2 — sound)
 *
 * "Something in you is rising to defend the story you tell about yourself" is
 * the Corpse Inversion and is apex work. "Something in you is leaning toward
 * Him — that leaning is the drawing" is the slip. Same shape. Opposite
 * theology. So this script classifies by the OBJECT of the evidence claim,
 * never by the trigger phrase alone.
 *
 * A third class must also be spared: the EXPLICIT REPUDIATION. Several pages
 * carry the correct doctrine in the slip's own vocabulary — "do not go hunting
 * for your name in the fact that you are still reading" (invisible-wall-
 * prayer-feels-empty), "do not audit ... for signs that you are one of the
 * chosen" (testimony-spurgeon). Those are models to copy, not defects. They
 * are detected and reported separately as MODEL.
 *
 * ── WHERE IT HIDES ──────────────────────────────────────────────────────────
 * Scans the WHOLE file, not just <article> prose. In S182 the two worst
 * instances on the site were inside FAQPage JSON-LD — the answer text Google
 * lifts into a rich snippet — on the two pages a frightened reader is likeliest
 * to land on ("How can I know if I am one of the elect?" / "Is the fear of not
 * being chosen itself a sign of grace?"). In Brief blocks, pullquotes and meta
 * descriptions are the other recurring carriers. Chase the spine, then re-sync
 * every carrier.
 *
 * TRIAGE, NOT VERDICT — like every detector here. Hand-check every hit.
 *
 * Usage:
 *   node detect-feeling-slip.js              # worst-first, all pages
 *   node detect-feeling-slip.js --all        # include MODEL + SANCTIONED
 *   node detect-feeling-slip.js <page>.html  # one page
 */

const fs = require('fs');

const args = process.argv.slice(2);
const showAll = args.includes('--all');
const only = args.find(a => a.endsWith('.html'));

// The reader's interior state, or the bare act of reading, offered as a premise.
const TRIGGER = /(the (?:very )?fact that you(?:'re| are)?[^.!?<]{0,80}|if you(?:'re| are)[^.!?<]{0,60}(?:still )?(?:reading|here)[^.!?<]{0,60}|something (?:in|inside) you[^.!?<]{0,80}|that (?:stirring|pull|ache|thirst|lean|leaning|trembling|recognition|breaking|drawing|fear|terror|response|reaching|wanting)\b[^.!?<]{0,60}|your (?:terror|fear|ache|longing|hunger|concern|trouble)\b[^.!?<]{0,60})/gi;

// The claim attached to it. Direction decides the verdict.
const ELECT = /\b(evidence|proof|the answer|the call|the drawing|a sign|the first sign|the receipt|confirm(?:s|ing|ation)?|marks? you|means you are|you are (?:one of|already|being) (?:the |his |God's )?(?:elect|chosen|sheep|saved|given|drawn)|the (?:Father|Spirit|Root|Gardener) (?:has|is|had) (?:already )?(?:reached|drawn|begun|at work)|grace has begun|has already begun|already underway|regeneration has|the resurrection has|you belong to him|you are not (?:still )?dead|you are becoming alive|almost certainly chosen|your name is being read)/i;
const DEPRAVE = /\b(depravity|dead in|the diagnosis|the corpse|inability|cannot|unable|resist(?:ance|ing)?|defend(?:ing)?|deflect|rationaliz|the objection|proves the point|autonomy|self-justif|pride|the very argument)/i;
const REPUDIATE = /\b(do not|don't|never|stop|refuse to|no one has ever|nobody has ever|not worth auditing|issues no receipt|a feeling never is|the cheap version|poor (?:gauge|instrument)|reads backwards)\b[^.!?<]{0,110}\b(audit|hunt|grade|measure|scour|search|look(?:ing)? (?:for|inward)|take (?:a |the )?(?:reading|temperature)|certif|verif|authenticat|inventory|survey|test(?:ing)?|sign|proof|evidence)/i
  // ALSO a repudiation: the claim stated in order to be denied.
  || null;
const DENIED = /\b(is|are|was) not (?:a |the |itself )?(?:proof|evidence|a sign|a credential|the ground|the answer)\b/i;

function sentencesOf(raw) {
  // Keep JSON-LD and meta: the worst S182 hits lived there.
  const text = raw
    .replace(/<(script)(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/\s+/g, ' ');
  return text.split(/(?<=[.!?])\s+/);
}

function scan(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const inJsonLd = new Set();
  const ld = (raw.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || []).join(' ');
  const hits = [];
  for (const s of sentencesOf(raw)) {
    if (s.length < 25 || s.length > 480) continue;
    TRIGGER.lastIndex = 0;
    if (!TRIGGER.test(s)) continue;
    // ORDER IS LOAD-BEARING. A sentence that DENIES the evidence-claim, or
    // whose evidence-object is depravity rather than election, is not a slip
    // however closely it rhymes with one.
    const verdict = (REPUDIATE && REPUDIATE.test(s)) || DENIED.test(s) ? 'MODEL'
      : DEPRAVE.test(s) ? 'SANCTIONED'
      : ELECT.test(s) ? 'SLIP'
      : null;
    if (!verdict) continue;
    const carrier = ld.includes(s.slice(0, 40)) ? ' [JSON-LD]' : '';
    hits.push({ verdict, carrier, s: s.trim() });
  }
  return hits;
}

const files = only ? [only]
  : fs.readdirSync('.').filter(f => f.endsWith('.html')).sort();

const rows = [];
for (const f of files) {
  const hits = scan(f);
  const slips = hits.filter(h => h.verdict === 'SLIP');
  if (slips.length || (showAll && hits.length)) rows.push({ f, hits, n: slips.length });
}
rows.sort((a, b) => b.n - a.n);

console.log('\n  detect-feeling-slip.js — assurance grounded in the reader, not in God\n');
console.log('  SLIP        = interior state offered as evidence of election. FIX.');
console.log('  SANCTIONED  = interior state as evidence of DEPRAVITY (Move 4). Keep.');
console.log('  MODEL       = the slip explicitly repudiated. Copy these.\n');

let totalSlip = 0;
for (const r of rows) {
  console.log('  ── ' + r.f.replace(/\.html$/, ''));
  for (const h of r.hits) {
    if (!showAll && h.verdict !== 'SLIP') continue;
    if (h.verdict === 'SLIP') totalSlip++;
    console.log(`     ${h.verdict.padEnd(10)}${h.carrier} ${h.s.slice(0, 210)}`);
  }
}
console.log(`\n  ${rows.length} page(s) flagged · ${totalSlip} SLIP candidate(s)\n`);
console.log('  TRIAGE, NOT VERDICT. Hand-check every hit. The fix is never a');
console.log('  deletion alone: re-ground the passage in God\'s prior and finished');
console.log('  work, keep the page\'s own image, and re-sync every carrier');
console.log('  (In Brief, pullquote, meta, JSON-LD) to the corrected spine.\n');
