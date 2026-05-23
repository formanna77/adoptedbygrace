// Resolve 1 John 5:1 site-wide: the BARE English verse text must be the NIV
// ("is born of God"); the Greek-perfect point is preserved/sharpened explicitly.
// Legitimate ESV/NASB + "Greek perfect" framings (response-sbc, questions.html,
// question-1john5-1, response-andy-stanley) are intentionally LEFT untouched.
const fs = require('fs');
const fixes = [
  ['analogy-doctor-corpse.html',
   "1 John 5:1 says 'Everyone who believes that Jesus is the Christ has been born of God' — the new birth (past tense) produces the believing (present tense). God makes us alive, and then we believe.",
   "1 John 5:1 says 'Everyone who believes that Jesus is the Christ is born of God' — and the Greek verb is a perfect passive (gegennētai, 'has been born'), so the new birth precedes and produces the believing. God makes us alive, and then we believe."],
  ['scripture-tsunami.html',
   'text: "Everyone who believes that Jesus is the Christ has been born of God.",',
   'text: "Everyone who believes that Jesus is the Christ is born of God.",'],
  ['story-surgeon-stone-heart.html',
   '<p>"Everyone who believes that Jesus is the Christ has been born of God."</p>',
   '<p>"Everyone who believes that Jesus is the Christ is born of God."</p>'],
  ['story-surgeon-stone-heart.html',
   'Notice the tenses: "believes" is present tense, "has been born" is perfect tense — a completed action in the past with ongoing results.',
   'Notice the Greek: "believes" is present tense, but the verb rendered "is born" is a perfect passive — <em>gegennētai</em>, "has been born," a completed action in the past with ongoing results.'],
];
let ok = 0, miss = 0;
for (const [file, oldS, newS] of fixes) {
  const html = fs.readFileSync(file, 'utf8');
  const count = html.split(oldS).length - 1;
  if (count === 0) { console.log('MISS  ' + file + '  :: ' + oldS.slice(0, 50)); miss++; continue; }
  fs.writeFileSync(file, html.split(oldS).join(newS));
  console.log('OK x' + count + '  ' + file + '  :: ' + oldS.slice(0, 50));
  ok++;
}
console.log('\nApplied ' + ok + ', missed ' + miss);
