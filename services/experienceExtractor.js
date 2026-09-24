import { normalizeText } from "./textNormalizer.js";

export const extractExperience = (text) => {
  if (!text || typeof text !== "string") {
    return null;
  }

  const normalizedText = normalizeText(text);

  // Fresher / entry-level cases
  const fresherPatterns = [
    "fresher",
    "freshers",
    "fresh graduate",
    "entry level",
    "entry-level",
    "no experience",
  ];

  for (const pattern of fresherPatterns) {
    if (normalizedText.includes(normalizeText(pattern))) {
      return "fresher";
    }
  }

  // Find experience ranges like:
  // 1-2 years
  // 2 to 3 years
  // 3-5 yrs
  const rangeMatch = normalizedText.match(
    /(\d+(?:\.\d+)?)\s*(?:-|to)\s*(\d+(?:\.\d+)?)\s*(?:years?|yrs?)/i
  );

if (rangeMatch) {
  const minYears = Number(rangeMatch[1]);
  const maxYears = Number(rangeMatch[2]);

  const averageYears = (minYears + maxYears) / 2;

  return classifyExperience(averageYears);
}

  // Find single values like:
  // 4 years
  // 4 years exp
  // 4 yrs
  // 5+ years
  // 5+ yrs
  const singleMatch = normalizedText.match(
    /(\d+(?:\.\d+)?)\s*\+?\s*(?:years?|yrs?)(?:\s*(?:of\s*)?(?:experience|exp))?/i
  );

  if (singleMatch) {
    const years = Number(singleMatch[1]);

    return classifyExperience(years);
  }

  return null;
};

const classifyExperience = (years) => {
  if (years <= 1) {
    return "fresher";
  }

  if (years <= 2) {
    return "junior";
  }

  if (years <= 4) {
    return "mid";
  }

  return "senior";
};