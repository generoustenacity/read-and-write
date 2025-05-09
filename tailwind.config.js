/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f7f6',
          100: '#f0eeec',
          200: '#e2dcd8',
          300: '#d1c7c0',
          400: '#b7a79d',
          500: '#9d8879',
          600: '#846d5f',
          700: '#6b5447',
          800: '#523f34',
          900: '#392b23',
          950: '#231a16'
        },
        cream: {
          50: '#fefdfb',
          100: '#fcf9f5',
          200: '#f7f2ea',
          300: '#f1e6d7',
          400: '#e8d5bc',
          500: '#dfc3a1',
          600: '#d2ad82',
          700: '#c49363',
          800: '#b67a45',
          900: '#95633a'
        },
        accent: {
          50: '#fff1f1',
          100: '#ffe0e0',
          200: '#ffc5c5',
          300: '#ff9a9a',
          400: '#ff6363',
          500: '#f53d3d',
          600: '#e02c2c',
          700: '#c42424',
          800: '#a11f1f',
          900: '#861c1c'
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        fadeIn: 'fadeIn 0.3s ease-in',
        slideIn: 'slideIn 0.3s ease-out',
      },
      fontFamily: {
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
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