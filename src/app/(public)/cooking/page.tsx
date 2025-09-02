/**
 * @file src/app/cooking/page.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Cooking index page. Renders BlogClient with isCooking set to true.
 */

import BlogClient from "@/containers/blog/BlogClient";

/**
 * @component CookingPage
 * @description Main page component for the cooking section.
 * Renders the BlogClient component, specifically tailored for cooking-related content
 * by setting the `isCooking` prop to `true`.
 */
const CookingPage = () => {
  return <BlogClient isCooking={true} />;
};

export default CookingPage;
