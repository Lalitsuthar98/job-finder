// userController hold the user signup,login, logout,profile 
import user from "../model/user_model.js";
import {signupSchema,loginSchema} from "../validator/User_validator.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const createToken = (id,email)=>{
    if(!process.env.SECRET_KEY){
       throw new Error("Jwt secret key i missing");
    }

    return jwt.sign(
        {
            id:id.toString(),
            email
        },
        process.env.SECRET_KEY,
        {
            expiresIn:"1h",
        }
    )
}
 
export const signup = async(req,res)=>{
  try {
    const result = signupSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: result.error.issues[0].message,
        })
    }

    const {name,age,password,email,phone} = result.data;

    const existingUser = await user.findOne({
        email
    });
    if(existingUser){
        return res.status(409).json({
            message:"User email already exists",
        });
    }

    const hashpassword = await bcrypt.hash(
        password,10
    );

    const profile = await user.create({
        name,
        age,
        password: hashpassword,
        email,
        phone
    });

    return res.status(201).json({
        message:"signup successfully",
        profile:{
            id:profile._id,
            name:profile.name,
            age:profile.age,
            email:profile.email,
            phone:profile.phone
        }
    });
  } catch (error) {   
    console.log("signup error:",error);

    if(error.code === 11000){
        return res.status(409).json({
            message:"User email already exists",
        });
    }
    return res.status(500).json({
        message:"Internal server error",
    });
  }
};

export const login = async(req,res)=>{
   try {
     const result = loginSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message:result.error.issues[0].message,
        })
    }

    const {email,password}  = result.data;

    const existingUser = await user.findOne({
        email
    }).select("+password");

    if(!existingUser){
        return res.status(401).json({
            message:"Invalid credentails",
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        existingUser.password
    );
     
    if(!isMatch){
        return res.status(401).json({
            message:"Invalid credentails"
        });
    }

    const token = createToken(existingUser._id,existingUser.email);

    res.cookie("token",token,{
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite:"lax",
         maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
        message:"User logged in successfully",
        data:{
            id:existingUser._id,
            name:existingUser.name,
            age:existingUser.age,
            email:existingUser.email,
            phone:existingUser.phone
        }
    })
   } catch (error) {
    console.log("Login error:",error);
    return res.status(500).json({
        message:"Internal server error",
    });
   }
};

export const profile = async (req, res) => {
  try {
    const existingUser = req.user;

    return res.status(200).json({
      id: existingUser._id,
      name: existingUser.name,
      age: existingUser.age,
      email: existingUser.email,
      phone: existingUser.phone,
      preferences: existingUser.preferences
    });
  } catch (error) {
    console.log("Profile error:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

// DELETE ACCOUNT  
export const deleteAccount = async(req,res)=>{
    try {
        const userId = req.user.id;
         
        await user.deleteOne({
            _id:userId
        })

        res.clearCookie("token",{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"lax"
        });

        return res.status(200).json({
            message:"Account deleted Successfully",
        });
    } catch (error) {
        console.log("Delete account error:",error) 
        return res.status(500).json({
            message:"Internal server error",
        })
    }
};


// logout 

export const logout = async(req,res)=>{
    try {
          
        // After Autheticate midlleware  
         res.clearCookie("token",{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"lax"
        });

        return res.status(200).json({
            message:"User logout successfully"
        });
    } catch (error) {
        console.log("Logout error:",error);

        res.status(500).json({
            message:"Internal server error"
        })
    }
}