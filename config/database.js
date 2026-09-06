import mongoose from "mongoose";

const dbconnection = async()=>{
    await mongoose.connect(process.env.mongourl);
    console.log("database connection succesfully");
}

export default dbconnection