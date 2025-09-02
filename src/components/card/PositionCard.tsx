/**
 * @file src/components/card/PositionCard.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A card component for displaying a professional position or experience.
 */

import { FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "motion/react";
import React from "react";

import TechChip from "@/components/chip/TechChip";
import type { Position } from "@/types";

/**
 * @component PositionCard
 * @description Renders a card for a single professional position, including details and a link.
 * @param {Position} props - The position data to display.
 * @returns {JSX.Element} The rendered position card.
 */
const PositionCard: React.FC<Position> = ({
  title,
  shortDescription,
  technologies,
  link,
  positionTitle,
  date,
}) => {
  return (
    <motion.div
      className="bg-ctp-surface0 p-6 shadow-md hover:shadow-lg transition-shadow duration-300 transform -skew-x-2 border-l-4 border-accent"
      whileHover={{ scale: 1.01, x: 5 }}
    >
      <div className="flex flex-col mb-4">
        <h3 className="text-3xl font-bold text-accent mb-1 uppercase tracking-wide">
          {title}
        </h3>
        <span className="text-lg text-ctp-subtext0 font-mono">{date}</span>
      </div>
      <h4 className="text-2xl font-semibold text-ctp-text mb-3 transform skew-x-2">
        {positionTitle}
      </h4>
      <p className="text-ctp-text mb-4 text-base font-mono leading-relaxed">
        {shortDescription}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <TechChip key={tech} slug={tech} />
        ))}
      </div>
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-accent hover:underline text-lg font-bold"
        whileHover={{ scale: 1.05, x: 5 }}
      >
        Company Website
        <FaExternalLinkAlt className="ml-2" size={18} />
      </motion.a>
    </motion.div>
  );
};

export default PositionCard;
