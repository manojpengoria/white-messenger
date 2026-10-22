/** About Us templates (overview, approach, careers). */
import { ctxFor } from '../lib/html.mjs';
import { site } from '../site.config.mjs';
import { pageHero, section, sectionHeader, grid, featureCard, processSteps, faq, ctaBanner, checklist, paragraphs, linkCard, esc, icon } from '../lib/components.mjs';
import { introBlock, tabs, sectionWith } from './common.mjs';
import { aboutPage, approachPage, careersPage } from '../content/about.mjs';
import { breadcrumbLd } from '../lib/layout.mjs';
import { formField, formShell } from './forms.mjs';

export function aboutHubPage() {
  const ctx = ctxFor('about-us/index.html', 'about-us');
  const p = aboutPage;
  const body = [
    pageHero(ctx, { trail: [{ label: 'About Us', id: 'about-us/index' }], eyebrow: p.eyebrow, title: p.h1, lead: p.lead, image: p.image, secondary: { label: 'Our Approach', id: 'about-us/our-approach' } }),
    introBlock({ eyebrow: 'Company overview', heading: 'Who we are', paras: p.overview }),
    section(`<div class="grid gap-5 md:grid-cols-2">
      <div class="card relative overflow-hidden p-8 sm:p-10"><span class="icon-tile">${icon('target', 'h-6 w-6')}</span><h2 class="mt-5 text-2xl font-extrabold text-navy-950">Our mission</h2><p class="mt-3 text-lg leading-relaxed text-slate-600">${esc(p.mission)}</p></div>
      <div class="card relative overflow-hidden p-8 sm:p-10"><span class="icon-tile">${icon('compass', 'h-6 w-6')}</span><h2 class="mt-5 text-2xl font-extrabold text-navy-950">Our vision</h2><p class="mt-3 text-lg leading-relaxed text-slate-600">${esc(p.vision)}</p></div>
    </div>`, { tone: 'gradient' }),
    sectionWith(grid(p.values.map(featureCard), 3), { eyebrow: 'Values', title: 'What we stand for' }),
    section(`<div class="grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-6"><p class="eyebrow">Engineering philosophy</p><h2 id="phil-title" class="section-title mt-3">${esc(p.philosophy.heading)}</h2><div class="mt-5 space-y-4">${paragraphs(p.philosophy.paragraphs)}</div></div>
      <div class="lg:col-span-6"><div class="card p-6 sm:p-8">${checklist(p.philosophy.points)}</div>
        <div class="mt-5 rounded-2xl border border-brand-100 bg-brand-50/60 p-6 sm:p-8"><h3 class="flex items-center gap-2 text-lg font-bold text-navy-950">${icon('brain', 'h-5 w-5 text-brand-600')}${esc(p.aiApproach.heading)}</h3><div class="mt-3 space-y-3">${paragraphs(p.aiApproach.paragraphs, 'text-sm leading-relaxed text-slate-600')}</div></div>
      </div>
    </div>`, { tone: 'surface', labelledby: 'phil-title' }),
    sectionWith(processSteps(p.methodology), { eyebrow: 'Delivery methodology', title: 'How we deliver software' }),
    section(`<div class="grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-7"><p class="eyebrow">Collaboration</p><h2 id="col-title" class="section-title mt-3">How we work with clients</h2><div class="mt-8 grid gap-5 sm:grid-cols-2">${p.collaboration.map(featureCard).join('')}</div></div>
      <div class="lg:col-span-5"><div class="card p-6 sm:p-8"><h2 class="text-xl font-bold text-navy-950">Quality practices</h2><p class="mt-2 text-sm text-slate-600">Built into every project by default.</p>${checklist(p.quality, 'mt-5')}</div></div>
    </div>`, { tone: 'gradient', labelledby: 'col-title' }),
    section(`${sectionHeader({ eyebrow: 'Learn more', title: 'Get to know us further', id: 'more-title' })}${grid(['about-us/our-approach', 'about-us/careers', 'resources/index'].map((id) => linkCard(ctx, id)), 3)}`, { labelledby: 'more-title' }),
    ctaBanner(ctx, { title: 'Let’s talk about what you are building', text: 'Whether you have a clear brief or an early idea, we would be glad to hear about it.' }),
  ].join('\n');
  return { ctx, path: 'about-us/index.html', nav: 'about-us', title: p.metaTitle, description: p.metaDescription, image: p.image, body, jsonld: [breadcrumbLd([{ label: 'About Us', path: 'about-us/index.html' }])] };
}

