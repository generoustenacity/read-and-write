/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf9f9',
          100: '#f2f0ef',
          200: '#e8e4e2',
          300: '#d5cdc9',
          400: '#bbb0aa',
          500: '#a08f86',
          600: '#8b766c',
          700: '#725c51',
          800: '#5e4a41',
          900: '#3d2e27',
          950: '#231a16'
        },
        cream: {
          50: '#fefdfb',
          100: '#fcf9f5',
          200: '#f7f1e9',
          300: '#f2e8dd',
          400: '#ead7c5',
          500: '#e2c7ae',
          600: '#d4b094',
          700: '#c49676',
          800: '#b47e5c',
          900: '#96654a'
        },
        accent: {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#ff3b3b',
          600: '#ee2121',
          700: '#d41414',
          800: '#b01414',
          900: '#911717'
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        fadeIn: 'fadeIn 0.3s ease-in',
        slideIn: 'slideIn 0.3s ease-out',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [],
};