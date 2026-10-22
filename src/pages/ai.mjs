/** AI section templates. */
import { ctxFor } from '../lib/html.mjs';
import { pageHero, section, sectionHeader, grid, iconTile, processSteps, workflowList, techBlock, faq, ctaBanner, related, checklist, paragraphs, featureCard, esc, href, icon, img } from '../lib/components.mjs';
import { introBlock, cardsSection, approachSection, useCasesSection, tabs } from './common.mjs';
import { aiHub, aiPages } from '../content/ai.mjs';
import { breadcrumbLd } from '../lib/layout.mjs';

export function aiHubPage() {
  const ctx = ctxFor('ai/index.html', 'ai');
  const h = aiHub;
  const trail = [{ label: 'AI', id: 'ai/index' }];
  const capCards = h.capabilities.map((c) => `<a href="${href(ctx, c.id)}" class="card card-hover group flex h-full flex-col p-6">${iconTile(c.icon)}<h3 class="mt-5 text-base font-bold text-navy-950">${esc(c.t)}</h3><p class="mt-2 flex-1 text-sm leading-relaxed text-slate-600">${esc(c.d)}</p><span class="mt-5 flex items-center text-sm font-semibold text-brand-700">Explore<span class="sr-only"> ${esc(c.t)}</span><span class="arrow-dot">${icon('arrowRight', 'h-3.5 w-3.5')}</span></span></a>`);

  const body = [
    pageHero(ctx, { trail, eyebrow: h.eyebrow, title: h.h1, lead: h.lead, image: h.image, secondary: { label: 'See AI Capabilities', id: 'ai/index#capabilities' }, highlights: ['Generative AI', 'AI agents', 'RAG', 'Machine learning'] }),
    introBlock({ eyebrow: 'Overview', heading: h.overview.heading, paras: h.overview.paragraphs }),
    section(`${sectionHeader({ eyebrow: 'Capabilities', title: 'What we build with AI', lead: 'Nine capability areas, each grounded in a specific kind of business task. Follow any card to learn more.', id: 'cap-title' })}${grid(capCards, 3)}`, { tone: 'surface', id: 'capabilities', labelledby: 'cap-title' }),
    section(`${sectionHeader({ eyebrow: 'By department', title: 'Where AI helps across your organisation', lead: 'Practical starting points, organised by the teams that typically benefit first.', id: 'dept-title' })}
      ${tabs('dept', 'AI use cases by department', h.departments.map((d) => ({ label: d.label, html: `<div class="grid gap-8 lg:grid-cols-12"><p class="text-lg leading-relaxed text-slate-600 lg:col-span-4">${esc(d.intro)}</p><div class="card p-6 sm:p-8 lg:col-span-8">${checklist(d.items)}</div></div>` })))}`, { labelledby: 'dept-title' }),
    section(`<div class="grid items-start gap-10 lg:grid-cols-12">
      <div class="lg:col-span-5"><p class="eyebrow">RAG</p><h2 id="rag-title" class="section-title mt-3">${esc(h.rag.heading)}</h2><div class="mt-5 space-y-4">${paragraphs(h.rag.paragraphs)}</div></div>
      <div class="lg:col-span-7">${workflowList(h.rag.steps, 'How a RAG pipeline works')}</div>
    </div>`, { tone: 'gradient', labelledby: 'rag-title' }),
    section(`<div class="grid items-center gap-10 lg:grid-cols-12">
      <div class="order-2 lg:order-1 lg:col-span-6">${img(ctx, 'home-ai-cube', { cls: 'w-full rounded-3xl border border-slate-200 object-cover shadow-card', sizes: '(min-width: 1024px) 560px, 100vw' })}</div>
      <div class="order-1 lg:order-2 lg:col-span-6"><p class="eyebrow">Integration</p><h2 id="int-title" class="section-title mt-3">${esc(h.integration.heading)}</h2><div class="mt-5 space-y-4">${paragraphs(h.integration.paragraphs)}</div><div class="mt-6">${checklist(h.integration.points)}</div></div>
    </div>`, { labelledby: 'int-title' }),
    section(`${sectionHeader({ eyebrow: 'Responsible AI', title: h.responsible.heading, lead: h.responsible.intro, id: 'resp-title' })}${grid(h.responsible.items.map(featureCard), 3)}`, { tone: 'surface', labelledby: 'resp-title' }),
    section(`${sectionHeader({ eyebrow: 'How we deliver', title: 'From opportunity to production', lead: 'A staged approach that proves value early and scales what works.', id: 'aiproc-title' })}${processSteps(h.process)}`, { labelledby: 'aiproc-title' }),
    related(ctx, aiPages.map((p) => `ai/${p.slug}`).concat(['solutions/ai-knowledge-management']).slice(0, 4), { title: 'Explore our AI services', eyebrow: 'AI services' }),
    faq(h.faqs, { id: 'ai-faq', title: 'AI questions, answered' }),
    ctaBanner(ctx, { title: 'Start your AI journey with a focused first step', text: 'Tell us about a process you want to improve. We will help you assess whether AI is the right tool and what a sensible first project looks like.' }),
  ].join('\n');

  return { ctx, path: 'ai/index.html', nav: 'ai', title: h.metaTitle, description: h.metaDescription, image: h.image, body, jsonld: [breadcrumbLd([{ label: 'AI', path: 'ai/index.html' }])] };
}

export function aiDetailPages() {
  return aiPages.map((p) => {
    const c = ctxFor(`ai/${p.slug}.html`, 'ai');
    const trail = [{ label: 'AI', id: 'ai/index' }, { label: p.navTitle, id: `ai/${p.slug}` }];
    const body = [
      pageHero(c, { trail, eyebrow: 'AI Engineering', title: p.h1, lead: p.lead, image: p.image, secondary: { label: 'All AI Services', id: 'ai/index' } }),
      introBlock({ eyebrow: 'Introduction', heading: p.introHeading, paras: p.intro }),
      cardsSection({ eyebrow: 'Business challenges', title: 'The problems this solves', items: p.challenges, kind: 'warn', cols: 4, tone: 'surface' }),
      approachSection({ eyebrow: 'Proposed approach', title: 'How we approach it', lead: p.approach.lead, points: p.approach.points, tone: 'white' }),
      cardsSection({ eyebrow: 'Core capabilities', title: 'What we deliver', items: p.capabilities, cols: 3, tone: 'surface', anchor: 'capabilities' }),
      useCasesSection({ title: 'Relevant use cases', lead: 'Examples of where this capability is commonly applied.', items: p.useCases }),
      section(`${sectionHeader({ eyebrow: 'Technology considerations', title: 'Choosing the right technology', id: 'tech-title' })}${techBlock(p.tech)}`, { tone: 'gradient', labelledby: 'tech-title' }),
      section(`${sectionHeader({ eyebrow: 'Implementation', title: 'Implementation process', id: 'impl-title' })}${processSteps(p.process)}`, { labelledby: 'impl-title' }),
      related(c, p.related, { title: 'Related services and solutions' }),
      faq(p.faqs, { id: 'faq' }),
      ctaBanner(c, { title: p.cta.title, text: p.cta.text }),
    ].join('\n');
    return { ctx: c, path: `ai/${p.slug}.html`, nav: 'ai', title: p.metaTitle, description: p.metaDescription, image: p.image, body, jsonld: [breadcrumbLd([{ label: 'AI', path: 'ai/index.html' }, { label: p.navTitle, path: `ai/${p.slug}.html` }])] };
  });
}
