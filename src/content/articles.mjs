/**
 * Original sample articles. Blocks: string = paragraph, {h3}, {ul:[]}, {ol:[]}, {example:{title,text}}, {callout}.
 */
export const articles = [
  {
    slug: 'generative-ai-business-applications',
    title: 'Practical Applications of Generative AI in Business',
    metaTitle: 'Practical Applications of Generative AI in Business',
    metaDescription: 'A practical guide to where generative AI adds real value in business: drafting, summarising, extraction and knowledge assistants, plus how to choose, build and measure your first use case.',
    category: 'AI Guide', categorySlug: 'ai',
    date: '2026-10-20', dateLabel: 'Oct 20, 2026',
    image: 'article-generative-ai',
    excerpt: 'Beyond the hype: the everyday business tasks where generative AI genuinely helps, and how to introduce it without creating new risks.',
    intro: [
      'Generative AI has moved from novelty to everyday tool remarkably quickly. Most organisations have experimented with it in some form, often through individual employees using public chat tools. The harder question is how to turn scattered experiments into dependable improvements in the way the business works.',
      'This article looks at the applications where generative AI consistently earns its place, the characteristics of a good first project, and the engineering practices that separate a convincing demo from a feature people can rely on.',
    ],
    sections: [
      { id: 'strengths', heading: 'What generative AI is good at, and what it is not', blocks: [
        'Large language models are exceptionally good at working with language: reading, rewriting, summarising, classifying and drafting. They can follow detailed instructions, adapt tone and format, and pull meaning out of messy, unstructured text.',
        'They are not databases. A model does not “know” your current prices, policies or customer history unless you provide that information at the moment it is needed. Left to its own devices, it will fill gaps with plausible guesses. That single fact explains most generative AI failures in business settings.',
        'A useful mental model is to treat a language model as a fast, capable assistant who has read widely but has never worked at your company. Given the right documents and clear instructions, it produces excellent first drafts. Asked to work from memory, it improvises.',
      ] },
      { id: 'applications', heading: 'Six applications that consistently deliver', blocks: [
        { h3: '1. Drafting routine communications' },
        'Customer replies, follow-up emails, job adverts and internal announcements follow recognisable patterns. A model given the context (the customer’s question, the relevant policy, the preferred tone) can produce a solid draft in seconds. The human role shifts from writing to reviewing and personalising.',
        { h3: '2. Summarising long material' },
        'Contracts, case histories, meeting transcripts and research reports take time to read. Summaries tailored to a specific reader, for example “what does procurement need to know about renewal terms?”, save that time while pointing back to the original text for verification.',
        { h3: '3. Extracting structured data' },
        'Many processes begin with someone reading an email or document and typing details into a system. Generative models can extract named fields into a structured format, which software can then validate against business rules before anything is saved.',
        { h3: '4. Answering questions from internal knowledge' },
        'Retrieval-augmented generation lets an assistant search approved documents and compose an answer with citations. Policy questions, product specifications and internal procedures are natural candidates.',
        { h3: '5. Adapting content for different audiences' },
        'A technical release note can become a customer email, a sales enablement summary and a support article. Models handle this transformation well when key facts are fixed and the output is reviewed.',
        { h3: '6. Assisting analysis and technical work' },
        'Analysts and developers use generative AI to draft queries, explain unfamiliar code, generate test cases and document systems. Productivity gains here depend heavily on the reviewer’s expertise.',
      ] },
      { id: 'first-use-case', heading: 'Choosing your first use case', blocks: [
        'The best first projects are rarely the most ambitious. Look for tasks with these characteristics:',
        { ul: ['High frequency: the task happens many times a week, so small improvements add up', 'Clear inputs and outputs: you can describe what goes in and what a good result looks like', 'Available examples: past cases exist to test against', 'Tolerable errors: a mistake is caught by review before it causes harm', 'An engaged owner: someone who runs the process wants it improved'] },
        'Tasks that fail these tests, such as fully automated decisions with legal consequences, are better tackled later, once your organisation has the evaluation and governance foundations in place.',
      ] },
      { id: 'example', heading: 'Example: from inbox to structured request', blocks: [
        { example: { title: 'Illustrative scenario', text: 'A facilities team receives maintenance requests by email in every imaginable format. A generative AI step reads each email, extracts the location, issue type, urgency and contact details into a structured record, and drafts an acknowledgement to the requester. Records with missing or uncertain fields go to a coordinator’s queue; complete ones are created in the maintenance system automatically. The coordinator’s job changes from data entry to handling the genuinely unclear cases.' } },
        'Notice what makes this work: the output is structured and validated, uncertain cases are routed to a person, and the AI never commits to anything the requester has not said.',
      ] },
      { id: 'reliability', heading: 'Building for reliability', blocks: [
        'Four practices make the difference between a promising prototype and a dependable feature:',
        { ol: ['Ground the model in data. Retrieve the relevant documents, records or templates and include them in the request, rather than relying on what the model remembers.', 'Ask for structure. Request JSON or clearly labelled fields so your software can check the result before using it.', 'Evaluate systematically. Collect a set of real examples with expected outputs and score every change to prompts or models against it.', 'Design the human step. Decide in advance which outputs need review, who reviews them and how their corrections feed back into improvement.'] },
        { callout: 'If you cannot describe how you will know the feature is working, you are not ready to build it yet.' },
      ] },
      { id: 'measuring', heading: 'Measuring value honestly', blocks: [
        'Avoid measuring success by enthusiasm. Agree a small set of indicators before the pilot starts, and compare them with a baseline from the existing process. Useful measures include time spent per item, the share of drafts accepted with minor edits, error rates found in review and the volume handled without escalation.',
        'Also track cost per item. Model usage is billed by volume, and an approach that is affordable for a pilot group may need optimisation, such as caching, smaller models or batching, before broad rollout.',
      ] },
    ],
    recommendations: ['Inventory where employees already use public AI tools and address any data-handling concerns', 'Pick one frequent, well-understood task with an engaged process owner', 'Build an evaluation set from real examples before writing prompts', 'Ground outputs in your own data and request structured results', 'Pilot with a small group, measure against a baseline and iterate', 'Establish lightweight governance: approved tools, data rules and review responsibilities'],
    conclusion: [
      'Generative AI is most valuable when it is treated as a component in a well-designed process rather than a magic box. The organisations getting real value are not necessarily the most adventurous; they are the ones that choose sensible first problems, measure carefully and build trust step by step.',
      'Start small, ground everything in your own information and keep people in the loop where it matters. The results compound quickly.',
    ],
    related: ['ai-workflow-efficiency', 'api-integration-strategies', 'saas-application-architecture'],
  },

  {
    slug: 'saas-application-architecture',
    title: 'Planning a Reliable SaaS Application Architecture',
    metaTitle: 'Planning a Reliable SaaS Application Architecture',
    metaDescription: 'How to plan a SaaS architecture that scales: tenancy models, modular design, background processing, identity and audit, observability, deployments and recovery planning.',
    category: 'Engineering', categorySlug: 'engineering',
    date: '2026-10-14', dateLabel: 'Oct 14, 2026',
    image: 'article-saas-architecture',
    excerpt: 'The early architectural decisions that determine whether a SaaS product scales gracefully, and how to make them without over-engineering.',
    intro: [
      'SaaS products live or die by trust. Customers hand over their data and daily workflows on the assumption that the service will be available, fast and secure. Architecture is where that trust is either designed in or left to chance.',
      'The challenge for most teams is balance. Over-engineer early and you burn runway on scale you may never need. Under-engineer and you accumulate decisions that become very expensive to reverse. This article focuses on the choices that matter most early and those that can safely wait.',
    ],
    sections: [
      { id: 'requirements', heading: 'Let real requirements shape the architecture', blocks: [
        'Before choosing technologies, answer a handful of questions that have outsized architectural impact:',
        { ul: ['Who are your tenants, and how different are their needs? (Small businesses on standard plans, or large organisations with custom configuration?)', 'What data will you hold, and how sensitive is it?', 'Do any customers require data to stay in a particular region?', 'What does an acceptable outage look like for your customers, if any?', 'Which workloads are interactive, and which can happen in the background?'] },
        'The answers will not be perfect, but they prevent the most common mistake: copying an architecture designed for someone else’s problem.',
      ] },
      { id: 'tenancy', heading: 'Choosing a tenancy model', blocks: [
        'Tenancy describes how customers share infrastructure and data stores. There are three common models, each with trade-offs:',
        { h3: 'Shared database, shared schema' },
        'All tenants share tables, separated by a tenant identifier on every row. This is the simplest and most cost-efficient option, and it suits most early-stage products. Its risk is that a single missing filter can expose one tenant’s data to another, so isolation must be enforced centrally, for example through query scopes or row-level security, rather than left to each developer.',
        { h3: 'Schema per tenant' },
        'Each tenant has its own set of tables within a shared database. Isolation is stronger and per-tenant backup or restore is easier, at the cost of more complex migrations as the number of tenants grows.',
        { h3: 'Database per tenant' },
        'Each tenant gets a dedicated database. This offers the strongest isolation and flexibility for large customers or regional hosting, but operational overhead rises significantly.',
        'Many successful products start with a shared schema and enforced isolation, then offer dedicated databases to a small number of enterprise customers later. Designing your data access layer so that tenant resolution happens in one place makes that evolution far easier.',
      ] },
      { id: 'modular', heading: 'Start with a modular monolith', blocks: [
        'Microservices solve organisational scaling problems: many teams deploying independently. Early-stage SaaS products rarely have that problem, but they do pay the operational cost of distributed systems: network failures, distributed tracing, data consistency and deployment complexity.',
        'A modular monolith, meaning one deployable application with clearly separated internal modules, captures most of the design benefits without that cost. Define boundaries around business capabilities such as billing, accounts, scheduling and reporting, and keep modules from reaching directly into each other’s data. If a module later needs to become a separate service, the seam is already there.',
      ] },
      { id: 'background', heading: 'Design background work deliberately', blocks: [
        'Sending emails, generating reports, calling third-party APIs and running AI tasks should not happen while a user waits for a page to load. Move them to background jobs processed from a queue.',
        { ul: ['Make jobs idempotent so retries do not create duplicates', 'Use exponential back-off for retries against external services', 'Send repeatedly failing jobs to a dead-letter queue with alerts', 'Record job outcomes so support teams can see what happened for a given tenant'] },
      ] },
      { id: 'identity', heading: 'Identity, authorisation and audit from day one', blocks: [
        'Business customers will ask for single sign-on, role-based permissions and audit logs sooner than you expect, often as a condition of purchase. Retrofitting these is painful, so design for them early even if you implement them gradually.',
        'Separate authentication (who you are) from authorisation (what you may do), centralise permission checks, and write an audit event whenever important data changes. Include who acted, on which tenant, what changed and when.',
      ] },
      { id: 'observability', heading: 'Observability is a feature', blocks: [
        'You cannot fix what you cannot see. Structured logs that include tenant and request identifiers, metrics for latency and error rates, and tracing across background jobs let you answer the question every support team asks: “What happened for this customer?”',
        'Define a few service-level indicators that reflect customer experience, such as the share of requests completed quickly and successfully, and alert on those rather than on every server metric.',
      ] },
      { id: 'delivery', heading: 'Environments and deployments', blocks: [
        'Automate deployments from the start. A pipeline that builds, tests and deploys every change makes releases routine and reduces dependence on individuals. Use infrastructure as code so environments are reproducible, and feature flags so new functionality can be released to selected tenants before everyone.',
        'Database migrations deserve special care in multi-tenant systems: make them backwards compatible so the old and new versions of the application can run during a deployment.',
      ] },
      { id: 'failure', heading: 'Plan for failure', blocks: [
        'Agree two numbers with the business: how much data you could afford to lose (recovery point objective) and how quickly service must be restored (recovery time objective). These drive backup frequency, replication and runbooks.',
        'Then test them. A backup that has never been restored is a hope, not a plan.',
        { example: { title: 'Illustrative scenario: B2B scheduling platform', text: 'A team building a scheduling product for clinics chooses a shared schema with row-level security, a modular monolith with separate scheduling, billing and notifications modules, and a queue for reminders and calendar sync. Audit logging and role-based permissions are built in the first release because clinic administrators need them. Two years later, a large hospital group requests regional hosting; because tenant resolution is centralised, the team can provision a dedicated database for that customer without rewriting the application.' } },
      ] },
    ],
    recommendations: ['Write down the requirements that drive architecture before choosing technologies', 'Start with a shared schema and centrally enforced tenant isolation unless requirements say otherwise', 'Prefer a modular monolith with clear boundaries over early microservices', 'Move slow and external work to idempotent background jobs', 'Design for SSO, roles and audit logs from the beginning', 'Automate deployments and treat observability as part of the product', 'Agree recovery objectives and test restores regularly'],
    conclusion: [
      'Reliable SaaS architecture is less about exotic technology and more about a series of sensible, deliberate decisions: how tenants are isolated, where boundaries sit, how failures are handled and how you will see what is happening.',
      'Make the decisions that are hard to reverse carefully, keep everything else simple, and leave clear seams for the future.',
    ],
    related: ['secure-maintainable-web-applications', 'api-integration-strategies', 'generative-ai-business-applications'],
  },

  {
    slug: 'ai-workflow-efficiency',
    title: 'Using AI to Improve Business Workflow Efficiency',
    metaTitle: 'Using AI to Improve Business Workflow Efficiency',
    metaDescription: 'Where AI fits in business workflows: mapping processes, intake, extraction, decision support and communication, designing for confidence levels and measuring efficiency honestly.',
    category: 'Automation', categorySlug: 'automation',
    date: '2026-10-07', dateLabel: 'Oct 7, 2026',
    image: 'article-workflow-efficiency',
    excerpt: 'A step-by-step approach to finding where AI removes friction from everyday workflows, and where simple rules work better.',
    intro: [
      'Ask a team where their time goes and the answer is rarely “doing the job”. It is reading emails to work out what someone wants, copying details from one system to another, chasing approvals and answering the same questions repeatedly.',
      'AI is well suited to much of this friction, but adding AI to a broken process mostly produces a faster broken process. This article sets out a practical approach: understand the workflow first, place AI where interpretation is needed and measure results honestly.',
    ],
    sections: [
      { id: 'where-time-goes', heading: 'Where time really goes', blocks: [
        'Workflow inefficiency usually hides in four places:',
        { ul: ['Intake: working out what an incoming request is and where it belongs', 'Transcription: re-typing information from documents or messages into systems', 'Waiting: items sitting in queues because the next person does not know they are needed', 'Rework: fixing errors introduced earlier, often during transcription'] },
        'Only some of these need AI. Waiting is usually solved with better routing and notifications, which are classic workflow features. Intake and transcription, which involve interpreting unstructured content, are where AI shines.',
      ] },
      { id: 'map-first', heading: 'Map before you automate', blocks: [
        'Spend time with the people who run the process. Walk through real cases, including messy ones. For each step, note the input, the decision made, the information needed and the output. Ask which steps exist only because of past system limitations.',
        'This exercise frequently reveals that a process can be simplified before any automation, by removing duplicate approvals, collecting information once or clarifying ownership. Simplify first; automate second.',
      ] },
      { id: 'four-places', heading: 'Four places AI fits naturally', blocks: [
        { h3: 'Classification and routing' },
        'Models can read an email, form or ticket and determine its type, urgency and destination, the job a coordinator does many times a day.',
        { h3: 'Extraction' },
        'Pulling names, dates, amounts, references and line items from documents into structured fields removes transcription effort and its errors.',
        { h3: 'Decision support' },
        'For decisions that need judgement, AI can assemble relevant information, check it against rules and present a recommendation with reasons. A person makes the final call.',
        { h3: 'Communication' },
        'Drafting acknowledgements, status updates and requests for missing information keeps customers and colleagues informed without manual effort.',
      ] },
      { id: 'confidence', heading: 'Design around confidence', blocks: [
        'AI outputs are probabilistic. The key design question is what happens when the system is unsure. Well-designed workflows use confidence thresholds: high-confidence results proceed automatically, medium-confidence results are pre-filled for quick human confirmation, and low-confidence items go to a person from the start.',
        'Thresholds should be set using evidence from testing, and adjusted as the system proves itself. Starting conservatively and relaxing later is far safer than the reverse.',
        { callout: 'The goal is not to remove people from the process, but to ensure their attention goes to the cases that need it.' },
      ] },
      { id: 'example', heading: 'Example: handling product returns', blocks: [
        { example: { title: 'Illustrative scenario', text: 'A retailer receives return requests through email and a web form. AI classifies each request (damaged, wrong item, changed mind), extracts the order number and checks it against the order system. Requests that clearly meet the returns policy receive an automatic approval and shipping label. Borderline cases, such as items outside the return window or high-value products, are queued for a team member with a summary and recommendation. Return reasons are aggregated weekly to highlight products with recurring issues.' } },
        'Here, rules handle the policy logic, AI handles interpretation, and people handle exceptions. Each does what it is best at.',
      ] },
      { id: 'measuring', heading: 'Measure efficiency honestly', blocks: [
        'Record a baseline before changing anything: volumes, average handling time, time from request to completion and error or rework rates. After launch, measure the same indicators, plus the share of items handled automatically and the override rate where people changed the AI’s suggestion.',
        'A high override rate is valuable information. It may reveal a poorly performing model, unclear rules or an edge case nobody anticipated.',
      ] },
      { id: 'people', heading: 'Bring people with you', blocks: [
        'Workflow changes succeed or fail on adoption. Involve the team early, be transparent about goals and show how the change removes tedious work rather than threatening jobs. Provide a simple way to flag AI mistakes, and act on that feedback visibly.',
      ] },
    ],
    recommendations: ['Map the current workflow with the people who run it, including messy real cases', 'Simplify the process before automating it', 'Use rules for predictable logic and AI only for interpretation', 'Set confidence thresholds from test evidence and start conservatively', 'Measure against a baseline and track override rates', 'Invest in communication and feedback loops with the team'],
    conclusion: [
      'AI can remove a remarkable amount of friction from everyday workflows, especially at the points where people currently read, interpret and re-type information. The organisations that benefit most treat AI as one tool among several: combining it with good process design, sensible rules and human judgement.',
    ],
    related: ['generative-ai-business-applications', 'api-integration-strategies', 'secure-maintainable-web-applications'],
  },

  {
    slug: 'api-integration-strategies',
    title: 'API Integration Strategies for Growing Companies',
    metaTitle: 'API Integration Strategies for Growing Companies',
    metaDescription: 'Integration strategies for growing companies: sources of truth, integration patterns, robust error handling, versioning, security, monitoring and reconciliation.',
    category: 'Integration', categorySlug: 'integration',
    date: '2026-09-29', dateLabel: 'Sep 29, 2026',
    image: 'article-api-strategies',
    excerpt: 'How to move from fragile point-to-point scripts to an integration approach that scales with your business.',
    intro: [
      'Growing companies accumulate software quickly: a CRM for sales, an e-commerce platform, an accounting system, a help desk, a marketing tool. Each is chosen for good reasons, and each holds part of the picture.',
      'Integration is what turns that collection into a coherent operation. Done well, data flows reliably and teams trust what they see. Done badly, integrations become a hidden source of errors, manual workarounds and late-night firefighting.',
    ],
    sections: [
      { id: 'symptoms', heading: 'Signs you have outgrown ad-hoc integration', blocks: [
        { ul: ['Staff export and import spreadsheets between systems on a schedule', 'Customer details differ between the CRM, billing and support tools', 'An integration fails and nobody notices for days', 'Only one person understands how a critical sync works', 'Adding a new tool means weeks of custom scripting'] },
        'If several of these sound familiar, it is time for a deliberate integration strategy.',
      ] },
      { id: 'source-of-truth', heading: 'Decide sources of truth first', blocks: [
        'Before writing code, decide which system owns each core entity: customers, products, orders, invoices, employees. Ownership means that system is where the entity is created and authoritatively updated; others receive copies.',
        'Disagreements about ownership are the root cause of many integration problems. Resolving them is a business conversation, not a technical one, and it should involve the people who use each system.',
      ] },
      { id: 'patterns', heading: 'Choosing integration patterns', blocks: [
        { h3: 'Point-to-point' },
        'Direct connections between pairs of systems are quick to build and fine for a few integrations. As the number of systems grows, the number of connections grows faster, and changes ripple unpredictably.',
        { h3: 'Integration layer' },
        'A central integration service or platform mediates between systems, translating data into a common model. Systems connect once to the layer rather than to each other, making changes more contained.',
        { h3: 'Event-driven' },
        'Systems publish events such as “order placed” or “customer updated”, and interested systems subscribe. This decouples producers from consumers and supports near real-time updates, but it requires care with ordering, duplicates and monitoring.',
        { h3: 'Integration platforms (iPaaS)' },
        'Hosted platforms provide pre-built connectors and visual workflows. They accelerate common integrations, though complex logic and high volumes may still call for custom services.',
        'Most growing companies end up with a combination: an integration platform for standard SaaS connections, custom services for core business logic and events where timeliness matters.',
      ] },
      { id: 'robust', heading: 'Designing integrations that survive the real world', blocks: [
        'External systems will be slow, unavailable, rate-limited and occasionally return unexpected data. Robust integrations plan for that:',
        { ul: ['Idempotency: processing the same message twice must not create duplicates', 'Retries with exponential back-off for transient failures', 'Dead-letter queues for messages that keep failing, with alerts', 'Respect for rate limits and pagination in third-party APIs', 'Validation of incoming data before it reaches systems of record', 'Correlation identifiers so a single transaction can be traced end to end'] },
      ] },
      { id: 'contracts', heading: 'Contracts and versioning', blocks: [
        'Treat API definitions as contracts. Document them with a specification format such as OpenAPI, version them explicitly and avoid breaking changes; add fields rather than renaming or removing them. When breaking changes are unavoidable, run old and new versions side by side and give consumers time to migrate.',
      ] },
      { id: 'security', heading: 'Security considerations', blocks: [
        'Every integration is a potential entry point. Use standard authentication such as OAuth 2.0 where supported, scope credentials to the minimum permissions required, store secrets in a secrets manager rather than code, encrypt data in transit and log access. Review which personal data crosses each boundary and whether it needs to.',
      ] },
      { id: 'monitoring', heading: 'Monitoring and reconciliation', blocks: [
        'Monitoring tells you when an integration fails; reconciliation tells you when it silently drifts. Schedule checks that compare key counts and totals between systems, such as orders in the store versus orders in the ERP, and alert on differences.',
        { example: { title: 'Illustrative scenario: commerce, ERP and CRM', text: 'A growing distributor connects its online store, ERP and CRM. The ERP is the source of truth for products, prices and stock; the CRM owns customer contacts; the store owns web orders. Product and stock changes are published as events to the store. Orders flow from the store to the ERP through a queue with retries and a dead-letter queue. A nightly reconciliation compares order counts and totals, alerting the operations team to any gap before customers notice.' } },
      ] },
    ],
    recommendations: ['List your systems and decide the source of truth for each core entity', 'Introduce an integration layer before point-to-point connections multiply', 'Build idempotency, retries and dead-letter handling into every flow', 'Document APIs as versioned contracts and avoid breaking changes', 'Apply least-privilege credentials and keep secrets out of code', 'Combine failure monitoring with regular data reconciliation'],
    conclusion: [
      'Integration rarely gets the attention that customer-facing features do, yet it underpins almost everything a growing company does. A deliberate strategy built on clear ownership, sensible patterns and robust engineering turns integration from a liability into a foundation for growth.',
    ],
    related: ['saas-application-architecture', 'ai-workflow-efficiency', 'secure-maintainable-web-applications'],
  },

  {
    slug: 'secure-maintainable-web-applications',
    title: 'Building Secure and Maintainable Web Applications',
    metaTitle: 'Building Secure and Maintainable Web Applications',
    metaDescription: 'Practical guidance for building secure, maintainable web applications: authentication and authorisation, input handling, dependencies, data protection, code structure, testing and delivery.',
    category: 'Security', categorySlug: 'security',
    date: '2026-09-22', dateLabel: 'Sep 22, 2026',
    image: 'article-secure-web',
    excerpt: 'Security and maintainability go hand in hand. Here are the engineering habits that keep web applications safe and easy to change.',
    intro: [
      'Security and maintainability are often discussed separately, but they are closely linked. Code that is hard to understand is hard to secure, and security fixes are slow and risky in a codebase nobody wants to touch.',
      'This article brings together practical habits that make web applications both safer and easier to evolve. None of them are exotic; their power comes from applying them consistently.',
    ],
    sections: [
      { id: 'foundations', heading: 'Secure foundations', blocks: [
        { h3: 'Authentication' },
        'Use established libraries or identity providers rather than writing your own. Support multi-factor authentication, store passwords with modern hashing algorithms, protect against credential stuffing with rate limiting and handle sessions securely, with appropriate expiry and secure, HTTP-only cookies.',
        { h3: 'Authorisation' },
        'Many serious vulnerabilities are authorisation failures: a user can view or change data that belongs to someone else by altering an identifier. Check permissions on the server for every request, centralise authorisation logic and write tests that confirm users cannot access other users’ resources.',
        { h3: 'Input and output handling' },
        'Validate input on the server, use parameterised queries or a trusted data-access layer to prevent injection, encode output to prevent cross-site scripting, and use framework protections against cross-site request forgery. Set security headers such as a content security policy.',
        { h3: 'Secrets' },
        'Keep credentials and keys out of source code and logs. Store them in a secrets manager or environment configuration, rotate them periodically and grant each service only what it needs.',
      ] },
      { id: 'dependencies', heading: 'Manage dependencies deliberately', blocks: [
        'Modern applications rely on many third-party packages. Each is useful and each is a potential risk. Keep dependencies up to date in small, regular increments rather than rare, painful upgrades. Use automated scanning to flag known vulnerabilities, remove packages you no longer need and be cautious about adding new ones for trivial functionality.',
      ] },
      { id: 'data', heading: 'Protect data throughout its lifecycle', blocks: [
        { ul: ['Collect only the personal data you genuinely need', 'Encrypt data in transit everywhere, and at rest for sensitive information', 'Restrict access to production data and log who accesses it', 'Mask or anonymise data used in development and testing', 'Define retention periods and delete data that is no longer required', 'Back up regularly and test restores'] },
      ] },
      { id: 'structure', heading: 'Structure code for change', blocks: [
        'Maintainable code is organised around business concepts, with clear boundaries between layers: presentation, application logic and data access. Keep functions small and named for what they do. Avoid duplicating business rules across the code base; when a rule changes, it should change in one place.',
        'Consistency matters more than any particular style. Agree conventions, enforce them with automated formatting and linting, and record significant architectural decisions with the reasons behind them.',
      ] },
      { id: 'testing', heading: 'Testing as a safety net', blocks: [
        'Automated tests make change safe. A balanced test suite includes many fast unit tests for business logic, integration tests for data access and external services, and a smaller number of end-to-end tests for critical user journeys. Include security-relevant tests, especially authorisation checks, alongside functional ones.',
        { callout: 'If developers are afraid to change a part of the code base, that is where tests are most urgently needed.' },
      ] },
      { id: 'pipeline', heading: 'A delivery pipeline that enforces good habits', blocks: [
        'Continuous integration turns good intentions into routine. Every change should be reviewed by another developer and automatically checked: formatting, linting, tests, dependency scanning and static security analysis. Deploy through automated pipelines to consistent environments so releases are repeatable and reversible.',
        { example: { title: 'Illustrative scenario: customer portal', text: 'A team maintaining a customer portal adds automated authorisation tests that attempt to access another customer’s invoices for every relevant endpoint. Dependency updates are applied weekly through small pull requests. The pipeline blocks merges when tests fail or a high-severity vulnerability is detected. Over time, releases become smaller and more frequent, and security fixes that once took weeks can be deployed in a day.' } },
      ] },
      { id: 'observability', heading: 'Be ready for incidents', blocks: [
        'Assume something will go wrong eventually. Log security-relevant events such as logins, permission changes and failed access attempts, without logging sensitive data. Monitor error rates and unusual patterns, document how to respond to common incidents and hold blameless reviews afterwards to improve.',
      ] },
    ],
    recommendations: ['Use proven authentication libraries or identity providers and enable multi-factor authentication', 'Centralise authorisation and test that users cannot access others’ data', 'Validate input, encode output and set security headers', 'Keep secrets out of code and dependencies up to date', 'Organise code around business concepts with consistent conventions', 'Automate reviews, tests and security scanning in your pipeline', 'Log security events and practise incident response'],
    conclusion: [
      'Secure, maintainable web applications are the product of everyday habits rather than heroic efforts. By building on sound foundations, keeping the code base clean, testing thoroughly and automating checks, teams can move quickly without accumulating hidden risk.',
    ],
    related: ['saas-application-architecture', 'api-integration-strategies', 'generative-ai-business-applications'],
  },
];
