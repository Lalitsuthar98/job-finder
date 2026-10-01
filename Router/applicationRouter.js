import express from "express";
import { 
    applyToJobController,
    getUserApplicationsController,
    getSingleApplicationController,updateApplicationStatusController
} from "../controller/applicationController.js";
import { authUserMiddleware } from "../middleware/Autheticate_middleware.js";
import validate from "../middleware/validate.js";
import {
  updateApplicationStatusSchema,
  applicationFilterSchema
} from "../validator/applicationValidator.js";

const applicationRouter = express.Router();

applicationRouter.post(
  "/",
  authUserMiddleware,
  applyToJobController
);

applicationRouter.get(
  "/",
  authUserMiddleware,
  validate(applicationFilterSchema),
  getUserApplicationsController
);

applicationRouter.get(
  "/:id",
  authUserMiddleware,
  getSingleApplicationController
);

// application patch 

applicationRouter.patch(
  "/:id/status",
  authUserMiddleware,
  validate(updateApplicationStatusSchema),
  updateApplicationStatusController
);

export default applicationRouter;

// POST /application
//       ↓
// authUserMiddleware
//       ↓
// Is user logged in?
//       ↓
//       YES
//       ↓
// applyToJobController
//       ↓
// applyToJob()
//       ↓
// Create Application

// this application router 
