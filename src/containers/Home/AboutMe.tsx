/**
 * @file src/containers/Home/AboutMe.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * The "About Me" section for the homepage.
 */

"use client";

import { motion } from "motion/react";
import React, { JSX, useMemo } from "react";

/**
 * @component AboutMe
 * @description Renders the introductory "About Me" section with animated text and background elements.
 * @returns {JSX.Element} The rendered About Me section.
 */
const AboutMe = (): JSX.Element => {
  const text = useMemo(
    () =>
      "I'm a full-stack developer and hacker with 6+ years of experience. Usually, I hop around mini projects and help out others with theirs. Other than that, I partake in a variety of CTFs to keep my skills up to date and at the gym to prevent myself from becoming a gooner. Downtime activities include reading and making my own clothes. Check my LinkedIn for experiences and past projects.",
    [],
  );

  const sentences = useMemo(
    () => text.split(".").filter((sentence) => sentence.trim()),
    [text],
  );

  return (
    <section id="about" className="mb-16 mt-12 relative">
      <motion.h2
        className="text-6xl font-black mb-8 text-accent uppercase tracking-tighter transform -skew-x-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I'm Jeremy <span className="inline-block animate-wave pl-4">👋</span>
      </motion.h2>

      <div className="relative z-10">
        <motion.div
          className="bg-ctp-surface0 p-6 border-4 border-accent shadow-lg transform rotate-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sentences.map((sentence, index) => (
            <motion.p
              key={index}
              className="mb-2 last:mb-0 font-mono text-sm text-ctp-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              {sentence.trim()}
            </motion.p>
          ))}
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-ctp-blue opacity-10 rounded-full animate-bounce"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 goo-animation">
        <div className="goo-circle"></div>
        <div className="goo-circle"></div>
      </div>
    </section>
  );
};

export default AboutMe;
