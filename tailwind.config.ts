import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        surface: '#141414',
        'surface-2': '#1c1c1c',
        bone: '#f0ece1',
        'bone-mute': '#a8a49a',
        line: 'rgba(240, 236, 225, 0.1)',
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
        condensed: [
          'var(--font-condensed)',
          'var(--font-sans)',
          'system-ui',
          'sans-serif',
        ],
      },
      fontSize: {
        'display-xl': ['clamp(3.25rem, 9vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.25rem, 5.5vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
      },
      maxWidth: {
        wide: '1500px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.6, 0.05, 0.05, 1)',
      },
      borderRadius: {
        card: '20px',
      },
    },
  },
  plugins: [],
};

export default config;
