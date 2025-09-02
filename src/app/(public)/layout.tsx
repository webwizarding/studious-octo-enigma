/**
 * @file src/app/layout.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Wed, Aug 20 2025
 * @updated Wed, Aug 20 2025
 *
 * @description
 * Root layout for the entire application.
 * Sets up HTML structure, metadata, theme provider, and navigation components.
 */

import React, { JSX } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../globals.css";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { Footer } from "@/containers/nav/Footer";
import { Sidebar } from "@/containers/nav/Sidebar";

const inter = Inter({ subsets: ["latin"] });

/**
 * @var metadata
 * @description The base metadata for the application, including title, description,
 * keywords, and OpenGraph/Twitter card information.
 */
export const metadata: Metadata = {
  title: "Jerm",
  description:
    "Explore Jeremy’s personal portfolio showcasing skills and experience in full-stack development, with expertise in various modern technologies.",
  keywords:
    "Jeremy, Full-Stack Developer, Software Engineer, Web Development, Backend, Frontend, CSIS Student",
  openGraph: {
    title: "Jerm",
    description:
      "Explore Jeremy’s portfolio, highlighting his expertise in full-stack development across a range of modern technologies.",
    url: "https://computations.cloud",
    siteName: "Jeremy Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://computations.cloud/icons/icon.png",
        width: 1200,
        height: 630,
        alt: "Jeremy Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@HaruHoldings",
    title: "Jerm",
    description:
      "Explore Jeremy’s portfolio, highlighting his expertise in full-stack development across a range of modern technologies.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/icon.png",
  },
};

/**
 * @component RootLayout
 * @description The root layout component that wraps all pages.
 * @param {{ children: React.ReactNode }} { children } - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root HTML structure of the application.
 */
const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="canonical" href="https://computations.cloud" />
        <meta name="theme-color" content="#1e1e2e" />
        <link
          rel="preload"
          href="/fonts/open-sans-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex flex-col min-h-screen overflow-x-hidden">
        <ThemeProvider>
          <div className="flex flex-grow relative w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col w-full">
              <main className="flex-grow w-full">{children}</main>
            </div>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
