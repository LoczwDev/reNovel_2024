/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        violet: "#a138b4",
        primary: "#1565D8",
        darkest: "#25253d",
        dark: {
          light: "#5A7184",
          hard: "#0D2436",
          soft: "#183B56",
          DEFAULT: "#0D2436",
        },
      },
      fontFamily: {
        montserrat: ["'Montserrat'", "sans-serif"],
        opensans: ["'Open Sans'", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
