/** Solution templates. */
import { ctxFor } from '../lib/html.mjs';
import { pageHero, section, sectionHeader, grid, linkCard, processSteps, workflowList, faq, ctaBanner, related, checklist, paragraphs, esc, icon } from '../lib/components.mjs';
import { introBlock, cardsSection } from './common.mjs';
import { solutionsHub, solutions } from '../content/solutions.mjs';
import { breadcrumbLd } from '../lib/layout.mjs';

export function solutionsHubPage() {
  const ctx = ctxFor('solutions/index.html', 'solutions');
  const h = solutionsHub;
  const body = [
    pageHero(ctx, { trail: [{ label: 'Solutions', id: 'solutions/index' }], eyebrow: h.eyebrow, title: h.h1, lead: h.lead, image: h.image, secondary: { label: 'Browse Solutions', id: 'solutions/index#all' } }),
    introBlock({ eyebrow: 'Overview', heading: 'Solutions built around business problems', paras: h.intro }),
    ...h.groups.map((g, i) => section(`${sectionHeader({ eyebrow: `0${i + 1}`, title: g.label, id: `sg-${i}` })}${grid(g.ids.map((id) => linkCard(ctx, id)), g.ids.length === 4 ? 4 : 3)}`, { tone: i % 2 ? 'white' : 'surface', id: i ? '' : 'all', labelledby: `sg-${i}` })),
    section(`${sectionHeader({ eyebrow: 'Delivery', title: 'How we deliver a solution', align: 'center', id: 'sdel-title' })}${processSteps(h.delivery)}`, { tone: 'gradient', labelledby: 'sdel-title' }),
    faq(h.faqs, { id: 'sol-faq' }),
    ctaBanner(ctx, { title: 'Have a challenge that is not listed?', text: 'Many of our engagements start with a problem that does not fit a neat category. Tell us about yours.' }),
  ].join('\n');
  return { ctx, path: 'solutions/index.html', nav: 'solutions', title: h.metaTitle, description: h.metaDescription, image: h.image, body, jsonld: [breadcrumbLd([{ label: 'Solutions', path: 'solutions/index.html' }])] };
}

export function solutionDetailPages() {
  return solutions.map((p) => {
    const c = ctxFor(`solutions/${p.slug}.html`, 'solutions');
    const trail = [{ label: 'Solutions', id: 'solutions/index' }, { label: p.navTitle, id: `solutions/${p.slug}` }];
    const body = [
      pageHero(c, { trail, eyebrow: 'Solution', title: p.h1, lead: p.lead, image: p.image, secondary: { label: 'All Solutions', id: 'solutions/index' } }),
      introBlock({ eyebrow: 'The problem', heading: p.problemHeading, paras: p.problem }),
      section(`${sectionHeader({ eyebrow: 'Causes and impact', title: 'Why it happens and what it costs', id: 'cause-title' })}
        <div class="grid gap-5 lg:grid-cols-12">
          <div class="grid gap-5 sm:grid-cols-3 lg:col-span-8">${p.causes.map((x, i) => `<div class="card h-full p-6"><span class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-sm font-bold text-amber-700 ring-1 ring-amber-100">${String(i + 1).padStart(2, '0')}</span><h3 class="mt-4 font-bold text-navy-950">${esc(x.t)}</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(x.d)}</p></div>`).join('')}</div>
          <div class="rounded-2xl border border-amber-100 bg-amber-50/50 p-6 lg:col-span-4"><h3 class="flex items-center gap-2 font-bold text-navy-950"><span class="text-amber-600">${icon('alert', 'h-5 w-5')}</span>Operational impact</h3><ul class="mt-4 space-y-3" role="list">${p.impact.map((x) => `<li class="flex gap-2 text-sm text-slate-700"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"></span>${esc(x)}</li>`).join('')}</ul></div>
        </div>`, { tone: 'surface', labelledby: 'cause-title' }),
      introBlock({ eyebrow: 'The solution', heading: p.solutionHeading, paras: p.solution }),
      cardsSection({ eyebrow: 'Main features', title: 'Key features', items: p.features, cols: 3, tone: 'surface' }),
      section(`<div class="grid items-start gap-10 lg:grid-cols-12">
        <div class="lg:col-span-5"><p class="eyebrow">High-level workflow</p><h2 id="flow-title" class="section-title mt-3">How it works</h2><div class="mt-6 rounded-2xl border border-brand-100 bg-brand-50/60 p-6"><h3 class="font-bold text-navy-950">${esc(p.example.title)}</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(p.example.text)}</p></div></div>
        <div class="lg:col-span-7">${workflowList(p.workflow)}</div>
      </div>`, { labelledby: 'flow-title' }),
      section(`<div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-4"><p class="eyebrow">Integration requirements</p><h2 id="sint-title" class="section-title mt-3">Systems typically involved</h2><ul class="mt-6 flex flex-wrap gap-2" role="list">${p.integrations.map((x) => `<li class="chip">${icon('plug', 'h-3.5 w-3.5 text-brand-600')}${esc(x)}</li>`).join('')}</ul></div>
        <div class="lg:col-span-8"><h3 class="text-lg font-bold text-navy-950">Implementation considerations</h3><div class="mt-5 grid gap-4 sm:grid-cols-2">${p.considerations.map((x) => `<div class="card h-full p-5"><h4 class="font-semibold text-navy-950">${esc(x.t)}</h4><p class="mt-1.5 text-sm leading-relaxed text-slate-600">${esc(x.d)}</p></div>`).join('')}</div></div>
      </div>`, { tone: 'gradient', labelledby: 'sint-title' }),
      section(`${sectionHeader({ eyebrow: 'Potential benefits', title: 'What this solution is designed to improve', lead: 'Actual results depend on your starting point, data and adoption; we agree how to measure them during discovery.', id: 'sben-title' })}
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${p.benefits.map((b) => `<div class="card h-full border-t-4 border-t-teal-500 p-6"><span class="text-teal-600">${icon('checkCircle', 'h-6 w-6')}</span><h3 class="mt-4 font-bold text-navy-950">${esc(b.t)}</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(b.d)}</p></div>`).join('')}</div>`, { labelledby: 'sben-title' }),
      related(c, p.related, { title: 'Related solutions and services' }),
      p.faqs ? faq(p.faqs, { id: 'faq' }) : '',
      ctaBanner(c, { title: p.cta.title, text: p.cta.text }),
    ].join('\n');
    return { ctx: c, path: `solutions/${p.slug}.html`, nav: 'solutions', title: p.metaTitle, description: p.metaDescription, image: p.image, body, jsonld: [breadcrumbLd([{ label: 'Solutions', path: 'solutions/index.html' }, { label: p.navTitle, path: `solutions/${p.slug}.html` }])] };
  });
}

