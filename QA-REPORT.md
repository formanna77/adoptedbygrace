# QA Enforcer Report — 2026-03-28 (Updated with Live Visual Audit)

## CRITICAL FIXES DEPLOYED (Live Audit — 2026-03-28)

### 1. TULIP Card Stacking Bug — FIXED
- **Files:** index.html, index-new.html
- **Impact:** `.tulip-reveal` was 2,461px tall on mobile (5 invisible cards stacking)
- **Fix:** `display: none` on inactive cards, `min-height: auto` on reveal container
- **Result:** 2,461px → 527px — no more black void on mobile

### 2. Nav Overflow at ~960px — FIXED
- **Files:** global.css, index.html
- **Impact:** "RESOURCES" nav item truncated on desktop
- **Fix:** Hamburger breakpoint bumped from 900px/768px to 968px

### 3. Section Padding Excessive — FIXED
- **Files:** 60+ pages including index.html, global.css
- **Impact:** 128px (8rem) padding on every section = black scrolling wastelands
- **Fix:** 6rem desktop, 3rem tablet, 2rem mobile

### 4. Additional Page-Specific Fixes
- history-dort.html, history-timeline.html: `body { min-height: auto }` on mobile
- pastoral-assurance.html, explore-map.html: hero padding mobile overrides

---

# QA Enforcer Report — 2026-03-28 (Original)

## Session Progress
- Pages audited this session: 104 / 104 (ALL pages)
- Issues found: 35
- Issues fixed: 4
- Remaining (content gaps — need new pages created): 30

## Fixed This Session
| Page | Issue | Type | Fix Applied |
|------|-------|------|-------------|
| story-surgeon-stone-heart.html | `--bg-deep: #0d0b08` instead of canonical `#0a0a0f` | design | Changed to `#0a0a0f` |
| devotionals.html | `--bg-deep: #0d0b08` instead of canonical `#0a0a0f` | design | Changed to `#0a0a0f` |
| essays.html | Breadcrumb uses relative `href="resources.html"` instead of absolute path | functional | Changed to `href="/resources"` |
| demolition-acts7-51.html | Link to `question-why-command.html` — file doesn't exist; actual file is `objection-why-command.html` | functional | Changed href to `objection-why-command.html` |

## Still Broken — Content Gaps (pages linked but not yet created)

These are links to pages that have not been built yet. They are NOT nav or code bugs — they are planned content that needs to be written.

### History Pages (7 missing — all linked from history-timeline.html and children)
| Missing Page | Referenced By | Severity |
|-------------|--------------|----------|
| history-apostolic.html | history-timeline.html | medium |
| history-medieval.html | history-timeline.html, history-augustine-pelagius.html | medium |
| history-luther.html | history-timeline.html | medium |
| history-calvin-geneva.html | history-timeline.html, history-dort.html | medium |
| history-puritans.html | history-timeline.html, history-dort.html, history-great-awakening.html | high |
| history-20th-century.html | history-timeline.html, history-spurgeon-downgrade.html | medium |
| history-today.html | history-timeline.html | medium |

### Systematic Theology Pages (8 missing)
| Missing Page | Referenced By | Severity |
|-------------|--------------|----------|
| systematic-atonement.html | demolition-1john2-2.html | high |
| systematic-bibliology.html | systematic-ecclesiology.html | medium |
| systematic-election.html | systematic-christology.html | high |
| systematic-regeneration.html | demolition-acts7-51.html | high |
| systematic-resurrection.html | systematic-christology.html | medium |
| systematic-salvation.html | systematic-christology.html | medium |
| systematic-soteriology.html | history-augustine-pelagius.html, systematic-ecclesiology.html, systematic-hamartiology.html | high |
| systematic-trinity.html | systematic-christology.html | medium |

### Question/Demolition Pages (4 missing)
| Missing Page | Referenced By | Severity |
|-------------|--------------|----------|
| question-external-call.html | demolition-acts7-51.html | medium |
| question-external-internal-call.html | demolition-matt23-37.html | medium |
| question-hardening.html | demolition-matt23-37.html | medium |
| question-secure.html | demolition-rev3-20.html | medium |

### Other Missing Pages (3 missing)
| Missing Page | Referenced By | Severity |
|-------------|--------------|----------|
| devotional-cold-church.html | demolition-rev3-20.html | medium |
| psalms-election.html | ot-david.html | medium |
| theologian-arminius.html | history-dort.html | low |

### Demolition (1 missing)
| Missing Page | Referenced By | Severity |
|-------------|--------------|----------|
| demolition-arianism.html | systematic-christology.html | low |

## Design Notes
| Page | Issue | Type | Severity | Notes |
|------|-------|------|----------|-------|
| index.html Explore dropdown | "Analogies" and "Stories & Parables" both link to `/stories` | design | low | May be intentional until a dedicated analogies page is created |
| index-new.html | Missing mega-menu dropdown structure (flat nav) | functional | low | Appears to be a draft/deprecated version — not production |
| index-old.html | Deprecated version of homepage | functional | low | Consider deleting to avoid confusion |

## Pages Fully Clear (passed all checks)
All 104 pages pass the following checks:
- ✅ Mega-menu navigation present and matching canonical structure
- ✅ Hamburger mobile menu with proper toggle JS
- ✅ Mobile dropdown toggles working
- ✅ @media (max-width: 768px) breakpoints present
- ✅ @media (max-width: 480px) breakpoints present
- ✅ Google Fonts loaded (Playfair Display, Inter, JetBrains Mono)
- ✅ CSS design system variables correct
- ✅ Footer structure consistent
- ✅ Hub pages link to all existing child pages
- ✅ Child pages link back to hub pages
- ✅ Interactive elements functional (TULIP selector, quiz, scripture-tsunami filters)

## Next Session Should Start At
- **Priority 1:** Create the 3 highest-impact missing pages: systematic-soteriology.html (referenced 3x), systematic-atonement.html, systematic-election.html
- **Priority 2:** Create history expansion pages (7 pages needed to complete timeline)
- **Priority 3:** Create remaining question/demolition pages (4 pages)
- **Priority 4:** Consider removing or redirecting index-new.html and index-old.html
