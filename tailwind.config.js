
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      darkMode: ['variant', '&:not(.light *)'],
      fontFamily: {
        Jakarta : ["Plus Jakarta Sans", 'sans-serif'],
        Righteous : ["Righteous", 'sans-serif'], 
        Syne : ["Syne", 'sans-serif']

      },
      colors: {
        primary: '#1677FF',
        secondary: '#EB5153',
        tertiary: '#1677FF',

      },
    },
  },
  plugins: [],
};
