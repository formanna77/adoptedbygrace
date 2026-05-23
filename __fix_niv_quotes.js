// One-off: fix confirmed KJV/NKJV/ESV intrusions to exact NIV (2011).
// Literal string replacements with match counts for verification.
const fs = require('fs');
const fixes = [
  ['systematic-trinity.html',
   'you are washed, you are sanctified, you are justified',
   'you were washed, you were sanctified, you were justified'],
  ['printable-the-mirror.html',
   'Shall not the Judge of all the earth do right?',
   'Will not the Judge of all the earth do right?'],
  ['printable-the-mirror.html',
   'Why, you foolish person, who are you to talk back to God?',
   'But who are you, a human being, to talk back to God?'],
  ['question-ezekiel37.html',
   'It is not of him that willeth, nor of him that runneth, but of God that sheweth mercy',
   "It does not, therefore, depend on human desire or effort, but on God's mercy"],
  ['anxious-mind-scrupulosity.html',
   'There is therefore now no condemnation',
   'Therefore, there is now no condemnation'],
  ['apologetic-owen-trilemma.html',
   'There is therefore now no condemnation',
   'Therefore, there is now no condemnation'],
  ['analogy-lazarus-grave.html',
   'Lazarus, come forth',
   'Lazarus, come out'],
  ['objection-babies.html',
   'I shall go to him',
   'I will go to him'],
  ['systematic-theology.html',
   'to him are all things. To him be the glory forever. Amen.',
   'for him are all things. To him be the glory forever! Amen.'],
  ['history-medieval.html',
   'he is a new creation; old things have passed away; behold, all things have become new.',
   'the new creation has come: The old has gone, the new is here!'],
  ['question-freewill.html',
   'Those who are in the flesh cannot please God.',
   'Those who are in the realm of the flesh cannot please God.'],
];
let ok = 0, miss = 0;
for (const [file, oldS, newS] of fixes) {
  const html = fs.readFileSync(file, 'utf8');
  const count = html.split(oldS).length - 1;
  if (count === 0) { console.log('MISS  ' + file + '  :: ' + oldS.slice(0, 45)); miss++; continue; }
  fs.writeFileSync(file, html.split(oldS).join(newS));
  console.log('OK x' + count + '  ' + file + '  :: ' + oldS.slice(0, 45));
  ok++;
}
console.log('\nApplied ' + ok + ' fix-rules, ' + miss + ' misses.');
