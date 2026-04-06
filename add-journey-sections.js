#!/usr/bin/env node
/**
 * THE CARTOGRAPHER — Batch Journey Section Adder
 * Adds "Continue the Journey" sections to all article pages missing them.
 * Uses intelligent cross-category linking based on the Two Arms mandate.
 */

const fs = require('fs');
const path = require('path');

const dir = __dirname;

const categoryMap = {
  'demolition-': 'demolition',
  'question-': 'question',
  'psychology-': 'psychology',
  'philosophy-': 'philosophy',
  'devotional-': 'devotional',
  'story-': 'story',
  'analogy-': 'analogy',
  'theologian-': 'theologian',
  'systematic-': 'systematic',
  'secular-': 'secular',
  'pastoral-': 'pastoral',
  'compare-': 'comparison',
  'objection-': 'objection',
  'ot-': 'ot',
  'broken-mirror-': 'healing',
  'open-wound-': 'healing',
  'invisible-wall-': 'healing',
  'anxious-mind-': 'healing',
  'shattered-lens-': 'healing',
  'joy-': 'joy',
  'history-': 'history',
  'hymn-': 'hymn',
  'resistance-': 'demolition',
  'scripture-tsunami': 'scripture',
  'romans-': 'scripture',
  'counter-': 'demolition',
  'debate-': 'philosophy',
  'creed-': 'history',
};

function getCategory(filename) {
  for (const [prefix, cat] of Object.entries(categoryMap)) {
    if (filename.startsWith(prefix)) return cat;
  }
  return 'other';
}

const arrowSVG = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>';

