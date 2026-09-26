import { matchJob } from "../services/matching/jobMatcher.js";

const userPreferences = {
  skills: ["nodejs", "mongodb", "react"],

  jobTypes: ["full-time", "internship"],

  experienceLevels: ["junior", "mid"],

  preferredLocations: ["Udaipur", "Jaipur"],

  salary: {
    min: 400000,
    max: 700000,
  },
};

const job = {
  title: "Junior Node.js Developer",

  skills: [
    "nodejs",
    "mongodb",
    "docker",
  ],

  jobType: "full-time",

  experience: "junior",

  location: "Udaipur, Rajasthan",

  salary: "300000 - 500000",
};

const result = matchJob(
  userPreferences,
  job
);

console.log("=== JOB MATCH RESULT ===");
console.log(result);