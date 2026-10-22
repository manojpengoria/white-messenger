# White Messenger Website

Static, multi-page corporate website for **White Messenger**: AI engineering, software development and digital transformation.
Built with semantic HTML5, Tailwind CSS (compiled, no CDN) and vanilla JavaScript.

- **68 HTML pages**: homepage, AI (6), Services (13), Engagement Models (8), Industries (12), Solutions (11), About Us (3), Resources (4 + 5 articles), Contact, Privacy, Terms, HTML sitemap, 404. See [`PAGE-INVENTORY.md`](PAGE-INVENTORY.md).
- Shared header (mega menus, mobile menu, site search) and footer on every page.
- Light "Modern AI" design system derived from the official logo (teal `#2A7D9C`, ink `#3D3E6B`) and the brand palette.

## Quick start

```bash
npm install            # Node 18+ (tested on Node 26)
npm run build          # render pages + compile production CSS
npm run serve          # preview at http://localhost:8080/
```

Opening `index.html` directly from disk also works, because all links use relative paths to real `.html` files.

| Script | What it does |
|---|---|
| `npm run images` | Regenerates logo derivatives, favicons, OG image and placeholder illustrations, plus `assets/images/ASSET-MANIFEST.md` |
| `npm run pages` | Renders all HTML from `src/`, plus `partials/`, `sitemap.xml`, `robots.txt`, search index and `PAGE-INVENTORY.md` |
| `npm run css` | Compiles `assets/css/input.css` into minified `assets/css/styles.css` (Tailwind CLI) |
| `npm run build` | `pages` + `css` |
| `npm run build:all` | `images` + `build` |
| `npm run qa` | Static QA: required files, every relative link/asset/anchor, header/footer, unique titles and descriptions, one `<h1>`, image attributes, duplicate-copy detection |
| `npm run qa:browser` | Headless Chrome QA: every page at 1440px and 390px (overflow, broken images, console errors) plus interaction tests. Set `CHROME_PATH` if needed. |

> **Edit content in `src/`, not in the generated `.html` files.** `npm run pages` deletes and regenerates the HTML.

## Project structure

```
white-messenger/
├── index.html, 404.html, privacy-policy.html, terms-of-service.html, sitemap.html   (generated)
├── ai/ services/ engagement-models/ industries/ solutions/ about-us/ resources/ contact-us/   (generated)
├── partials/header.html, footer.html      shared components for the JS loader (generated)
├── assets/
│   ├── css/input.css → styles.css         Tailwind source → production build
│   ├── js/components.js                   header/footer loader, active nav, menus, search
│   ├── js/main.js                         accordions, tabs, filters, forms, back-to-top, reveal
│   ├── js/search-index.js                 generated site-search index
│   ├── fonts/                             self-hosted Plus Jakarta Sans (variable)
│   └── images/{logo,hero,ai,services,engagement,industries,solutions,about,resources,og}/
├── src/
│   ├── site.config.mjs                    company details, domain, social links, form endpoints
│   ├── images.mjs                         image registry: alt text, sizes, AI-generation prompts
│   ├── registry.mjs                       page ids, nav groups, card metadata
│   ├── content/*.mjs                      all page copy (one module per section)
│   ├── lib/                               icons, layout (head/meta/JSON-LD), shared components
│   ├── pages/*.mjs                        page templates per section
│   └── build.mjs
├── scripts/                               image generation, dev server, QA
├── tailwind.config.js, package.json, sitemap.xml, robots.txt
```

## Shared header and footer

The header and footer markup lives in one place (`src/lib/components.mjs`). It is used two ways:

1. **Build-time include (primary).** Every page is rendered with the header and footer already in the HTML, so search engines and no-JS visitors get full navigation.
2. **JavaScript loader (fallback).** `assets/js/components.js` looks for `[data-component="header"]` / `[data-component="footer"]`. If a placeholder is empty, it fetches `partials/header.html` / `footer.html`, replaces `{{ROOT}}` with the page's `data-root`, and inserts it. Fetching needs http(s); browsers block it on `file://`.

In both cases `components.js` then sets the active nav item (from `<body data-nav>`) and `aria-current="page"`, and initialises the dropdown and mega menus, mobile menu and search exactly once (guarded by `data-wm-ready`). A missing component logs a warning instead of breaking the page.

## Configuration placeholders

Search the code for `CONFIG PLACEHOLDER`. Key items:

| Setting | Location | Current value |
|---|---|---|
| Production domain (canonical, OG, sitemap) | `src/site.config.mjs` → `url` | `https://www.whitemessenger.com` (assumed from the email domain; confirm it) |
| Social profile URLs | `src/site.config.mjs` → `social` | Empty. Icons render as visibly disabled "coming soon" badges with no `#` links. Add URLs to activate them. |
| Form endpoints | `src/site.config.mjs` → `forms` | Empty (see below) |
| Budget bands on the contact form | `src/pages/contact.mjs` → `BUDGETS` | USD ranges. Adjust the currency and bands. |
| Phone display format | `src/site.config.mjs` | `+91 77909 92982` (the `+91` country code was added) |
| Privacy Policy / Terms | `src/pages/contact.mjs` | **Drafts.** They carry an on-page notice and must be reviewed by legal counsel. |
| Technology lists | `src/content/*.mjs` (`tech.groups`) | Based on the stack in the approved homepage design (Laravel, Node.js, React, Next.js, Vue.js, Python, AWS, Azure, Kubernetes, MySQL, PostgreSQL) plus generic categories. Confirm before launch. |

