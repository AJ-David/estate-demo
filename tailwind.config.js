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
          200: '#E4E4E7',  // Clean subtle border
          300: '#D4D4D8',
        }
      },
      backgroundColor: {
        estate: {
          50: '#FAFAFA',   // Light subtle surface
          100: '#F4F4F5',  // Neutral surface
        }
      },
      colors: {
        // High-contrast clean monochrome & slate spectrum for crisp typography
        estate: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',  // Secondary/muted text
          600: '#52525B',  // Clean body text
          700: '#3F3F46',  // Dark body text
          800: '#27272A',  // Subheadings
          900: '#18181B',  // Headings
          950: '#09090B',  // Crisp black
        },
        // The Clean Modern Canvas
        navy: {
          DEFAULT: '#FFFFFF',  // Pure White Canvas
          deep: '#FAFAFA',     // Soft Off-White Background
          card: '#FFFFFF',     // Clean White Card
          surface: '#F4F4F5',  // Light Neutral Gray Surface / Hover
          border: '#E4E4E7',   // Crisp Modern Border
        },
        // Modern Architectural Black & Charcoal Accent (Replaces AI gold/brass)
        gold: {
          DEFAULT: '#09090B',  // Crisp Black Primary
          light: '#27272A',   // Charcoal Accent
          dark: '#000000',    // Pure Black
          soft: '#F4F4F5',    // Soft Neutral
          border: '#E4E4E7',  // Subtle Border
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
          950: '#09090B',
        },
        // Verification & Trust Green (Refined, authentic emerald)
        emerald: {
          DEFAULT: '#059669',     // Rich Emerald
          light: '#10B981',       // Mint
          dark: '#047857',        // Deep Forest Green
          soft: '#ECFDF5',        // Soft Mint Surface
          border: '#A7F3D0',      // Mint Border
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Alerts & Destructive
        crimson: {
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
          light: '#F87171',
          soft: '#FEF2F2',
          border: '#FECACA',
        },
        // Clean Warm Neutral Surfaces
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
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'premium': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'gold': '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        'gold-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'glass': '0 8px 30px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
