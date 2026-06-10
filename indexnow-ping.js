#!/usr/bin/env node
/**
 * indexnow-ping.js — submit every sitemap URL to IndexNow (Bing, Seznam, Naver, Yandex).
 *
 * Run AFTER a deploy (the key file must be live at the site root first):
 *   node indexnow-ping.js
 *
 * IndexNow is free and keyless beyond the self-issued key file already in this
 * repo (e1fe0ab8feb1cc06e7918835bec59ae9.txt). One POST covers all participating
 * engines. Google does not use IndexNow — GSC request-indexing covers Google
 * (see docs/request-indexing-queue.md).
 */
const fs = require("fs");
const https = require("https");

const HOST = "adoptedbygrace.net";
const KEY = "e1fe0ab8feb1cc06e7918835bec59ae9";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const sitemap = fs.readFileSync("sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].trim());
if (urls.length === 0) { console.error("No URLs found in sitemap.xml"); process.exit(1); }

const body = JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls });

const req = https.request(
  {
    hostname: "api.indexnow.org",
    path: "/indexnow",
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8", "Content-Length": Buffer.byteLength(body) },
  },
  res => {
    console.log(`IndexNow response: HTTP ${res.statusCode} (200/202 = accepted) — ${urls.length} URLs submitted`);
    res.on("data", d => process.stdout.write(d));
  }
);
req.on("error", e => { console.error("IndexNow ping failed:", e.message); process.exit(1); });
req.write(body);
req.end();
