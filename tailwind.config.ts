import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        primary: "#16423C", 
        error: "#A02334", 
        primaryHover: "#53BF9D", 
        secondary: "#FFAD60", 
        mainText: "#B4D6CD",
        secondaryHover: "#FFC54D",
      },
    },
  },
  plugins: [],
};
export default config;
