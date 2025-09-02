/**
 * @file src/types/index.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 25 2025
 *
 * @description
 * General type definitions / misc random stuff
 */

/**
 * @interface Profile
 * @description User's personal and contact information.
 */
export interface Profile {
  name: string;
  title: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  location: string;
}

/**
 * @interface Experience
 * @description Professional work experience entry.
 */
export interface Experience {
  title: string;
  company: string;
  type: string; // e.g., "Full-time", "Self-employed", "Part-time"
  startDate: string; // e.g., "2024-03" or "Sep 2024"
  endDate: string; // e.g., "Present" or "2025-01"
  location: string;
  description: string;
  bullets: string[];
}

/**
 * @interface Position
 * @description Specific role/position entry for sections that list positions explicitly.
 */
export interface Position {
  title: string; // Organization/company name (e.g., "Haruhime Holdings")
  shortDescription: string;
  technologies: string[];
  link: string;
  date: string; // Display range (e.g., "Mar 2024 - Present")
  positionTitle: string; // Role held (e.g., "Founder & Technical Consultant")
}

/**
 * @interface Work
 * @description Client work or project engagement entry.
 */
export interface Work {
  title: string; // Project/client name (e.g., "SchuttingMasters")
  shortDescription: string;
  technologies: string[];
  link: string;
  date: string; // Display range (e.g., "Sep 2024 - Oct 2024")
}

/**
 * @interface RecentWork
 * @description Highlighted recent engagement for display on the site.
 */
export interface RecentWork {
  name: string; // Display name (e.g., "Dystowned")
  type: string; // Category (e.g., "E-Commerce Platform")
  date: string; // Display range
  description: string;
  tech: string[];
  metrics: string; // Impact/metrics summary
}

/**
 * @interface Education
 * @description Education entry. `expected` indicates if the degree is in progress/anticipated.
 */
export interface Education {
  school: string;
  degree: string; // e.g., "Associate of Science - AS, Mathematics"
  dates: string; // e.g., "2024 - 2026" or "Expected Fall 2028"
  expected?: boolean; // true if not yet earned (in-progress/anticipated)
}

/**
 * @interface Project
 * @description Personal or open-source project entry.
 */
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  sourceLink?: string;
  sourceLinks?: string[];
}

/**
 * @interface Software
 * @description Software/tool entry with optional Homebrew install command.
 */
export interface Software {
  title: string;
  description: string;
  link: string;
  price: string; // e.g., "Open Source", "Freemium", "Paid"
  operatingSystem: string; // e.g., "macOS", "macOS, Windows, Linux"
  brewInstall?: string; // optional Homebrew command
}

/**
 * @interface SkillsData
 * @description Categorized skills data used across views.
 */
export interface SkillsData {
  programmingLanguages: string[];
  frameworks: string[];
  tools: string[];
  cloud: string[];
}

/**
 * @interface PortfolioData
 * @description Single source-of-truth structure loaded from portfolio.json.
 */
export interface PortfolioData {
  keywords: string[];
  profile: Profile;
  about: string;
  experience: Experience[];
  positions: Position[];
  recentWork: RecentWork[];
  works: Work[];
  education: Education[];
  projects: Project[];
  skills: SkillsData;
  software: {
    [category: string]: Software[];
  };
}

/**
 * @interface TextResumeData
 * @description Minimal shape for textual summaries.
 */
export interface TextResumeData {
  profile: Profile;
  about: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillsData;
}

/**
 * @interface Post
 * @description Blog or cooking post entry.
 */
export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  readingTime: string;
  views?: number;
  cookingTime?: string;
  origin?: string;
  type?: string;
}

/**
 * @interface Tech
 * @description Technology metadata (slug, icon, color).
 */
export interface Tech {
  slug: string;
  title: string;
  color: string;
  icon: string;
}

/**
 * @type Catppuccin
 * @description Catppuccin theme context shape.
 */
export type Catppuccin = {
  flavor: string;
  setFlavor: (flavor: string) => void;
};
