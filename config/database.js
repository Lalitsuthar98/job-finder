import mongoose from "mongoose";

const dbconnection = async()=>{
    await mongoose.connect();
    console.log("database connection succesfully");
}

export default dbconnection