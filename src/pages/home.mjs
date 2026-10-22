/** Homepage: recreates the approved homepage design, section by section. */
import {
  btnPrimary, btnSecondary, linkArrow, eyebrow, linkCard, imageCard, resourceCard, ctaBanner, iconTile,
  esc, href, img, icon,
} from '../lib/components.mjs';
import { REG } from '../registry.mjs';
import { articles } from '../content/articles.mjs';
import { organizationLd } from '../lib/layout.mjs';
import { site } from '../site.config.mjs';
import { ctxFor } from '../lib/html.mjs';

// Official technology logos (from the MIT-licensed devicon package, copied locally by the build; see src/build.mjs).
export const TECH = [
  { n: 'Laravel', f: 'laravel' }, { n: 'Node.js', f: 'nodejs' }, { n: 'React', f: 'react' },
  { n: 'Next.js', f: 'nextjs' }, { n: 'Vue.js', f: 'vuejs' }, { n: 'Python', f: 'python' },
  { n: 'AWS', f: 'aws' }, { n: 'Azure', f: 'azure' }, { n: 'Kubernetes', f: 'kubernetes' },
  { n: 'MySQL', f: 'mysql' }, { n: 'PostgreSQL', f: 'postgresql' },
];

/** Section heading in the homepage style: title + inline subtitle + right-aligned link. */
const homeHead = (ctx, id, title, sub, action) => `<div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
  <div class="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:gap-5"><h2 id="${id}" class="text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">${esc(title)}</h2><p class="text-sm text-slate-600">${esc(sub)}</p></div>
  ${action ? `<div class="shrink-0">${linkArrow(ctx, action.label, action.id)}</div>` : ''}
</div>`;

/** Homepage photographs (see src/stock-images.mjs). */
const WWD_IMAGES = { 'ai/index': 'stock-wwd-ai', 'services/software-development': 'stock-wwd-software', 'services/mobile-app-development': 'stock-wwd-mobile', 'services/cloud-devops': 'stock-wwd-cloud' };

