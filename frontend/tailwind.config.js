/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#04043A',
        primary: '#1215B3',
        light: '#F8F8F8'
      }
    }
  },
  plugins: [require('daisyui')],
}

