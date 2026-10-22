/** Contact page, legal pages, HTML sitemap and 404. */
import { ctxFor } from '../lib/html.mjs';
import { site } from '../site.config.mjs';
import { section, breadcrumbs, faq, checklist, eyebrow, esc, href, icon, img } from '../lib/components.mjs';
import { formField, formShell } from './forms.mjs';
import { breadcrumbLd } from '../lib/layout.mjs';
import { REG, NAV } from '../registry.mjs';
import { articles } from '../content/articles.mjs';

const SERVICES = ['AI Engineering', 'Generative AI', 'AI Agents or Chatbots', 'Intelligent Automation', 'Machine Learning / Predictive Analytics', 'Custom Software Development', 'Web Application Development', 'Mobile App Development', 'SaaS Product Development', 'E-commerce Development', 'Cloud Solutions & DevOps', 'API Development & Integration', 'Data Engineering & Analytics', 'UI/UX Design', 'Software Testing & QA', 'Application Modernization', 'Managed IT Services', 'Technical Consulting', 'Not sure yet'];
// CONFIG PLACEHOLDER: adjust budget bands and currency to suit White Messenger's typical engagements.
const BUDGETS = ['Not sure yet', 'Under US$10,000', 'US$10,000 – 25,000', 'US$25,000 – 50,000', 'US$50,000 – 100,000', 'Over US$100,000'];
const TIMELINES = ['As soon as possible', 'Within 1–3 months', 'In 3–6 months', 'More than 6 months away', 'Just exploring'];

