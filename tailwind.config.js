/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
import { shadcnTheme } from "@shadcn/ui";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}", // importante
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  presets: [shadcnTheme()],
  darkMode: "class",
  plugins: [tailwindcssAnimate],
};

export default config;
