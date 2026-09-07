export const normalizeAdzunaJob = (job) => {
  return {
    title: job.title?.trim() || "Untitled Position",

    company: job.company?.display_name?.trim() || "Unknown Company",

    location:
      job.location?.display_name?.trim() || "Not specified",

    skills: [],

    jobType:
      job.contract_time === "part_time"
        ? "full-time"
        : "full-time",

    experience: undefined,

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