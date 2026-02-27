/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        junge: ['Junge', 'serif'],
        figtree: ['Figtree', 'sans-serif'],
      },
      colors: {
        primary: '#ca1670',
        'primary-dark': '#b01460',
        'primary-light': '#fde9f3',
        'primary-muted': 'rgba(202,22,112,0.1)',
      },
      boxShadow: {
        'book': '0px 20px 25px -5px rgba(0,0,0,0.10), 0px 8px 10px -6px rgba(0,0,0,0.10)',
        'card': '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
        'hero': '0px 25px 50px -12px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
}
