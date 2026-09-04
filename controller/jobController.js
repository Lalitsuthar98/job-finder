import JobModel from "../model/Job_model.js";

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
        if(req.query.skills) filter["skills"] = req.query.skills;
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

export {
    createJob,
    findjob
};