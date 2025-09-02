/**
 * @file tailwind.config.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Tailwind CSS v4 configuration with Catppuccin theme support.
 */

import type { Config } from "tailwindcss";

const config: Omit<Config, "safelist"> & { safelist: string[] } = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        testred: "#ff0000",
        // These should work since --ctp-base exists
        base: "var(--ctp-base)",
        mantle: "var(--ctp-mantle)",
        crust: "var(--ctp-crust)",
        text: "var(--ctp-text)",
        subtext0: "var(--ctp-subtext0)",
        subtext1: "var(--ctp-subtext1)",
        overlay0: "var(--ctp-overlay0)",
        overlay1: "var(--ctp-overlay1)",
        overlay2: "var(--ctp-overlay2)",
        surface0: "var(--ctp-surface0)",
        surface1: "var(--ctp-surface1)",
        surface2: "var(--ctp-surface2)",

        // Palette colors
        rosewater: "var(--ctp-rosewater)",
        flamingo: "var(--ctp-flamingo)",
        pink: "var(--ctp-pink)",
        mauve: "var(--ctp-mauve)",
        red: "var(--ctp-red)",
        maroon: "var(--ctp-maroon)",
        peach: "var(--ctp-peach)",
        yellow: "var(--ctp-yellow)",
        green: "var(--ctp-green)",
        teal: "var(--ctp-teal)",
        sky: "var(--ctp-sky)",
        sapphire: "var(--ctp-sapphire)",
        blue: "var(--ctp-blue)",
        lavender: "var(--ctp-lavender)",

        // Dynamic accent
        accent: "var(--accent-color)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  safelist: [
    "bg-base",
    "bg-surface0",
    "bg-surface1",
    "text-text",
    "text-subtext0",
    "text-accent",
    "bg-accent",
    "border-accent",
    "ring-accent",
    "ring-text",
    "hover:bg-overlay0",
    "hover:text-overlay2",
    "text-yellow",
    "text-blue",
    "text-mauve",
    "text-green",
    "text-red",
    "text-peach",
    "text-pink",
  ],
};

export default config;