// Master recommendation pools
const R = {
  demolition: {
    deeper: [
      { href: '/question-depravity', title: 'Dead, Not Sick', desc: 'The Bible\'s diagnosis of the human condition — and why it changes everything.' },
      { href: '/question-faithgift', title: 'Is Faith a Gift?', desc: 'Ephesians 2:8-9 says even the faith to believe is not your own.' },
      { href: '/question-romans9', title: 'Romans 9 — No Escape', desc: 'The chapter that ends every debate about human autonomy in salvation.' },
      { href: '/systematic-hamartiology', title: 'The Doctrine of Sin', desc: 'What Scripture teaches about the depth and totality of human fallenness.' },
      { href: '/question-where-did-your-faith-come-from', title: 'Where Did Your Faith Come From?', desc: 'The one question that changes everything — if you answer it honestly.' },
      { href: '/demolition-prevenient-grace', title: 'Prevenient Grace Demolished', desc: 'The Arminian escape hatch — and why Scripture welds it shut.' },
      { href: '/compare-calvinism-arminianism', title: 'Calvinism vs. Arminianism', desc: 'A side-by-side comparison that makes the differences inescapable.' },
      { href: '/philosophy-infinite-regress-of-choice', title: 'The Infinite Regress of Choice', desc: 'If you chose God, what made you choose? Follow the logic to its end.' },
    ],
    healing: [
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'The God who demolished your self-trust chose you before you drew your first breath.' },
      { href: '/devotional-dead-who-live', title: 'The Dead Who Live', desc: 'The corpse does not stay dead. That is the whole point of grace.' },
      { href: '/devotional-my-chains-fell-away', title: 'My Chains Fell Away', desc: 'What it feels like when sovereign grace finally breaks through.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'He chose you. He found you. He will never let you go.' },
      { href: '/devotional-rescued-without-a-say', title: 'Rescued Without a Say', desc: 'You did not choose the rescue. That is what makes it grace.' },
      { href: '/story-the-orphanage', title: 'The Orphanage', desc: 'A story about children who could not choose their own adoption.' },
      { href: '/devotional-love-before-the-world', title: 'Love Before the World', desc: 'Before time began, you were already His.' },
    ],
  },
  question: {
    deeper: [
      { href: '/systematic-soteriology', title: 'Soteriology — The Full Picture', desc: 'Every doctrine of salvation connected in one unbreakable chain.' },
      { href: '/question-goldchain', title: 'The Golden Chain of Romans 8', desc: 'Foreknown. Predestined. Called. Justified. Glorified. Not one link fails.' },
      { href: '/question-regeneration-precedes-faith', title: 'Regeneration Before Faith', desc: 'You were made alive before you believed — not the other way around.' },
      { href: '/question-chosen', title: 'Were You Chosen?', desc: 'Ephesians 1:3-11 — the passage that frames everything.' },
      { href: '/systematic-election', title: 'The Doctrine of Election', desc: 'God choosing His people before the foundation of the world.' },
      { href: '/question-where-did-your-faith-come-from', title: 'Where Did Your Faith Come From?', desc: 'The one question that changes everything.' },
      { href: '/question-depravity', title: 'Total Depravity', desc: 'The foundation upon which every other truth stands or falls.' },
    ],
    healing: [
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'The answer to your question is also your deepest comfort.' },
      { href: '/devotional-forever-loved', title: 'Forever Loved', desc: 'The love that chose you will never unchoose you.' },
      { href: '/devotional-the-hands-that-hold-you', title: 'The Hands That Hold You', desc: 'The same sovereignty that raises hard questions offers infinite security.' },
      { href: '/pastoral-assurance', title: 'Assurance of Salvation', desc: 'How to know — really know — that you belong to Him.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'He chose you. He found you. He will never let you go.' },
      { href: '/joy-security-changes-everything', title: 'Security Changes Everything', desc: 'What it feels like when the questions finally find their answer.' },
    ],
  },
  psychology: {
    deeper: [
      { href: '/psychology-anosognosia-of-sin', title: 'The Anosognosia of Sin', desc: 'The condition where you cannot perceive your own illness — applied to the soul.' },
      { href: '/psychology-backfire-effect', title: 'The Backfire Effect', desc: 'Why evidence against your beliefs makes you believe them harder.' },
      { href: '/psychology-identity-threat', title: 'Identity Threat', desc: 'Why sovereign grace feels like an attack on who you are.' },
      { href: '/psychology-pride-root-objection', title: 'Pride: The Root Objection', desc: 'Every theological argument against grace is a psychological defense of pride.' },
      { href: '/question-depravity', title: 'Total Depravity', desc: 'The psychology confirms what Scripture already said.' },
      { href: '/philosophy-self-deception', title: 'The Philosophy of Self-Deception', desc: 'How the mind hides from truths the heart cannot bear.' },
    ],
    healing: [
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'Understanding your psychology is humbling. Understanding God\'s choice is healing.' },
      { href: '/devotional-the-secretly-ashamed', title: 'The Secretly Ashamed', desc: 'You know what you are. He knew it first — and chose you anyway.' },
      { href: '/pastoral-assurance', title: 'Assurance of Salvation', desc: 'When psychology reveals your inability, sovereignty becomes your only hope.' },
      { href: '/story-the-person-who-chose-god', title: 'The Person Who Chose God', desc: 'A story about what really happens when someone thinks they chose God.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'Your psychology failed you. His grace did not.' },
    ],
  },
  philosophy: {
    deeper: [
      { href: '/philosophy-infinite-regress-of-choice', title: 'The Infinite Regress of Choice', desc: 'Follow the logic of "I chose God" to its inevitable dead end.' },
      { href: '/philosophy-bootstrap-paradox', title: 'The Bootstrap Paradox', desc: 'Can an effect be its own cause? Libertarian free will requires it.' },
      { href: '/philosophy-munchhausen-trilemma', title: 'The Münchhausen Trilemma', desc: 'Every attempt to ground human autonomy falls into one of three logical traps.' },
      { href: '/systematic-compatibilism', title: 'Compatibilism', desc: 'How divine sovereignty and human responsibility coexist without contradiction.' },
      { href: '/question-faithgift', title: 'Is Faith a Gift?', desc: 'The philosophical argument arrives at the same place as the exegetical one.' },
      { href: '/secular-philosophy-free-will', title: 'Secular Philosophy on Free Will', desc: 'Even secular philosophers cannot defend libertarian free will.' },
    ],
    healing: [
      { href: '/devotional-not-my-will-but-joy', title: 'Not My Will — But Joy', desc: 'The logic leads to surrender. The surrender leads to joy.' },
      { href: '/devotional-love-before-the-world', title: 'Love Before the World', desc: 'Philosophy shows it must be so. Devotion shows why it is beautiful.' },
      { href: '/story-the-room-where-you-chose', title: 'The Room Where You Chose', desc: 'A story about what really happened the day you thought you decided.' },
      { href: '/joy-freedom-of-smallness', title: 'The Freedom of Smallness', desc: 'When you stop trying to be God, you finally get to be human.' },
    ],
  },
  devotional: {
    deeper: [
      { href: '/question-chosen', title: 'Were You Chosen?', desc: 'The comfort you just felt — here is the Scripture behind it.' },
      { href: '/systematic-election', title: 'The Doctrine of Election', desc: 'What you experienced in devotion, theology grounds in Scripture.' },
      { href: '/question-goldchain', title: 'The Golden Chain', desc: 'Foreknown. Predestined. Called. Justified. Glorified. Your chain is unbreakable.' },
      { href: '/pastoral-assurance', title: 'Assurance of Salvation', desc: 'The comfort of grace is not a feeling — it is a fact.' },
      { href: '/question-how-grace-feels', title: 'How Grace Feels', desc: 'What it is like when sovereign grace finally lands in your chest.' },
    ],
    healing: [
      { href: '/question-where-did-your-faith-come-from', title: 'Where Did Your Faith Come From?', desc: 'Now take the comfort deeper — ask where it started.' },
      { href: '/question-depravity', title: 'Total Depravity', desc: 'The grace you love is only as precious as the depth it rescued you from.' },
      { href: '/philosophy-gratitude-test', title: 'The Gratitude Test', desc: 'The deeper you see your inability, the deeper your gratitude becomes.' },
      { href: '/joy-security-changes-everything', title: 'Security Changes Everything', desc: 'The comfort deepens when you see that nothing can remove it.' },
    ],
  },
  story: {
    deeper: [
      { href: '/question-depravity', title: 'Total Depravity', desc: 'The story illustrates what Scripture declares: we are dead in sin.' },
      { href: '/question-faithgift', title: 'Is Faith a Gift?', desc: 'The story you just read — this is the doctrine behind it.' },
      { href: '/systematic-election', title: 'Election', desc: 'The story whispered it. The doctrine declares it.' },
      { href: '/question-chosen', title: 'Were You Chosen?', desc: 'The characters in the story were chosen. So are you.' },
    ],
    healing: [
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'The story pointed to this: you were chosen before the world began.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'Every story of grace ends the same way: He never let go.' },
      { href: '/devotional-love-letter-before-time', title: 'A Love Letter Before Time', desc: 'Your story was written before you were born.' },
      { href: '/joy-staggering-contrast', title: 'The Staggering Contrast', desc: 'The story of grace is always the same: dead, then alive.' },
    ],
  },
  analogy: {
    deeper: [
      { href: '/question-depravity', title: 'Total Depravity', desc: 'The analogy illustrates what the doctrine declares.' },
      { href: '/systematic-hamartiology', title: 'The Doctrine of Sin', desc: 'Behind every analogy lies the theological reality it points to.' },
      { href: '/question-faithgift', title: 'Is Faith a Gift?', desc: 'If the analogy convinced you, here is the Scripture.' },
      { href: '/systematic-election', title: 'Election', desc: 'The analogy pointed to this truth: God chooses, not us.' },
    ],
    healing: [
      { href: '/devotional-rescued-without-a-say', title: 'Rescued Without a Say', desc: 'You did not choose the rescue. That is what makes it grace.' },
      { href: '/devotional-dead-who-live', title: 'The Dead Who Live', desc: 'The analogy showed the death. Here is the resurrection.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'The analogy whispered it. This devotional declares it.' },
    ],
  },
  theologian: {
    deeper: [
      { href: '/history-timeline', title: 'History of Grace', desc: 'See where this theologian fits in the 2,000-year story of sovereign grace.' },
      { href: '/systematic-soteriology', title: 'Soteriology', desc: 'The doctrine this theologian defended with their life.' },
      { href: '/creed-canons-dort', title: 'The Canons of Dort', desc: 'The confession that formalized what grace-believing theologians always knew.' },
      { href: '/systematic-election', title: 'Election', desc: 'The truth at the center of every Reformed theologian\'s work.' },
    ],
    healing: [
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'These theologians pointed to the same truth: you were chosen first.' },
      { href: '/devotional-joy-of-election', title: 'The Joy of Election', desc: 'What these theologians fought for — you get to rest in.' },
      { href: '/joy-no-other-theology', title: 'No Other Theology Offers This', desc: 'Every theologian who saw sovereign grace could never unsee it.' },
    ],
  },
  systematic: {
    deeper: [
      { href: '/systematic-soteriology', title: 'Soteriology — The Full Picture', desc: 'Every doctrine of salvation connected in one unbreakable chain.' },
      { href: '/systematic-ordo-salutis', title: 'The Order of Salvation', desc: 'Regeneration, faith, justification, sanctification — in the right order.' },
      { href: '/question-goldchain', title: 'The Golden Chain', desc: 'Romans 8:29-30 — the five unbreakable links of salvation.' },
      { href: '/systematic-tulip', title: 'The Five Points of Grace', desc: 'The five truths that hold the entire system together.' },
    ],
    healing: [
      { href: '/devotional-in-christ', title: 'In Christ', desc: 'The theology you just studied — here is what it means for your soul.' },
      { href: '/devotional-forever-loved', title: 'Forever Loved', desc: 'The doctrine is the foundation. The devotional is the home built on it.' },
      { href: '/joy-security-changes-everything', title: 'Security Changes Everything', desc: 'Systematic theology is not cold — it is the warmest truth you will ever know.' },
    ],
  },
  secular: {
    deeper: [
      { href: '/question-depravity', title: 'Total Depravity', desc: 'The secular evidence confirms what Scripture already said.' },
      { href: '/psychology-anosognosia-of-sin', title: 'The Anosognosia of Sin', desc: 'Neuroscience meets theology: you cannot perceive your own spiritual blindness.' },
      { href: '/philosophy-infinite-regress-of-choice', title: 'The Infinite Regress', desc: 'Even secular philosophy cannot escape the logic of sovereignty.' },
      { href: '/secular-billion-decisions', title: 'A Billion Decisions You Didn\'t Make', desc: 'The secular evidence for predetermination is staggering.' },
    ],
    healing: [
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'The evidence points to a God who chose you. Here is what that means.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'If even science confirms you cannot save yourself — someone else already did.' },
      { href: '/for-skeptics', title: 'For Skeptics', desc: 'If you followed the evidence here, follow it one step further.' },
    ],
  },
  pastoral: {
    deeper: [
      { href: '/pastoral-assurance', title: 'Assurance of Salvation', desc: 'Pastoral wisdom grounded in the unshakable promise of sovereign grace.' },
      { href: '/pastoral-suffering', title: 'Sovereignty and Suffering', desc: 'How God\'s absolute control becomes your only comfort in pain.' },
      { href: '/systematic-election', title: 'Election', desc: 'The doctrine behind the pastoral comfort.' },
      { href: '/question-how-grace-feels', title: 'How Grace Feels', desc: 'What it is actually like when sovereign grace lands in your chest.' },
    ],
    healing: [
      { href: '/devotional-the-hands-that-hold-you', title: 'The Hands That Hold You', desc: 'Pastoral truth becomes personal truth. You are held.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'The pastoral word you need: He will not let you go.' },
      { href: '/devotional-valley-shadow', title: 'Valley of the Shadow', desc: 'Walking through darkness with a Shepherd who chose to be there.' },
    ],
  },
  comparison: {
    deeper: [
      { href: '/compare-calvinism-arminianism', title: 'Calvinism vs. Arminianism', desc: 'The central comparison that makes all others make sense.' },
      { href: '/systematic-soteriology', title: 'Soteriology', desc: 'The full doctrine behind the comparison.' },
      { href: '/question-faithgift', title: 'Is Faith a Gift?', desc: 'The question that exposes the real difference between every position.' },
      { href: '/compare-monergism-synergism', title: 'Monergism vs. Synergism', desc: 'Does God save alone, or does He need your help?' },
    ],
    healing: [
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'The comparison revealed the truth. Now let the truth hold you.' },
      { href: '/joy-no-other-theology', title: 'No Other Theology Offers This', desc: 'Now you see the difference — and why it matters for your soul.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'Every comparison ends here: grace alone.' },
    ],
  },
  objection: {
    deeper: [
      { href: '/question-depravity', title: 'Total Depravity', desc: 'Every objection to grace traces back to one unexamined assumption.' },
      { href: '/question-faithgift', title: 'Is Faith a Gift?', desc: 'The objection dissolves when you see where faith comes from.' },
      { href: '/psychology-pride-root-objection', title: 'Pride: The Root Objection', desc: 'Why the flesh fights grace — and what that fight reveals.' },
      { href: '/question-romans9', title: 'Romans 9', desc: 'Paul anticipated your objection — and answered it.' },
    ],
    healing: [
      { href: '/devotional-rescued-without-a-say', title: 'Rescued Without a Say', desc: 'Your objection was a defense mechanism. Grace is the cure.' },
      { href: '/pastoral-assurance', title: 'Assurance of Salvation', desc: 'The objection fades when assurance arrives.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'Even your objections cannot make Him let go.' },
    ],
  },
  ot: {
    deeper: [
      { href: '/ot-election', title: 'Election in the Old Testament', desc: 'God choosing His people is the oldest story in the Bible.' },
      { href: '/systematic-election', title: 'The Doctrine of Election', desc: 'The Old Testament stories point to this eternal truth.' },
      { href: '/ot-jacob-esau', title: 'Jacob and Esau', desc: 'The twins who prove election is unconditional.' },
      { href: '/ot-moses-pharaoh', title: 'Moses and Pharaoh', desc: 'God hardened Pharaoh\'s heart. The implications are staggering.' },
    ],
    healing: [
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'God chose Abraham. God chose Jacob. God chose you.' },
      { href: '/devotional-love-before-the-world', title: 'Love Before the World', desc: 'The Old Testament stories all point to one truth: He loved you first.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'He didn\'t give up on Israel. He won\'t give up on you.' },
    ],
  },
  healing: {
    deeper: [
      { href: '/pastoral-assurance', title: 'Assurance of Salvation', desc: 'The healing deepens when assurance becomes unshakable.' },
      { href: '/pastoral-suffering', title: 'Sovereignty and Suffering', desc: 'How God\'s control becomes your only comfort.' },
      { href: '/question-how-grace-feels', title: 'How Grace Feels', desc: 'What sovereign grace actually feels like when it meets your pain.' },
      { href: '/devotional-valley-shadow', title: 'Valley of the Shadow', desc: 'Walking through darkness with a Shepherd who chose to be there.' },
    ],
    healing: [
      { href: '/devotional-the-hands-that-hold-you', title: 'The Hands That Hold You', desc: 'You are hurting. You are held. Both are true.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'He will not let you go. Not now. Not ever.' },
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'He knew this pain was coming — and He chose you anyway.' },
      { href: '/joy-in-suffering', title: 'Joy in Suffering', desc: 'Sovereignty does not remove pain. It gives pain a purpose.' },
    ],
  },
  joy: {
    deeper: [
      { href: '/systematic-election', title: 'The Doctrine of Election', desc: 'The joy you feel — here is the theological bedrock beneath it.' },
      { href: '/question-chosen', title: 'Were You Chosen?', desc: 'The joy deepens the further you trace it to its source.' },
      { href: '/question-goldchain', title: 'The Golden Chain', desc: 'Your joy is anchored in an unbreakable chain of divine purpose.' },
    ],
    healing: [
      { href: '/question-where-did-your-faith-come-from', title: 'Where Did Your Faith Come From?', desc: 'Your joy has a source. Have you traced it all the way back?' },
      { href: '/question-depravity', title: 'Total Depravity', desc: 'The joy of grace is only as deep as the pit it pulled you from.' },
      { href: '/philosophy-gratitude-test', title: 'The Gratitude Test', desc: 'How deep is your joy? It depends on how deep you see your need.' },
    ],
  },
  history: {
    deeper: [
      { href: '/history-timeline', title: 'The Full Timeline', desc: 'Two thousand years of God preserving the truth of sovereign grace.' },
      { href: '/theologians', title: 'The Theologians', desc: 'Meet the men and women who carried the torch through each era.' },
      { href: '/creed-canons-dort', title: 'The Canons of Dort', desc: 'The confession that crystallized what the church always believed.' },
      { href: '/systematic-soteriology', title: 'Soteriology', desc: 'The doctrine that history has been fighting over for 2,000 years.' },
    ],
    healing: [
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'History proves it: God never lets the truth die.' },
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'God chose His people in every century — including yours.' },
      { href: '/joy-no-other-theology', title: 'No Other Theology Offers This', desc: 'History tried every alternative. Sovereign grace is the only one that survives.' },
    ],
  },
  hymn: {
    deeper: [
      { href: '/history-timeline', title: 'History of Grace', desc: 'See the era that produced this hymn.' },
      { href: '/systematic-soteriology', title: 'Soteriology', desc: 'The doctrine the songwriter understood.' },
      { href: '/question-faithgift', title: 'Is Faith a Gift?', desc: 'The hymn confessed it. Scripture confirms it.' },
    ],
    healing: [
      { href: '/devotional-my-chains-fell-away', title: 'My Chains Fell Away', desc: 'The hymn you sang — this devotional lets you feel it again.' },
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'The songwriter knew: grace chose them. It chose you too.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'Every hymn of grace tells the same story: He will not let go.' },
    ],
  },
  scripture: {
    deeper: [
      { href: '/systematic-soteriology', title: 'Soteriology', desc: 'These Scriptures form the backbone of the full doctrine.' },
      { href: '/question-chosen', title: 'Were You Chosen?', desc: 'The Scripture tsunami continues — here is where it converges.' },
      { href: '/systematic-election', title: 'Election', desc: 'The theological framework that holds all these passages together.' },
    ],
    healing: [
      { href: '/devotional-forever-loved', title: 'Forever Loved', desc: 'The Scriptures declared it. Now let it land in your heart.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'Every passage pointed here: He will not let go.' },
    ],
  },
  other: {
    deeper: [
      { href: '/start-here', title: 'Start Here', desc: 'Begin the journey from the beginning.' },
      { href: '/question-where-did-your-faith-come-from', title: 'Where Did Your Faith Come From?', desc: 'The one question that changes everything.' },
    ],
    healing: [
      { href: '/devotional-chosen-before-you-were-broken', title: 'Chosen Before You Were Broken', desc: 'You were chosen before the world began.' },
      { href: '/devotional-never-gives-up', title: 'The God Who Never Gives Up', desc: 'He will never let you go.' },
    ],
  },
};

