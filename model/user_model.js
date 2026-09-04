import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  Age:{
    type:Number,
    require:true,
    min:8
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  }
},
{
    timestamps:true,
});

const user = mongoose.model("user",userSchema);

export default user 
