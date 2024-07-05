
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        Jakarta : ["Plus Jakarta Sans", 'sans-serif'],
        Righteous : ["Righteous", 'sans-serif'], 
        Syne : ["Syne", 'sans-serif']

      },
      colors: {
        primary: '#1677FF',
        secondary: '#EB5153',
        tertiary: '#1677FF',
        light_Brown: '#978877',
        lightGray: '#f5f5f5',
        darkNav: '#2C2C2C', // Charcoal grey for the nav bar
        darkBody: '#181818', // Rich black for the body background
        darkSecondary: '#3C3C3C', // Dim grey for secondary elements

      },
    },
  },
  plugins: [],
};
