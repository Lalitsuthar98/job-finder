import express from "express"

import { findjob,createJob } from "../controller/jobController.js";


const jobRouter = express.Router();

jobRouter.post("/create",createJob);
jobRouter.get("/findjob",findjob);


export default jobRouter;
