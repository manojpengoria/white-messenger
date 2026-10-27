import './load-env.mjs';

/**
 * Global site configuration.
 * Everything marked CONFIG PLACEHOLDER must be confirmed by White Messenger before launch.
 */
export const site = {
  name: 'White Messenger',
  tagline: 'Innovate · Develop · Elevate',
  brandMessage: 'Intelligent Technology. Meaningful Progress.',

  // CONFIG PLACEHOLDER: production origin used for canonical URLs, Open Graph and sitemap.xml.
  url: 'https://www.whitemessenger.com',

  contact: {
    email: 'info@whitemessenger.com',
    phoneDisplay: '+91 86909 92982',
    phoneHref: '+918690992982',
    addressLines: ['504, Shreya Heights, Meera Marg', 'Banipark, Jaipur 302016', 'Rajasthan, India'],
    address: {
      streetAddress: '504, Shreya Heights, Meera Marg, Banipark',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302016',
      addressCountry: 'IN',
    },
  },

  // Social profiles. Entries with an empty url are not shown anywhere.
  social: [
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/company/white-messenger' },
    { name: 'X', icon: 'xlogo', url: 'https://x.com/whitemessenger9' },
    { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/people/White-Messenger-Private-Limited/61595970689506/' },
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/whitemessenger9/' },
    { name: 'YouTube', icon: 'youtube', url: '' },
  ],

  // Form endpoints (serverless functions in /api, also mounted by the Express server).
  // Set an endpoint to '' to fall back to the "not connected, please email us" message.
  forms: {
    inquiryEndpoint: '/api/inquiry',
    careersEndpoint: '/api/careers',
    // Cloudflare Turnstile public site key, read at build time (Vercel env var TURNSTILE_SITE_KEY).
    // When empty, no CAPTCHA widget is rendered.
    turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || '',
  },

  year: 2026,
};
