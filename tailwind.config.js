/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      colors: {
        'primary': '#B1B2FF',
        'secondary': '#AAC4FF',
        'tertiary': '#D2DAFF',
        'background': '#EEF1FF',
      },
    },
  },
  plugins: [],
}

