/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#194BFB',
        'light-purple':'#dfccff',
        "uni-dim-white":"rgb(255, 255, 255)",
        "uni-dark-pink":"rgb(251, 17, 142)"
      },
      width:{
        "120":"480px"
      },
      height:{
        "120":"480px"
      },
      fontFamily:{
        "Inter-c":"'Inter custom',sans-serif"
      }
    },
  },
  plugins: [
  ],
}

