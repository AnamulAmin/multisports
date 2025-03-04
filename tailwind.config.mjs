/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#cfcfcf",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        tertiary: "var(--tertiary-color)",
        title: "var(--title-color)",
        paragraph: "var(--paragraph-color)",
        border: "var(--border-color)",
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { opacity: '0.6' },  // Slightly less intense opacity
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite ease-in-out',  // Slightly slower animation
      },
    },
  },
  darkMode: "class",
  plugins: [require("daisyui")],
};
