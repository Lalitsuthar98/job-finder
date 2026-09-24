import { extractSkills } from "./skillExtractor.js";
import { extractExperience } from "./experienceExtractor.js";

export const normalizeAdzunaJob = (job) => {


  // create combined text  
  const text = `${job.title || ""} ${job.description || ""}`;
  
  // Extract skills and experince 
  const skills = extractSkills(text);
  const experience = extractExperience(text);


  let jobType = "full-time";

  if (job.contract_time === "full_time") {
    jobType = "full-time";
  }

  return {
    title: job.title?.trim() || "Untitled Position",

    company:
      job.company?.display_name?.trim() || "Unknown Company",

    externalJobId: String(job.id),
    
    location:
      job.location?.display_name?.trim() || "Not specified",

    skills,

    jobType,

    experience,

    salary:
      job.salary_min || job.salary_max
        ? `${job.salary_min || 0} - ${job.salary_max || "Not specified"}`
        : "Not disclosed",

    description: job.description || "",

    applyUrl: job.redirect_url,

    source: "Adzuna",

    postedAt: job.created
      ? new Date(job.created)
      : new Date(),
  };
};