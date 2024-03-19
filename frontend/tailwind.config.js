/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        menu_animation: {
          '0%': {   transform: 'translateX(-100%)'},
          '100%': { transform: 'translate(0)' },
        }
      },
      animation:{
        menu_animation:'menu_animation 0.2s linear'
      },
      colors:{
        'primary':"#607744",
        'secondary':"#9EB26C",
        'sub_primary':"#C8553D",
        'sub_secondary':"#DD8437",
        'admin_primary':"#8a3fd9",
        'admin_secondary':"#c163ff",
        'sell':"#F4F1DE"
      },
    },
  },
  plugins: [
  
],
}

