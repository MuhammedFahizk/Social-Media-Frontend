
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
      
        'text-light' : '#000',
        'text-gray' : '#bdbbbb',
        'text-primary' : '#0f9bab',
        'text-secondary' : '#2f4552',
        'primary-light': '#FFF',
				'secondary-light': '#f4f4f6',
				'ternary-light': '#b8b8ba',
        'chat-bubble-dark': '#1FA4B9',
        'chat-bubble-light': '#aaf2fa',
        'selected-light': '#aaf2fa',
				'primary-dark': '#0D2438',
				'secondary-dark': '#102D44',
				'ternary-dark': '#1E3851',

      },
    },
  },
  plugins: [],
};
