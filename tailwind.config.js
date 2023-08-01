/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./pages/ai/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        'body': ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

