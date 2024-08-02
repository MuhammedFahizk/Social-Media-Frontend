
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
   keyframes: {
        modalOpen: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        modalClose: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.9)' },
        },
      },
      animation: {
        modalOpen: 'modalOpen 0.3s ease-out',
        modalClose: 'modalClose 0.3s ease-in',
      },
  theme: {
    extend: {
      fontFamily: {
        Jakarta : ["Plus Jakarta Sans", 'sans-serif'],
        Righteous : ["Righteous", 'sans-serif'], 
        Syne : ["Syne", 'sans-serif']

      },
      colors: {
        // prim0ary: '#1677FF',
        // secondary: '#EB5153',
        // tertiary: '#1677FF',
        // light_Brown: '#978877',
        // lightGray: '#f5f5f5',
        // darkNav: '#2C2C2C', // Charcoal grey for the nav bar
        // darkBody: '#181818', // Rich black for the body background
        // darkSecondary: '#3C3C3C', // Dim grey for secondary elements
        'text-light' : '#000',
        'text-gray' : '#B2B2B2',
        'text-primary' : '#ddb892',
        'primary-light': '#FFF',
				'secondary-light': '#f4f4f6',
				'ternary-light': '#f4f4f6',

				'primary-dark': '#0D2438',
				'secondary-dark': '#102D44',
				'ternary-dark': '#1E3851',

      },
    },
  },
  plugins: [],
};
