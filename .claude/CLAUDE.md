# adoptedbygrace.net — The Manifesto

## THE MISSION

This is a rescue operation. Somewhere tonight, someone chosen by God before the foundation of the world is searching at 2am. This site exists for that person. Every page is a doorway. Every sentence earns its place.

We aim to be the most powerful instrument of biblical truth on the internet — proving from Scripture, psychology, philosophy, history, neuroscience, testimony, and analogy that salvation is entirely God's work from first to last, and that the reader was held all along.

---

## THE TWO ARMS

Every page operates with both arms. One arm demolishes the lie of human autonomy — dismantles self-trust, closes escape routes, exposes redefined words. The other arm catches the reader in sovereign grace as the walls come down.

- Demolition without catch = **despair**
- Catch without demolition = **complacency**
- Demolition + catch = **transformation**

Every demolition page must contain its own tender landing in the final 20%, or link prominently to a catch page. Never leave the reader in rubble.

---

## THE LINCHPIN — TOTAL DEPRAVITY

You do not prove election directly. You prove Total Depravity, and the other four points arrive on their own. If a reader truly sees they are dead in sin — not sick, not weak, but *dead* — they will need unconditional election, definite atonement, irresistible grace, and perseverance of their own accord, because nothing less could have saved them.

When writing about depravity, **show, don't tell.** "Dead in sin" is an abstraction readers can nod at and escape. Concrete examples they recognize in themselves — *you have never once in your life spontaneously wanted to pray* — become a mirror they cannot look away from.

---

## THE CROWN JEWEL

**Faith itself is a gift** (Ephesians 2:8-9). To claim credit for your faith is to make faith a work. Rejecting the doctrines of grace is, at root, works-righteousness disguised as humility.

Never lead with the accusation. Always lead with the question. "Where did your faith come from?" Walk the reader through logic they cannot escape, each step something they already believe, until the conclusion arrives on its own.

---

## WRITING STANDARDS

- Lead with "Scripture teaches" not "Calvinism says." De-emphasize TULIP and Reformed labels.
- No eschatology. Laser focus on God's sovereignty in salvation.
- Models: Lewis, Spurgeon, Buechner, Keller, Edwards, Chesterton.
- Density over length. Short sentences are permitted to land like hammers on anvils.
- **NIV only.** When Romans 9 or John 6 says what it says in THEIR Bible, the translation-bias escape hatch is welded shut. Do not append "(NIV)" after quotations.
- Never write "TL;DR" — use "In Brief."
- Say "truth" not "doctrine" when possible. Say "doctrines of grace" not "doctrine of election."

---

## THE WEB — HYPERLINKING MANDATE

Every article weaves **8–12 internal links minimum** into its prose, Wikipedia-style. First mention of a concept gets the link. Cross-category links (demolition → devotion, psychology → story, question → analogy) are the highest priority — they turn a filing cabinet into a living web.

**Never hallucinate page names.** Before writing any `<a href="/name.html">`, verify the target file exists (`ls name.html` if unsure). Aspirational linking is banned. A page with 6 verified links beats a page with 12 links where 5 are broken.

Links go in prose content only — never in `href` / `class` / `id` / attribute / tag-name / comment contexts. Links injected into HTML structure have broken the live site before.

---

## SITE STRUCTURE RULES

**Every new page MUST include:**
1. `<link rel="stylesheet" href="/global.css">` in `<head>`
2. The nav from `/_nav-template.html` — pasted verbatim, no additions, no inline styling
3. A `<script src="/nav.js"></script>` before `</body>`
4. The `footer-grace-warning` block in the footer, between `footer-container` and `footer-copyright`:
   ```html
   <div class="footer-grace-warning">
       "Shall we go on sinning so that grace may increase? By no means!" — Romans 6:1-2<br>
       Grace is not a license to sin. It is the power that frees us from sin's dominion.
   </div>
   ```

**Article pages** wrap body content in exactly `<article class="article-body">`. Not `content-wrap`, not `main-content`, not `section` — only `article-body`. Hero uses `<header class="page-hero">` with a `<span class="eyebrow">Category</span>`.

**Hub pages** use the unified hub CSS: `.hub-hero`, `.hub-subtitle`, `.hub-stats`, `.hub-container`, `.hub-grid`, `.hub-card`, `.card-number`, `.card-title`, `.card-description`, `.card-scripture`, `.card-footer`, `.card-read`. Warm gold + ember + dark aesthetic. No white, gray, or cold tones. No custom card classes (`.devotional-card`, `.question-card`, etc.) — all dead.

**No inline `<style>` tags** except on interactive widgets (index.html, belief-assessment.html, question-faith-origin-test.html, verse-explorer.html).

---

## INTEGRITY LAWS

1. **Never link to a page that doesn't exist.** Verify every href before writing it.
2. **Every new page must be wired into its hub.** Add a `.hub-card` in the same session, or `wire-orphans.js` will do it for you.
3. **Verify your changes actually saved.** Grep for your edit after making it.
4. **Never finish a session without running `node validate-site.js`.** Fix whatever it flags.
5. **No stub pages.** Every HTML file committed to the repo must be complete — nav, content, footer, script tag. A half-written `<head>` renders as a blank page and other agents link to it. Finished page or no page.

---

## AFTER CREATING OR MODIFYING HTML, RUN THESE FIVE SCRIPTS:

```bash
node build-search-index.js
node build-mega-menu.js
node build-homepage-counts.js
node auto-linker.js
node wire-orphans.js
```

Then run `node validate-site.js` and fix anything it flags.

---

## GIT POLICY — ZERO EXCEPTIONS

**Do not run any git commands.** No `git add`, no `git commit`, no `git push`. Aaron pushes manually. Every Netlify deploy costs build minutes. Save your work to the repo files and stop there.

---

## ELIMINATED FEATURES — DO NOT RECREATE

No resources/external-links pages. No email newsletter signup. No social-media content. No back-to-top floating widgets. No "Apologetics" category — the entire site IS an apologetic.

---

## REFORMED SOURCES LIBRARY

114 Reformed theology PDFs live in `/Reformed Sources/`, indexed by `REFORMED-SOURCES-INDEX.md` (author, era, topic, category). Before writing about any doctrine, consult the index. Cite the sources. Let the reader know they stand in a 2,000-year tradition.

---

## THE MEASURE

Page count is not the measure. Traffic is not the measure. Theological correctness alone is not the measure. The measure is this:

*Did someone who was searching for God find Him here? Did someone confused about His sovereignty come to rest in it? Did someone who felt unloved discover they were chosen before the foundation of the world?*

Build accordingly.
