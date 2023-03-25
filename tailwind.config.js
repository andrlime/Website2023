/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        flash: 'flash 0.7s ease-in-out infinite',
      },
      keyframes: {
        flash: {
          '0%, 100%': { color: "#EEE" },
          '50%': { color: "rgb(239 68 68)" },
        }
      }
    },
  },
  plugins: [],
};
