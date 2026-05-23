// Audit A — fix the PDF-verified, edition-identical genuine errors (ESV/KJV -> NIV).
// Each correct reading was confirmed against the uploaded NIV 1984 PDF (= 2011 for these verses).
const fs = require('fs');
const fixes = [
  ['story-real-conversions.html',
   'Look unto me, and be ye saved.',
   'Turn to me and be saved, all you ends of the earth.'],
  ['psychology-emotional-vs-rational.html',
   'Create in me a clean heart, O God, and renew a right spirit within me',
   'Create in me a pure heart, O God, and renew a steadfast spirit within me'],
  ['systematic-trinity.html',
   'All things were made through him, and without him was not any thing made that has been made',
   'Through him all things were made; without him nothing was made that has been made'],
  ['history-luther.html',
   'The righteous shall live by faith.',
   'The righteous will live by faith.'],
  ['psychology-cognitive-biases.html',
   "Why do you see the speck that is in your brother's eye, but do not notice the log that is in your own eye?",
   "Why do you look at the speck of sawdust in your brother's eye and pay no attention to the plank in your own eye?"],
  ['psychology-cognitive-biases.html',
   "Why do you see the speck that is in your brother's eye, but do not notice the log that is in your own?",
   "Why do you look at the speck of sawdust in your brother's eye and pay no attention to the plank in your own eye?"],
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
