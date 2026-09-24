import { matchSkills } from "../services/matching/skillMatcher.js";

const testCases = [
  {
    userSkills: ["nodejs", "mongodb", "react"],
    jobSkills: ["nodejs", "mongodb", "docker"],
  },

  {
    userSkills: ["nodejs", "mongodb"],
    jobSkills: ["nodejs", "mongodb"],
  },

  {
    userSkills: ["nodejs", "react"],
    jobSkills: ["python", "docker"],
  },

  {
    userSkills: [],
    jobSkills: ["nodejs", "mongodb"],
  },

  {
    userSkills: ["nodejs"],
    jobSkills: [],
  },
];

for (const test of testCases) {
  console.log("USER SKILLS:", test.userSkills);
  console.log("JOB SKILLS:", test.jobSkills);

  const result = matchSkills(
    test.userSkills,
    test.jobSkills
  );

  console.log("RESULT:", result);
  console.log("-------------------------");
}