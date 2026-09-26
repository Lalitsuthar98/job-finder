// import { getRecommendedJobs } from "../services/jobRecommendationService.js";

// const userPreferences = {
//   skills: ["nodejs", "mongodb", "react"],

//   jobTypes: ["full-time", "internship"],

//   experienceLevels: ["junior", "mid"],

//   preferredLocations: ["Udaipur", "Jaipur"],

//   salary: {
//     min: 400000,
//     max: 700000,
//   },
// };

// const jobs = [
//   {
//     title: "Junior Node.js Developer",

//     skills: ["nodejs", "mongodb", "docker"],

//     jobType: "full-time",

//     experience: "junior",

//     location: "Udaipur, Rajasthan",

//     salary: "300000 - 500000",
//   },

//   {
//     title: "Senior Python Developer",

//     skills: ["python", "docker"],

//     jobType: "full-time",

//     experience: "senior",

//     location: "Bangalore, Karnataka",

//     salary: "800000 - 1000000",
//   },

//   {
//     title: "React Developer",

//     skills: ["react", "javascript"],

//     jobType: "full-time",

//     experience: "mid",

//     location: "Jaipur, Rajasthan",

//     salary: "500000 - 700000",
//   },
// ];

// const recommendations = getRecommendedJobs(
//   userPreferences,
//   jobs
// );

// console.log("=== RECOMMENDATIONS ===");

// for (const recommendation of recommendations) {
//   console.log({
//     title: recommendation.job.title,
//     score: recommendation.score,
//     percentage: `${Math.round(
//       recommendation.score * 100
//     )}%`,
//     matchedSkills: recommendation.matchedSkills,
//   });
// }



import "dotenv/config";
import dbconnection from "../config/database.js";
import { getRecommendedJobs } from "../services/jobRecommendationService.js";

const testRecommendation = async () => {
  try {
    await dbconnection();

    // Replace this with the _id of your test user
    const userId = "6ab11216533f10d73a3ec337";

    const recommendations = await getRecommendedJobs(userId);

    console.log("\n=== RECOMMENDATIONS ===");
    console.log("Total:", recommendations.length);

    for (const recommendation of recommendations.slice(0, 10)) {
      console.log({
  title: recommendation.job.title,
  company: recommendation.job.company,

  skillScore: recommendation.skillScore,
  experienceScore: recommendation.experienceScore,
  locationScore: recommendation.locationScore,
  salaryScore: recommendation.salaryScore,

  score: recommendation.score,

  percentage: `${Math.round(
    recommendation.score * 100
  )}%`,

  matchedSkills: recommendation.matchedSkills,
});
    }
  } catch (error) {
    console.error(
      "❌ Recommendation failed:",
      error.message
    );
  }
};

testRecommendation();