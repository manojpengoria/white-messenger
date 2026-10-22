/**
 * Shared UI components. Every page is assembled from these so the design system stays consistent.
 */
import { site } from '../site.config.mjs';
import { REG, NAV } from '../registry.mjs';
import { icon } from './icons.mjs';
import { esc, join, href, asset, img } from './html.mjs';

const get = (id) => {
  const e = REG.get(id);
  if (!e) throw new Error(`Unknown page id "${id}"`);
  return e;
};

/* ------------------------------------------------------------------ */
/* Buttons & small pieces                                              */
/* ------------------------------------------------------------------ */
export const btnPrimary = (ctx, label, id, extra = '') =>
  `<a href="${href(ctx, id)}" class="btn-primary ${extra}">${esc(label)} ${icon('arrowRight', 'h-4 w-4')}</a>`;
export const btnSecondary = (ctx, label, id, extra = '') =>
  `<a href="${href(ctx, id)}" class="btn-secondary ${extra}">${esc(label)} ${icon('arrowRight', 'h-4 w-4')}</a>`;
export const linkArrow = (ctx, label, id, srLabel = '') =>
  `<a href="${href(ctx, id)}" class="link-arrow">${esc(label)}${srLabel ? `<span class="sr-only"> ${esc(srLabel)}</span>` : ''} ${icon('arrowRight', 'h-4 w-4')}</a>`;

export const eyebrow = (text) => (text ? `<p class="eyebrow">${esc(text)}</p>` : '');

export const iconTile = (name, cls = '') => `<span class="icon-tile ${cls}">${icon(name, 'h-6 w-6')}</span>`;

export function sectionHeader({ eyebrow: eb, title, lead, align = 'left', action, ctx, id }) {
  const center = align === 'center';
  return `<div class="${center ? 'mx-auto max-w-3xl text-center' : 'flex flex-col gap-4 md:flex-row md:items-end md:justify-between'} mb-10 lg:mb-12">
  <div class="${center ? '' : 'max-w-3xl'}">
    ${eyebrow(eb)}
    <h2 ${id ? `id="${id}"` : ''} class="section-title ${eb ? 'mt-3' : ''}">${esc(title)}</h2>
    ${lead ? `<p data-boilerplate class="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">${esc(lead)}</p>` : ''}
  </div>
  ${action && ctx ? `<div class="shrink-0">${linkArrow(ctx, action.label, action.id)}</div>` : ''}
</div>`;
}

export const section = (inner, { cls = '', id = '', tone = 'white', labelledby = '' } = {}) => {
  const tones = { white: 'bg-white', surface: 'bg-surface', gradient: 'bg-soft-gradient', navy: 'bg-navy-950 text-white' };
  return `<section ${id ? `id="${id}"` : ''} ${labelledby ? `aria-labelledby="${labelledby}"` : ''} class="section ${tones[tone]} ${cls}"><div class="container-wm">${inner}</div></section>`;
};

export const checklist = (items, cls = '') =>
  `<ul class="space-y-3 ${cls}" role="list">${items.map((t) => `<li class="flex gap-3"><span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">${icon('check', 'h-3.5 w-3.5', 2.5)}</span><span class="text-slate-600 leading-relaxed">${esc(t)}</span></li>`).join('')}</ul>`;

export const paragraphs = (ps, cls = 'text-slate-600 leading-relaxed') =>
  (ps || []).map((p) => `<p class="${cls}">${esc(p)}</p>`).join('\n');

/* ------------------------------------------------------------------ */
/* Breadcrumbs                                                         */
/* ------------------------------------------------------------------ */
export function breadcrumbs(ctx, trail) {
  const items = [{ label: 'Home', id: 'index' }, ...trail];
  return `<nav aria-label="Breadcrumb" class="mb-6">
  <ol class="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
    ${items.map((it, i) => {
      const last = i === items.length - 1;
      return `<li class="flex items-center gap-1.5">${i ? icon('chevronRight', 'h-3.5 w-3.5 text-slate-400') : ''}${last ? `<span aria-current="page" class="font-medium text-navy-900">${esc(it.label)}</span>` : `<a class="hover:text-brand-700 hover:underline" href="${href(ctx, it.id)}">${esc(it.label)}</a>`}</li>`;
    }).join('')}
  </ol>
</nav>`;
}

