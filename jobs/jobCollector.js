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
import CollectorState from "../model/CollectorState_model.js";


export const collectionJobs = async(
    keyword,
    country = "in",
    startPage = 1,
    totalPagesRequested = 3
)=>{
    try {
         const MAX_PAGES = 3;
         const pagesTofetch = Math.min(totalPagesRequested,MAX_PAGES);

         // collectorstate 
         const collectorState = await CollectorState.findOne({
            source: "Adzuna",
            keyword,
            country,
          }).lean();

          const lastProcessedAt =
              collectorState?.lastProcessedAt || null;

           console.log(
                "[Collector] Last processed at:",
                lastProcessedAt
               );


         console.log(`[collector] Starting multi-page pipeline for keyword  ${keyword}`)

        console.log(`[Collector] Target Pages: ${startPage} to ${startPage + pagesTofetch - 1}`);

         const normalizedJobs = [];

         let totalFetched = 0;
         let totalSkipped = 0;
         
        for(let i = 0 ; i < pagesTofetch ; i++){
            const currentPage = startPage + i;
            
            console.log(`\n--- Fetching Page ${currentPage} ---`);

            const rawdata = await searchAdzunaJobs(keyword,country,currentPage);

            const jobs = rawdata.results || [];

             console.log(
               jobs.slice(0, 5).map((job) => ({
                id: job.id,
                title: job.title,
                created: job.created,
              }))
              );


            console.log(`[Page ${currentPage}] Received ${jobs.length} jobs.`);

            if (jobs.length === 0) {
             console.log(`[Page ${currentPage}] No jobs found. Ending loop early.`);
             break;
            }

            totalFetched+=jobs.length;

            // 2 process all jobs belonging to the current page 
           for (const job of jobs) {
        try {
               // Validate required external data
              if (!job.id) {
                console.log( "Skipping job: external ID missing");
                totalSkipped++;
                continue;
               }
              if (!job.redirect_url) {
              console.log(
            `Skipping job ${job.id || "Unknown"}: apply URL missing`
            );

            totalSkipped++;
            continue;
        }

         const normalizedJob =
            normalizeAdzunaJob(job);

        // conditon of incremental 
        if(lastProcessedAt && normalizedJob.postedAt <= lastProcessedAt){
          totalSkipped++;
          continue;
        }
        
          // Add to batch
          normalizedJobs.push(normalizedJob);

        // const response = await jobService(normalizejob);


  } catch (error) {
    console.log(
      `Failed to normalize job ${job.id || "Unknown"}: ${error.message}`
    );
    totalSkipped++;
   }
  }
}

const newestJobDate = normalizedJobs.reduce(
  (latest, job) => {
    if (!latest) {
      return job.postedAt;
    }

    return job.postedAt > latest
      ? job.postedAt
      : latest;
  },
  null
);

console.log(
  "[Collector] Newest job date:",
  newestJobDate
);

if (newestJobDate) {
  await CollectorState.findOneAndUpdate(
    {
      source: "Adzuna",
      keyword,
      country,
    },
    {
      $set: {
        lastProcessedAt: newestJobDate,
      },
    },
    {
      upsert: true,
      new: true,
    }
  );

  console.log(
    "[Collector] Collector state updated:",
    newestJobDate
  );
}


// Send whole Batch to service  
    console.log(
      `\n[Collector] Normalized jobs: ${normalizedJobs.length}`
    );

    const result = await jobService(normalizedJobs);

    // --------------------------------
    // FINAL RESULT
    // --------------------------------

    return {
      total: totalFetched,
      normalized: normalizedJobs.length,
      inserted: result.inserted,
      updated: result.updated,
      unchanged: result.unchanged,
      skipped: totalSkipped,
    };

    } catch (error) {
        console.log("Job collection failed:", error.message);
        throw error;
    }
}

