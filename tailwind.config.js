/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./admin/**/*.{html,js}",
    "./*.html",
  ],
  theme: {
    extend: {
      colors: {
        "lightning-yellow": "#FFD300",
        "lightning-yellow-dark": "#F8D90F",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
