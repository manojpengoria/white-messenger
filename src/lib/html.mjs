import { IMAGES, imageSrc } from '../images.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Join truthy strings / arrays into markup. */
export const join = (...parts) => parts.flat(Infinity).filter(Boolean).join('\n');

/** Page-relative link to a page id such as "services/web-development". */
export const href = (ctx, id) => {
  if (/^(https?:|mailto:|tel:|#)/.test(id)) return id;
  const [p, hash] = id.split('#');
  return `${ctx.root}${p}.html${hash ? '#' + hash : ''}`;
};

export const asset = (ctx, p) => `${ctx.root}${p}`;

/**
 * Responsive image from the registry.
 * opts.eager → above-the-fold (no lazy loading, high fetch priority)
 */
export function img(ctx, key, opts = {}) {
  const im = IMAGES[key];
  if (!im) throw new Error(`Unknown image key "${key}"`);
  const { cls = '', sizes = '(min-width: 1024px) 50vw, 100vw', eager = false, alt } = opts;
  const largest = im.widths[im.widths.length - 1];
  const srcset = im.widths.map((w) => `${asset(ctx, imageSrc(im, w))} ${w}w`).join(', ');
  return `<img src="${asset(ctx, imageSrc(im, largest))}" srcset="${srcset}" sizes="${sizes}" width="${im.w}" height="${im.h}" alt="${esc(alt ?? im.alt)}" class="${cls}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${im.status === 'placeholder' ? ' data-asset-status="placeholder"' : ''}>`;
}

export const imageAbs = (siteUrl, key) => {
  const im = IMAGES[key];
  return im ? `${siteUrl}/${imageSrc(im, im.widths[im.widths.length - 1])}` : null;
};

/** Rendering context for a page path: `root` is the relative prefix back to the site root. */
export const ctxFor = (path, nav = '') => ({ path, nav, root: '../'.repeat(path.split('/').length - 1) });
