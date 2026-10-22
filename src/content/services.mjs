/** Services landing page and service registry. */
import { buildServices } from './services-build.mjs';
import { platformServices } from './services-platform.mjs';

const order = ['software-development', 'web-development', 'mobile-app-development', 'saas-development', 'ecommerce-development', 'cloud-devops', 'api-integration', 'data-engineering', 'ui-ux-design', 'qa-testing', 'application-modernization', 'managed-it-services'];
const all = [...buildServices, ...platformServices];
export const services = order.map((slug) => all.find((s) => s.slug === slug));

/** Mega-menu grouping. "@ai" points at the AI hub (AI Engineering service). */
export const SERVICE_GROUPS = [
  { label: 'AI & Product Engineering', slugs: ['@ai', 'software-development', 'web-development', 'mobile-app-development', 'saas-development'] },
  { label: 'Commerce, Cloud & Data', slugs: ['ecommerce-development', 'cloud-devops', 'api-integration', 'data-engineering'] },
  { label: 'Design, Quality & Operations', slugs: ['ui-ux-design', 'qa-testing', 'application-modernization', 'managed-it-services'] },
];

export const servicesHub = {
  navTitle: 'Services',
  short: 'End-to-end technology services, from AI engineering and product development to cloud and support.',
  menu: 'Everything we design, build and run',
  icon: 'layers',
  image: 'services-overview',
  metaTitle: 'Software Development & AI Engineering Services',
  metaDescription: 'Explore White Messenger services: AI engineering, custom software, web and mobile apps, SaaS, e-commerce, cloud and DevOps, APIs, data, UI/UX, QA, modernisation and managed IT.',
  eyebrow: 'Our Services',
  h1: 'Technology Services Across the Whole Product Lifecycle',
  lead: 'Whether you need a single specialist capability or a team that takes a product from idea to operation, our services fit together so nothing falls between the cracks.',
  intro: {
    heading: 'One partner, joined-up delivery',
    paragraphs: [
      'Digital initiatives often stall at the hand-offs: between design and development, between development and operations, or between a new system and the ones it must work with. Our services are designed to connect, so the people who design an experience understand how it will be built and those who build it understand how it will be run.',
      'You can engage us for one service, combine several, or work with a cross-functional team that covers everything from discovery to long-term support.',
    ],
  },
  groupsIntro: {
    '@ai': 'Generative AI, AI agents, chatbots, automation and machine learning built into real workflows.',
  },
  principles: [
    { icon: 'target', t: 'Outcome-led scope', d: 'We define success in business terms before choosing features or technology.' },
    { icon: 'eye', t: 'Transparent progress', d: 'Shared backlogs, regular demos and honest status reporting.' },
    { icon: 'shield', t: 'Security by design', d: 'Secure practices are part of every stage, not a final checklist.' },
    { icon: 'bookOpen', t: 'Maintainable handover', d: 'Clean code, tests and documentation your team can build on.' },
  ],
  faqs: [
    { q: 'Can we engage you for just one service?', a: 'Yes. Many clients start with a single service, such as a UX review, a cloud assessment or a specific integration, and expand only if it makes sense.' },
    { q: 'How do you price services?', a: 'Pricing depends on scope, team composition and engagement model. After understanding your needs we propose a fixed-price, time-and-materials or dedicated-team arrangement, with assumptions stated clearly.' },
    { q: 'Do you work with in-house teams?', a: 'Frequently. We can lead delivery, collaborate as peers or provide specialists who join your existing team and follow your processes.' },
    { q: 'Which technologies do you use?', a: 'Our core stack includes Laravel, Node.js, Python, React, Next.js, Vue.js, MySQL and PostgreSQL, deployed on AWS or Azure, including Kubernetes where appropriate. We recommend technologies based on your context rather than habit.' },
  ],
};
