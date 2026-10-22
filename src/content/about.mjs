/** About section. No founding year, headcount, clients, awards or certifications are stated. */

export const aboutPage = {
  navTitle: 'About Us',
  short: 'Who we are, what we believe and how we work with clients.',
  icon: 'building',
  image: 'about-team',
  metaTitle: 'About White Messenger',
  metaDescription: 'Learn about White Messenger: an AI and software engineering partner based in Jaipur, India, focused on practical technology, honest collaboration and lasting quality.',
  eyebrow: 'About Us',
  h1: 'Intelligent Technology. Meaningful Progress.',
  lead: 'White Messenger is an AI and software engineering partner. We help organisations turn complex challenges into practical digital products that people rely on every day.',
  overview: [
    'We are a team of engineers, designers and AI specialists who believe technology should earn its place by making work simpler, decisions better and experiences more human. Our work spans AI engineering, custom software, web and mobile applications, cloud and data, always with a focus on what happens after launch.',
    'Based in Jaipur, India, we work with organisations of different sizes and sectors. What they share is a desire for a partner who listens carefully, explains clearly and delivers dependable results.',
  ],
  mission: 'To help organisations apply AI and modern software engineering in ways that create real, measurable progress for their teams and customers.',
  vision: 'A future where intelligent technology is accessible to every ambitious organisation, not just the largest, and where it is built responsibly, transparently and to last.',
  values: [
    { icon: 'eye', t: 'Clarity', d: 'We explain options and trade-offs in plain language, and share progress and problems openly.' },
    { icon: 'target', t: 'Purpose over novelty', d: 'We recommend technology because it solves the problem, not because it is fashionable.' },
    { icon: 'shield', t: 'Responsibility', d: 'We treat data, privacy and the impact of AI with care, and design for human oversight.' },
    { icon: 'checkCircle', t: 'Craftsmanship', d: 'We take pride in clean code, thoughtful design and thorough testing.' },
    { icon: 'users', t: 'Partnership', d: 'We succeed when our clients succeed, and we act like members of their team.' },
    { icon: 'refresh', t: 'Continuous learning', d: 'We keep learning, from each project and from a fast-moving industry.' },
  ],
  philosophy: {
    heading: 'Our engineering philosophy',
    paragraphs: [
      'Software is a long-term asset. The code we write today will be read, changed and extended for years, often by people who were not in the room when it was created. We therefore favour simple, well-structured designs, consistent conventions and automated tests over clever shortcuts.',
      'We choose established technologies unless there is a clear reason not to, document the decisions that matter and automate the repetitive parts of delivery so people can focus on judgement.',
    ],
    points: ['Simple designs that are easy to change', 'Automated testing and continuous integration as defaults', 'Security and accessibility considered from the first sprint', 'Documentation of architecture decisions and their reasons'],
  },
  aiApproach: {
    heading: 'Our approach to AI',
    paragraphs: [
      'We are enthusiastic about AI and realistic about it. Language models and machine learning can transform how work gets done, but only when they are applied to well-defined problems, grounded in reliable data and wrapped in the right safeguards.',
      'Every AI system we build starts with a clear task and success measure, includes evaluation from the outset and keeps people in control of consequential decisions.',
    ],
  },
  methodology: [
    { t: 'Discover', d: 'Understand goals, users, constraints and risks.' },
    { t: 'Design', d: 'Shape the solution through prototypes and architecture.' },
    { t: 'Develop', d: 'Build iteratively with continuous testing and demos.' },
    { t: 'Deploy', d: 'Release safely with monitoring and support.' },
    { t: 'Improve', d: 'Measure, learn and refine after launch.' },
  ],
  collaboration: [
    { icon: 'calendar', t: 'Regular rhythm', d: 'Planning, demos and retrospectives on a predictable cadence.' },
    { icon: 'eye', t: 'Shared visibility', d: 'Access to backlogs, boards and environments.' },
    { icon: 'chat', t: 'Direct communication', d: 'Talk to the people doing the work, not just account managers.' },
    { icon: 'fileText', t: 'Documented decisions', d: 'Key choices recorded so nothing relies on memory.' },
  ],
  quality: [
    'Peer code review for every change',
    'Automated unit, integration and end-to-end tests',
    'Static analysis and dependency vulnerability scanning',
    'Accessibility and performance checks in the delivery pipeline',
    'Staging environments that mirror production',
    'Post-release monitoring and incident reviews',
  ],
};

