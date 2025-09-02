/**
 * @file src/lib/portfolioCache.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Sun, Aug 25 2025
 * @updated Sun, Aug 25 2025
 *
 * @description
 * Server-side cache for single portfolio.json data source.
 */

import { unstable_cache } from "next/cache";
import type { PortfolioData } from "@/types";

// Correct URL for portfolio.json
const GITHUB_RAW_URL =
  "https://raw.githubusercontent.com/dvh-sh/.github/main/portfolio.json";
const CACHE_TIME = 300; // 5 minutes in seconds

/**
 * @function fetchPortfolioData
 * @description Fetches and caches all portfolio data from a single JSON file.
 * This is a server-side cache that automatically refreshes every 5 minutes.
 */
export const fetchPortfolioData = unstable_cache(
  async (): Promise<PortfolioData> => {
    try {
      const response = await fetch(GITHUB_RAW_URL, {
        next: { revalidate: CACHE_TIME },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch portfolio.json: ${response.status}`);
      }

      const text = await response.text();
      // Clean trailing commas which can cause parsing errors
      const cleanedText = text.replace(/,\s*([\]}])/g, "$1");
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      // Return a fallback object on error to prevent site from crashing
      return {
        profile: {},
        experience: [],
        works: [],
        education: [],
        projects: [],
        skills: [],
        software: {},
      } as unknown as PortfolioData;
    }
  },
  ["portfolio-data"], // Unique cache key
  {
    revalidate: CACHE_TIME,
    tags: ["portfolio"], // Tag for on-demand revalidation if needed
  },
);
