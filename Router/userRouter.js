import express from "express"
import validate from "../middleware/validate.js";
import {updatePreferenceSchema} from "../validator/preferenceSchema.js"
import {updatePreferences} from "../controller/preferenceController.js"
import {login,signup,profile,deleteAccount,logout} from "../controller/userController.js"
import {authUserMiddleware} from "../middleware/Autheticate_middleware.js"

const userRouter = express.Router();

userRouter.patch("/preferences",authUserMiddleware,validate(updatePreferenceSchema),updatePreferences);
userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.delete("/deleteAccount",authUserMiddleware,deleteAccount);
userRouter.get("/profile",authUserMiddleware,profile);
userRouter.post("/logout",authUserMiddleware,logout);

export default userRouter; 