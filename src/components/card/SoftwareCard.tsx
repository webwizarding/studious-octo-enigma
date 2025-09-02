/**
 * @file src/components/card/SoftwareCard.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Brutalist software card with safe rendering and subtle interactions.
 */

"use client";

import { AnimatePresence, motion } from "motion/react";
import { FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import React, { useState, useCallback, useMemo } from "react";

import type { Software } from "@/types";

/**
 * @component SoftwareCard
 * @description Renders a brutalist card for software, with price, OS, link and optional brew install copy.
 * @param {Software} props - The software data to display.
 * @returns {JSX.Element} The rendered software card.
 */
const SoftwareCard: React.FC<Software> = React.memo(
  ({ title, description, link, price, brewInstall, operatingSystem }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = useCallback((text: string) => {
      try {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      } catch (e) {
        console.error("Clipboard write failed:", e);
      }
    }, []);

    const containerVariants = useMemo(
      () => ({
        initial: { rotate: -1, scale: 0.99, opacity: 0.95 },
        animate: { rotate: -0.5, scale: 1, opacity: 1 },
        hover: { rotate: 0, scale: 1.02, x: 6 },
      }),
      [],
    );

    const safeTitle = String(title ?? "");
    const safeDesc = String(description ?? "");
    const safeLink =
      typeof link === "string" && link
        ? link.startsWith("http")
          ? link
          : `https://${link}`
        : undefined;
    const safePrice = String(price ?? "");
    const osRaw = typeof operatingSystem === "string" ? operatingSystem : "";
    const osTags = osRaw
      ? osRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    return (
      <motion.div
        className="relative bg-ctp-surface0 border-4 border-accent p-6 shadow-brutal overflow-hidden flex flex-col h-full"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Title + Price */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-black text-accent uppercase tracking-wider transform -skew-x-6">
            {safeTitle}
          </h3>
          {safePrice && (
            <span className="inline-block bg-ctp-surface1 text-ctp-subtext0 px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-accent">
              {safePrice}
            </span>
          )}
        </div>

        {/* Description */}
        {safeDesc && (
          <p className="text-ctp-text mb-4 flex-grow font-mono text-sm leading-relaxed">
            {safeDesc}
          </p>
        )}

        {/* OS + Actions */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1 text-[11px] font-black uppercase tracking-wider text-ctp-subtext0">
            {osTags.length ? (
              osTags.map((os, idx) => (
                <span
                  key={`${safeTitle}-os-${idx}`}
                  className="px-2 py-0.5 border border-accent bg-ctp-surface1"
                >
                  {os}
                </span>
              ))
            ) : (
              <span className="px-2 py-0.5 border border-accent bg-ctp-surface1">
                N/A
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {typeof brewInstall === "string" && brewInstall.trim() && (
              <motion.button
                onClick={() => copyToClipboard(brewInstall)}
                className="inline-flex items-center gap-2 text-ctp-subtext0 hover:text-accent transition-colors px-2 py-1 border-2 border-accent bg-ctp-surface1 font-black uppercase tracking-wider text-[11px]"
                whileHover={{ scale: 1.04, rotate: -1 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Copy Brew Install Command"
                title="Copy Brew Install Command"
              >
                <FaCopy size={14} />
                Copy
              </motion.button>
            )}

            {safeLink && (
              <motion.a
                href={safeLink}
                className="inline-flex items-center gap-2 text-accent border-2 border-accent px-2 py-1 bg-transparent hover:bg-accent hover:text-ctp-base transition-colors font-black uppercase tracking-wider text-[11px]"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View software"
                whileHover={{ scale: 1.04, rotate: -1 }}
                whileTap={{ scale: 0.96 }}
              >
                <FaExternalLinkAlt size={14} />
                View
              </motion.a>
            )}
          </div>
        </div>

        {/* In-card toast (theme-safe) */}
        <AnimatePresence>
          {copied && (
            <motion.div
              className="absolute bottom-3 right-3 bg-ctp-surface1 border-2 border-accent text-ctp-text px-3 py-1 font-mono text-xs shadow-brutal"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              Copied!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle inner wobble */}
        <motion.div
          className="pointer-events-none absolute inset-1 border-2 border-accent opacity-30"
          animate={{ rotate: [0, 0.6, 0, -0.6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    );
  },
);

/**
 * @component SoftwareCardSkeleton
 * @description Skeleton loader for SoftwareCard.
 */
export const SoftwareCardSkeleton = () => (
  <div className="bg-ctp-surface0 border-4 border-accent p-6 shadow-brutal h-[200px] flex flex-col">
    <div className="h-6 bg-ctp-overlay0 w-3/4 mb-3" />
    <div className="h-4 bg-ctp-overlay0 w-full mb-2" />
    <div className="h-4 bg-ctp-overlay0 w-5/6 mb-4" />
    <div className="mt-auto flex items-center gap-2">
      <div className="h-7 w-20 bg-ctp-overlay0" />
      <div className="h-7 w-16 bg-ctp-overlay0" />
    </div>
  </div>
);

export default SoftwareCard;
