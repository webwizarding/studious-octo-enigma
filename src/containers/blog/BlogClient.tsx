/**
 * @file src/containers/blog/BlogClient.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * The main client component for displaying the list of blog or cooking posts.
 */

import { WavyTitle } from "@/components/title/WavyTitle";
import { getSortedPostsData } from "@/lib/posts";
import { getAllBlogViews } from "@/lib/views";
import BlogFilters from "./BlogFilters";
import type { Post } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidate data every 60 seconds

interface BlogClientProps {
  isCooking?: boolean;
}

/**
 * @component BlogClient
 * @description Fetches and displays a list of posts with filtering and sorting controls.
 * It dynamically fetches either blog or cooking posts based on the isCooking prop.
 * @param {BlogClientProps} { isCooking } - The props for the component.
 * @returns {Promise<JSX.Element>} The rendered blog client component.
 */
const BlogClient = async ({ isCooking = false }: BlogClientProps) => {
  const posts = await getSortedPostsData(isCooking);
  const viewCounts = await getAllBlogViews(isCooking);

  const postsWithViews = posts.map((post: Post) => ({
    ...post,
    views: viewCounts[post.slug] || 0,
  }));

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-ctp-base to-ctp-mantle p-4 sm:p-6 md:pl-72 text-ctp-text overflow-hidden">
      <div className="max-w-4xl mx-auto mt-12 pt-4 relative z-10">
        <WavyTitle>{isCooking ? "Cookbook" : "Blog Posts"}</WavyTitle>
        <BlogFilters posts={postsWithViews} isCooking={isCooking} />
      </div>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#noise)"
            opacity="0.05"
          />
        </svg>
      </div>
    </div>
  );
};

export default BlogClient;
