import { getRecommendedJobs } from "../services/jobRecommendationService.js";

export const getRecommendedJobsController = async (req, res) => {
  try {
    const recommendations = await getRecommendedJobs(req.user._id);

    return res.status(200).json({
      success: true,
      total: recommendations.length,
      recommendations,
    });
  } catch (error) {
    console.error(
      "Error in recommendation controller:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get job recommendations",
    });
  }
};