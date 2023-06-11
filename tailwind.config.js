/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#194BFB',
        'light-purple':'#dfccff',
        "uni-dim-white":"rgb(255, 255, 255)"
      },
      width:{
        "120":"480px"
      },
      height:{
        "120":"480px"
      }
    },
  },
  plugins: [],
}

