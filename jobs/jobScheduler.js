import cron from "node-cron"
import { collectionJobs } from "./jobCollector.js"

export const startJobScheduler = ()=>{

    cron.schedule("*/2 * * * *",async()=>{

        console.log("\n⏰ Job collection started");

        try {
            const result = await collectionJobs(
                "nodejs",
                "in",
                1,
                3
            );

           console.log("✅ Collection completed:", result);
        } catch (error) {
             console.error(
                 "❌ Scheduled collection failed:",
                error.message
            );  
        }
    })
}