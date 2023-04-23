/** @type {import('tailwindcss').Config} */
const config = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    
    extend: {
        fontFamily: {
            sans:['var(--font-nunito)']
        },
      colors: {
        primary: config.theme?.colors['blue'],
        customBlue: '#EEF6FF',
        customPurple: '#705CF6',
        customGray: '#4B5563',
      },
    },
  },
  plugins: [],
};
