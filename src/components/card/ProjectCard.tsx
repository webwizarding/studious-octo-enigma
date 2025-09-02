/**
 * @file src/components/card/ProjectCard.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Brutalist project card: flat frame, keyword emphasis, clean tech row.
 */

"use client";

import { motion } from "motion/react";
import React, { Fragment, useMemo } from "react";
import { FaExternalLinkAlt, FaGithub, FaCode } from "react-icons/fa";

import TechChip from "@/components/chip/TechChip";
import type { Project } from "@/types";
import { buildKeywordRegex, safeSegments } from "@/utils/text.utils";

interface ProjectCardProps extends Project {
  keywords?: string[];
  index?: number;
}

/**
 * @component ProjectLink
 * @description Minimal brutal link button.
 */
const ProjectLink: React.FC<{
  href?: string;
  icon: React.ReactNode;
  text: string;
  primary?: boolean;
}> = ({ href, icon, text, primary = false }) => {
  if (!href) return null;

  return (
    <motion.a
      href={href}
      className={`inline-flex items-center gap-2 font-black uppercase tracking-wider
        px-3 py-2 border-2 transition-all duration-200 shadow-brutal
        ${
          primary
            ? "border-accent bg-accent text-ctp-base hover:bg-transparent hover:text-accent"
            : "border-accent text-accent hover:bg-accent hover:text-ctp-base"
        }`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View project ${text.toLowerCase()}`}
      whileHover={{ scale: 1.03, rotate: -1 }}
      whileTap={{ scale: 0.96 }}
    >
      {icon}
      <span className="text-xs">{text}</span>
    </motion.a>
  );
};

/**
 * @component ProjectCard
 * @description Brutalist project card with emphasis and clean tech row (safe rendering).
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  demoLink,
  sourceLink,
  sourceLinks,
  keywords,
  index = 0,
}) => {
  const rotation = useMemo(() => (index % 3) - 1, [index]);
  const kwRegex = buildKeywordRegex(keywords ?? []);
  const techs = Array.isArray(technologies) ? technologies : [];
  const links = Array.isArray(sourceLinks) && sourceLinks.length > 0
    ? sourceLinks
    : typeof sourceLink === "string"
      ? [sourceLink]
      : [];

  return (
    <motion.div
      className="relative bg-ctp-surface0 border-4 border-accent p-6 shadow-brutal overflow-hidden flex flex-col h-full"
      initial={{ rotate: rotation * 1.5, opacity: 0, scale: 0.98 }}
      animate={{ rotate: rotation * 0.5, opacity: 1, scale: 1 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <h3 className="text-2xl font-black text-accent mb-3 uppercase tracking-wider transform -skew-x-6">
        {String(title ?? "")}
      </h3>

      <p className="text-ctp-text mb-4 font-mono text-sm leading-relaxed flex-grow">
        {safeSegments(description, kwRegex).map((seg, k) =>
          seg.bold ? (
            <strong key={k} className="font-black text-ctp-pink inline-block">
              {seg.text}
            </strong>
          ) : (
            <Fragment key={k}>{seg.text}</Fragment>
          ),
        )}
      </p>

      {techs.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <FaCode className="text-ctp-subtext0" size={12} />
            <span className="text-[11px] font-bold text-ctp-subtext0 uppercase tracking-wider">
              Built with
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech, idx) => (
              <motion.div
                key={`${title}-${tech}-${idx}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <TechChip slug={tech} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-auto">
        <ProjectLink
          href={typeof demoLink === "string" ? demoLink : undefined}
          icon={<FaExternalLinkAlt size={14} />}
          text="Demo"
          primary
        />
        {links.map((link, idx) => (
          <ProjectLink
            key={link}
            href={typeof link === "string" ? link : undefined}
            icon={<FaGithub size={14} />}
            text={links.length > 1 ? `Code ${idx + 1}` : "Code"}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
