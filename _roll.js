// S121 roll: append §LXVII to SAPIENTIAL (from temp), roll §LXI -> SAP archive, roll Session 115 -> MC archive. Self-verifies.
const fs = require('fs');
const REPO = '/sessions/determined-nice-maxwell/mnt/adoptedbygracewebsite/';
const OUT  = '/sessions/determined-nice-maxwell/mnt/outputs/';

function rd(p){ return fs.readFileSync(p,'utf8'); }
function wr(p,s){ fs.writeFileSync(p,s); }

// ---- SAPIENTIAL: append §LXVII, then cut §LXI ----
let sap = rd(REPO+'SAPIENTIAL-AUDIT.md');
const sec67 = rd(OUT+'_s121_sap.md').trim();
sap = sap.trimEnd() + '\n\n' + sec67 + '\n';

const sLXI = sap.indexOf('## §LXI. S115 EXECUTION LOG');
const eLXI = sap.indexOf('\n## §LXII.', sLXI);
if (sLXI < 0 || eLXI < 0) throw new Error('SAP markers not found: '+sLXI+'/'+eLXI);
const blockLXI = sap.slice(sLXI, eLXI).trimEnd() + '\n';
const newSap = sap.slice(0, sLXI) + sap.slice(eLXI + 1);

let sapArch = rd(REPO+'SAPIENTIAL-AUDIT-ARCHIVE.md');
sapArch = sapArch.trimEnd() + '\n\n' + blockLXI.trim() + '\n';

// ---- MISSION-CONTROL: cut Session 115 ----
let mc = rd(REPO+'MISSION-CONTROL.md');
const s115 = mc.indexOf('### Session 115 —');
const e115 = mc.indexOf('\n### ', s115 + 12);
if (s115 < 0 || e115 < 0) throw new Error('MC markers not found: '+s115+'/'+e115);
const block115 = mc.slice(s115, e115).trimEnd() + '\n';
const newMc = mc.slice(0, s115) + mc.slice(e115 + 1);

let mcArch = rd(REPO+'MISSION-CONTROL-ARCHIVE.md');
mcArch = mcArch.trimEnd() + '\n\n' + block115.trim() + '\n';

// ---- write all ----
wr(REPO+'SAPIENTIAL-AUDIT.md', newSap);
wr(REPO+'SAPIENTIAL-AUDIT-ARCHIVE.md', sapArch);
wr(REPO+'MISSION-CONTROL.md', newMc);
wr(REPO+'MISSION-CONTROL-ARCHIVE.md', mcArch);

// ---- verify ----
const v = {
  'SAP has §LXVII': (newSap.match(/## §LXVII\./g)||[]).length,
  'SAP §LXI removed (want 0)': (newSap.match(/## §LXI\. S115 EXECUTION LOG/g)||[]).length,
  'SAP has §LXII': (newSap.match(/## §LXII\./g)||[]).length,
  'SAP has §LXVI': (newSap.match(/## §LXVI\./g)||[]).length,
  'SAP-ARCH got §LXI': (sapArch.match(/## §LXI\. S115 EXECUTION LOG/g)||[]).length,
  'MC has S121': (newMc.match(/### Session 121 —/g)||[]).length,
  'MC has S120': (newMc.match(/### Session 120 —/g)||[]).length,
  'MC has S116': (newMc.match(/### Session 116 —/g)||[]).length,
  'MC S115 removed (want 0)': (newMc.match(/### Session 115 —/g)||[]).length,
  'MC has Strategy Review': (newMc.match(/### Strategy Review —/g)||[]).length,
  'MC-ARCH got S115': (mcArch.match(/### Session 115 —/g)||[]).length,
};
console.log(JSON.stringify(v, null, 2));
console.log('SAP live last section line:', newSap.trimEnd().split('\n').filter(l=>l.startsWith('## §')).pop());
