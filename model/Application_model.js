import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    status: {
      type: String,
      enum: ["applied", "interview", "selected", "rejected"],
      default: "applied",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index(
  { user: 1, job: 1 },
  { unique: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;