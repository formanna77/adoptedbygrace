const fs = require('fs');
const path = require('path');

// Healing/devotional pages to link from demolition pages
const healingLinks = [
  {
    href: '/devotional-never-gives-up.html',
    title: 'He Never Gives Up',
    desc: 'The truth that demolished you is the same truth that holds you. He chose you before the foundation of the world — and He will never let you go.'
  },
  {
    href: '/devotional-rescued-without-a-say.html',
    title: 'Rescued Without a Say',
    desc: 'You didn\'t choose to be born. You didn\'t choose to breathe. And you didn\'t choose to be saved. That\'s not a loss of dignity — it\'s the deepest possible love.'
  },
  {
    href: '/devotional-the-hands-that-hold-you.html',
    title: 'The Hands That Hold You',
    desc: 'If this truth feels heavy, rest here. The God who chose you is the God who keeps you.'
  }
];

const healingCard = (link) => `
                        <a href="${link.href}" style="display: block; padding: 1.2rem 1.5rem; background: rgba(139,92,246,0.06); border: 1px solid rgba(139,92,246,0.2); border-radius: 12px; text-decoration: none; transition: all 0.3s ease;">
                            <h4 style="font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #a78bfa; margin-bottom: 0.4rem;">${link.title}</h4>
                            <p style="font-size: 0.9rem; color: #b0b0b0; margin: 0; line-height: 1.4;">${link.desc}</p>
                        </a>`;

// Find all demolition pages
const files = fs.readdirSync('.').filter(f => f.startsWith('demolition-') && f.endsWith('.html') && f !== 'demolition-hub.html');

let modified = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if it already has healing/devotional links
  const hasHealing = /href="\/devotional-(?!s\.html)/.test(content) || /href="\/anxious-mind-|href="\/broken-mirror-|href="\/open-wound-|href="\/pastoral-/.test(content);
  
  if (hasHealing) {
    // Skip — already has healing links
    continue;
  }
  
  // Find the "Continue Your Journey" section or RELATED-ARTICLES section and add a healing card
  // Pick a random healing link for variety
  const link = healingLinks[modified % healingLinks.length];
  const card = healingCard(link);
  
  // Try to insert before the closing </div> of the journey grid
  const journeyPattern = /<!-- RELATED-ARTICLES-START -->/;
  if (journeyPattern.test(content)) {
    content = content.replace(journeyPattern, card + '\n<!-- RELATED-ARTICLES-START -->');
    fs.writeFileSync(file, content);
    modified++;
    console.log(`✅ ${file} — added healing link: ${link.title}`);
  } else {
    console.log(`⚠️ ${file} — no journey section found, skipping`);
  }
}

console.log(`\nTotal: ${modified} files modified`);
