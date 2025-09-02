/**
 * @file src/lib/views.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Functions for tracking and retrieving view counts for blog and cooking posts.
 */

import { cache } from "react";

import Blog from "@/models/blog.model";
import connectDB from "@/utils/db.utils";

/**
 * @function updateViewCount
 * @description Increments the view count for a specific post. If the post doesn't exist
 * in the database, it creates a new entry.
 * @param {string} slug - The slug of the post to update.
 * @param {boolean} [isCooking=false] - Flag to specify if the post is a cooking recipe.
 * @returns {Promise<{ blog: { slug: string; views: number; type: string } }>} An object containing the updated post data.
 * @throws Will throw an error if the database operation fails.
 */
export const updateViewCount = async (slug: string, isCooking = false) => {
  try {
    await connectDB();
    const type = isCooking ? "cooking" : "blog";
    const blog = await Blog.findOne({ slug, type });

    if (!blog) {
      const newBlog = new Blog({ slug, views: 1, type });
      await newBlog.save();
      return { blog: { slug, views: 1, type } };
    } else {
      blog.views++;
      await blog.save();
      return { blog: { slug: blog.slug, views: blog.views, type: blog.type } };
    }
  } catch (error) {
    console.error("Error updating view count:", error);
    throw error;
  }
};

/**
 * @function getAllBlogViews
 * @description Retrieves all view counts for either blog posts or cooking recipes.
 * The result is cached to reduce database queries.
 * @param {boolean} [isCooking=false] - Flag to specify whether to fetch views for cooking recipes.
 * @returns {Promise<Record<string, number>>} A promise that resolves to an object mapping slugs to view counts.
 */
export const getAllBlogViews = cache(async (isCooking = false) => {
  try {
    await connectDB();
    const type = isCooking ? "cooking" : "blog";
    const blogs = await Blog.find({ type }, "slug views");

    return blogs.reduce(
      (acc: Record<string, number>, blog: { slug: string; views: number }) => {
        acc[blog.slug] = blog.views;
        return acc;
      },
      {},
    );
  } catch (error) {
    console.error("Error fetching blog views:", error);
    return {};
  }
});
