// testing the collector  
import "dotenv/config";
import { collectionJobs } from "../jobs/jobCollector.js";
import dbconnection from "../config/database.js";

const testCollector = async()=>{
    try {
    console.log("🚀 Starting job collector...\n");

    await dbconnection();
    
    const result = await collectionJobs("nodejs", "in", 1,3);

    console.log("\n=== COLLECTION RESULT ===");
    console.log(result);
    console.log("=========================");

    } catch (error) {
        console.error("❌ Collector failed:", error.message);
    }
}

testCollector();
