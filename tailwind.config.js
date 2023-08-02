/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')


module.exports = {
  content: ["./pages/ai/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui"),
    // base
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontFamily: theme("Space Grotesk") },
        'h2': { fontFamily: theme("Space Grotesk") },
        'h3': { fontFamily: theme("Space Grotesk") },
      })
      return true;
    })
  ],
  daisyui: {
    themes: [
      {
        "moz_ai_guide_base": {
          "primary": "#4579ff",
          "secondary": "#ff85ff",
          "accent": "#73fdaf",
          "neutral": "#252E37",
          "base-100": "#fafafa",
          "info": "#3194f6",
          "success": "#5ec992",
          "warning": "#f7e02b",
          "error": "#e60400",
        }
      },
      "dark",
      "cyberpunk"
    ],
  }
}

