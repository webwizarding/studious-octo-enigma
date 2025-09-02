/**
 * @file src/components/skeleton/ContentSkeleton.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A collection of skeleton loader components for various content sections.
 */

import React from "react";

/**
 * @component WorksSkeleton
 * @description Renders a skeleton loader for the "Works" section.
 */
export const WorksSkeleton = () => (
  <div className="mb-16 animate-pulse">
    <div className="h-12 bg-ctp-surface0 w-64 mb-6 rounded"></div>
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-ctp-surface0 p-6 rounded-lg">
          <div className="h-8 bg-ctp-overlay0 w-3/4 mb-4 rounded"></div>
          <div className="h-4 bg-ctp-overlay0 w-full mb-2 rounded"></div>
          <div className="h-4 bg-ctp-overlay0 w-5/6 mb-4 rounded"></div>
          <div className="flex space-x-2">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="h-6 w-6 bg-ctp-overlay0 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * @component ProjectsSkeleton
 * @description Renders a skeleton loader for the "Projects" section.
 */
export const ProjectsSkeleton = () => (
  <div className="mb-16 animate-pulse">
    <div className="h-12 bg-ctp-surface0 w-64 mb-6 rounded"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-ctp-surface0 p-6 rounded-lg">
          <div className="h-8 bg-ctp-overlay0 w-3/4 mb-4 rounded"></div>
          <div className="h-4 bg-ctp-overlay0 w-full mb-2 rounded"></div>
          <div className="h-4 bg-ctp-overlay0 w-5/6 mb-4 rounded"></div>
          <div className="flex space-x-2">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-6 w-6 bg-ctp-overlay0 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * @component SkillsSkeleton
 * @description Renders a skeleton loader for the "Skills" section.
 */
export const SkillsSkeleton = () => (
  <div className="mb-16 animate-pulse">
    <div className="h-12 bg-ctp-surface0 w-64 mb-6 rounded"></div>
    {[...Array(4)].map((_, i) => (
      <div key={i} className="mb-8">
        <div className="h-6 bg-ctp-surface0 w-48 mb-4 rounded"></div>
        <div className="flex flex-wrap gap-2">
          {[...Array(6)].map((_, j) => (
            <div key={j} className="h-8 w-24 bg-ctp-surface0 rounded"></div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
