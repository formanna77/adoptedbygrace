# Substack Cross-Posting Workflow

**Substack handle:** @ForeknownOne — [foreknownone.substack.com](https://foreknownone.substack.com)

The canonical home for every piece is **adoptedbygrace.net as an HTML article**. Substack is an optional cross-posting channel that widens distribution and seeds the mailing list. Never let Substack become the source of truth; the site is the source of truth.

---

## Why cross-post at all

1. **Distribution.** Substack's Notes, recommendations, and inbox placement reach readers who will never search for Reformed soteriology on Google.
2. **Archive.** Substack creates a second, independently hosted copy of the argument, insured against Netlify outage or domain loss.
3. **Dialogue.** Comments and restacks on Substack can feed future articles on the site.

Cross-posting is **outbound amplification**, not primary publication. Every Substack issue must link back to its site canonical URL.

---

## What to cross-post (and what not to)

**Good candidates for cross-posting:**

- Native essays (`essay-*.html`)
- Pastoral devotionals (`devotional-*.html` and `pastoral-*.html`)
- Story-form pieces (`story-*.html`) — especially tender, dark, and thought-experiment categories
- Long-form demolition pieces with a clean narrative arc
- Responses to current events when they tie into sovereignty

**Do not cross-post:**

- Question pages (`question-*.html`) — these are search-optimized answer pages; they lose their point outside a filing cabinet
- Hub pages
- Systematic theology pages (too textbook; they read dryly as newsletters)
- Anything still wearing the scaffolding of a site-only asset (e.g., belief-assessment, quote-card widgets)

---

## Cadence

- **One cross-post per week** as a floor. Pick the single strongest piece published that week on the site.
- **Never more than three per week.** The site is an ocean; Substack is a spout. Oversaturating the feed teaches subscribers to mute it.
- **Occasional anthology issues.** Once per quarter, compile a 500-word intro + 5-8 curated links to site pieces under a theme ("Six stories for when you can't sleep," "The Scripture-first case," etc.). These pull Substack subscribers back to the site and boost time-on-site.

---

## The conversion protocol (HTML article → Substack issue)

Substack's editor eats HTML poorly. Paste as plain text and reformat with Substack's inline controls. Keep this order:

### 1. Title

Use the site's `<h1>` verbatim. If the site title is long ("The Machine That Asked Why — A Thought Experiment on the Origin of Your Choosing"), truncate at the em dash for Substack.

### 2. Subtitle

Use the site's `<p class="hub-subtitle">` text. This becomes the Substack dek and the social-card description.

### 3. Lede

Copy the first 2-3 paragraphs. Do not edit unless the opening names a site-internal link early (e.g., "as we discussed in <a href="/question-faithgift">where your faith came from</a>…"). Rewrite that link into prose: "where your faith came from, which we explored on the site."

### 4. Body

Paste the remaining paragraphs. Clean up:

- Internal `<a>` links → strip to plain prose OR convert to full `https://adoptedbygrace.net/...` URLs.
- Section headings (`<h2>`) → use Substack's H2 formatting, not bold.
- Em-dash and smart quotes usually survive paste; if they render as `&mdash;` or `&#8212;`, fix manually.
- Scripture block quotes (`<blockquote>`) → use Substack's block quote button.

### 5. Callout block at the end

Always append a callout of this shape (paraphrase lightly to fit the piece):

> *This piece first appeared at [adoptedbygrace.net](https://adoptedbygrace.net). The site is a free, no-paywall rescue operation for every soul searching at 2am who doesn't yet know they were found before they were born. If it reaches you, share it. If you want more like this, the site has hundreds more pieces waiting.*

Optional second line linking to the canonical:

> *Read the original at [adoptedbygrace.net/story-dark-the-rope-you-wove-yourself](https://adoptedbygrace.net/story-dark-the-rope-you-wove-yourself).*

### 6. Footer links

Below the callout, link to 2-3 related site pieces. Not more than three. Otherwise the issue feels like a link farm.

### 7. SEO/share fields

- **Subtitle** → the hub-subtitle
- **Social share image** → leave blank, Substack will pull the OG image from the linked canonical
- **Thank-you email** for paid subs (if used) → do not set; the site is free and we do not monetize

---

## Title rules for the Substack inbox

Substack subject lines compete with every other email in the reader's inbox. Keep them:

- **Under 55 characters** (iOS truncates at about 58)
- **Specific, not clever** — "The Machine That Asked Why" beats "A Thought on Choosing"
- **Lowercase emphasis OK** when it matches the piece's voice
- **No clickbait, no question marks, no numerals in the subject** — we are not a listicle publication

---

## Sequencing with the site

The Substack issue should go out **within 24 hours** of the site piece going live. Longer lag than that and you lose the "fresh off adoptedbygrace.net" framing.

A good Monday-morning rhythm:

- Saturday: publish the site piece. Commit, deploy, verify live.
- Sunday: draft the Substack conversion. Sit on it overnight.
- Monday AM: publish the Substack issue. Cross-link from any active Notes thread.
- Monday PM: a one-sentence Substack Note with the headline and link. No extended commentary.

---

## Anthology issue format

Once per quarter, send a curated anthology. Example structure:

**Subject:** Six stories for when you can't sleep

**Dek:** The site has a Stories section. Six pieces in particular have been doing the quiet, hard work for readers at 2am. Here they are.

**Body:** 150-200 words of intro framing. Then:

1. **[The Gardener Who Waited](https://adoptedbygrace.net/story-tender-the-gardener-who-waited)** — 30-word description.
2. **[The Drowning Man](https://adoptedbygrace.net/story-hard-hitting-the-drowning-man)** — 30-word description.
3. …etc.

**Footer:** standard callout + link back to [adoptedbygrace.net/stories](https://adoptedbygrace.net/stories).

---

## What never goes on Substack

- The belief-assessment widget (interactive-only)
- The scripture-tsunami (too long, wrong medium)
- Raw sermon manuscripts that aren't edited for written consumption
- Anything that still has a `[TODO]` or `[EDIT]` marker
- Anything that has not passed `node validate-site.js`

---

## Recovery / rewriting policy

If a Substack issue has a broken link, a typo, or a theological miscue, **fix it on the site canonical first**, verify the fix is live, then update the Substack issue to match. Never let the two drift apart by more than an hour.

---

## Voice consistency

Substack issues should sound like the site. Read the Manifesto section of `/about` before every send. Lewis, Spurgeon, Buechner, Keller. Tender arm and demolition arm. NIV only on Scripture. No "TL;DR" — use "In Brief" if you summarize.

Do not let Substack's Medium-adjacent aesthetic pull the prose toward a listicle voice. The prose must remain pastoral.

---

## Measurement

- **Opens** are a proxy for the subject line's pull, not the piece's quality.
- **Click-through to the site canonical** is the real metric. Aim for 15%+ of opens. Below 10%, the callout/footer needs tightening.
- **New site sessions** following a Substack send — track in the analytics dashboard (Sprint 7 #49 wires this up).

---

## One-line summary

*Substack is an amplifier. The site is the message. Every Substack issue leads the reader back to the site.*

*Soli Deo Gloria.*
