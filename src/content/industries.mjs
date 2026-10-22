/** Industries landing page + registry. */
import { industriesA } from './industries-a.mjs';
import { industriesB } from './industries-b.mjs';

export const industries = [...industriesA, ...industriesB];

export const industriesHub = {
  navTitle: 'Industries',
  short: 'Industry-aware software and AI for healthcare, fintech, retail, manufacturing, logistics and more.',
  menu: 'Sector-specific software and AI',
  icon: 'building',
  image: 'industries-overview',
  metaTitle: 'Industries We Serve',
  metaDescription: 'White Messenger builds industry-aware software and AI for healthcare, fintech, retail, manufacturing, logistics, education, real estate, travel, media, startups and professional services.',
  eyebrow: 'Industries',
  h1: 'Technology Shaped by Industry Context',
  lead: 'Every sector has its own data, regulations, systems and customer expectations. We bring cross-industry engineering experience and adapt it to the realities of yours.',
  intro: [
    'Good software reflects the world it operates in. A scheduling system for a clinic, a warehouse or a classroom may share technical foundations, but the vocabulary, priorities and risks are very different.',
    'Our industry pages outline the challenges we commonly see, the opportunities technology and AI create, and the integrations that typically matter. Every engagement starts by learning your specific context from the people who know it best.',
  ],
  themes: [
    { icon: 'workflow', t: 'Automation of document-heavy processes', d: 'Applications, claims, invoices and reports appear in almost every sector. Automating their intake and validation is often the fastest return.' },
    { icon: 'plug', t: 'Integration of specialist systems', d: 'Industry platforms rarely talk to each other out of the box. Reliable integration unlocks a single view of operations.' },
    { icon: 'chat', t: 'Self-service for customers and staff', d: 'Portals, apps and AI assistants reduce routine enquiries and improve access outside business hours.' },
    { icon: 'trendingUp', t: 'Forecasting and early warning', d: 'Predictive models help teams plan capacity and act before problems escalate.' },
  ],
  faqs: [
    { q: 'Do you only work with the industries listed?', a: 'No. These are sectors where we see common patterns, but our engineering approach applies broadly. If your industry is not listed, we are still happy to talk.' },
    { q: 'How do you handle industry regulations?', a: 'Your compliance, legal and risk teams define the regulations and standards that apply. We translate those requirements into technical controls, workflows and documentation, and support your assurance processes.' },
    { q: 'Do you have domain experts?', a: 'We combine our engineering and AI expertise with your domain experts, who are essential partners in discovery, design and testing.' },
  ],
};
