/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory:   '#FAF8F5',
          'ivory-dark': '#F2EEE8',
          charcoal: '#1C1917',
          'charcoal-light': '#3D3935',
          gold:    '#C9A96E',
          'gold-light': '#E2C99A',
          muted:   '#8C8078',
          stone:   '#D6CFC6',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl':  ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-lg':  ['clamp(2rem, 4vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-md':  ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.15' }],
        'display-sm':  ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.2' }],
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'widest-lg': '0.2em',
        widest: '0.15em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      maxWidth: {
        'editorial': '68rem',
        'prose-xl': '72ch',
      },
    },
  },
  plugins: [],
}
