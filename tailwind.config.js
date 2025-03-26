/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "!./node_modules/**/*",  
  ],
  theme: {
    extend: {
      screens : {
        phs : {max : '540px'},
        lg: { min: '540px', max: '1200px' },
        sm : '612px',
      },
      boxShadow: {
        customInner: "inset 2px 2px 45px hsl(168, 50.00%, 15.70%)", // Inner shadow
        customOuter: "2px 2px 5px rgba(0, 0, 0, 0.5)", // Outer shadow
        designBox : '0px 8px 10px rgb(132, 189, 174), inset 0px -30px 35px rgb(29, 102, 84)',   
        designBox2 : '0px -8px 10px rgb(132, 189, 174), inset 0px 18px 35px #1d6654',   
        designBox3 : '0px 0px 12px rgb(132, 189, 174), inset 0px 0px 35px rgb(29, 102, 84)',   
        designBox4 : '0px 0px 152px #3E4137, inset 0px 0px 35px #3E4137',   
        navBox : '0px 0px 9px rgb(255, 255, 255), inset 8px 8px 15px rgba(105, 51, 51, 0)',   
      },
    },
  },
  plugins: [],
}

