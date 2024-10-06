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
          "primary": "#45d78e",
          "secondary": "#3c70e1",
          "accent": "#eeba6c",
          "neutral": "#333341",
          "base-100": "#eeeff1",
          "base-200": "#ff0026",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

