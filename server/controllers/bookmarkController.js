import Bookmark from "../models/Bookmark.js";
import Roadmap from "../models/Roadmap.js";
import createNotification from "../utils/createNotification.js";

// Add Bookmark
export const addBookmarks = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    // Check if roadmap exists
    const roadmap = await Roadmap.findById(roadmapId);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    // Check if already bookmarked
    const existingBookmark = await Bookmark.findOne({
      user: req.user._id,
      roadmap: roadmapId,
    });

    if (existingBookmark) {
      return res.status(400).json({
        success: false,
        message: "Roadmap already bookmarked.",
      });
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      roadmap: roadmapId,
    });

    // Keep roadmap saves array updated
    roadmap.saves.push(req.user._id);
    await roadmap.save();

    // Create notification
    await createNotification({
      recipient: roadmap.createdBy,
      sender: req.user._id,
      roadmap: roadmap._id,
      type: "bookmark",
      message: `${req.user.name} bookmarked your roadmap.`,
    });

    res.status(201).json({
      success: true,
      message: "Roadmap bookmarked successfully.",
      bookmark,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Bookmark
export const removeBookmark = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const bookmark = await Bookmark.findOneAndDelete({
      user: req.user._id,
      roadmap: roadmapId,
    });

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        message: "Bookmark not found.",
      });
    }

    // Remove from roadmap saves array
    await Roadmap.findByIdAndUpdate(
      roadmapId,
      {
        $pull: {
          saves: req.user._id,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Bookmark removed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Bookmarks
export const getMyBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user._id,
    })
      .populate(
        "roadmap",
        "title slug description difficulty thumbnail createdBy"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookmarks.length,
      bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};