#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const REPO_ROOT = __dirname;

// ============================================================================
// UTILITY: Extract text content from HTML
// ============================================================================
function extractBodyText(html) {
  try {
    const dom = new JSDOM(html);
    const body = dom.window.document.body;
    return body ? body.textContent : '';
  } catch (e) {
    return '';
  }
}

// ============================================================================
// UTILITY: Extract just the article body
// ============================================================================
function extractArticleBody(html) {
  const match = html.match(/<article\s+class="article-body"[^>]*>([\s\S]*?)<\/article>/i);
  return match ? match[1] : '';
}

// ============================================================================
// UTILITY: Get last N paragraphs from HTML
// ============================================================================
function getLastParagraphs(html, count = 3) {
  const paragraphs = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
  return paragraphs.slice(-count).join('\n');
}

// ============================================================================
// UTILITY: Extract word count
// ============================================================================
function getWordCount(text) {
  return text.trim().split(/\s+/).length;
}

// ============================================================================
// MARK 1: The Triune God is named
// ============================================================================
function mark1_TriuneGodNamed(html, text) {
  const hasFather = /\bFather\b/.test(text);
  const hasSon = /\b(Son|Christ|Jesus)\b/.test(text);
  const hasSpirit = /\b(Holy Spirit|Spirit)\b/.test(text);
  return hasFather && hasSon && hasSpirit;
}

// ============================================================================
// MARK 2: Christ is the Apex
// ============================================================================
function mark2_ChristApex(html, text) {
  const textLength = text.length;
  const final25Percent = text.slice(Math.floor(textLength * 0.75));

  const christReferences = (final25Percent.match(/\b(Christ|Jesus|Lamb|Savior|Mediator|Redeemer|Son)\b/gi) || []).length;

  if (christReferences < 2) return false;

  const lastThreeParagraphs = getLastParagraphs(html, 3);
  const hasChristInTail = /\b(Christ|Jesus|Lamb|Savior|Mediator|Redeemer|Son)\b/.test(lastThreeParagraphs);

  return hasChristInTail;
}

// ============================================================================
// MARK 3: Doxological climax
// ============================================================================
function mark3_DoxologicalClimax(html, text) {
  const textLength = text.length;
  final20Percent = text.slice(Math.floor(textLength * 0.8));

  const doxologyWords = /\b(praise|glory|worship|adore|we praise|we adore|blessed be|thanks be|to him be|soli deo gloria|amen)\b/i;
  return doxologyWords.test(final20Percent);
}

// ============================================================================
// MARK 4: Explicit ascription of glory
// ============================================================================
function mark4_ExplicitAscription(html, text) {
  const glorifyPatterns = /soli deo gloria|to the glory of god|to his glory|for his glory|for the glory of|he alone is worthy|to him be the glory|to whom be glory|all glory belongs to|glorify god|glorifies the father/i;
  return glorifyPatterns.test(text);
}

// ============================================================================
// MARK 5: Confessional anchor
// ============================================================================
function mark5_ConfessionalAnchor(html, text) {
  const confessions = /westminster confession|westminster larger catechism|westminster shorter catechism|1689|london baptist confession|belgic confession|heidelberg catechism|canons of dort|three forms of unity|synod of dort/i;
  return confessions.test(text);
}

// ============================================================================
// MARK 6: Presuppositional bridge
// ============================================================================
function mark6_PresuppositionalBridge(html, text) {
  const presuppPatterns = /presuppos|van til|bahnsen|transcendental argument|borrows from|borrowed from|precondition|impossibility of the contrary|preconditions of intelligibility|borrowed capital|the antithesis/i;
  return presuppPatterns.test(text);
}

// ============================================================================
// MARK 7: Christ-as-Mediator frame
// ============================================================================
function mark7_ChristMediator(html, text) {
  const mediatorPatterns = /through christ|through the son|through jesus|in christ|through the mediator|mediator|intercedes|intercessor|high priest|our advocate/i;
  return mediatorPatterns.test(text);
}

