/**
 * Browser QA with headless Chrome (puppeteer-core). Usage: npm run qa:browser
 * Set CHROME_PATH if Chrome is not at the default macOS location.
 * Checks every page at 1440px and 390px for horizontal overflow, broken images and console errors,
 * then exercises navigation, mobile menu, accordion, tabs, filters, search and form validation.
 */
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 8799;
const BASE = `http://localhost:${PORT}/`;

const server = spawn(process.execPath, [path.join(ROOT, 'scripts/serve.mjs'), '--port', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 600));

const sitemap = await readFile(path.join(ROOT, 'sitemap.xml'), 'utf8');
const pages = [...sitemap.matchAll(/<loc>[^<]*?\.com\/([^<]*)<\/loc>/g)].map((m) => m[1] || 'index.html').map((p) => (p.endsWith('/') || p === '' ? p + 'index.html' : p));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const problems = [];
const fail = (m) => problems.push(m);

async function check(page, width) {
  const p = await browser.newPage();
  await p.setViewport({ width, height: 900 });
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('requestfailed', (r) => errors.push('request failed ' + r.url()));
  await p.goto(BASE + page, { waitUntil: 'networkidle0' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 25)); } });
  await p.waitForNetworkIdle({ idleTime: 200 });
  const r = await p.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')),
    header: !!document.querySelector('header[data-wm-ready]'),
    footer: !!document.querySelector('footer[data-wm-ready]'),
  }));
  if (r.overflow > 0) fail(`${page} @${width}: horizontal overflow ${r.overflow}px`);
  if (r.broken.length) fail(`${page} @${width}: broken images ${r.broken.join(', ')}`);
  if (!r.header || !r.footer) fail(`${page} @${width}: header/footer not initialised`);
  errors.forEach((e) => fail(`${page} @${width}: ${e}`));
  await p.close();
}

for (const page of pages) for (const w of [1440, 390]) await check(page, w);
console.log(`Checked ${pages.length} pages at 1440px and 390px.`);

// ---------- Interaction tests ----------
const t = await browser.newPage();
const ok = (cond, msg) => { if (!cond) fail('Interaction: ' + msg); else console.log('  ✓ ' + msg); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

await t.setViewport({ width: 390, height: 844 });
await t.goto(BASE + 'industries/healthcare.html', { waitUntil: 'networkidle0' });
await t.click('[data-mobile-toggle]');
ok(await t.$eval('#mobile-menu', (m) => !m.hidden), 'mobile menu opens');
ok(await t.$eval('#mobile-sub-industries', (m) => !m.hidden), 'mobile menu expands the active section');
await t.keyboard.press('Escape');
ok(await t.$eval('#mobile-menu', (m) => m.hidden), 'mobile menu closes with Escape');
ok(await t.evaluate(() => document.activeElement.id === 'mobile-menu-toggle'), 'focus returns to menu button');

await t.setViewport({ width: 1440, height: 900 });
await t.goto(BASE + 'ai/generative-ai.html', { waitUntil: 'networkidle0' });
ok(await t.$eval('[data-nav-key="ai"].nav-item', (e) => e.classList.contains('is-active')), 'active nav item marked on nested page');
await t.click('[data-nav-key="industries"] [data-nav-toggle]');
ok(await t.$eval('#nav-panel-industries', (e) => !e.hidden), 'mega menu opens on click');
await t.keyboard.press('Escape');
ok(await t.$eval('#nav-panel-industries', (e) => e.hidden), 'mega menu closes with Escape');
await t.click('.accordion-trigger');
ok(await t.$eval('.accordion-trigger', (b) => b.getAttribute('aria-expanded') === 'true' && !document.getElementById(b.getAttribute('aria-controls')).hidden), 'FAQ accordion expands');

await t.goto(BASE + 'ai/index.html', { waitUntil: 'networkidle0' });
await t.focus('#dept-tab-0');
await t.keyboard.press('ArrowRight');
ok(await t.evaluate(() => document.activeElement.id === 'dept-tab-1' && !document.getElementById('dept-panel-1').hidden && document.getElementById('dept-panel-0').hidden), 'tabs switch with arrow keys');

await t.goto(BASE + 'resources/blog.html', { waitUntil: 'networkidle0' });
await t.click('[data-filter="security"]');
ok(await t.$$eval('[data-filter-item]', (els) => els.filter((e) => !e.hidden).length === 1), 'blog category filter');
await t.click('[data-filter="all"]');
await t.type('[data-filter-search]', 'zzzz');
ok(await t.$eval('[data-filter-empty]', (e) => !e.hidden), 'blog search shows empty state');

await t.click('[data-search-open]');
await t.type('[data-search-input]', 'cloud devops');
await wait(400);
ok(await t.$$eval('[data-search-results] a', (a) => a.length > 0 && a[0].href.includes('cloud-devops')), 'site search returns relevant results');
await t.keyboard.press('Escape');

await t.goto(BASE + 'contact-us/index.html', { waitUntil: 'networkidle0' });
await t.click('#inquiry-form [data-submit]');
ok(await t.$eval('[data-error-summary]', (e) => !e.hidden && document.activeElement === e), 'empty submit shows and focuses error summary');
ok(await t.$eval('#iq-email', (e) => e.getAttribute('aria-invalid') === 'true'), 'required email flagged aria-invalid');
await t.type('#iq-name', 'Asha Verma');
await t.type('#iq-email', 'not-an-email');
await t.type('#iq-company', 'Example Co');
await t.type('#iq-country', 'India');
await t.select('#iq-service', 'Web Application Development');
await t.type('#iq-details', 'We need a customer portal connected to our ERP for order tracking.');
await t.click('#inquiry-form-consent');
await t.click('#inquiry-form [data-submit]');
ok(await t.$eval('#iq-email-error', (e) => !e.hidden && /valid email/.test(e.textContent)), 'invalid email message shown');
await t.click('#iq-email', { clickCount: 3 });
await t.type('#iq-email', 'asha@example.com');
await t.click('#inquiry-form [data-submit]');
ok(await t.$eval('[data-form-status]', (e) => /not\s+been sent/.test(e.textContent)), 'valid form explains backend is not connected (no fake success)');
ok(await t.evaluate(() => localStorage.length === 0 && sessionStorage.length === 0), 'nothing stored in browser storage');

await browser.close();
server.kill();

if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  problems.forEach((p) => console.log(' - ' + p));
  process.exit(1);
}
console.log('All browser QA checks passed.');
