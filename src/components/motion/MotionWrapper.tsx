/**
 * @file src/components/motion/MotionWrapper.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Reusable wrapper components for Framer Motion animations.
 */

"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * @interface MotionWrapperProps
 * @description Props for the motion wrapper components.
 * @property {ReactNode} children - The content to be animated.
 * @property {string} [className] - Optional additional class names.
 * @property {number} [delay] - Optional delay for the animation.
 */
interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * @component MotionDiv
 * @description A div that animates its children into view with a slide-up and fade-in effect.
 * @param {MotionWrapperProps} props - The props for the component.
 * @returns {JSX.Element} The animated div.
 */
export const MotionDiv = ({
  children,
  className,
  delay = 0,
}: MotionWrapperProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    {children}
  </motion.div>
);

/**
 * @component MotionSection
 * @description A section that animates its children into view with a fade-in effect.
 * @param {MotionWrapperProps} props - The props for the component.
 * @returns {JSX.Element} The animated section.
 */
export const MotionSection = ({ children, className }: MotionWrapperProps) => (
  <motion.section
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.section>
);
