import Follow from "../models/Follow.js";
import User from "../models/User.js";
import createNotification from "../utils/createNotification.js";

// Follow User
export const followUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Prevent following yourself
    if (req.user._id.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself.",
      });
    }

    // Check if user exists
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: req.user._id,
      following: userId,
    });

    if (existingFollow) {
      return res.status(400).json({
        success: false,
        message: "You already follow this user.",
      });
    }

    // Create follow
    const follow = await Follow.create({
      follower: req.user._id,
      following: userId,
    });

    // Create notification
    await createNotification({
      recipient: user._id,
      sender: req.user._id,
      type: "follow",
      message: `${req.user.name} started following you.`,
    });

    res.status(201).json({
      success: true,
      message: "User followed successfully.",
      follow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Unfollow User
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const follow = await Follow.findOneAndDelete({
      follower: req.user._id,
      following: userId,
    });

    if (!follow) {
      return res.status(404).json({
        success: false,
        message: "You are not following this user.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User unfollowed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Followers
export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const followers = await Follow.find({
      following: userId,
    })
      .populate("follower", "name username bio")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: followers.length,
      followers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Following
export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    const following = await Follow.find({
      follower: userId,
    })
      .populate("following", "name username bio")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: following.length,
      following,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};