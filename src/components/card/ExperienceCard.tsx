/**
 * @file src/components/card/ExperienceCard.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Mon, Aug 26 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Card component for displaying professional experience with duration and keyword emphasis.
 */

"use client";

import { motion } from "motion/react";
import React, { Fragment, useMemo } from "react";
import { FaBriefcase, FaClock, FaMapMarkerAlt } from "react-icons/fa";

import type { Experience } from "@/types";
import { calcDuration } from "@/utils/date.utils";
import { buildKeywordRegex, safeSegments } from "@/utils/text.utils";

interface ExperienceCardProps {
  exp: Experience;
  keywords?: string[];
  index?: number;
}

/**
 * @component ExperienceCard
 * @description Renders a single experience entry with brutal styling and keyword emphasis.
 * @param {ExperienceCardProps} props - Experience data and keywords.
 * @returns {JSX.Element} The rendered experience card.
 */
const ExperienceCard: React.FC<ExperienceCardProps> = ({
  exp,
  keywords,
  index = 0,
}) => {
  const duration = calcDuration(exp.startDate, exp.endDate);
  const kwRegex = buildKeywordRegex(keywords ?? []);
  const rotation = useMemo(() => (index % 2 === 0 ? 1 : -1), [index]);

  return (
    <motion.div
      className="relative bg-ctp-surface0 p-6 shadow-brutal border-4 border-accent overflow-hidden"
      initial={{ rotate: rotation, opacity: 0, x: rotation * -50 }}
      animate={{ rotate: rotation * 0.5, opacity: 1, x: 0 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
        <div>
          <h3 className="text-2xl font-black text-accent uppercase tracking-wider transform -skew-x-3">
            {String(exp.title ?? "")}
          </h3>
          <p className="text-lg text-ctp-text font-bold mt-1">
            {String(exp.company ?? "")}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-ctp-subtext0 text-sm">
            <FaClock size={12} />
            <span className="font-mono">
              {String(exp.startDate ?? "")} - {String(exp.endDate ?? "")}
            </span>
          </div>
          <motion.span
            className="inline-block text-xs font-black text-ctp-pink uppercase tracking-wider mt-1 px-2 py-1 bg-ctp-surface1"
            whileHover={{ scale: 1.08 }}
          >
            {duration}
          </motion.span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 text-xs text-ctp-subtext0 mb-4 font-mono">
        <div className="flex items-center gap-1">
          <FaBriefcase size={12} />
          <span>{String(exp.type ?? "")}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt size={12} />
          <span>{String(exp.location ?? "")}</span>
        </div>
      </div>

      {/* Description */}
      {exp.description && (
        <p className="text-sm text-ctp-text mb-4 leading-relaxed">
          {safeSegments(exp.description, kwRegex).map((seg, k) =>
            seg.bold ? (
              <motion.strong
                key={k}
                className="font-black text-ctp-pink inline-block"
                whileHover={{ scale: 1.05 }}
              >
                {seg.text}
              </motion.strong>
            ) : (
              <Fragment key={k}>{seg.text}</Fragment>
            ),
          )}
        </p>
      )}

      {/* Bullets */}
      {exp.bullets?.length ? (
        <ul className="space-y-2">
          {exp.bullets.map((bullet, idx) => {
            const segs = safeSegments(bullet, kwRegex);
            return (
              <motion.li
                key={idx}
                className="flex text-sm text-ctp-text"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <span className="text-ctp-pink font-black mr-2 flex-shrink-0">
                  →
                </span>
                <span>
                  {segs.map((s, k) =>
                    s.bold ? (
                      <motion.strong
                        key={k}
                        className="font-black text-ctp-pink inline-block"
                        whileHover={{ scale: 1.05 }}
                      >
                        {s.text}
                      </motion.strong>
                    ) : (
                      <Fragment key={k}>{s.text}</Fragment>
                    ),
                  )}
                </span>
              </motion.li>
            );
          })}
        </ul>
      ) : null}
    </motion.div>
  );
};

export default ExperienceCard;
