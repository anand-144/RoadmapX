import Comment from "../models/Comment.js";
import Roadmap from "../models/Roadmap.js";
import createNotification from "../utils/createNotification.js";

// Add Comment
export const addComment = async (req, res) => {
  try {
    const { roadmapId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment content is required.",
      });
    }

    const roadmap = await Roadmap.findById(roadmapId);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    const comment = await Comment.create({
      user: req.user._id,
      roadmap: roadmapId,
      content,
    });

    // Create notification
    await createNotification({
      recipient: roadmap.createdBy,
      sender: req.user._id,
      roadmap: roadmap._id,
      type: "comment",
      message: `${req.user.name} commented on your roadmap.`,
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "name username")
      .populate("roadmap", "title slug");

    res.status(201).json({
      success: true,
      message: "Comment added successfully.",
      comment: populatedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Comments By Roadmap
export const getCommentsByRoadmap = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const comments = await Comment.find({
      roadmap: roadmapId,
    })
      .populate("user", "name username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment content is required.",
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this comment.",
      });
    }

    comment.content = content;
    comment.isEdited = true;

    await comment.save();

    const updatedComment = await Comment.findById(comment._id)
      .populate("user", "name username");

    res.status(200).json({
      success: true,
      message: "Comment updated successfully.",
      comment: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (
      comment.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment.",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};