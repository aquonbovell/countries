const autoprefixer = require("autoprefixer");
const postcss = require("postcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      textColor: {
        skin: {
          base: "var(--text-color)",
          input: "var(--input-color)",
        },
      },
      backgroundColor: {
        skin: {
          base: "var(--bg-color)",
          element: "var(--element-color)",
        },
      },
      borderColor: {
        skin: {
          toggle: "var(--theme-logo)",
        },
      },
      boxShadowColor: {
        skin: {
          shadow: "var(--shadow)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        resp: "repeat(auto-fill, minmax(230px, 1fr))",
      },
    },
  },
  plugins: [autoprefixer(), postcss()],
};
