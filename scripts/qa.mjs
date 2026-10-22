/**
 * Static QA for the built site. Usage: npm run qa
 * Checks: required pages exist, every relative href/src resolves, shared header/footer present,
 * unique titles/descriptions, one <h1> per page, image alt/width/height, no empty pages,
 * and no paragraph of body copy duplicated across pages (outside shared CTA/footer blocks).
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REQUIRED = [
  'index.html',
  'ai/index.html', 'ai/generative-ai.html', 'ai/ai-agent-development.html', 'ai/ai-chatbot-development.html', 'ai/ai-automation.html', 'ai/machine-learning.html',
  'services/index.html', 'services/software-development.html', 'services/web-development.html', 'services/mobile-app-development.html', 'services/saas-development.html', 'services/ecommerce-development.html', 'services/cloud-devops.html', 'services/api-integration.html', 'services/ui-ux-design.html',
  'engagement-models/index.html', 'engagement-models/dedicated-team.html', 'engagement-models/fixed-price.html', 'engagement-models/team-augmentation.html', 'engagement-models/managed-services.html',
  'industries/index.html', 'industries/healthcare.html', 'industries/fintech.html', 'industries/retail-ecommerce.html', 'industries/manufacturing.html', 'industries/logistics.html', 'industries/education.html', 'industries/real-estate.html',
  'solutions/index.html', 'solutions/business-automation.html', 'solutions/customer-support-ai.html', 'solutions/predictive-analytics.html', 'solutions/document-processing.html',
  'about-us/index.html', 'about-us/our-approach.html', 'about-us/careers.html',
  'resources/index.html', 'resources/blog.html', 'resources/ai-guides.html', 'resources/case-studies.html',
  'contact-us/index.html', 'sitemap.xml', 'robots.txt', 'assets/css/styles.css', 'assets/js/main.js', 'assets/js/components.js', 'partials/header.html', 'partials/footer.html',
];
const NAV_TARGETS = ['ai/index.html', 'services/index.html', 'engagement-models/index.html', 'industries/index.html', 'solutions/index.html', 'about-us/index.html', 'resources/index.html', 'contact-us/index.html'];

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (['node_modules', 'src', 'scripts', 'partials', '.git'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const exists = (p) => stat(p).then(() => true, () => false);
const problems = [];
const fail = (msg) => problems.push(msg);

for (const f of REQUIRED) if (!(await exists(path.join(ROOT, f)))) fail(`Missing required file: ${f}`);

const files = await walk(ROOT);
const titles = new Map(), descs = new Map(), paraIndex = new Map();
let linkCount = 0;

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const html = await readFile(file, 'utf8');
  const isTemplate404 = rel === '404.html';

  if (!/<header data-component="header"/.test(html)) fail(`${rel}: shared header missing`);
  if (!/<footer data-component="footer"/.test(html)) fail(`${rel}: shared footer missing`);
  const nav = html.match(/<nav aria-label="Primary"[\s\S]*?<\/nav>/)?.[0] || '';
  for (const t of NAV_TARGETS) if (!nav.includes(`${t}"`)) fail(`${rel}: primary nav lacks link to ${t}`);

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) fail(`${rel}: no <title>`);
  if (!desc) fail(`${rel}: no meta description`);
  if (titles.has(title)) fail(`${rel}: duplicate title with ${titles.get(title)}`); else titles.set(title, rel);
  if (descs.has(desc)) fail(`${rel}: duplicate description with ${descs.get(desc)}`); else descs.set(desc, rel);
  if (!/<link rel="canonical"/.test(html) || !/property="og:title"/.test(html)) fail(`${rel}: canonical/OG missing`);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(`${rel}: expected one <h1>, found ${h1s}`);

  const main = html.split('<main id="main" tabindex="-1">')[1]?.split('</main>')[0] || '';
  const words = main.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const listing = /^(sitemap|resources\/blog)\.html$/.test(rel);
  if (words < (isTemplate404 ? 20 : listing ? 150 : 250)) fail(`${rel}: main content looks thin (${words} words)`);

  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt="/.test(img)) fail(`${rel}: <img> without alt`);
    if (!/\swidth="\d+"/.test(img) || !/\sheight="\d+"/.test(img)) fail(`${rel}: <img> without width/height`);
  }

  // Resolve relative links and assets
  if (!isTemplate404) {
    for (const [, attr, url] of html.matchAll(/\s(href|src|srcset)="([^"]+)"/g)) {
      const urls = attr === 'srcset' ? url.split(',').map((s) => s.trim().split(' ')[0]) : [url];
      for (const u of urls) {
        if (/^(https?:|mailto:|tel:|data:|#)/.test(u)) continue;
        const [target, hash] = u.split('#');
        const abs = path.resolve(path.dirname(file), target);
        linkCount++;
        if (!(await exists(abs))) { fail(`${rel}: broken ${attr} → ${u}`); continue; }
        if (hash && target.endsWith('.html')) {
          const other = await readFile(abs, 'utf8');
          if (!other.includes(`id="${hash}"`)) fail(`${rel}: missing anchor #${hash} in ${target}`);
        }
      }
    }
    if (/href="#"/.test(html)) fail(`${rel}: placeholder href="#" found`);
  }

  // Paragraph uniqueness (exclude shared CTA blocks)
  const body = main.replace(/<section[^>]*data-shared="cta"[\s\S]*?<\/section>/g, '');
  for (const [, attrs, p] of body.matchAll(/<p(\s[^>]*)?>([\s\S]*?)<\/p>/g)) {
    if (/data-(summary|boilerplate)/.test(attrs || '')) continue;
    const text = p.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length < 90) continue;
    if (!paraIndex.has(text)) paraIndex.set(text, new Set());
    paraIndex.get(text).add(rel);
  }
}

const dupes = [...paraIndex.entries()].filter(([, set]) => set.size > 1);
// Article/listing excerpts and card summaries legitimately repeat on listing pages; report them separately.
const isListing = (r) => /resources\/(index|blog|ai-guides)\.html|^index\.html|articles\//.test(r);
const realDupes = dupes.filter(([, set]) => [...set].filter((r) => !isListing(r)).length > 1);
for (const [text, set] of realDupes) fail(`Duplicated paragraph on ${[...set].join(', ')}: "${text.slice(0, 80)}…"`);

console.log(`Checked ${files.length} HTML pages, ${linkCount} internal links/assets, ${paraIndex.size} distinct long paragraphs.`);
console.log(`Excerpt/summary reuse on listing pages (expected): ${dupes.length - realDupes.length}`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  problems.forEach((p) => console.log(' - ' + p));
  process.exit(1);
}
console.log('All static QA checks passed.');
