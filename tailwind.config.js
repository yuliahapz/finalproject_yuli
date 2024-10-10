/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Add Google Fonts
  corePlugins: {
    preflight: ({ addBase }) => {
      addBase({
        '@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap");': {},
      });
    },
  },
}