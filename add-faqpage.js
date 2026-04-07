#!/usr/bin/env node
// Evangelist: add FAQPage schema to remaining question/demolition pages
const fs = require('fs');

const FAQS = {
  'question-autonomy-audit.html': [
    ['Does free will contradict God\u2019s sovereignty?', 'Libertarian free will \u2014 the idea that a choice must be uncaused by anything prior to count as "free" \u2014 cannot coexist with God\u2019s exhaustive foreknowledge and decree. If God knew infallibly what you would choose before you existed (Isaiah 46:9-10), then the outcome was fixed before you acted. Either His knowledge is derivative of your choices (you author history) or His knowledge is limited. Scripture affirms neither.'],
    ['Is libertarian free will logically consistent?', 'No. An uncaused choice is not "free" \u2014 it\u2019s random. A caused choice is determined by the cause. There is no third option. The Autonomy Audit walks through seven concrete scenarios that expose the hidden contradictions in the libertarian position and show that compatibilist freedom (you always choose what you most want, and God governs what you most want) is the only coherent account.'],
  ],
  'question-faith-origin-test.html': [
    ['Where does saving faith come from \u2014 God or me?', 'Scripture calls faith a gift of God (Ephesians 2:8-9, Philippians 1:29). It is received, not manufactured. If you generated your own faith, then your faith is a work \u2014 and works cannot save. The Faith Origin Test walks you through the logic: either God caused your faith or you activated it. There is no middle ground.'],
    ['Is believing the gospel a work?', 'Believing is not a work when it is recognized as a gift (Ephesians 2:8-9). But if you claim credit for believing \u2014 if you insist your decision was the decisive factor \u2014 you have turned faith into a work. That is the trap the test exposes.'],
  ],
  'question-repentance-total-depravity.html': [
    ['Can a person repent without first believing total depravity?', 'No one repents perfectly or understands their depravity completely at conversion. But genuine repentance requires acknowledging that you are a sinner who cannot save yourself. The more deeply you see your depravity, the more deeply you cling to grace. Rejecting total depravity does not prevent initial repentance \u2014 but it does prevent its full fruit.'],
    ['What does total depravity mean for repentance?', 'Total depravity means every faculty of the human person is corrupted by sin \u2014 including the will. A truly repentant heart does not merely feel sorry; it confesses helplessness. Repentance that still believes "I can fix myself if I try harder" is not biblical repentance \u2014 it is works-righteousness in a penitent disguise.'],
  ],
  'question-visual-theology.html': [
    ['How does the logic of sovereign grace work?', 'Every point of sovereign grace follows from a single premise: dead people cannot save themselves. If man is dead in sin (Ephesians 2:1), then God must choose him (unconditional election), Christ must die specifically for him (definite atonement), the Spirit must raise him (irresistible grace), and God must preserve him (perseverance). Remove depravity and the whole system collapses into Arminianism. Keep it and every other point follows.'],
    ['What is the simplest argument for Calvinism?', 'Scripture teaches it is God who causes us to be born again (1 Peter 1:3), God who grants faith (Philippians 1:29), God who draws us (John 6:44), and God who keeps us (Philippians 1:6). If every stage of salvation is God\u2019s initiative, then the whole of salvation is grace \u2014 not our decision plus God\u2019s help.'],
  ],
  'demolition-ezekiel18-23.html': [
    ['Does Ezekiel 18:23 disprove predestination?', 'No. Ezekiel 18:23 expresses God\u2019s revealed will \u2014 the moral posture of a God who does not delight in destruction \u2014 not His decretive will (what He has determined). Scripture distinguishes between what God commands and what God decrees. God takes no pleasure in the death of the wicked, yet He sovereignly hardens Pharaoh (Romans 9:17-18) and gives sinners over to their rebellion (Romans 1:24-28). Both are true.'],
    ['What is the difference between God\u2019s revealed will and His decretive will?', 'God\u2019s revealed will is what He commands and what pleases His moral character. His decretive will is what He has ordained will come to pass. God commands all people everywhere to repent (Acts 17:30, revealed will) while also sovereignly determining who will repent (Acts 13:48, decretive will). Ezekiel 18:23 belongs to the first category.'],
  ],
};

function esc(s) { return s.replace(/"/g, '\\"'); }

let added = 0;
for (const [file, faqs] of Object.entries(FAQS)) {
  if (!fs.existsSync(file)) { console.log(`SKIP missing: ${file}`); continue; }
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('"FAQPage"')) { console.log(`SKIP already has: ${file}`); continue; }

  const entities = faqs.map(([q, a]) => `            {
                "@type": "Question",
                "name": "${esc(q)}",
                "acceptedAnswer": {"@type": "Answer", "text": "${esc(a)}"}
            }`).join(',\n');

  const schema = `    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
${entities}
        ]
    }
    </script>
`;

  html = html.replace('</head>', schema + '</head>');
  fs.writeFileSync(file, html);
  added++;
  console.log(`✅ ${file}`);
}
console.log(`\nAdded FAQPage schema to ${added} pages`);
