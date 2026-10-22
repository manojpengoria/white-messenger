/** Engagement model templates. */
import { ctxFor, href } from '../lib/html.mjs';
import { pageHero, section, sectionHeader, grid, linkCard, faq, ctaBanner, related, checklist, paragraphs, prosCons, esc, icon } from '../lib/components.mjs';
import { introBlock, table } from './common.mjs';
import { engagementHub, engagementModels } from '../content/engagement.mjs';
import { breadcrumbLd } from '../lib/layout.mjs';

export function engagementHubPage() {
  const ctx = ctxFor('engagement-models/index.html', 'engagement-models');
  const h = engagementHub;
  const rows = h.compare.rows.map((r) => {
    const model = engagementModels.find((m) => m.navTitle === r[0] || m.navTitle.startsWith(r[0].split(' ')[0]));
    return [`<a class="text-brand-700 hover:underline" href="${href(ctx, `engagement-models/${model.slug}`)}">${esc(r[0])}</a>`, ...r.slice(1)];
  });
  const body = [
    pageHero(ctx, { trail: [{ label: 'Engagement Models', id: 'engagement-models/index' }], eyebrow: h.eyebrow, title: h.h1, lead: h.lead, image: h.image, secondary: { label: 'Compare Models', id: 'engagement-models/index#compare' } }),
    introBlock({ eyebrow: 'Choosing a model', heading: 'Match the model to your situation', paras: h.intro }),
    section(`${sectionHeader({ eyebrow: 'All models', title: 'Seven ways to work with us', id: 'models-title' })}${grid(engagementModels.map((m) => linkCard(ctx, `engagement-models/${m.slug}`)), 4)}`, { tone: 'surface', labelledby: 'models-title' }),
    section(`${sectionHeader({ eyebrow: 'Comparison', title: 'Engagement models compared', lead: 'A simplified comparison. Real engagements are tailored, and models can be combined.', id: 'cmp-title' })}${table(h.compare.columns, rows, 'Comparison of White Messenger engagement models')}`, { id: 'compare', labelledby: 'cmp-title' }),
    section(`${sectionHeader({ eyebrow: 'Quick guide', title: 'Which model fits?', id: 'fit-title' })}
      <ul class="grid gap-4 md:grid-cols-2" role="list">${h.chooser.map((c) => `<li><a href="${href(ctx, c.id)}" class="card card-hover group flex items-center justify-between gap-4 p-5"><span><span class="block text-sm text-slate-600">If ${esc(c.q.charAt(0).toLowerCase() + c.q.slice(1))}…</span><span class="mt-1 block font-bold text-navy-950">Consider ${esc(c.a)}</span></span><span class="arrow-dot !ml-0 shrink-0">${icon('arrowRight', 'h-3.5 w-3.5')}</span></a></li>`).join('')}</ul>`, { tone: 'gradient', labelledby: 'fit-title' }),
    faq(h.faqs, { id: 'eng-faq' }),
    ctaBanner(ctx, { title: 'Let’s find the right way to work together', text: 'Share your goals, timeline and constraints, and we will recommend an engagement model with clear assumptions.' }),
  ].join('\n');
  return { ctx, path: 'engagement-models/index.html', nav: 'engagement-models', title: h.metaTitle, description: h.metaDescription, image: h.image, body, jsonld: [breadcrumbLd([{ label: 'Engagement Models', path: 'engagement-models/index.html' }])] };
}

export function engagementDetailPages() {
  return engagementModels.map((p) => {
    const c = ctxFor(`engagement-models/${p.slug}.html`, 'engagement-models');
    const trail = [{ label: 'Engagement Models', id: 'engagement-models/index' }, { label: p.navTitle, id: `engagement-models/${p.slug}` }];
    const body = [
      pageHero(c, { trail, eyebrow: 'Engagement Model', title: p.h1, lead: p.lead, image: p.image, secondary: { label: 'Compare All Models', id: 'engagement-models/index#compare' } }),
      introBlock({ eyebrow: 'Overview', heading: p.introHeading, paras: p.intro, list: p.suitable, listTitle: 'Suitable project types' }),
      section(`<div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-5"><p class="eyebrow">Scope definition</p><h2 id="scope-title" class="section-title mt-3">How scope is defined</h2></div>
        <div class="space-y-4 lg:col-span-7">${paragraphs(p.scope, 'text-base leading-relaxed text-slate-600 sm:text-lg')}</div>
      </div>`, { tone: 'surface', labelledby: 'scope-title' }),
      section(`${sectionHeader({ eyebrow: 'Team structure', title: 'Who is involved', id: 'team-title' })}
        <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-${Math.min(p.team.length, 5) === 5 ? 5 : p.team.length}" role="list">${p.team.map((t) => `<li class="card h-full p-6"><span class="icon-tile">${icon('user', 'h-6 w-6')}</span><h3 class="mt-4 font-bold text-navy-950">${esc(t.role)}</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(t.d)}</p></li>`).join('')}</ul>`, { labelledby: 'team-title' }),
      section(`${sectionHeader({ eyebrow: 'Collaboration model', title: 'How we collaborate', id: 'collab-title' })}
        <ol class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="list">${p.collaboration.map((s, i) => `<li class="card h-full p-6"><span class="step-num">${i + 1}</span><h3 class="mt-4 font-bold text-navy-950">${esc(s.t)}</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(s.d)}</p></li>`).join('')}</ol>`, { tone: 'gradient', labelledby: 'collab-title' }),
      section(`${sectionHeader({ eyebrow: 'Responsibilities', title: 'Who is responsible for what', id: 'resp-title' })}
        <div class="grid gap-5 md:grid-cols-2">
          <div class="card p-6 sm:p-8"><h3 class="flex items-center gap-2 text-lg font-bold text-navy-950"><span class="text-brand-600">${icon('building', 'h-5 w-5')}</span>White Messenger</h3>${checklist(p.responsibilities.wm, 'mt-5')}</div>
          <div class="card p-6 sm:p-8"><h3 class="flex items-center gap-2 text-lg font-bold text-navy-950"><span class="text-teal-600">${icon('users', 'h-5 w-5')}</span>Your organisation</h3>${checklist(p.responsibilities.client, 'mt-5')}</div>
        </div>`, { labelledby: 'resp-title' }),
      section(`${sectionHeader({ eyebrow: 'Trade-offs', title: 'Advantages and limitations', lead: 'Every model involves trade-offs. Understanding them helps you choose with confidence.', id: 'trade-title' })}${prosCons(p.advantages, p.limitations)}`, { tone: 'surface', labelledby: 'trade-title' }),
      related(c, p.related, { title: 'Related models and services' }),
      faq(p.faqs, { id: 'faq' }),
      ctaBanner(c, { title: p.cta.title, text: p.cta.text }),
    ].join('\n');
    return { ctx: c, path: `engagement-models/${p.slug}.html`, nav: 'engagement-models', title: p.metaTitle, description: p.metaDescription, image: p.image, body, jsonld: [breadcrumbLd([{ label: 'Engagement Models', path: 'engagement-models/index.html' }, { label: p.navTitle, path: `engagement-models/${p.slug}.html` }])] };
  });
}
