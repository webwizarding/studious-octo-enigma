/**
 * @file app/cooking/[slug]/page.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Cooking post [slug] page. Delegates to PostClient with the slug,
 * indicating it's a cooking post by setting `isCooking` to true.
 */

import PostClient from "@/containers/blog/PostClient";

/**
 * @interface CookingPostProps
 * @description Props for the CookingPost component, containing the post slug.
 * @property {Promise<{ slug: string }>} params - Contains the slug of the cooking post.
 */
interface CookingPostProps {
  params: Promise<{ slug: string }>;
}

/**
 * @component CookingPost
 * @description Page component for displaying a single cooking post.
 * Fetches the slug from parameters and renders the PostClient component,
 * explicitly setting `isCooking` to `true` for cooking-related content.
 * @param {CookingPostProps} { params } - The props object containing the post slug.
 * @returns {JSX.Element} The rendered PostClient component.
 */
const CookingPost = async ({ params }: CookingPostProps) => {
  const { slug } = await params;
  return <PostClient params={{ slug, isCooking: true }} />;
};

export default CookingPost;
