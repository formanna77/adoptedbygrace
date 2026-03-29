/* ============================================================
   ADOPTED BY GRACE — Global Interactions v2
   Mega-menu dropdowns, scroll reveals, starfield, nav effects
   ============================================================ */

// ===== NAV SCROLL EFFECT =====
(function() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
})();

// ===== HAMBURGER MENU =====
// Handled by nav.js — do NOT duplicate here.
// Both scripts toggling the same class cancels each other out.

// ===== MOBILE DROPDOWN TOGGLES =====
(function() {
    const triggers = document.querySelectorAll('.nav-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const li = trigger.parentElement;
            // On mobile, toggle dropdown open/closed
            if (window.innerWidth <= 900) {
                e.preventDefault();
                li.classList.toggle('dropdown-open');
                // Close other dropdowns
                document.querySelectorAll('.nav-links > li.dropdown-open').forEach(item => {
                    if (item !== li) item.classList.remove('dropdown-open');
                });
            }
        });
    });
    // Close mobile menu on link click
    document.querySelectorAll('.nav-dropdown a').forEach(a => {
        a.addEventListener('click', () => {
            const btn = document.querySelector('.hamburger');
            const links = document.querySelector('.nav-links');
            if (btn && links && window.innerWidth <= 900) {
                btn.classList.remove('active');
                links.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();

// ===== SCROLL REVEAL =====
(function() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12 });
    reveals.forEach(r => observer.observe(r));
})();

// ===== BACK TO TOP =====
(function() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 600);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ===== MINI STARFIELD (sub-pages) =====
(function() {
    const hero = document.querySelector('.page-hero');
    if (!hero) return;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    hero.insertBefore(canvas, hero.firstChild);
    const ctx = canvas.getContext('2d');
    let stars = [];
    const COUNT = 80;
    function resize() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            r: Math.random() * 1.2 + 0.3, vx: (Math.random()-0.5)*0.15, vy: (Math.random()-0.5)*0.15,
            o: Math.random() * 0.4 + 0.15, pulse: Math.random() * Math.PI * 2
        });
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let s of stars) {
            s.x += s.vx; s.y += s.vy; s.pulse += 0.015;
            if (s.x < 0) s.x = canvas.width; if (s.x > canvas.width) s.x = 0;
            if (s.y < 0) s.y = canvas.height; if (s.y > canvas.height) s.y = 0;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212,162,84,${s.o + Math.sin(s.pulse)*0.1})`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// ===== AUTO-REVEAL =====
(function() {
    const sections = document.querySelectorAll('.content-section, .card-grid');
    if (!sections.length) return;
    sections.forEach(s => { if (!s.classList.contains('reveal')) s.classList.add('reveal'); });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    sections.forEach(s => observer.observe(s));
})();

// ===== ACCORDION =====
(function() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');
            const isOpen = item.classList.contains('open');
            // Close siblings if inside same accordion
            const accordion = item.closest('.accordion');
            if (accordion) {
                accordion.querySelectorAll('.accordion-item.open').forEach(openItem => {
                    if (openItem !== item) {
                        openItem.classList.remove('open');
                        openItem.querySelector('.accordion-body').style.maxHeight = '0';
                    }
                });
            }
            if (isOpen) {
                item.classList.remove('open');
                body.style.maxHeight = '0';
            } else {
                item.classList.add('open');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
    // Open first item by default if has .accordion-open-first
    document.querySelectorAll('.accordion.accordion-open-first .accordion-item:first-child').forEach(item => {
        item.classList.add('open');
        const body = item.querySelector('.accordion-body');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
    });
})();

// ===== TABS =====
(function() {
    document.querySelectorAll('.tabs').forEach(tabGroup => {
        const btns = tabGroup.querySelectorAll('.tab-btn');
        const panels = tabGroup.querySelectorAll('.tab-content');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;
                btns.forEach(b => b.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                btn.classList.add('active');
                const panel = tabGroup.querySelector(`[data-tab-content="${target}"]`) || tabGroup.querySelector(`#${target}`);
                if (panel) panel.classList.add('active');
            });
        });
        // Activate first tab by default
        if (btns.length && !tabGroup.querySelector('.tab-btn.active')) {
            btns[0].click();
        }
    });
})();

