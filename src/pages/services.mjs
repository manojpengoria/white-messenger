/** Services section templates. */
import { ctxFor } from '../lib/html.mjs';
import { pageHero, section, sectionHeader, grid, linkCard, processSteps, techBlock, faq, ctaBanner, related, checklist, featureCard, esc, icon } from '../lib/components.mjs';
import { introBlock, cardsSection, approachSection } from './common.mjs';
import { servicesHub, services } from '../content/services.mjs';
import { NAV } from '../registry.mjs';
import { breadcrumbLd } from '../lib/layout.mjs';

export function servicesHubPage() {
  const ctx = ctxFor('services/index.html', 'services');
  const h = servicesHub;
  const groups = NAV.serviceGroups.map((g, gi) => section(
    `${sectionHeader({ eyebrow: `0${gi + 1}`, title: g.label, id: `grp-${gi}` })}${grid(g.ids.map((id) => linkCard(ctx, id, { text: id === 'ai/index' ? h.groupsIntro['@ai'] : undefined })), 4)}`,
    { tone: gi % 2 ? 'surface' : 'white', labelledby: `grp-${gi}`, cls: gi ? '' : '' },
  ));
  const body = [
    pageHero(ctx, { trail: [{ label: 'Services', id: 'services/index' }], eyebrow: h.eyebrow, title: h.h1, lead: h.lead, image: h.image, secondary: { label: 'Compare Engagement Models', id: 'engagement-models/index' }, highlights: ['13 service areas', 'Discovery to support', 'AI-ready engineering'] }),
    introBlock({ eyebrow: 'Overview', heading: h.intro.heading, paras: h.intro.paragraphs, tone: 'white' }),
    ...groups,
    section(`${sectionHeader({ eyebrow: 'How we work', title: 'Principles behind every service', align: 'center', id: 'princ-title' })}${grid(h.principles.map(featureCard), 4)}`, { tone: 'gradient', labelledby: 'princ-title' }),
    faq(h.faqs, { id: 'svc-faq' }),
    ctaBanner(ctx, { title: 'Not sure which service you need?', text: 'Describe your challenge and we will recommend the right combination of services and engagement model.' }),
  ].join('\n');
  return { ctx, path: 'services/index.html', nav: 'services', title: h.metaTitle, description: h.metaDescription, image: h.image, body, jsonld: [breadcrumbLd([{ label: 'Services', path: 'services/index.html' }])] };
}

export function serviceDetailPages() {
  return services.map((p) => {
    const c = ctxFor(`services/${p.slug}.html`, 'services');
    const trail = [{ label: 'Services', id: 'services/index' }, { label: p.navTitle, id: `services/${p.slug}` }];
    const body = [
      pageHero(c, { trail, eyebrow: 'Service', title: p.h1, lead: p.lead, image: p.image, secondary: { label: 'All Services', id: 'services/index' } }),
      introBlock({ eyebrow: 'What this service covers', heading: p.overviewHeading, paras: p.overview, list: p.covers, listTitle: 'Typical scope includes' }),
      cardsSection({ eyebrow: 'Business problems', title: 'Challenges we help you solve', items: p.problems, kind: 'warn', cols: 4, tone: 'surface' }),
      cardsSection({ eyebrow: 'Capabilities', title: 'What’s included', items: p.capabilities, cols: 3, anchor: 'capabilities' }),
      approachSection({ eyebrow: 'How the engagement works', title: 'Working together', lead: p.engagement.lead, points: p.engagement.points }),
      section(`${sectionHeader({ eyebrow: 'Technology choices', title: 'Relevant technologies', id: 'tech-title' })}${techBlock(p.tech)}`, { labelledby: 'tech-title' }),
      section(`${sectionHeader({ eyebrow: 'Delivery stages', title: 'How projects progress', id: 'stages-title' })}${processSteps(p.stages)}`, { tone: 'gradient', labelledby: 'stages-title' }),
      section(`${sectionHeader({ eyebrow: 'Expected benefits', title: 'Operational benefits to expect', lead: 'Benefits vary by organisation and starting point; these are the improvements this service is designed to support.', id: 'ben-title' })}
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${p.benefits.map((b) => `<div class="card h-full border-t-4 border-t-brand-500 p-6"><span class="text-brand-600">${icon('checkCircle', 'h-6 w-6')}</span><h3 class="mt-4 font-bold text-navy-950">${esc(b.t)}</h3><p class="mt-2 text-sm leading-relaxed text-slate-600">${esc(b.d)}</p></div>`).join('')}</div>`, { labelledby: 'ben-title' }),
      related(c, p.related),
      faq(p.faqs, { id: 'faq' }),
      ctaBanner(c, { title: p.cta.title, text: p.cta.text }),
    ].join('\n');
    return { ctx: c, path: `services/${p.slug}.html`, nav: 'services', title: p.metaTitle, description: p.metaDescription, image: p.image, body, jsonld: [breadcrumbLd([{ label: 'Services', path: 'services/index.html' }, { label: p.navTitle, path: `services/${p.slug}.html` }])] };
  });
}

