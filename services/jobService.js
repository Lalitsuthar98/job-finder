// implement the function for checking the function is exist or not 

import JobModel from "../model/Job_model.js"
export const jobService  = async(normalizejob)=>{
     try {
          const existingjob = await JobModel.findOne({
            source:normalizejob.source,
            externalJobId: normalizejob.externalJobId
          })

          if(existingjob){
            return {
                status:"skipped",
                message:"job already exists in the database",
                data:existingjob
            }
          }

          const newjob = await JobModel.create(normalizejob)
          return {
            status:"saved",
            message:"New job successfully added to the database.",
            data:newjob
          };

     } catch (error) {
        console.log("Error inside jobsave service:",error.message);
        throw new Error(`Failed to save job: ${error.message}`);
     }
};
// this is jobservie function 




