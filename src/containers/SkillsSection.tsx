/**
 * @file src/containers/SkillsSection.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A component for displaying a titled section of skills.
 */

"use client";

import { motion } from "motion/react";
import React, { useMemo } from "react";
import { FaCode } from "react-icons/fa";
import type { IconType } from "react-icons";

import { getIcon, getTechBySlug } from "@/utils/tech.utils";
import type { Tech } from "@/types/\\";

interface SkillsSectionProps {
  title: string;
  skills: string[];
}

/**
 * @component SkillIcon
 * @description Renders a single, animated skill icon with its name.
 */
const SkillIcon: React.FC<{ tech: Tech }> = ({ tech }) => {
  const Icon = useMemo(() => {
    const icon = getIcon(tech.icon);
    // Fallback to FaCode if icon not found
    if (!icon) {
      console.warn(`Icon not found for: ${tech.icon}`);
      return FaCode;
    }
    return icon as IconType;
  }, [tech.icon]);

  const randomRotation = useMemo(() => Math.random() * 2 - 1, []);

  return (
    <motion.div
      className="group relative"
      whileHover={{ scale: 1.05, rotate: 0 }}
      initial={{ rotate: randomRotation }}
    >
      <motion.div
        className="absolute inset-0 bg-accent opacity-20"
        animate={{ rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "transform" }}
      />
      <motion.div
        className={`flex items-center p-2 border ${tech.color} bg-ctp-surface0 shadow-brutal relative z-10 before:absolute before:inset-0 before:border before:border-accent before:-m-0.5 after:absolute after:inset-0 after:border after:border-accent after:-m-1`}
        whileHover={{ skewX: [0, 5, -5, 0] }}
        transition={{ duration: 0.3 }}
        style={{ willChange: "transform" }}
      >
        <Icon className={`${tech.color} text-2xl mr-2`} />
        <span className="text-xs font-bold uppercase tracking-wide text-ctp-subtext0">
          {tech.title}
        </span>
      </motion.div>
    </motion.div>
  );
};

/**
 * @component SkillsSection
 * @description Renders a section for a specific category of skills.
 * @param {SkillsSectionProps} { title, skills } - The props for the component.
 * @returns {JSX.Element} The rendered skills section.
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({ title, skills }) => {
  const skillItems = useMemo(
    () =>
      skills
        .map((slug) => {
          const tech = getTechBySlug(slug);
          if (!tech) {
            console.warn(`Tech not found for slug: ${slug}`);
            return null;
          }
          return (
            <motion.div
              key={slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <SkillIcon tech={tech} />
            </motion.div>
          );
        })
        .filter(Boolean), // Remove null values
    [skills],
  );

  return (
    <motion.div
      className="mb-8 select-none cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className="text-2xl font-black mb-6 text-accent uppercase tracking-wider transform -skew-x-6"
        whileHover={{ skewX: 0 }}
      >
        {title}
      </motion.h3>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {skillItems}
      </motion.div>
    </motion.div>
  );
};

export default SkillsSection;
