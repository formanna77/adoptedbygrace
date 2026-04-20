#!/usr/bin/env node
/**
 * rescue-catches.js
 *
 * Inserts contextually-tuned catch-arm sections into the 7 demolition pages
 * flagged FAILING by audit-two-arms.js. Each catch is individually written to
 * bridge from the specific argument the page just made to the specific
 * devotional comfort the reader needs next.
 *
 * Two Arms doctrine: demolition without catch = despair. Never ship one arm
 * without the other.
 *
 * Insertion point: immediately after the main </article>, before whatever
 * follows (related-articles section or footer). Idempotent — detects its own
 * marker and skips.
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = '/sessions/tender-eloquent-johnson/mnt/adoptedbygracewebsite';
const MARKER = '<!-- CATCH-ARM-INSERTED -->';

// Each rescue is hand-tuned. The heading, bridge prose, and devotional picks
// mirror the emotional landing of that specific page's final paragraph.
const RESCUES = {
  'demolition-acts7-51.html': {
    heading: 'If you stopped — come here.',
    bridge:
      "The Sanhedrin fought and went home to die in their beds. You stopped. Not because you were clever, but because He would not let you lose. What holds a person who has stopped resisting? Read this.",
    cards: [
      {
        href: '/devotional-never-gives-up',
        title: 'He Will Not Let You Lose',
        desc: "If grace chose you, grace will keep you. The pursuit that reached you will not release you.",
      },
      {
        href: '/devotional-my-chains-fell-away',
        title: 'My Chains Fell Away',
        desc: "The moment resistance dies and hands that were fists become open is the moment you discover whose hand was already holding yours.",
      },
    ],
  },
  'demolition-joshua24-15.html': {
    heading: 'If the trembling feels like His voice — it is.',
    bridge:
      "The hand that signed your name in the Lamb's book before the stars were lit is the same hand that, in time, reached into the dust of your chest. You did not find Him. He found you. Here is what that means.",
    cards: [
      {
        href: '/devotional-chosen-before-you-were-broken',
        title: 'Chosen Before You Were Broken',
        desc: "Before Shechem. Before Calvary. Before you drew breath. He was already saying — mine.",
      },
      {
        href: '/devotional-love-letter-before-time',
        title: 'A Love Letter Before Time',
        desc: "What it means that your name was written on the other side of the foundation of the world.",
      },
    ],
  },
  'question-external-internal-call.html': {
    heading: 'That call has never been recalled.',
    bridge:
      "He called you from the inside out — and what was spoken into the cold air of your dead heart is not a message He retracts. The voice that woke you is the voice that keeps you. Read this.",
    cards: [
      {
        href: '/devotional-the-hands-that-hold-you',
        title: 'The Hands That Hold You',
        desc: "You do not hold onto God. God holds onto you. And the hands that called you are the hands that carry you home.",
      },
      {
        href: '/devotional-never-gives-up',
        title: 'He Never Gives Up',
        desc: "The internal call that raised you is the same call still sounding. He does not make beginnings He intends to abandon.",
      },
    ],
  },
  'question-freewill.html': {
    heading: 'The drawer opened. You breathed. Now breathe deeper.',
    bridge:
      "A voice spoke your name into the cold air before you were born, and the word has never stopped echoing. What you called 'my decision' was the drawer sliding open at the sound of your name. Read about the One who said it.",
    cards: [
      {
        href: '/devotional-rescued-without-a-say',
        title: 'Rescued Without a Say',
        desc: "The body in the drawer did not vote. It was raised. And the One who raised it is singing your name even now.",
      },
      {
        href: '/devotional-chosen-before-you-were-broken',
        title: 'Chosen Before You Were Broken',
        desc: "Your name was on His lips before your lungs ever drew a breath. That is why the drawer opened when He spoke.",
      },
    ],
  },
  'question-hardening.html': {
    heading: 'The prickle at the back of your neck is the softening.',
    bridge:
      "Hard hearts feel nothing at doctrine. The fact that you are still here, still unsettled, is the evidence that irresistible grace has not finished with you. What He starts, He finishes.",
    cards: [
      {
        href: '/devotional-my-chains-fell-away',
        title: 'My Chains Fell Away',
        desc: "The breaking has already begun. The discomfort you feel is the softening happening in real time. This is what that looks like.",
      },
      {
        href: '/devotional-the-hands-that-hold-you',
        title: 'The Hands That Hold You',
        desc: "If you are His, you are held. The softening is His work, and the hands doing it are the hands that will never let go.",
      },
    ],
  },
  'question-matt11.html': {
    heading: 'The mouth saying thank you is saying your name.',
    bridge:
      "The Father hid these things from the wise and revealed them to the little ones — and the hand that hid them is the same hand now resting on your head. You are the revelation. Read this.",
    cards: [
      {
        href: '/devotional-love-letter-before-time',
        title: 'A Love Letter Before Time',
        desc: "The revelation given to you was written before the world began. You are not discovering it — it is disclosing you.",
      },
      {
        href: '/devotional-the-prayer-you-didnt-pray',
        title: 'The Prayer You Didn\u2019t Pray',
        desc: "Before you asked, He answered. The thanksgiving of Jesus in Matthew 11 is a prayer prayed over your name.",
      },
    ],
  },
  'question-titus3.html': {
    heading: 'He did it all. From the first link to the last.',
    bridge:
      "You did not choose the buyer. You did not hand Him the coin. You did not so much as lift your head when He arrived. He arrived anyway. The cloak is on your shoulders. The sun is on your face. He is walking you home.",
    cards: [
      {
        href: '/devotional-rescued-without-a-say',
        title: 'Rescued Without a Say',
        desc: "What it means that you were saved before you agreed — and why that is the only kind of salvation a slave could receive.",
      },
      {
        href: '/devotional-the-hands-that-hold-you',
        title: 'The Hands That Hold You',
        desc: "The hand that paid the price is the hand that is walking you home. And it does not let go.",
      },
    ],
  },
  // ───────── WEAK PAGES (catch present but not in final 25%) ─────────
  'demolition-arianism.html': {
    heading: 'Arianism undone. And now — you.',
    bridge:
      "A Christ who is less than fully God is a Christ who cannot save. And the Christ who IS fully God did not die for hypotheticals. He died for names. If your heart just bowed at that — come here next.",
    cards: [
      {
        href: '/devotional-love-letter-before-time',
        title: 'A Love Letter Before Time',
        desc: "The eternal Son wrote your name on the other side of the universe's first breath. That is the love Arianism could never account for.",
      },
      {
        href: '/devotional-never-gives-up',
        title: 'He Never Gives Up',
        desc: "Only a Christ who is fully God can rescue and keep what He chose. And He does.",
      },
    ],
  },
  'philosophy-what-if-wrong.html': {
    heading: 'Land here. Stop scanning for the exit.',
    bridge:
      "The scan for a third option is itself the identity protection you started this page with. You are not resisting a logical argument — you are resisting the conclusion that your safety depends on Someone other than yourself. The relief on the other side of that surrender is real. Read it.",
    cards: [
      {
        href: '/devotional-the-hands-that-hold-you',
        title: 'The Hands That Hold You',
        desc: "The safety you were scanning for is not a third option. It is a Person. And He already has you.",
      },
      {
        href: '/devotional-rescued-without-a-say',
        title: 'Rescued Without a Say',
        desc: "The wager is not between two options you control. It is between a salvation you did not earn and a ruin you already did. Only one of those is good news.",
      },
    ],
  },
  'psychology-addiction-proof.html': {
    heading: 'Step 1, extended to the human race.',
    bridge:
      "We admit we are powerless over sin — and that our lives have become unmanageable. Every honest person in that room knew they could not save themselves. Every honest soul anywhere has always known the same. Here is what happens next.",
    cards: [
      {
        href: '/devotional-rescued-without-a-say',
        title: 'Rescued Without a Say',
        desc: "Step 1 is a theological statement. It says salvation happens to you, not by you. That is precisely the gospel.",
      },
      {
        href: '/devotional-never-gives-up',
        title: 'He Never Gives Up',
        desc: "For the person still in the folding chair wondering if they are too far gone — this devotional was written for you.",
      },
    ],
  },
  'question-2tim1-9.html': {
    heading: 'Seven words. Land here.',
    bridge:
      "Paul did not write those seven words to win an argument with a sixteenth-century theologian. He wrote them so that twenty centuries later, on this screen, the floor of self-effort would give way beneath you and you would land in the arms of a God whose purpose for you was settled before the first molecule of you existed.",
    cards: [
      {
        href: '/devotional-chosen-before-you-were-broken',
        title: 'Chosen Before You Were Broken',
        desc: "Before the beginning of time — that is the location of His purpose for you. Every fear that He might change His mind is answered by that sentence.",
      },
      {
        href: '/devotional-love-letter-before-time',
        title: 'A Love Letter Before Time',
        desc: "The grace given to you was given before time began. You are not receiving it now — you are discovering what was always yours.",
      },
    ],
  },
  'question-acts4.html': {
    heading: 'Your knees have always been Reformed.',
    bridge:
      "The theology is still wrestling on the thinking side. Fine. Let it wrestle. But when you pray for your son, your mother, your friend — your knees already know. The only question is whether your head will catch up with what your heart has been asking for all along.",
    cards: [
      {
        href: '/devotional-the-prayer-you-didnt-pray',
        title: "The Prayer You Didn\u2019t Pray",
        desc: "Every honest prayer is a prayer to a sovereign God. The knees know what the theology is still denying. Here is what that means.",
      },
      {
        href: '/devotional-never-gives-up',
        title: 'He Never Gives Up',
        desc: "The God your knees pray to is the God who does not let go — of you, of the one you pray for, of the purpose He set before time.",
      },
    ],
  },
  'question-external-call.html': {
    heading: 'Tremble at the mercy that opened you.',
    bridge:
      "The next time someone walks out of that pew unchanged, do not pity them from above. Tremble at the mercy that reached down and opened what was closed in you — and pray the same hand reaches for them next.",
    cards: [
      {
        href: '/devotional-my-chains-fell-away',
        title: 'My Chains Fell Away',
        desc: "What does it feel like when the internal call reaches what the external call cannot? This is what that moment looks like from the inside.",
      },
      {
        href: '/devotional-never-gives-up',
        title: 'He Never Gives Up',
        desc: "If He opened you, He keeps you. The same hand that reached for you is the hand that will not release you.",
      },
    ],
  },
  'secular-history-sovereignty.html': {
    heading: 'Twenty-five centuries point one direction.',
    bridge:
      "Every honest philosopher ends up in the same place: we are not the ultimate authors of ourselves. Game theory, market failures, compatibilism — they all describe the terrain Scripture mapped first. And the God who mapped it has a name. Read what happens when He speaks it.",
    cards: [
      {
        href: '/devotional-love-letter-before-time',
        title: 'A Love Letter Before Time',
        desc: "The sovereignty the philosophers could only infer is the love the Scriptures declare. Before time — He chose you by name.",
      },
      {
        href: '/devotional-joy-of-election',
        title: 'The Joy of Election',
        desc: "Fifteen years of reeling at sovereignty before seeing that no other perspective offers greater joy. This is the landing.",
      },
    ],
  },
};

const ARROW_SVG =
  '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>';

function buildCatchBlock(rescue) {
  const cards = rescue.cards
    .map(
      (c, i) => `        <a href="${c.href}" class="hub-card">
            <div class="card-number">${String(i + 1).padStart(2, '0')}</div>
            <h4 class="card-title">${c.title}</h4>
            <p class="card-description">${c.desc}</p>
            <div class="card-footer">
                <span class="card-read">Read ${ARROW_SVG}</span>
            </div>
        </a>`
    )
    .join('\n');

  return `
${MARKER}
<section class="article-catch-arm" style="max-width: 1200px; margin: 4rem auto 2rem; padding: 0 2rem;">
    <div style="padding-top: 2.5rem; border-top: 1px solid var(--border-color);">
        <h3 style="color: var(--accent-gold); margin-bottom: 1rem; font-size: 1.5rem;">${rescue.heading}</h3>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; font-style: italic; max-width: 52rem;">${rescue.bridge}</p>
        <div class="hub-grid">
${cards}
        </div>
    </div>
</section>
`;
}

function rescue(file) {
  const fullPath = path.join(SITE_DIR, file);
  let html = fs.readFileSync(fullPath, 'utf8');

  if (html.includes(MARKER)) {
    return { file, status: 'already-inserted' };
  }

  const rescueSpec = RESCUES[file];
  if (!rescueSpec) return { file, status: 'no-spec' };

  const catchBlock = buildCatchBlock(rescueSpec);

  // Strategy: find the LAST </article> before the footer. For pages with
  // <!-- RELATED-ARTICLES-START --> we want to insert BEFORE that section so
  // the hand-tuned catch appears first. Otherwise insert just before <footer>.
  let inserted = false;
  const relatedMarker = '<!-- RELATED-ARTICLES-START -->';
  if (html.includes(relatedMarker)) {
    html = html.replace(relatedMarker, catchBlock + '\n' + relatedMarker);
    inserted = true;
  } else {
    // Insert before <footer>, after the last </article>
    const lastArticleClose = html.lastIndexOf('</article>');
    const footerIdx = html.indexOf('<footer', lastArticleClose);
    if (lastArticleClose !== -1 && footerIdx !== -1) {
      html =
        html.slice(0, footerIdx) +
        catchBlock +
        '\n' +
        html.slice(footerIdx);
      inserted = true;
    }
  }

  if (!inserted) return { file, status: 'insertion-point-not-found' };

  fs.writeFileSync(fullPath, html);
  return { file, status: 'rescued' };
}

function main() {
  console.log('─'.repeat(60));
  console.log('RESCUE CATCHES — inserting contextual catch-arm sections');
  console.log('─'.repeat(60));
  const results = Object.keys(RESCUES).map(rescue);
  for (const r of results) {
    const glyph =
      r.status === 'rescued' ? '✓' : r.status === 'already-inserted' ? '·' : '✗';
    console.log(`  ${glyph}  ${r.file} — ${r.status}`);
  }
  console.log('─'.repeat(60));
  const rescued = results.filter(r => r.status === 'rescued').length;
  console.log(`Rescued: ${rescued} / ${results.length}`);
}

main();
