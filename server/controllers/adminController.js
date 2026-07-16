import User from "../models/User.js";
import Roadmap from "../models/Roadmap.js";
import Category from "../models/Category.js";

/* ==========================================
   Dashboard Stats
========================================== */

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalRoadmaps,
      totalCategories,
      publishedRoadmaps,
      draftRoadmaps,
      featuredRoadmaps,
    ] = await Promise.all([
      User.countDocuments(),
      Roadmap.countDocuments(),
      Category.countDocuments(),
      Roadmap.countDocuments({ status: "Published" }),
      Roadmap.countDocuments({ status: "Draft" }),
      Roadmap.countDocuments({ isFeatured: true }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalRoadmaps,
        totalCategories,
        publishedRoadmaps,
        draftRoadmaps,
        featuredRoadmaps,
        totalReports: 0, // Until Report model is added
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get All Users
========================================== */

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get Single User
========================================== */

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Update User Role
========================================== */

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.role = role;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User role updated successfully.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Delete User
========================================== */

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get All Roadmaps
========================================== */

export const getAllRoadmaps = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const search = req.query.search || "";
    const status = req.query.status || "All";

    const skip = (page - 1) * limit;

    const query = {};

    // Search
    if (search.trim()) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Status Filter
    if (status !== "All") {
      query.status = status;
    }

    const totalRoadmaps = await Roadmap.countDocuments(query);

    const roadmaps = await Roadmap.find(query)
      .populate("category", "name slug icon")
      .populate("createdBy", "name username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      roadmaps,
      pagination: {
        page,
        limit,
        totalRoadmaps,
        totalPages: Math.ceil(totalRoadmaps / limit),
        hasNextPage:
          page < Math.ceil(totalRoadmaps / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Delete Any Roadmap
========================================== */

export const deleteRoadmapByAdmin = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    await roadmap.deleteOne();

    res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Publish / Unpublish Roadmap
========================================== */

export const togglePublishRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    if (roadmap.status === "Draft") {
      roadmap.status = "Published";
      roadmap.publishedAt = new Date();
    } else {
      roadmap.status = "Draft";
      roadmap.publishedAt = null;
    }

    await roadmap.save();

    res.status(200).json({
      success: true,
      message: `Roadmap ${roadmap.status.toLowerCase()} successfully.`,
      roadmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Feature / Unfeature Roadmap
========================================== */

export const toggleFeatureRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    roadmap.isFeatured = !roadmap.isFeatured;

    await roadmap.save();

    res.status(200).json({
      success: true,
      message: roadmap.isFeatured
        ? "Roadmap featured successfully."
        : "Roadmap removed from featured.",
      roadmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Get All Categories
========================================== */

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "roadmaps",
          localField: "_id",
          foreignField: "category",
          as: "roadmaps",
        },
      },
      {
        $project: {
          name: 1,
          slug: 1,
          icon: 1,
          roadmapCount: {
            $size: "$roadmaps",
          },
        },
      },
      {
        $sort: {
          roadmapCount: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================================
   Platform Analytics
========================================== */

export const getPlatformAnalytics = async (req, res) => {
  try {
    const [
      totalViews,
      totalLikes,
      totalBookmarks,
      publishedRoadmaps,
      draftRoadmaps,
    ] = await Promise.all([
      Roadmap.aggregate([
        {
          $group: {
            _id: null,
            views: {
              $sum: "$views",
            },
          },
        },
      ]),

      Roadmap.aggregate([
        {
          $project: {
            likes: {
              $size: "$likes",
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$likes",
            },
          },
        },
      ]),

      Roadmap.aggregate([
        {
          $project: {
            saves: {
              $size: "$saves",
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$saves",
            },
          },
        },
      ]),

      Roadmap.countDocuments({
        status: "Published",
      }),

      Roadmap.countDocuments({
        status: "Draft",
      }),
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        totalViews: totalViews[0]?.views || 0,
        totalLikes: totalLikes[0]?.total || 0,
        totalBookmarks: totalBookmarks[0]?.total || 0,
        publishedRoadmaps,
        draftRoadmaps,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};