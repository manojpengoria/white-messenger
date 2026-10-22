/** Resources templates: hub, blog, AI guides, case studies and article pages. */
import { ctxFor } from '../lib/html.mjs';
import { site } from '../site.config.mjs';
import { pageHero, section, sectionHeader, grid, resourceCard, ctaBanner, checklist, linkCard, breadcrumbs, esc, href, img, icon } from '../lib/components.mjs';
import { sectionWith, table } from './common.mjs';
import { resourcesHub, blogPage, aiGuidesPage, caseStudiesPage, articles } from '../content/resources.mjs';
import { breadcrumbLd, canonical } from '../lib/layout.mjs';
import { imageAbs } from '../lib/html.mjs';

const aid = (a) => `resources/articles/${a.slug}`;
const withId = (a) => ({ ...a, id: aid(a) });

function filterBar(name, label, cats, searchLabel) {
  return `<div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
  <div class="flex flex-wrap gap-2" role="group" aria-label="${esc(label)}">
    <button type="button" class="filter-btn" aria-pressed="true" data-filter="all">All</button>
    ${cats.map(([slug, l]) => `<button type="button" class="filter-btn" aria-pressed="false" data-filter="${esc(slug)}">${esc(l)}</button>`).join('')}
  </div>
  <div class="relative w-full lg:w-80">
    <label for="${name}-search" class="sr-only">${esc(searchLabel)}</label>
    <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">${icon('search', 'h-4 w-4')}</span>
    <input id="${name}-search" type="search" class="field-input !rounded-full !pl-11" placeholder="${esc(searchLabel)}" data-filter-search>
  </div>
</div>
<p class="sr-only" role="status" aria-live="polite" data-filter-count></p>`;
}

const emptyState = `<div class="card mt-6 p-10 text-center" data-filter-empty hidden><p class="font-semibold text-navy-950">No matches found</p><p class="mt-1 text-sm text-slate-600">Try a different keyword or category.</p></div>`;

export function resourcesHubPage() {
  const ctx = ctxFor('resources/index.html', 'resources');
  const h = resourcesHub;
  const [feat, ...rest] = articles;
  const body = [
    pageHero(ctx, { trail: [{ label: 'Resources', id: 'resources/index' }], eyebrow: h.eyebrow, title: h.h1, lead: h.lead, image: h.image, primary: { label: 'Read the Blog', id: 'resources/blog' }, secondary: { label: 'Browse AI Guides', id: 'resources/ai-guides' } }),
    section(`${sectionHeader({ eyebrow: 'Featured', title: 'Featured article', id: 'feat-title' })}
      <article class="card group relative grid overflow-hidden lg:grid-cols-2">
        ${img(ctx, feat.image, { cls: 'h-full min-h-[240px] w-full object-cover', sizes: '(min-width: 1024px) 600px, 100vw', alt: '' })}
        <div class="flex flex-col justify-center p-8 sm:p-10"><span class="eyebrow self-start">${esc(feat.category)}</span><h3 class="mt-4 text-2xl font-extrabold leading-tight text-navy-950 sm:text-3xl"><a href="${href(ctx, aid(feat))}" class="after:absolute after:inset-0">${esc(feat.title)}</a></h3><p class="mt-4 leading-relaxed text-slate-600">${esc(feat.excerpt)}</p><p class="mt-6 text-sm text-slate-500"><time datetime="${feat.date}">${feat.dateLabel}</time> · ${feat.readTime} min read</p></div>
      </article>`, { labelledby: 'feat-title' }),
    section(`${sectionHeader({ eyebrow: 'Latest', title: 'Latest articles', action: { label: 'View all articles', id: 'resources/blog' }, ctx, id: 'latest-title' })}${grid(rest.map((a) => resourceCard(ctx, withId(a))), 4)}`, { tone: 'surface', labelledby: 'latest-title' }),
    section(`<div class="grid gap-5 lg:grid-cols-3">
      ${['resources/blog', 'resources/ai-guides', 'resources/case-studies'].map((id) => linkCard(ctx, id)).join('')}
    </div>`, { labelledby: '' }),
    section(`${sectionHeader({ eyebrow: 'AI guides', title: 'Quick-start guides', lead: 'Short, practical guides you can use with your team today.', action: { label: 'Open AI guides', id: 'resources/ai-guides' }, ctx, id: 'guides-title' })}
      <ul class="grid gap-4 sm:grid-cols-2" role="list">${aiGuidesPage.guides.map((g) => `<li><a href="${href(ctx, `resources/ai-guides#${g.id}`)}" class="card card-hover flex items-start gap-4 p-5"><span class="icon-tile">${icon('sparkles', 'h-5 w-5')}</span><span><span class="block font-bold text-navy-950">${esc(g.title.charAt(0).toUpperCase() + g.title.slice(1))}</span><span class="mt-1 block text-sm text-slate-600">${esc(g.summary)}</span></span></a></li>`).join('')}</ul>`, { tone: 'gradient', labelledby: 'guides-title' }),
    ctaBanner(ctx, { title: 'Have a question our resources do not answer?', text: 'Our engineers are happy to discuss your specific situation. No obligation.' }),
  ].join('\n');
  return { ctx, path: 'resources/index.html', nav: 'resources', title: h.metaTitle, description: h.metaDescription, image: h.image, body, jsonld: [breadcrumbLd([{ label: 'Resources', path: 'resources/index.html' }])] };
}

