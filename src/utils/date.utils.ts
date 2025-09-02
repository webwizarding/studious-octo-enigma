/**
 * @file src/utils/date.utils.ts
 * @author David
 *
 * @created Mon, Aug 25 2025
 * @updated Mon, Aug 25 2025
 *
 * @description
 * Date utilities for duration and parsing.
 */

/**
 * @function parseLooseDate
 * @description Parses "YYYY-MM", "Mon YYYY", or "Present" into a Date. Falls back to current date.
 * @param {string} s - Date-like string
 * @returns {Date} Parsed date
 */
export const parseLooseDate = (s: string): Date => {
  if (!s || s.toLowerCase() === "present") return new Date();
  const ym = /^(\d{4})-(\d{2})$/.exec(s);
  if (ym) return new Date(Number(ym[1]), Number(ym[2]) - 1, 1);
  const nat = new Date(s);
  if (!Number.isNaN(nat.getTime())) return nat;
  return new Date();
};

/**
 * @function calcDuration
 * @description Compute human-readable duration from a start and end (or Present) date.
 * @param {string} start - e.g., "2024-03", "Sep 2024"
 * @param {string} end - e.g., "Present", "2025-01"
 * @returns {string} Duration label (e.g., "1 yr 2 mo", "6 mo")
 */
export const calcDuration = (start: string, end: string): string => {
  const s = parseLooseDate(start);
  const e =
    end && end.toLowerCase() !== "present" ? parseLooseDate(end) : new Date();

  const months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (months <= 0) return "0 mo";
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years > 0 && rem > 0)
    return `${years} yr${years > 1 ? "s" : ""} ${rem} mo`;
  if (years > 0) return `${years} yr${years > 1 ? "s" : ""}`;
  return `${rem} mo`;
};
