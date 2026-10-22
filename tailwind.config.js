import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.html',
    './{ai,services,engagement-models,industries,solutions,about-us,resources,contact-us,partials}/**/*.html',
    './assets/js/*.js',
    './src/**/*.mjs',
  ],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#081426', 900: '#10223D', 800: '#1A3358', 700: '#28426B' },
        brand: {
          50: '#EFF5FF', 100: '#DBE8FE', 200: '#BFD6FE', 300: '#93BBFD', 400: '#609AFA',
          500: '#3B7BF6', 600: '#2563EB', 700: '#1D4FD8', 800: '#1E40AF', 900: '#1E3A8A',
        },
        // Taken from the official logo artwork
        teal: { 50: '#ECF7FA', 100: '#D3EDF4', 200: '#A9DCE9', 500: '#3792B3', 600: '#2A7D9C', 700: '#226680' },
        plum: { DEFAULT: '#3D3E6B' },
        accent: { cyan: '#22D3EE' },
        surface: '#F5F8FC',
        ink: { DEFAULT: '#111827', muted: '#64748B' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,34,61,.04), 0 6px 18px -8px rgba(16,34,61,.10)',
        'card-lg': '0 2px 4px rgba(16,34,61,.04), 0 18px 40px -16px rgba(37,99,235,.28)',
        glow: '0 10px 30px -10px rgba(37,99,235,.55)',
      },
      maxWidth: { '8xl': '88rem' },
      typography: ({ theme }) => ({
        wm: {
          css: {
            '--tw-prose-body': theme('colors.slate.600'),
            '--tw-prose-headings': theme('colors.navy.950'),
            '--tw-prose-links': theme('colors.brand.700'),
            '--tw-prose-bold': theme('colors.navy.900'),
            '--tw-prose-bullets': theme('colors.brand.500'),
            '--tw-prose-counters': theme('colors.brand.600'),
            '--tw-prose-quote-borders': theme('colors.brand.300'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};