export function blogPageRender() {
  const ctx = ctxFor('resources/blog.html', 'resources');
  const p = blogPage;
  const cats = [...new Map(articles.map((a) => [a.categorySlug, a.category])).entries()];
  const body = [
    pageHero(ctx, { trail: [{ label: 'Resources', id: 'resources/index' }, { label: 'Blog', id: 'resources/blog' }], eyebrow: p.eyebrow, title: p.h1, lead: p.lead, image: p.image, primary: { label: 'Talk to Our Team', id: 'contact-us/index' }, secondary: { label: 'AI Guides', id: 'resources/ai-guides' } }),
    section(`<h2 id="all-articles" class="sr-only">All articles</h2><div data-filter-root>${filterBar('blog', 'Filter articles by category', cats, 'Search articles')}
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${articles.map((a) => resourceCard(ctx, withId(a))).join('')}</div>${emptyState}</div>`, { labelledby: 'all-articles' }),
    ctaBanner(ctx),
  ].join('\n');
  return { ctx, path: 'resources/blog.html', nav: 'resources', title: p.metaTitle, description: p.metaDescription, image: p.image, body, jsonld: [breadcrumbLd([{ label: 'Resources', path: 'resources/index.html' }, { label: 'Blog', path: 'resources/blog.html' }])] };
}

