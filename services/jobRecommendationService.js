import user from "../model/user_model.js";
import Job from "../model/Job_model.js";
import { matchJob } from "./matching/jobMatcher.js";

export const getRecommendedJobs = async (userId) => {
  const existingUser = await user
    .findById(userId)
    .select("preferences");

  if (!existingUser) {
    throw new Error("User not found");
  }

  const jobs = await Job.find({});

  // Job Type → Hard Filter
  const eligibleJobs = jobs.filter((job) => {
    const userJobTypes = existingUser.preferences.jobTypes;

    // If user has not selected a job type,
    // allow all jobs.
    if (!userJobTypes || userJobTypes.length === 0) {
      return true;
    }

    return userJobTypes.includes(job.jobType);
  });

  const recommendations = eligibleJobs.map((job) => {
    const matchResult = matchJob(
      existingUser.preferences,
      job
    );

    return {
      job,
      ...matchResult,
    };
  });

  recommendations.sort((a, b) => b.score - a.score);

  return recommendations;
};