export function homePage() {
  const ctx = ctxFor('index.html', 'home');
  const heroStats = [
    ['13', 'Service areas'], ['AI-Driven', 'Innovation'], ['End-to-End', 'Digital solutions'], ['Your Trusted', 'Technology partner'],
  ];
  const aiTiles = [
    ['ai/generative-ai', 'Generative AI Development'], ['ai/ai-agent-development', 'AI Agent Development'], ['ai/ai-chatbot-development', 'AI Chatbot Development'], ['ai/ai-automation', 'Intelligent Automation'],
    ['ai/machine-learning', 'Machine Learning Solutions'], ['solutions/predictive-analytics', 'Predictive Analytics'], ['ai/machine-learning#capabilities', 'Computer Vision', 'eye'], ['solutions/ai-knowledge-management', 'RAG & Knowledge Management'],
  ];
  const homeIndustries = ['healthcare', 'fintech', 'retail-ecommerce', 'manufacturing', 'education', 'logistics', 'real-estate', 'travel-hospitality'].map((s) => `industries/${s}`);

  const body = `
<!-- 1. Hero -->
<section class="hero-surface relative overflow-hidden" aria-labelledby="home-hero-title">
  <div class="container-wm grid items-center gap-10 pb-12 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-6 lg:pb-16 lg:pt-16">
    <div class="relative z-10 lg:col-span-6 xl:col-span-6">
      ${eyebrow('AI-Powered Digital Solutions')}
      <h1 id="home-hero-title" class="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-navy-950 sm:text-6xl xl:text-[4.1rem]">Build Smarter.<br>Scale Faster.<br><span class="bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 bg-clip-text text-transparent">Lead with AI.</span></h1>
      <p class="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">White Messenger helps organisations transform complex business challenges into practical digital products through AI engineering, custom software and intelligent automation.</p>
      <div class="mt-8 flex flex-wrap gap-3">${btnPrimary(ctx, 'Discuss Your Project', 'contact-us/index')}${btnSecondary(ctx, 'Explore Our Services', 'services/index')}</div>
      <dl class="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-slate-200/80 pt-8 sm:grid-cols-4">
        ${heroStats.map(([a, b]) => `<div><dt class="sr-only">${esc(b)}</dt><dd><span class="block text-lg font-extrabold text-navy-950">${esc(a)}</span><span class="mt-1 block text-xs font-medium text-slate-500">${esc(b)}</span></dd></div>`).join('')}
      </dl>
    </div>
    <div class="relative lg:col-span-6">
      <div class="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-brand-100/80 via-white/0 to-cyan-100/70 blur-2xl" aria-hidden="true"></div>
      ${img(ctx, 'stock-hero', { eager: true, cls: 'relative aspect-[6/5] w-full rounded-[2rem] border border-white object-cover shadow-card-lg', sizes: '(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw' })}
    </div>
  </div>
</section>

<!-- 2. Technology strip -->
<section class="border-y border-slate-200/70 bg-white" aria-labelledby="tech-title">
  <div class="container-wm flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:gap-10">
    <h2 id="tech-title" class="shrink-0 text-base font-bold text-navy-950">Technologies We Work With</h2>
    <ul class="grid flex-1 grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-11" role="list">
      ${TECH.map((t) => `<li class="flex flex-col items-center gap-2 text-center"><span class="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 shadow-sm"><img src="${ctx.root}assets/images/tech/${t.f}.svg" width="32" height="32" alt="" class="h-8 w-8 object-contain" loading="lazy" decoding="async"></span><span class="text-xs font-medium text-slate-600">${t.n}</span></li>`).join('')}
    </ul>
  </div>
</section>

<!-- 3. What we do -->
<section class="section" aria-labelledby="what-title">
  <div class="container-wm grid items-center gap-10 lg:grid-cols-12">
    <div class="lg:col-span-4">
      ${eyebrow('What We Do')}
      <h2 id="what-title" class="section-title mt-4">Comprehensive Digital Solutions for Modern Businesses</h2>
      <p class="mt-4 leading-relaxed text-slate-600">From AI engineering to custom software development, we deliver innovative and scalable solutions that help businesses grow, automate and stay ahead in the digital world.</p>
      <div class="mt-8">${btnPrimary(ctx, 'Explore All Services', 'services/index')}</div>
    </div>
    <div class="grid gap-5 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-4">
      ${[['ai/index', 'AI Engineering', 'Generative AI, AI agents, chatbots, RAG and more.'], ['services/software-development', 'Custom Software Development', 'Scalable and secure software built around your processes.'], ['services/mobile-app-development', 'Mobile App Development', 'Native and cross-platform mobile applications.'], ['services/cloud-devops', 'Cloud & DevOps', 'Modern, scalable and reliable infrastructure.']].map(([id, t, d]) => `<a href="${href(ctx, id)}" class="card card-hover group flex flex-col overflow-hidden">
        ${img(ctx, WWD_IMAGES[id], { cls: 'aspect-[7/5] w-full object-cover', sizes: '(min-width: 1280px) 220px, (min-width: 640px) 45vw, 100vw', alt: '' })}
        <div class="flex flex-1 flex-col p-5"><h3 class="font-bold text-navy-950">${esc(t)}</h3><p class="mt-2 flex-1 text-sm text-slate-600">${esc(d)}</p><span class="mt-4 flex items-center text-sm font-semibold text-brand-700">Learn More<span class="sr-only"> about ${esc(t)}</span><span class="arrow-dot">${icon('arrowRight', 'h-3.5 w-3.5')}</span></span></div>
      </a>`).join('')}
    </div>
  </div>
</section>

<!-- 4. AI capabilities -->
<section class="section bg-soft-gradient" aria-labelledby="ai-cap-title">
  <div class="container-wm grid items-center gap-10 lg:grid-cols-12">
    <div class="lg:col-span-4">
      ${eyebrow('AI Capabilities')}
      <h2 id="ai-cap-title" class="section-title mt-4">Turn Ideas Into Intelligent Possibilities</h2>
      <p class="mt-4 leading-relaxed text-slate-600">We build AI-powered solutions that automate processes, improve decision-making and unlock new opportunities for your business.</p>
      <div class="mt-8">${btnPrimary(ctx, 'Explore AI Solutions', 'ai/index')}</div>
    </div>
    <ul class="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:col-span-5" role="list">
      ${aiTiles.map(([id, t, ic]) => `<li><a href="${href(ctx, id)}" class="card card-hover flex h-full flex-col items-center gap-3 p-4 text-center">${iconTile(ic || REG.get(id.split('#')[0]).icon)}<span class="text-[13px] font-semibold leading-snug text-navy-950">${esc(t)}</span></a></li>`).join('')}
    </ul>
    <div class="lg:col-span-3">${img(ctx, 'stock-ai-chip', { cls: 'mx-auto aspect-[4/5] w-full max-w-sm rounded-3xl border border-white object-cover shadow-card', sizes: '(min-width: 1024px) 300px, 100vw' })}</div>
  </div>
</section>

<!-- 5. Industries -->
<section class="section pb-0 sm:pb-0 lg:pb-0" aria-labelledby="ind-title">
  <div class="container-wm">
    ${homeHead(ctx, 'ind-title', 'Industries We Serve', 'Driving innovation across diverse industries with tailored digital solutions.', { label: 'View All Industries', id: 'industries/index' })}
    <ul class="grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-8" role="list">
      ${homeIndustries.map((id) => { const e = REG.get(id); return `<li><a href="${href(ctx, id)}" class="card card-hover group flex h-full flex-col overflow-hidden">${img(ctx, `stock-ind-${id.split('/')[1].replace(/-(ecommerce|hospitality)$/, '')}`, { cls: 'aspect-[7/5] w-full object-cover', sizes: '(min-width: 1280px) 150px, (min-width: 640px) 24vw, 48vw', alt: '' })}<span class="flex flex-1 items-start justify-between gap-2 p-3"><span class="text-[13px] font-semibold leading-snug text-navy-950">${esc(e.title)}</span><span class="mt-0.5 text-brand-600">${icon('arrowRight', 'h-3.5 w-3.5')}</span></span></a></li>`; }).join('')}
    </ul>
  </div>
</section>

<!-- 6. Services -->
<section class="section pb-0 sm:pb-0 lg:pb-0" aria-labelledby="svc-title">
  <div class="container-wm">
    ${homeHead(ctx, 'svc-title', 'Our Services', 'End-to-end technology services to accelerate your business growth.', { label: 'View All Services', id: 'services/index' })}
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      ${[['ai/index', 'Build intelligent solutions with AI, ML and automation.'], ['services/web-development', 'Modern, high-performance web applications.'], ['services/mobile-app-development', 'Native and cross-platform mobile solutions.'], ['services/saas-development', 'From idea to scalable SaaS platforms.'], ['services/ecommerce-development', 'Feature-rich online stores for your business.'], ['services/cloud-devops', 'Secure, scalable and high-performance cloud infrastructure.']].map(([id, t]) => linkCard(ctx, id, { text: t, compact: true })).join('')}
    </div>
  </div>
</section>

<!-- 7. Engagement models -->
<section class="section pb-0 sm:pb-0 lg:pb-0" aria-labelledby="eng-title">
  <div class="container-wm">
    ${homeHead(ctx, 'eng-title', 'Our Engagement Models', 'Flexible engagement models to match your business goals and project requirements.', { label: 'View Details', id: 'engagement-models/index' })}
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      ${[['engagement-models/dedicated-team', 'Your extended development team.'], ['engagement-models/team-augmentation', 'Scale your team quickly.'], ['engagement-models/fixed-price', 'Clear scope and timeline.'], ['engagement-models/time-and-materials', 'Flexible and agile approach.'], ['engagement-models/managed-services', 'End-to-end project delivery.'], ['engagement-models/technical-consulting', 'Strategic technology guidance.']].map(([id, t]) => linkCard(ctx, id, { text: t, compact: true })).join('')}
    </div>
  </div>
</section>

<!-- 8. Development process -->
<section class="section pb-0 sm:pb-0 lg:pb-0" aria-labelledby="proc-title">
  <div class="container-wm">
    ${homeHead(ctx, 'proc-title', 'Our Development Process', 'A proven process to turn your ideas into successful digital products.')}
    <ol class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
      ${[['Discover', 'Understand your goals'], ['Design', 'Plan the right solution'], ['Develop', 'Build with best practices'], ['Deploy', 'Launch and scale']].map(([t, d], i) => `<li class="card relative flex items-center gap-4 p-5"><span class="step-num">${i + 1}</span><span><span class="block font-bold text-navy-950">${t}</span><span class="block text-sm text-slate-600">${d}</span></span>${i < 3 ? `<span class="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-brand-400 lg:block" aria-hidden="true">${icon('arrowRight', 'h-5 w-5')}</span>` : ''}</li>`).join('')}
    </ol>
  </div>
</section>

<!-- 9. Featured solutions -->
<section class="section pb-0 sm:pb-0 lg:pb-0" aria-labelledby="sol-title">
  <div class="container-wm">
    ${homeHead(ctx, 'sol-title', 'Featured Solutions', 'Practical solutions to real business challenges.', { label: 'View All Solutions', id: 'solutions/index' })}
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      ${[['solutions/customer-support-ai', 'Automate customer interactions.'], ['solutions/business-automation', 'Streamline operations and reduce costs.'], ['solutions/predictive-analytics', 'Data-driven insights for better decisions.'], ['solutions/document-processing', 'Extract and analyse data automatically.']].map(([id, t]) => linkCard(ctx, id, { text: t, compact: true })).join('')}
    </div>
  </div>
</section>

<!-- 10. Resources -->
<section class="section" aria-labelledby="res-title">
  <div class="container-wm">
    ${homeHead(ctx, 'res-title', 'Latest Insights & Resources', 'Discover the latest trends, guides and practical thinking in AI and digital transformation.', { label: 'View All Resources', id: 'resources/index' })}
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${articles.slice(0, 4).map((a, i) => resourceCard(ctx, { ...a, id: `resources/articles/${a.slug}`, image: `stock-res-${i + 1}` }, { aspect: 'aspect-[5/2]' })).join('')}</div>
  </div>
</section>

${ctaBanner(ctx, { image: 'stock-cta' })}
`;
  return {
    ctx, path: 'index.html', nav: 'home',
    title: 'White Messenger | AI Engineering & Software Development Company',
    description: 'White Messenger helps organisations build smarter and scale faster with AI engineering, custom software, web and mobile apps, cloud and intelligent automation.',
    image: 'home-hero', body, jsonld: [organizationLd(), { '@context': 'https://schema.org', '@type': 'WebSite', name: 'White Messenger', url: `${site.url}/` }],
  };
}