export function aiGuidesPageRender() {
  const ctx = ctxFor('resources/ai-guides.html', 'resources');
  const p = aiGuidesPage;
  const guideHtml = (g, i) => {
    let inner = `<p class="text-lg leading-relaxed text-slate-600">${esc(g.summary)}</p>`;
    if (g.groups) inner += `<div class="mt-8 grid gap-5 md:grid-cols-2">${g.groups.map((gr) => `<div class="card p-6"><h3 class="font-bold text-navy-950">${esc(gr.label)}</h3>${checklist(gr.items, 'mt-4')}</div>`).join('')}</div>`;
    if (g.table) inner += `<div class="mt-8">${table(g.table.columns, g.table.rows.map((r) => [esc(r[0]), ...r.slice(1)]), 'Comparison of RAG and fine-tuning')}</div><div class="mt-6 rounded-2xl border border-brand-100 bg-brand-50/60 p-6"><h3 class="font-bold text-navy-950">Our advice</h3>${checklist(g.advice, 'mt-4')}</div>`;
    if (g.steps) inner += `<ol class="mt-8 grid gap-4 md:grid-cols-2" role="list">${g.steps.map((s, k) => `<li class="card flex gap-4 p-5"><span class="step-num !h-9 !w-9 !text-base">${k + 1}</span><div><h3 class="font-bold text-navy-950">${esc(s.t)}</h3><p class="mt-1 text-sm leading-relaxed text-slate-600">${esc(s.d)}</p></div></li>`).join('')}</ol>`;
    if (g.elements) inner += `<div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">${g.elements.map((s) => `<div class="card p-5"><h3 class="font-bold text-navy-950">${esc(s.t)}</h3><p class="mt-1 text-sm leading-relaxed text-slate-600">${esc(s.d)}</p></div>`).join('')}</div>`;
    return `<section id="${g.id}" aria-labelledby="${g.id}-title" class="scroll-mt-28 border-t border-slate-200 pt-12 first:border-0 first:pt-0"><p class="text-sm font-bold uppercase tracking-wider text-brand-700">Guide ${i + 1}</p><h2 id="${g.id}-title" class="mt-2 text-2xl font-extrabold text-navy-950 sm:text-3xl">${esc(g.title.charAt(0).toUpperCase() + g.title.slice(1))}</h2><div class="mt-5">${inner}</div></section>`;
  };
  const body = [
    pageHero(ctx, { trail: [{ label: 'Resources', id: 'resources/index' }, { label: 'AI Guides', id: 'resources/ai-guides' }], eyebrow: p.eyebrow, title: p.h1, lead: p.lead, image: p.image, primary: { label: 'Discuss an AI Project', id: 'contact-us/index' }, secondary: { label: 'AI Services', id: 'ai/index' } }),
    `<div class="section"><div class="container-wm grid gap-10 lg:grid-cols-12">
      <aside class="lg:col-span-3"><nav aria-label="Guides on this page" class="card p-5 lg:sticky lg:top-28"><p class="text-xs font-bold uppercase tracking-wider text-slate-500">On this page</p><ol class="mt-3 space-y-1 text-sm" role="list">${p.guides.map((g) => `<li><a class="block rounded-lg px-3 py-2 text-slate-600 hover:bg-brand-50 hover:text-brand-700" href="#${g.id}">${esc(g.title.charAt(0).toUpperCase() + g.title.slice(1))}</a></li>`).join('')}</ol></nav></aside>
      <div class="min-w-0 space-y-12 lg:col-span-9">${p.guides.map(guideHtml).join('')}</div>
    </div></div>`,
    section(`${sectionHeader({ eyebrow: 'Go deeper', title: 'Related reading', id: 'gr-title' })}${grid(articles.filter((a) => a.categorySlug === 'ai' || a.categorySlug === 'automation').map((a) => resourceCard(ctx, withId(a))), 2)}`, { tone: 'surface', labelledby: 'gr-title' }),
    ctaBanner(ctx, { title: 'Ready to apply these guides?', text: 'We can facilitate an AI readiness workshop with your team and help prioritise use cases.' }),
  ].join('\n');
  return { ctx, path: 'resources/ai-guides.html', nav: 'resources', title: p.metaTitle, description: p.metaDescription, image: p.image, body, jsonld: [breadcrumbLd([{ label: 'Resources', path: 'resources/index.html' }, { label: 'AI Guides', path: 'resources/ai-guides.html' }])] };
}

