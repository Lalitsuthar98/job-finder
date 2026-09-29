import { success } from "zod";
import { applyToJob,getUserApplications,getSingleApplication,updateApplicationStatus } from "../services/applicationService.js";

export const applyToJobController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    const application = await applyToJob(userId, jobId);

    return res.status(201).json({
      success: true,
      message: "Job application created successfully",
      application,
    });
  } catch (error) {
    console.error("Apply to job error:", error.message);

    if (error.message === "Job not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "You have already applied to this job") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to apply for job",
    });
  }
};

export const getUserApplicationsController = async (req, res) => {
  try {
    const userId = req.user._id;

    const applications = await getUserApplications(userId);

    return res.status(200).json({
      success: true,
      total: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get user applications error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to get applications",
    });
  }
};

export const getSingleApplicationController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: applicationId } = req.params;

    const application = await getSingleApplication(
      userId,
      applicationId
    );

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(
      "Get single application error:",
      error.message
    );

    if (error.message === "Application not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to get application",
    });
  }
};

export const updateApplicationStatusController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: applicationId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const application = await updateApplicationStatus(
      userId,
      applicationId,
      status
    );

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error(
      "Update application status error:",
      error.message
    );

    if (error.message === "Application not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};
// POST /application
    //    ↓
// Authentication middleware
//        ↓
// req.user._id
//        ↓
// Controller
//        ↓
// applicationService
//        ↓
// Check Job
//        ↓
// Check duplicate Application
//        ↓
// Create Application
//        ↓
// MongoDB