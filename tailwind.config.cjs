/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "azure-radiance": {
          50: "#edfcff",
          100: "#d6f8ff",
          200: "#b6f4ff",
          300: "#83f0ff",
          400: "#49e4ff",
          500: "#1fcbff",
          600: "#07b0ff",
          700: "#0199f7",
          800: "#0877c5",
          900: "#0e649a",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

module.exports = config;
