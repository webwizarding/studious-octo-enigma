/**
 * @file src/components/card/WorkCard.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Brutalist client work card: flat frame, keyword emphasis, clean tech row.
 */

"use client";

import { FaExternalLinkAlt, FaCode, FaCalendar } from "react-icons/fa";
import { motion } from "motion/react";
import React, { Fragment, useMemo } from "react";

import TechChip from "@/components/chip/TechChip";
import type { Work } from "@/types";
import {
  buildKeywordRegex,
  safeSegments,
  normalizeTech,
} from "@/utils/text.utils";

interface WorkCardProps extends Work {
  keywords?: string[];
  index?: number;
}

/**
 * @component WorkCard
 * @description Clean brutal work card, theme-agnostic, safe rendering.
 */
const WorkCard: React.FC<WorkCardProps> = ({
  title,
  shortDescription,
  technologies,
  link,
  date,
  keywords,
  index = 0,
}) => {
  const kwRegex = buildKeywordRegex(keywords ?? []);
  const techs = Array.isArray(technologies) ? normalizeTech(technologies) : [];
  const rotation = useMemo(() => (index % 2 === 0 ? -1 : 1), [index]);

  return (
    <motion.div
      className="relative bg-ctp-surface0 border-4 border-accent p-6 shadow-brutal overflow-hidden"
      initial={{ rotate: rotation * 1.5, opacity: 0, scale: 0.98 }}
      animate={{ rotate: rotation * 0.5, opacity: 1, scale: 1 }}
      whileHover={{ rotate: 0, scale: 1.02, x: 6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
        <h3 className="text-2xl font-black text-accent uppercase tracking-wider transform -skew-x-6">
          {String(title ?? "")}
        </h3>
        <div className="flex items-center gap-2 text-ctp-subtext0">
          <FaCalendar size={12} />
          <span className="font-mono text-[11px] font-bold">
            {String(date ?? "")}
          </span>
        </div>
      </div>

      <p className="text-ctp-text mb-4 font-mono text-sm leading-relaxed">
        {safeSegments(shortDescription, kwRegex).map((seg, k) =>
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
                <TechChip slug={tech.toLowerCase()} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {link && (
        <motion.a
          href={
            typeof link === "string" && link.startsWith("http")
              ? link
              : `https://${String(link ?? "")}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-wider
                     px-3 py-2 border-2 border-accent bg-transparent shadow-brutal
                     hover:bg-accent hover:text-ctp-base transition-colors"
          whileHover={{ scale: 1.03, rotate: -1 }}
          whileTap={{ scale: 0.96 }}
        >
          Live Demo
          <FaExternalLinkAlt size={14} />
        </motion.a>
      )}
    </motion.div>
  );
};

export default WorkCard;
