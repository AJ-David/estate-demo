/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sovereign Obsidian & Gunmetal Spectrum (Replaces light gray pastels with dark luxury)
        estate: {
          50: '#080A0E',   // Pitch Obsidian
          100: '#0F131C',  // Dark Gunmetal
          200: '#1A212E',  // Dark Slate Border
          300: '#2A3449',  // Muted Slate
          400: '#73839C',  // Slate Muted Label
          500: '#94A3B8',  // Cool Platinum Muted (High Contrast)
          600: '#CBD5E1',  // Crisp Light Platinum Body
          700: '#E2E8F0',  // Brilliant Ice Silver
          800: '#F1F5F9',  // Near-White
          900: '#FFFFFF',  // Pure Crisp White
          950: '#FFFFFF',  // Pure Crisp White
        },
        // The Sovereign Syndicate Canvas
        navy: {
          DEFAULT: '#0A0C10',  // Pure Midnight Obsidian
          deep: '#06070B',     // Absolute Pitch Black
          card: '#12151F',     // Smoky Obsidian Lounge Card
          surface: '#181E2C',  // Polished Gunmetal Slate
          border: '#262F43',   // Muted Brass / Gunmetal Border
        },
        // 18K Burnished Gold & Brass (Elite Real Estate & Sovereign Authority)
        gold: {
          DEFAULT: '#C5A059',
          light: '#DFC37F',
          dark: '#9A7831',
          soft: '#19150B',
          border: '#D4AF37',
          50: '#16130B',
          100: '#261F10',
          200: '#3D3016',
          300: '#695121',
          400: '#DFC37F',
          500: '#C5A059',
          600: '#E2C37E',
          700: '#F0D89B',
          800: '#F7E7BE',
          900: '#FCF3DC',
          950: '#FFFDF7',
        },
        // Sovereign Emerald & Mint Glow (Dark mode verified & trust metrics)
        emerald: {
          DEFAULT: '#10B981',     // Sovereign Mint Emerald
          light: '#34D399',       // Bright Mint
          dark: '#059669',        // Deep Green
          soft: '#071F15',        // Midnight Pine
          border: '#10B981',      // Mint Glow
          50: '#061C14',          // Deep Forest Night
          100: '#0B291E',
          200: '#123D2D',
          300: '#1C5B43',
          400: '#2BB07F',
          500: '#10B981',
          600: '#34D399',
          700: '#6EE7B7',         // Bright Mint Glow
          800: '#A7F3D0',         // Ultra-bright High Contrast
          900: '#D1FAE5',         // Pure Icy Mint White
        },
        // High-Stakes Oxblood & Crimson Red
        crimson: {
          DEFAULT: '#EF4444',
          dark: '#3F0C10',
          light: '#F87171',
          soft: '#25080A',
          border: '#EF4444',
        },
        // Dark Obsidian Marble & Sand Surfaces
        sand: {
          50: '#0E121A',
          100: '#131823',
          200: '#1E2536',
          warm: '#06070B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.4)',
        'premium': '0 12px 36px -6px rgba(0, 0, 0, 0.7), 0 4px 12px -2px rgba(0, 0, 0, 0.5)',
        'gold': '0 0 20px rgba(197, 160, 89, 0.25)',
        'gold-lg': '0 10px 30px -5px rgba(197, 160, 89, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.65)',
      }
    },
  },
  plugins: [],
};
