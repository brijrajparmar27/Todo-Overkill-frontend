/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        title: "24px",
        subititle: "18px",
        content: "16px",
      },
    },
    colors: {
      black: "#000",
      white: "#FFFF",
      gray: "#d3d3d3",
      green: "#00ba6d",
      red: "#f44336",
      blackglass: "#00000038",
      lightgray: "#d3d3d330",
    },
  },
  plugins: [],
};
