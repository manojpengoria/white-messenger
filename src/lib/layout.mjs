import { site } from '../site.config.mjs';
import { header, footer } from './components.mjs';
import { esc, imageAbs } from './html.mjs';
import { icon } from './icons.mjs';

/** Canonical URL for a page path; folder index pages canonicalise to the folder. */
export const canonical = (path) => `${site.url}/${path.replace(/(^|\/)index\.html$/, '$1')}`;

export function layout(page) {
  const { ctx, path, title, description, ogType = 'website', image, jsonld = [], body, noindex = false } = page;
  const r = ctx.root;
  const fullTitle = path === 'index.html' ? title : `${title} | White Messenger`;
  const ogImage = (image && imageAbs(site.url, image)) || `${site.url}/assets/images/og/og-default.png`;
  const ld = jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : ''}
<!-- CONFIG PLACEHOLDER: canonical origin is set in src/site.config.mjs -->
<link rel="canonical" href="${canonical(path)}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="White Messenger">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical(path)}">
<meta property="og:image" content="${ogImage}">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImage}">
<meta name="theme-color" content="#ffffff">
<link rel="icon" type="image/png" sizes="32x32" href="${r}assets/images/logo/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="${r}assets/images/logo/icon-192.png">
<link rel="apple-touch-icon" href="${r}assets/images/logo/apple-touch-icon.png">
<link rel="preload" href="${r}assets/fonts/plus-jakarta-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${r}assets/css/styles.css">
<script>document.documentElement.classList.add('js')</script>
<script src="${r}assets/js/components.js" defer></script>
<script src="${r}assets/js/main.js" defer></script>
${ld}
</head>
<body data-root="${r}" data-nav="${ctx.nav || ''}" class="min-h-screen bg-white font-sans text-ink antialiased">
<a href="#main" class="skip-link">Skip to main content</a>
${header(r)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(r)}
<button type="button" class="back-to-top" data-back-to-top aria-label="Back to top" hidden>${icon('arrowUp', 'h-5 w-5', 2.2)}</button>
</body>
</html>
`;
}

export function breadcrumbLd(trail) {
  const items = [{ label: 'Home', path: 'index.html' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.label, item: canonical(it.path) })),
  };
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url + '/',
    logo: `${site.url}/assets/images/logo/white-messenger-logo-720.png`,
    email: site.contact.email,
    telephone: site.contact.phoneHref,
    address: { '@type': 'PostalAddress', ...site.contact.address },
    sameAs: site.social.filter((s) => s.url).map((s) => s.url),
  };
}
