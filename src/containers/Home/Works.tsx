/**
 * @file src/containers/Home/Works.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Container component for client engagement works section.
 */

"use client";

import WorkCard from "@/components/card/WorkCard";
import { motion } from "motion/react";
import type { Work } from "@/types";

interface WorksProps {
  data: Work[];
  keywords?: string[];
}

/**
 * @component Works
 * @description Renders client engagement projects with enhanced WorkCards.
 * @param {WorksProps} { data, keywords } - Work data and keywords.
 * @returns {JSX.Element} The rendered works section.
 */
const Works = ({ data, keywords }: WorksProps) => {
  return (
    <section id="works" className="mb-16">
      <motion.h2
        className="text-6xl font-black mb-8 text-accent uppercase tracking-tighter transform -skew-x-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Client Engagements
      </motion.h2>
      <div className="space-y-8">
        {data.map((work, index) => (
          <motion.div
            key={work.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <WorkCard {...work} keywords={keywords} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Works;
