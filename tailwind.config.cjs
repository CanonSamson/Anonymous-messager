/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'paragraph': ['Casper'],
        // 'body': ['Karla', ],
        sans: ["PT Sans", "sans-serif", ...defaultTheme.fontFamily.sans],
        Casper: ["Casper", "sans-serif"],
      },
    },
  },
  plugins: [],
}
