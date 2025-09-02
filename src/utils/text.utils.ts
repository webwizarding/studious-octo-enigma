/**
 * @file src/utils/text.utils.ts
 * @author David
 *
 * @created Mon, Aug 25 2025
 * @updated Mon, Aug 25 2025
 *
 * @description
 * Text utilities for normalization and emphasis (HTML/PDF).
 */

/**
 * @function normalizeTech
 * @description Normalizes technology labels for display (e.g., "Square API" -> "Square").
 * @param {string[]} techs - Original technology list
 * @returns {string[]} Normalized technology list
 */
export const normalizeTech = (techs: string[] = []): string[] =>
  techs.map((t) => (t.toLowerCase() === "square api" ? "Square" : t));

/**
 * @function buildKeywordRegex
 * @description Builds a case-insensitive word-boundary regex from keywords.
 * @param {unknown} keywords - Words to emphasize
 * @returns {RegExp | null} Compiled regex or null if empty/invalid
 */
export const buildKeywordRegex = (keywords: unknown): RegExp | null => {
  try {
    const words = Array.isArray(keywords)
      ? keywords
          .map((w) => (typeof w === "string" ? w.trim() : ""))
          .filter(Boolean)
      : [];
    if (!words.length) return null;
    const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b(${words.map(esc).join("|")})\\b`, "gi");
  } catch (e) {
    console.error("buildKeywordRegex failed:", e);
    return null;
  }
};

/**
 * @typedef EmphasisSegment
 * @property {string} text - Segment text
 * @property {boolean} bold - Whether the segment should be bold
 */
export type EmphasisSegment = { text: string; bold: boolean };

/**
 * @function emphasizeHtml
 * @description Splits text and marks matching keywords for bolding.
 * @param {string} text - Source string
 * @param {RegExp | null} regex - Compiled keyword regex
 * @returns {EmphasisSegment[]} Segments indicating bold parts
 */
export const emphasizeHtml = (
  text: string,
  regex: RegExp | null,
): EmphasisSegment[] => {
  if (!regex || !text) return [{ text: text ?? "", bold: false }];
  const segments: EmphasisSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const [hit] = match;
    const start = match.index;
    if (start > lastIndex)
      segments.push({ text: text.slice(lastIndex, start), bold: false });
    segments.push({ text: hit, bold: true });
    lastIndex = start + hit.length;
  }
  if (lastIndex < text.length)
    segments.push({ text: text.slice(lastIndex), bold: false });
  return segments;
};

/**
 * @function safeSegments
 * @description Safe wrapper that never returns non-renderable content.
 * @param {unknown} text - Possibly non-string input
 * @param {RegExp | null} regex - Compiled keyword regex
 * @returns {EmphasisSegment[]} Safe segments
 */
export const safeSegments = (
  text: unknown,
  regex: RegExp | null,
): EmphasisSegment[] => {
  try {
    if (typeof text !== "string") {
      return [{ text: String(text ?? ""), bold: false }];
    }
    return emphasizeHtml(text, regex);
  } catch (e) {
    console.error("safeSegments failed:", e);
    return [{ text: typeof text === "string" ? text : "", bold: false }];
  }
};

/**
 * @function splitForPdf
 * @description Splits text into parts according to keyword regex for PDF rendering.
 * @param {string} text - Source string
 * @param {RegExp | null} regex - Compiled keyword regex
 * @returns {string[]} Parts (alternating normal/keyword tokens)
 */
export const splitForPdf = (text: string, regex: RegExp | null): string[] => {
  if (!regex || !text) return [text ?? ""];
  const parts: string[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    const start = m.index;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(m[0]);
    last = start + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
};
