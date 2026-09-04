import mongoose from "mongoose";

const dbconnection = async()=>{
    await mongoose.connect("REMOVED");
    console.log("database connection succesfully");
}

export default dbconnection