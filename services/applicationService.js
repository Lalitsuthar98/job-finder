
import Application from "../model/Application_model.js";
import JobModel from "../model/Job_model.js";

export const applyToJob = async (userId, jobId) => {
  // 1. Check whether the job exists
  const job = await JobModel.findById(jobId);

  if (!job) {
    throw new Error("Job not found");
  }

  // 2. Check whether the user already applied
  const existingApplication = await Application.findOne({
    user: userId,
    job: jobId,
  });

  if (existingApplication) {
    throw new Error("You have already applied to this job");
  }

  // 3. Create a new application
  const application = await Application.create({
    user: userId,
    job: jobId,
    status: "applied",
  });

  return application;
};


export const getUserApplications = async(userId) =>{
    const applications = await Application.find({
        user:userId,
    }).populate("job");
}

export const getSingleApplication = async (userId, applicationId) => {
  const application = await Application.findOne({
    _id: applicationId,
    user: userId,
  }).populate("job");

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
};

export const updateApplicationStatus = async (
  userId,
  applicationId,
  newStatus
) => {
  const application = await Application.findOne({
    _id: applicationId,
    user: userId,
  });

  if (!application) {
    throw new Error("Application not found");
  }

  application.status = newStatus;

  await application.save();

  return application;
};

