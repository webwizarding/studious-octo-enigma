/**
 * @file src/models/blog.model.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Mongoose model for tracking blog and cooking post views.
 */

import mongoose from "mongoose";

/**
 * @schema blogSchema
 * @description Defines the Mongoose schema for a blog entry.
 * It tracks view counts for both standard blog posts and cooking recipes.
 */
const blogSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    enum: ["blog", "cooking"],
    default: "blog",
  },
});

/**
 * @model Blog
 * @description The Mongoose model for blog view tracking.
 * It uses a cached model if available, otherwise creates a new one.
 */
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
