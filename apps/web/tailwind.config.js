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
          DEFAULT: '#FFF8E7',
          dark: '#0B0F17',
        },
        card: {
          DEFAULT: '#FFFFFF',
          dark: '#131B2A',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          dark: '#1E293B',
        },
        ink: {
          DEFAULT: '#000000',
          dark: '#F1F5F9',
        },
        border: {
          DEFAULT: '#000000',
          dark: '#334155',
        },
        muted: {
          DEFAULT: '#E5E7EB',
          dark: '#1E293B',
        },
        neo: {
          yellow: '#FFD93D',
          green: '#6BCB77',
          pink: '#FF6B9D',
          blue: '#4D96FF',
          orange: '#FF9F45',
        },
      },
      borderWidth: {
        3: '3px',
        4: '4px',
      },
      boxShadow: {
        neo: '6px 6px 0px #000000',
        'neo-lg': '8px 8px 0px #000000',
        'neo-sm': '4px 4px 0px #000000',
        'neo-dark': '4px 4px 0px #030712',
        'neo-dark-lg': '6px 6px 0px #030712',
        'neo-amber-dark': '3px 3px 0px #F59E0B',
        'neo-slate-dark': '3px 3px 0px #334155',
        'neo-yellow': '6px 6px 0px #FFD93D',
        'neo-green': '6px 6px 0px #6BCB77',
        'neo-pink': '6px 6px 0px #FF6B9D',
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
