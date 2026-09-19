// Autheticate middleware  
import jwt from "jsonwebtoken"
import user from "../model/user_model.js"

export const authUserMiddleware = async(req,res,next)=>{
      try {
        const token = req.cookies?.token;

        if(!token){
            return res.status(401).json({
                message:"UnAuthenticate user ,first login"
            });
        }
        if(!process.env.SECRET_KEY){
            console.error("SECRET_KEY is missing");
            return res.status(500).json({
                message:"Authetication configuration error",
            });
        }

        const payload = jwt.verify(
            token,
            process.env.SECRET_KEY
        );

        if(!payload){
            console.log("Invalid authetication token")
            return res.status(401).json({
                message:"Invalid authentication token"
            })
        }

        const userid = payload.id;

        const userdata = await user.findOne({
            _id:userid
        });
        req.user = userdata;
        next()

      } catch (error) {
        console.log("Autheticatemiddleware error",error);
        res.status(500).json({
            message:"Internal server error",
        }
        )
      }
};