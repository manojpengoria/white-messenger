/**
 * Cache-busting version for CSS/JS links (e.g. main.js?v=1a2b3c4d).
 * A hash of everything that shapes those files, so it changes only when they change.
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

const inputs = [
  'assets/js/main.js', 'assets/js/components.js', 'assets/css/input.css', 'tailwind.config.js',
  ...walk(path.join(ROOT, 'src')).filter((f) => f.endsWith('.mjs')).map((f) => path.relative(ROOT, f)),
].sort();

const hash = createHash('sha256');
for (const f of inputs) hash.update(f).update(readFileSync(path.join(ROOT, f)));
export const ASSET_VERSION = hash.digest('hex').slice(0, 10);
