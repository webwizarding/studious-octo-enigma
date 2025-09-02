/**
 * @file app/manifest.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Generates the web app manifest file for PWA capabilities.
 */

import type { MetadataRoute } from "next";

/**
 * @function manifest
 * @description Generates the manifest.json file for the application.
 * Defines PWA properties like name, colors, icons, and shortcuts.
 * @returns {MetadataRoute.Manifest} The manifest object.
 */
const manifest = (): MetadataRoute.Manifest => {
  return {
    name: "Jeremy's Portfolio",
    short_name: "Jeremy",
    description:
      "Full-stack developer portfolio showcasing code and creative work",
    start_url: "/",
    display: "standalone",
    background_color: "#1e1e2e",
    theme_color: "#f5c2e7",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon.png",
        sizes: "1840x1840",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["portfolio", "development", "blog"],
    lang: "en-US",
    dir: "ltr",
    shortcuts: [
      {
        name: "Blog",
        short_name: "Blog",
        description: "Read blog posts",
        url: "/blog",
        icons: [{ src: "/icons/blog.png", sizes: "96x96" }],
      },
    ],
  };
};

export default manifest;
