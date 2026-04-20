#!/usr/bin/env node
/**
 * visual-audit-3.js — Render every template category at mobile (375x812) and
 * desktop (1440x900) and screenshot the above-the-fold hero. Also scans each
 * rendered page's DOM for common design-flaw signatures and writes a report.
 *
 * Uses playwright-core + the playwright-shipped chromium-headless-shell,
 * because puppeteer's official Chrome builds are x86-only and this sandbox
 * is aarch64.
 */
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const http = require('http');

const REPO = '/sessions/great-beautiful-davinci/mnt/adoptedbygracewebsite';
const OUT  = '/sessions/great-beautiful-davinci/mnt/outputs/visual-audit-3';
fs.mkdirSync(OUT, { recursive: true });

const EXECUTABLE = '/sessions/great-beautiful-davinci/mnt/adoptedbygracewebsite/node_modules/playwright-core/.local-browsers/chromium_headless_shell-1217/chrome-linux/headless_shell';

// One representative page per template family.
const TARGETS = [
    'golden-chain.html',
    'fork-in-the-road.html',
    'history-augustine-pelagius.html',
    'anxious-mind-brain-decides.html',
    'question-romans9.html',
    'devotional-adoption-papers.html',
    'theologian-owen.html',
];

const VIEWPORTS = [
    { name: 'mobile',  width: 375,  height: 812 },
    { name: 'desktop', width: 1440, height: 900 },
];

function serve(rootDir) {
    const mime = {
        '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8',
        '.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8',
        '.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg',
        '.webp':'image/webp','.ico':'image/x-icon','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf',
    };
    const server = http.createServer((req, res) => {
        try {
            let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
            if (urlPath.endsWith('/')) urlPath += 'index.html';
            let abs = path.join(rootDir, urlPath);
            if (!fs.existsSync(abs) && fs.existsSync(abs + '.html')) abs = abs + '.html';
            if (!fs.existsSync(abs) || fs.statSync(abs).isDirectory()) { res.writeHead(404); res.end('404'); return; }
            const ext = path.extname(abs).toLowerCase();
            res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
            fs.createReadStream(abs).pipe(res);
        } catch (e) { res.writeHead(500); res.end(String(e)); }
    });
    return new Promise((resolve) => server.listen(0, () => resolve(server)));
}

(async () => {
    const server = await serve(REPO);
    const port = server.address().port;
    console.log('Serving on :' + port);

    const browser = await chromium.launch({ executablePath: EXECUTABLE, args: ['--no-sandbox','--disable-dev-shm-usage'] });
    const report = [];

    for (const target of TARGETS) {
        for (const vp of VIEWPORTS) {
            const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 2, userAgent: vp.name === 'mobile' ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1' : undefined });
            const page = await ctx.newPage();
            const url = `http://localhost:${port}/${target}`;
            let error = null;
            try { await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }); }
            catch (e) { error = String(e); }
            if (error) { report.push({ target, viewport: vp.name, error }); await ctx.close(); continue; }
            await page.waitForTimeout(400);

            const diag = await page.evaluate(() => {
                const strayBanned = document.querySelectorAll('.article-toc, .section-nav, .section-nav-container, .section-nav-inner, nav[aria-label="Table of contents"], nav[aria-label="On this page"], nav[aria-label="Jump to"]').length;
                const readingBadges = document.querySelectorAll('.page-hero .eyebrow .reading-time-badge').length;
                const hardcodedMinRead = Array.from(document.querySelectorAll('.page-hero')).some(h => /\bmin\s+read\b/i.test(h.textContent || ''));
                const heroH1Count = document.querySelectorAll('header.page-hero h1').length;
                const breadcrumbEl = document.querySelector('.ux-breadcrumbs');
                let breadcrumbLines = 0, breadcrumbText = '';
                if (breadcrumbEl) {
                    breadcrumbText = (breadcrumbEl.textContent || '').replace(/\s+/g, ' ').trim();
                    const h = breadcrumbEl.getBoundingClientRect().height;
                    const lh = parseFloat(getComputedStyle(breadcrumbEl).lineHeight) || 20;
                    breadcrumbLines = Math.round(h / lh);
                }
                const docWidth = document.documentElement.scrollWidth;
                const vpWidth  = window.innerWidth;
                const overflow = docWidth > vpWidth + 1;
                const brokenImages = Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0).map(i => i.src);
                // Gap check: distance between page-hero subtitle bottom and article-body first-child top.
                let heroToBodyGap = null;
                const subtitle = document.querySelector('.page-hero .hub-subtitle, .page-hero .subtitle, .page-hero h1');
                const body = document.querySelector('article.article-body');
                if (subtitle && body) {
                    const a = subtitle.getBoundingClientRect();
                    const firstChild = body.firstElementChild;
                    if (firstChild) {
                        const b = firstChild.getBoundingClientRect();
                        heroToBodyGap = Math.round(b.top - a.bottom);
                    }
                }
                return { strayBanned, readingBadges, hardcodedMinRead, heroH1Count, breadcrumbLines, breadcrumbText, docWidth, vpWidth, overflow, brokenImages, heroToBodyGap };
            });

            const shotPath = path.join(OUT, `${target.replace(/\//g, '_')}__${vp.name}.png`);
            try { await page.screenshot({ path: shotPath, fullPage: false }); } catch {}
            report.push({ target, viewport: vp.name, ...diag, screenshot: shotPath });
            await ctx.close();
        }
    }
    await browser.close();
    server.close();

    const lines = ['# Visual Audit — ' + new Date().toISOString(), ''];
    for (const r of report) {
        lines.push(`## ${r.target} — ${r.viewport}`);
        if (r.error) { lines.push('**ERROR:** ' + r.error); lines.push(''); continue; }
        const flags = [];
        if (r.strayBanned) flags.push(`stray banned nodes: ${r.strayBanned}`);
        if (r.readingBadges > 1) flags.push(`duplicate reading-time badges: ${r.readingBadges}`);
        const hubPages = ['index.html','devotionals.html','questions.html'];
        if (r.heroH1Count !== 1 && !hubPages.includes(r.target)) flags.push(`hero h1 count: ${r.heroH1Count}`);
        if (r.overflow) flags.push(`H-OVERFLOW: doc=${r.docWidth} vp=${r.vpWidth}`);
        if (r.brokenImages && r.brokenImages.length) flags.push(`broken images: ${r.brokenImages.length}`);
        if (r.breadcrumbLines > 2) flags.push(`breadcrumb wraps to ${r.breadcrumbLines} lines`);
        if (r.heroToBodyGap != null && r.heroToBodyGap > 220) flags.push(`large hero→body gap: ${r.heroToBodyGap}px`);
        lines.push(flags.length ? ('- ⚠ ' + flags.join('; ')) : '- ok');
        if (r.heroToBodyGap != null) lines.push(`  hero→body gap: ${r.heroToBodyGap}px`);
        if (r.breadcrumbText) lines.push(`  crumb (${r.breadcrumbLines}L): ${r.breadcrumbText}`);
        lines.push('');
    }
    fs.writeFileSync(path.join(OUT, 'report.md'), lines.join('\n'));
    console.log('\nReport written to', path.join(OUT, 'report.md'));
})().catch(err => { console.error(err); process.exit(1); });
