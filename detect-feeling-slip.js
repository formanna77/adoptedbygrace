#!/usr/bin/env node
/*
 * detect-feeling-slip.js — the ASSURANCE-GROUND detector.  (v2, S183)
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
 * ── S183: TWO RECALL HOLES AND ONE MIS-FILE, ALL FIXED ──────────────────────
 * v1 shipped with good precision and quietly poor RECALL. The S183 `The Catch`
 * H2 sweep read ~34 catch sections by hand and found SEVEN live slips v1 never
 * flagged — including two inside PRINTABLES, which readers hand to other
 * people. Three defects, now repaired:
 *
 *   1. TRIGGER vocabulary was too narrow. It knew "stirring / ache / leaning"
 *      but not "flicker, flinch, instinct, impulse, softening, warmth, tug."
 *      It also required "the fact that YOU" adjacently, so it missed "the very
 *      fact that the questions made you flinch" (printable-the-mirror). And it
 *      had no "your <gerund>" form, so "Your wanting Him is evidence that He
 *      wants you" (story-thought-the-machine-that-asked-why) walked straight
 *      through. Widened — but deliberately NOT with a bare `the <noun>`
 *      alternate, because ELECT itself contains "the drawing"/"the answer" and
 *      a shared token would make any such sentence self-certify as a SLIP.
 *      Only unambiguous interior nouns get a bare-`the` form.
 *
 *   2. DEPRAVE fired before ELECT, so a sentence that merely MENTIONS the
 *      reader's resistance while claiming election was mis-filed SANCTIONED:
 *      "if the resistance has loosened even a little — He is already prying"
 *      (story-hard-hitting-the-drowning-man) is a slip wearing Move 4's
 *      vocabulary. STRONG_ELECT now sits between REPUDIATE and DEPRAVE: an
 *      unambiguous election-object claim outranks an incidental depravity
 *      token. REPUDIATE/DENIED still runs FIRST and that order is still
 *      load-bearing — do not reorder those.
 *
 *   3. Form 4 (CONDITIONAL COMFORT — "if you can mean those words, the comfort
 *      becomes yours") was in the doctrine but never in the code. Now reported
 *      as its own class. It is the LOWEST-signal class here: most `if you can`
 *      constructions are ordinary argumentative conditionals and fine. It is
 *      printed separately and does NOT inflate the SLIP count.
 *
 * ── WHERE IT HIDES ──────────────────────────────────────────────────────────
 * Scans the WHOLE file, not just <article> prose. In S182 the two worst
 * instances on the site were inside FAQPage JSON-LD — the answer text Google
 * lifts into a rich snippet — on the two pages a frightened reader is likeliest
 * to land on ("How can I know if I am one of the elect?" / "Is the fear of not
 * being chosen itself a sign of grace?"). In Brief blocks, pullquotes and meta
 * descriptions are the other recurring carriers. S183 adds a fourth: the
 * CLOSING CATCH SECTION is the single densest slip real estate on the site,
 * which is why an H2 sweep found what eleven phrase-greps had not. Chase the
 * spine, then re-sync every carrier.
 *
 * TRIAGE, NOT VERDICT — like every detector here. Hand-check every hit.
 *
 * Usage:
 *   node detect-feeling-slip.js              # worst-first, all pages
 *   node detect-feeling-slip.js --all        # include MODEL + SANCTIONED
 *   node detect-feeling-slip.js --cond       # include CONDITIONAL (form 4)
 *   node detect-feeling-slip.js <page>.html  # one page
 */

const fs = require('fs');

const args = process.argv.slice(2);
const showAll = args.includes('--all');
const showCond = args.includes('--cond') || showAll;
const only = args.find(a => a.endsWith('.html'));

// Interior-state nouns. Used with the determiners that|this|your, which never
// collide with ELECT's own tokens.
const INTERIOR = [
  'stirring', 'pull', 'ache', 'thirst', 'lean', 'leaning', 'trembling',
  'recognition', 'breaking', 'drawing', 'fear', 'terror', 'response',
  'reaching', 'wanting', 'flicker', 'flinch', 'instinct', 'impulse', 'urge',
  'longing', 'hunger', 'softening', 'warmth', 'tug', 'unrest', 'restlessness',
  'conviction', 'tenderness', 'groan', 'anguish', 'grief', 'sorrow',
  'discomfort', 'unease', 'desire', 'willingness', 'openness', 'curiosity',
  'wrestling', 'hesitation', 'reluctance', 'loosening', 'caring', 'concern',
  'trouble', 'weeping'
].join('|');

// Interior nouns unambiguous enough to take a bare `the`. Deliberately short:
// anything sharing a token with ELECT (drawing, answer, call, sign) is barred,
// or the sentence would certify itself.
const BARE = [
  'flicker', 'flinch', 'instinct', 'impulse', 'urge', 'softening', 'warmth',
  'tug', 'stirring', 'unrest', 'restlessness', 'loosening', 'wanting'
].join('|');

