import { matchSalary } from "../services/matching/salaryMatcher.js";

const testCases = [
  {
    userSalary: {
      min: 400000,
      max: 700000,
    },
    jobSalary: "300000 - 500000",
  },

  {
    userSalary: {
      min: 400000,
      max: 700000,
    },
    jobSalary: "800000 - 1000000",
  },

  {
    userSalary: {
      min: 400000,
      max: 700000,
    },
    jobSalary: "500000 - 600000",
  },

  {
    userSalary: {
      min: 400000,
      max: 700000,
    },
    jobSalary: "Not disclosed",
  },

  {
    userSalary: {},
    jobSalary: "500000 - 600000",
  },

  {
    userSalary: {
      min: 400000,
      max: 700000,
    },
    jobSalary: null,
  },
];

for (const test of testCases) {
  console.log("USER SALARY:", test.userSalary);
  console.log("JOB SALARY:", test.jobSalary);

  const result = matchSalary(
    test.userSalary,
    test.jobSalary
  );

  console.log("RESULT:", result);
  console.log("-------------------------");
}
