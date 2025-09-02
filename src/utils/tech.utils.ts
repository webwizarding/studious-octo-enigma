/**
 * @file src/utils/tech.utils.ts
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Utility functions and data related to technologies (skills, tools).
 */

import * as SiIcons from "react-icons/si";
import type { Tech } from "@/types";

/**
 * @const tech
 * @description An array of technology objects with Catppuccin color classes.
 */
const tech: Tech[] = [
  {
    slug: "javascript",
    title: "JavaScript",
    color: "text-ctp-yellow",
    icon: "SiJavascript",
  },
  {
    slug: "typescript",
    title: "TypeScript",
    color: "text-ctp-blue",
    icon: "SiTypescript",
  },
  { slug: "java", title: "Java", color: "text-ctp-red", icon: "SiJava" },
  {
    slug: "python",
    title: "Python",
    color: "text-ctp-yellow",
    icon: "SiPython",
  },
  {
    slug: "kotlin",
    title: "Kotlin",
    color: "text-ctp-mauve",
    icon: "SiKotlin",
  },
  {
    slug: "cplusplus",
    title: "C++",
    color: "text-ctp-blue",
    icon: "SiCplusplus",
  },
  { slug: "php", title: "PHP", color: "text-ctp-mauve", icon: "SiPhp" },
  { slug: "go", title: "Go", color: "text-ctp-blue", icon: "SiGo" },
  { slug: "c", title: "C", color: "text-ctp-blue", icon: "SiC" },
  { slug: "csharp", title: "C#", color: "text-ctp-mauve", icon: "SiCsharp" },
  { slug: "react", title: "React", color: "text-ctp-blue", icon: "SiReact" },
  {
    slug: "nextjs",
    title: "Next.js",
    color: "text-ctp-text",
    icon: "SiNextdotjs",
  },
  {
    slug: "fastify",
    title: "Fastify",
    color: "text-ctp-green",
    icon: "SiFastify",
  },
  {
    slug: "express",
    title: "Express",
    color: "text-ctp-text",
    icon: "SiExpress",
  },
  {
    slug: "spring",
    title: "Spring",
    color: "text-ctp-green",
    icon: "SiSpring",
  },
  { slug: "git", title: "Git", color: "text-ctp-peach", icon: "SiGit" },
  { slug: "docker", title: "Docker", color: "text-ctp-blue", icon: "SiDocker" },
  { slug: "linux", title: "Linux", color: "text-ctp-yellow", icon: "SiLinux" },
  { slug: "nginx", title: "Nginx", color: "text-ctp-green", icon: "SiNginx" },
  {
    slug: "mongodb",
    title: "MongoDB",
    color: "text-ctp-green",
    icon: "SiMongodb",
  },
  { slug: "mysql", title: "MySQL", color: "text-ctp-blue", icon: "SiMysql" },
  { slug: "redis", title: "Redis", color: "text-ctp-red", icon: "SiRedis" },
  { slug: "amazonaws", title: "AWS", color: "text-ctp-yellow", icon: "SiAmazonaws" },
  {
    slug: "digitalocean",
    title: "DigitalOcean",
    color: "text-ctp-blue",
    icon: "SiDigitalocean",
  },
  {
    slug: "oracle",
    title: "Oracle Cloud",
    color: "text-ctp-red",
    icon: "SiOracle",
  },
  {
    slug: "coolify",
    title: "Coolify",
    color: "text-ctp-mauve",
    icon: "SiServerfault",
  },
  {
    slug: "letsencrypt",
    title: "Let's Encrypt",
    color: "text-ctp-green",
    icon: "SiLetsencrypt",
  },
];

/**
 * @function getTechBySlug
 * @description Retrieves a technology object from the list by its slug.
 * @param {string} slug - The slug of the technology to find.
 * @returns {Tech | undefined} The technology object if found, otherwise undefined.
 */
const getTechBySlug = (slug: string): Tech | undefined =>
  tech.find((t) => t.slug === slug);

/**
 * @function getIcon
 * @description Dynamically retrieves an icon component from 'react-icons/si' by its name.
 * @param {string} iconName - The name of the icon component (e.g., "SiReact").
 * @returns {React.ComponentType} The corresponding icon component.
 */
const getIcon = (iconName: string) => SiIcons[iconName as keyof typeof SiIcons];

export { tech, getTechBySlug, getIcon };
