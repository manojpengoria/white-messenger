/**
 * Generates local image assets:
 *  - brand-styled placeholder illustrations (SVG → responsive WebP) for every IMAGES entry
 *  - logo derivatives, favicons and the default Open Graph image from the official logo PNG
 *  - assets/images/ASSET-MANIFEST.md + manifest.json with the AI-generation prompt for every visual
 *
 * Usage: npm run images
 */
import { mkdir, writeFile, copyFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { IMAGES, imageSrc } from '../src/images.mjs';
import { ICONS } from '../src/lib/icons.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = (p) => path.join(ROOT, p);
const LOGO_SRC = OUT('assets/images/logo/source/white-messenger-logo-original.png');

const PALETTES = {
  blue: { a: '#2563EB', b: '#22D3EE', c: '#1D4ED8', d: '#1E3A8A', soft: '#DBEAFE', bg1: '#FBFDFF', bg2: '#DCEAFE' },
  teal: { a: '#2A7D9C', b: '#22D3EE', c: '#226680', d: '#164E63', soft: '#D3EDF4', bg1: '#FBFEFF', bg2: '#D8EFF6' },
  indigo: { a: '#4F46E5', b: '#38BDF8', c: '#3D3E6B', d: '#312E81', soft: '#E0E7FF', bg1: '#FCFCFF', bg2: '#E0E7FF' },
};

function seeded(str) {
  let h = 2166136261;
  for (const ch of str) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  let s = h >>> 0;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

const f = (n) => Math.round(n * 10) / 10;

/* ---------- widget renderers for floating glass panels ---------- */
function widget(kind, x, y, w, h, p, r) {
  const pad = 18;
  const ix = x + pad, iy = y + 40, iw = w - pad * 2, ih = h - 58;
  let out = `<circle cx="${x + 20}" cy="${y + 20}" r="4" fill="${p.a}" opacity=".55"/><circle cx="${x + 33}" cy="${y + 20}" r="4" fill="${p.b}" opacity=".55"/><rect x="${x + 46}" y="${y + 17}" width="${f(w * 0.3)}" height="6" rx="3" fill="${p.soft}"/>`;
  if (kind === 'bars') {
    const n = 6, gap = 10, bw = (iw - gap * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      const bh = ih * (0.3 + r() * 0.7);
      out += `<rect x="${f(ix + i * (bw + gap))}" y="${f(iy + ih - bh)}" width="${f(bw)}" height="${f(bh)}" rx="5" fill="url(#gBar)" opacity="${i === 3 ? 1 : 0.75}"/>`;
    }
  } else if (kind === 'line') {
    const pts = [];
    let v = 0.6;
    for (let i = 0; i <= 8; i++) { v = Math.min(0.92, Math.max(0.12, v + (r() - 0.55) * 0.3)); pts.push([ix + (iw * i) / 8, iy + ih * v]); }
    const d = pts.map((q, i) => `${i ? 'L' : 'M'}${f(q[0])} ${f(q[1])}`).join(' ');
    out += `<path d="${d} L${f(ix + iw)} ${f(iy + ih)} L${f(ix)} ${f(iy + ih)} Z" fill="${p.b}" opacity=".16"/><path d="${d}" fill="none" stroke="${p.a}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
    const last = pts[5];
    out += `<circle cx="${f(last[0])}" cy="${f(last[1])}" r="7" fill="#fff" stroke="${p.a}" stroke-width="3"/>`;
  } else if (kind === 'donut') {
    const cx = ix + Math.min(iw, ih) / 2, cy = iy + ih / 2, rad = Math.min(iw, ih) / 2 - 8, circ = 2 * Math.PI * rad, frac = 0.45 + r() * 0.35;
    out += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rad)}" fill="none" stroke="${p.soft}" stroke-width="14"/><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(rad)}" fill="none" stroke="url(#gBar)" stroke-width="14" stroke-linecap="round" stroke-dasharray="${f(circ * frac)} ${f(circ)}" transform="rotate(-90 ${f(cx)} ${f(cy)})"/>`;
    const tx = ix + Math.min(iw, ih) + 14;
    for (let i = 0; i < 3; i++) out += `<rect x="${f(tx)}" y="${f(iy + 10 + i * 24)}" width="${f(Math.max(20, (ix + iw - tx) * (0.5 + r() * 0.5)))}" height="8" rx="4" fill="${i ? p.soft : p.a}" opacity="${i ? 1 : 0.6}"/>`;
  } else if (kind === 'list') {
    const rows = Math.max(2, Math.floor(ih / 30));
    for (let i = 0; i < rows; i++) {
      const yy = iy + i * 30 + 6;
      out += `<circle cx="${ix + 8}" cy="${yy + 4}" r="7" fill="${i % 2 ? p.b : p.a}" opacity=".7"/><rect x="${ix + 24}" y="${yy}" width="${f((iw - 24) * (0.45 + r() * 0.5))}" height="8" rx="4" fill="${p.soft}"/>`;
    }
  } else {
    const rows = Math.max(2, Math.floor(ih / 22));
    for (let i = 0; i < rows; i++) {
      const indent = (i % 3) * 16;
      out += `<rect x="${f(ix + indent)}" y="${f(iy + i * 22)}" width="${f((iw - indent) * (0.3 + r() * 0.6))}" height="8" rx="4" fill="${[p.a, p.b, p.c][i % 3]}" opacity=".45"/>`;
    }
  }
  return out;
}

function isoCube(cx, cy, s, p, op = 0.9) {
  const h = s * 0.58;
  const top = `${f(cx)},${f(cy - h)} ${f(cx + s)},${f(cy - h / 2 - h / 2)} `;
  void top;
  const T = [[cx, cy - s * 0.5], [cx + s * 0.87, cy], [cx, cy + s * 0.5], [cx - s * 0.87, cy]];
  const L = [[cx - s * 0.87, cy], [cx, cy + s * 0.5], [cx, cy + s * 1.5], [cx - s * 0.87, cy + s]];
  const R = [[cx + s * 0.87, cy], [cx, cy + s * 0.5], [cx, cy + s * 1.5], [cx + s * 0.87, cy + s]];
  const pts = (a) => a.map((q) => `${f(q[0])},${f(q[1])}`).join(' ');
  return `<g opacity="${op}"><polygon points="${pts(T)}" fill="#fff"/><polygon points="${pts(L)}" fill="${p.a}" opacity=".85"/><polygon points="${pts(R)}" fill="${p.c}" opacity=".9"/><polygon points="${pts(T)}" fill="${p.b}" opacity=".25"/></g>`;
}

function illustration(img) {
  const { w: W, h: H } = img;
  const p = PALETTES[img.palette] || PALETTES.blue;
  const r = seeded(img.key);
  const hero = img.layout === 'hero';
  const wide = img.layout === 'wide';
  const fx = wide ? W * 0.7 : hero ? W * 0.56 : W * 0.5;
  const fy = wide ? H * 0.47 : H * 0.46;
  const S = wide ? H * 0.36 : Math.min(W, H) * (hero ? 0.3 : 0.28);
  const horizon = H * 0.64;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="gBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.bg1}"/><stop offset=".55" stop-color="#EEF5FF"/><stop offset="1" stop-color="${p.bg2}"/></linearGradient>
  <radialGradient id="gGlowA"><stop offset="0" stop-color="${p.a}" stop-opacity=".30"/><stop offset="1" stop-color="${p.a}" stop-opacity="0"/></radialGradient>
  <radialGradient id="gGlowB"><stop offset="0" stop-color="${p.b}" stop-opacity=".30"/><stop offset="1" stop-color="${p.b}" stop-opacity="0"/></radialGradient>
  <linearGradient id="gTile" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.b}"/><stop offset=".55" stop-color="${p.a}"/><stop offset="1" stop-color="${p.d}"/></linearGradient>
  <linearGradient id="gBar" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${p.a}"/><stop offset="1" stop-color="${p.b}"/></linearGradient>
  <linearGradient id="gGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity=".72"/></linearGradient>
  <linearGradient id="gShine" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="gFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient>
  <mask id="mFloor"><rect x="0" y="${f(horizon)}" width="${W}" height="${f(H - horizon)}" fill="url(#gFloor)"/></mask>
  <filter id="fShadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="${p.d}" flood-opacity=".16"/></filter>
  <filter id="fBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${f(S * 0.12)}"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#gBg)"/>
<circle cx="${f(fx)}" cy="${f(fy)}" r="${f(Math.max(W, H) * 0.42)}" fill="url(#gGlowA)"/>
<circle cx="${f(W * (0.15 + r() * 0.2))}" cy="${f(H * (0.15 + r() * 0.2))}" r="${f(Math.max(W, H) * 0.3)}" fill="url(#gGlowB)"/>
<circle cx="${f(W * (0.8 + r() * 0.15))}" cy="${f(H * 0.85)}" r="${f(Math.max(W, H) * 0.25)}" fill="url(#gGlowB)"/>`;

  // perspective floor grid
  let grid = '';
  for (let i = -14; i <= 14; i++) grid += `<line x1="${f(fx)}" y1="${f(horizon)}" x2="${f(fx + i * W * 0.11)}" y2="${H}" />`;
  for (let i = 1; i <= 9; i++) { const yy = horizon + (H - horizon) * Math.pow(i / 9, 1.8); grid += `<line x1="0" y1="${f(yy)}" x2="${W}" y2="${f(yy)}"/>`; }
  svg += `<g mask="url(#mFloor)" stroke="${p.a}" stroke-opacity=".16" stroke-width="1.2">${grid}</g>`;

  // network constellation
  const nodes = [];
  for (let i = 0; i < 16; i++) nodes.push([W * (0.05 + r() * 0.9), H * (0.06 + r() * 0.5)]);
  let net = '';
  nodes.forEach((n, i) => {
    const near = nodes.map((m, j) => [j, Math.hypot(m[0] - n[0], m[1] - n[1])]).filter(([j]) => j !== i).sort((a, b) => a[1] - b[1]).slice(0, 2);
    near.forEach(([j]) => { if (j > i) net += `<line x1="${f(n[0])}" y1="${f(n[1])}" x2="${f(nodes[j][0])}" y2="${f(nodes[j][1])}"/>`; });
  });
  svg += `<g stroke="${p.a}" stroke-opacity=".16" stroke-width="1.5">${net}</g>`;
  svg += nodes.map((n, i) => `<circle cx="${f(n[0])}" cy="${f(n[1])}" r="${i % 4 ? 3.5 : 6}" fill="#fff" stroke="${i % 2 ? p.a : p.b}" stroke-width="2" opacity=".85"/>`).join('');

  // floating glass panels around the focal object
  const kinds = ['bars', 'line', 'donut', 'list', 'code'];
  const slots = wide
    ? [[0.38, 0.12, 0.17, 0.3], [0.86, 0.1, 0.12, 0.3], [0.42, 0.6, 0.14, 0.28], [0.86, 0.6, 0.12, 0.28]]
    : hero
      ? [[0.05, 0.1, 0.27, 0.22], [0.76, 0.08, 0.21, 0.24], [0.04, 0.6, 0.24, 0.2], [0.77, 0.58, 0.2, 0.22]]
      : [[0.05, 0.08, 0.28, 0.24], [0.69, 0.1, 0.27, 0.22], [0.06, 0.62, 0.24, 0.22], [0.71, 0.6, 0.24, 0.24]];
  const start = Math.floor(r() * kinds.length);
  slots.forEach((s, i) => {
    const x = W * s[0] + (r() - 0.5) * W * 0.02, y = H * s[1] + (r() - 0.5) * H * 0.02, w = W * s[2], h = H * s[3];
    svg += `<g filter="url(#fShadow)"><rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="18" fill="url(#gGlass)" stroke="#fff" stroke-width="2"/></g>`;
    svg += `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="18" fill="none" stroke="${p.a}" stroke-opacity=".12"/>`;
    svg += widget(kinds[(start + i) % kinds.length], x, y, w, h, p, r);
  });

  // focal platform: glow, orbit rings, 3D tile with icon
  const baseY = fy + S * 0.62;
  svg += `<ellipse cx="${f(fx)}" cy="${f(baseY + S * 0.1)}" rx="${f(S * 0.9)}" ry="${f(S * 0.2)}" fill="${p.a}" opacity=".28" filter="url(#fBlur)"/>`;
  for (let k = 0; k < 3; k++) svg += `<ellipse cx="${f(fx)}" cy="${f(baseY)}" rx="${f(S * (0.75 + k * 0.28))}" ry="${f(S * (0.2 + k * 0.075))}" fill="none" stroke="${k % 2 ? p.b : p.a}" stroke-opacity="${0.35 - k * 0.08}" stroke-width="${3 - k * 0.6}"/>`;
  const tx = fx - S / 2, ty = fy - S / 2, depth = S * 0.08;
  svg += `<g filter="url(#fShadow)"><rect x="${f(tx)}" y="${f(ty + depth)}" width="${f(S)}" height="${f(S)}" rx="${f(S * 0.2)}" fill="${p.d}"/><rect x="${f(tx)}" y="${f(ty)}" width="${f(S)}" height="${f(S)}" rx="${f(S * 0.2)}" fill="url(#gTile)"/></g>`;
  svg += `<rect x="${f(tx)}" y="${f(ty)}" width="${f(S)}" height="${f(S)}" rx="${f(S * 0.2)}" fill="url(#gShine)"/>`;
  svg += `<rect x="${f(tx + 3)}" y="${f(ty + 3)}" width="${f(S - 6)}" height="${f(S - 6)}" rx="${f(S * 0.19)}" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2"/>`;
  const k = (S * 0.56) / 24;
  svg += `<g transform="translate(${f(fx - 12 * k)} ${f(fy - 12 * k)}) scale(${f(k * 100) / 100})" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICONS[img.icon] || ICONS.sparkles}</g>`;
  // orbit around tile
  svg += `<ellipse cx="${f(fx)}" cy="${f(fy)}" rx="${f(S * 0.95)}" ry="${f(S * 0.32)}" fill="none" stroke="${p.b}" stroke-opacity=".5" stroke-width="2" stroke-dasharray="2 10" stroke-linecap="round" transform="rotate(-14 ${f(fx)} ${f(fy)})"/>`;
  for (let i = 0; i < 3; i++) {
    const a = r() * Math.PI * 2, ox = fx + Math.cos(a) * S * 0.95, oy = fy + Math.sin(a) * S * 0.32;
    svg += `<circle cx="${f(ox)}" cy="${f(oy)}" r="${f(S * 0.035)}" fill="#fff" stroke="${p.a}" stroke-width="3"/>`;
  }

  // isometric cubes + sparkles
  for (let i = 0; i < 6; i++) {
    const cx = W * (0.08 + r() * 0.84), cy = horizon + (H - horizon) * (0.15 + r() * 0.6);
    if (Math.abs(cx - fx) < S * 1.2) continue;
    svg += isoCube(cx, cy, 14 + r() * 26, p, 0.55 + r() * 0.4);
  }
  for (let i = 0; i < 26; i++) svg += `<circle cx="${f(W * r())}" cy="${f(H * r() * 0.9)}" r="${f(1 + r() * 2.5)}" fill="${r() > 0.5 ? p.b : '#fff'}" opacity="${f(0.4 + r() * 0.5)}"/>`;

  return svg + '</svg>';
}

async function exists(p) { try { await access(p); return true; } catch { return false; } }

async function renderIllustrations() {
  for (const img of Object.values(IMAGES)) {
    if (img.status !== 'placeholder') continue; // never overwrite final or reference assets
    await mkdir(OUT(`assets/images/${img.dir}`), { recursive: true });
    const svg = Buffer.from(illustration(img));
    for (const width of img.widths) {
      await sharp(svg).resize(width, Math.round((width * img.h) / img.w)).webp({ quality: 80, effort: 5 }).toFile(OUT(imageSrc(img, width)));
    }
  }
  console.log(`Rendered ${Object.values(IMAGES).filter((i) => i.status === 'placeholder').length} illustrations`);
}

async function renderLogo() {
  const dir = OUT('assets/images/logo');
  await mkdir(dir, { recursive: true });
  if (!(await exists(LOGO_SRC))) throw new Error(`Missing official logo at ${LOGO_SRC}`);
  const trimmed = await sharp(LOGO_SRC).trim({ threshold: 1 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  console.log(`Logo trimmed to ${meta.width}x${meta.height}`);
  for (const w of [360, 720]) {
    await sharp(trimmed).resize(w).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(dir, `white-messenger-logo-${w}.webp`));
  }
  await sharp(trimmed).resize(720).png({ compressionLevel: 9 }).toFile(path.join(dir, 'white-messenger-logo-720.png'));

  // Symbol mark: left-hand "WM" ribbon, located from alpha columns
  const { data, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const colHas = (x, y0, y1) => { for (let y = y0; y < y1; y++) if (data[(y * info.width + x) * 4 + 3] > 20) return true; return false; };
  const topBand = Math.round(info.height * 0.6);
  let x = 0, lastInk = 0;
  for (; x < info.width; x++) { if (colHas(x, 0, topBand)) lastInk = x; else if (x - lastInk > info.width * 0.03 && lastInk > 0) break; }
  // The symbol ends at the first fully transparent row band below it (the tagline starts after a gap)
  const rowHas = (y) => { for (let xx = 0; xx <= lastInk; xx += 2) if (data[(y * info.width + xx) * 4 + 3] > 20) return true; return false; };
  let maxY = 0;
  for (let y = 0; y < info.height; y++) { if (rowHas(y)) maxY = y; else if (maxY > 0 && y - maxY > info.height * 0.03) break; }
  const mark = await sharp(trimmed).extract({ left: 0, top: 0, width: lastInk + 1, height: maxY + 1 }).toBuffer();
  const side = Math.round(Math.max(lastInk + 1, maxY + 1) * 1.18);
  const square = await sharp({ create: { width: side, height: side, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: mark, gravity: 'center' }]).png().toBuffer();
  await sharp(square).resize(32, 32).png().toFile(path.join(dir, 'favicon-32.png'));
  await sharp(square).resize(192, 192).png().toFile(path.join(dir, 'icon-192.png'));
  await sharp(square).resize(512, 512).png().toFile(path.join(dir, 'icon-512.png'));
  await sharp(square).resize(150, 150).extend({ top: 15, bottom: 15, left: 15, right: 15, background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toFile(path.join(dir, 'apple-touch-icon.png'));

  // Default Open Graph image 1200x630
  const ogBg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#DCEAFE"/></linearGradient><radialGradient id="r"><stop offset="0" stop-color="#22D3EE" stop-opacity=".35"/><stop offset="1" stop-color="#22D3EE" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="url(#g)"/><circle cx="1050" cy="80" r="380" fill="url(#r)"/><text x="600" y="520" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="600" fill="#10223D">AI Engineering · Custom Software · Intelligent Automation</text></svg>`);
  const logoForOg = await sharp(trimmed).resize(760).png().toBuffer();
  await mkdir(OUT('assets/images/og'), { recursive: true });
  await sharp(ogBg).composite([{ input: logoForOg, top: 150, left: 220 }]).png({ compressionLevel: 9 }).toFile(OUT('assets/images/og/og-default.png'));
  console.log('Logo, favicons and OG image written');
}

async function writeManifest() {
  const rows = Object.values(IMAGES).filter((i) => !i.single).map((i) => ({
    key: i.key, status: i.status, files: i.widths.map((w) => imageSrc(i, w)), size: `${i.w}x${i.h}`, alt: i.alt, prompt: i.prompt,
  }));
  await writeFile(OUT('assets/images/manifest.json'), JSON.stringify(rows, null, 2));
  let md = `# Image asset manifest\n\nGenerated by \`npm run images\`. **${rows.filter((r) => r.status === 'placeholder').length} of ${rows.length} images are locally rendered placeholder illustrations** (original, brand-styled, no third-party content). ` +
    'Each entry includes the prompt to produce the final AI-generated asset. Export finals as WebP at the listed widths and file names, set `status: \'final\'` in `src/images.mjs`, then run `npm run build`.\n\n';
  md += '| Key | Status | Master size | Files | Alt text |\n|---|---|---|---|---|\n';
  for (const r of rows) md += `| ${r.key} | ${r.status} | ${r.size} | ${r.files.map((x) => '`' + x + '`').join('<br>')} | ${r.alt} |\n`;
  md += '\n## Generation prompts\n\n';
  for (const r of rows) md += `### ${r.key}\n\n- Size: ${r.size}\n- Files: ${r.files.join(', ')}\n\n> ${r.prompt}\n\n`;
  md += '## Brand assets\n\n- `assets/images/logo/source/white-messenger-logo-original.png`: official logo supplied by White Messenger (source file).\n- `assets/images/logo/white-messenger-logo-{360,720}.webp`, `-720.png`: header/footer logo derivatives.\n- `assets/images/logo/favicon-32.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`: cropped from the logo symbol.\n- `assets/images/og/og-default.png`: default social sharing image (1200×630).\n';
  await writeFile(OUT('assets/images/ASSET-MANIFEST.md'), md);
  console.log('Manifest written');
}

await renderLogo();
await renderIllustrations();
await writeManifest();
