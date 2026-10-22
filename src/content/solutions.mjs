/** Solutions landing page + registry. */
import { solutionsA } from './solutions-a.mjs';
import { solutionsB } from './solutions-b.mjs';

export const solutions = [...solutionsA, ...solutionsB];

export const solutionsHub = {
  navTitle: 'Solutions',
  short: 'Practical, adaptable solutions for automation, analytics, AI support and knowledge access.',
  menu: 'Proven patterns for common business challenges',
  icon: 'puzzle',
  image: 'solutions-overview',
  metaTitle: 'Business Solutions: Automation, AI & Analytics',
  metaDescription: 'Practical business solutions from White Messenger: process automation, AI customer support, predictive analytics, document processing, knowledge management, search and dashboards.',
  eyebrow: 'Solutions',
  h1: 'Practical Solutions to Everyday Business Challenges',
  lead: 'Our solutions are proven patterns for problems most organisations share, adapted to your systems, data and ways of working rather than sold as rigid packages.',
  intro: [
    'Services describe what we do; solutions describe what you get. Each solution below addresses a recognisable business problem, such as documents that need re-keying, questions that keep repeating or decisions made without foresight, and combines the engineering, integration and AI components needed to solve it.',
    'Because every organisation’s systems and constraints are different, we tailor each solution during a short discovery phase, then deliver it incrementally so value arrives early.',
  ],
  groups: [
    { label: 'Automate work', ids: ['solutions/business-automation', 'solutions/document-processing', 'solutions/workflow-orchestration', 'solutions/sales-automation'] },
    { label: 'Assist people with AI', ids: ['solutions/customer-support-ai', 'solutions/ai-knowledge-management', 'solutions/enterprise-search'] },
    { label: 'See ahead with data', ids: ['solutions/predictive-analytics', 'solutions/inventory-intelligence', 'solutions/business-dashboards'] },
  ],
  delivery: [
    { t: 'Discover', d: 'Understand the problem, current process and data sources.' },
    { t: 'Tailor', d: 'Adapt the solution pattern to your systems and rules.' },
    { t: 'Pilot', d: 'Deliver a first slice to a limited group and measure.' },
    { t: 'Roll out', d: 'Expand scope and users based on evidence.' },
  ],
  faqs: [
    { q: 'Are these off-the-shelf products?', a: 'No. They are solution patterns that we tailor and implement for your environment, often using components and services you already own.' },
    { q: 'Can solutions be combined?', a: 'Yes. For example, document processing often feeds business automation, and knowledge management can power customer support assistants.' },
    { q: 'How do you measure success?', a: 'We agree measurable indicators with you during discovery, such as processing time, manual touches or answer accuracy, and track them during the pilot.' },
  ],
};
