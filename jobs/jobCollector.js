import {searchAdzunaJobs} from "../services/adzunaService.js"
import {normalizeAdzunaJob} from "../services/jobNormalizer.js"
import {jobService} from "../services/jobService.js"


export const collectionJobs = async(
    keyword,
    country = "in",
    page = 1
)=>{
    try {
        // fetch the raw data from adzuna  
        const rawdata = await searchAdzunaJobs(keyword,country,page);

        const jobs = rawdata.results || [];

        let saved = 0;
        let skipped = 0;
        

        // traverse and perform normalize  
        for(const job of jobs){

            if (!job.redirect_url) {
            console.log(`Skipping job ${job.id}: apply URL missing`);
                continue;
            }

            const normalizejob = normalizeAdzunaJob(job);

            // save job and skip dublicate  
            const response = await jobService(normalizejob);


            if(response.status ==="saved"){
                saved++;
            }else if(response.status === "skipped"){
                skipped++;
            }
        }

        return {
            total: jobs.length,
            saved,
            skipped
        };

    } catch (error) {
        console.log("Job collection failed:", error.message);
        throw error
    }
};