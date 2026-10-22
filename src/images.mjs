import { STOCK_IMAGES } from './stock-images.mjs';

/**
 * Image registry: single source of truth for every content image.
 *
 * status "placeholder" = an original brand-styled illustration rendered locally by
 * scripts/generate-images.mjs. To swap in a final AI-generated asset, export it as WebP at the
 * listed widths using the same filenames, set status to "final", and run `npm run build`.
 */
const STYLE =
  'Light theme. White and pale-blue environment, electric blue (#2563EB) with cyan (#22D3EE) and teal (#2A7D9C) accents. ' +
  'Premium photoreal 3D render, soft diffuse studio lighting, soft shadows, shallow depth of field, clean composition with generous negative space. ' +
  'No text, no logos, no watermarks, no recognisable real people or brands.';

const W = 1200, H = 900; // default 4:3 master
const def = (key, o) => [key, { key, w: W, h: H, widths: [640, 1200], layout: 'card', palette: 'blue', status: 'placeholder', ...o, prompt: `${o.prompt} ${STYLE}` }];

export const IMAGES = Object.fromEntries([
  // Home
  def('home-hero', { dir: 'hero', name: 'home-hero-ai-core', w: 1280, h: 1040, widths: [640, 1280], layout: 'hero', icon: 'brain',
    alt: 'Illustration of a glowing AI core surrounded by floating analytics panels in a bright blue workspace',
    prompt: 'Hero image, 1280x1040. A serene humanoid AI figure in white ceramic and translucent blue glass, seen in three-quarter profile facing left, with fine glowing circuitry. Behind it a soft-focus futuristic city skyline and floating holographic dashboards (charts, document cards, code panels). Left third kept bright and uncluttered for overlaid headline text.' }),
  def('home-ai-cube', { dir: 'ai', name: 'ai-capabilities-chip', w: 1200, h: 1000, layout: 'card', icon: 'cpu', palette: 'blue',
    alt: 'Illustration of a translucent blue AI processor chip resting on a grid of glass cubes',
    prompt: 'A large translucent blue glass cube embossed with an abstract processor chip motif, sitting on a field of smaller frosted-glass cubes that recede into a pale-blue haze. Subtle cyan rim light.' }),
  def('cta-collaboration', { dir: 'hero', name: 'cta-collaboration', w: 1600, h: 700, widths: [800, 1600], layout: 'wide', icon: 'users', palette: 'blue',
    alt: 'Illustration of a collaborative digital workspace with connected project panels',
    prompt: 'Wide banner, 1600x700. A professional at a clean white desk reviewing an AI analytics dashboard on a large monitor, holographic blue interface elements floating nearby. Right half contains the subject; left half bright and empty for text.' }),

  // AI
  def('ai-overview', { dir: 'ai', name: 'ai-overview', icon: 'brain', layout: 'hero', alt: 'Illustration of an AI neural network hub connecting data, documents and workflow panels',
    prompt: 'A luminous neural-network sphere hovering above a white platform, threads of light connecting it to floating panels showing documents, charts and workflow nodes.' }),
  def('generative-ai', { dir: 'ai', name: 'generative-ai', icon: 'sparkles', alt: 'Illustration of generative AI producing text, image and code panels from a central spark',
    prompt: 'A glowing generative core emitting layered translucent cards — paragraphs of abstract text lines, an image thumbnail and a code snippet — arranged in an arc on a pale-blue stage.' }),
  def('ai-agents', { dir: 'ai', name: 'ai-agent-development', icon: 'bot', palette: 'indigo', alt: 'Illustration of an AI agent coordinating connected task cards and tools',
    prompt: 'A friendly minimalist robot assistant made of white matte material with blue light accents, orchestrating floating task cards connected by glowing lines to tool icons (calendar, database, email).' }),
  def('ai-chatbots', { dir: 'ai', name: 'ai-chatbot-development', icon: 'chat', palette: 'teal', alt: 'Illustration of conversational AI chat bubbles floating above a smartphone',
    prompt: 'A smartphone standing upright on a white surface with translucent glass chat bubbles rising from the screen, one bubble showing a small AI spark icon, soft cyan glow.' }),
  def('intelligent-automation', { dir: 'ai', name: 'intelligent-automation', icon: 'workflow', alt: 'Illustration of automated workflow nodes passing data between connected systems',
    prompt: 'An elegant 3D flowchart of rounded glass nodes on a white plane, small light pulses travelling along blue conduits between nodes representing automated business steps.' }),
  def('machine-learning', { dir: 'ai', name: 'machine-learning', icon: 'trendingUp', palette: 'indigo', alt: 'Illustration of machine learning model training curves and data clusters',
    prompt: 'Floating 3D scatter-plot clusters of glowing spheres in blue and cyan, with a translucent curve fitting through them and a small model-training progress panel.' }),

  // Services
  def('services-overview', { dir: 'services', name: 'services-overview', icon: 'layers', layout: 'hero', alt: 'Illustration of stacked software layers representing end-to-end digital services',
    prompt: 'Stacked translucent glass layers floating above each other, each layer showing a different interface (web app, mobile app, cloud diagram, analytics).' }),
  def('custom-software', { dir: 'services', name: 'custom-software-development', icon: 'code', alt: 'Illustration of modular software components assembling into an application',
    prompt: 'Modular 3D blocks with code-pattern surfaces snapping together to form an application window, a developer workstation softly blurred in the background.' }),
  def('web-applications', { dir: 'services', name: 'web-application-development', icon: 'globe', alt: 'Illustration of a responsive web application dashboard in a browser window',
    prompt: 'A floating browser window displaying a clean SaaS dashboard, with responsive tablet and phone versions of the same interface arranged around it.' }),
  def('mobile-applications', { dir: 'services', name: 'mobile-app-development', icon: 'smartphone', palette: 'teal', alt: 'Illustration of mobile app screens fanned out above a smartphone',
    prompt: 'Three smartphones at slight angles showing onboarding, dashboard and checkout screens of a modern app, light-blue backdrop, subtle reflections.' }),
  def('saas-platforms', { dir: 'services', name: 'saas-product-development', icon: 'layers', palette: 'indigo', alt: 'Illustration of a multi-tenant SaaS platform with subscription and analytics panels',
    prompt: 'A central cloud platform tile with several identical tenant workspaces orbiting it, each showing a small dashboard; subscription and usage panels nearby.' }),
  def('ecommerce', { dir: 'services', name: 'ecommerce-development', icon: 'cart', alt: 'Illustration of an online storefront with product cards and checkout panel',
    prompt: 'A floating online storefront with product cards, a shopping bag made of frosted glass and a secure checkout panel, bright retail-clean aesthetic.' }),
  def('cloud-devops', { dir: 'services', name: 'cloud-devops', icon: 'cloud', palette: 'teal', alt: 'Illustration of cloud infrastructure with deployment pipeline stages',
    prompt: 'A soft 3D cloud form above a row of server modules, a looping pipeline ribbon labelled only with icons (build, test, deploy) wrapping around it.' }),
  def('api-integration', { dir: 'services', name: 'api-integration', icon: 'plug', palette: 'indigo', alt: 'Illustration of connected systems exchanging data through API connectors',
    prompt: 'Several distinct application tiles connected by glowing cables to a central connector hub, data packets travelling along the cables.' }),
  def('ui-ux-design', { dir: 'services', name: 'ui-ux-design', icon: 'penTool', alt: 'Illustration of interface wireframes evolving into a polished design',
    prompt: 'A design canvas with wireframe outlines on the left transitioning to a polished colourful interface on the right, a stylus and colour swatches nearby.' }),
  def('data-engineering', { dir: 'services', name: 'data-engineering', icon: 'database', palette: 'teal', alt: 'Illustration of data pipelines flowing into an analytics warehouse',
    prompt: 'Streams of luminous data particles flowing from several source cylinders through filter stages into a large glass data warehouse block.' }),
  def('qa-testing', { dir: 'services', name: 'software-testing-qa', icon: 'checkCircle', palette: 'indigo', alt: 'Illustration of automated test results with passing checks across application screens',
    prompt: 'Application screens under a scanning beam of light, green-blue check marks appearing beside components, a test-run progress panel floating nearby.' }),
  def('app-modernization', { dir: 'services', name: 'application-modernization', icon: 'refresh', alt: 'Illustration of a legacy system transforming into modern cloud services',
    prompt: 'A heavy grey legacy server block on the left gradually dissolving into light, modular blue cloud services on the right, a transformation arc between them.' }),
  def('managed-it', { dir: 'services', name: 'managed-it-services', icon: 'server', palette: 'teal', alt: 'Illustration of monitored infrastructure with health and uptime panels',
    prompt: 'A tidy row of server modules with soft status lights, floating monitoring panels showing health indicators and an on-call support headset icon.' }),

  // Engagement models
  def('engagement-overview', { dir: 'engagement', name: 'engagement-models', icon: 'users', layout: 'hero', alt: 'Illustration of collaboration models connecting a client team with a delivery team',
    prompt: 'Two groups of abstract figure tokens on separate glass platforms connected by a bridge of light, shared planning boards floating above.' }),
  def('dedicated-team', { dir: 'engagement', name: 'dedicated-team', icon: 'users', palette: 'indigo', alt: 'Illustration of a dedicated product team around a shared roadmap',
    prompt: 'A diverse product team (stylised, faceless) around a holographic roadmap table in a bright modern office.' }),
  def('fixed-price', { dir: 'engagement', name: 'fixed-price-projects', icon: 'target', alt: 'Illustration of a defined project scope with milestones on a timeline',
    prompt: 'A clean milestone timeline with three glowing checkpoints and a scope document card, target emblem in the foreground.' }),
  def('team-augmentation', { dir: 'engagement', name: 'team-augmentation', icon: 'userPlus', palette: 'teal', alt: 'Illustration of specialists joining an existing team workspace',
    prompt: 'Abstract team tokens on a board with new highlighted tokens sliding in to fill specific skill slots, collaborative and bright.' }),
  def('managed-services', { dir: 'engagement', name: 'managed-services', icon: 'settings', palette: 'indigo', alt: 'Illustration of an ongoing managed service with monitoring and improvement cycles',
    prompt: 'A continuous improvement loop rendered as a glass ring with service icons along it, monitoring panels in the background.' }),
  def('time-materials', { dir: 'engagement', name: 'time-and-materials', icon: 'clock', alt: 'Illustration of an adaptable sprint board with time tracking',
    prompt: 'A flexible sprint board with movable cards and a minimalist clock face, translucent and light.' }),
  def('consulting', { dir: 'engagement', name: 'technical-consulting', icon: 'lightbulb', palette: 'teal', alt: 'Illustration of an architecture review with a glowing idea emblem',
    prompt: 'An architecture diagram spread on a glass table with a softly glowing lightbulb emblem hovering above it.' }),
  def('mvp-poc', { dir: 'engagement', name: 'mvp-poc-development', icon: 'rocket', alt: 'Illustration of a prototype application launching from a planning board',
    prompt: 'A small sleek rocket made of white ceramic lifting off from a prototype app wireframe, faint launch trail in cyan.' }),

  // Industries
  def('industries-overview', { dir: 'industries', name: 'industries-overview', icon: 'building', layout: 'hero', alt: 'Illustration of industry icons connected across a digital network',
    prompt: 'A miniature city of industry tiles — hospital, bank, factory, warehouse, school, store — connected by glowing data routes on a white platform.' }),
  def('healthcare', { dir: 'industries', name: 'healthcare', icon: 'heartPulse', palette: 'teal', alt: 'Illustration of a digital healthcare dashboard with patient care indicators',
    prompt: 'A clinician in a white coat (back or side view, face not visible) reviewing a tablet showing a patient-care dashboard, bright clinical environment with blue accents.' }),
  def('fintech', { dir: 'industries', name: 'fintech-banking', icon: 'landmark', palette: 'indigo', alt: 'Illustration of financial analytics and secure transaction panels',
    prompt: 'Glass skyscrapers at dusk-blue hour reflected in a floating financial analytics panel with candlestick charts and a secure padlock emblem.' }),
  def('retail', { dir: 'industries', name: 'retail-ecommerce', icon: 'store', alt: 'Illustration of an omnichannel retail experience with digital storefront panels',
    prompt: 'A bright modern store interior with a shopping cart and floating digital product cards, inventory and recommendation panels overlaid.' }),
  def('manufacturing', { dir: 'industries', name: 'manufacturing', icon: 'factory', palette: 'teal', alt: 'Illustration of a smart factory with connected machine telemetry',
    prompt: 'A clean robotic assembly line with articulated arms, floating telemetry panels showing machine health, cool blue lighting.' }),
  def('logistics', { dir: 'industries', name: 'logistics-supply-chain', icon: 'truck', alt: 'Illustration of a connected logistics network with route and shipment tracking',
    prompt: 'An aerial-style view of a port and highway network with glowing route lines linking a warehouse, trucks and a cargo plane.' }),
  def('education', { dir: 'industries', name: 'education-edtech', icon: 'graduationCap', palette: 'indigo', alt: 'Illustration of a digital learning platform with course and progress panels',
    prompt: 'A student at a bright desk (face not visible) using a laptop with floating course modules and progress rings around the screen.' }),
  def('real-estate', { dir: 'industries', name: 'real-estate', icon: 'home', palette: 'teal', alt: 'Illustration of property listings and building analytics',
    prompt: 'Modern residential towers in soft daylight with floating property cards, a floor-plan panel and a map pin emblem.' }),
  def('travel-hospitality', { dir: 'industries', name: 'travel-hospitality', icon: 'plane', alt: 'Illustration of travel booking and itinerary panels around an aircraft',
    prompt: 'A passenger jet climbing through a bright blue sky with translucent booking, itinerary and boarding-pass panels floating nearby.' }),
  def('media-entertainment', { dir: 'industries', name: 'media-entertainment', icon: 'film', palette: 'indigo', alt: 'Illustration of streaming content tiles and audience analytics',
    prompt: 'A wall of floating content thumbnails curving in an arc, a play button emblem and audience analytics panels, light studio feel.' }),
  def('startups-saas', { dir: 'industries', name: 'startups-saas', icon: 'rocket', palette: 'teal', alt: 'Illustration of a SaaS product launching with growth metrics',
    prompt: 'A small product team workspace with a launch board, product dashboard on a laptop and a subtle upward growth curve in light.' }),
  def('professional-services', { dir: 'industries', name: 'professional-services', icon: 'briefcase', alt: 'Illustration of professional service workflows with documents and client portals',
    prompt: 'A tidy executive desk with a laptop showing a client portal, neatly stacked digital documents and calendar panels floating above.' }),

  // Solutions
  def('solutions-overview', { dir: 'solutions', name: 'solutions-overview', icon: 'puzzle', layout: 'hero', alt: 'Illustration of business solution modules fitting together',
    prompt: 'Translucent puzzle-like modules (automation, analytics, support, documents) clicking together into a single glowing platform.' }),
  def('sol-business-automation', { dir: 'solutions', name: 'business-process-automation', icon: 'zap', alt: 'Illustration of business tasks moving automatically through approval stages',
    prompt: 'Document and task cards gliding along a glass conveyor through approval gates, each gate lighting up as the card passes.' }),
  def('sol-customer-support', { dir: 'solutions', name: 'ai-customer-support', icon: 'headset', palette: 'teal', alt: 'Illustration of an AI support assistant handling customer conversations',
    prompt: 'A support headset emblem surrounded by multiple chat conversation cards, an AI spark routing them to the right queues.' }),
  def('sol-predictive-analytics', { dir: 'solutions', name: 'predictive-analytics', icon: 'trendingUp', palette: 'indigo', alt: 'Illustration of forecast charts projecting future trends',
    prompt: 'A 3D line chart with historical data in solid blue extending into a dotted cyan forecast band, floating over a reflective white floor.' }),
  def('sol-document-processing', { dir: 'solutions', name: 'intelligent-document-processing', icon: 'fileText', alt: 'Illustration of documents being scanned and converted into structured data',
    prompt: 'Paper invoices and forms passing through a light scanner and emerging as neat structured data rows and fields.' }),
  def('sol-knowledge', { dir: 'solutions', name: 'ai-knowledge-management', icon: 'bookOpen', palette: 'teal', alt: 'Illustration of a knowledge base connected to an AI answer panel',
    prompt: 'A floating library of glass books and files connected by light threads to an answer panel with citation markers.' }),
  def('sol-sales', { dir: 'solutions', name: 'sales-automation', icon: 'trendingUp', alt: 'Illustration of a sales pipeline with automated follow-up steps',
    prompt: 'A funnel-shaped sales pipeline in frosted glass with lead cards moving through stages and small automated email and calendar icons.' }),
  def('sol-inventory', { dir: 'solutions', name: 'inventory-intelligence', icon: 'package', palette: 'indigo', alt: 'Illustration of warehouse inventory with demand and stock level indicators',
    prompt: 'Neat warehouse shelving with parcels, holographic stock-level bars above each shelf and a demand forecast panel.' }),
  def('sol-search', { dir: 'solutions', name: 'enterprise-search', icon: 'search', palette: 'teal', alt: 'Illustration of a unified search bar retrieving results from many systems',
    prompt: 'A large glass search bar with results flowing in from several system tiles (documents, tickets, wiki, CRM), soft blue glow.' }),
  def('sol-dashboards', { dir: 'solutions', name: 'business-dashboards', icon: 'dashboard', alt: 'Illustration of a business intelligence dashboard with KPI widgets',
    prompt: 'A wide executive dashboard on a curved display with KPI tiles, bar and line charts, clean and bright.' }),
  def('sol-orchestration', { dir: 'solutions', name: 'workflow-orchestration', icon: 'gitBranch', palette: 'indigo', alt: 'Illustration of orchestrated workflows branching across services',
    prompt: 'A branching flow diagram of glass nodes with parallel paths merging back together, light pulses travelling through it.' }),

  // About
  def('about-team', { dir: 'about', name: 'about-white-messenger', icon: 'users', layout: 'hero', alt: 'Illustration of a collaborative engineering workspace with shared planning boards',
    prompt: 'A bright, modern engineering studio with a team (stylised, faces not visible) collaborating around a large screen of architecture diagrams.' }),
  def('our-approach', { dir: 'about', name: 'our-approach', icon: 'compass', palette: 'teal', alt: 'Illustration of a delivery roadmap guided by a compass emblem',
    prompt: 'A winding glass roadmap with milestone markers leading to a horizon, a compass emblem hovering above the start point.' }),
  def('careers', { dir: 'about', name: 'careers', icon: 'briefcase', palette: 'indigo', alt: 'Illustration of a welcoming workspace for engineers and designers',
    prompt: 'A welcoming desk setup with laptop, notebook and plant, floating skill badges (code, design, data) above it.' }),

  // Resources
  def('resources-hub', { dir: 'resources', name: 'resources-hub', icon: 'bookOpen', layout: 'hero', alt: 'Illustration of articles, guides and reports arranged on a digital shelf',
    prompt: 'Floating editorial cards — articles, guides, reports — arranged like a magazine spread on a pale-blue stage.' }),
  def('ai-guides', { dir: 'resources', name: 'ai-guides', icon: 'sparkles', palette: 'teal', alt: 'Illustration of an AI guidebook opening with step-by-step panels',
    prompt: 'An open book made of light with step-by-step panels rising out of the pages, AI spark emblem.' }),
  def('case-studies', { dir: 'resources', name: 'case-studies', icon: 'fileText', palette: 'indigo', alt: 'Illustration of project scenario reports with workflow diagrams',
    prompt: 'A set of report folders opened to show workflow diagrams and before-and-after process maps (no numbers).' }),
  def('blog', { dir: 'resources', name: 'blog', icon: 'fileText', alt: 'Illustration of editorial article cards on a light background',
    prompt: 'An editorial desk scene: a tablet showing an article, coffee cup and notebook, blue ambient accents.' }),
  def('article-generative-ai', { dir: 'resources', name: 'article-generative-ai-business', icon: 'sparkles', alt: 'Illustration of generative AI assisting business documents and conversations',
    prompt: 'Generative AI spark hovering over business artefacts — a proposal, an email, a chart — each being refined by light.' }),
  def('article-saas-architecture', { dir: 'resources', name: 'article-saas-architecture', icon: 'layers', palette: 'indigo', alt: 'Illustration of a layered SaaS architecture diagram',
    prompt: 'An exploded 3D architecture diagram: edge, application, data and tenant layers stacked with connecting columns.' }),
  def('article-workflow-efficiency', { dir: 'resources', name: 'article-ai-workflow-efficiency', icon: 'workflow', palette: 'teal', alt: 'Illustration of a streamlined workflow with AI-assisted steps',
    prompt: 'A tangled path on the left straightening into a clean efficient line on the right, AI nodes placed at decision points.' }),
  def('article-api-strategies', { dir: 'resources', name: 'article-api-integration-strategies', icon: 'plug', alt: 'Illustration of systems linked through an integration layer',
    prompt: 'Several application blocks linked through a central translucent integration layer with tidy, labelled-by-colour connections.' }),
  def('article-secure-web', { dir: 'resources', name: 'article-secure-web-applications', icon: 'shield', palette: 'indigo', alt: 'Illustration of a web application protected by layered security shields',
    prompt: 'A browser window protected by concentric translucent shield layers, small lock and key emblems, calm and reassuring.' }),

  // Contact
  def('contact-hero', { dir: 'hero', name: 'contact-conversation', icon: 'send', palette: 'teal', alt: 'Illustration of a message being sent to start a project conversation',
    prompt: 'A paper plane made of frosted glass gliding from an open laptop toward a soft glowing horizon, small chat bubbles trailing.' }),
]);

export function imageSrc(img, width) {
  if (img.single) return `assets/images/${img.dir}/${img.name}.webp`;
  return `assets/images/${img.dir}/${img.name}-${width}.webp`;
}

/** Homepage photographs (Unsplash, see src/stock-images.mjs and `npm run images:stock`). */
for (const p of STOCK_IMAGES) {
  IMAGES[p.key] = { key: p.key, dir: 'home', name: p.file, w: p.w, h: p.h, widths: [p.w / 2, p.w], status: 'stock', alt: p.alt, source: p.source, prompt: 'Photograph from Unsplash.' };
}
