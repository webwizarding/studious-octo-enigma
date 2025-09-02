/**
 * @file src/components/icons/SocialIcons.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Centralized icon exports to optimize bundle size.
 * Only imports the specific icons used in the app.
 */

import { SiGithub, SiGmail, SiLinkedin } from "react-icons/si";

/**
 * @interface IconMap
 * @description Maps icon types to their components.
 */
interface IconMap {
  github: typeof SiGithub;
  email: typeof SiGmail;
  linkedin: typeof SiLinkedin;
}

export const icons: IconMap = {
  github: SiGithub,
  email: SiGmail,
  linkedin: SiLinkedin,
};

/**
 * @function getIcon
 * @description Gets an icon component by type.
 * @param {keyof IconMap} type - The icon type.
 * @returns {IconMap[keyof IconMap]} The icon component.
 */
export const getIcon = (type: keyof IconMap) => icons[type];

export { SiGithub, SiGmail, SiLinkedin };
