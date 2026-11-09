/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        estate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#080E1A',
        },
        navy: {
          DEFAULT: '#0E1A2B',
          deep: '#09111E',
          card: '#132238',
          surface: '#1A2C46',
          border: '#243A5A',
        },
        emerald: {
          DEFAULT: '#059669',
          light: '#10B981',
          dark: '#047857',
          soft: '#ECFDF5',
          border: '#A7F3D0',
        },
        sand: {
          50: '#FCFBF7',
          100: '#F7F4EB',
          200: '#EFE9D7',
          warm: '#F8F7F4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
        'premium': '0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
        'glass': '0 8px 32px 0 rgba(14, 26, 43, 0.25)',
      }
    },
  },
  plugins: [],
};
