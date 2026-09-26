import { calculateMatchScore } from "../services/matching/matchScore.js";

const testCases = [
  {
    name: "Perfect Match",

    skillScore: 1,
    jobTypeScore: 1,
    experienceScore: 1,
    locationScore: 1,
    salaryScore: 1,
  },

  {
    name: "Good Match",

    skillScore: 0.75,
    jobTypeScore: 1,
    experienceScore: 1,
    locationScore: 0,
    salaryScore: 1,
  },

  {
    name: "Partial Match",

    skillScore: 0.5,
    jobTypeScore: 1,
    experienceScore: 0,
    locationScore: 1,
    salaryScore: 0,
  },

  {
    name: "No Match",

    skillScore: 0,
    jobTypeScore: 0,
    experienceScore: 0,
    locationScore: 0,
    salaryScore: 0,
  },
];

for (const test of testCases) {
  const score = calculateMatchScore(test);

  console.log("CASE:", test.name);
  console.log("SCORE:", score);
  console.log(
  "PERCENTAGE:",
  `${Math.round(score * 100)}%`
);
  console.log("-------------------------");
}