/**
 * @file app/software/page.tsx
 * @author Jeremy (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Main page for displaying software projects. Fetches software data from a GitHub repository,
 * displays it categorized, and includes skeleton loaders and animated elements.
 */

"use client";

import { flavors } from "@catppuccin/palette";
import { motion } from "motion/react";
import React, { useMemo, useContext } from "react";

import SoftwareCard from "@/components/card/SoftwareCard";
import { ThemeContext } from "@/providers/ThemeProvider";
import type { Software } from "@/types";


/**
 * @component SoftwarePage
 * @description Main component for the software page. Fetches and displays categorized software
 * information, including loading states and error handling.
 */
const SoftwarePage = () => {
  const { theme } = useContext(ThemeContext);

  const softwareList = useMemo<Record<string, Software[]>>(
    () => ({
      Essentials: [
        {
          title: "Brew",
          description: "macOS package manager",
          link: "https://brew.sh/",
          price: "Open Source",
          operatingSystem: "macOS",
          brewInstall:
            "/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"",
        },
        {
          title: "Raycast",
          description: "Launcher for macOS",
          link: "https://raycast.com/",
          price: "Freemium",
          operatingSystem: "macOS",
          brewInstall: "brew install --cask raycast",
        },
        {
          title: "Neovim",
          description: "Extensible Vim-based editor",
          link: "https://neovim.io/",
          price: "Open Source",
          operatingSystem: "macOS, Windows, Linux",
          brewInstall: "brew install neovim",
        },
        {
          title: "Librewolf browser",
          description: "Privacy-focused Firefox fork",
          link: "https://librewolf.net/",
          price: "Open Source",
          operatingSystem: "macOS, Windows, Linux",
        },
        {
          title: "JetBrains",
          description: "Suite of IDEs",
          link: "https://www.jetbrains.com/",
          price: "Paid",
          operatingSystem: "macOS, Windows, Linux",
        },
      ],
      General: [
        {
          title: "Obsidian",
          description: "Knowledge base app",
          link: "https://obsidian.md/",
          price: "Freemium",
          operatingSystem: "macOS, Windows, Linux",
          brewInstall: "brew install --cask obsidian",
        },
        {
          title: "Mullvad",
          description: "VPN service",
          link: "https://mullvad.net/",
          price: "Paid",
          operatingSystem: "macOS, Windows, Linux",
        },
        {
          title: "Ghostty",
          description: "GPU-accelerated terminal",
          link: "https://ghostty.org/",
          price: "Open Source",
          operatingSystem: "macOS, Linux",
          brewInstall: "brew install --cask ghostty",
        },
        {
          title: "filen",
          description: "Encrypted cloud storage",
          link: "https://filen.io/",
          price: "Freemium",
          operatingSystem: "macOS, Windows, Linux",
        },
      ],
      Utilities: [
        {
          title: "Rectangle",
          description: "Window manager",
          link: "https://rectangleapp.com/",
          price: "Open Source",
          operatingSystem: "macOS",
          brewInstall: "brew install --cask rectangle",
        },
        {
          title: "Hidden bar",
          description: "Menu bar organizer",
          link: "https://github.com/dwarvesf/hidden/",
          price: "Open Source",
          operatingSystem: "macOS",
          brewInstall: "brew install --cask hiddenbar",
        },
        {
          title: "calibre",
          description: "E-book management",
          link: "https://calibre-ebook.com/",
          price: "Open Source",
          operatingSystem: "macOS, Windows, Linux",
          brewInstall: "brew install --cask calibre",
        },
      ],
      Creatives: [
        {
          title: "Photopea",
          description: "Browser-based image editor",
          link: "https://www.photopea.com/",
          price: "Freemium",
          operatingSystem: "Web",
        },
        {
          title: "DaVinci Resolve",
          description: "Video editing suite",
          link:
            "https://www.blackmagicdesign.com/products/davinciresolve/",
          price: "Freemium",
          operatingSystem: "macOS, Windows, Linux",
        },
      ],
    }),
    [],
  );

  /**
   * @var renderedSoftwareList
   * @description Memoized React element that renders the categorized software list.
   * Iterates through software categories and displays them using SoftwareCard components.
   */
  const renderedSoftwareList = useMemo(() => {
    const entries = Object.entries(softwareList) as Array<[string, Software[]]>;
    return entries.map(([category, softwares], index) => {
      const list = Array.isArray(softwares) ? softwares : [];
      return (
        <motion.div
          key={category}
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-ctp-subtext0 uppercase tracking-wider transform skew-x-12">
            {category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {list.map((software, i) => (
              <motion.div
                key={`${category}-${software.title}-${i}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <SoftwareCard {...software} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    });
  }, [softwareList]);

  /**
   * @var accentColors
   * @description Memoized array of accent color names from the Catppuccin palette.
   * Used for dynamic color animations.
   */
  const accentColors = useMemo(() => {
    const currentFlavor = flavors[theme as keyof typeof flavors];
    if (!currentFlavor) return [];
    return Object.keys(currentFlavor.colors).filter(
      (color) => (currentFlavor.colors as any)[color]?.accent === true,
    );
  }, [theme]);

  /**
   * @var titleVariants
   * @description Memoized animation variants for the "Software" title.
   */
  const titleVariants = useMemo(() => {
    const currentFlavor = flavors[theme as keyof typeof flavors];
    if (!currentFlavor || accentColors.length === 0) return undefined;

    const colorValues = accentColors
      .map((color) => (currentFlavor.colors as any)[color]?.hex as string)
      .filter(Boolean);

    if (colorValues.length === 0) return undefined;

    return {
      animate: {
        color: colorValues,
        textShadow: colorValues.map((c) => `0 0 5px ${c}, 0 0 10px ${c}`),
        transition: {
          duration: colorValues.length * 2,
          repeat: Infinity,
          ease: "linear",
        },
      },
    } as const;
  }, [accentColors, theme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ctp-base to-ctp-mantle p-4 sm:p-6 md:p-8 md:ml-64 overflow-x-hidden relative">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-black my-8 py-8 text-accent text-center uppercase tracking-widest transform -skew-x-12"
          animate={titleVariants ? "animate" : undefined}
          variants={titleVariants}
        >
          Software
        </motion.h2>

        {renderedSoftwareList}
      </motion.div>
    </div>
  );
};

export default SoftwarePage;
