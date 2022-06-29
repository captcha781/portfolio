/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      xxl: "1920px"
    },
    extend: {
      fontFamily: {
        Outfit: ['Outfit',"sans-serif"]
      },
      colors: {
        VDarkPurple: "hsl(254, 49%, 11%)",
        LightPurple: "hsl(228, 87%, 80%)",
        LightPurpleHover: "hsl(228, 87%, 90%)",
        SoftBlue : 'hsl(215, 51%, 70%)',
        Cyan: 'hsl(178, 100%, 50%)',
        VDarkBlueMain: 'hsl(217, 54%, 11%)',
        VDarkBlueCard: 'hsl(216, 50%, 16%)',
        VDarkBlueLine: 'hsl(215, 32%, 27%)',
        White: 'hsl(0, 0%, 100%)'
      }
    },
  },
  plugins: [],
};
