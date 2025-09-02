/**
 * @file app/blog/[slug]/page.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Blog post [slug] page. Delegates to PostClient with the slug.
 * Includes isCooking flag to indicate if the post belongs in the cook book or not.
 */

import PostClient from "@/containers/blog/PostClient";

/**
 * @interface BlogPostProps
 * @description Props for the BlogPost component, containing the post slug.
 * @property {Promise<{ slug: string }>} params - Contains the slug of the blog post.
 */
interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

/**
 * @component BlogPost
 * @description Page component for displaying a single blog post.
 * Fetches the slug from parameters and renders the PostClient component,
 * explicitly setting `isCooking` to `false` for general blog content.
 * @param {BlogPostProps} { params } - The props object containing the post slug.
 * @returns {JSX.Element} The rendered PostClient component.
 */
const BlogPost = async ({ params }: BlogPostProps) => {
  const { slug } = await params;
  return <PostClient params={{ slug, isCooking: false }} />;
};

export default BlogPost;
