// model for collectorstate model 

import mongoose from "mongoose";

const collectorStateSchema = new mongoose.Schema({
       source:{
        type:String,
        required:true
        },
        keyword:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        lastProcessedAt: {
            type:Date,
            required:true,
        },

},
{
    timestamps:true,
});


collectorStateSchema.index(
    {
        source:1,
        keyword:1,
        country:1,
    },
    {
        unique:true,
    }
);


const CollectorState = mongoose.model(
    "CollectorState",
    collectorStateSchema
);

export default CollectorState;

