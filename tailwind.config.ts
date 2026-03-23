import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        atkinson: ["var(--font-atkinson)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "pt-sm": "0 1px 2px rgba(8,145,178,0.10)",
        "pt-md": "0 4px 12px rgba(8,145,178,0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
