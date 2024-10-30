/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [    
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        // darkestColor : "#343a40",
        darkestColor : "#181B22",
        darkColor : "#202531",
        mediumColor : "#ced4da",
        lightColor : "#f1f3f5",
        themeColor : "#1098ad",
        accentColor : "#ffa94d",
      }
    },
  },
  plugins: [],
})

