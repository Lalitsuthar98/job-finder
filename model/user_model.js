import mongoose from "mongoose";

const preferenceSchema = new mongoose.Schema(
  {
    skills: {
      type: [String],
      default: [],
    },

    jobTypes: {
      type: [String],
      enum: ["full-time", "internship"],
      default: [],
    },

    experienceLevels: {
      type: [String],
      enum: ["fresher", "junior", "mid", "senior"],
      default: [],
    },

    preferredLocations: {
      type: [String],
      default: [],
    },

    salary: {
      min: {
        type: Number,
        default: null,
        min: 0,
      },

      max: {
        type: Number,
        default: null,
        min: 0,
      },
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
      min: 18,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    preferences: {
      type: preferenceSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);

export default user;