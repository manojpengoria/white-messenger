/**
 * Downloads the homepage photographs listed in src/stock-images.mjs from the Unsplash CDN,
 * smart-crops each to its slot size and exports WebP at 1× and 2×.
 * Usage: npm run images:stock (needs internet access)
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { STOCK_IMAGES } from '../src/stock-images.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'assets/images/home');
await mkdir(OUT, { recursive: true });

for (const img of STOCK_IMAGES) {
  const url = `https://images.unsplash.com/${img.photo}?w=${Math.max(img.w, 1600) * 1.5 | 0}&q=90&fm=jpg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed (${res.status}) for ${img.key}: ${url}`);
  let base = sharp(Buffer.from(await res.arrayBuffer()));
  if (img.flop) base = base.flop();
  const master = await base.resize(img.w, img.h, { fit: 'cover', position: sharp.strategy.attention }).toBuffer();
  for (const width of [img.w / 2, img.w]) {
    await sharp(master).resize(width).webp({ quality: 82 }).toFile(path.join(OUT, `${img.file}-${width}.webp`));
  }
  console.log(`✓ ${img.key}`);
}
console.log(`Saved ${STOCK_IMAGES.length} photos to assets/images/home/`);
