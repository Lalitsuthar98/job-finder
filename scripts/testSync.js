// import { searchAdzunaJobs } from "../services/adzunaService.js";
// import axios from "axios";


// const testAdzunaData = async () => {
//   try {
//     console.log("Fetching and formatting data from Adzuna... 🚀");
    
//     // Call the service function to get the clean array
//     const rawJobs = await searchAdzunaJobs("nodejs", "gb", 1);

//     // Print the total number of jobs found
//     console.log(`Total jobs fetched: ${rawJobs.length}\n`);

//     if (rawJobs.length === 0) {
//       console.log("No jobs returned. Check your API credentials or keywords.");
//       return;
//     }

//     // Print the first job object to inspect its format
//     console.log("=== FIRST FORMATTED JOB SAMPLE ===");
//     console.log(JSON.stringify(rawJobs[0], null, 2));
//     console.log("==================================");

//   } catch (err) {
//     console.error("❌ Test failed with error:", err.message);
//   }
// };

// // Run the test
// testAdzunaData();

// import { searchAdzunaJobs } from "../services/adzunaService.js";
// // import { normalizeAdzunaJob } from "../services/jobNormalizer.js";

// const testAdzunaData = async () => {
//   try {
//     console.log("Fetching jobs from Adzuna... 🚀");

//     const data = await searchAdzunaJobs("nodejs", "in", 1);

//     console.log(`Total jobs: ${data.results?.length}`);

//     console.log("\n=== FIRST RAW JOB ===");

//    console.log(
//     JSON.stringify(data.results?.[0], null, 2)
//   );

// console.log("\n=====================");
//   } catch (error) {
//     console.error("❌ Test failed:", error.message);
//   }
// };

// testAdzunaData();


import { searchAdzunaJobs } from "../services/adzunaService.js";

const testAdzunaData = async () => {
  try {
    console.log("Fetching jobs from Adzuna... 🚀");

    const data = await searchAdzunaJobs("nodejs", "in", 1);

    console.log(`Total jobs: ${data.results?.length}`);

    console.log("\n=== FIRST RAW JOB ===");

    console.log(
      JSON.stringify(data.results?.[0], null, 2)
    );

    console.log("\n=====================");

  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
};

testAdzunaData();