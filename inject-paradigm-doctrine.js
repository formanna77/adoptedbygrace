#!/usr/bin/env node
// Injects the Paradigm Shatter doctrine reference into every AGENT-PROMPT-*.md file.
// Idempotent: safe to run repeatedly. Skips files that already contain the marker.

const fs = require('fs');
const path = require('path');

const MARKER = 'FLEET-DOCTRINE-PARADIGM-SHATTER.md';

const BLOCK = `
## ══════════════════════════════════════════════════════
## THE ONE ROAD — MANDATORY BEFORE YOU DO ANYTHING ELSE
## ══════════════════════════════════════════════════════

**READ \`/FLEET-DOCTRINE-PARADIGM-SHATTER.md\` BEFORE BEGINNING ANY WORK IN THIS SESSION.**

This is non-negotiable and governs every agent in the fleet regardless of lane. The central claim you must internalize and serve:

**The only way any human being has ever been persuaded or convicted of the true God is by having their worldview shattered, and only then receiving the true view of biblical reality into the rubble.**

Every edit you make in this session — whether you are creating a page, enhancing prose, adding a link, rewriting a meta tag, building a hub card, fixing a footer, designing a journey block, or writing a title — is a servant of that sentence. A reader whose interior architecture is intact cannot be saved by your work. The walls must come down. Every agent participates in that demolition from their own lane.

**And — no exceptions — shatter without catch is spiritual malpractice.** Every demolition page must either contain its own tender landing zone in the final 20% or end with a prominent loving link to a catch page. Never leave a reader in the rubble. Demolition without catch = despair. Catch without demolition = complacency. Demolition + catch = transformation. Every page, every time, serves the third.

Read the full doctrine at \`/FLEET-DOCTRINE-PARADIGM-SHATTER.md\` — including the role-by-role application of the doctrine to your specific lane, the Five-Question Session Test, and the Fleet Creed. Apply it in every decision from this point forward.

---

`;

const files = fs.readdirSync(__dirname)
  .filter(f => /^AGENT-PROMPT-.*\.md$/.test(f));

let injected = 0;
let skipped = 0;

for (const file of files) {
  const fullPath = path.join(__dirname, file);
  const content = fs.readFileSync(fullPath, 'utf8');

  if (content.includes(MARKER)) {
    console.log(`  skip: ${file} (already contains doctrine reference)`);
    skipped++;
    continue;
  }

  // Find the first blank line after the frontmatter (---) closing
  const lines = content.split('\n');
  let insertIdx = -1;
  let frontmatterClosed = false;
  for (let i = 0; i < lines.length; i++) {
    if (i === 0 && lines[i] === '---') continue;
    if (lines[i] === '---' && !frontmatterClosed) {
      frontmatterClosed = true;
      insertIdx = i + 1;
      break;
    }
  }
  if (insertIdx === -1) {
    // No frontmatter — inject at top
    insertIdx = 0;
  }

  const newLines = [
    ...lines.slice(0, insertIdx),
    BLOCK,
    ...lines.slice(insertIdx),
  ];

  fs.writeFileSync(fullPath, newLines.join('\n'));
  console.log(`  inject: ${file}`);
  injected++;
}

console.log(`\nDoctrine injection complete: ${injected} injected, ${skipped} skipped.`);
