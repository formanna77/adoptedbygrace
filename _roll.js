// S122 roll: replace the obsolete "CARRIES TO S122" note at the end of SAPIENTIAL with §LXVIII (from temp),
// then roll §LXII (S116) -> SAP archive, and roll Session 116 -> MC archive. Self-verifies. Overwrite-only (no unlink).
const fs = require('fs');
const REPO = '/sessions/dreamy-exciting-knuth/mnt/adoptedbygracewebsite/';
const OUT  = '/sessions/dreamy-exciting-knuth/mnt/outputs/';

function rd(p){ return fs.readFileSync(p,'utf8'); }
function wr(p,s){ fs.writeFileSync(p,s); }

// ---- SAPIENTIAL: replace from "**CARRIES TO S122" to EOF with §LXVIII block, then cut §LXII ----
let sap = rd(REPO+'SAPIENTIAL-AUDIT.md');
const sec68 = rd(OUT+'_s122_sap.md').trim();
const carriesIdx = sap.indexOf('**CARRIES TO S122');
if (carriesIdx < 0) throw new Error('CARRIES TO S122 marker not found');
sap = sap.slice(0, carriesIdx).trimEnd() + '\n\n' + sec68 + '\n';

const sLXII = sap.indexOf('## §LXII. S116 EXECUTION LOG');
const eLXII = sap.indexOf('\n## §LXIII.', sLXII);
if (sLXII < 0 || eLXII < 0) throw new Error('SAP §LXII markers not found: '+sLXII+'/'+eLXII);
const blockLXII = sap.slice(sLXII, eLXII).trimEnd() + '\n';
const newSap = sap.slice(0, sLXII) + sap.slice(eLXII + 1);

let sapArch = rd(REPO+'SAPIENTIAL-AUDIT-ARCHIVE.md');
sapArch = sapArch.trimEnd() + '\n\n' + blockLXII.trim() + '\n';

// ---- MISSION-CONTROL: cut Session 116 (oldest live) ----
let mc = rd(REPO+'MISSION-CONTROL.md');
const s116 = mc.indexOf('### Session 116 —');
const e116 = mc.indexOf('\n### ', s116 + 12);
if (s116 < 0 || e116 < 0) throw new Error('MC Session 116 markers not found: '+s116+'/'+e116);
const block116 = mc.slice(s116, e116).trimEnd() + '\n';
const newMc = mc.slice(0, s116) + mc.slice(e116 + 1);

let mcArch = rd(REPO+'MISSION-CONTROL-ARCHIVE.md');
mcArch = mcArch.trimEnd() + '\n\n' + block116.trim() + '\n';

// ---- write all ----
wr(REPO+'SAPIENTIAL-AUDIT.md', newSap);
wr(REPO+'SAPIENTIAL-AUDIT-ARCHIVE.md', sapArch);
wr(REPO+'MISSION-CONTROL.md', newMc);
wr(REPO+'MISSION-CONTROL-ARCHIVE.md', mcArch);

// ---- verify ----
const v = {
  'SAP has §LXVIII': (newSap.match(/## §LXVIII\./g)||[]).length,
  'SAP §LXII removed (want 0)': (newSap.match(/## §LXII\. S116 EXECUTION LOG/g)||[]).length,
  'SAP has §LXIII': (newSap.match(/## §LXIII\./g)||[]).length,
  'SAP has §LXVII': (newSap.match(/## §LXVII\./g)||[]).length,
  'SAP ends with CARRIES TO S123': newSap.trimEnd().includes('CARRIES TO S123') ? 1 : 0,
  'SAP-ARCH got §LXII': (sapArch.match(/## §LXII\. S116 EXECUTION LOG/g)||[]).length,
  'MC has S122': (newMc.match(/### Session 122 —/g)||[]).length,
  'MC has S121': (newMc.match(/### Session 121 —/g)||[]).length,
  'MC has S117': (newMc.match(/### Session 117 —/g)||[]).length,
  'MC S116 removed (want 0)': (newMc.match(/### Session 116 —/g)||[]).length,
  'MC has Strategy Review': (newMc.match(/### Strategy Review —/g)||[]).length,
  'MC-ARCH got S116': (mcArch.match(/### Session 116 —/g)||[]).length,
};
console.log(JSON.stringify(v, null, 2));
console.log('SAP live sections:', newSap.split('\n').filter(l=>l.startsWith('## §')).map(l=>l.split('.')[0]).join(' '));
