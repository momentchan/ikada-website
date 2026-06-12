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
        paper: "#f6f0e7",
        shell: "#fffaf1",
        ink: "#1f2a25",
        sea: "#2f6f73",
        tide: "#9dc6bd",
        moss: "#617d46",
        wood: "#9a6948",
        rust: "#b85f36",
        tarp: "#2d6fb6",
        charcoal: "#29302d",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgb(31 42 37 / 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
