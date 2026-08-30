/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          dark: '#14382e',
          primary: '#1d5a45',
          accent: '#2f855a',
          lightBg: '#f6faf7',
          mint: '#e6f4ea',
          boxBg: '#f2f8f4'
        }
      },
      fontFamily: {
        sans: ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif'],
      },
      boxShadow: {
        'soft-card': '0 10px 30px -5px rgba(22, 101, 52, 0.06), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'float-box': '0 20px 40px -10px rgba(22, 101, 52, 0.12)',
        'phone-mockup': '0 25px 60px -15px rgba(18, 56, 42, 0.25)',
      }
    },
  },
  plugins: [],
}
