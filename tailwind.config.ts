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
      maxWidth: {
        "10xl": "1600px",
      },
      colors: {
        primary: "#16423C",
        error: "#A02334",
        primaryHover: "#53BF9D",
        secondary: "#FFAD60",
        mainText: "#B4D6CD",
        secondaryHover: "#FFC54D",

        primaryDark: "#53BF9D",
        primaryHoverDark: "#70d4af",
        secondaryDark: "#FFAD60",
        secondaryHoverDark: "#FFC54D",
        errorDark: "#FF5C75",
        mainTextDark: "#E6F5F1",
        backgroundDark: "#0E1B18",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
