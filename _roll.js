// S123 roll: replace the "CARRIES TO S123" note at the end of SAPIENTIAL with §LXIX (from temp),
// then roll §LXIII (S117) -> SAP archive, and roll Session 117 -> MC archive. Self-verifies. Overwrite-only (no unlink).
const fs = require('fs');
const REPO = '/sessions/modest-fervent-hamilton/mnt/adoptedbygracewebsite/';
const OUT  = '/sessions/modest-fervent-hamilton/mnt/outputs/';

function rd(p){ return fs.readFileSync(p,'utf8'); }
function wr(p,s){ fs.writeFileSync(p,s); }

// ---- SAPIENTIAL: replace from "**CARRIES TO S123" to EOF with §LXIX block, then cut §LXIII ----
let sap = rd(REPO+'SAPIENTIAL-AUDIT.md');
const sec69 = rd(OUT+'_s123_sap.md').trim();
const carriesIdx = sap.indexOf('**CARRIES TO S123');
if (carriesIdx < 0) throw new Error('CARRIES TO S123 marker not found');
sap = sap.slice(0, carriesIdx).trimEnd() + '\n\n' + sec69 + '\n';

const sLXIII = sap.indexOf('## §LXIII. S117 EXECUTION LOG');
const eLXIII = sap.indexOf('\n## §LXIV.', sLXIII);
if (sLXIII < 0 || eLXIII < 0) throw new Error('SAP §LXIII markers not found: '+sLXIII+'/'+eLXIII);
const blockLXIII = sap.slice(sLXIII, eLXIII).trimEnd() + '\n';
const newSap = sap.slice(0, sLXIII) + sap.slice(eLXIII + 1);

let sapArch = rd(REPO+'SAPIENTIAL-AUDIT-ARCHIVE.md');
sapArch = sapArch.trimEnd() + '\n\n' + blockLXIII.trim() + '\n';

// ---- MISSION-CONTROL: cut Session 117 (oldest live) ----
let mc = rd(REPO+'MISSION-CONTROL.md');
const s117 = mc.indexOf('### Session 117 —');
const e117 = mc.indexOf('\n### ', s117 + 12);
if (s117 < 0 || e117 < 0) throw new Error('MC Session 117 markers not found: '+s117+'/'+e117);
const block117 = mc.slice(s117, e117).trimEnd() + '\n';
const newMc = mc.slice(0, s117) + mc.slice(e117 + 1);

let mcArch = rd(REPO+'MISSION-CONTROL-ARCHIVE.md');
mcArch = mcArch.trimEnd() + '\n\n' + block117.trim() + '\n';

// ---- write all ----
wr(REPO+'SAPIENTIAL-AUDIT.md', newSap);
wr(REPO+'SAPIENTIAL-AUDIT-ARCHIVE.md', sapArch);
wr(REPO+'MISSION-CONTROL.md', newMc);
wr(REPO+'MISSION-CONTROL-ARCHIVE.md', mcArch);

// ---- verify ----
const v = {
  'SAP has §LXIX': (newSap.match(/## §LXIX\./g)||[]).length,
  'SAP §LXIII removed (want 0)': (newSap.match(/## §LXIII\. S117 EXECUTION LOG/g)||[]).length,
  'SAP has §LXIV': (newSap.match(/## §LXIV\./g)||[]).length,
  'SAP has §LXVIII': (newSap.match(/## §LXVIII\./g)||[]).length,
  'SAP ends with CARRIES TO S124': newSap.trimEnd().includes('CARRIES TO S124') ? 1 : 0,
  'SAP-ARCH got §LXIII': (sapArch.match(/## §LXIII\. S117 EXECUTION LOG/g)||[]).length,
  'MC has S123': (newMc.match(/### Session 123 —/g)||[]).length,
  'MC has S122': (newMc.match(/### Session 122 —/g)||[]).length,
  'MC has S118': (newMc.match(/### Session 118 —/g)||[]).length,
  'MC S117 removed (want 0)': (newMc.match(/### Session 117 —/g)||[]).length,
  'MC has Strategy Review': (newMc.match(/### Strategy Review —/g)||[]).length,
  'MC-ARCH got S117': (mcArch.match(/### Session 117 —/g)||[]).length,
};
console.log(JSON.stringify(v, null, 2));
console.log('SAP live sections:', newSap.split('\n').filter(l=>l.startsWith('## §')).map(l=>l.split('.')[0]).join(' '));
