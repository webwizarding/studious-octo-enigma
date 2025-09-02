/**
 * @file src/containers/ConnectSection.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * A component for displaying a set of social media or connection links.
 */

import React from "react";
import type { IconType } from "react-icons";

interface Connection {
  Icon: IconType;
  label: string;
  link: string;
  color: string;
}

interface ConnectSectionProps {
  connections: Connection[];
  iconSize?: string;
}

/**
 * @component ConnectSection
 * @description Renders a list of connection links with icons.
 * @param {ConnectSectionProps} { connections, iconSize } - Props for the component.
 * @returns {JSX.Element} The rendered section of connection links.
 */
const ConnectSection: React.FC<ConnectSectionProps> = ({
  connections,
  iconSize = "w-6 sm:w-8 h-6 sm:h-8",
}) => {
  return (
    <div className="mt-auto pt-4">
      <div className="flex justify-center space-x-4 sm:space-x-6">
        {connections.map((connection, index) => (
          <a
            key={index}
            href={connection.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`fill-ctp-overlay0 ${connection.color} hover:text-ctp-text hover:scale-110 transition-all duration-300 hover:rotate-12`}
            aria-label={`${connection.label} Redirect`}
          >
            <connection.Icon
              className={`${iconSize} transform hover:skew-y-12`}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default ConnectSection;
