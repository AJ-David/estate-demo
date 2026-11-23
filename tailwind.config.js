/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        estate: {
          50: '#F4F4F5',
          100: '#E4E4E7',
          200: '#E4E4E7',
          300: '#D4D4D8',
        }
      },
      backgroundColor: {
        estate: {
          50: '#FAFAFA',
          100: '#F4F4F5',
        }
      },
      colors: {
        // High-contrast clean monochrome typography
        estate: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#000000',
        },
        // The Clean White Canvas
        navy: {
          DEFAULT: '#FFFFFF',
          deep: '#FFFFFF',
          card: '#FFFFFF',
          surface: '#F4F4F5',
          border: '#E4E4E7',
        },
        // Crisp Black & White (No gold or artificial hues)
        gold: {
          DEFAULT: '#000000',
          light: '#27272A',
          dark: '#000000',
          soft: '#F4F4F5',
          border: '#E4E4E7',
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#000000',
        },
        // Clean monochrome trust tokens
        emerald: {
          DEFAULT: '#000000',
          light: '#27272A',
          dark: '#000000',
          soft: '#F4F4F5',
          border: '#E4E4E7',
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },
        // Clean monochrome alert tokens
        crimson: {
          DEFAULT: '#000000',
          dark: '#000000',
          light: '#27272A',
          soft: '#F4F4F5',
          border: '#E4E4E7',
        },
        sand: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          warm: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      // Completely neutralize all box-shadows across all custom shadow utilities
      boxShadow: {
        'none': 'none',
        'subtle': 'none',
        'premium': 'none',
        'gold': 'none',
        'gold-lg': 'none',
        'glass': 'none',
        'xs': 'none',
        'sm': 'none',
        'md': 'none',
        'lg': 'none',
        'xl': 'none',
        '2xl': 'none',
        'inner': 'none',
      }
    },
  },
  plugins: [],
};
