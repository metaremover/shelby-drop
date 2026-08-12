/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FCFBF9',
          100: '#F7F4EE',
          200: '#EFEAE1',
          300: '#E2D9CB',
          400: '#C7B9A4',
          500: '#A4927A',
        },
        obsidian: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
        },
        champagne: {
          50: '#FFFDF7',
          100: '#FEF9E7',
          500: '#D97706',
          600: '#B45309',
          700: '#78350F',
        }
      },
      boxShadow: {
        'silk': '0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.02)',
        'silk-hover': '0 20px 40px -12px rgba(180, 83, 9, 0.08), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'silk-inner': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.8)',
      },
      borderRadius: {
        '4xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
