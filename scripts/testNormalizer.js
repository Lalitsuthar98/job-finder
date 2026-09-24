import { normalizeAdzunaJob } from "../services/jobNormalizer.js";

const mockJob = {
  id: "12345",

  title: "Junior Node.js Developer",

  company: {
    display_name: "Test Company",
  },

  location: {
    display_name: "Udaipur, Rajasthan",
  },

  description:
    "Looking for a junior developer with Node.js, ExpressJS, MongoDB and Docker. 1-2 years of experience.",

  salary_min: 300000,
  salary_max: 500000,

  redirect_url: "https://example.com/job/12345",

  contract_time: "full_time",

  created: "2026-09-24T10:00:00Z",
};

const normalizedJob = normalizeAdzunaJob(mockJob);

console.log(normalizedJob);