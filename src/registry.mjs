/**
 * Page registry: maps page ids ("services/web-development") to card/nav metadata,
 * and defines navigation groupings. Built from the content modules so there is one source of truth.
 */
import { aiHub, aiPages } from './content/ai.mjs';
import { servicesHub, services, SERVICE_GROUPS } from './content/services.mjs';
import { engagementHub, engagementModels } from './content/engagement.mjs';
import { industriesHub, industries } from './content/industries.mjs';
import { solutionsHub, solutions } from './content/solutions.mjs';
import { aboutPage, approachPage, careersPage } from './content/about.mjs';
import { resourcesHub, blogPage, aiGuidesPage, caseStudiesPage, articles } from './content/resources.mjs';

export const REG = new Map();
const add = (id, e) => {
  if (REG.has(id)) throw new Error(`Duplicate page id ${id}`);
  REG.set(id, { id, ...e });
};
const card = (p) => ({ title: p.navTitle, short: p.short, icon: p.icon, image: p.image, menu: p.menu, menuTitle: p.menuTitle });

add('index', { title: 'Home', short: 'White Messenger home page.', icon: 'home', image: 'home-hero' });

add('ai/index', { ...card(aiHub), menuTitle: 'AI Overview' });
aiPages.forEach((p) => add(`ai/${p.slug}`, card(p)));

add('services/index', { ...card(servicesHub), menuTitle: 'All Services' });
services.forEach((p) => add(`services/${p.slug}`, card(p)));

add('engagement-models/index', { ...card(engagementHub), menuTitle: 'Compare Models' });
engagementModels.forEach((p) => add(`engagement-models/${p.slug}`, card(p)));

add('industries/index', { ...card(industriesHub), menuTitle: 'All Industries' });
industries.forEach((p) => add(`industries/${p.slug}`, card(p)));

add('solutions/index', { ...card(solutionsHub), menuTitle: 'All Solutions' });
solutions.forEach((p) => add(`solutions/${p.slug}`, card(p)));

add('about-us/index', { ...card(aboutPage), menuTitle: 'About White Messenger' });
add('about-us/our-approach', card(approachPage));
add('about-us/careers', card(careersPage));

add('resources/index', { ...card(resourcesHub), menuTitle: 'Resources Hub' });
add('resources/blog', card(blogPage));
add('resources/ai-guides', card(aiGuidesPage));
add('resources/case-studies', card(caseStudiesPage));
articles.forEach((a) => add(`resources/articles/${a.slug}`, { title: a.title, short: a.excerpt, icon: 'fileText', image: a.image }));

add('contact-us/index', { title: 'Contact Us', short: 'Start a conversation about your project.', icon: 'mail', image: 'contact-hero' });
add('privacy-policy', { title: 'Privacy Policy', short: 'How we handle personal information.', icon: 'lock' });
add('terms-of-service', { title: 'Terms of Service', short: 'Terms for using this website.', icon: 'fileText' });
add('sitemap', { title: 'Sitemap', short: 'Every page on this website.', icon: 'listChecks' });

export const NAV = {
  ai: ['ai/index', ...aiPages.map((p) => `ai/${p.slug}`)],
  serviceGroups: SERVICE_GROUPS.map((g) => ({ label: g.label, ids: g.slugs.map((s) => (s === '@ai' ? 'ai/index' : `services/${s}`)) })),
  services: ['services/index', ...services.map((p) => `services/${p.slug}`)],
  engagement: ['engagement-models/index', ...engagementModels.map((p) => `engagement-models/${p.slug}`)],
  industries: ['industries/index', ...industries.map((p) => `industries/${p.slug}`)],
  solutions: ['solutions/index', ...solutions.map((p) => `solutions/${p.slug}`)],
  about: ['about-us/index', 'about-us/our-approach', 'about-us/careers'],
  resources: ['resources/index', 'resources/blog', 'resources/ai-guides', 'resources/case-studies'],
};

