import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-btt-h": "linear-gradient(90deg, rgba(0,0,0,.5) 0%, rgba(0,0,0,0) 3%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 97%, rgba(0,0,0,.5) 100%)",
        "gradient-btw-h": "linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 3%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 97%, rgba(255,255,255,0.5) 100%)",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, 350px)",
      }
    },
  },
  plugins: [nextui()],
  darkMode: "class",
};
export default config;
