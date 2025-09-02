/**
 * @file src/lib/posts.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Functions for fetching and parsing blog and cooking posts from a GitHub repository.
 */

import axios from "axios";
import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";

import type { Post } from "@/types";

const GITHUB_API_URL = "https://api.github.com/repos/dvh-sh/blog/contents";
const GITHUB_COOKING_URL = `${GITHUB_API_URL}/cooking`;
const LOCAL_COOKING_DIR = path.join(process.cwd(), "public", "cooking");
const EXCERPT_SEPARATOR = "<!-- end -->";
const WORDS_PER_MINUTE = 250;

/**
 * @function fetchAndParseMd
 * @description Fetches raw Markdown content from a URL and parses its front matter.
 * @param {string} url - The URL of the raw Markdown file.
 * @returns {Promise<matter.GrayMatterFile<string>>} A promise that resolves to the parsed matter object.
 */
const fetchAndParseMd = async (
  url: string,
): Promise<matter.GrayMatterFile<string>> => {
  const { data } = await axios.get(url);
  return matter(data, { excerpt_separator: EXCERPT_SEPARATOR });
};

/**
 * @function createPost
 * @description Constructs a Post object from a parsed Markdown file.
 * @param {string} slug - The slug of the post.
 * @param {matter.GrayMatterFile<string>} matterResult - The parsed matter object.
 * @param {boolean} [removeExcerpt=false] - Whether to remove the excerpt from the main content.
 * @returns {Post} The constructed Post object.
 */
const createPost = (
  slug: string,
  matterResult: matter.GrayMatterFile<string>,
  removeExcerpt = false,
): Post => {
  let content = matterResult.content;
  if (removeExcerpt) {
    content = content
      .replace(matterResult.excerpt || "", "")
      .replace(EXCERPT_SEPARATOR, "")
      .trim();
  }

  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE).toString();

  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    excerpt: matterResult.excerpt?.trim() || "",
    content,
    readingTime,
    cookingTime: matterResult.data.cookingTime,
    origin: matterResult.data.origin,
    type: matterResult.data.type,
  };
};

/**
 * @function getSortedPostsData
 * @description Fetches all posts, parses them, and sorts them by date in descending order.
 * @param {boolean} [isCooking=false] - Flag to fetch from the cooking directory.
 * @returns {Promise<Post[]>} A promise that resolves to an array of sorted posts.
 */
export const getSortedPostsData = async (
  isCooking = false,
): Promise<Post[]> => {
  try {
    if (isCooking) {
      const fileNames = await fs.readdir(LOCAL_COOKING_DIR);
      const mdFiles = fileNames.filter((f) => f.endsWith(".md"));
      const posts = await Promise.all(
        mdFiles.map(async (file) => {
          const filePath = path.join(LOCAL_COOKING_DIR, file);
          const fileContents = await fs.readFile(filePath, "utf8");
          const matterResult = matter(fileContents, {
            excerpt_separator: EXCERPT_SEPARATOR,
          });
          return createPost(file.replace(/\.md$/, ""), matterResult);
        }),
      );
      return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    const { data } = await axios.get(GITHUB_API_URL);
    const mdFiles = data.filter(
      (file: { name: string; type: string }) =>
        file.name.endsWith(".md") && file.type === "file" && file.name !== "cooking",
    );

    const posts = await Promise.all(
      mdFiles.map(async (file: { name: string; download_url: string }) => {
        const matterResult = await fetchAndParseMd(file.download_url);
        return createPost(file.name.replace(/\.md$/, ""), matterResult);
      }),
    );

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

/**
 * @function getPostData
 * @description Fetches and parses a single post by its slug.
 * @param {string} slug - The slug of the post to fetch.
 * @param {boolean} [isCooking=false] - Flag to fetch from the cooking directory.
 * @returns {Promise<Post | null>} A promise resolving to the Post object or null if not found.
 */
export const getPostData = async (
  slug: string,
  isCooking = false,
): Promise<Post | null> => {
  try {
    if (isCooking) {
      const fullPath = path.join(LOCAL_COOKING_DIR, `${slug}.md`);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const matterResult = matter(fileContents, {
        excerpt_separator: EXCERPT_SEPARATOR,
      });
      return createPost(slug, matterResult, true);
    }

    const { data } = await axios.get(`${GITHUB_API_URL}/${slug}.md`);
    const matterResult = await fetchAndParseMd(data.download_url);
    return createPost(slug, matterResult, true);
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
};
