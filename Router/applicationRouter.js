import express from "express";
import { applyToJobController,getUserApplicationsController,getSingleApplicationController} from "../controller/applicationController.js";
import { authUserMiddleware } from "../middleware/Autheticate_middleware.js";

const applicationRouter = express.Router();

applicationRouter.post(
  "/",
  authUserMiddleware,
  applyToJobController
);

applicationRouter.get(
  "/",
  authUserMiddleware,
  getUserApplicationsController
);

applicationRouter.get(
  "/:id",
  authUserMiddleware,
  getSingleApplicationController
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

