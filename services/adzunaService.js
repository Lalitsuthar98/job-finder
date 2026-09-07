// import axios from "axios";
// import "dotenv/config";

// // /**
// //  * Fetches job listings from Adzuna API and formats them to match our database schema.
// //  * @param {string} keyword - The job title or skill to search for (e.g., 'javascript')
// //  * @param {string} country - The 2-letter country code (default: 'gb')
// //  * @param {number} page - The API result page number
// //  * @returns {Promise<Array>} List of formatted job objects
// //  */


// export const searchAdzunaJobs = async (keyword, country = "gb", page = 1) => {
//   try {
//     const appId = process.env.ADZUNA_APP_ID;
//     const appKey = process.env.ADZUNA_APP_KEY;

//      console.log("App ID exists:", !!appId);
//     console.log("App Key exists:", !!appKey);
//     console.log("Country:", country);
//     console.log("Page:", page);
//     console.log("Keyword:", keyword);

//     // Build the exact Adzuna search endpoint URL structure
//     const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`;

//     const response = await axios.get(url, {
//       params: {
//         app_id: appId,
//         app_key: appKey,
//         results_per_page: 20,
//         what: keyword, // e.g., 'nodejs developer'
//          "content-type": "application/json"
//       }
//     });

//     const adzunaJobs = response.data.results || [];

//     // Map and transform Adzuna fields into our local Mongoose Schema format
//     return adzunaJobs.map((job) => {
//       // Map contract type to our exact mongoose enum values
//       let typeOfJob = "full-time"; // fallback default
//       if (job.contract_type === "contract" || job.contract_type === "permanent") {
//         typeOfJob = "full-time";
//       } else if (job.contract_time === "part_time") {
//         // Fallback or map custom fields if your schema supports it
//         typeOfJob = "full-time"; 
//       }

//       return {
//         title: job.title || "Untitled Position",
//         company: job.company?.display_name || "Unknown Company",
//         location: job.location?.display_name || "Remote / Unspecified",
//         // Adzuna splits categories or sentences; we fall back to keyword array if empty
//         skills: job.category?.tag ? [job.category.tag] : [keyword], 
//         jobType: typeOfJob,
//         experience: job.description ? "Check description" : "Not specified",
//         salary: job.salary_max ? `Up to ${job.salary_max}` : "Not disclosed",
//         description: job.description || "",
//         applyUrl: job.redirect_url, // This matches your required applyUrl field
//         source: "Adzuna",           // Identifies where the job came from
//         postedAt: job.created ? new Date(job.created) : new Date() // Formats string to ISO Date
//       };
//     });

//   } catch (error) {
//     console.error("Status:", error.response?.status);
//   console.error("Adzuna response:", error.response?.data);
//   console.error("Message:", error.message);

//   throw new Error(`Adzuna sync failed: ${error.message}`);
//   }
// };

import axios from "axios";
import "dotenv/config";

export const searchAdzunaJobs = async (
  keyword,
  country = "in",
  page = 1
) => {
  try {
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    if (!appId || !appKey) {
      throw new Error("Adzuna API credentials are missing");
    }

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`;

    const response = await axios.get(url, {
      params: {
        app_id: appId,
        app_key: appKey,
        results_per_page: 20,
        what: keyword,
        where: "India",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Adzuna API Error");
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("Message:", error.message);

    throw error;
  }
};