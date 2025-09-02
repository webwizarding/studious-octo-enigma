/**
 * @file src/containers/nav/Footer.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * The main footer component for the application.
 */

"use client";

import { motion } from "motion/react";
import { SiGithub, SiNextdotjs, SiReact, SiTailwindcss } from "react-icons/si";
import React, { useEffect, useState, useRef } from "react";

/**
 * @component FooterContent
 * @description The main content of the footer, including copyright, location, and tech stack info.
 */
const FooterContent = () => {
  const currentYear = new Date().getFullYear();
  const [gitHash, setGitHash] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/dvh-sh/computations.cloud/commits/main")
      .then((response) => response.json())
      .then((data) => {
        setGitHash(data.sha.substring(0, 7));
      })
      .catch((error) => console.error("Error fetching Git hash:", error));
  }, []);

  useEffect(() => {
    // Basic click outside handler to close the popup
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popupRef]);

  return (
    <footer className="bg-ctp-mantle text-ctp-text py-3 md:ml-64 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <p className="text-xs font-mono transform hover:-skew-x-6 transition-transform duration-300">
            &copy; 2024 - {currentYear} computations.cloud | All Rights Reserved
          </p>
          <p className="text-xs font-bold uppercase tracking-wider">
            Hello from ☀️ Norcal
          </p>
          <div className="relative" ref={popupRef}>
            <div
              className="flex items-center space-x-2 text-ctp-subtext0 cursor-pointer bg-ctp-surface0 p-1 rounded-md hover:bg-ctp-surface1 transition-colors duration-300"
              onClick={() => setShowPopup(!showPopup)}
            >
              <SiNextdotjs
                size={16}
                className="hover:rotate-180 transition-transform duration-300"
              />
              <SiReact
                size={16}
                className="hover:rotate-180 transition-transform duration-300"
              />
              <SiTailwindcss
                size={16}
                className="hover:rotate-180 transition-transform duration-300"
              />
              <span className="text-xs font-mono">
                {gitHash ? `#${gitHash}` : "..."}
              </span>
            </div>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full right-0 mb-2 bg-ctp-surface0 text-ctp-text p-2 rounded shadow-lg text-xs whitespace-nowrap z-50"
              >
                <p className="font-mono mb-1">
                  Built with Next.js, React, and Tailwind CSS
                </p>
                {gitHash && (
                  <a
                    href={`https://github.com/dvh-sh/computations.cloud/commit/${gitHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-1 text-ctp-blue hover:text-accent transition-colors duration-200 font-bold uppercase tracking-wide"
                  >
                    <SiGithub className="mr-1" /> View commit
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </div>
        <div className="mt-2 text-center">
          <a
            href="https://www.linkedin.com/in/dvhsh/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-xs font-mono"
          >
            Made with David!
          </a>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-ctp-blue opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-accent"></div>
      <div className="absolute bottom-0 right-0 w-full h-px bg-ctp-blue"></div>
    </footer>
  );
};

/**
 * @component Footer
 * @description A wrapper component to ensure the footer only renders on the client side,
 * preventing hydration errors with client-specific logic like `useEffect`.
 */
export const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a static placeholder on the server
    return (
      <footer className="bg-ctp-mantle text-ctp-text py-3 md:ml-64 h-[40px]"></footer>
    );
  }

  return <FooterContent />;
};