export function approachPageRender() {
  const ctx = ctxFor('about-us/our-approach.html', 'about-us');
  const p = approachPage;
  const body = [
    pageHero(ctx, { trail: [{ label: 'About Us', id: 'about-us/index' }, { label: 'Our Approach', id: 'about-us/our-approach' }], eyebrow: p.eyebrow, title: p.h1, lead: p.lead, image: p.image, secondary: { label: 'About White Messenger', id: 'about-us/index' } }),
    introBlock({ eyebrow: 'Why it matters', heading: 'Reducing risk by design', paras: p.intro }),
    sectionWith(tabs('phase', 'Delivery phases', p.phases.map((ph) => ({ label: ph.label, html: `<div class="grid gap-8 lg:grid-cols-12"><div class="lg:col-span-4"><h3 class="text-2xl font-extrabold text-navy-950">${esc(ph.label)}</h3><p class="mt-2 text-lg text-slate-600">${esc(ph.intro)}</p></div><div class="card p-6 sm:p-8 lg:col-span-8">${checklist(ph.items)}</div></div>` }))), { eyebrow: 'Delivery phases', title: 'What happens at each stage', tone: 'surface' }),
    sectionWith(grid(p.principles.map(featureCard), 3), { eyebrow: 'Principles', title: 'Six principles we work by' }),
    section(`<div class="grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-5"><p class="eyebrow">Responsible AI</p><h2 id="rai-title" class="section-title mt-3">How we build AI responsibly</h2><p class="mt-4 leading-relaxed text-slate-600">AI introduces new kinds of risk. These practices are part of every AI engagement.</p></div>
      <ol class="space-y-4 lg:col-span-7" role="list">${p.responsibleAi.map((r, i) => `<li class="card flex gap-4 p-5"><span class="step-num !h-9 !w-9 !text-base">${i + 1}</span><div><h3 class="font-bold text-navy-950">${esc(r.t)}</h3><p class="mt-1 text-sm leading-relaxed text-slate-600">${esc(r.d)}</p></div></li>`).join('')}</ol>
    </div>`, { tone: 'gradient', labelledby: 'rai-title' }),
    faq(p.faqs, { id: 'appr-faq' }),
    ctaBanner(ctx, { title: 'See our approach in action', text: 'Start with a conversation about your goals and we will show how we would structure the work.' }),
  ].join('\n');
  return { ctx, path: 'about-us/our-approach.html', nav: 'about-us', title: p.metaTitle, description: p.metaDescription, image: p.image, body, jsonld: [breadcrumbLd([{ label: 'About Us', path: 'about-us/index.html' }, { label: 'Our Approach', path: 'about-us/our-approach.html' }])] };
}

export function careersPageRender() {
  const ctx = ctxFor('about-us/careers.html', 'about-us');
  const p = careersPage;
  const fields = [
    formField({ id: 'cr-name', name: 'full_name', label: 'Full name', required: true, autocomplete: 'name' }),
    formField({ id: 'cr-email', name: 'email', label: 'Email address', type: 'email', required: true, autocomplete: 'email' }),
    formField({ id: 'cr-phone', name: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel', hint: 'Optional. Include your country code.' }),
    formField({ id: 'cr-area', name: 'area', label: 'Area of interest', type: 'select', required: true, options: p.areas }),
    formField({ id: 'cr-exp', name: 'experience', label: 'Years of professional experience', type: 'select', required: true, options: ['Student / graduate', 'Less than 2 years', '2–5 years', '5–10 years', 'More than 10 years'] }),
    formField({ id: 'cr-link', name: 'profile_url', label: 'Profile or portfolio link', type: 'url', required: true, placeholder: 'https://', hint: 'LinkedIn, GitHub, Behance or personal site. CV uploads will be enabled when the secure backend is connected.' }),
    formField({ id: 'cr-msg', name: 'message', label: 'Tell us about yourself', type: 'textarea', required: true, minlength: 30, full: true, hint: 'What kind of work do you enjoy, and what would you like to do next? (at least 30 characters)' }),
  ];
  const form = formShell({ id: 'careers-form', name: 'careers', endpointKey: 'careersEndpoint', fields, submitLabel: 'Send Career Inquiry', consentText: 'I agree that White Messenger may store and use my details to consider me for current and future opportunities, as described in the Privacy Policy.', ctx });
  const body = [
    pageHero(ctx, { trail: [{ label: 'About Us', id: 'about-us/index' }, { label: 'Careers', id: 'about-us/careers' }], eyebrow: p.eyebrow, title: p.h1, lead: p.lead, image: p.image, primary: { label: 'Send a Career Inquiry', id: 'about-us/careers#career-inquiry' }, secondary: { label: 'How We Work', id: 'about-us/our-approach' } }),
    sectionWith(grid(p.culture.map(featureCard), 4), { eyebrow: 'Working here', title: 'What you can expect', tone: 'surface' }),
    section(`<div class="grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-4"><p class="eyebrow">Career inquiry</p><h2 id="career-title" class="section-title mt-3">Open roles and inquiries</h2>${paragraphs(p.intro, 'mt-4 leading-relaxed text-slate-600')}
        <div class="mt-6 rounded-2xl border border-slate-200 bg-surface p-5 text-sm text-slate-600"><p class="font-semibold text-navy-950">Prefer email?</p><p class="mt-1">Write to <a class="font-semibold text-brand-700 hover:underline" href="mailto:${site.contact.email}?subject=Career%20inquiry">${site.contact.email}</a> with “Career inquiry” in the subject line.</p></div></div>
      <div class="lg:col-span-8">${form}</div>
    </div>`, { id: 'career-inquiry', labelledby: 'career-title' }),
  ].join('\n');
  return { ctx, path: 'about-us/careers.html', nav: 'about-us', title: p.metaTitle, description: p.metaDescription, image: p.image, body, jsonld: [breadcrumbLd([{ label: 'About Us', path: 'about-us/index.html' }, { label: 'Careers', path: 'about-us/careers.html' }])] };
}
