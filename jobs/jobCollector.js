// import {searchAdzunaJobs} from "../services/adzunaService.js"
// import {normalizeAdzunaJob} from "../services/jobNormalizer.js"
// import {jobService} from "../services/jobService.js"


// export const collectionJobs = async(
//     keyword,
//     country = "in",
//     page = 1
// )=>{
//     try {
//         // fetch the raw data from adzuna  
//         const rawdata = await searchAdzunaJobs(keyword,country,page);

//         const jobs = rawdata.results || [];

//         let saved = 0;
//         let skipped = 0;
        

//         // traverse and perform normalize  
//         for(const job of jobs){

//             if (!job.redirect_url) {
//             console.log(`Skipping job ${job.id}: apply URL missing`);
//                 continue;
//             }

//             const normalizejob = normalizeAdzunaJob(job);

//             // save job and skip dublicate  
//             const response = await jobService(normalizejob);


//             if(response.status ==="saved"){
//                 saved++;
//             }else if(response.status === "skipped"){
//                 skipped++;
//             }
//         }

//         return {
//             total: jobs.length,
//             saved,
//             skipped
//         };

//     } catch (error) {
//         console.log("Job collection failed:", error.message);
//         throw error
//     }
// };

import { searchAdzunaJobs } from "../services/adzunaService.js";
import { normalizeAdzunaJob } from "../services/jobNormalizer.js";
import { jobService } from "../services/jobService.js";


export const collectionJobs = async(
    keyword,
    country = "in",
    startPage = 1,
    totalPagesRequested = 3
)=>{
    try {
         const MAX_PAGES = 3;
         const pagesTofetch = Math.min(totalPagesRequested,MAX_PAGES);


         console.log(`[collector] Starting multi-page pipeline for keyword  ${keyword}`)

        console.log(`[Collector] Target Pages: ${startPage} to ${startPage + pagesTofetch - 1}`);

         
        let totalFetched = 0;
        let totalSaved = 0;
        let totalSkipped = 0;

        for(let i = 0 ; i < pagesTofetch ; i++){
            const currentPage = startPage + i;
            
            console.log(`\n--- Fetching Page ${currentPage} ---`);

            const rawdata = await searchAdzunaJobs(keyword,country,currentPage);

            const jobs = rawdata.results || [];

            console.log(`[Page ${currentPage}] Received ${jobs.length} jobs.`);

            if (jobs.length === 0) {
             console.log(`[Page ${currentPage}] No jobs found. Ending loop early.`);
             break;
            }

            totalFetched+=jobs.length;

            // 2 process all jobs belonging to the current page 
           for (const job of jobs) {
        try {
            if (!job.redirect_url) {
              console.log(
            `Skipping job ${job.id || "Unknown"}: apply URL missing`
            );

            totalSkipped++;
            continue;
        }

        const normalizejob = normalizeAdzunaJob(job);

        const response = await jobService(normalizejob);

        if (response.status === "saved") {
        totalSaved++;
        } else if (response.status === "skipped") {
        totalSkipped++;
        }

  } catch (error) {
    console.log(
      `Failed to process job ${job.id || "Unknown"}: ${error.message}`
    );

    totalSkipped++;
   }
  }
}

        return {
            total:totalFetched,
            saved:totalSaved,
            skipped:totalSkipped
        };

    } catch (error) {
        console.log("Job collection failed:", error.message);
        throw error;
    }
}

