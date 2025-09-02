/**
 * @file src/components/blog/LicenseInfo.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A component to display Creative Commons license information.
 */

import React from "react";

/**
 * @component LicenseInfo
 * @description Renders a standardized Creative Commons BY-NC-SA 4.0 license notice.
 */
export const LicenseInfo = () => (
  <div className="mt-12 p-4 bg-ctp-surface0 border-t-4 border-accent transform skew-x-2">
    <p className="text-sm text-ctp-subtext0 font-mono">
      This work is licensed under{" "}
      <a
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-ctp-blue hover:text-accent transition-colors duration-200 uppercase tracking-wide font-bold"
      >
        CC BY-NC-SA 4.0
      </a>
    </p>
  </div>
);
