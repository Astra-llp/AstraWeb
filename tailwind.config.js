/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00a982',     // Brand Emerald-Teal
          secondary: '#05c396',   // Glossy Light Mint/Teal
          navy: '#064e3b',        // Deep Forest Green Accent
          dark: '#0F172A',        // Slate Navy/Dark (text & dark mode background)
          light: '#F8FAFC',       // Pure Slate-Light Background
          cardDark: '#1E293B',    // Dark card background in dark mode
          cardLight: '#FFFFFF',   // Light card background
          teal: '#00a982',        // Align teal with primary emerald
          blue: '#064e3b',        // Align blue references with deep green
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        medical: '0 8px 30px -2px rgba(0, 169, 130, 0.06), 0 2px 12px -1px rgba(15, 23, 42, 0.03)',
        'medical-hover': '0 16px 36px -3px rgba(0, 169, 130, 0.12), 0 4px 18px -2px rgba(15, 23, 42, 0.05)',
        'medical-dark': '0 8px 30px -2px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
