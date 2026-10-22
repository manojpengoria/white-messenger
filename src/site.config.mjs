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
    phoneDisplay: '+91 77909 92982',
    phoneHref: '+917790992982',
    addressLines: ['504, Shreya Heights, Meera Marg', 'Banipark, Jaipur 302016', 'Rajasthan, India'],
    address: {
      streetAddress: '504, Shreya Heights, Meera Marg, Banipark',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '302016',
      addressCountry: 'IN',
    },
  },

  // CONFIG PLACEHOLDER: add real profile URLs. Empty URLs render as visibly disabled icons.
  social: [
    { name: 'LinkedIn', icon: 'linkedin', url: '' },
    { name: 'X', icon: 'xlogo', url: '' },
    { name: 'Facebook', icon: 'facebook', url: '' },
    { name: 'Instagram', icon: 'instagram', url: '' },
    { name: 'YouTube', icon: 'youtube', url: '' },
  ],

  // CONFIG PLACEHOLDER: form endpoints for the future Laravel backend (see README "Backend integration").
  // While empty, forms validate in the browser and then explain that online submission is not connected yet.
  forms: {
    inquiryEndpoint: '',
    careersEndpoint: '',
  },

  year: 2026,
};
