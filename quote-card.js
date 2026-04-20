/**
 * quote-card.js
 *
 * PROJECT LIGHTHOUSE — Pillar 4: DISTRIBUTION AMPLIFIER
 *
 * When a reader highlights any text on any Adopted by Grace page,
 * a small floating button appears: "Make a Quote Card". Clicking it
 * generates a 1080×1350 PNG (Instagram post ratio) of the highlighted
 * quote over the site's signature gold-on-black aesthetic — with the
 * page's URL at the bottom so the quote remains traceable to its source.
 *
 * The PNG is auto-downloaded AND copied to the clipboard (where the
 * browser supports it), ready to paste into iMessage, Threads, Instagram,
 * X, Bluesky, or any other channel.
 *
 * Pure client-side. No server round-trip. Canvas 2D renders the entire
 * card in the browser.
 *
 * DESIGN LANGUAGE:
 *   - Background: linear gradient #0a0a0f → #1a0f0a (site dark + warm ember)
 *   - Accent: ember-to-gold border (top and bottom, 8px)
 *   - Body text: #f5eedc (warm off-white, site body color)
 *   - Attribution: #d4a254 (site gold)
 *   - URL footer: monospaced, tracking-wide, 70% opacity
 *   - Centered typography, generous padding, Georgia serif for body
 *
 * The button is intentionally minimal — one gold pill that appears near
 * the selection and disappears the moment the selection clears.
 */