// The reader's interior state, or the bare act of reading, offered as a premise.
const TRIGGER = new RegExp(
  '(' +
  // any "the fact that ... you ..." premise (S183: no longer requires adjacency)
  'the (?:very )?fact that[^.!?<]{0,90}\\byou\\b[^.!?<]{0,60}' +
  '|if you(?:\'re| are)[^.!?<]{0,60}(?:still )?(?:reading|here)[^.!?<]{0,60}' +
  '|something (?:in|inside) you[^.!?<]{0,80}' +
  // An optional adjective slot: "the FAINT flicker", "that QUIET stirring".
  // Without it, adjacency alone let printable-where-did-your-faith-come-from
  // walk through both v1 and the first v2 pass — a printed handout whose whole
  // close reads a flicker of wanting as "the first sign He has already moved."
  '|(?:that|this|your) (?:\\w+ )?(?:' + INTERIOR + ')\\b[^.!?<]{0,70}' +
  '|the (?:\\w+ )?(?:' + BARE + ')\\b[^.!?<]{0,70}' +
  // Determiners here are that|your|any and NOT bare `the`: "if the drawing is
  // universal" (demolition-john5-40) is exegesis of John 6:44, not the reader's
  // interior, and because ELECT also holds "the drawing" such a sentence would
  // certify itself as a SLIP. A demonstrative or possessive is what makes the
  // noun the READER'S state rather than the doctrine's name for God's act.
  '|if (?:that|your|any) (?:' + INTERIOR + ')[^.!?<]{0,70}' +
  // "your <gerund>" — your wanting, your seeking, your coming
  '|your (?:wanting|seeking|reaching|coming|caring|asking|knocking|turning|' +
  'hungering|thirsting|longing|flinching)\\b[^.!?<]{0,70}' +
  ')', 'gi');

