/**
 * @file app/page.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Mon, Aug 26 2025
 *
 * @description
 * Server-rendered home page.
 */

import { JSX, Suspense } from "react";
import AboutMe from "@/containers/Home/AboutMe";
import Projects from "@/containers/Home/Projects";
import Skills from "@/containers/Home/Skills";
import {
  ProjectsSkeleton,
  SkillsSkeleton,
} from "@/components/skeleton/ContentSkeleton";
import { fetchPortfolioData } from "@/lib/portfolioCache";

export const revalidate = 300;

/**
 * @component DataSections
 * @description An async Server Component to fetch and render portfolio sections.
 * @returns {Promise<JSX.Element>} A promise that resolves to the JSX for data sections.
 */
const DataSections = async (): Promise<JSX.Element> => {
  const data = await fetchPortfolioData();

  return (
    <>
      <Projects data={data.projects} keywords={data.keywords} />
      <Skills data={data.skills} />
    </>
  );
};

/**
 * @component HomePage
 * @description Main home page component.
 * @returns {JSX.Element} The rendered homepage.
 */
const HomePage = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen bg-ctp-base text-ctp-text transition-all duration-300 ease-in-out md:pl-64">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <AboutMe />
        <Suspense
          fallback={
            <>
              <ProjectsSkeleton />
              <SkillsSkeleton />
            </>
          }
        >
          <DataSections />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
