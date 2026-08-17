/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./wordpress-theme/**/*.{php,html,js}",
  ],
  theme: {
    extend: {
      colors: {
        aureo: {
          alabaster: {
            25: '#fdfcfb',
            50: '#faf8f5',
            100: '#f5f0e6',
            200: '#ede4d5',
            300: '#e2d5c0',
            400: '#d1c0a5',
            500: '#bcab8d',
            600: '#a39274',
            700: '#84755d',
            800: '#675b48',
            900: '#4b4234',
          },
          travertine: {
            50: '#faf9f6',
            100: '#f3efe8',
            200: '#e8e0d2',
            300: '#dacfbc',
            400: '#c5b7a0',
            500: '#aa9b82',
            600: '#8c7e67',
          },
          gold: {
            950: '#433110',
            900: '#684d1e',
            800: '#8c6a2c',
            700: '#a67e37',
            600: '#b88d3f',
            500: '#c5a059',
            400: '#d7b775',
            300: '#e5cf98',
            200: '#f2e5c1',
            100: '#faf4e3',
            50: '#fdfbf4',
          },
          dark: '#14181f',
          charcoal: '#222831',
          slate: '#39424e',
          muted: '#606c7d',
          lightMuted: '#8c98a9',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['Cinzel', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
      },
      letterSpacing: {
        'widest-caps': '0.25em',
        'architectural': '0.18em',
        'regal': '0.3em',
      },
      scale: {
        '103': '1.03',
        '108': '1.08',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
