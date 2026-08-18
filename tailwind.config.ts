import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          0: "#070b14", // page background
          1: "#0f172a", // section background
          2: "#141d33", // card background
          3: "#1b2540", // raised / hover card
          border: "#243252",
        },
        ink: {
          primary: "#f4f6fb",
          secondary: "#aab4cc",
          muted: "#6b7590",
        },
        // Validated categorical dark palette (dataviz skill, unchanged hexes)
        series: {
          blue: "#3987e5",
          orange: "#d95926",
          aqua: "#199e70",
          yellow: "#c98500",
          magenta: "#d55181",
          green: "#008300",
          violet: "#9085e9",
          red: "#e66767",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
