/**
 * @file src/containers/blog/BlogFilters.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Optimized blog filtering with deferred search for smooth typing.
 * Uses memoization to prevent unnecessary re-renders.
 */

"use client";

import { memo, useDeferredValue, useMemo, useState } from "react";
import { FaGlobe, FaSearch, FaSort, FaUtensils } from "react-icons/fa";

import BlogCard from "@/components/card/BlogCard";
import type { Post } from "@/types";

type SortOption = "newest" | "oldest" | "most-views";

interface FilterControls {
  search: string;
  sortBy: SortOption;
  origin: string;
  type: string;
}

interface BlogFiltersProps {
  posts: Post[];
  isCooking: boolean;
}

/**
 * @component SelectButton
 * @description Memoized dropdown button for filter controls.
 */
const SelectButton = memo(
  ({
    label,
    value,
    options,
    onChange,
    icon: Icon,
  }: {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    icon: React.ComponentType<{ className?: string }>;
  }) => (
    <div className="relative group">
      <button
        className="w-full md:w-auto bg-ctp-surface0 px-4 py-2 border-2 border-accent hover:border-ctp-blue transition-colors duration-200 transform hover:-rotate-1 hover:scale-105 flex items-center justify-between space-x-2 font-mono uppercase tracking-tight shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] active:transform active:translate-x-1 active:translate-y-1"
        aria-label={label}
      >
        <Icon className="w-4 h-4" />
        <span>{value}</span>
      </button>

      <div className="absolute -bottom-4 left-0 w-full h-8 bg-transparent" />

      <div className="absolute z-50 w-full md:w-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
        <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
        <div className="bg-ctp-surface0 border-2 border-accent shadow-lg transform -rotate-1 hover:rotate-0 transition-transform duration-200">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={`w-full px-4 py-2 text-left hover:bg-ctp-blue hover:text-ctp-base transition-colors duration-200 font-mono uppercase tracking-tight ${
                value === option ? "bg-accent text-ctp-base" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  ),
);

SelectButton.displayName = "SelectButton";

/**
 * @component BlogFilters
 * @description Main filter component with optimized search and sorting.
 * Uses deferred values to keep UI responsive during filtering.
 */
const BlogFilters = ({ posts, isCooking }: BlogFiltersProps) => {
  const [filters, setFilters] = useState<FilterControls>({
    search: "",
    sortBy: "newest",
    origin: "All",
    type: "All",
  });

  // Defer search value for smooth typing
  const deferredSearch = useDeferredValue(filters.search);

  const origins = useMemo(() => {
    if (!isCooking) return [];
    const uniqueOrigins = new Set(
      posts.map((post) => post.origin).filter(Boolean),
    );
    return ["All", ...Array.from(uniqueOrigins)];
  }, [posts, isCooking]);

  const types = useMemo(() => {
    if (!isCooking) return [];
    const uniqueTypes = new Set(posts.map((post) => post.type).filter(Boolean));
    return ["All", ...Array.from(uniqueTypes)];
  }, [posts, isCooking]);

  const filteredPosts = useMemo(() => {
    const searchLower = deferredSearch.toLowerCase();

    return posts
      .filter((post) => {
        const matchesSearch =
          !searchLower ||
          post.title?.toLowerCase().includes(searchLower) ||
          post.excerpt?.toLowerCase().includes(searchLower);

        const matchesOrigin =
          filters.origin === "All" ||
          post.origin?.toUpperCase() === filters.origin.toUpperCase();

        const matchesType =
          filters.type === "All" ||
          post.type?.toUpperCase() === filters.type.toUpperCase();

        return matchesSearch && matchesOrigin && matchesType;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        switch (filters.sortBy) {
          case "oldest":
            return dateA - dateB;
          case "most-views":
            return (b.views || 0) - (a.views || 0);
          case "newest":
          default:
            return dateB - dateA;
        }
      });
  }, [posts, deferredSearch, filters.origin, filters.type, filters.sortBy]);

  const isSearching = filters.search !== deferredSearch;

  return (
    <>
      <div className="mb-8 space-y-6">
        <div className="relative transform hover:-rotate-1 transition-transform duration-200">
          <input
            type="text"
            placeholder="SEARCH POSTS..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="w-full p-3 pl-12 bg-ctp-surface0 border-2 border-accent hover:border-ctp-blue focus:border-ctp-blue focus:outline-none font-mono uppercase tracking-tight shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] transition-all duration-200"
            aria-label="Search posts"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-ctp-subtext0 w-5 h-5 pointer-events-none" />

          {isSearching && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-accent border-t-transparent rounded-full" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="bg-ctp-surface0 px-4 py-2 border-2 border-accent inline-block font-mono text-ctp-subtext0 uppercase tracking-tight transform -rotate-1">
            SHOWING {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "POST" : "POSTS"}
          </span>

          <SelectButton
            label="Sort"
            value={
              filters.sortBy === "newest"
                ? "NEWEST FIRST"
                : filters.sortBy === "oldest"
                  ? "OLDEST FIRST"
                  : "MOST VIEWS"
            }
            options={["NEWEST FIRST", "OLDEST FIRST", "MOST VIEWS"]}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                sortBy:
                  value === "NEWEST FIRST"
                    ? "newest"
                    : value === "OLDEST FIRST"
                      ? "oldest"
                      : "most-views",
              }))
            }
            icon={FaSort}
          />

          {isCooking && origins.length > 1 && (
            <SelectButton
              label="Origin"
              value={filters.origin.toUpperCase()}
              options={origins.map((o) => o!.toUpperCase())}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  origin: value,
                }))
              }
              icon={FaGlobe}
            />
          )}

          {isCooking && types.length > 1 && (
            <SelectButton
              label="Type"
              value={filters.type.toUpperCase()}
              options={types.map((t) => t!.toUpperCase())}
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  type: value,
                }))
              }
              icon={FaUtensils}
            />
          )}
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="space-y-12">
          {filteredPosts.map((post, index) => (
            <div
              key={post.slug}
              className="blog-card-container"
              style={{
                animationDelay: `${Math.min(0.1 * index, 0.5)}s`,
                willChange: "transform, opacity",
              }}
            >
              <BlogCard {...post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-ctp-surface0 border-2 border-accent transform -rotate-1">
          <p className="text-lg text-ctp-subtext0 font-mono uppercase tracking-tight">
            NO POSTS FOUND ¯\_(ツ)_/¯
          </p>
        </div>
      )}
    </>
  );
};

export default BlogFilters;
