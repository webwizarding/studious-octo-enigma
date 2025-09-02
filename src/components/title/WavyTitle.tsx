/**
 * @file src/components/title/WavyTitle.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A component that renders a title with a wavy animation effect on each letter.
 */

import React from "react";

/**
 * @interface WavyTitleProps
 * @description Props for the WavyTitle component.
 * @property {React.ReactNode} children - The text content to be animated.
 */
interface WavyTitleProps {
  children: React.ReactNode;
}

/**
 * @component WavyTitle
 * @description Renders an h1 title where each letter animates with a "wavy" effect.
 * @param {WavyTitleProps} { children } - The props for the component.
 * @returns {JSX.Element} The animated title.
 */
export const WavyTitle = ({ children }: WavyTitleProps) => (
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-8 md:mb-16 text-accent uppercase tracking-widest relative wavy-title">
    {(children ?? "")
      .toString()
      .split("")
      .map((char, index) => (
        <span
          key={index}
          className="inline-block wavy-letter"
          style={{
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {char}
        </span>
      ))}
  </h1>
);
