/**
 * @file src/containers/Home/Projects.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Container component to display projects with keyword emphasis.
 */

"use client";

import { motion } from "motion/react";
import ProjectCard from "@/components/card/ProjectCard";
import type { Project } from "@/types";

interface ProjectsProps {
  data: Project[];
  keywords?: string[];
}

/**
 * @component Projects
 * @description Renders projects section with enhanced cards and keyword emphasis.
 * @param {ProjectsProps} { data, keywords } - Project data and keywords to highlight.
 * @returns {JSX.Element} The rendered projects section.
 */
const Projects = ({ data, keywords }: ProjectsProps) => {
  const items = Array.isArray(data)
    ? data.filter((p) =>
        ["nitrous", "hive"].includes(p.title.toLowerCase()),
      )
    : [];

  return (
    <section id="projects" className="mb-16">
      <motion.h2
        className="text-6xl font-black mb-8 text-accent uppercase tracking-tighter transform -skew-x-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectCard {...project} keywords={keywords} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
