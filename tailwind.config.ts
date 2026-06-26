import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f4efe5",
        shell: "#fffaf0",
        bone: "#e8dccb",
        ink: "#1f2a25",
        sea: "#2e6870",
        tide: "#93bdb6",
        moss: "#5e7447",
        wood: "#936542",
        rope: "#c4a36d",
        rust: "#ad5a35",
        tarp: "#3d6a8a",
        charcoal: "#29302d",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "var(--font-sans-ja)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      ringColor: {
        DEFAULT: "rgb(31 42 37 / 0.12)",
      },
      boxShadow: {
        soft: "0 18px 60px rgb(31 42 37 / 0.1)",
        lift: "0 24px 70px rgb(31 42 37 / 0.15)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        28: "7rem",
      },
    },
  },
  plugins: [],
};

export default config;
