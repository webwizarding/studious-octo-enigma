/**
 * @file src/components/card/BlogCard.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A card component for displaying a blog post summary.
 */

import {
  FaArrowRight,
  FaBook,
  FaCalendarAlt,
  FaEye,
  FaGlobe,
  FaUtensils,
} from "react-icons/fa";
import Link from "next/link";
import React from "react";

import type { Post } from "@/types";

/**
 * @component BlogCard
 * @description Renders a preview card for a single blog or cooking post.
 * It displays metadata and a link to the full post.
 * @param {Post} props - The post data to display.
 * @returns {JSX.Element} The rendered blog card.
 */
const BlogCard: React.FC<Post> = ({
  slug,
  title,
  date,
  excerpt,
  views,
  readingTime,
  origin,
  type,
}) => {
  const isCooking = origin && type;

  return (
    <div className="bg-ctp-surface0 p-6 shadow-lg flex flex-col h-full relative overflow-hidden border-l-4 border-accent transition-all duration-300 hover:scale-[1.03] hover:-rotate-1">
      <div className="flex flex-col mb-4">
        <h3 className="text-2xl font-bold text-accent mb-2 uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex items-center text-ctp-subtext0 space-x-4 text-sm flex-wrap">
          <div className="flex items-center">
            <FaCalendarAlt size={12} className="mr-1" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <FaBook size={12} className="mr-1" />
            <span>~{readingTime} min</span>
          </div>
          <div className="flex items-center">
            <FaEye size={12} className="mr-1" />
            <span>{views} views</span>
          </div>
          {origin && (
            <div className="flex items-center">
              <FaGlobe size={12} className="mr-1" />
              <span>{origin}</span>
            </div>
          )}
          {type && (
            <div className="flex items-center">
              <FaUtensils size={12} className="mr-1" />
              <span>{type}</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-ctp-text mb-4 flex-grow font-mono text-sm">
        {excerpt}
      </p>
      <Link
        href={isCooking ? `/cooking/${slug}` : `/blog/${slug}`}
        className="text-ctp-blue hover:text-accent transition-colors duration-200 flex items-center group self-start"
      >
        <span className="mr-2 uppercase tracking-wide font-bold">
          Read more
        </span>
        <FaArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-2"
        />
      </Link>
      <div className="absolute top-0 right-0 w-16 h-16 bg-accent opacity-10 rounded-full -mr-8 -mt-8"></div>
    </div>
  );
};

/**
 * @component BlogCardSkeleton
 * @description Renders a skeleton loader for the BlogCard component.
 */
export const BlogCardSkeleton: React.FC = () => {
  return (
    <div className="bg-ctp-surface0 p-6 shadow-lg flex flex-col h-full relative overflow-hidden border-l-4 border-accent transition-all duration-300 animate-pulse">
      <div className="flex flex-col mb-4">
        <div className="h-6 bg-accent mb-2 w-3/4"></div>
        <div className="flex items-center text-ctp-subtext0 space-x-4 text-sm flex-wrap">
          <div className="flex items-center">
            <div className="h-4 bg-ctp-subtext0 w-16 mr-1"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 bg-ctp-subtext0 w-12 mr-1"></div>
          </div>
          <div className="flex items-center">
            <div className="h-4 bg-ctp-subtext0 w-16 mr-1"></div>
          </div>
        </div>
      </div>
      <div className="text-ctp-text mb-4 flex-grow font-mono text-sm">
        <div className="h-4 bg-ctp-text w-full mb-2"></div>
        <div className="h-4 bg-ctp-text w-5/6 mb-2"></div>
        <div className="h-4 bg-ctp-text w-4/6"></div>
      </div>
      <div className="text-ctp-blue hover:text-accent transition-colors duration-200 flex items-center group self-start">
        <div className="h-4 bg-ctp-blue w-24"></div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 bg-accent opacity-10 rounded-full -mr-8 -mt-8"></div>
    </div>
  );
};

export default BlogCard;
