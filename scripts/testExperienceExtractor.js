import { extractExperience } from "../services/experienceExtractor.js";

const testCases = [
  "Looking for a fresher Node.js developer.",
  "Entry level software developer required.",
  "Junior developer with 1-2 years of experience.",
  "Developer with 2 to 3 years experience.",
  "Developer with 3-4 years of experience.",
  "Developer with 4 Years exp in Typescript.",
  "Developer with 4 yrs experience.",
  "Senior Node.js developer with 5+ years experience.",
  "Software engineer with 7+ years of experience.",
  "Strong JavaScript developer required.",
];

for (const text of testCases) {
  console.log(
    `TEXT: ${text}`
  );

  console.log(
    `EXPERIENCE: ${extractExperience(text)}`
  );

  console.log("-------------------------");
}