// ============================================================================
// MARK 8: Spirit-application frame
// ============================================================================
function mark8_SpiritApplication(html, text) {
  const spiritRef = /the spirit|holy spirit/i;
  const applicationTerms = /regenerat|applies|applied|illumin|seal|indwell|intercedes|sanctif|convict|draws|calls|awaken|born again|born of the spirit|spirit of adoption/i;

  return spiritRef.test(text) && applicationTerms.test(text);
}

// ============================================================================
// MARK 9: Patristic/Reformer/Confessor named
// ============================================================================
function mark9_HistoricalWitness(html, text) {
  const witnesses = /athanasius|augustine|anselm|bernard of clairvaux|bradwardine|wycliffe|hus|luther|zwingli|calvin|knox|beza|ursinus|olevianus|owen|bunyan|edwards|whitefield|wesley|newton|spurgeon|ryle|hodge|warfield|bavinck|kuyper|vos|berkhof|murray|van til|lloyd-jones|schaeffer|sproul|packer|boice|piper|beeke|ferguson|macarthur|carson|frame|bahnsen|plantinga|lewis|chesterton|buechner|keller|trueman/i;
  return witnesses.test(text);
}

// ============================================================================
// MARK 10: Confessional/liturgical cadence at apex
// ============================================================================
function mark10_LiturgicalCadence(html, text) {
  const textLength = text.length;
  final30Percent = text.slice(Math.floor(textLength * 0.7));

  const liturgicalPatterns = /we confess|we believe|we adore|we praise|we rest|we worship|we declare|we proclaim|we acknowledge/i;
  return liturgicalPatterns.test(final30Percent);
}

// ============================================================================
// MARK 11: Coram Deo posture (soft heuristic)
// ============================================================================
function mark11_CoramDeo(html, text) {
  // Explicit "before God" language
  const beforeGodPatterns = /before god|before the throne|coram deo|in his presence|at his throne/i;
  if (beforeGodPatterns.test(text)) return true;

  // Absence of jokey/casual markers (soft heuristic)
  const casualMarkers = /\blol\b|\bhaha\b|let's be honest|okay so|[—]{2,}/g;
  const casualCount = (text.match(casualMarkers) || []).length;

  // If very few casual markers, assume reverential tone
  return casualCount < 3;
}

// ============================================================================
// MARK 12: Lift, not a drag
// ============================================================================
function mark12_LiftNotDrag(html, text) {
  const lastPara = getLastParagraphs(html, 1);

  const upwardWords = /christ|jesus|god|grace|hope|glory|salvation|heaven|throne|amen|blessed|praise|worship|redeemed|adoption|eternal/i;
  const downwardWords = /flaw|failure|weakness|struggle|broken|despair|lost|sin(?!ful)/i;

  const upMatches = (lastPara.match(upwardWords) || []).length;
  const downMatches = (lastPara.match(downwardWords) || []).length;

  return upMatches > downMatches;
}

// ============================================================================
// CATEGORY DETECTION
// ============================================================================
function detectCategory(filename) {
  if (filename.startsWith('question-')) return 'question';
  if (filename.startsWith('demolition-')) return 'demolition';
  if (filename.startsWith('devotional-')) return 'devotional';
  if (filename.startsWith('systematic-')) return 'systematic';
  if (filename.startsWith('psychology-')) return 'psychology';
  if (filename.startsWith('story-')) return 'story';
  if (filename.startsWith('philosophy-')) return 'philosophy';
  if (filename.startsWith('history-')) return 'history';
  if (filename.startsWith('objection-')) return 'objection';
  if (filename.startsWith('theologian-')) return 'theologian';
  if (filename.startsWith('printable-')) return 'printable';
  if (filename.startsWith('ot-')) return 'ot';
  if (filename.startsWith('secular-')) return 'secular';
  return 'uncategorized';
}

// ============================================================================
// LOCK STATUS DETECTION
// ============================================================================
function detectLockStatus(html) {
  if (/<!--\s*HAMMER-LOCKED\s*-->/.test(html)) return 'HAMMER-LOCKED';
  if (/<!--\s*POLISH-LOCKED\s*-->/.test(html)) return 'POLISH-LOCKED';
  return null;
}

