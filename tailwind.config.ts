import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', 

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "logo-cloud": "logo-cloud 30s linear infinite", // New animation utility
      },
      keyframes: {
        gradient: {
          to: {
            backgroundPosition: "var(--bg-size) 0",
          },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "logo-cloud": { // New keyframes for the logo-cloud animation
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - 4rem))",
          },
        },
      },
    },
  },

  plugins: [],
};

export default config;