(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  // Don't run on pages where the author has opted out
  if (document.body && document.body.dataset && document.body.dataset.quoteCard === 'off') return;

  // Don't run inside the nav or footer region
  const SKIP_SELECTORS = ['nav', 'footer', '.mega-menu', '.search-overlay'];

  const BTN_ID = 'lighthouse-quote-card-btn';
  const STYLE_ID = 'lighthouse-quote-card-style';

  const GOLD = '#d4a254';
  const EMBER = '#e8642c';
  const BG_DARK = '#0a0a0f';
  const BG_WARM = '#1a0f0a';
  const BODY = '#f5eedc';
  const MUTED = 'rgba(245, 238, 220, 0.6)';

  // Inject the floating button style
  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${BTN_ID} {
        position: absolute;
        z-index: 10000;
        background: linear-gradient(135deg, ${GOLD}, ${EMBER});
        color: #0a0a0f;
        border: none;
        border-radius: 999px;
        padding: 0.55rem 1.1rem;
        font-family: inherit;
        font-size: 0.82rem;
        font-weight: 700;
        letter-spacing: 0.03em;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(212, 162, 84, 0.4), 0 0 0 1px rgba(0,0,0,0.2);
        transition: transform 120ms ease, box-shadow 120ms ease;
        display: flex;
        align-items: center;
        gap: 0.4rem;
      }
      #${BTN_ID}:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 26px rgba(212, 162, 84, 0.55);
      }
      #${BTN_ID} svg {
        width: 14px;
        height: 14px;
        stroke: #0a0a0f;
        stroke-width: 2.4;
        fill: none;
      }
      #lighthouse-quote-card-toast {
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #1a0f0a, #0a0a0f);
        color: ${GOLD};
        padding: 0.85rem 1.4rem;
        border: 1px solid ${GOLD};
        border-radius: 8px;
        z-index: 10001;
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        box-shadow: 0 12px 40px rgba(0,0,0,0.6);
        animation: qcToastIn 240ms cubic-bezier(0.2, 0.9, 0.3, 1.2);
      }
      @keyframes qcToastIn {
        from { opacity: 0; transform: translate(-50%, 16px); }
        to   { opacity: 1; transform: translate(-50%, 0); }
      }
    `;
    document.head.appendChild(style);
  }

  function currentSelectionText() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return '';
    const raw = sel.toString();
    // Collapse whitespace; trim
    return raw.replace(/\s+/g, ' ').trim();
  }

  function selectionInSkipRegion() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return false;
    let node = sel.getRangeAt(0).startContainer;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
    while (node && node !== document.body) {
      if (node.matches) {
        for (const s of SKIP_SELECTORS) {
          if (node.matches(s)) return true;
        }
      }
      node = node.parentNode;
    }
    return false;
  }

  function placeButton() {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (!rect || (rect.width === 0 && rect.height === 0)) return null;
    return {
      top: window.scrollY + rect.top - 44,
      left: window.scrollX + rect.left + rect.width / 2 - 90,
    };
  }

  function getOrCreateButton() {
    let btn = document.getElementById(BTN_ID);
    if (btn) return btn;
    btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Generate shareable quote card from selection');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5h16v14H4z M4 9h16 M9 13h6"/></svg>
      Make a quote card
    `;
    document.body.appendChild(btn);
    return btn;
  }

  function hideButton() {
    const btn = document.getElementById(BTN_ID);
    if (btn) btn.remove();
  }

  function showToast(msg) {
    const existing = document.getElementById('lighthouse-quote-card-toast');
    if (existing) existing.remove();
    const t = document.createElement('div');
    t.id = 'lighthouse-quote-card-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.remove(); }, 2600);
  }

  // ─────────────────────────────────────────────────────
  // Canvas rendering
  // ─────────────────────────────────────────────────────

  function wrapLines(ctx, text, maxWidth) {
    // Simple greedy word-wrap
    const words = text.split(/\s+/);
    const lines = [];
    let current = '';
    for (const w of words) {
      const test = current ? current + ' ' + w : w;
      const metrics = ctx.measureText(test);
      if (metrics.width > maxWidth && current) {
        lines.push(current);
        current = w;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines;
  }

  function fitFont(ctx, text, maxWidth, maxHeight, fontFamily, maxLines) {
    // Try sizes from 68 down to 28 and pick the largest that fits
    for (let size = 68; size >= 28; size -= 2) {
      ctx.font = `italic 500 ${size}px ${fontFamily}`;
      const lineHeight = size * 1.3;
      const lines = wrapLines(ctx, text, maxWidth);
      if (lines.length > maxLines) continue;
      if (lines.length * lineHeight <= maxHeight) {
        return { size, lineHeight, lines };
      }
    }
    ctx.font = `italic 500 28px ${fontFamily}`;
    const lineHeight = 28 * 1.3;
    const lines = wrapLines(ctx, text, maxWidth);
    return { size: 28, lineHeight, lines };
  }

  function renderCard(text) {
    const W = 1080;
    const H = 1350;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, BG_DARK);
    bg.addColorStop(0.6, BG_DARK);
    bg.addColorStop(1, BG_WARM);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Subtle radial glow (ember) near top-right
    const glow = ctx.createRadialGradient(W * 0.82, H * 0.15, 0, W * 0.82, H * 0.15, 650);
    glow.addColorStop(0, 'rgba(232, 100, 44, 0.18)');
    glow.addColorStop(1, 'rgba(232, 100, 44, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Top + bottom ember-gold bars
    const topBar = ctx.createLinearGradient(0, 0, W, 0);
    topBar.addColorStop(0, EMBER);
    topBar.addColorStop(1, GOLD);
    ctx.fillStyle = topBar;
    ctx.fillRect(0, 0, W, 10);
    const bottomBar = ctx.createLinearGradient(0, 0, W, 0);
    bottomBar.addColorStop(0, GOLD);
    bottomBar.addColorStop(1, EMBER);
    ctx.fillStyle = bottomBar;
    ctx.fillRect(0, H - 10, W, 10);

    // Big ornamental opening quote mark
    ctx.fillStyle = 'rgba(212, 162, 84, 0.18)';
    ctx.font = 'bold 340px Georgia, serif';
    ctx.textBaseline = 'top';
    ctx.fillText('\u201C', 56, 70);

    // Main quote text
    const padding = 100;
    const textMaxWidth = W - padding * 2;
    const textMaxHeight = H - 440;
    const fit = fitFont(ctx, text, textMaxWidth, textMaxHeight, 'Georgia, serif', 12);
    ctx.fillStyle = BODY;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `italic 500 ${fit.size}px Georgia, serif`;

    const blockHeight = fit.lines.length * fit.lineHeight;
    const blockTop = (H - blockHeight) / 2 - 40; // lift slightly above center to make room for attribution
    for (let i = 0; i < fit.lines.length; i++) {
      const y = blockTop + (i + 0.5) * fit.lineHeight;
      ctx.fillText(fit.lines[i], W / 2, y);
    }

    // Thin gold divider below quote
    const dividerY = H - 280;
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 80, dividerY);
    ctx.lineTo(W / 2 + 80, dividerY);
    ctx.stroke();

    // Wordmark
    ctx.fillStyle = GOLD;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = 'bold 44px Georgia, serif';
    ctx.fillText('Adopted by Grace', W / 2, dividerY + 28);

    // Tagline
    ctx.fillStyle = MUTED;
    ctx.font = '500 22px -apple-system, system-ui, sans-serif';
    ctx.fillText('The biblical case for divine sovereignty', W / 2, dividerY + 90);

    // URL / canonical footer (monospaced, muted)
    const canonical =
      (document.querySelector('link[rel="canonical"]')?.href) ||
      window.location.origin + window.location.pathname;
    // Strip protocol
    const display = canonical.replace(/^https?:\/\//, '');
    ctx.fillStyle = MUTED;
    ctx.font = '500 20px "SF Mono", Menlo, monospace';
    ctx.fillText(display, W / 2, dividerY + 140);

    return canvas;
  }

  async function canvasToBlob(canvas) {
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.95));
  }

  async function copyBlobToClipboard(blob) {
    if (!navigator.clipboard || !window.ClipboardItem) return false;
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      return true;
    } catch (e) {
      return false;
    }
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function handleGenerate() {
    const text = currentSelectionText();
    if (!text || text.length < 8) {
      showToast('Highlight some text first');
      return;
    }
    // Cap at ~400 chars for legibility — if longer, truncate with ellipsis
    const clean = text.length > 400 ? text.slice(0, 397).trim() + '…' : text;
    const canvas = renderCard(clean);
    const blob = await canvasToBlob(canvas);
    const slug = (window.location.pathname.split('/').pop() || 'quote').replace(/\.html$/, '');
    const stamp = new Date().toISOString().split('T')[0];
    downloadBlob(blob, `adoptedbygrace-${slug || 'quote'}-${stamp}.png`);
    const copied = await copyBlobToClipboard(blob);
    showToast(copied ? '✓ Card copied to clipboard & saved' : '✓ Card downloaded');
    hideButton();
    // Clear selection so the button re-triggers on next highlight
    try { window.getSelection().removeAllRanges(); } catch (e) {}
  }

  // ─────────────────────────────────────────────────────
  // Event wiring
  // ─────────────────────────────────────────────────────

  function onSelectionChange() {
    const text = currentSelectionText();
    if (!text || text.length < 8) { hideButton(); return; }
    if (selectionInSkipRegion()) { hideButton(); return; }
    const pos = placeButton();
    if (!pos) { hideButton(); return; }
    const btn = getOrCreateButton();
    btn.style.top = pos.top + 'px';
    btn.style.left = pos.left + 'px';
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleGenerate();
    };
  }

  // Debounce selection change — otherwise mid-drag it fires dozens of times
  let selTimer = null;
  document.addEventListener('selectionchange', () => {
    if (selTimer) clearTimeout(selTimer);
    selTimer = setTimeout(onSelectionChange, 140);
  });
  document.addEventListener('mouseup', onSelectionChange);
  document.addEventListener('keyup', (e) => {
    if (e.shiftKey || ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) {
      onSelectionChange();
    }
  });
  // Hide on scroll (the position would otherwise drift)
  window.addEventListener('scroll', hideButton, { passive: true });
  window.addEventListener('resize', hideButton);

  injectStyle();
})();
