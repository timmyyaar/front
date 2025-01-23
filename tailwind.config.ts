import type { Config } from "tailwindcss";

const config: Config = {
  prefix: "_",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#2b8afc",
      "primary-background": "#ecf0ff",
      "primary-light": "#c1dbff",
      "primary-dark": "#0073fc",
      "primary-disabled": "#7eb8ff",
      light: "#f9f9f9",
      "light-dark": "#f1f4ff",
      dark: "#13277e",
      gray: "#848484",
      "gray-lighter": "#a6a6a6",
      "gray-lighter-x2": "#c8c8c8",
      "gray-light": "#d2d2d2",
      "gray-dark": "#5c5c5c",
      white: "#f9f9f9",
      black: "#232323",
      danger: "#dc3545",
      warning: "#f9c630",
      success: "#29cc7e",
      transparent: "transparent",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "custom-light-dark": "0 4px 8px rgba(150, 160, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
