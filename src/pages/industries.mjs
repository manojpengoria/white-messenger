/** Industry templates. */
import { ctxFor } from '../lib/html.mjs';
import { pageHero, section, sectionHeader, grid, imageCard, workflowList, faq, ctaBanner, related, featureCard, esc, icon } from '../lib/components.mjs';
import { introBlock, cardsSection, useCasesSection } from './common.mjs';
import { industriesHub, industries } from '../content/industries.mjs';
import { breadcrumbLd } from '../lib/layout.mjs';

export function industriesHubPage() {
  const ctx = ctxFor('industries/index.html', 'industries');
  const h = industriesHub;
  const body = [
    pageHero(ctx, { trail: [{ label: 'Industries', id: 'industries/index' }], eyebrow: h.eyebrow, title: h.h1, lead: h.lead, image: h.image, secondary: { label: 'Browse Industries', id: 'industries/index#all' } }),
    introBlock({ eyebrow: 'Our perspective', heading: 'Why industry context matters', paras: h.intro }),
    section(`${sectionHeader({ eyebrow: 'Industries', title: 'Sectors we design for', id: 'all-title' })}${grid(industries.map((i) => imageCard(ctx, `industries/${i.slug}`)), 4)}`, { tone: 'surface', id: 'all', labelledby: 'all-title' }),
    section(`${sectionHeader({ eyebrow: 'Common threads', title: 'Patterns we see across sectors', lead: 'Different industries, recurring opportunities.', id: 'themes-title' })}${grid(h.themes.map(featureCard), 4)}`, { tone: 'gradient', labelledby: 'themes-title' }),
    faq(h.faqs, { id: 'ind-faq' }),
    ctaBanner(ctx, { title: 'Tell us about your industry', text: 'Share the challenges specific to your sector and we will explain how we would approach them.' }),
  ].join('\n');
  return { ctx, path: 'industries/index.html', nav: 'industries', title: h.metaTitle, description: h.metaDescription, image: h.image, body, jsonld: [breadcrumbLd([{ label: 'Industries', path: 'industries/index.html' }])] };
}

export function industryDetailPages() {
  return industries.map((p) => {
    const c = ctxFor(`industries/${p.slug}.html`, 'industries');
    const trail = [{ label: 'Industries', id: 'industries/index' }, { label: p.navTitle, id: `industries/${p.slug}` }];
    const body = [
      pageHero(c, { trail, eyebrow: p.navTitle, title: p.h1, lead: p.lead, image: p.image, secondary: { label: 'All Industries', id: 'industries/index' } }),
      introBlock({ eyebrow: 'Industry overview', heading: p.overviewHeading, paras: p.overview }),
      cardsSection({ eyebrow: 'Operational challenges', title: 'Common challenges we see', items: p.challenges, kind: 'warn', cols: 4, tone: 'surface' }),
      cardsSection({ eyebrow: 'Opportunities', title: 'Digital transformation opportunities', items: p.opportunities, cols: 4 }),
      useCasesSection({ eyebrow: 'AI use cases', title: 'Where AI can help', lead: 'AI features are designed to support people, with review steps wherever decisions carry real consequences.', items: p.aiUseCases, tone: 'gradient', tag: 'AI use case' }),
      cardsSection({ eyebrow: 'Software solutions', title: 'Suggested software solutions', items: p.solutions, kind: 'plain', cols: 4 }),
      section(`<div class="grid gap-10 lg:grid-cols-12">
        <div class="lg:col-span-5"><p class="eyebrow">Integration considerations</p><h2 id="integ-title" class="section-title mt-3">Systems to connect</h2><p class="mt-4 leading-relaxed text-slate-600">${esc(p.integrations.lead)}</p></div>
        <ul class="grid gap-3 sm:grid-cols-2 lg:col-span-7" role="list">${p.integrations.items.map((x) => `<li class="card flex items-center gap-3 p-4 text-sm font-semibold text-navy-950"><span class="text-brand-600">${icon('plug', 'h-5 w-5')}</span>${esc(x)}</li>`).join('')}</ul>
      </div>`, { tone: 'surface', labelledby: 'integ-title' }),
      section(`${sectionHeader({ eyebrow: 'Example workflows', title: 'How it can work in practice', lead: 'Simplified, illustrative workflows showing how digital tools and AI fit together.', id: 'wf-title' })}<div class="grid gap-5 lg:grid-cols-2">${p.workflows.map((w) => workflowList(w.steps, w.title)).join('')}</div>`, { labelledby: 'wf-title' }),
      related(c, p.related),
      faq(p.faqs, { id: 'faq' }),
      ctaBanner(c, { title: p.cta.title, text: p.cta.text }),
    ].join('\n');
    return { ctx: c, path: `industries/${p.slug}.html`, nav: 'industries', title: p.metaTitle, description: p.metaDescription, image: p.image, body, jsonld: [breadcrumbLd([{ label: 'Industries', path: 'industries/index.html' }, { label: p.navTitle, path: `industries/${p.slug}.html` }])] };
  });
}
