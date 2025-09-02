/**
 * @file src/providers/ThemeProvider.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Provides theme and accent color management for the application.
 */

"use client";

import { flavors } from "@catppuccin/palette";
import React, { useState, useEffect, createContext } from "react";

import type { Catppuccin } from "@/types";

/**
 * @interface ThemeContextType
 * @description Defines the shape of the theme context.
 */
interface ThemeContextType {
  theme: Catppuccin["flavor"];
  setTheme: (theme: Catppuccin["flavor"]) => void;
  accent: string;
  setAccent: (accent: string) => void;
}

/**
 * @const ThemeContext
 * @description React context for providing theme state and setters.
 */
export const ThemeContext = createContext<ThemeContextType>(null!);

/**
 * @interface ThemeProviderProps
 * @description Props for the ThemeProvider component.
 */
interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * @component ThemeProvider
 * @description A provider component that manages the application's theme.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Catppuccin["flavor"]>("mocha");
  const [accent, setAccent] = useState<string>("pink");

  useEffect(() => {
    // Apply theme immediately
    const html = document.documentElement;
    const flavor = flavors[theme as keyof typeof flavors];

    // Set all the CSS variables manually (bypass the plugin)
    const setVar = (name: string, value: string) => {
      html.style.setProperty(name, value);
    };

    // Set theme class
    html.classList.remove("latte", "frappe", "macchiato", "mocha");
    html.classList.add(theme);
    html.classList.add("dark");

    // Manually set all Catppuccin CSS variables
    setVar("--ctp-base", flavor.colors.base.hex);
    setVar("--ctp-mantle", flavor.colors.mantle.hex);
    setVar("--ctp-crust", flavor.colors.crust.hex);
    setVar("--ctp-text", flavor.colors.text.hex);
    setVar("--ctp-subtext0", flavor.colors.subtext0.hex);
    setVar("--ctp-subtext1", flavor.colors.subtext1.hex);
    setVar("--ctp-overlay0", flavor.colors.overlay0.hex);
    setVar("--ctp-overlay1", flavor.colors.overlay1.hex);
    setVar("--ctp-overlay2", flavor.colors.overlay2.hex);
    setVar("--ctp-surface0", flavor.colors.surface0.hex);
    setVar("--ctp-surface1", flavor.colors.surface1.hex);
    setVar("--ctp-surface2", flavor.colors.surface2.hex);

    // Set palette colors
    setVar("--ctp-rosewater", flavor.colors.rosewater.hex);
    setVar("--ctp-flamingo", flavor.colors.flamingo.hex);
    setVar("--ctp-pink", flavor.colors.pink.hex);
    setVar("--ctp-mauve", flavor.colors.mauve.hex);
    setVar("--ctp-red", flavor.colors.red.hex);
    setVar("--ctp-maroon", flavor.colors.maroon.hex);
    setVar("--ctp-peach", flavor.colors.peach.hex);
    setVar("--ctp-yellow", flavor.colors.yellow.hex);
    setVar("--ctp-green", flavor.colors.green.hex);
    setVar("--ctp-teal", flavor.colors.teal.hex);
    setVar("--ctp-sky", flavor.colors.sky.hex);
    setVar("--ctp-sapphire", flavor.colors.sapphire.hex);
    setVar("--ctp-blue", flavor.colors.blue.hex);
    setVar("--ctp-lavender", flavor.colors.lavender.hex);

    // Set accent
    const accentColor = flavor.colors[accent as keyof typeof flavor.colors];
    if (accentColor) {
      setVar("--accent-color", accentColor.hex);
    }

    setMounted(true);
  }, [theme, accent]);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};
