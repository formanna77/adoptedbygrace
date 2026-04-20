/*
 * share-bar.js — Universal share bar
 * Auto-injects a share UI at the end of <article class="article-body">
 * on any page that includes it. Silent no-op on pages without an article.
 *
 * Channels: X (Twitter), Facebook, Email, Copy Link.
 * Zero dependencies. Respects prefers-reduced-motion.
 */
(function () {
  'use strict';

  // Skip if already injected (e.g., manual share bar present)
  if (document.getElementById('share-bar-universal')) return;

  // Inject once the DOM is ready
  function init() {
    var article = document.querySelector('article.article-body');
    if (!article) return;

    // If a manual share-buttons block already exists inside this article, skip
    if (article.querySelector('.share-buttons, .share-bar-universal')) return;

    injectStyles();

    var url = location.href;
    var title = document.title.replace(/\s*\|\s*Adopted by Grace.*$/i, '').trim();
    var shareText = encodeURIComponent(title);
    var shareUrl = encodeURIComponent(url);

    var bar = document.createElement('aside');
    bar.id = 'share-bar-universal';
    bar.className = 'share-bar-universal';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Share this article');
    bar.innerHTML =
      '<div class="share-bar-inner">' +
      '  <span class="share-bar-label">If this helped, pass it on.</span>' +
      '  <div class="share-bar-buttons">' +
      '    <a class="share-bar-btn" href="https://twitter.com/intent/tweet?url=' + shareUrl + '&text=' + shareText + '" target="_blank" rel="noopener" aria-label="Share on X" title="Share on X">' +
      '      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
      '    </a>' +
      '    <a class="share-bar-btn" href="https://www.facebook.com/sharer/sharer.php?u=' + shareUrl + '" target="_blank" rel="noopener" aria-label="Share on Facebook" title="Share on Facebook">' +
      '      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.52l.36-2.94H13.5V8.7c0-.84.24-1.41 1.44-1.41h1.53V4.62c-.27-.03-1.17-.12-2.22-.12-2.19 0-3.69 1.34-3.69 3.78v2.28H8v2.94h2.56V21z"/></svg>' +
      '    </a>' +
      '    <a class="share-bar-btn" href="mailto:?subject=' + shareText + '&body=I thought you might appreciate this: ' + shareUrl + '" aria-label="Share by email" title="Share by email">' +
      '      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4v10h16V8l-8 5z"/></svg>' +
      '    </a>' +
      '    <button type="button" class="share-bar-btn share-bar-copy" aria-label="Copy link" title="Copy link">' +
      '      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.41 1.41 1.41 1.42 1.42-1.42a3 3 0 0 1 4.24 4.25l-3 3a3 3 0 0 1-4.24 0 1 1 0 0 0-1.42 1.41zm4-2a5 5 0 0 0-7.07 0l-3 3a5 5 0 1 0 7.07 7.07l1.41-1.41-1.41-1.41-1.42 1.41a3 3 0 0 1-4.24-4.24l3-3a3 3 0 0 1 4.24 0 1 1 0 0 0 1.42-1.42z"/></svg>' +
      '      <span class="share-bar-copy-text">Copy link</span>' +
      '    </button>' +
      '  </div>' +
      '</div>';

    article.appendChild(bar);

    // Wire copy button
    var copyBtn = bar.querySelector('.share-bar-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(showCopied).catch(fallbackCopy);
        } else {
          fallbackCopy();
        }
      });
    }

    function showCopied() {
      var label = copyBtn.querySelector('.share-bar-copy-text');
      if (!label) return;
      var prev = label.textContent;
      label.textContent = 'Copied ✓';
      copyBtn.classList.add('is-copied');
      setTimeout(function () {
        label.textContent = prev;
        copyBtn.classList.remove('is-copied');
      }, 1800);
    }

    function fallbackCopy() {
      try {
        var ta = document.createElement('textarea');
        ta.value = url;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showCopied();
      } catch (e) { /* noop */ }
    }
  }

  function injectStyles() {
    if (document.getElementById('share-bar-universal-styles')) return;
    var style = document.createElement('style');
    style.id = 'share-bar-universal-styles';
    style.textContent =
      '.share-bar-universal{margin:3rem auto 1.5rem;padding:1.5rem 1.75rem;background:linear-gradient(135deg,rgba(212,162,84,.05),rgba(139,92,246,.03));border:1px solid rgba(212,162,84,.18);border-radius:14px;max-width:740px}' +
      '.share-bar-inner{display:flex;align-items:center;justify-content:space-between;gap:1.25rem;flex-wrap:wrap}' +
      '.share-bar-label{font-family:"Playfair Display",Georgia,serif;font-size:1.05rem;color:var(--text-primary,#f0e8d8);font-style:italic;letter-spacing:.01em}' +
      '.share-bar-buttons{display:flex;gap:.5rem;align-items:center}' +
      '.share-bar-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;min-width:44px;min-height:44px;padding:.55rem .9rem;background:rgba(212,162,84,.08);border:1px solid rgba(212,162,84,.3);border-radius:10px;color:var(--accent-gold,#d4a254);text-decoration:none;font-family:"JetBrains Mono",monospace;font-size:.8rem;letter-spacing:.05em;cursor:pointer;transition:background .2s ease,transform .2s ease,color .2s ease}' +
      '.share-bar-btn:hover,.share-bar-btn:focus-visible{background:rgba(212,162,84,.2);color:#fff3dc;transform:translateY(-1px);outline:none}' +
      '.share-bar-btn.is-copied{background:rgba(34,197,94,.2);border-color:rgba(34,197,94,.5);color:#86efac}' +
      '.share-bar-copy-text{display:inline-block;font-size:.78rem}' +
      '@media (prefers-reduced-motion:reduce){.share-bar-btn{transition:none}.share-bar-btn:hover,.share-bar-btn:focus-visible{transform:none}}' +
      '@media (max-width:540px){.share-bar-inner{flex-direction:column;align-items:stretch}.share-bar-buttons{justify-content:center;flex-wrap:wrap}}';
    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
