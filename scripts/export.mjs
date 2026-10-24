/**
 * Copies the built static site into ./public (the deploy output directory used by Vercel).
 * Only publishable files are copied: never src/, scripts/, node_modules/ or config files.
 * Usage: npm run export (after npm run build)
 */
import { cp, rm, readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public');
const DIRS = ['ai', 'services', 'engagement-models', 'industries', 'solutions', 'about-us', 'resources', 'contact-us', 'partials', 'assets'];
const FILES = ['sitemap.xml', 'robots.txt'];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const f of await readdir(ROOT)) if (f.endsWith('.html')) await cp(path.join(ROOT, f), path.join(OUT, f));
for (const f of FILES) await cp(path.join(ROOT, f), path.join(OUT, f));
for (const d of DIRS) {
  await cp(path.join(ROOT, d), path.join(OUT, d), {
    recursive: true,
    // Image sources (logo master, design reference) and the Tailwind input are not needed online.
    filter: (src) => !src.includes(`${path.sep}source`) && !src.endsWith('input.css') && !src.endsWith('.md'),
  });
}
console.log('Exported static site to public/');