function buildCard(num, rec) {
  return `        <a href="${rec.href}" class="hub-card">
            <div class="card-number">${String(num).padStart(2, '0')}</div>
            <h4 class="card-title">${rec.title}</h4>
            <p class="card-description">${rec.desc}</p>
            <div class="card-footer">
                <span class="card-read">Read ${arrowSVG}</span>
            </div>
        </a>`;
}

function buildJourneySection(rec1, rec2) {
  return `
    <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border-color);">
        <h3 style="color: var(--accent-gold); margin-bottom: 2rem;">Continue the Journey</h3>
        <div class="hub-grid">
${buildCard(1, rec1)}
${buildCard(2, rec2)}
        </div>
    </div>`;
}

function pickRecommendations(filename, category) {
  const pool = R[category] || R.other;
  const deeperPool = pool.deeper || [];
  const healingPool = pool.healing || pool.comfort || pool.challenge || [];
  const filterSelf = (arr) => arr.filter(r => {
    const target = r.href.replace(/^\//, '').replace(/\.html$/, '');
    const base = filename.replace(/\.html$/, '');
    return target !== base;
  });
  const deeper = filterSelf(deeperPool);
  const healing = filterSelf(healingPool);
  const hash = filename.split('').reduce((h, c) => ((h << 5) - h) + c.charCodeAt(0), 0);
  const pick1 = deeper[Math.abs(hash) % deeper.length] || deeper[0];
  const pick2 = healing[Math.abs(hash * 31) % healing.length] || healing[0];
  if (!pick1 || !pick2) return null;
  if (pick1.href === pick2.href) {
    const alt = healing.find(h => h.href !== pick1.href) || deeper.find(d => d.href !== pick2.href);
    if (alt) return [pick1, alt];
  }
  return [pick1, pick2];
}

// MAIN
const allFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const existingFiles = new Set(allFiles.map(f => f.replace('.html', '')));

const skipPrefixes = ['index', '404', '_nav', 'search', 'sitemap', 'privacy', 'terms', 'contact', 'about',
  'all-content', 'topics', 'connections', 'quiz', 'belief-assessment', 'just-realized', 'best-reads',
  'start-here', 'for-', 'verse-explorer'];

let modified = 0, skipped = 0, errors = [];

for (const file of allFiles) {
  const basename = file.replace('.html', '');
  if (skipPrefixes.some(p => basename.startsWith(p))) continue;
  if (basename.endsWith('-hub')) continue;
  
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf-8');
  
  if (content.includes('Continue the Journey')) { skipped++; continue; }
  
  const category = getCategory(basename);
  const picks = pickRecommendations(basename, category);
  if (!picks) { errors.push(file + ': no recs'); continue; }
  
  // Verify targets
  for (const p of picks) {
    const target = p.href.replace(/^\//, '').replace(/\.html$/, '');
    if (!existingFiles.has(target)) {
      errors.push(file + ': target ' + p.href + ' missing');
    }
  }
  
  const journeyHTML = buildJourneySection(picks[0], picks[1]);
  let inserted = false;
  
  // Insert after </article> before <footer>
  const articleEnd = content.lastIndexOf('</article>');
  if (articleEnd !== -1) {
    const footerAfter = content.indexOf('<footer', articleEnd);
    if (footerAfter !== -1) {
      content = content.slice(0, footerAfter) + journeyHTML + '\n\n    ' + content.slice(footerAfter);
      inserted = true;
    }
  }
  
  if (!inserted) {
    const footerIdx = content.lastIndexOf('<footer');
    if (footerIdx !== -1) {
      content = content.slice(0, footerIdx) + journeyHTML + '\n\n    ' + content.slice(footerIdx);
      inserted = true;
    }
  }
  
  if (!inserted) { errors.push(file + ': no insertion point'); continue; }
  
  fs.writeFileSync(filepath, content, 'utf-8');
  modified++;
}

console.log('\n═══════════════════════════════════════');
console.log('CARTOGRAPHER BATCH RESULTS');
console.log('═══════════════════════════════════════');
console.log('Pages modified: ' + modified);
console.log('Pages skipped (already had journey): ' + skipped);
console.log('Errors: ' + errors.length);
if (errors.length > 0) {
  console.log('\nError details:');
  errors.slice(0, 30).forEach(e => console.log('  - ' + e));
  if (errors.length > 30) console.log('  ... and ' + (errors.length - 30) + ' more');
}
console.log('═══════════════════════════════════════\n');