export const approachPage = {
  navTitle: 'Our Approach',
  short: 'How we discover, design, build and improve software and AI systems.',
  icon: 'compass',
  image: 'our-approach',
  metaTitle: 'Our Approach to Software & AI Delivery',
  metaDescription: 'How White Messenger delivers software and AI: discovery, design, iterative development, quality engineering, responsible AI practices and continuous improvement.',
  eyebrow: 'Our Approach',
  h1: 'How We Turn Ideas Into Dependable Products',
  lead: 'A clear, collaborative delivery approach that reduces risk early, shows progress often and keeps quality high from the first sprint to long after launch.',
  intro: [
    'Projects rarely fail because of a single technical problem. They fail because assumptions went untested, expectations drifted or quality was postponed. Our approach is designed to surface those risks early and keep everyone aligned.',
    'It is not a rigid methodology. We adapt ceremonies and documentation to your organisation’s size and culture, but the underlying principles stay the same.',
  ],
  phases: [
    { label: 'Discovery', intro: 'Understand before building.', items: ['Stakeholder interviews and workshops to clarify goals and constraints', 'User research and analysis of existing processes and systems', 'Technical assessment of integrations, data and risks', 'A prioritised scope, delivery plan and success measures'] },
    { label: 'Design', intro: 'Make decisions visible and testable.', items: ['User journeys and interactive prototypes validated with users', 'Solution architecture and key technology decisions recorded', 'Security, privacy and accessibility requirements defined', 'Backlog of user stories with acceptance criteria'] },
    { label: 'Delivery', intro: 'Ship working software frequently.', items: ['Short iterations with planning, demos and retrospectives', 'Continuous integration with automated tests on every change', 'Preview environments for stakeholder feedback', 'Transparent progress, risk and budget reporting'] },
    { label: 'Launch & Care', intro: 'Release safely and keep improving.', items: ['Release plans with rollback options and data migration checks', 'Monitoring, alerting and runbooks from day one', 'Training and documentation for users and administrators', 'Ongoing support and improvement based on real usage'] },
  ],
  principles: [
    { icon: 'target', t: 'Start with outcomes', d: 'We define what success looks like in business terms before deciding what to build.' },
    { icon: 'rocket', t: 'Reduce risk early', d: 'The riskiest assumptions are tested first, often with prototypes or proofs of concept.' },
    { icon: 'refresh', t: 'Iterate visibly', d: 'Working software every iteration keeps feedback flowing and surprises small.' },
    { icon: 'checkCircle', t: 'Build quality in', d: 'Testing, review and automation are part of the work, not a phase at the end.' },
    { icon: 'shield', t: 'Respect data and people', d: 'Privacy, security, accessibility and responsible AI shape decisions throughout.' },
    { icon: 'bookOpen', t: 'Leave things better documented', d: 'Your team should be able to understand and extend everything we deliver.' },
  ],
  responsibleAi: [
    { t: 'Define the task and its limits', d: 'Every AI feature has a documented purpose, scope and list of things it must not do.' },
    { t: 'Evaluate before and after launch', d: 'Quality is measured against representative test cases, not impressions.' },
    { t: 'Keep humans in the loop', d: 'Consequential decisions are reviewed by people with the AI’s reasoning visible.' },
    { t: 'Protect data', d: 'Minimise sensitive data, control access and choose providers that meet your requirements.' },
    { t: 'Monitor continuously', d: 'Log behaviour, watch for drift and act on user feedback.' },
  ],
  faqs: [
    { q: 'Do you follow Agile or Scrum?', a: 'We use agile principles: short iterations, frequent delivery and continuous feedback. We adapt specific practices, such as Scrum or Kanban, to your team and project.' },
    { q: 'How involved do we need to be?', a: 'Regular involvement, especially from a product owner who can make decisions, makes a significant difference. We agree a cadence that fits your availability.' },
    { q: 'How do you report progress?', a: 'Through demos of working software, shared boards and regular status summaries covering progress, risks, decisions needed and budget.' },
  ],
};

export const careersPage = {
  navTitle: 'Careers',
  short: 'Interested in working with us? Share your profile and areas of interest.',
  icon: 'briefcase',
  image: 'careers',
  metaTitle: 'Careers at White Messenger',
  metaDescription: 'Interested in a career at White Messenger? Learn how we work and send a career inquiry for engineering, design, QA, data and AI roles.',
  eyebrow: 'Careers',
  h1: 'Build Meaningful Technology With Us',
  lead: 'We are always interested in hearing from thoughtful engineers, designers and AI practitioners who care about craft, clarity and the people who use what they build.',
  intro: [
    'We do not list specific openings on this page at the moment. If you would like to be considered for future opportunities, send us a career inquiry with your areas of interest and a link to your profile or portfolio. We will keep your details on file in line with our privacy policy and contact you if a suitable role becomes available.',
  ],
  culture: [
    { icon: 'bookOpen', t: 'Learning culture', d: 'Time and encouragement to learn new technologies, share knowledge and grow your skills.' },
    { icon: 'users', t: 'Collaborative teams', d: 'Cross-functional teams where designers, engineers and QA work closely together.' },
    { icon: 'checkCircle', t: 'Quality mindset', d: 'Code review, testing and thoughtful design are part of everyday work.' },
    { icon: 'sparkles', t: 'Meaningful AI work', d: 'Opportunities to work on practical AI applications with real users.' },
  ],
  areas: ['Software Engineering (Back end)', 'Software Engineering (Front end)', 'Full-stack Development', 'Mobile Development', 'AI / Machine Learning Engineering', 'Data Engineering', 'DevOps & Cloud', 'Quality Assurance', 'UI/UX Design', 'Project & Delivery Management', 'Other'],
};
