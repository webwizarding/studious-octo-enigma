/**
 * @file app/card/page.tsx
 * @author Jeremy @dvhsh (https://computations.cloud)
 *
 * @created Tue, Aug 26 2025
 * @updated Tue, Aug 26 2025
 *
 * @description
 * Server component that fetches data and renders client card.
 */

import React from "react";
import { fetchPortfolioData } from "@/lib/portfolioCache";
import { CardClient } from "@/components/card3d/CardClient";

export const revalidate = 300;

const CardPage = async () => {
  const data = await fetchPortfolioData();

  const latest =
    Array.isArray(data.experience) && data.experience.length
      ? data.experience[0]
      : null;

  const name = data.profile?.name || "David Heffler";
  const title = latest
    ? `${latest.title} @ ${latest.company}`
    : data.profile?.title || "Software Engineer";

  return <CardClient name={name} title={title} />;
};

export default CardPage;
