import { matchSkills } from "./skillMatcher.js";
import { matchExperience } from "./experienceMatcher.js";
import { matchLocation } from "./locationMatcher.js";
import { matchSalary } from "./salaryMatcher.js";
import { calculateMatchScore } from "./matchScore.js";

export const matchJob = (preferences, job) => {
  const skillResult = matchSkills(
    preferences.skills,
    job.skills
  );

  const experienceResult = matchExperience(
    preferences.experienceLevels,
    job.experience
  );

  const locationResult = matchLocation(
    preferences.preferredLocations,
    job.location
  );

  const salaryResult = matchSalary(
    preferences.salary,
    job.salary
  );

  const score = calculateMatchScore({
    skillScore: skillResult.score,
    experienceScore: experienceResult.score,
    locationScore: locationResult.score,
    salaryScore: salaryResult.score,
  });

//  

return {
  score,

  skillScore: skillResult.score,
  experienceScore: experienceResult.score,
  locationScore: locationResult.score,
  salaryScore: salaryResult.score,

  matchedSkills: skillResult.matchedSkills,

  skillMatch: skillResult.score > 0,
  experienceMatch: experienceResult.matched,
  locationMatch: locationResult.matched,
  salaryMatch: salaryResult.matched,
};
};