import JobModel from "../model/Job_model.js";
import mongoose from "mongoose";

 const createJob = async(req,res)=>{
     if(!req.body){
        return res.status(400).json({
            message:"req.body cannot we empty",
        })
     }

     try {
         
        const jobdata = await JobModel.create(req.body);
         
        res.status(201).json({
            message:"job is created",
            data:jobdata
        });


        
     } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
     }
}
const findjob  = async(req,res)=>{
     
    try{
        const page = Number(req.query.page) || 1    ;
        const limit = Number(req.query.limit) || 10;
                
        const filter  = {};
        if(req.query.skills) {
            // filter["skills"] = req.query.skills;

            const skillsArray = req.query.skills.split(",").map(skills => skills.trim());
            filter.skills = {$in:skillsArray};
        }
        if(req.query.location) filter["location"] = req.query.location
        if(req.query.jobType)filter["jobType"] = req.query.jobType
        if(req.query.experience) filter["experience"] = req.query.experience;
       

        const skip = (page  - 1) * limit;

        const jobdata = await JobModel.find(filter).sort({postedAt:-1}).skip(skip).limit(limit);

        const totaljobs = await JobModel.countDocuments(filter);

        const totalpages = Math.ceil(totaljobs/limit);

        res.status(200).json({
            message:"fetch the job",
            jobdata,
            pagination:{
                page,
                limit,
                totaljobs,
                totalpages
            }
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Failed to fetch jobs"
        })
    }
}

const getbyid = async(req,res)=>{

     try {
        
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                error:"Invalid job ID format"
            });
        }

        const job = await JobModel.findById(id);

        if(!job){
           return res.status(404).json({
                error:"NO such job found"
            });
        }

        res.status(200).json({
            data: job
        });

     } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        })
     }
}

const updatejob = async(req,res)=>{
    try {
          const id = req.params.id;
       if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                error:"Invalid job ID format"
            });
        }

        // prevent empty updates  
     if (!req.body || Object.keys(req.body).length === 0) {
         return res.status(400).json({
         error: "Update fields cannot be empty."
         });
    }
    
    const updatedJob = await JobModel.findByIdAndUpdate(
        id,
        {$set:req.body},
        {
            new: true,
            runValidators:true
        }
    )

    if(!updatedJob){
        return res.status(404).json({
            error:"No such job found to update"
        })
    }

    res.status(200).json(
        updatedJob
    );
    


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal server error"
        });
    }
}

const deletejob = async(req,res)=>{

   try {
       const { id } = req.params;
    
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
        error: "Invalid Job ID format." 
        });
    }
       
    const deletedJob = await JobModel.findByIdAndDelete(id);

    if(!deletedJob){
        return res.status(404).json({
            error:"No such found job and delete"
        })
    }

    res.status(200).json({
        message:"jobs succesfully deleted.",
        deletedJob
    })
   } catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Internal server error"
    })
   }

}

export {
    createJob,
    findjob,
    getbyid,
    updatejob,
    deletejob
};