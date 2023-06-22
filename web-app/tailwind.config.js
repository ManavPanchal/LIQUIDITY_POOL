/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#194BFB',
        'light-purple': '#dfccff',
        'uni-dim-white': 'rgb(255, 255, 255)',
        'uni-dark-pink': 'rgb(251, 17, 142)',
        'uni-text-pink-a': 'rgb(255, 79, 184)',
        'uni-text-pink-b': 'rgb(255, 159, 251)',
        'uni-btn-a': 'rgb(255, 0, 199)',
        'uni-caption': 'rgb(119, 128, 160),',
        'uni-landing-background': 'rgba(255,234,244)',
        'uni-feature-bg': 'rgb(245,246,252)',
        'uni-light-pink': 'rgb(248, 172, 185)',
        'uni-hover-pink': '#cf0c86',
        'uni-slate': '#e8ecfb',
      },
      screens: {
        'xsm': '300px',
      },
      width: {
        120: '480px',
      },
      height: {
        120: '480px',
      },
      fontFamily: {
        'Inter-c': "'Inter custom',sans-serif",
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },

  plugins: [],
};