/* ------------------------------------------------------------------ */
/* Page hero (internal pages)                                          */
/* ------------------------------------------------------------------ */
export function pageHero(ctx, { trail, eyebrow: eb, title, lead, image, primary, secondary, highlights }) {
  return `<section class="hero-surface relative overflow-hidden border-b border-slate-200/70">
  <div class="container-wm relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
    <div class="lg:col-span-6">
      ${trail ? breadcrumbs(ctx, trail) : ''}
      ${eyebrow(eb)}
      <h1 class="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">${esc(title)}</h1>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">${esc(lead)}</p>
      ${highlights ? `<ul class="mt-6 flex flex-wrap gap-2" role="list">${highlights.map((h) => `<li class="chip">${icon('check', 'h-3.5 w-3.5 text-brand-600', 2.5)}${esc(h)}</li>`).join('')}</ul>` : ''}
      <div class="mt-8 flex flex-wrap gap-3">
        ${btnPrimary(ctx, primary?.label || 'Discuss Your Project', primary?.id || 'contact-us/index')}
        ${secondary ? btnSecondary(ctx, secondary.label, secondary.id) : ''}
      </div>
    </div>
    <div class="lg:col-span-6">
      <div class="relative">
        <div class="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-100/70 via-white to-cyan-100/60 blur-2xl" aria-hidden="true"></div>
        ${img(ctx, image, { eager: true, cls: 'relative aspect-[4/3] w-full rounded-3xl border border-white object-cover shadow-card-lg', sizes: '(min-width: 1024px) 560px, 100vw' })}
      </div>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */
/** Icon card linking to a registered page (service / engagement / solution). */
export function linkCard(ctx, id, { text, compact = false } = {}) {
  const e = get(id);
  return `<a href="${href(ctx, id)}" class="card card-hover group flex h-full flex-col p-6">
  ${iconTile(e.icon)}
  <h3 class="mt-5 text-base font-bold text-navy-950">${esc(e.title)}</h3>
  <p data-summary class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 ${compact ? 'line-clamp-3' : ''}">${esc(text || e.short)}</p>
  <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">Learn more <span class="sr-only">about ${esc(e.title)}</span><span class="arrow-dot">${icon('arrowRight', 'h-3.5 w-3.5')}</span></span>
</a>`;
}

/** Image card (industries, featured services). */
export function imageCard(ctx, id, { sizes = '(min-width: 1280px) 280px, (min-width: 640px) 45vw, 90vw', showText = true } = {}) {
  const e = get(id);
  return `<a href="${href(ctx, id)}" class="card card-hover group flex h-full flex-col overflow-hidden">
  <div class="overflow-hidden">${img(ctx, e.image, { cls: 'aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.04]', sizes, alt: '' })}</div>
  <div class="flex flex-1 flex-col p-5">
    <h3 class="text-base font-bold text-navy-950">${esc(e.title)}</h3>
    ${showText ? `<p data-summary class="mt-2 flex-1 text-sm leading-relaxed text-slate-600">${esc(e.short)}</p>` : '<span class="flex-1"></span>'}
    <span class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">Explore <span class="sr-only">${esc(e.title)}</span>${icon('arrowRight', 'h-3.5 w-3.5')}</span>
  </div>
</a>`;
}

/** Article / resource card. */
export function resourceCard(ctx, a, { headingLevel = 3, aspect = 'aspect-[16/10]' } = {}) {
  const h = `h${headingLevel}`;
  return `<article class="card card-hover group relative flex h-full flex-col overflow-hidden" data-filter-item data-category="${esc(a.categorySlug)}" data-search="${esc((a.title + ' ' + a.excerpt + ' ' + a.category).toLowerCase())}">
  <div class="relative overflow-hidden">${img(ctx, a.image, { cls: `${aspect} w-full object-cover transition duration-500 group-hover:scale-[1.04]`, sizes: '(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw', alt: '' })}
    <span class="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700 shadow-sm">${esc(a.category)}</span></div>
  <div class="flex flex-1 flex-col p-6">
    <${h} class="text-lg font-bold leading-snug text-navy-950"><a href="${href(ctx, a.id)}" class="after:absolute after:inset-0 focus-visible:outline-none">${esc(a.title)}</a></${h}>
    <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600">${esc(a.excerpt)}</p>
    <p class="mt-5 flex items-center gap-4 text-xs font-medium text-slate-500">
      <span class="inline-flex items-center gap-1.5">${icon('calendar', 'h-3.5 w-3.5')}<time datetime="${a.date}">${a.dateLabel}</time></span>
      <span class="inline-flex items-center gap-1.5">${icon('clock', 'h-3.5 w-3.5')}${a.readTime} min read</span>
    </p>
  </div>
</article>`;
}

/** Simple feature item (icon + title + text), not a link. */
export const featureCard = ({ icon: ic = 'sparkles', t, d }) =>
  `<div class="card h-full p-6">${iconTile(ic)}<h3 class="mt-5 text-base font-bold text-navy-950">${esc(t)}</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(d)}</p></div>`;

/** Numbered card used for challenges / considerations. */
export const numberedCard = ({ t, d }, i, tone = 'brand') =>
  `<div class="card h-full p-6"><span class="inline-flex h-9 w-9 items-center justify-center rounded-lg ${tone === 'warn' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-100' : 'bg-brand-50 text-brand-700 ring-1 ring-brand-100'} text-sm font-bold">${String(i + 1).padStart(2, '0')}</span><h3 class="mt-4 text-base font-bold text-navy-950">${esc(t)}</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(d)}</p></div>`;

export const grid = (items, cols = 3) => {
  const c = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4', 5: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5', 6: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6' }[cols];
  return `<div class="grid gap-5 ${c}">${items.join('\n')}</div>`;
};

/** Horizontal numbered process (like the homepage "Our Development Process"). */
export function processSteps(steps, { compact = false } = {}) {
  return `<ol class="grid gap-5 ${steps.length >= 5 ? 'md:grid-cols-2 lg:grid-cols-' + Math.min(steps.length, 5) : 'md:grid-cols-2 lg:grid-cols-' + steps.length}" role="list">
  ${steps.map((s, i) => `<li class="card relative h-full p-6">
    <div class="flex items-center gap-3"><span class="step-num">${i + 1}</span>${i < steps.length - 1 ? '<span class="hidden h-px flex-1 bg-gradient-to-r from-brand-200 to-transparent lg:block" aria-hidden="true"></span>' : ''}</div>
    <h3 class="mt-4 text-base font-bold text-navy-950">${esc(s.t)}</h3>
    ${s.d && !compact ? `<p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(s.d)}</p>` : ''}
  </li>`).join('')}
