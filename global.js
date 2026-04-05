/* ============================================================
   ADOPTED BY GRACE — Global Interactions v2
   Mega-menu dropdowns, scroll reveals, starfield, nav effects
   ============================================================ */

// ===== NAV SCROLL EFFECT =====
// Handled by nav.js — do NOT duplicate here.

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
                <a href="/contact" class="engage-cta-card">
                    <div class="engage-cta-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <span class="engage-cta-label">Ask a Question</span>
                    <span class="engage-cta-desc">We love wrestling with Scripture together.</span>
                </a>
                <a href="/contact" class="engage-cta-card">
                    <div class="engage-cta-icon engage-cta-icon-ember">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </div>
                    <span class="engage-cta-label">Share a Prayer</span>
                    <span class="engage-cta-desc">We will intercede for you.</span>
                </a>
                <a href="/contact" class="engage-cta-card">
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



// Scroll-reveal animation REMOVED 2026-03-29 — CSS rules deleted, this code was orphaned.