The site deliberately does **not** state a founding year, headcount, client names, awards, certifications, ratings, pricing or guaranteed outcomes. Case studies are clearly labelled **illustrative scenarios**.

## Backend integration (forms)

A static site cannot securely send email or store leads. Both forms (`#inquiry-form` on Contact, `#careers-form` on Careers):

- validate in the browser with accessible inline errors, an error summary, `aria-invalid` and focus management;
- **never** write form data to `localStorage`, `sessionStorage` or cookies;
- if no endpoint is configured, tell the user the message has **not** been sent and offer a `mailto:` link instead of showing a fake success;
- if an endpoint is configured, `POST` `multipart/form-data` to it with `Accept: application/json`, then show a success or error message.

### Laravel integration contract (future phase)

Set `forms.inquiryEndpoint` (e.g. `/api/inquiries`) and `forms.careersEndpoint` (e.g. `/api/career-inquiries`), then rebuild.

**Inquiry fields:** `full_name`*, `business_email`*, `company`*, `phone`, `country`*, `service`*, `budget`, `timeline`, `project_details`* (min 30 characters), `consent`* (`yes`), `website` (honeypot; must be empty).
**Career fields:** `full_name`*, `email`*, `phone`, `area`*, `experience`*, `profile_url`* (URL), `message`* (min 30 characters), `consent`*, `website` (honeypot).

The backend should:

1. Re-validate every field server-side (Laravel Form Request). Never trust client validation.
2. Reject submissions where `website` is non-empty; add rate limiting (`throttle` middleware) and optionally a CAPTCHA.
3. Use CSRF protection (same-origin session plus `X-CSRF-TOKEN`), or a stateless API route protected by origin checks and rate limits.
4. Store leads in the database and/or forward them to a CRM; send notification emails through a queued mailer. Keep credentials in `.env`, never in front-end JavaScript.
5. Return `2xx` JSON on success and `422` with field errors on validation failure.
6. Apply the retention periods defined in the Privacy Policy. To accept CV uploads later, add a file field plus server-side type and size checks and malware scanning.

## Images

No image-generation tool was available while building this site, so **every content image is an original, locally rendered placeholder illustration** in the brand style (light blue, electric blue and teal, glass panels and an icon tile per topic), exported as responsive WebP (640/1200 px). No image is hotlinked or taken from a third party. Each `<img>` has descriptive alt text, `width`/`height`, `srcset`/`sizes` and lazy loading below the fold. Placeholders are marked with `data-asset-status="placeholder"`.

`assets/images/ASSET-MANIFEST.md` lists all 66 images with file names, sizes, alt text and a **detailed generation prompt**. To swap in final AI-generated art:

1. Generate each image from its prompt and export WebP at the listed widths with the **same file names**.
2. In `src/images.mjs`, set that entry's `status: 'final'`. This removes the placeholder marker, and `npm run images` will then never overwrite it.
3. Run `npm run build`.

**Homepage photographs** (hero, What We Do, AI capabilities, Industries, Latest Insights, CTA) are free photos from [Unsplash](https://unsplash.com/license) (Unsplash License: free for commercial use, no attribution required). `src/stock-images.mjs` lists each photo with its Unsplash page link; `npm run images:stock` downloads them, smart-crops each to its slot and exports sharp WebP at 1× and 2× into `assets/images/home/`. To change a photo, swap its `photo` id and re-run the script. Internal pages still use the placeholder illustrations.

The homepage "Technologies We Work With" strip uses the official technology logos from the MIT-licensed [devicon](https://devicon.dev) package, copied into `assets/images/tech/` by `npm run pages`. The trademarks belong to their owners and are used only to name the technologies.

The logo derivatives, favicons and `og/og-default.png` are generated from the official logo (`assets/images/logo/source/`).

## SEO and accessibility

- Unique `<title>`, meta description, canonical URL, Open Graph and Twitter tags on every page (the build fails on duplicates).
- JSON-LD: `Organization` (using only the supplied contact details), `WebSite`, `BreadcrumbList` on internal pages, and `Article` on articles. There are no ratings or reviews.
- `sitemap.xml`, `robots.txt` and a human-readable `sitemap.html`.
- Skip link, landmark regions, visible focus styles, keyboard-operable menus (Arrow Down opens a menu, Escape closes it), ARIA tabs, accordions, a modal search dialog, a focus-trapped mobile menu, and `prefers-reduced-motion` support.
- The 404 page uses root-absolute links so it works at any URL depth; configure your host to serve `/404.html`.

## Performance

- Production Tailwind build (purged and minified, about 77 KB) with no CSS or JS frameworks; JavaScript is about 24 KB unminified, loaded with `defer`.
- Self-hosted variable font with `font-display: swap` and preload.
- Responsive WebP images: only hero images load eagerly (`fetchpriority="high"`); everything else is lazy-loaded.
- The search index loads lazily, only when search is first opened.
