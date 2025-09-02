/**
 * @file src/components/blog/PostContent.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Renders Markdown content with custom styling for blog posts.
 */

import React from "react";
import ReactMarkdown, { Components } from "react-markdown";

/**
 * @interface PostContentProps
 * @description Props for the PostContent component.
 * @property {string} content - The Markdown content to be rendered.
 */
interface PostContentProps {
  content: string;
}

/**
 * @component PostContent
 * @description A component that takes a Markdown string and renders it as HTML
 * with custom, styled components for elements like headers, paragraphs, and links.
 * @param {PostContentProps} { content } - The props object containing the post's content.
 * @returns {JSX.Element} The rendered Markdown content.
 */
export const PostContent: React.FC<PostContentProps> = ({ content }) => {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-black mb-6 text-accent uppercase tracking-wide transform -skew-x-2">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-4 text-accent uppercase tracking-wide">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-3 text-accent">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mb-2 text-accent">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="mb-6 text-ctp-subtext0 font-mono leading-relaxed">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-ctp-blue hover:text-accent transition-colors duration-200 border-b border-ctp-blue hover:border-accent"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-ctp-subtext0 font-mono">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic mb-6 text-ctp-subtext0 font-mono bg-ctp-surface0 py-2">
        {children}
      </blockquote>
    ),
    code: (props) => (
      <code
        className="bg-ctp-surface1 text-ctp-subtext0 rounded px-1"
        {...props}
      />
    ),
  };

  return (
    <div className="prose lg:prose-xl text-ctp-subtext0 max-w-none">
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
};
