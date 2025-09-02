/**
 * @file src/containers/nav/Sidebar.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Main sidebar component with lazy-loaded heavy client components.
 * Reduces initial bundle size by deferring non-critical UI.
 */

"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import React, { useState, useEffect, Suspense } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { SiGmail, SiLinkedin } from "react-icons/si";

import { UserCard } from "@/components/card/UserCard";
import Nav from "@/containers/nav/Nav";

// Lazy load heavy client components
const ThemeSwitcher = dynamic(
  () => import("@/components/theme/ThemeSwitcher").then((m) => m.ThemeSwitcher),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 bg-ctp-surface1 animate-pulse rounded" />
    ),
  },
);

const ConnectSection = dynamic(() => import("@/containers/ConnectSection"), {
  ssr: false,
  loading: () => <div className="h-8 bg-ctp-surface1 animate-pulse rounded" />,
});

/**
 * @component SidebarContent
 * @description Core sidebar logic with mobile responsiveness and animations.
 */
const SidebarContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const connections = [
    {
      Icon: SiGmail,
      label: "Email",
      link: "mailto:jeremy@computations.cloud",
      color: "text-ctp-overlay0",
    },
    {
      Icon: SiLinkedin,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/jbcomp/",
      color: "text-ctp-overlay0",
    },
  ];

  useEffect(() => {
    setIsHydrated(true);
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  if (!isHydrated) {
    // Return static placeholder during SSR
    return (
      <div className="w-64 h-screen bg-gradient-to-br from-ctp-mantle to-ctp-crust" />
    );
  }

  return (
    <>
      {isMobile && (
        <motion.button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-ctp-surface0 shadow-brutal rounded-none"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          whileTap={{ scale: 0.9 }}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? (
            <FaTimes className="text-accent text-2xl" />
          ) : (
            <FaBars className="text-accent text-2xl" />
          )}
        </motion.button>
      )}

      <motion.aside
        className="w-64 h-screen fixed left-0 top-0 bottom-0 flex flex-col border-r-4 border-accent transition-transform duration-300 ease-in-out z-40 shadow-brutal bg-gradient-to-br from-ctp-mantle to-ctp-crust"
        initial={false}
        animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
        variants={{
          open: { x: 0 },
          closed: { x: "-100%" },
        }}
      >
        <div className="flex-grow overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-thumb-accent scrollbar-track-ctp-surface0">
          <UserCard />
          <Nav />
        </div>

        <div className="p-4 flex flex-col items-center bg-ctp-surface0 border-t-4 border-accent">
          <Suspense fallback={<div className="h-10 w-full" />}>
            <ThemeSwitcher />
          </Suspense>

          <div className="mt-2 w-full">
            <Suspense fallback={<div className="h-8 w-full" />}>
              <ConnectSection
                connections={connections}
                iconSize="w-6 sm:w-8 h-6 sm:h-8"
              />
            </Suspense>
          </div>
        </div>
      </motion.aside>

      {isMobile && isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
};

/**
 * @component Sidebar
 * @description Wrapper component ensuring client-only rendering.
 * @returns {JSX.Element | null} The sidebar component or null during SSR.
 */
export const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <SidebarContent />;
};
