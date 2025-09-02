/**
 * @file src/containers/blog/PostClient.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Client component for rendering a single blog or cooking post.
 */

import { LicenseInfo } from "@/components/blog/LicenseInfo";
import { PostContent } from "@/components/blog/PostContent";
import { PostHeader } from "@/components/blog/PostHeader";
import { getPostData } from "@/lib/posts";
import { updateViewCount } from "@/lib/views";

export const dynamic = "force-dynamic";

interface PostClientProps {
  params: { slug: string; isCooking?: boolean };
}

/**
 * @component PostClient
 * @description Fetches the data for a single post, updates its view count, and renders the content.
 * @param {PostClientProps} { params } - The props for the component.
 * @returns {Promise<JSX.Element>} The rendered post page.
 */
const PostClient = async ({ params }: PostClientProps) => {
  const isCooking = params.isCooking || false;
  const post = await getPostData(params.slug, isCooking);

  let views = 0;

  if (post) {
    try {
      const entry = await updateViewCount(params.slug, isCooking);
      views = entry.blog.views;
    } catch (error) {
      console.error("Failed to update view count:", error);
    }
  }

  if (!post) {
    return (
      <div className="w-full min-h-screen bg-ctp-base p-4 md:p-8 md:pl-72 text-ctp-text flex items-center justify-center">
        <div className="text-center p-8 bg-ctp-surface0 rounded-lg shadow-lg transform -skew-x-2">
          <p className="text-2xl font-bold text-accent mb-2">Post not found.</p>
          <p className="text-ctp-subtext0">You might be rate-limited.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-ctp-base to-ctp-mantle p-4 sm:p-6 md:pl-72 py-8">
      <div className="max-w-4xl mx-auto mt-8 relative">
        <PostHeader
          title={post.title}
          date={post.date}
          views={views}
          isCooking={isCooking}
          origin={post.origin}
          type={post.type}
          cookingTime={post.cookingTime}
        />
        <PostContent content={post.content} />
        <LicenseInfo />
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
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
    </div>
  );
};

export default PostClient;
