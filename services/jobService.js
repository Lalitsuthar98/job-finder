// implement the function for checking the function is exist or not 

// import JobModel from "../model/Job_model.js"
// export const jobService  = async(normalizejob)=>{
//      try {
//           const existingjob = await JobModel.findOne({
//             source:normalizejob.source,
//             externalJobId: normalizejob.externalJobId
//           })

//           if(existingjob){
//             return {
//                 status:"skipped",
//                 message:"job already exists in the database",
//                 data:existingjob
//             }
//           }

//           const newjob = await JobModel.create(normalizejob)
//           return {
//             status:"saved",
//             message:"New job successfully added to the database.",
//             data:newjob
//           };

//      } catch (error) {
//         console.log("Error inside jobsave service:",error.message);
//         throw new Error(`Failed to save job: ${error.message}`);
//      }
// };


// new updated code accrding to architecture  

import JobModel from "../model/Job_model.js";

export const jobService = async (normalizedJobs) => {
  try {
    if (!normalizedJobs || normalizedJobs.length === 0) {
      return {
        inserted: 0,
        updated: 0,
        unchanged: 0,
      };
    }

    // 1. Get all externalJobIds from Adzuna jobs
    const externalJobIds = normalizedJobs.map(
      (job) => job.externalJobId
    );

    // 2. Find existing jobs in MongoDB
    const existingJobs = await JobModel.find({
      source: "Adzuna",
      externalJobId: { $in: externalJobIds },
    }).lean();

    // 3. Convert existing jobs into a Map
    const existingJobMap = new Map(
      existingJobs.map((job) => [
        `${job.source}:${job.externalJobId}`,
        job,
      ])
    );

    const operations = [];

    let inserted = 0;
    let updated = 0;
    let unchanged = 0;

    // 4. Compare every normalized job
    for (const job of normalizedJobs) {
      const key = `${job.source}:${job.externalJobId}`;

      const existingJob = existingJobMap.get(key);

      // -------------------------
      // NEW JOB
      // -------------------------
      if (!existingJob) {
        operations.push({
          insertOne: {
            document: job,
          },
        });

        inserted++;
        continue;
      }

      // -------------------------
      // EXISTING JOB
      // -------------------------
      const changes = [];

if (existingJob.title !== job.title) {
  changes.push("title");
}

if (existingJob.company !== job.company) {
  changes.push("company");
}

if (existingJob.location !== job.location) {
  changes.push("location");
}

if (existingJob.jobType !== job.jobType) {
  changes.push("jobType");
}

if (existingJob.experience !== job.experience) {
  changes.push("experience");
}

if (existingJob.salary !== job.salary) {
  changes.push("salary");
}

if (existingJob.description !== job.description) {
  changes.push("description");
}
if (
  new Date(existingJob.postedAt).getTime() !==
  new Date(job.postedAt).getTime()
) {
  changes.push("postedAt");
}

if (
  JSON.stringify(existingJob.skills) !==
  JSON.stringify(job.skills)
) {
  changes.push("skills");
}
const hasChanged = changes.length > 0;

      // -------------------------
      // CHANGED JOB
      // -------------------------
      if (hasChanged) {

         console.log(
          `Job ${job.externalJobId} changed:`,
          changes
        );
        operations.push({
          updateOne: {
            filter: {
              source: job.source,
              externalJobId: job.externalJobId,
            },
            update: {
              $set: job,
            },
          },
        });

        updated++;
      }

      // -------------------------
      // SAME JOB
      // -------------------------
      else {
        unchanged++;
      }
    }

    // 5. Execute all DB operations together
    if (operations.length > 0) {
      await JobModel.bulkWrite(operations);
    }

    return {
      inserted,
      updated,
      unchanged,
    };

  } catch (error) {
    console.error(
      "Error inside jobService:",
      error.message
    );

    throw new Error(
      `Failed to process jobs: ${error.message}`
    );
  }
};



