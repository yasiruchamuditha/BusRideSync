/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}', // Add this line if you have components in 'src/components/'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
