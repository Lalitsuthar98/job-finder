import cron from "node-cron"
import { collectionJobs } from "./jobCollector.js"

export const startJobScheduler = ()=>{


    let iscollecting = false;
    cron.schedule("*/2 * * * *",async()=>{
          
         if(iscollecting){
            console.log("[Scheduler] Collection already running .Skipping...");
            return;
         }

         iscollecting = true;


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