import Like from "../models/Like.js";
import Roadmap from "../models/Roadmap.js";
import createNotification from "../utils/createNotification.js";

// Like Roadmap
export const likeRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const roadmap = await Roadmap.findById(roadmapId);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    const existingLike = await Like.findOne({
      user: req.user._id,
      roadmap: roadmapId,
    });

    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: "You already liked this roadmap.",
      });
    }

    const like = await Like.create({
      user: req.user._id,
      roadmap: roadmapId,
    });

    // Keep roadmap likes array updated
    roadmap.likes.push(req.user._id);
    await roadmap.save();

    // Create notification
    await createNotification({
      recipient: roadmap.createdBy,
      sender: req.user._id,
      roadmap: roadmap._id,
      type: "like",
      message: `${req.user.name} liked your roadmap.`,
    });

    res.status(201).json({
      success: true,
      message: "Roadmap liked successfully.",
      like,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Unlike Roadmap
export const unlikeRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const like = await Like.findOneAndDelete({
      user: req.user._id,
      roadmap: roadmapId,
    });

    if (!like) {
      return res.status(404).json({
        success: false,
        message: "Like not found.",
      });
    }

    // Remove user from roadmap likes array
    await Roadmap.findByIdAndUpdate(
      roadmapId,
      {
        $pull: {
          likes: req.user._id,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Roadmap unliked successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Roadmap Likes
export const getRoadmapLikes = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const likes = await Like.find({
      roadmap: roadmapId,
    })
      .populate("user", "name username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: likes.length,
      likes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};