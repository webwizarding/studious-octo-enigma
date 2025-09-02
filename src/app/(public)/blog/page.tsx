/**
 * @file src/app/blog/page.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Blog index page. Renders BlogClient (isCooking: false).
 */

import BlogClient from "@/containers/blog/BlogClient";

/**
 * @component BlogPage
 * @description Main page component for the blog section.
 * Renders the BlogClient component, configured for general blog content
 * by setting the `isCooking` prop to `false`.
 */
const BlogPage = () => {
  return <BlogClient isCooking={false} />;
};

export default BlogPage;
