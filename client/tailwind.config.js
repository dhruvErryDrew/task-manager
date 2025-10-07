/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#009900',
          600: '#007700',
          700: '#005500',
        },
        secondary: {
          500: '#D00000',
          600: '#B00000',
          700: '#900000',
        },
        accent: {
          500: '#0066CC',
        }
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
