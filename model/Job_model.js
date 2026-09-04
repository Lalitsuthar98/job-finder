import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    skills: {
        type: [String],
        default: []
    },

    jobType: {
        type: String,
        enum: ["full-time", "internship"],
        required: true
    },

    experience: {
        type: String
    },

    salary: {
        type: String
    },

    description: {
        type: String
    },

    applyUrl: {
        type: String,
        required: true
    },

    source: {
        type: String,
        required: true
    },

    postedAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

jobSchema.index(
    { source: 1, applyUrl: 1 },
    { unique: true }
);
const JobModel = mongoose.model("Job", jobSchema);
export default JobModel;
