/**
 * @file src/components/chip/TechChip.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A component for displaying a technology chip with an icon and name.
 */

import { motion } from "motion/react";
import React from "react";

import { getIcon, getTechBySlug } from "@/utils/tech.utils";

/**
 * @interface TechChipProps
 * @description Props for the TechChip component.
 * @property {string} slug - The slug of the technology to display.
 * @property {string} [className] - Optional additional class names.
 */
interface TechChipProps {
  slug: string;
  className?: string;
}

/**
 * @component TechChip
 * @description Renders a stylized chip for a technology, including its icon and name.
 * @param {TechChipProps} { slug, className } - The props for the component.
 * @returns {JSX.Element | null} The rendered tech chip, or null if the tech is not found.
 */
const TechChip: React.FC<TechChipProps> = ({ slug, className = "" }) => {
  const tech = getTechBySlug(slug);

  if (!tech) return null;

  const Icon = getIcon(tech.icon);

  const randomRotation = Math.random() * 2 - 1;
  const randomSkew = Math.random() * 2 - 1;

  return (
    <motion.span
      className={`
        inline-flex items-center ${tech.color} bg-ctp-surface1
        px-3 py-1 text-sm font-bold uppercase tracking-wider
        border-2 border-accent shadow-brutal cursor-default select-none
        ${className}
      `}
      style={{
        transform: `rotate(${randomRotation}deg) skew(${randomSkew}deg)`,
      }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="mr-2"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={18} />
      </motion.span>
      <span className="relative">
        <span className="relative z-10">{tech.title}</span>
        <motion.span
          className="absolute inset-0 opacity-20"
          animate={{
            scaleX: [1, 1.05, 1],
            scaleY: [1, 0.95, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </span>
    </motion.span>
  );
};

export default TechChip;
