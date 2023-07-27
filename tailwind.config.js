/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/ai/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

