import express from "express"
import { findjob,createJob,getbyid,updatejob,deletejob} from "../controller/jobController.js"; 
import { createJobSchema,updateJobSchema } from "../validator/createjob_validator.js";
import validate from "../middleware/validate.js";
import { getRecommendedJobsController } from "../controller/recommendationController.js";
import { authUserMiddleware } from "../middleware/Autheticate_middleware.js";

const jobRouter = express.Router();

jobRouter.post("/create",validate(createJobSchema),createJob);
jobRouter.get("/findjob",findjob);
jobRouter.get("/recommendations",authUserMiddleware,getRecommendedJobsController);
jobRouter.get("/:id",getbyid);
jobRouter.patch("/:id",validate(updateJobSchema),updatejob);
jobRouter.delete("/:id",deletejob);
export default jobRouter;
