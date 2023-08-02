/**
 * @type {import('tailwindcss/plugin')}
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    transparent: 'transparent',
    current: 'currentColor',
    extend: {
      fontFamily: {
        sans: ['acumin-pro', 'sans-serif'],
        headline: ['atrament-web', 'sans-serif'],
      },

      screens: {
        '2xl': '1536px',
        '2k': '1921px',
        '1440p': '2160px',
        '720p': '719px',
        '1080p': '1079px',
        '4k': '2397px',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('offcanvas-opened', '.offcanvas[data-showing="1"] &');
      addVariant('offcanvas-closed', '.offcanvas[data-showing="0"] &');
      addVariant('is-member', '.offcanvas[data-is-member="1"] &');
      addVariant('is-not-member', '.offcanvas[data-is-member="0"] &');
      addVariant('expanded', '.expanded &');
      addVariant('expanded-hover', '.expanded:hover &');
      addVariant('toggle-yes', 'input[type="checkbox"]:checked + &');
      addVariant('btn-dropdown', 'button.dropdown + &');
      addVariant('btn-dropdown-showing', 'button.dropdown &');
      addVariant('sticky', '.navigation-bar.is-sticky &');
    }),
  ],
};
