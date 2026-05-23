const fs = require('fs');
const fixes = [
  ['secular-sociology-human-inability.html',
   'suppresses the truth in unrighteousness',
   'suppress the truth by their wickedness'],
  ['response-roger-olson.html',
   'they did not like to retain God in their knowledge',
   'they did not think it worthwhile to retain the knowledge of God'],
  ['demolition-joshua24-15.html',
   'Be holy, for I am holy',
   'Be holy, because I am holy'],
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
console.log('\nApplied ' + ok + ', missed ' + miss);