</ol>`;
}

/** Vertical workflow (example workflows / high-level solution flow). */
export function workflowList(steps, title) {
  return `<div class="card h-full p-6 sm:p-8">
  ${title ? `<h3 class="text-lg font-bold text-navy-950">${esc(title)}</h3>` : ''}
  <ol class="${title ? 'mt-6' : ''} relative space-y-5 border-l-2 border-dashed border-brand-200 pl-7" role="list">
    ${steps.map((s, i) => {
      const t = typeof s === 'string' ? null : s.t;
      const d = typeof s === 'string' ? s : s.d;
      return `<li class="relative"><span class="absolute -left-[42px] top-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-700 ring-2 ring-brand-200">${i + 1}</span>${t ? `<p class="font-semibold text-navy-950">${esc(t)}</p>` : ''}<p class="${t ? 'mt-1 ' : ''}text-sm leading-relaxed text-slate-600">${esc(d)}</p></li>`;
    }).join('')}
  </ol>
</div>`;
}

/** Technology considerations: grouped chips + notes. */
export function techBlock({ lead, groups = [], notes = [] }) {
  return `<div class="grid gap-8 lg:grid-cols-12">
  <div class="lg:col-span-7">
    ${lead ? `<p class="mb-6 text-slate-600 leading-relaxed">${esc(lead)}</p>` : ''}
    <div class="space-y-5">${groups.map((g) => `<div><h3 class="text-sm font-bold uppercase tracking-wider text-navy-900">${esc(g.label)}</h3><ul class="mt-3 flex flex-wrap gap-2" role="list">${g.items.map((x) => `<li class="chip">${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div>
  </div>
  ${notes.length ? `<aside class="lg:col-span-5"><div class="rounded-2xl border border-brand-100 bg-brand-50/60 p-6"><h3 class="flex items-center gap-2 font-bold text-navy-950">${icon('info', 'h-5 w-5 text-brand-600')} Things we weigh up</h3>${checklist(notes, 'mt-4')}</div></aside>` : ''}
</div>`;
}

/** Advantages vs limitations. */
export function prosCons(pros, cons, { prosTitle = 'Advantages', consTitle = 'Potential limitations' } = {}) {
  const col = (title, items, ic, tone) => `<div class="card h-full p-6 sm:p-8"><h3 class="flex items-center gap-2 text-lg font-bold text-navy-950"><span class="${tone}">${icon(ic, 'h-5 w-5')}</span>${esc(title)}</h3><ul class="mt-5 space-y-3" role="list">${items.map((t) => `<li class="flex gap-3 text-sm leading-relaxed text-slate-600"><span class="mt-1 ${tone}">${icon(ic === 'checkCircle' ? 'check' : 'minusCircle', 'h-4 w-4')}</span><span>${esc(t)}</span></li>`).join('')}</ul></div>`;
  return `<div class="grid gap-5 md:grid-cols-2">${col(prosTitle, pros, 'checkCircle', 'text-brand-600')}${col(consTitle, cons, 'alert', 'text-amber-600')}</div>`;
}

/* ------------------------------------------------------------------ */
/* FAQ accordion                                                       */
/* ------------------------------------------------------------------ */
export function faq(faqs, { id = 'faq', title = 'Frequently asked questions', lead } = {}) {
  return section(`<div class="grid gap-10 lg:grid-cols-12">
  <div class="lg:col-span-4">
    ${eyebrow('FAQs')}
    <h2 id="${id}-title" class="section-title mt-3">${esc(title)}</h2>
    <p data-boilerplate class="mt-4 text-slate-600 leading-relaxed">${esc(lead || 'Answers to the questions we hear most often. If yours is not covered here, our team is happy to talk it through.')}</p>
  </div>
  <div class="lg:col-span-8">
    <div class="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-card" data-accordion>
      ${faqs.map((f, i) => `<div class="accordion-item">
        <h3><button type="button" class="accordion-trigger" aria-expanded="false" aria-controls="${id}-panel-${i}" id="${id}-btn-${i}">
          <span>${esc(f.q)}</span><span class="accordion-icon" aria-hidden="true">${icon('plus', 'h-4 w-4', 2.2)}</span>
        </button></h3>
        <div id="${id}-panel-${i}" role="region" aria-labelledby="${id}-btn-${i}" class="accordion-panel" hidden><p>${esc(f.a)}</p></div>
      </div>`).join('')}
    </div>
  </div>
</div>`, { tone: 'surface', labelledby: `${id}-title` });
}

/* ------------------------------------------------------------------ */
/* CTA banner (matches homepage "Let's Build the Future Together")    */
/* ------------------------------------------------------------------ */
export function ctaBanner(ctx, { title = 'Let’s Build the Future Together', text = 'Discuss your project with our experts and explore how we can help you achieve your business goals with AI and technology.', primary = { label: 'Talk to Our Experts', id: 'contact-us/index' }, secondary, image = 'cta-collaboration' } = {}) {
  return `<section class="py-16 sm:py-20" aria-labelledby="cta-title" data-shared="cta">
  <div class="container-wm">
    <div class="cta-surface relative overflow-hidden rounded-3xl border border-brand-100">
      <div class="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-12 lg:p-14">
        <div class="lg:col-span-6">
          <h2 id="cta-title" class="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">${esc(title)}</h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">${esc(text)}</p>
          <div class="mt-8 flex flex-wrap gap-3">${btnPrimary(ctx, primary.label, primary.id)}${secondary ? btnSecondary(ctx, secondary.label, secondary.id) : ''}</div>
        </div>
        <div class="lg:col-span-6">${img(ctx, image, { cls: 'w-full rounded-2xl object-cover', sizes: '(min-width: 1024px) 600px, 100vw', alt: '' })}</div>
      </div>
    </div>
  </div>
</section>`;
}

/** Related pages section. */
export function related(ctx, ids, { title = 'Related services', eyebrow: eb = 'Explore more' } = {}) {
  if (!ids?.length) return '';
  return section(`${sectionHeader({ eyebrow: eb, title, id: 'related-title' })}${grid(ids.map((id) => linkCard(ctx, id, { compact: true })), ids.length >= 4 ? 4 : 3)}`, { labelledby: 'related-title' });
}

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */
const navLink = (root, id) => `${root}${id}.html`;

function megaLinks(root, ids, cols = 2) {
  return `<ul class="grid gap-1 ${cols === 3 ? 'sm:grid-cols-3' : cols === 2 ? 'sm:grid-cols-2' : ''}" role="list">${ids.map((id) => {
    const e = get(id);
    return `<li><a class="mega-link" href="${navLink(root, id)}"><span class="mega-icon">${icon(e.icon, 'h-5 w-5')}</span><span><span class="block font-semibold text-navy-950">${esc(e.title)}</span><span class="mt-0.5 block text-xs leading-snug text-slate-500">${esc(e.menu || e.short)}</span></span></a></li>`;
  }).join('')}</ul>`;
}

function megaIntro(root, { title, text, id, label }) {
  return `<div class="rounded-2xl bg-soft-gradient p-6"><p class="text-lg font-bold text-navy-950">${esc(title)}</p><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(text)}</p><a class="link-arrow mt-4" href="${navLink(root, id)}">${esc(label)} ${icon('arrowRight', 'h-4 w-4')}</a></div>`;
}

function headerMenus(root) {
  return [
    {
      key: 'ai', label: 'AI', id: 'ai/index', mega: true,
      panel: `<div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">${megaIntro(root, { title: 'AI engineering for real workflows', text: 'Generative AI, agents, automation and machine learning designed around measurable business tasks.', id: 'ai/index', label: 'AI overview' })}</div>
        <div class="lg:col-span-6"><p class="mega-heading">AI services</p>${megaLinks(root, NAV.ai.filter((x) => x !== 'ai/index'))}</div>
        <div class="lg:col-span-3"><p class="mega-heading">AI-powered solutions</p>${megaLinks(root, ['solutions/ai-knowledge-management', 'solutions/customer-support-ai', 'solutions/document-processing', 'solutions/predictive-analytics'], 1)}</div>
      </div>`,
    },
    {
      key: 'services', label: 'Services', id: 'services/index', mega: true,
      panel: `<div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">${megaIntro(root, { title: 'End-to-end engineering', text: 'From discovery and design to cloud operations, one team that owns outcomes across the product lifecycle.', id: 'services/index', label: 'All services' })}</div>
        <div class="lg:col-span-9 grid gap-6 md:grid-cols-3">
          ${NAV.serviceGroups.map((g) => `<div><p class="mega-heading">${esc(g.label)}</p>${megaLinks(root, g.ids, 1)}</div>`).join('')}
        </div>
      </div>`,
    },
    { key: 'engagement-models', label: 'Engagement Models', id: 'engagement-models/index', items: NAV.engagement },
    {
      key: 'industries', label: 'Industries', id: 'industries/index', mega: true,
      panel: `<div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">${megaIntro(root, { title: 'Built around your sector', text: 'Industry context shapes the data, integrations and user journeys we design for.', id: 'industries/index', label: 'All industries' })}</div>
        <div class="lg:col-span-9">${megaLinks(root, NAV.industries.filter((x) => x !== 'industries/index'), 3)}</div>
      </div>`,
    },
    {
      key: 'solutions', label: 'Solutions', id: 'solutions/index', mega: true,
      panel: `<div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">${megaIntro(root, { title: 'Practical business solutions', text: 'Proven patterns for automation, analytics and AI assistance, adapted to your systems.', id: 'solutions/index', label: 'All solutions' })}</div>
        <div class="lg:col-span-9">${megaLinks(root, NAV.solutions.filter((x) => x !== 'solutions/index'), 3)}</div>
      </div>`,
    },
    { key: 'about-us', label: 'About Us', id: 'about-us/index', items: NAV.about },
    { key: 'resources', label: 'Resources', id: 'resources/index', items: NAV.resources },
    { key: 'contact-us', label: 'Contact Us', id: 'contact-us/index' },
  ];
}

export function header(root) {
  const menus = headerMenus(root);
  const logo = (cls) => `<img src="${root}assets/images/logo/white-messenger-logo-360.webp" srcset="${root}assets/images/logo/white-messenger-logo-360.webp 360w, ${root}assets/images/logo/white-messenger-logo-720.webp 720w" sizes="150px" width="360" height="98" alt="White Messenger" class="${cls}">`;

  const desktop = menus.map((m) => {
    if (!m.mega && !m.items) {
      return `<li class="nav-item" data-nav-key="${m.key}"><a class="nav-link" href="${navLink(root, m.id)}">${esc(m.label)}</a></li>`;
    }
    const panelId = `nav-panel-${m.key}`;
    const panel = m.mega
      ? `<div id="${panelId}" class="nav-panel nav-mega" data-nav-panel hidden><div class="container-wm py-8">${m.panel}</div></div>`
      : `<div id="${panelId}" class="nav-panel nav-dropdown" data-nav-panel hidden><ul class="space-y-0.5" role="list">${m.items.map((id) => { const e = get(id); return `<li><a class="dropdown-link" href="${navLink(root, id)}">${icon(e.icon, 'h-4 w-4 text-brand-600')}<span>${esc(e.menuTitle || e.title)}</span></a></li>`; }).join('')}</ul></div>`;
    return `<li class="nav-item ${m.mega ? '' : 'relative'}" data-nav-key="${m.key}" data-nav-item>
      <div class="flex h-full items-center">
        <a class="nav-link pr-0.5" href="${navLink(root, m.id)}">${esc(m.label)}</a>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="${panelId}" data-nav-toggle><span class="sr-only">Show ${esc(m.label)} menu</span>${icon('chevronDown', 'h-3.5 w-3.5', 2.2)}</button>
      </div>
      ${panel}
    </li>`;
  }).join('');

  const mobile = menus.map((m) => {
    const subs = m.mega ? null : m.items;
    let ids = subs;
    if (m.mega) {
      ids = m.key === 'ai' ? NAV.ai : m.key === 'services' ? ['services/index', ...NAV.serviceGroups.flatMap((g) => g.ids)] : m.key === 'industries' ? NAV.industries : NAV.solutions;
    }
    if (!ids) return `<li data-nav-key="${m.key}"><a class="mobile-link" href="${navLink(root, m.id)}">${esc(m.label)}</a></li>`;
    const sid = `mobile-sub-${m.key}`;
    return `<li data-nav-key="${m.key}">
      <div class="flex items-center justify-between">
        <a class="mobile-link flex-1" href="${navLink(root, m.id)}">${esc(m.label)}</a>
        <button type="button" class="mobile-sub-toggle" aria-expanded="false" aria-controls="${sid}" data-mobile-sub-toggle><span class="sr-only">Show ${esc(m.label)} links</span>${icon('chevronDown', 'h-4 w-4', 2.2)}</button>
      </div>
      <ul id="${sid}" class="mb-3 ml-1 space-y-0.5 border-l border-brand-100 pl-3" role="list" hidden>${ids.map((id) => { const e = get(id); return `<li><a class="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700" href="${navLink(root, id)}">${esc(e.menuTitle || e.title)}</a></li>`; }).join('')}</ul>
    </li>`;
  }).join('');

  return `<header data-component="header" class="site-header sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
  <div class="container-wm flex h-[72px] items-center gap-4">
    <a href="${root}index.html" class="mr-2 shrink-0 rounded-lg" aria-label="White Messenger home">${logo('h-9 w-auto sm:h-10')}</a>
    <nav aria-label="Primary" class="ml-auto hidden h-full xl:block">
      <ul class="flex h-full items-center gap-0.5" role="list">${desktop}</ul>
    </nav>
    <div class="ml-auto flex items-center gap-2 xl:ml-3">
      <button type="button" class="icon-btn" data-search-open aria-haspopup="dialog" aria-controls="site-search">${icon('search', 'h-5 w-5')}<span class="sr-only">Search the website</span></button>
      <a href="${root}contact-us/index.html" class="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">Let’s Talk ${icon('arrowRight', 'h-4 w-4')}</a>
      <button type="button" class="icon-btn xl:hidden" id="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-menu" data-mobile-toggle>
        <span data-icon-open>${icon('menu', 'h-6 w-6')}</span><span data-icon-close hidden>${icon('x', 'h-6 w-6')}</span><span class="sr-only">Menu</span>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="mobile-menu xl:hidden" hidden data-mobile-menu>
    <nav aria-label="Primary mobile" class="container-wm py-4">
      <ul class="divide-y divide-slate-100" role="list">${mobile}</ul>
      <div class="mt-6 grid gap-3 border-t border-slate-100 pt-6">
        <a href="${root}contact-us/index.html" class="btn-primary w-full">Let’s Talk ${icon('arrowRight', 'h-4 w-4')}</a>
        <a href="mailto:${site.contact.email}" class="flex items-center gap-2 text-sm text-slate-600">${icon('mail', 'h-4 w-4 text-brand-600')}${site.contact.email}</a>
        <a href="tel:${site.contact.phoneHref}" class="flex items-center gap-2 text-sm text-slate-600">${icon('phone', 'h-4 w-4 text-brand-600')}${site.contact.phoneDisplay}</a>
      </div>
    </nav>
  </div>
  <dialog id="site-search" class="search-dialog" aria-labelledby="site-search-title">
    <div class="flex items-center gap-3 border-b border-slate-200 px-4 py-3 sm:px-5">
      <h2 id="site-search-title" class="sr-only">Search White Messenger</h2>
      ${icon('search', 'h-5 w-5 shrink-0 text-brand-600')}
      <label for="site-search-input" class="sr-only">Search pages and articles</label>
      <input id="site-search-input" type="search" class="w-full border-0 bg-transparent py-2 text-base text-navy-950 placeholder:text-slate-400 focus:outline-none focus:ring-0" placeholder="Search services, industries, solutions, articles…" autocomplete="off" data-search-input>
      <button type="button" class="icon-btn" data-search-close>${icon('x', 'h-5 w-5')}<span class="sr-only">Close search</span></button>
    </div>
    <div class="max-h-[60vh] overflow-y-auto p-3 sm:p-4">
      <p class="px-2 py-1 text-sm text-slate-500" role="status" aria-live="polite" data-search-status>Start typing to search the site.</p>
      <ul class="mt-1 space-y-1" role="list" data-search-results></ul>
    </div>
  </dialog>
</header>`;
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
export function footer(root) {
  const quick = ['index', 'ai/index', 'services/index', 'engagement-models/index', 'industries/index', 'solutions/index', 'about-us/index', 'resources/index', 'contact-us/index'];
  const quickLabels = { index: 'Home', 'ai/index': 'AI', 'services/index': 'Services', 'engagement-models/index': 'Engagement Models', 'industries/index': 'Industries', 'solutions/index': 'Solutions', 'about-us/index': 'About Us', 'resources/index': 'Resources', 'contact-us/index': 'Contact Us' };
  const services = ['ai/index', 'services/web-development', 'services/mobile-app-development', 'services/saas-development', 'services/ecommerce-development', 'services/cloud-devops', 'services/api-integration', 'services/ui-ux-design', 'services/qa-testing'];
  const serviceLabels = { 'ai/index': 'AI Development' };
  const social = site.social.map((s) => s.url
    ? `<a href="${esc(s.url)}" class="social-btn" rel="noopener" target="_blank">${icon(s.icon, 'h-4 w-4')}<span class="sr-only">${esc(s.name)} (opens in a new tab)</span></a>`
    : `<span class="social-btn is-placeholder" role="img" aria-label="${esc(s.name)} profile coming soon" title="${esc(s.name)}: profile link coming soon" data-social-placeholder>${icon(s.icon, 'h-4 w-4')}</span>`).join('');
  const col = (title, html) => `<div><h2 class="text-sm font-bold uppercase tracking-wider text-navy-950">${title}</h2><div class="mt-5">${html}</div></div>`;
  const list = (ids, labels = {}) => `<ul class="space-y-2.5" role="list">${ids.map((id) => `<li><a class="footer-link" href="${navLink(root, id)}">${esc(labels[id] || get(id).title)}</a></li>`).join('')}</ul>`;

  return `<footer data-component="footer" class="site-footer border-t border-slate-200 bg-footer-gradient">
  <div class="container-wm grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
    <div class="sm:col-span-2 lg:col-span-4">
      <a href="${root}index.html" class="inline-block rounded-lg" aria-label="White Messenger home"><img src="${root}assets/images/logo/white-messenger-logo-360.webp" srcset="${root}assets/images/logo/white-messenger-logo-360.webp 360w, ${root}assets/images/logo/white-messenger-logo-720.webp 720w" sizes="170px" width="360" height="98" alt="White Messenger" class="h-11 w-auto" loading="lazy" decoding="async"></a>
      <p class="mt-5 max-w-sm text-sm leading-relaxed text-slate-600">White Messenger is an AI and software engineering partner. We design, build and run intelligent digital products that help organisations work smarter and grow with confidence.</p>
      <div class="mt-6 flex flex-wrap gap-2">${social}</div>
    </div>
    <div class="lg:col-span-2">${col('Quick Links', list(quick, quickLabels))}</div>
    <div class="lg:col-span-3">${col('Our Services', list(services, serviceLabels))}</div>
    <div class="lg:col-span-3">${col('Contact Us', `<ul class="space-y-4 text-sm text-slate-600" role="list">
      <li class="flex gap-3">${icon('mapPin', 'mt-0.5 h-5 w-5 shrink-0 text-brand-600')}<address class="not-italic leading-relaxed">${site.contact.addressLines.map(esc).join('<br>')}</address></li>
      <li class="flex gap-3">${icon('mail', 'mt-0.5 h-5 w-5 shrink-0 text-brand-600')}<a class="footer-link" href="mailto:${site.contact.email}">${site.contact.email}</a></li>
      <li class="flex gap-3">${icon('phone', 'mt-0.5 h-5 w-5 shrink-0 text-brand-600')}<a class="footer-link" href="tel:${site.contact.phoneHref}">${site.contact.phoneDisplay}</a></li>
    </ul>
    <a href="${root}contact-us/index.html" class="btn-primary mt-6 !px-5 !py-2.5">Get in Touch ${icon('arrowRight', 'h-4 w-4')}</a>`)}</div>
  </div>
  <div class="border-t border-slate-200/80">
    <div class="container-wm flex flex-col gap-3 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
      <p>© <span data-year>${site.year}</span> White Messenger. All rights reserved.</p>
      <ul class="flex flex-wrap gap-x-6 gap-y-2" role="list">
        <li><a class="footer-link" href="${root}privacy-policy.html">Privacy Policy</a></li>
        <li><a class="footer-link" href="${root}terms-of-service.html">Terms of Service</a></li>
        <li><a class="footer-link" href="${root}sitemap.html">Sitemap</a></li>
      </ul>
    </div>
  </div>
</footer>`;
}

export { esc, join, href, asset, img, icon };