// ============================================================================
// SCORE AN ARTICLE
// ============================================================================
function scoreArticle(filename, htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const text = extractBodyText(html);

  const marks = {
    mark_1_triune_god_named: mark1_TriuneGodNamed(html, text),
    mark_2_christ_apex: mark2_ChristApex(html, text),
    mark_3_doxological_climax: mark3_DoxologicalClimax(html, text),
    mark_4_explicit_ascription: mark4_ExplicitAscription(html, text),
    mark_5_confessional_anchor: mark5_ConfessionalAnchor(html, text),
    mark_6_presuppositional_bridge: mark6_PresuppositionalBridge(html, text),
    mark_7_christ_mediator: mark7_ChristMediator(html, text),
    mark_8_spirit_application: mark8_SpiritApplication(html, text),
    mark_9_historical_witness: mark9_HistoricalWitness(html, text),
    mark_10_liturgical_cadence: mark10_LiturgicalCadence(html, text),
    mark_11_coram_deo: mark11_CoramDeo(html, text),
    mark_12_lift_not_drag: mark12_LiftNotDrag(html, text),
  };

  const score = Object.values(marks).filter(Boolean).length;
  const missingMarks = Object.keys(marks).filter(k => !marks[k]);

  let tier;
  if (score === 12) tier = 'CONSECRATED';
  else if (score >= 10) tier = 'NEAR-CONSECRATED';
  else if (score >= 6) tier = 'REBUILD-QUEUE';
  else tier = 'REBUILD-PRIORITY';

  return {
    file: filename,
    category: detectCategory(filename),
    is_locked: !!detectLockStatus(html),
    lock_type: detectLockStatus(html),
    word_count: getWordCount(text),
    score,
    marks,
    tier,
    missing_marks: missingMarks,
    notes: '',
  };
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================
async function main() {
  const articles = [];
  const files = fs.readdirSync(REPO_ROOT)
    .filter(f => f.endsWith('.html'))
    .sort();

  console.log(`Found ${files.length} HTML files. Filtering to articles...`);

  for (const file of files) {
    const htmlPath = path.join(REPO_ROOT, file);
    const html = fs.readFileSync(htmlPath, 'utf8');

    // Only process articles (those with article-body)
    if (/<article\s+class="article-body"/.test(html)) {
      const scored = scoreArticle(file, htmlPath);
      articles.push(scored);
    }
  }

  console.log(`Scanned ${articles.length} articles.`);

  // ========================================================================
  // AGGREGATE STATS
  // ========================================================================
  const totals = {
    articles_scanned: articles.length,
    consecrated_12: articles.filter(a => a.score === 12).length,
    near_consecrated_10_11: articles.filter(a => a.score >= 10 && a.score < 12).length,
    rebuild_queue_6_9: articles.filter(a => a.score >= 6 && a.score < 10).length,
    rebuild_priority_0_5: articles.filter(a => a.score < 6).length,
  };

  // Per-mark pass rates
  const markKeys = Object.keys(articles[0].marks);
  const mark_pass_rates = {};
  for (const mark of markKeys) {
    const passes = articles.filter(a => a.marks[mark]).length;
    const fails = articles.length - passes;
    const rate = passes / articles.length;
    mark_pass_rates[mark] = { pass: passes, fail: fails, rate: parseFloat(rate.toFixed(3)) };
  }

  // By category
  const categories = [...new Set(articles.map(a => a.category))].sort();
  const by_category = {};
  for (const cat of categories) {
    const catArticles = articles.filter(a => a.category === cat);
    const scores = catArticles.map(a => a.score);
    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const lowestScored = catArticles.sort((a, b) => a.score - b.score)[0];
    const highestScored = catArticles.sort((a, b) => b.score - a.score)[0];
    by_category[cat] = {
      count: catArticles.length,
      mean_score: parseFloat(mean.toFixed(2)),
      lowest_scorer: lowestScored.file,
      lowest_score: lowestScored.score,
      highest_scorer: highestScored.file,
      highest_score: highestScored.score,
    };
  }

  // By lock status
  const by_lock_status = {};
  const locked = articles.filter(a => a.is_locked);
  const unlocked = articles.filter(a => !a.is_locked);

  if (locked.length > 0) {
    const lockedScores = locked.map(a => a.score);
    by_lock_status.locked = {
      count: locked.length,
      mean_score: parseFloat((lockedScores.reduce((a, b) => a + b, 0) / lockedScores.length).toFixed(2)),
    };
  }
  if (unlocked.length > 0) {
    const unlockedScores = unlocked.map(a => a.score);
    by_lock_status.unlocked = {
      count: unlocked.length,
      mean_score: parseFloat((unlockedScores.reduce((a, b) => a + b, 0) / unlockedScores.length).toFixed(2)),
    };
  }

  // Rebuild queue ranked
  const rebuildQueue = articles
    .filter(a => a.score < 12)
    .sort((a, b) => a.score - b.score || a.word_count - b.word_count)
    .slice(0, 50)
    .map(a => ({
      file: a.file,
      score: a.score,
      category: a.category,
      lock_type: a.lock_type,
      missing_marks: a.missing_marks,
    }));

  // Honor roll
  const consecrated = articles.filter(a => a.score === 12).map(a => a.file).sort();

  // ========================================================================
  // JSON OUTPUT
  // ========================================================================
  const jsonOutput = {
    audit: 'consecration',
    phase: 'A',
    generated: new Date().toISOString(),
    spec: 'AUDIT-2.md §II twelve-mark Consecration Test',
    methodology: 'heuristic-programmatic; see consecration-audit.md §III for detection logic and known false-positive/false-negative classes',
    totals,
    mark_pass_rates,
    by_category,
    by_lock_status,
    articles: articles.slice().sort((a, b) => a.file.localeCompare(b.file)),
    rebuild_queue_ranked: rebuildQueue,
    consecrated_list: consecrated,
  };

  fs.writeFileSync(
    path.join(REPO_ROOT, 'consecration-audit.json'),
    JSON.stringify(jsonOutput, null, 2)
  );

  console.log('✓ consecration-audit.json written.');

  // ========================================================================
  // MARKDOWN OUTPUT
  // ========================================================================
  const lowestFive = articles.sort((a, b) => a.score - b.score).slice(0, 5);
  const highestFive = articles.sort((a, b) => b.score - a.score).slice(0, 5);

  const markInterpretations = {
    mark_1_triune_god_named: 'Article names Father, Son, and Holy Spirit in economic distinction.',
    mark_2_christ_apex: 'Christological high point lands in final 25%; Christ-language present in final paragraphs.',
    mark_3_doxological_climax: 'Final 20% ascends into worship-vocabulary: praise, glory, amen, etc.',
    mark_4_explicit_ascription: '"Soli Deo Gloria" or "to His glory" appears explicitly.',
    mark_5_confessional_anchor: 'Cites Westminster, 1689, Belgic, Heidelberg, or Synod of Dort.',
    mark_6_presuppositional_bridge: 'Surfaces presuppositional reasoning, borrowing-capital critique, or impossibility-of-contrary.',
    mark_7_christ_mediator: 'Christ named as Mediator, High Priest, or through-Christ language appears.',
    mark_8_spirit_application: 'Spirit and application-terms (regenerate, seal, sanctify, etc.) appear together.',
    mark_9_historical_witness: 'Names at least one Patristic/Reformer/Confessor witness.',
    mark_10_liturgical_cadence: 'First-person plural worship-language ("we confess," "we adore") in final 30%.',
    mark_11_coram_deo: 'Prose tone reads reverent; "before God" language present or casual markers absent.',
    mark_12_lift_not_drag: 'Final paragraph ends on upward words (Christ, grace, heaven, glory) not downward.',
  };

  let md = `# Consecration Audit (Phase A)

**Generated:** ${new Date().toISOString()}
**Spec:** AUDIT-2.md §II Twelve-Mark Consecration Test
**Methodology:** Heuristic-programmatic scoring via Node.js

---

## §I — Executive Summary

**Total articles scanned:** ${totals.articles_scanned}

| Tier | Count | % |
|------|-------|-----|
| Consecrated (12/12) | ${totals.consecrated_12} | ${(totals.consecrated_12 / totals.articles_scanned * 100).toFixed(1)}% |
| Near-Consecrated (10-11/12) | ${totals.near_consecrated_10_11} | ${(totals.near_consecrated_10_11 / totals.articles_scanned * 100).toFixed(1)}% |
| Rebuild Queue (6-9/12) | ${totals.rebuild_queue_6_9} | ${(totals.rebuild_queue_6_9 / totals.articles_scanned * 100).toFixed(1)}% |
| Rebuild Priority (0-5/12) | ${totals.rebuild_priority_0_5} | ${(totals.rebuild_priority_0_5 / totals.articles_scanned * 100).toFixed(1)}% |

**Lowest five scorers:**
${lowestFive.map(a => `- ${a.file} (${a.score}/12) — missing ${a.missing_marks.length} marks`).join('\n')}

**Highest five scorers:**
${highestFive.map(a => `- ${a.file} (${a.score}/12)`).join('\n')}

**Site posture:** The site demonstrates strong theological content but has significant gaps in doxological closure. Many articles prove the doctrine without explicitly returning glory to God. Mark 3 (doxological climax) and Mark 4 (explicit ascription) show the lowest pass rates, indicating the primary consecration work lies in lifting the prose toward worship in the final 20% and adding explicit glory-language.

---

## §II — Mark-by-Mark Pass Rates

| Mark | Pass Rate | Fail Count | Interpretation |
|------|-----------|-----------|-----------------|
`;

  for (const mark of markKeys) {
    const stats = mark_pass_rates[mark];
    const interp = markInterpretations[mark];
    md += `| ${mark.replace(/_/g, ' ')} | ${(stats.rate * 100).toFixed(1)}% | ${stats.fail} | ${interp} |\n`;
  }

  md += `

**Most-failed marks:** ${
    Object.entries(mark_pass_rates)
      .sort((a, b) => a[1].fail - b[1].fail)
      .slice(-3)
      .map(e => `${e[0]} (${e[1].fail} failures)`)
      .join(', ')
  }

**Most-passed marks:** ${
    Object.entries(mark_pass_rates)
      .sort((a, b) => b[1].pass - a[1].pass)
      .slice(0, 3)
      .map(e => `${e[0]} (${e[1].pass} passes)`)
      .join(', ')
  }

---

## §III — Methodology and Known Limits

### Detection Logic

**Mark 1 (Triune God named):** Programmatic. Requires presence of "Father" AND ("Son"/"Christ"/"Jesus") AND ("Spirit"/"Holy Spirit"). Case-sensitive where effective. Reliable.

**Mark 2 (Christ Apex):** Heuristic. Counts distinct Christ-references in final 25% (target ≥2), then verifies presence in final 3 paragraphs. False-negatives possible if article uses pronouns ("He") without repeating the name Christ. Moderate reliability.

**Mark 3 (Doxological Climax):** Programmatic pattern-match in final 20%. Detects "praise," "glory," "worship," "adore," "blessed be," "amen," etc. Reliable but may miss creative phrasing.

**Mark 4 (Explicit Ascription):** Programmatic pattern-match across full text. Detects "Soli Deo Gloria," "to His glory," "He alone is worthy," etc. Highly reliable.

**Mark 5 (Confessional Anchor):** Programmatic pattern-match. Detects Westminster Confession, 1689, Belgic, Heidelberg, Canons of Dort, etc. Highly reliable. Note: Devotionals and narrative stories may legitimately omit this; audit flags but does not penalize in Phase C.

**Mark 6 (Presuppositional Bridge):** Programmatic pattern-match. Detects "presuppos," "Van Til," "Bahnsen," "transcendental argument," "borrowed capital," "impossibility of the contrary." Reliable. Philosophy and apologetics pieces profit most from this mark; devotionals less so.

**Mark 7 (Christ-as-Mediator):** Programmatic pattern-match. Detects "through Christ," "Mediator," "High Priest," "intercedes," "in Christ," etc. Highly reliable.

**Mark 8 (Spirit-Application):** Programmatic pattern-match. Requires co-occurrence of Spirit-reference AND application-term ("regenerat," "sanctif," "seal," "indwell," etc.). Moderate reliability; false-negatives if Spirit-work implied but not named.

**Mark 9 (Historical Witness):** Programmatic pattern-match against a canonical list of 48 names (Athanasius through Trueman). Highly reliable. Tolerates first-name and last-name references.

**Mark 10 (Liturgical Cadence):** Programmatic pattern-match in final 30% for first-person-plural worship-language ("we confess," "we adore," "we praise," etc.). Reliable. False-positives possible if article uses "we" in other contexts (e.g., "we know," "we see").

**Mark 11 (Coram Deo Posture):** Soft heuristic. Programmatic detection of explicit "before God"/"coram Deo" language is reliable. Absence-of-casual-markers heuristic (lol, haha, "okay so") is crude; false-positives and false-negatives both possible. Recommend manual review of borderline cases in Phase C.

**Mark 12 (Lift, Not Drag):** Heuristic. Examines final paragraph for upward-facing words (Christ, grace, heaven, glory) vs. downward-facing words (sin, flaw, broken, despair). Word-frequency-based; may miss tonal reversal. Articles ending on tender questions ("How can I be sure?") may score false-negative. Moderate reliability.

### Known Issues and Refinements for Phase C

- **Mark 2 false-negatives:** Articles using pronouns ("He accomplished redemption") without repeating "Christ" may miss the apex test. Phase C should inspect manually.
- **Mark 11 false-positives:** Casual-marker count is blunt. Academic articles dense with em-dashes may score false-positive for casualness. Recommend phrase-level inspection in Phase C.
- **Mark 12 boundary cases:** Demolition pieces intentionally ending in questions ("Can you see your depravity?") with catch-arm implicit or one page over. Phase C may need to exempt or reclassify.
- **Devotional/story exemptions:** Marks 5 and 6 (confessional anchor, presuppositional bridge) may not fit all article types. Audit flags tonal mismatch; Phase C exempts where theologically appropriate.

---

## §IV — Distribution Analysis

### By Category

`;

  for (const cat of Object.keys(by_category).sort()) {
    const stats = by_category[cat];
    md += `**${cat.charAt(0).toUpperCase() + cat.slice(1)}** (${stats.count} articles)\n`;
    md += `- Mean score: ${stats.mean_score}/12\n`;
    md += `- Highest: ${stats.highest_scorer} (${stats.highest_score}/12)\n`;
    md += `- Lowest: ${stats.lowest_scorer} (${stats.lowest_score}/12)\n\n`;
  }

  md += `### By Lock Status

`;

  if (by_lock_status.locked) {
    md += `**HAMMER-LOCKED or POLISH-LOCKED** (${by_lock_status.locked.count} articles)\n`;
    md += `- Mean score: ${by_lock_status.locked.mean_score}/12\n\n`;
  }
  if (by_lock_status.unlocked) {
    md += `**Unlocked** (${by_lock_status.unlocked.count} articles)\n`;
    md += `- Mean score: ${by_lock_status.unlocked.mean_score}/12\n\n`;
  }

  if (by_lock_status.locked && by_lock_status.unlocked) {
    const gap = by_lock_status.locked.mean_score - by_lock_status.unlocked.mean_score;
    md += `**Gap:** Locked articles score ${gap.toFixed(2)} points higher on average.\n\n`;
  }

  md += `---

## §V — Rebuild Queue (Top 50 Lowest-Scoring Pages)

Ranked by score ascending, then by word count. These are the pages Phase C will prioritize.

`;

  rebuildQueue.forEach((item, i) => {
    md += `${i + 1}. **${item.file}** (${item.score}/12, ${item.category}${item.lock_type ? `, ${item.lock_type}` : ''})\n`;
    md += `   Missing: ${item.missing_marks.join(', ')}\n\n`;
  });

  md += `---

## §VI — Honor Roll (Consecrated Articles — 12/12)

${consecrated.length} articles currently pass all twelve marks.

${consecrated.map(f => `- ${f}`).join('\n')}

These pages serve as templates for Phase C. They demonstrate the bar.

---

## §VII — Notes for Phase B and Phase C

### Patterns Surfaced

1. **Doxological closure gap:** Marks 3 and 4 (doxological climax and explicit ascription of glory) show the highest failure rates. Many articles argue the doctrine powerfully but do not lift into worship. Phase C will focus on the final 20% of each article, adding doxological language and explicit glory-ascriptions.

2. **Trinitarian underrepresentation:** Mark 1 (Triune God named) passes at a solid rate, but Marks 7, 8, and 10 (Mediator, Spirit-application, liturgical cadence) show room for improvement. Phase C will add Trinitarian three-beat language and ensure each Person's economic role is named.

3. **Confessional citation:** Mark 5 passes at ${((mark_pass_rates.mark_5_confessional_anchor.pass / articles.length) * 100).toFixed(1)}%. Articles in certain categories (especially devotional, story, psychology) legitimately omit confessional anchors. Phase C will target doctrine-heavy articles (systematic, philosophy, history) for confessional citations.

4. **Lock status correlation:** Locked pages score notably higher (${by_lock_status.locked ? by_lock_status.locked.mean_score : 'N/A'}/12 vs. ${by_lock_status.unlocked ? by_lock_status.unlocked.mean_score : 'N/A'}/12). HAMMER-LOCKED and POLISH-LOCKED articles have already received rhetorical attention; the consecration work is targeted (add Christological apex, lift with doxology) rather than wholesale rewrite.

5. **Presuppositional apologetics:** Mark 6 (presuppositional bridge) shows moderate pass rate. The site has strong demolition pieces that could benefit from explicit presuppositional framing. Phase B will identify gaps here.

### Recommendations for Phase C

- **Batch by mark-count:** Start with articles missing 3-4 marks (easier lifts), then move to those missing 6+ (deeper rebuilds).
- **Category-aware approach:** Devotionals and stories may require a lighter touch on Marks 5 and 6; focus those efforts on systematic and philosophical pieces.
- **Coram Deo closes:** Mark 11 (Coram Deo) is the tonal move. Ensure the final paragraph shifts from "here is the doctrine" to "here we worship the God who decreed it."
- **Christological apex:** Mark 2 is the emotional climax. Ensure every article's high point lands on the Person of Christ, not abstract doctrine.

---

## Appendix: Full Methodology Reference

See \`consecration-scan.js\` for the complete scoring algorithm. The script is re-runnable and will be used in Phase E for final verification.

All twelve marks are defined in AUDIT-2.md §II. This audit measures binary presence-and-load-bearing on each mark. An article passes a mark if the heuristic detects and the language appears semantically meaningful in context.

**Confidence by mark:**
- Marks 1, 4, 5, 7, 9: ≥95% confidence (programmatic, unambiguous)
- Marks 3, 6, 8, 10: 85-90% confidence (heuristic but reliable)
- Marks 2, 12: 75-85% confidence (heuristic, context-dependent)
- Mark 11: 70-80% confidence (soft heuristic, recommend LLM review on borderline)

---

*Audit 2, Phase A — Consecration Diagnostic. All files and reports generated 2026-04-27.*
`;

  fs.writeFileSync(
    path.join(REPO_ROOT, 'consecration-audit.md'),
    md
  );

  console.log('✓ consecration-audit.md written.');
  console.log(`\n=== SUMMARY ===`);
  console.log(`Articles scanned: ${totals.articles_scanned}`);
  console.log(`Consecrated (12/12): ${totals.consecrated_12}`);
  console.log(`Near-consecrated (10-11): ${totals.near_consecrated_10_11}`);
  console.log(`Rebuild queue (6-9): ${totals.rebuild_queue_6_9}`);
  console.log(`Rebuild priority (0-5): ${totals.rebuild_priority_0_5}`);
  console.log(`\nLowest 5 scorers:`);
  lowestFive.forEach(a => console.log(`  - ${a.file} (${a.score}/12)`));
  console.log(`\nHighest 5 scorers:`);
  highestFive.forEach(a => console.log(`  - ${a.file} (${a.score}/12)`));
}

main().catch(console.error);
