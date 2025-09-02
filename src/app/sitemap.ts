/**
 * @file app/sitemap.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Generates the sitemap.xml file dynamically.
 */

import type { MetadataRoute } from "next";

import { getSortedPostsData } from "@/lib/posts";

/**
 * @function sitemap
 * @description Asynchronously generates the sitemap by combining static pages with
 * dynamic routes from blog and cooking posts.
 * @returns {Promise<MetadataRoute.Sitemap>} A promise that resolves to the sitemap array.
 */
const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = process.env.PRODUCTION_URL || "https://computations.cloud";

  // Get dynamic content
  const [blogPosts, cookingPosts] = await Promise.all([
    getSortedPostsData(false),
    getSortedPostsData(true),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/software`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cooking`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // Cooking posts
  const cookingPages: MetadataRoute.Sitemap = cookingPosts.map((post) => ({
    url: `${baseUrl}/cooking/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));
  return [...staticPages, ...blogPages, ...cookingPages];
};

export default sitemap;
