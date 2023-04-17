/** @type {import("prettier").Config} */
const config = {
  plugins: [require("prettier-plugin-tailwindcss")],
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
};

module.exports = config;
