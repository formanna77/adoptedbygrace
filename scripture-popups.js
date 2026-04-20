/**
 * scripture-popups.js
 *
 * Site-wide Scripture hovercard system. Scans prose content for Scripture
 * references and wraps them in a trigger that shows the full NIV text on
 * hover (desktop) or tap (mobile).
 *
 * Depends on scripture-niv.js (populates window.SCRIPTURE_NIV).
 *
 * Design decisions:
 *  - Fail-soft: references NOT in SCRIPTURE_NIV are left as plain text.
 *    Better to miss a rare verse than to render "Verse text unavailable."
 *  - Scope-limited: scans .article-body and .hub-card prose. Does not
 *    scan nav, footer, page-hero, or code blocks.
 *  - Never wraps inside <a>, <cite>, <code>, <pre>, <h1>, or <blockquote>
 *    — those are either already-interactive or already-Scripture-styled.
 *  - Full verses shown in blockquote <cite> already carry their reference
 *    (displayed prominently); we don't need to popup that too.
 *  - On mobile (touch), tap toggles the popup. Body tap dismisses.
 */
(function () {
    'use strict';

    if (!window.SCRIPTURE_NIV) return; // Database not loaded — graceful exit.

    // ──────────────────────────────────────────────────────────────────
    // Book names (canonical). Order matters: longer names first so
    // "Song of Songs" matches before "Song of" etc.
    // ──────────────────────────────────────────────────────────────────
    const BOOKS = [
        'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
        'Joshua', 'Judges', 'Ruth',
        '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
        '1 Chronicles', '2 Chronicles',
        'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalm', 'Psalms',
        'Proverbs', 'Ecclesiastes', 'Song of Songs', 'Song of Solomon',
        'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel',
        'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum',
        'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
        'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
        '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
        'Philippians', 'Colossians',
        '1 Thessalonians', '2 Thessalonians',
        '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
        'James', '1 Peter', '2 Peter',
        '1 John', '2 John', '3 John', 'Jude', 'Revelation'
    ];

    // Build a regex that matches any of these followed by a chapter:verse(-verse?) pattern.
    // The (?:\.|\s) handles abbreviations like "1 Cor." minimally (we keep to full names).
    const bookPattern = BOOKS
        .map(b => b.replace(/\s/g, '\\s'))
        .join('|');
    const refRegex = new RegExp(
        '\\b(' + bookPattern + ')\\s+(\\d{1,3}):(\\d{1,3})(?:[-–](\\d{1,3}))?\\b',
        'g'
    );

    // Normalize a reference to the canonical key format used in SCRIPTURE_NIV:
    //   book + " " + chapter + ":" + verse(-verseEnd)?
    //   "Psalms" → "Psalm" (the database uses Psalm)
    //   Em-dash becomes hyphen.
    function canonicalize(book, chapter, verse, verseEnd) {
        let b = book.replace(/\s+/g, ' ').trim();
        if (b === 'Psalms') b = 'Psalm';
        if (b === 'Song of Solomon') b = 'Song of Songs';
        const range = verseEnd ? `${verse}-${verseEnd}` : verse;
        return `${b} ${chapter}:${range}`;
    }

    function lookup(key) {
        const db = window.SCRIPTURE_NIV;
        if (db[key]) return { key, text: db[key] };
        // Try without the end-verse range.
        const singleKey = key.replace(/-\d+$/, '');
        if (db[singleKey]) return { key: singleKey, text: db[singleKey] };
        // Try the containing range: if the user cited "Romans 8:29" and the
        // DB has "Romans 8:29-30", the 29-verse lookup won't catch it; this
        // isn't worth exhaustive searching, so we stop here.
        return null;
    }

    // ──────────────────────────────────────────────────────────────────
    // DOM walker. Walks text nodes under root, skipping elements listed in
    // SKIP_TAGS or inside an ancestor listed in SKIP_ANCESTORS.
    // ──────────────────────────────────────────────────────────────────
    const SKIP_TAGS = new Set(['A', 'CITE', 'CODE', 'PRE', 'H1', 'BLOCKQUOTE', 'SCRIPT', 'STYLE', 'BUTTON']);

    function hasSkipAncestor(node) {
        let el = node.parentElement;
        while (el) {
            if (SKIP_TAGS.has(el.tagName)) return true;
            if (el.classList && (el.classList.contains('scripture-ref') || el.classList.contains('card-scripture'))) return true;
            el = el.parentElement;
        }
        return false;
    }

    function processTextNode(textNode) {
        const text = textNode.nodeValue;
        if (!text || text.length < 5) return;
        if (!refRegex.test(text)) {
            refRegex.lastIndex = 0;
            return;
        }
        refRegex.lastIndex = 0;

        if (hasSkipAncestor(textNode)) return;

        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        let matched = false;
        let m;
        while ((m = refRegex.exec(text)) !== null) {
            const [whole, book, chapter, verse, verseEnd] = m;
            const key = canonicalize(book, chapter, verse, verseEnd);
            const hit = lookup(key);
            if (!hit) continue;

            matched = true;
            // Text before the match.
            if (m.index > lastIndex) {
                frag.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
            }
            // The wrapped span.
            const span = document.createElement('span');
            span.className = 'scripture-ref';
            span.setAttribute('data-ref', hit.key);
            span.setAttribute('tabindex', '0');
            span.setAttribute('role', 'button');
            span.setAttribute('aria-label', `${hit.key} — tap or hover for verse text`);
            span.textContent = whole;
            frag.appendChild(span);

            lastIndex = m.index + whole.length;
        }

        if (!matched) return;

        // Trailing text after the last match.
        if (lastIndex < text.length) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        textNode.parentNode.replaceChild(frag, textNode);
    }

    function scanRoot(root) {
        if (!root) return;
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) nodes.push(n);
        nodes.forEach(processTextNode);
    }

    // ──────────────────────────────────────────────────────────────────
    // Popup rendering.
    // ──────────────────────────────────────────────────────────────────
    let popupEl = null;
    let activeRef = null;
    let hideTimer = null;

    function ensurePopup() {
        if (popupEl) return popupEl;
        popupEl = document.createElement('div');
        popupEl.className = 'scripture-popup';
        popupEl.setAttribute('role', 'tooltip');
        popupEl.innerHTML = `
            <div class="scripture-popup-arrow" aria-hidden="true"></div>
            <div class="scripture-popup-ref"></div>
            <div class="scripture-popup-text"></div>
            <div class="scripture-popup-meta">New International Version</div>
        `;
        document.body.appendChild(popupEl);
        return popupEl;
    }

    function showPopup(refSpan) {
        clearTimeout(hideTimer);
        const key = refSpan.getAttribute('data-ref');
        const text = window.SCRIPTURE_NIV[key];
        if (!text) return;

        const p = ensurePopup();
        p.querySelector('.scripture-popup-ref').textContent = key;
        p.querySelector('.scripture-popup-text').textContent = text;

        // Reset position to measure size.
        p.style.visibility = 'hidden';
        p.style.display = 'block';
        p.classList.add('visible');

        const rect = refSpan.getBoundingClientRect();
        const popupRect = p.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const margin = 12;

        // Horizontal: center over trigger, clamp within viewport.
        let left = rect.left + (rect.width / 2) - (popupRect.width / 2);
        left = Math.max(margin, Math.min(left, vw - popupRect.width - margin));

        // Vertical: prefer above; flip below if not enough room.
        let top;
        let arrowPos = 'bottom';
        const spaceAbove = rect.top;
        const spaceBelow = vh - rect.bottom;
        if (spaceAbove >= popupRect.height + 14 || spaceAbove > spaceBelow) {
            top = rect.top + window.scrollY - popupRect.height - 10;
            arrowPos = 'bottom';
        } else {
            top = rect.bottom + window.scrollY + 10;
            arrowPos = 'top';
        }

        p.style.left = left + 'px';
        p.style.top = top + 'px';
        p.setAttribute('data-arrow', arrowPos);

        // Arrow horizontal offset.
        const arrow = p.querySelector('.scripture-popup-arrow');
        const arrowOffset = (rect.left + rect.width / 2) - left;
        arrow.style.left = Math.max(18, Math.min(arrowOffset, popupRect.width - 18)) + 'px';

        p.style.visibility = 'visible';
        activeRef = refSpan;
    }

    function scheduleHide() {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            if (popupEl) popupEl.classList.remove('visible');
            activeRef = null;
        }, 180);
    }

    function hideNow() {
        clearTimeout(hideTimer);
        if (popupEl) popupEl.classList.remove('visible');
        activeRef = null;
    }

    // ──────────────────────────────────────────────────────────────────
    // Event delegation.
    // ──────────────────────────────────────────────────────────────────
    function bind() {
        const isTouch = window.matchMedia('(hover: none)').matches;

        document.addEventListener('mouseover', (e) => {
            const t = e.target.closest('.scripture-ref');
            if (!t) return;
            showPopup(t);
        });

        document.addEventListener('mouseout', (e) => {
            const from = e.target.closest('.scripture-ref');
            const to = e.relatedTarget ? e.relatedTarget.closest('.scripture-ref, .scripture-popup') : null;
            if (from && !to) scheduleHide();
        });

        // Keep popup open when hovering over it.
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.scripture-popup')) {
                clearTimeout(hideTimer);
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.scripture-popup') && !e.relatedTarget?.closest('.scripture-popup, .scripture-ref')) {
                scheduleHide();
            }
        });

        // Touch: tap toggles.
        document.addEventListener('click', (e) => {
            const ref = e.target.closest('.scripture-ref');
            if (ref) {
                if (activeRef === ref) {
                    hideNow();
                } else {
                    showPopup(ref);
                }
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            // Tap outside — dismiss.
            if (popupEl && popupEl.classList.contains('visible') && !e.target.closest('.scripture-popup')) {
                hideNow();
            }
        });

        // Escape dismisses.
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popupEl && popupEl.classList.contains('visible')) {
                hideNow();
                if (activeRef) activeRef.focus();
            }
            if (e.key === 'Enter' || e.key === ' ') {
                const ref = e.target.closest && e.target.closest('.scripture-ref');
                if (ref && document.activeElement === ref) {
                    e.preventDefault();
                    if (activeRef === ref) hideNow(); else showPopup(ref);
                }
            }
        });

        // Hide on scroll / resize (position would be stale).
        let scrollTimer;
        document.addEventListener('scroll', () => {
            if (!popupEl || !popupEl.classList.contains('visible')) return;
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(hideNow, 50);
        }, { passive: true });
        window.addEventListener('resize', hideNow);
    }

    // ──────────────────────────────────────────────────────────────────
    // Styles.
    // ──────────────────────────────────────────────────────────────────
    function injectStyles() {
        if (document.getElementById('scripture-popup-styles')) return;
        const css = `
            .scripture-ref {
                display: inline;
                cursor: help;
                color: inherit;
                border-bottom: 1px dotted rgba(212, 162, 84, 0.55);
                transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
            }
            .scripture-ref:hover,
            .scripture-ref:focus {
                color: var(--accent-gold, #d4a254);
                border-bottom-color: var(--accent-gold, #d4a254);
                background: rgba(212, 162, 84, 0.06);
                outline: none;
            }
            .scripture-popup {
                position: absolute;
                z-index: 9999;
                max-width: 380px;
                min-width: 240px;
                padding: 1.1rem 1.2rem 0.9rem;
                background: linear-gradient(135deg, #15131d 0%, #0a0a0f 100%);
                border: 1px solid rgba(212, 162, 84, 0.35);
                border-radius: 10px;
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6), 0 0 60px rgba(212, 162, 84, 0.08);
                color: #e8e4dc;
                font-family: 'Inter', sans-serif;
                opacity: 0;
                transform: translateY(4px);
                pointer-events: none;
                transition: opacity 0.22s ease, transform 0.22s ease;
                display: none;
            }
            .scripture-popup.visible {
                display: block;
                opacity: 1;
                transform: translateY(0);
                pointer-events: auto;
            }
            .scripture-popup-arrow {
                position: absolute;
                width: 12px;
                height: 12px;
                background: #0f0d15;
                border: 1px solid rgba(212, 162, 84, 0.35);
                transform: rotate(45deg);
            }
            .scripture-popup[data-arrow="bottom"] .scripture-popup-arrow {
                bottom: -7px;
                border-top: none;
                border-left: none;
            }
            .scripture-popup[data-arrow="top"] .scripture-popup-arrow {
                top: -7px;
                border-bottom: none;
                border-right: none;
            }
            .scripture-popup-ref {
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.72rem;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                color: var(--accent-gold, #d4a254);
                margin-bottom: 0.55rem;
                font-weight: 500;
            }
            .scripture-popup-text {
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 0.98rem;
                line-height: 1.55;
                font-style: italic;
                color: #e8e4dc;
            }
            .scripture-popup-meta {
                margin-top: 0.7rem;
                padding-top: 0.6rem;
                border-top: 1px solid rgba(212, 162, 84, 0.12);
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.62rem;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                color: #8a8275;
            }
            @media (max-width: 600px) {
                .scripture-popup {
                    max-width: calc(100vw - 24px);
                    font-size: 0.95rem;
                }
                .scripture-popup-text { font-size: 0.95rem; }
            }
            @media (prefers-reduced-motion: reduce) {
                .scripture-popup { transition: opacity 0.1s ease; transform: none !important; }
            }
        `;
        const style = document.createElement('style');
        style.id = 'scripture-popup-styles';
        style.textContent = css;
        document.head.appendChild(style);
    }

    // ──────────────────────────────────────────────────────────────────
    // Init.
    // ──────────────────────────────────────────────────────────────────
    function init() {
        injectStyles();

        // Primary scope: article body (where the prose lives).
        document.querySelectorAll('.article-body').forEach(scanRoot);
        // Also scan the hub-card descriptions — useful on hub pages.
        document.querySelectorAll('.card-description').forEach(scanRoot);
        // And article-like containers that predate the canonical wrapper.
        document.querySelectorAll('.content-wrap, .article-content, .content-wrapper').forEach(scanRoot);

        bind();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
