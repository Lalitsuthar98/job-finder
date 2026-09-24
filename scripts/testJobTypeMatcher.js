import { matchJobType } from "../services/matching/jobTypeMatcher.js";

const testCases = [
  {
    userJobTypes: ["full-time", "internship"],
    jobType: "full-time",
  },

  {
    userJobTypes: ["internship"],
    jobType: "full-time",
  },

  {
    userJobTypes: ["full-time"],
    jobType: "full-time",
  },

  {
    userJobTypes: [],
    jobType: "full-time",
  },

  {
    userJobTypes: ["internship"],
    jobType: null,
  },
];

for (const test of testCases) {
  console.log("USER JOB TYPES:", test.userJobTypes);
  console.log("JOB TYPE:", test.jobType);

  const result = matchJobType(
    test.userJobTypes,
    test.jobType
  );

  console.log("RESULT:", result);
  console.log("-------------------------");
}
