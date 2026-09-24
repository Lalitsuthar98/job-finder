import { matchLocation } from "../services/matching/locationMatcher.js";

const testCases = [
  {
    userLocations: ["Udaipur", "Jaipur"],
    jobLocation: "Udaipur, Rajasthan",
  },

  {
    userLocations: ["Jaipur"],
    jobLocation: "Udaipur, Rajasthan",
  },

  {
    userLocations: ["udaipur"],
    jobLocation: "Udaipur, Rajasthan",
  },

  {
    userLocations: ["Bangalore", "Delhi"],
    jobLocation: "Bangalore, Karnataka",
  },

  {
    userLocations: [],
    jobLocation: "Udaipur, Rajasthan",
  },

  {
    userLocations: ["Udaipur"],
    jobLocation: null,
  },

  {
    userLocations: ["Mumbai"],
    jobLocation: "India",
  },
];

for (const test of testCases) {
  console.log("USER LOCATIONS:", test.userLocations);
  console.log("JOB LOCATION:", test.jobLocation);

  const result = matchLocation(
    test.userLocations,
    test.jobLocation
  );

  console.log("RESULT:", result);
  console.log("-------------------------");
}