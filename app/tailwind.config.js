/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInRight: {
          '0%': { transform: 'translateX(20px)', opacity:0 },
          '10%': { transform: 'translateX(0px)', opacity:1 },
          '90%': { transform: 'translateX(0px)', opacity:1 },
          '100%': { opacity:0 },
        },
        
      },
      animation: {
        'fade-in-right': 'fadeInRight 3.5s ease-out forwards ',
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}