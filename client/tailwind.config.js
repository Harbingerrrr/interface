/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        myTheme: {
          "primary": "#5d5de9",
          "secondary": "#ed2dfb",
          "accent": "#48ea99",
          "neutral": "#142438",
          "base-100": "#080e16",
          "base-200": "#0D1520",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