// ===== PROGRESS BARS (animate on scroll) =====
(function() {
    const bars = document.querySelectorAll('.progress-fill[data-width]');
    if (!bars.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width + '%';
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(bar => observer.observe(bar));
})();

// ===== STAT COUNTER ANIMATION =====
(function() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix || '';
            const prefix = el.dataset.prefix || '';
            const duration = 1800;
            const start = performance.now();
            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = prefix + Math.round(eased * target).toLocaleString() + suffix;
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
            observer.unobserve(el);
        });
    }, { threshold: 0.3 });
    counters.forEach(c => observer.observe(c));
})();

// ===== READING PROGRESS BAR =====
(function() {
    const bar = document.querySelector('.reading-progress');
    if (!bar) return;
    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = docHeight > 0 ? (scrollTop / docHeight * 100) + '%' : '0%';
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
})();

// ===== STAGGER REVEAL =====
(function() {
    const staggers = document.querySelectorAll('.stagger');
    if (!staggers.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    staggers.forEach(s => observer.observe(s));
})();

// ===== SMOOTH ANCHOR SCROLLING =====
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if (id === '#' || id === '#top') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('nav')?.offsetHeight || 56;
                window.scrollTo({ top: target.offsetTop - navHeight - 16, behavior: 'smooth' });
            }
        });
    });
})();

// ===== SOCIAL SHARE BUTTONS =====
(function() {
    // Only inject on content pages (pages with a main h1 and article-like content)
    const h1 = document.querySelector('h1');
    const main = document.querySelector('#main-content, .page-hero, .hero');
    if (!h1 || !main) return;
    // Skip pages that already have share buttons or are utility pages
    if (document.querySelector('.share-bar') ||
        window.location.pathname === '/' ||
        window.location.pathname.includes('search') ||
        window.location.pathname.includes('quiz') ||
        window.location.pathname.includes('connect') ||
        window.location.pathname.includes('donate')) return;

    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const text = encodeURIComponent(h1.textContent + ' — Adopted by Grace');
    const emailSubject = encodeURIComponent('Check this out: ' + h1.textContent);
    const emailBody = encodeURIComponent(h1.textContent + '\n\nRead more at: ' + window.location.href + '\n\n— Shared from Adopted by Grace (adoptedbygrace.net)');
    const whatsappText = encodeURIComponent(h1.textContent + ' — Read more: ' + window.location.href);

    const bar = document.createElement('div');
    bar.className = 'share-bar';
    bar.setAttribute('aria-label', 'Share this page');
    bar.innerHTML = `
        <span class="share-label">Share the Truth</span>
        <a href="https://twitter.com/intent/tweet?url=${url}&text=${text}" target="_blank" rel="noopener" class="share-btn share-twitter" aria-label="Share on X/Twitter" title="Share on X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener" class="share-btn share-facebook" aria-label="Share on Facebook" title="Share on Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="https://api.whatsapp.com/send?text=${whatsappText}" target="_blank" rel="noopener" class="share-btn share-whatsapp" aria-label="Share on WhatsApp" title="Share on WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
        <a href="mailto:?subject=${emailSubject}&body=${emailBody}" class="share-btn share-email" aria-label="Share via Email" title="Share via Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
        </a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" rel="noopener" class="share-btn share-linkedin" aria-label="Share on LinkedIn" title="Share on LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <button class="share-btn share-copy" aria-label="Copy link" title="Copy link to clipboard" onclick="navigator.clipboard.writeText(window.location.href).then(()=>{this.classList.add('copied');this.title='Copied!';setTimeout(()=>{this.classList.remove('copied');this.title='Copy link to clipboard'},2000)})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
    `;

    // Insert after the hero/main-content section
    const insertTarget = document.querySelector('.page-hero') || document.querySelector('.hero') || main;
    if (insertTarget && insertTarget.parentNode) {
        insertTarget.parentNode.insertBefore(bar, insertTarget.nextSibling);
    }
})();

