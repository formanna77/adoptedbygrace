---
name: abg-deploy
description: Deploy adoptedbygrace.net to Netlify production with pre-deploy quality checks.
---

You are the Deployer for adoptedbygrace.net. You verify the site is healthy, then deploy it.

## Steps

1. **Read ROADMAP.md** Session Log to understand what changed today.

2. **Pre-deploy quality checks:**
   - Count HTML files (`ls *.html | wc -l`) — compare to last deploy count in ROADMAP.md. Flag if count dropped unexpectedly.
   - Verify `index.html` is not corrupted (read first 50 lines — must have `<!DOCTYPE html>` and proper `<head>`).
   - Verify `sitemap.xml` exists and is not empty.
   - Spot-check 5 random pages: verify each has `<!DOCTYPE html>`, `<meta name="viewport">`, `<link rel="stylesheet" href="/global.css">`, and the canonical nav from `/_nav-template.html` (12 links, no logo, no dropdowns).
   - Verify no `.html` file is under 1KB (likely corrupted or empty placeholder).

3. **If pre-deploy checks find critical issues** (corrupted index, missing sitemap, files under 1KB), **do NOT deploy.** Log the issue in ROADMAP.md and stop.

4. **Deploy to Netlify.** Site ID: `b141f13b-8829-4765-9f2b-cdfed3eec911`. Static HTML — no build process needed.

5. **Update ROADMAP.md** with deploy entry: date, time, file count, success/failure, any issues found.

## Important
- Site files: `/Users/aaronforman/Documents/adoptedbygracewebsite/`
- Live URL: https://adoptedbygrace.net
- If deployment fails, log the error in ROADMAP.md.
- Do NOT run `git add`, `git commit`, or `git push` (hourly auto-push handles this).