// The claim attached to it. Direction decides the verdict.
// S183 precision fixes:
//  - bare `the answer` REMOVED. The kickoff named objection-love ("The answer
//    to that fear is more beautiful") as pure noise from this alternate, and it
//    also mis-fired on question-where-did-your-faith-come-from. It never once
//    caught a true slip on its own.
//  - `the call` now requires a begun/come verb, or it fires on every page that
//    merely discusses the effectual call.
const ELECT = /\b(evidence|proof|the drawing|a sign|the first sign|the receipt|confirm(?:s|ing|ation)?|marks? you|means you are|the call (?:has|is) (?:begun|already|come|gone out)|you are (?:one of|already|being) (?:the |his |God's )?(?:elect|chosen|sheep|saved|given|drawn)|the (?:Father|Spirit|Root|Gardener) (?:has|is|had) (?:already )?(?:reached|drawn|begun|at work)|grace has begun|has already begun|already underway|regeneration has|the resurrection has|you belong to him|you are not (?:still )?dead|you are becoming alive|almost certainly chosen|your name is being read|witness in your favou?r|at work in you)/i;

// A slip is a claim about THE READER'S STANDING BEFORE GOD. An evidence-claim
// whose object is anything else — "evidence that the truth is true"
// (philosophy-resistance-is-proof), "evidence that it operates in you too"
// (psychology-sincerity-trap), "evidence that what you're carrying is grief"
// (invisible-wall-singing-alone) — is not this defect, however identical the
// grammar. The weak ELECT path must therefore also name God somewhere.
// STRONG_ELECT bypasses this gate: its tokens already name Him.
const GOD_REF = /\b(God|Christ|Jesus|the Spirit|the Father|the Shepherd|the Son|grace|elect|chosen|saved|salvation|regenerat|born again|drawn|drawing|Someone else|\bHis\b|\bHim\b|\bHe\b)/;

// Unambiguous ELECTION-object claims. These OUTRANK an incidental depravity
// token in the same sentence (S183 fix #2). Keep this set tight.
const STRONG_ELECT = /\b(already (?:prying|drawing|drawn|begun|moved|at work|underway)|(?:He|God|the Spirit|the Father) (?:is|has been|had been) already|witness in your favou?r|evidence that (?:He|God|the Spirit)|is the (?:Spirit|Father)\b|the first sign|almost certainly chosen|proof of the opposite|He wants you|you are (?:one of the )?(?:elect|chosen)\b)/i;

const DEPRAVE = /\b(depravity|dead in|the diagnosis|the corpse|inability|cannot|unable|resist(?:ance|ing)?|defend(?:ing)?|deflect|rationaliz|the objection|proves the point|autonomy|self-justif|pride|the very argument)/i;

const REPUDIATE = /\b(do not|don't|never|stop|refuse to|no one has ever|nobody has ever|not worth auditing|issues no receipt|a feeling never is|the cheap version|poor (?:gauge|instrument)|reads backwards)\b[^.!?<]{0,110}\b(audit|hunt|grade|measure|scour|search|look(?:ing)? (?:for|inward)|take (?:a |the )?(?:reading|temperature)|certif|verif|authenticat|inventory|survey|test(?:ing)?|sign|proof|evidence)/i
  // S183: also a repudiation — naming the slip as a FAULT of the faith that
  // commits it. shattered-lens-when-prayer-stopped-working diagnoses it exactly:
  // "a faith that ... made the warmth the evidence."
  || null;
const DIAGNOSED = /\b(?:made|makes|making|treat(?:s|ed|ing)?|mistak(?:e|es|en|ing)) (?:the |your |his |a )?\w+ (?:the |as )?(?:evidence|proof|the ground|the test)\b|\ba faith that (?:needs|requires|depends on)\b/i;

// ALSO a repudiation: the claim stated in order to be denied.
// S183: the determiner set now takes POSSESSIVES. Without them this missed
// S182's own corrective line on systematic-reprobation — "The wanting is not
// YOUR proof; it is His fingerprint" — and reported the fix as the defect.
const DENIED = /\b(is|are|was) not (?:a |an |the |itself |your |his |our |my )?(?:proof|evidence|a sign|the sign|a credential|the ground|the answer|the evidence)\b/i
  // S183: APPOSITIVE negation, with no copula in front of it — "…surfaces in
  // time, not a proof you were handed to audit, but a place you were brought
  // to stand." The corrective is frequently written this way, so without this
  // the detector reports the fixes as the defect.
  || null;
const DENIED_APPOS = /\bnot (?:a|the|your) (?:proof|sign|credential|test|gauge|verdict|receipt|certificate|evidence)\b/i;

// Evidence pointing at a LACK is the depravity direction wearing election's
// grammar: "the proof that you are not yet resting in the immutable counsel"
// (ot-isaiah-servant) diagnoses a deficiency, it does not certify election.
const NOT_YET = /\b(?:proof|evidence|sign)\b[^.!?<]{0,40}\bthat you (?:are|have) (?:still )?not\b|\bnot yet\b/i;

// FORM 4 — conditional comfort. Lowest-signal class; reported separately.
const CONDITIONAL = /\bif you can\b[^.!?<]{0,90}\b(then )?(?:the )?(?:comfort|promise|assurance|rest|peace|hope|verse|word)\b[^.!?<]{0,60}\b(?:is|becomes|belongs to|are)\b[^.!?<]{0,30}\byours?\b/i;

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
  const ld = (raw.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || []).join(' ');
  const hits = [];
  for (const s of sentencesOf(raw)) {
    if (s.length < 25 || s.length > 480) continue;
    TRIGGER.lastIndex = 0;
    if (!TRIGGER.test(s)) {
      // form 4 stands on its own premise and needs no interior-state trigger
      if (CONDITIONAL.test(s)) hits.push({ verdict: 'CONDITIONAL', carrier: '', s: s.trim() });
      continue;
    }
    // ORDER IS LOAD-BEARING. A sentence that DENIES the evidence-claim is never
    // a slip however closely it rhymes with one — that test stays first. Then
    // an unambiguous election-object claim (S183), which outranks an incidental
    // depravity token. Only then does the depravity direction win.
    const verdict =
      (REPUDIATE.test(s) || DENIED.test(s) || DENIED_APPOS.test(s) || DIAGNOSED.test(s)) ? 'MODEL'
        : STRONG_ELECT.test(s) ? 'SLIP'
          : (DEPRAVE.test(s) || NOT_YET.test(s)) ? 'SANCTIONED'
            : (ELECT.test(s) && GOD_REF.test(s)) ? 'SLIP'
              : CONDITIONAL.test(s) ? 'CONDITIONAL'
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
  const conds = hits.filter(h => h.verdict === 'CONDITIONAL');
  if (slips.length || (showCond && conds.length) || (showAll && hits.length)) {
    rows.push({ f, hits, n: slips.length });
  }
}
rows.sort((a, b) => b.n - a.n);

console.log('\n  detect-feeling-slip.js v2 — assurance grounded in the reader, not in God\n');
console.log('  SLIP        = interior state offered as evidence of election. FIX.');
console.log('  SANCTIONED  = interior state as evidence of DEPRAVITY (Move 4). Keep.');
console.log('  MODEL       = the slip explicitly repudiated. Copy these.');
console.log('  CONDITIONAL = form 4, comfort made conditional. Lowest signal (--cond).\n');

let totalSlip = 0, totalCond = 0;
for (const r of rows) {
  const shown = r.hits.filter(h =>
    h.verdict === 'SLIP' || showAll || (showCond && h.verdict === 'CONDITIONAL'));
  if (!shown.length) continue;
  console.log('  ── ' + r.f.replace(/\.html$/, ''));
  for (const h of shown) {
    if (h.verdict === 'SLIP') totalSlip++;
    if (h.verdict === 'CONDITIONAL') totalCond++;
    console.log(`     ${h.verdict.padEnd(11)}${h.carrier} ${h.s.slice(0, 205)}`);
  }
}
console.log(`\n  ${rows.length} page(s) flagged · ${totalSlip} SLIP candidate(s)` +
  (showCond ? ` · ${totalCond} CONDITIONAL` : '') + '\n');
console.log('  TRIAGE, NOT VERDICT. Hand-check every hit. The fix is never a');
console.log('  deletion alone: re-ground the passage in God\'s prior and finished');
console.log('  work, keep the page\'s own image, and re-sync every carrier');
console.log('  (In Brief, pullquote, meta, JSON-LD) to the corrected spine.\n');