export function caseStudiesPageRender() {
  const ctx = ctxFor('resources/case-studies.html', 'resources');
  const p = caseStudiesPage;
  const cats = [...new Map(p.studies.map((s) => [s.industrySlug, s.industry])).entries()];
  const study = (s) => `<article id="${s.id}" class="card overflow-hidden" data-filter-item data-category="${s.industrySlug}" data-search="${esc((s.title + ' ' + s.context + ' ' + s.industry).toLowerCase())}">
    <div class="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-surface px-6 py-4">
      <span class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-800 ring-1 ring-amber-200">${icon('info', 'h-3.5 w-3.5')}Illustrative scenario</span>
      <span class="chip">${icon(s.icon, 'h-3.5 w-3.5 text-brand-600')}${esc(s.industry)}</span>
    </div>
    <div class="p-6 sm:p-8">
      <h2 class="text-xl font-extrabold text-navy-950 sm:text-2xl">${esc(s.title)}</h2>
      <div class="mt-6 grid gap-6 lg:grid-cols-2">
        <div><h3 class="text-sm font-bold uppercase tracking-wider text-navy-900">Context</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(s.context)}</p><h3 class="mt-5 text-sm font-bold uppercase tracking-wider text-navy-900">Challenge</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(s.challenge)}</p></div>
        <div><h3 class="text-sm font-bold uppercase tracking-wider text-navy-900">Our approach</h3><ol class="mt-3 space-y-2 text-sm text-slate-600" role="list">${s.approach.map((x, i) => `<li class="flex gap-3"><span class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">${i + 1}</span><span>${esc(x)}</span></li>`).join('')}</ol></div>
      </div>
      <div class="mt-6 grid gap-6 border-t border-slate-200 pt-6 lg:grid-cols-2">
        <div><h3 class="text-sm font-bold uppercase tracking-wider text-navy-900">Solution components</h3><ul class="mt-3 flex flex-wrap gap-2" role="list">${s.components.map((x) => `<li class="chip">${esc(x)}</li>`).join('')}</ul></div>
        <div><h3 class="text-sm font-bold uppercase tracking-wider text-navy-900">What we would measure</h3>${checklist(s.measures, 'mt-3 text-sm')}</div>
      </div>
      <p class="mt-6 flex flex-wrap gap-x-6 gap-y-2">${s.links.map((id) => `<a class="link-arrow" href="${href(ctx, id)}">Related: ${esc(id.split('/')[1].replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()).replace('Ai ', 'AI '))} ${icon('arrowRight', 'h-4 w-4')}</a>`).join('')}</p>
    </div>
  </article>`;
  const body = [
    pageHero(ctx, { trail: [{ label: 'Resources', id: 'resources/index' }, { label: 'Case Studies', id: 'resources/case-studies' }], eyebrow: p.eyebrow, title: p.h1, lead: p.lead, image: p.image, primary: { label: 'Discuss Your Challenge', id: 'contact-us/index' }, secondary: { label: 'Our Approach', id: 'about-us/our-approach' } }),
    section(`<div class="mb-8 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900" role="note">${icon('info', 'mt-0.5 h-5 w-5 shrink-0')}<p><strong>Please note:</strong> ${esc(p.notice)}</p></div>
      <h2 id="cs-title" class="sr-only">Illustrative scenarios</h2>
      <div data-filter-root>${filterBar('cases', 'Filter scenarios by industry', cats, 'Search scenarios')}<div class="space-y-6">${p.studies.map(study).join('')}</div>${emptyState}</div>`, { labelledby: 'cs-title' }),
    ctaBanner(ctx, { title: 'Facing a similar challenge?', text: 'Tell us about your situation and we will outline how we would approach it, with honest expectations.' }),
  ].join('\n');
  return { ctx, path: 'resources/case-studies.html', nav: 'resources', title: p.metaTitle, description: p.metaDescription, image: p.image, body, jsonld: [breadcrumbLd([{ label: 'Resources', path: 'resources/index.html' }, { label: 'Case Studies', path: 'resources/case-studies.html' }])] };
}

function block(b) {
  if (typeof b === 'string') return `<p>${esc(b)}</p>`;
  if (b.h3) return `<h3>${esc(b.h3)}</h3>`;
  if (b.ul) return `<ul>${b.ul.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
  if (b.ol) return `<ol>${b.ol.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`;
  if (b.callout) return `<blockquote><p>${esc(b.callout)}</p></blockquote>`;
  if (b.example) return `<aside class="not-prose my-8 rounded-2xl border border-brand-100 bg-brand-50/60 p-6"><p class="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-700">${icon('lightbulb', 'h-4 w-4')}${esc(b.example.title)}</p><p class="mt-3 leading-relaxed text-slate-700">${esc(b.example.text)}</p></aside>`;
  throw new Error('Unknown article block');
}

export function articlePages() {
  return articles.map((a) => {
    const path = `resources/articles/${a.slug}.html`;
    const ctx = ctxFor(path, 'resources');
    const toc = [...a.sections.map((s) => ({ id: s.id, h: s.heading })), { id: 'recommendations', h: 'Practical recommendations' }, { id: 'conclusion', h: 'Conclusion' }];
    const relatedArticles = a.related.map((slug) => articles.find((x) => x.slug === slug));
    const body = [
      `<section class="hero-surface border-b border-slate-200/70"><div class="container-wm py-12 sm:py-16">
        ${breadcrumbs(ctx, [{ label: 'Resources', id: 'resources/index' }, { label: 'Blog', id: 'resources/blog' }, { label: a.title, id: aid(a) }])}
        <div class="max-w-4xl"><span class="eyebrow">${esc(a.category)}</span>
        <h1 class="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-5xl">${esc(a.title)}</h1>
        <p class="mt-5 text-lg leading-relaxed text-slate-600">${esc(a.excerpt)}</p>
        <p class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"><span>By White Messenger Editorial Team</span><span class="inline-flex items-center gap-1.5">${icon('calendar', 'h-4 w-4')}<time datetime="${a.date}">${a.dateLabel}</time></span><span class="inline-flex items-center gap-1.5">${icon('clock', 'h-4 w-4')}${a.readTime} min read</span></p></div>
        <div class="mt-10">${img(ctx, a.image, { eager: true, cls: 'aspect-[21/9] w-full rounded-3xl border border-white object-cover shadow-card-lg', sizes: '(min-width: 1280px) 1216px, 100vw' })}</div>
      </div></section>`,
      `<div class="section"><div class="container-wm grid gap-12 lg:grid-cols-12">
        <aside class="lg:col-span-3 lg:order-2"><nav aria-label="Table of contents" class="card p-5 lg:sticky lg:top-28"><p class="text-xs font-bold uppercase tracking-wider text-slate-500">Table of contents</p><ol class="mt-3 space-y-1 text-sm" role="list">${toc.map((t) => `<li><a class="block rounded-lg px-3 py-1.5 text-slate-600 hover:bg-brand-50 hover:text-brand-700" href="#${t.id}">${esc(t.h)}</a></li>`).join('')}</ol></nav></aside>
        <article class="article-prose lg:col-span-9 lg:order-1">
          ${a.intro.map((x) => `<p class="lead">${esc(x)}</p>`).join('')}
          ${a.sections.map((s) => `<h2 id="${s.id}">${esc(s.heading)}</h2>${s.blocks.map(block).join('')}`).join('')}
          <h2 id="recommendations">Practical recommendations</h2>
          <div class="not-prose rounded-2xl border border-slate-200 bg-surface p-6">${checklist(a.recommendations)}</div>
          <h2 id="conclusion">Conclusion</h2>
          ${a.conclusion.map((x) => `<p>${esc(x)}</p>`).join('')}
        </article>
      </div></div>`,
      section(`${sectionHeader({ eyebrow: 'Keep reading', title: 'Related articles', id: 'rel-title' })}${grid(relatedArticles.map((r) => resourceCard(ctx, withId(r))), 3)}`, { tone: 'surface', labelledby: 'rel-title' }),
      ctaBanner(ctx, { title: 'Want to discuss this for your organisation?', text: 'Our team can help you apply these ideas to your systems, data and goals.' }),
    ].join('\n');
    const ld = {
      '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.metaDescription, datePublished: a.date, dateModified: a.date,
      image: imageAbs(site.url, a.image), mainEntityOfPage: canonical(path),
      author: { '@type': 'Organization', name: 'White Messenger' }, publisher: { '@type': 'Organization', name: 'White Messenger', logo: { '@type': 'ImageObject', url: `${site.url}/assets/images/logo/white-messenger-logo-720.png` } },
    };
    return { ctx, path, nav: 'resources', title: a.metaTitle, description: a.metaDescription, image: a.image, ogType: 'article', body, jsonld: [ld, breadcrumbLd([{ label: 'Resources', path: 'resources/index.html' }, { label: 'Blog', path: 'resources/blog.html' }, { label: a.title, path }])] };
  });
}
