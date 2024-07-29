/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        innterTight: ["Inter Tight", "sans-serif"],
      },
      colors: {
        background: '#0f0f0f',
        highlight: '#222222'
      }
    },

  },
  plugins: [
    function({addUtilities}) {
      const newUtilities = {
        ".scrollbar-thin" :{
          scrollBarWidth: "thin",
          scrollBarColor: "rgb(31 29 29) white"
        },
        ".scrollbar-webkit" :{
         "&::-webkit-scrollbar" :{
          width: "8px"
         },
         "&::-webkit-scrollbar-track" :{
          background: "#0f0f0f"
         },
         "&::-webkit-scrollbar-thumb" :{
          backgroundColor: "rgb(31 45 55)",
          borderRadius: "20px",
          border: "1px solid #5a5a5a"
         }
        }
      }
      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
}

