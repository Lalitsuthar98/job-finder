import express from "express"
import { findjob,createJob,getbyid,updatejob,deletejob} from "../controller/jobController.js"; 
import { createJobSchema,updateJobSchema } from "../validator/createjob_validator.js";
import validate from "../middleware/validate.js";


const jobRouter = express.Router();

jobRouter.post("/create",validate(createJobSchema),createJob);
jobRouter.get("/findjob",findjob);
jobRouter.get("/:id",getbyid);
jobRouter.patch("/:id",validate(updateJobSchema),updatejob);
jobRouter.delete("/:id",deletejob);
export default jobRouter;
