/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: {
        colors: {
          'primary': '#12191D',
          'secondary': '#F4F4F4',
          'accent-blue': '#0072E9',
          'accent-gray': '#1C262D',
          'accent-light': '#7C98A9',
        },
        fontFamily: {
          outfit: ['Outfit'],
          michroma: ['Michroma'],
          poppins: ['Poppins'],
          monstserrat: ['Montserrat'],
        },
      },
    },
    plugins: [],
}