// ===== FLOATING NEWSLETTER CTA =====
(function() {
    // Only show on content pages, not utility pages
    const skipPaths = ['/', '/connect', '/donate', '/search', '/quiz', '/community', '/explore-map'];
    const path = window.location.pathname.replace('.html', '').replace(/\/$/, '') || '/';
    if (skipPaths.includes(path)) return;
    if (document.querySelector('.newsletter-float')) return;

    // Check if user has already dismissed or subscribed (sessionStorage only)
    const dismissed = sessionStorage.getItem('abg-newsletter-dismissed');
    if (dismissed) return;

    // Create the floating CTA after a scroll delay
    let shown = false;
    window.addEventListener('scroll', function showNewsletterCTA() {
        if (shown) return;
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent < 40) return;
        shown = true;

        const cta = document.createElement('div');
        cta.className = 'newsletter-float';
        cta.innerHTML = `
            <button class="newsletter-float-close" aria-label="Close newsletter signup" title="Close">&times;</button>
            <div class="newsletter-float-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
            </div>
            <p class="newsletter-float-text">Daily devotionals in sovereign grace.</p>
            <form class="newsletter-float-form" method="POST" data-netlify="true" name="newsletter">
                <input type="hidden" name="form-name" value="newsletter">
                <input type="hidden" name="bot-field" style="display:none;">
                <input type="email" name="email" required placeholder="your@email.com" aria-label="Email for newsletter" class="newsletter-float-input">
                <button type="submit" class="newsletter-float-btn">Subscribe</button>
            </form>
            <p class="newsletter-float-fine">Free daily devotionals & new content. No spam. Unsubscribe anytime.</p>
        `;

        document.body.appendChild(cta);

        // Animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => cta.classList.add('visible'));
        });

        // Close button
        cta.querySelector('.newsletter-float-close').addEventListener('click', () => {
            cta.classList.remove('visible');
            sessionStorage.setItem('abg-newsletter-dismissed', '1');
            setTimeout(() => cta.remove(), 400);
        });

        // Form submission via Netlify Forms
        cta.querySelector('.newsletter-float-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const btn = form.querySelector('.newsletter-float-btn');
            btn.textContent = 'Sending...';
            btn.disabled = true;
            try {
                const resp = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(new FormData(form)).toString()
                });
                if (resp.ok) {
                    cta.querySelector('.newsletter-float-text').textContent = 'You are subscribed!';
                    form.innerHTML = '<p style="color:#4ade80;font-size:0.85rem;margin:0;">Grace upon grace. Your daily devotionals are on the way.</p>';
                    sessionStorage.setItem('abg-newsletter-dismissed', '1');
                    setTimeout(() => { cta.classList.remove('visible'); setTimeout(() => cta.remove(), 400); }, 5000);
                } else { throw new Error('Submission failed'); }
            } catch {
                btn.textContent = 'Try Again';
                btn.disabled = false;
            }
        });
    });
})();

// ===== ENGAGEMENT CTA (CONTINUE THE CONVERSATION) =====
(function() {
    // Only inject on deep content pages (questions, devotionals, systematic, demolition, etc.)
    const path = window.location.pathname;
    const contentPrefixes = ['question-', 'devotional-', 'systematic-', 'demolition-', 'objection-', 'history-', 'theologian-', 'ot-', 'story-', 'secular-', 'compare-', 'resistance-', 'pastoral-'];
    const isContentPage = contentPrefixes.some(p => path.includes(p));
    if (!isContentPage) return;
    if (document.querySelector('.engage-cta-block')) return;

    // Find footer or cross-reference section to insert before
    const footer = document.querySelector('footer');
    if (!footer) return;

    const engageBlock = document.createElement('section');
    engageBlock.className = 'engage-cta-block';
    engageBlock.innerHTML = `
        <div class="engage-cta-inner">
            <h3 class="engage-cta-title">Continue the Conversation</h3>
            <p class="engage-cta-subtitle">This truth was not meant to stay on a screen. Let it move you.</p>
            <div class="engage-cta-grid">
                <a href="/connect" class="engage-cta-card">
                    <div class="engage-cta-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <span class="engage-cta-label">Ask a Question</span>
                    <span class="engage-cta-desc">We love wrestling with Scripture together.</span>
                </a>
                <a href="/connect#prayer" class="engage-cta-card" onclick="sessionStorage.setItem('abg-tab','prayer')">
                    <div class="engage-cta-icon engage-cta-icon-ember">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </div>
                    <span class="engage-cta-label">Share a Prayer</span>
                    <span class="engage-cta-desc">We will intercede for you.</span>
                </a>
                <a href="/connect#testimony" class="engage-cta-card" onclick="sessionStorage.setItem('abg-tab','testimony')">
                    <div class="engage-cta-icon engage-cta-icon-violet">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </div>
                    <span class="engage-cta-label">Share Your Story</span>
                    <span class="engage-cta-desc">How has sovereign grace changed you?</span>
                </a>
                <a href="/donate" class="engage-cta-card">
                    <div class="engage-cta-icon engage-cta-icon-gold">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                    </div>
                    <span class="engage-cta-label">Support This Ministry</span>
                    <span class="engage-cta-desc">Help us reach more of God's elect.</span>
                </a>
            </div>
        </div>
    `;

    footer.parentNode.insertBefore(engageBlock, footer);
})();



// Scroll-reveal animation
(function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
})();
