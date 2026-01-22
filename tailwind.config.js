import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Explicitly adding these ensures they are available
        amber: colors.amber,
        emerald: colors.emerald,
        violet: colors.violet,
        rose: colors.rose,
      },
    },
  },
  plugins: [],
}