export function contactPage() {
  const ctx = ctxFor('contact-us/index.html', 'contact-us');
  const fields = [
    formField({ id: 'iq-name', name: 'full_name', label: 'Full name', required: true, autocomplete: 'name' }),
    formField({ id: 'iq-email', name: 'business_email', label: 'Business email', type: 'email', required: true, autocomplete: 'email', placeholder: 'name@company.com' }),
    formField({ id: 'iq-company', name: 'company', label: 'Company', required: true, autocomplete: 'organization' }),
    formField({ id: 'iq-phone', name: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel', hint: 'Include your country code, e.g. +91.' }),
    formField({ id: 'iq-country', name: 'country', label: 'Country', required: true, autocomplete: 'country-name' }),
    formField({ id: 'iq-service', name: 'service', label: 'Service of interest', type: 'select', required: true, options: SERVICES }),
    formField({ id: 'iq-budget', name: 'budget', label: 'Estimated budget', type: 'select', options: BUDGETS }),
    formField({ id: 'iq-timeline', name: 'timeline', label: 'Expected timeline', type: 'select', options: TIMELINES }),
    formField({ id: 'iq-details', name: 'project_details', label: 'Project details', type: 'textarea', required: true, minlength: 30, full: true, placeholder: 'What are you trying to achieve? What systems are involved? Any deadlines or constraints?', hint: 'At least 30 characters. Please do not include passwords or other sensitive data.' }),
  ];
  const form = formShell({ id: 'inquiry-form', name: 'inquiry', endpointKey: 'inquiryEndpoint', fields, submitLabel: 'Send Inquiry', consentText: 'I agree that White Messenger may use the information I provide to respond to my inquiry.', ctx });

  const faqs = [
    { q: 'What happens after I submit an inquiry?', a: 'A member of our team reviews your message and replies by email to arrange an initial conversation. In that call we discuss your goals, constraints and possible approaches. There is no obligation.' },
    { q: 'Do you sign NDAs?', a: 'Yes. If you would like to share confidential details, let us know and we can put a mutual non-disclosure agreement in place before detailed discussions.' },
    { q: 'Can you work with clients outside India?', a: 'Yes. We collaborate remotely with clients in different time zones and agree communication schedules that suit both teams.' },
    { q: 'I do not have a detailed specification. Is that a problem?', a: 'Not at all. Many projects begin with an idea or a problem statement. We can help you shape requirements through a discovery phase.' },
    { q: 'How soon can a project start?', a: 'It depends on the scope and the skills required. We confirm a realistic start date in our proposal after the initial discussion.' },
  ];

  const body = [
    `<section class="hero-surface border-b border-slate-200/70"><div class="container-wm grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12">
      <div class="lg:col-span-7">${breadcrumbs(ctx, [{ label: 'Contact Us', id: 'contact-us/index' }])}${eyebrow('Contact Us')}
        <h1 class="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-5xl">Let’s Talk About Your Project</h1>
        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">Tell us what you are working on, whether it is a new product, an AI initiative or a system that needs attention. We will respond with thoughtful questions and practical next steps.</p>
        <ul class="mt-8 grid gap-4 sm:grid-cols-3" role="list">
          <li class="card flex flex-col gap-2 p-5"><span class="text-brand-600">${icon('mail', 'h-5 w-5')}</span><span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</span><a class="break-all font-semibold text-navy-950 hover:text-brand-700" href="mailto:${site.contact.email}">${site.contact.email}</a></li>
          <li class="card flex flex-col gap-2 p-5"><span class="text-brand-600">${icon('phone', 'h-5 w-5')}</span><span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</span><a class="font-semibold text-navy-950 hover:text-brand-700" href="tel:${site.contact.phoneHref}">${site.contact.phoneDisplay}</a></li>
          <li class="card flex flex-col gap-2 p-5"><span class="text-brand-600">${icon('mapPin', 'h-5 w-5')}</span><span class="text-xs font-semibold uppercase tracking-wider text-slate-500">Office</span><address class="text-sm not-italic text-navy-950">${site.contact.addressLines.map(esc).join('<br>')}</address></li>
        </ul>
      </div>
      <div class="hidden lg:col-span-5 lg:block">${img(ctx, 'contact-hero', { eager: true, cls: 'aspect-[4/3] w-full rounded-3xl border border-white object-cover shadow-card-lg', sizes: '480px' })}</div>
    </div></section>`,
    section(`<div class="grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <h2 id="form-title" class="section-title">Project inquiry</h2>
        <p class="mt-4 leading-relaxed text-slate-600">Share a few details and we will get back to you. The more context you provide, the more useful our first conversation will be.</p>
        <div class="mt-8 card p-6"><h3 class="font-bold text-navy-950">What to expect</h3>${checklist(['A reply from a person, not an automated sequence', 'An initial conversation to understand your goals', 'Honest advice, including when we are not the right fit', 'A proposal with clear assumptions if there is a match'], 'mt-4 text-sm')}</div>
        <div class="mt-5 rounded-2xl border border-slate-200 bg-surface p-5 text-sm leading-relaxed text-slate-600"><p class="flex items-center gap-2 font-semibold text-navy-950">${icon('lock', 'h-4 w-4 text-brand-600')}Your information</p><p class="mt-2">We use your details only to respond to your inquiry. See our <a class="font-semibold text-brand-700 hover:underline" href="${href(ctx, 'privacy-policy')}">Privacy Policy</a>.</p></div>
      </div>
      <div class="lg:col-span-8">${form}</div>
    </div>`, { tone: 'white', labelledby: 'form-title', id: 'inquiry' }),
    faq(faqs, { id: 'contact-faq', title: 'Before you get in touch' }),
    `<section class="py-16 sm:py-20" aria-labelledby="explore-title"><div class="container-wm"><div class="cta-surface rounded-3xl border border-brand-100 p-8 sm:p-12"><div class="grid items-center gap-8 lg:grid-cols-2"><div><h2 id="explore-title" class="text-3xl font-extrabold text-navy-950">Not ready to talk yet?</h2><p class="mt-3 text-slate-600">Explore our services, browse practical guides or read how we approach delivery.</p></div><div class="flex flex-wrap gap-3 lg:justify-end"><a class="btn-primary" href="${href(ctx, 'services/index')}">Explore Services ${icon('arrowRight', 'h-4 w-4')}</a><a class="btn-secondary" href="${href(ctx, 'resources/ai-guides')}">Read AI Guides ${icon('arrowRight', 'h-4 w-4')}</a></div></div></div></div></section>`,
  ].join('\n');
  return { ctx, path: 'contact-us/index.html', nav: 'contact-us', title: 'Contact Us: Start a Project Conversation', description: 'Contact White Messenger about AI engineering, software development, cloud or automation projects. Send a project inquiry, email info@whitemessenger.com or call our Jaipur office.', image: 'contact-hero', body, jsonld: [breadcrumbLd([{ label: 'Contact Us', path: 'contact-us/index.html' }])] };
}

function legalShell(ctx, { title, label, id, updated, intro, sections }) {
  return `<section class="hero-surface border-b border-slate-200/70"><div class="container-wm py-12 sm:py-14">${breadcrumbs(ctx, [{ label, id }])}<h1 class="text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">${esc(title)}</h1><p class="mt-4 text-sm text-slate-500">Last updated: ${esc(updated)}</p></div></section>
  <div class="section"><div class="container-wm">
    <div class="mb-10 flex max-w-3xl gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900" role="note">${icon('info', 'mt-0.5 h-5 w-5 shrink-0')}<p data-boilerplate><strong>Draft for review.</strong> This document is a starting template prepared for White Messenger and must be reviewed and approved by qualified legal counsel before the website goes live.</p></div>
    <article class="article-prose max-w-3xl">${intro.map((p) => `<p>${esc(p)}</p>`).join('')}${sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((p) => (Array.isArray(p) ? `<ul>${p.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>` : `<p>${esc(p)}</p>`)).join('')}`).join('')}
      <h2>Contact</h2><p data-boilerplate>Questions about this document can be sent to <a href="mailto:${site.contact.email}">${site.contact.email}</a> or by post to White Messenger, ${site.contact.addressLines.map(esc).join(', ')}.</p>
    </article>
  </div></div>`;
}

export function privacyPage() {
  const ctx = ctxFor('privacy-policy.html', '');
  const body = legalShell(ctx, {
    title: 'Privacy Policy', label: 'Privacy Policy', id: 'privacy-policy', updated: 'October 2026 (draft)',
    intro: ['This Privacy Policy explains how White Messenger (“we”, “us”) collects, uses and protects personal information when you visit this website or contact us.'],
    sections: [
      { h: 'Information we collect', p: ['We collect information you choose to provide, for example when you submit a project inquiry or career inquiry form, or email us. This may include:', ['Your name, email address, phone number, company and country', 'Details about your project, budget range and timeline', 'For career inquiries, your area of interest, experience and profile links'], 'Our website may also collect limited technical information, such as browser type and pages visited, through server logs. [CONFIG PLACEHOLDER: describe any analytics or cookie tools once selected.]'] },
      { h: 'How we use information', p: [['To respond to your inquiry and discuss potential projects', 'To consider you for current or future roles, if you sent a career inquiry', 'To operate, secure and improve this website', 'To comply with legal obligations']] },
      { h: 'Legal basis and consent', p: ['Where required, we process information on the basis of your consent, our legitimate interest in responding to business inquiries, or to take steps at your request before entering into a contract. You may withdraw consent at any time by contacting us.'] },
      { h: 'Sharing information', p: ['We do not sell personal information. We may share it with service providers who help us operate our website and communications (for example, hosting or email providers), under appropriate confidentiality and data-protection terms, or where required by law.'] },
      { h: 'Data retention', p: ['We keep inquiry information only as long as needed for the purposes described above. [CONFIG PLACEHOLDER: insert specific retention periods.]'] },
      { h: 'Security', p: ['We apply reasonable technical and organisational measures to protect personal information. No method of transmission or storage is completely secure, but we work to protect your information appropriately.'] },
      { h: 'Your rights', p: ['Depending on applicable law, you may have the right to access, correct or delete your personal information, or to object to certain processing. To exercise these rights, contact us using the details below.'] },
      { h: 'Browser storage', p: ['This website does not store the contents of contact or career forms in your browser’s local storage.'] },
      { h: 'Changes to this policy', p: ['We may update this policy from time to time. The “Last updated” date at the top of this page shows when it was last revised.'] },
    ],
  });
  return { ctx, path: 'privacy-policy.html', nav: '', title: 'Privacy Policy', description: 'How White Messenger collects, uses and protects personal information submitted through this website, including inquiry and career forms.', body, jsonld: [breadcrumbLd([{ label: 'Privacy Policy', path: 'privacy-policy.html' }])] };
}

export function termsPage() {
  const ctx = ctxFor('terms-of-service.html', '');
  const body = legalShell(ctx, {
    title: 'Terms of Service', label: 'Terms of Service', id: 'terms-of-service', updated: 'October 2026 (draft)',
    intro: ['These Terms of Service govern your use of the White Messenger website. By using this website you agree to these terms. They do not govern client engagements, which are covered by separate written agreements.'],
    sections: [
      { h: 'Use of this website', p: ['You may use this website for lawful purposes only. You must not attempt to gain unauthorised access to the website, interfere with its operation or use it to transmit harmful content.'] },
      { h: 'Content and intellectual property', p: ['Unless otherwise stated, the content on this website, including text, graphics, logos and design, is owned by or licensed to White Messenger. You may view and share pages for personal or internal business reference, with attribution, but may not reproduce them for commercial purposes without permission.'] },
      { h: 'Information only', p: ['Articles, guides and illustrative scenarios on this website are provided for general information. They are not professional advice for your specific situation, and illustrative scenarios do not describe actual client engagements.'] },
      { h: 'No warranty', p: ['We aim to keep information accurate and up to date but make no warranties about its completeness or suitability for any purpose. The website is provided “as is”.'] },
      { h: 'Limitation of liability', p: ['To the extent permitted by law, White Messenger is not liable for any loss arising from your use of, or reliance on, this website. [CONFIG PLACEHOLDER: legal counsel to confirm wording for applicable jurisdiction.]'] },
      { h: 'External links', p: ['This website may link to external sites. We are not responsible for their content or privacy practices.'] },
      { h: 'Governing law', p: ['These terms are governed by the laws of India. [CONFIG PLACEHOLDER: legal counsel to confirm jurisdiction and venue.]'] },
      { h: 'Changes', p: ['We may update these terms from time to time. Continued use of the website after changes means you accept the revised terms.'] },
    ],
  });
  return { ctx, path: 'terms-of-service.html', nav: '', title: 'Terms of Service', description: 'Terms governing use of the White Messenger website, including content use, intellectual property, disclaimers and limitations.', body, jsonld: [breadcrumbLd([{ label: 'Terms of Service', path: 'terms-of-service.html' }])] };
}

export function sitemapPage() {
  const ctx = ctxFor('sitemap.html', '');
  const groups = [
    ['Main', ['index', 'contact-us/index', 'privacy-policy', 'terms-of-service']],
    ['AI', NAV.ai], ['Services', NAV.services], ['Engagement Models', NAV.engagement], ['Industries', NAV.industries], ['Solutions', NAV.solutions],
    ['About Us', NAV.about], ['Resources', [...NAV.resources, ...articles.map((a) => `resources/articles/${a.slug}`)]],
  ];
  const body = `<section class="hero-surface border-b border-slate-200/70"><div class="container-wm py-12 sm:py-14">${breadcrumbs(ctx, [{ label: 'Sitemap', id: 'sitemap' }])}<h1 class="text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">Sitemap</h1><p class="mt-4 text-lg text-slate-600">Every page on the White Messenger website, grouped by section.</p></div></section>
  <div class="section"><div class="container-wm grid gap-8 sm:grid-cols-2 lg:grid-cols-4">${groups.map(([label, ids]) => `<section aria-labelledby="sm-${label.replace(/\W+/g, '-')}" class="card p-6"><h2 id="sm-${label.replace(/\W+/g, '-')}" class="text-lg font-bold text-navy-950">${esc(label)}</h2><ul class="mt-4 space-y-2 text-sm" role="list">${ids.map((id) => `<li><a class="footer-link" href="${href(ctx, id)}">${esc(REG.get(id).menuTitle || REG.get(id).title)}</a></li>`).join('')}</ul></section>`).join('')}</div></div>`;
  return { ctx, path: 'sitemap.html', nav: '', title: 'Sitemap', description: 'A complete list of pages on the White Messenger website: AI, services, engagement models, industries, solutions, about us and resources.', body, jsonld: [breadcrumbLd([{ label: 'Sitemap', path: 'sitemap.html' }])] };
}

export function notFoundPage() {
  // Served for unknown URLs at any depth, so links are root-absolute.
  const ctx = { path: '404.html', nav: '', root: '/' };
  const body = `<section class="hero-surface"><div class="container-wm flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
    <p class="text-sm font-bold uppercase tracking-wider text-brand-700">Error 404</p>
    <h1 class="mt-3 text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">We couldn’t find that page</h1>
    <p class="mt-4 max-w-xl text-lg text-slate-600">The page may have moved, or the address may be mistyped. Try one of these instead:</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3"><a class="btn-primary" href="/index.html">Go to Home ${icon('arrowRight', 'h-4 w-4')}</a><a class="btn-secondary" href="/services/index.html">Explore Services</a><a class="btn-secondary" href="/sitemap.html">View Sitemap</a></div>
  </div></section>`;
  return { ctx, path: '404.html', nav: '', title: 'Page Not Found', description: 'The page you were looking for could not be found on the White Messenger website.', body, noindex: true, jsonld: [] };
}
