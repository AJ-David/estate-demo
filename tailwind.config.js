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
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F242F', // Rich Charcoal Gunmetal
          900: '#111319', // Deep Onyx
          950: '#07080B', // Pure Obsidian
        },
        // The Godfather / Syndicate Obsidian Canvas
        navy: {
          DEFAULT: '#0A0C10',  // Pure Midnight Obsidian
          deep: '#050608',     // Absolute Pitch Black
          card: '#11141C',     // Private Club Lounge Surface
          surface: '#191E2B',  // Polished Gunmetal Slate
          border: '#283042',   // Sharp Muted Brass / Gunmetal Border
        },
        // Sovereign 18K Burnished Gold & Brass (Elite Real Estate & Family Crest)
        gold: {
          DEFAULT: '#C5A059',
          light: '#DFC37F',
          dark: '#9A7831',
          soft: '#FAF5EA',
          border: '#D4AF37',
          50: '#FDFBF7',
          100: '#FAF5EA',
          200: '#F4E9CE',
          300: '#EBD9AD',
          400: '#DFC37F',
          500: '#C5A059',
          600: '#B08A38',
          700: '#8E6C26',
          800: '#725522',
          900: '#5A431E',
          950: '#34240D',
        },
        // Aliasing 'emerald' to Burnished Gold so all verified badges, price tags, and primary CTAs adopt the mafia-gold theme!
        emerald: {
          DEFAULT: '#C5A059',     // Sovereign Gold
          light: '#DFC37F',       // Champagne Shimmer
          dark: '#9A7831',        // Burnished Antique Bronze
          soft: '#FAF5EA',        // Pale Champagne Ivory
          border: '#D4AF37',      // Gold Leaf Trim
          50: '#FDFBF7',
          100: '#FAF5EA',
          200: '#F4E9CE',
          300: '#EBD9AD',
          400: '#DFC37F',
          500: '#C5A059',
          600: '#B08A38',
          700: '#8E6C26',
          800: '#725522',
          900: '#5A431E',
        },
        // Crimson / Oxblood / Blood Merlot for high-stakes authority & security alerts
        crimson: {
          DEFAULT: '#881337',
          dark: '#4C0519',
          light: '#BE123C',
          soft: '#FFF1F2',
          border: '#FDA4AF',
        },
        // Italian Marble & Alabaster Sand
        sand: {
          50: '#FAF9F6',
          100: '#F3F1EC',
          200: '#E7E5DC',
          warm: '#F6F5F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(10, 12, 16, 0.05), 0 1px 3px rgba(10, 12, 16, 0.08)',
        'premium': '0 12px 36px -6px rgba(10, 12, 16, 0.15), 0 4px 12px -2px rgba(10, 12, 16, 0.08)',
        'gold': '0 0 20px rgba(197, 160, 89, 0.25)',
        'gold-lg': '0 10px 30px -5px rgba(197, 160, 89, 0.35)',
        'glass': '0 8px 32px 0 rgba(10, 12, 16, 0.35)',
      }
    },
  },
  plugins: [],
};
