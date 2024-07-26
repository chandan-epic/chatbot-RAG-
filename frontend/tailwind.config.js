/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  boxShadow: {
    "custom-inset":
      "3px 3px 4px rgba(0, 0, 0, 0.25) ,inset 2px 5px 6px rgba(255, 255, 255, 0.37),inset 0px -5px 6px rgba(0, 0, 0, 0.37)",
  },
  container: {
    center: true,
    padding: {
      DEFAULT: "1rem",
      md: "3rem",
    },
  },
  plugins: [],
};
