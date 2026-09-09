import "dotenv/config";
import express from "express";
import jobRouter from "./Router/jobRouter.js";
import dbconnection from "./config/database.js";
import { startJobScheduler } from "./jobs/jobScheduler.js";

const app = express();

app.use(express.json());

// app.use("/user", userRouter);
app.use("/job", jobRouter);

// app.use("/", (req, res) => {
//     res.send("server is working");
// });

const startServer = async() => {
    // await database connection  
    try {
        // starting the databae connection
         await dbconnection();

        // starting the jobscheduling 
        startJobScheduler();
        
        app.listen(process.env.port,() => {
        console.log("Server is running on port 3000");
    });
    } catch (error) {
        console.log(error)
    }
};

startServer();