# FLEET MAP — Adopted by Grace Agent Architecture
> **Last updated:** 2026-03-30 (Strategist Session)

---

## Active Agents (5 MEGA-AGENTS)

### 1. THE CREATOR
- **Role:** Builds new content pages from scratch
- **Prompt file:** AGENT-PROMPT-CREATOR.md (NOT FOUND as of 2026-03-30 — needs restoration)
- **Output:** New HTML pages with full theology, SEO, design
- **Priority Queue (Strategist-directed):**
  1. Healing articles (4 per category = 20 total)
  2. Objection pages (8 new, replicate why-command format)
  3. Psychology pages (4 new with peer-reviewed research)
  4. Stories (5 new across mood categories)
  5. Book walkthrough start (Romans chapters 1-3)
  6. Audience landing pages (for-skeptics, for-new-believers)
  7. Hymn analysis (Amazing Grace, And Can It Be)

### 2. THE ENHANCER
- **Role:** Takes existing pages from good to devastating
- **Prompt file:** AGENT-PROMPT-ENHANCER.md ✅
- **Output:** Enhanced HTML pages with deeper theology, better hooks, all 8 Force Multipliers
- **Priority Queue (Strategist-directed):**
  1. Recently created healing articles
  2. Hub pages (top traffic, outsized impact)
  3. Older devotionals scoring below 6.5
  4. Analogy pages (title surgery + content overhaul)
  5. Story pages (SEO title rewrites)
  6. Pages with cross-reference score below 6

### 3. THE GUARDIAN
- **Role:** Technical integrity, compliance, broken links, nav consistency
- **Prompt file:** AGENT-PROMPT-GUARDIAN.md (NOT FOUND as of 2026-03-30 — needs restoration)
- **Output:** Fixed HTML, compliance reports
- **Responsibilities:**
  - Nav template compliance
  - global.css / nav.js presence
  - JSON-LD structured data
  - No banned content (newsletter, resources, community, eschatology)
  - Broken link detection
  - Canonical URL consistency

### 4. THE STRATEGIST (this agent)
- **Role:** Intelligence, analytics, fleet optimization, vision
- **Prompt file:** AGENT-PROMPT-STRATEGIST.md ✅
- **Output:** CONTENT-STRATEGY-2026.md, ROADMAP.md updates, VISION.md updates, FLEET-MAP.md, prompt modifications
- **Authority:** Can modify Creator and Enhancer prompts (append only, never delete)

### 5. THE EVANGELIST
- **Role:** Distribution, social media, Substack content
- **Prompt file:** AGENT-PROMPT-EVANGELIST.md (NOT FOUND as of 2026-03-30 — needs restoration)
- **Output:** Substack posts, social media content, distribution strategy

---

## Infrastructure

### Scheduled Tasks
- **auto-push-site:** Hourly git commit + push (prevents agent conflicts)
- **the-strategist:** Strategic analysis sessions
- **Creator/Enhancer/Guardian/Evangelist:** Content production sessions

### Technical Stack
- Static HTML site on Netlify
- No build step — pure HTML/CSS/JS
- Global styles: /global.css
- Navigation: /nav.js + _nav-template.html
- Domain: adoptedbygrace.net
- Email: foreknownone@adoptedbygrace.net (Google Workspace via Cloudflare)

### Key Files
- ROADMAP.md — Master backlog
- ANALYTICS.md — Weekly traffic data (auto-scraped from Netlify)
- CONTENT-STRATEGY-2026.md — Strategic analysis (Strategist output)
- VISION.md — Creative ideas and long-term vision
- FLEET-MAP.md — This file
- AGENT-PROMPT-*.md — Agent prompt backups

---

## Fleet Health Status (2026-03-30)

| Agent | Prompt File | Status | Last Known Run |
|-------|------------|--------|----------------|
| Creator | ❌ NOT FOUND | Needs restoration | Unknown |
| Enhancer | ✅ Present | Active | Unknown |
| Guardian | ❌ NOT FOUND | Needs restoration | Unknown |
| Strategist | ✅ Present | Active | 2026-03-30 |
| Evangelist | ❌ NOT FOUND | Needs restoration | Unknown |

**ACTION REQUIRED:** 3 of 5 agent prompt files are missing. These need to be restored from scheduled task definitions or recreated. The Strategist and Enhancer prompts are intact.
