/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/widgets/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#F8FAFC',
          dark: '#171717',
        },
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#1E1E1E',
        },
        surface: {
          DEFAULT: '#F1F5F9',
          dark: '#262626',
        },
        ink: {
          DEFAULT: '#0F172A',
          dark: '#ECECEC',
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#2F2F2F',
        },
        muted: {
          DEFAULT: '#F1F5F9',
          dark: '#262626',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10A37F',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        xs: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        sm: '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        neo: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'neo-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.07)',
        'neo-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'neo-dark': '0 1px 3px 0 rgba(0, 0, 0, 0.25)',
        'neo-dark-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        arabic: ['Cairo', '"IBM Plex Sans Arabic"', 'sans-serif'],
      },
      transitionTimingFunction: {
        neo: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
