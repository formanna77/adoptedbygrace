#!/usr/bin/env node
/**
 * build-tags.js
 *
 * Scans every HTML page, auto-assigns multiple topic tags based on
 * title, description, filename, and content keywords. Outputs tags.json
 * which powers: Related Articles, Browse by Topic, and All Content pages.
 *
 * Run:  node build-tags.js
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = __dirname;
const OUTPUT = path.join(SITE_DIR, 'tags.json');

// Pages to skip
const SKIP = new Set([
  '_nav-template.html', 'search.html', '404.html',
  'index.html', 'index-old.html', 'index-new.html',
  'google0af1fbedb3c930a8.html',
  'donate.html', 'contact.html', 'privacy.html', 'terms.html',
  'about.html', 'freedom.html', 'belief-assessment.html', 'quiz.html',
  'explore-map.html', 'connections.html', 'essays.html',
  'best-reads.html', 'verse-explorer.html',
  'all-content.html', 'topics.html',
]);

// ── Topic definitions ──────────────────────────────────────────────
// Each topic has keywords that trigger it. A page gets tagged with a topic
// if its title, description, or body text matches enough keywords.
const TOPICS = {
  'Election & Predestination': {
    keywords: ['election', 'predestination', 'predestined', 'chosen', 'chose', 'elect', 'foreknew', 'foreknowledge', 'before the foundation', 'before the world began', 'divine decree', 'decrees of god'],
    weight: 1,
  },
  'Free Will': {
    keywords: ['free will', 'freewill', 'libertarian freedom', 'choice', 'choose', 'choosing', 'robot', 'robots', 'autonomy', 'self-determination', 'compatibilism', 'determinism'],
    weight: 1,
  },
  'Total Depravity': {
    keywords: ['total depravity', 'depravity', 'dead in sin', 'dead in trespasses', 'original sin', 'fallen nature', 'unable', 'inability', 'spiritual death', 'corpse', 'blindness', 'slave to sin', 'bondage of the will'],
    weight: 1,
  },
  'Irresistible Grace': {
    keywords: ['irresistible grace', 'effectual call', 'effectual calling', 'internal call', 'external call', 'regeneration', 'new birth', 'born again', 'new heart', 'heart of flesh', 'heart of stone', 'monergism', 'monergistic'],
    weight: 1,
  },
  'Perseverance of the Saints': {
    keywords: ['perseverance', 'eternal security', 'once saved always saved', 'lose salvation', 'lose your salvation', 'falling away', 'apostasy', 'sealed', 'kept by god', 'preservation'],
    weight: 1,
  },
  'Definite Atonement': {
    keywords: ['definite atonement', 'limited atonement', 'particular redemption', 'for whom did christ die', 'died for', 'atonement', 'ransom', 'substitutionary', 'penal substitution', 'blood of christ'],
    weight: 1,
  },
  'Sovereignty of God': {
    keywords: ['sovereignty', 'sovereign', 'god controls', 'god ordains', 'god determines', 'god decrees', 'divine will', 'purpose of god', 'plan of god', 'counsel of god', 'all things'],
    weight: 1,
  },
  'Human Responsibility': {
    keywords: ['responsibility', 'accountable', 'accountability', 'blame', 'command', 'obey', 'obedience', 'duty', 'repent', 'repentance', 'believe', 'faith', 'response'],
    weight: 0.8,
  },
  'Suffering & Grief': {
    keywords: ['suffering', 'grief', 'pain', 'loss', 'death', 'hospital', 'chronic', 'trauma', 'abuse', 'wound', 'mourning', 'sorrow', 'tears', 'broken', 'hurt'],
    weight: 1,
  },
  'Assurance & Comfort': {
    keywords: ['assurance', 'comfort', 'peace', 'rest', 'secure', 'safety', 'hope', 'never let go', 'anxiety', 'anxious', 'worry', 'fear', 'afraid', 'doubt'],
    weight: 1,
  },
  'Salvation & Justification': {
    keywords: ['salvation', 'saved', 'justify', 'justification', 'imputation', 'righteousness', 'redemption', 'reconciliation', 'forgiveness', 'gospel', 'grace alone', 'faith alone', 'sola'],
    weight: 1,
  },
  'Scripture & Bible': {
    keywords: ['scripture', 'bible', 'word of god', 'biblical', 'exegesis', 'hermeneutic', 'verse', 'passage', 'text', 'chapter'],
    weight: 0.6,
  },
  'Arminianism & Objections': {
    keywords: ['arminian', 'arminianism', 'arminius', 'synergism', 'synergistic', 'prevenient grace', 'objection', 'steel man', 'steelman', 'counter-argument', 'rebuttal', 'refute', 'dismantle'],
    weight: 1,
  },
  'Church History': {
    keywords: ['history', 'historical', 'reformation', 'reformer', 'augustine', 'pelagius', 'dort', 'synod', 'confession', 'creed', 'catechism', 'puritans', 'puritan', 'great awakening', 'spurgeon'],
    weight: 1,
  },
  'Famous Theologians': {
    keywords: ['calvin', 'augustine', 'spurgeon', 'edwards', 'jonathan edwards', 'luther', 'owen', 'bunyan', 'whitefield', 'arminius', 'boston', 'keller', 'lewis'],
    weight: 0.8,
  },
  'Psychology & Resistance': {
    keywords: ['psychology', 'cognitive', 'bias', 'resistance', 'suppress', 'suppressing', 'denial', 'pride', 'autonomy', 'illusion', 'self-deception', 'terror management', 'emotional', 'rational'],
    weight: 1,
  },
  'Evangelism & Mission': {
    keywords: ['evangelism', 'evangelize', 'preach', 'mission', 'missionary', 'witness', 'unreached', 'gospel proclamation', 'share the faith', 'great commission'],
    weight: 1,
  },
  'Prayer & Devotion': {
    keywords: ['prayer', 'pray', 'devotion', 'devotional', 'worship', 'meditation', 'quiet time', 'intimacy with god', 'spiritual life'],
    weight: 1,
  },
  'Old Testament': {
    keywords: ['old testament', 'genesis', 'exodus', 'abraham', 'isaac', 'jacob', 'esau', 'moses', 'pharaoh', 'david', 'joseph', 'noah', 'jeremiah', 'isaiah', 'jonah', 'job', 'abel', 'cain', 'israel'],
    weight: 1,
  },
  'Parables & Stories': {
    keywords: ['story', 'stories', 'parable', 'narrative', 'tale', 'fable', 'allegory', 'fiction', 'orphan', 'fairy tale', 'imagine'],
    weight: 1,
  },
  'Analogies & Illustrations': {
    keywords: ['analogy', 'illustration', 'metaphor', 'picture', 'like a', 'imagine', 'chess', 'doctor', 'adoption', 'light switch', 'fish', 'ocean', 'puppet', 'marionette'],
    weight: 1,
  },
  'Science & Secular Evidence': {
    keywords: ['science', 'scientific', 'secular', 'neuroscience', 'brain', 'determinism', 'physics', 'philosophy', 'algorithm', 'evidence', 'experiment', 'research', 'study'],
    weight: 1,
  },
  'Romans 9': {
    keywords: ['romans 9', 'rom 9', 'potter', 'clay', 'vessels of wrath', 'vessels of mercy', 'jacob i loved', 'esau i hated', 'pharaoh', 'it does not depend on human desire'],
    weight: 1,
  },
  'John 6': {
    keywords: ['john 6', 'john chapter 6', 'no one can come to me', 'the father draws', 'bread of life', 'all that the father gives me'],
    weight: 1,
  },
  'Ephesians 1': {
    keywords: ['ephesians 1', 'eph 1', 'chose us in him', 'before the foundation of the world', 'predestined us for adoption', 'adoption as sons', 'in love he predestined'],
    weight: 1,
  },
  'Healing & Mental Health': {
    keywords: ['healing', 'mental health', 'depression', 'anxiety', 'anxious', 'broken', 'shame', 'identity', 'self-worth', 'mirror', 'invisible wall', 'shattered', 'lens', 'wound'],
    weight: 1,
  },
  'God\'s Love': {
    keywords: ['god\'s love', 'love of god', 'loved us', 'beloved', 'unfailing love', 'steadfast love', 'mercy', 'compassion', 'tenderness', 'kind', 'kindness', 'gentle'],
    weight: 0.8,
  },
  'Covenant Theology': {
    keywords: ['covenant', 'covenant theology', 'covenant of grace', 'covenant of works', 'testament', 'promise', 'oath', 'seed of abraham'],
    weight: 1,
  },
  'Fairness & Justice': {
    keywords: ['fair', 'fairness', 'justice', 'just', 'righteous', 'unjust', 'unfair', 'equity', 'deserve', 'merit', 'blame', 'innocent', 'guilty'],
    weight: 1,
  },
  'Identity & Adoption': {
    keywords: ['identity', 'adopted', 'adoption', 'child of god', 'children of god', 'son', 'daughter', 'belong', 'family of god', 'heir', 'co-heir', 'inheritance'],
    weight: 1,
  },
};

// ── Category mapping by filename prefix ────────────────────────────
function getCategory(filename) {
  const prefixMap = {
    'start-here': 'Start Here',
    'question': 'Questions',
    'systematic': 'Theology',
    'objection': 'Objections Answered',
    'demolition': 'Demolition Zone',
    'counter': 'Demolition Zone',
    'psychology': 'Why We Resist',
    'resistance': 'Why We Resist',
    'devotional': 'Devotionals',
    'story': 'Stories',
    'secular': 'Secular Evidence',
    'history': 'History',
    'theologian': 'Theologians',
    'analogy': 'Analogies',
    'ot-': 'Old Testament',
    'compare': 'Comparisons',
    'debate': 'Questions',
    'creed': 'Creeds & Confessions',
    'canons': 'Creeds & Confessions',
    'pastoral': 'Pastoral',
    'psalm': 'Psalms & Poetry',
    'apologetic': 'Questions',
    'anxious-mind': 'Healing & Hope',
    'broken-mirror': 'Healing & Hope',
    'invisible-wall': 'Healing & Hope',
    'open-wound': 'Healing & Hope',
    'shattered-lens': 'Healing & Hope',
  };

  for (const [prefix, cat] of Object.entries(prefixMap)) {
    if (filename.startsWith(prefix)) return cat;
  }
  return 'General';
}

// ── Helpers ────────────────────────────────────────────────────────
function extractMeta(html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
  title = title.replace(/\s*[|\u2014\u2013\u2015\u2012–—-]\s*(Adopted by Grace|ADOPTED BY GRACE).*$/i, '').trim();

  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const desc = descMatch ? descMatch[1].trim() : '';

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';

  // Extract visible text (simplified — strips HTML tags)
  let bodyText = html.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  bodyText = bodyText.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  bodyText = bodyText.replace(/<nav[\s\S]*?<\/nav>/gi, ' ');
  bodyText = bodyText.replace(/<footer[\s\S]*?<\/footer>/gi, ' ');
  bodyText = bodyText.replace(/<[^>]+>/g, ' ');
  bodyText = bodyText.replace(/\s+/g, ' ').toLowerCase().substring(0, 5000);

  return { title: title || h1, desc, bodyText };
}

function scoreTopics(title, desc, bodyText) {
  const tags = [];
  const titleLower = (title + ' ' + desc).toLowerCase();

  for (const [topic, config] of Object.entries(TOPICS)) {
    let score = 0;

    for (const kw of config.keywords) {
      const kwLower = kw.toLowerCase();

      // Title/description matches are worth more
      if (titleLower.includes(kwLower)) {
        score += 3 * config.weight;
      }

      // Body text matches
      if (bodyText.includes(kwLower)) {
        score += 1 * config.weight;
      }
    }

    if (score >= 2) {
      tags.push({ topic, score });
    }
  }

  // Sort by score descending, take top 8
  tags.sort((a, b) => b.score - a.score);
  return tags.slice(0, 8).map(t => t.topic);
}

// ── Anchor extraction ──────────────────────────────────────────────
// Find sections within pages (h2/h3 with IDs) for deep linking
function extractAnchors(html, url) {
  const anchors = [];
  // Match h2 or h3 with id attributes
  const regex = /<(h[23])[^>]*id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[3].replace(/<[^>]+>/g, '').trim();
    if (text && text.length > 3) {
      anchors.push({ id: match[2], text, url: url + '#' + match[2] });
    }
  }
  return anchors;
}

// ── Main ───────────────────────────────────────────────────────────
const htmlFiles = fs.readdirSync(SITE_DIR).filter(f => {
  if (!f.endsWith('.html')) return false;
  if (SKIP.has(f)) return false;
  if (f.startsWith('_') || f.startsWith('.')) return false;
  return true;
});

console.log(`Scanning ${htmlFiles.length} HTML pages for topic tagging...`);

const pages = [];
const topicCounts = {};

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(SITE_DIR, file), 'utf-8');
  const url = '/' + file.replace(/\.html$/, '');
  const { title, desc, bodyText } = extractMeta(html);

  if (!title) continue;

  const category = getCategory(file);
  const tags = scoreTopics(title, desc, bodyText);
  const anchors = extractAnchors(html, url);

  // Count topic usage
  for (const tag of tags) {
    topicCounts[tag] = (topicCounts[tag] || 0) + 1;
  }

  pages.push({
    url,
    file,
    title,
    desc: desc.substring(0, 160),
    category,
    tags,
    anchors: anchors.length > 0 ? anchors : undefined,
  });
}

// Sort pages by title
pages.sort((a, b) => a.title.localeCompare(b.title));

// Build topic index (topic → list of page urls)
const topicIndex = {};
for (const [topic] of Object.entries(TOPICS)) {
  const matching = pages.filter(p => p.tags.includes(topic));
  if (matching.length > 0) {
    topicIndex[topic] = matching.map(p => p.url);
  }
}

const output = {
  generated: new Date().toISOString(),
  pageCount: pages.length,
  topicCount: Object.keys(topicIndex).length,
  pages,
  topicIndex,
  topicCounts,
};

fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf-8');

console.log(`\nGenerated tags.json:`);
console.log(`  ${pages.length} pages tagged`);
console.log(`  ${Object.keys(topicIndex).length} topics with content`);
console.log(`\nTopic distribution:`);

const sorted = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
for (const [topic, count] of sorted) {
  console.log(`  ${topic}: ${count} pages`);
}
