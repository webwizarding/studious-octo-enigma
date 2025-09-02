/**
 * @file src/components/card3d/CardClient.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Tue, Aug 26 2025
 * @updated Tue, Aug 26 2025
 *
 * @description
 * Client wrapper for 3D card.
 */

"use client";

import dynamic from "next/dynamic";

// Disable ALL possible worker usage
if (typeof window !== "undefined") {
  (window as any).TROIKA_TEXT_DISABLE_WORKER = true;
  (window as any).USE_WEBWORKERS = false;
  // Disable any other potential worker usage
  (window as any).Worker = undefined;
}

const BusinessCard3D = dynamic(
  () => import("./BusinessCard3D").then((mod) => mod.BusinessCard3D),
  {
    ssr: false,
    loading: () => <div className="w-full h-screen bg-black" />,
  },
);

interface Props {
  name: string;
  title: string;
}

export const CardClient: React.FC<Props> = ({ name, title }) => {
  return <BusinessCard3D name={name} title={title} />;
};
