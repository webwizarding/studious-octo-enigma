/**
 * @file src/containers/Home/Experience.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Mon, Aug 26 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Container component for professional experience section.
 */

"use client";

import { motion } from "motion/react";
import React from "react";
import ExperienceCard from "@/components/card/ExperienceCard";
import type { Experience as ExperienceType } from "@/types";

interface ExperienceProps {
  data: ExperienceType[];
  keywords?: string[];
}

/**
 * @component Experience
 * @description Renders the experience section with all professional positions.
 * @param {ExperienceProps} { data, keywords } - Experience data and keywords.
 * @returns {JSX.Element} The rendered experience section.
 */
const Experience = ({ data, keywords }: ExperienceProps) => {
  const items = Array.isArray(data) ? data : [];

  return (
    <section id="experience" className="mb-16">
      <motion.h2
        className="text-6xl font-black mb-8 text-accent uppercase tracking-tighter transform -skew-x-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </motion.h2>
      <div className="space-y-8">
        {items.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.title}-${index}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <ExperienceCard exp={exp} keywords={keywords} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
