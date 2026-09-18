import user from "../model/user_model.js"

export const updatePreferences = async(req,res)=>{
    try {
        const userId = req.user.id;

        const updatedUser = await user.findByIdAndUpdate(
            userId,
            {
                $set: Object.fromEntries(
                Object.entries(req.body).map(([key, value]) => [
                `preferences.${key}`,
                 value,
            ])
            ),

            },
            {
                new:true,
                runValidators:true,
            }
        ).select("-password");

        if(!updatedUser){
            res.status(404).json({
                message:"User not found",
            });
        }

        return res.status(200).json({
            message:"preferences updated succesfully",
            preferences:updatedUser.preferences
        })
    } catch (error) {
        console.log("update prefernces error:",error.message);
        return res.status(500).json({
            message:"Failed to update preferences",
        });
    }
};
