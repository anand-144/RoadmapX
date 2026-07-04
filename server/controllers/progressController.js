import Progress from "../models/Progress.js";
import Roadmap from "../models/Roadmap.js";

// Mark Topic Complete
export const completeTopic = async (req, res) => {
  try {
    const { roadmapId, topicId } = req.params;

    const roadmap = await Roadmap.findById(roadmapId);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    const topicExists = roadmap.topics.some(
      (topic) => topic._id.toString() === topicId
    );

    if (!topicExists) {
      return res.status(404).json({
        success: false,
        message: "Topic not found.",
      });
    }

    let progress = await Progress.findOne({
      user: req.user._id,
      roadmap: roadmapId,
    });

    if (!progress) {
      progress = await Progress.create({
        user: req.user._id,
        roadmap: roadmapId,
      });
    }

    if (!progress.completedTopics.includes(topicId)) {
      progress.completedTopics.push(topicId);
    }

    progress.lastCompletedTopic = topicId;

    progress.completionPercentage = Math.round(
      (progress.completedTopics.length / roadmap.topics.length) * 100
    );

    progress.isCompleted =
      progress.completedTopics.length === roadmap.topics.length;

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Topic marked as completed.",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Completed Topic
export const removeCompletedTopic = async (req, res) => {
  try {
    const { roadmapId, topicId } = req.params;

    const roadmap = await Roadmap.findById(roadmapId);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    const progress = await Progress.findOne({
      user: req.user._id,
      roadmap: roadmapId,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found.",
      });
    }

    progress.completedTopics = progress.completedTopics.filter(
      (id) => id.toString() !== topicId
    );

    progress.completionPercentage = Math.round(
      (progress.completedTopics.length / roadmap.topics.length) * 100
    );

    progress.isCompleted =
      progress.completedTopics.length === roadmap.topics.length;

    progress.lastCompletedTopic =
      progress.completedTopics.length > 0
        ? progress.completedTopics[progress.completedTopics.length - 1]
        : null;

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Topic removed from completed list.",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Progress for One Roadmap
export const getRoadmapProgress = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const progress = await Progress.findOne({
      user: req.user._id,
      roadmap: roadmapId,
    });

    if (!progress) {
      return res.status(200).json({
        success: true,
        progress: null,
      });
    }

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Progress
export const getMyProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.user._id,
    })
      .populate("roadmap", "title slug thumbnail difficulty")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: progress.length,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};