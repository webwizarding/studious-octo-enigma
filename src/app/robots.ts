/**
 * @file app/robots.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Generates the robots.txt file for web crawlers.
 */

import type { MetadataRoute } from "next";

/**
 * @function robots
 * @description Generates the robots.txt rules for the site.
 * Defines crawling permissions for various user agents like Googlebot and GPTBot.
 * @returns {MetadataRoute.Robots} The robots object.
 */
const robots = (): MetadataRoute.Robots => {
  const baseUrl = process.env.PRODUCTION_URL || "https://computations.cloud";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/static/",
          "*.json",
          "/*?*", // URLs with query parameters
          "/404",
        ],
        crawlDelay: 0,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
};

export default robots;
