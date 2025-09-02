/**
 * @file src/components/theme/ThemeSwitcher.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A component for switching between color themes and accent colors.
 */

"use client";

import { flavors } from "@catppuccin/palette";
import React, { useState, useRef, useCallback, useContext } from "react";

import { ThemeContext } from "@/providers/ThemeProvider";
import type { Catppuccin } from "@/types";

/**
 * @component ThemeSwitcher
 * @description Renders controls for changing the application's theme and accent color.
 */
export const ThemeSwitcher = () => {
  const { theme, setTheme, accent, setAccent } = useContext(ThemeContext);
  const [showPalette, setShowPalette] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const themes: { name: Catppuccin["flavor"]; emoji: string }[] = [
    { name: "latte", emoji: "🌻" },
    { name: "frappe", emoji: "🪴" },
    { name: "macchiato", emoji: "🌺" },
    { name: "mocha", emoji: "🌿" },
  ];

  const accentColors = Object.keys(flavors.mocha.colors).filter(
    (color) => (flavors.mocha.colors as any)[color].accent,
  );

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowPalette(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setShowPalette(false);
    }, 300);
  }, []);

  // Get the current flavor for dynamic color display
  const currentFlavor = flavors[theme as keyof typeof flavors];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showPalette && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-ctp-surface0 border border-ctp-surface1 rounded-lg shadow-lg flex flex-wrap gap-2 z-10 w-48">
          {accentColors.map((color) => {
            const colorValue =
              currentFlavor.colors[color as keyof typeof currentFlavor.colors];
            return (
              <button
                key={color}
                onClick={() => setAccent(color)}
                className={`w-6 h-6 rounded-full transition-transform duration-300 hover:scale-110 ${
                  color === accent ? "ring-2 ring-ctp-text" : ""
                }`}
                style={{ backgroundColor: colorValue?.hex || "#000" }}
                aria-label={`Set accent color to ${color}`}
              />
            );
          })}
        </div>
      )}
      <div className="flex items-center space-x-4">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`p-2 rounded-full bg-ctp-surface0 text-ctp-text hover:bg-ctp-overlay0 hover:text-ctp-overlay2 transition-all duration-300 hover:rotate-45 ${
              theme === t.name ? "ring-2 ring-accent" : ""
            }`}
            aria-label={`Switch to ${t.name} theme`}
          >
            {t.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
