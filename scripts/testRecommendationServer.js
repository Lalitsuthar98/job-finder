import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";

import dbconnection from "../config/database.js";
import jobRouter from "../Router/jobRouter.js";
import userRouter from "../Router/userRouter.js";
import applicationRouter from "../Router/applicationRouter.js"

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/job", jobRouter);
app.use("/user", userRouter);
app.use("/application",applicationRouter);

const startTestServer = async () => {
  try {
    await dbconnection();

    app.listen(3001, () => {
      console.log("Recommendation test server running on port 3001");
    });
  } catch (error) {
    console.log("Test server error:", error.message);
  }
};

startTestServer();