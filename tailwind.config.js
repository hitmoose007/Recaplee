/** @type {import('tailwindcss').Config} */
const config = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    
    extend: {
      colors: {
        primary: config.theme?.colors['blue'],
      },
    },
  },
  plugins: [],
};
