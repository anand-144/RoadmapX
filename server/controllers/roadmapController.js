import Roadmap from "../models/Roadmap.js";
import Category from "../models/Category.js";
import slugify from "slugify";

// Create Roadmap

export const createRoadmap = async (req, res) => {
  try {
    const {
      title,
      description,
      icon,
      category,
      difficulty,
      estimatedTime,
      tags,
      topics,
      status,
      isFeatured,
    } = req.body;

    // Check required fields
    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required.",
      });
    }

    //Generate slug
    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Check duplicate roadmap
    const existingRoadmap = await Roadmap.findOne({ slug });
    if (existingRoadmap) {
      return res.status(400).json({
        success: false,
        message: "Roadmap already exists.",
      });
    }

    // Create Roadmap
    const roadmap = await Roadmap.create({
      title,
      description,
      slug,
      icon,
      category,
      difficulty,
      estimatedTime,
      tags,
      topics,
      status,
      isFeatured: req.user.role === "admin" ? isFeatured : false,
      createdBy: req.user._id,
      publishedAt: status === "Published" ? new Date() : null,
    });

    const populatedRoadmap = await Roadmap.findById(roadmap._id)
      .populate("category", "name slug icon")
      .populate("createdBy", "name username");

    res.status(201).json({
      success: true,
      message: "Roadmap created successfully.",
      roadmap: populatedRoadmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all roadmap
export const getRoadmaps = async (req, res) => {
  try {
    const {
      search = "",
      category,
      difficulty,
      featured,
      sort = "latest",
      page = 1,
      limit = 12,
    } = req.query;

    const query = {
      status: "Published",
    };

    // Featured Filter
    if (featured === "true") {
      query.isFeatured = true;
    } else if (featured === "false") {
      query.isFeatured = false;
    }

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
        {
          tags: {
            $in: [new RegExp(search, "i")],
          },
        },
      ];
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Difficulty filter
    if (difficulty) {
      query.difficulty = difficulty;
    }

    let sortOption = {};

    switch (sort) {
      case "popular":
        sortOption = { views: -1 };
        break;

      case "likes":
        sortOption = { likes: -1 };
        break;

      case "featured":
        sortOption = { isFeatured: -1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const roadmaps = await Roadmap.find(query)
      .populate("category", "name slug icon")
      .populate("createdBy", "name username")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Roadmap.countDocuments(query);

    res.status(200).json({
      success: true,
      roadmaps,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get My Roadmaps
// ==========================
export const getMyRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({
      createdBy: req.user._id,
    })
      .populate("category", "name slug icon")
      .populate("createdBy", "name username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: roadmaps.length,
      roadmaps,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Roadmap By Slug
// ==========================
export const getRoadmapBySlug = async (req, res) => {
  try {
    const slug = slugify(req.params.slug, {
      lower: true,
      strict: true,
      trim: true,
    });

    const roadmap = await Roadmap.findOne({ slug })
      .populate("category", "name slug icon")
      .populate("createdBy", "name username");

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFeaturedRoadmaps = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const skip = (page - 1) * limit;

    const query = {
      status: "Published",
      isFeatured: true,
    };

    const roadmaps = await Roadmap.find(query)
      .populate("category", "name slug icon")
      .populate("createdBy", "name username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Roadmap.countDocuments(query);

    res.status(200).json({
      success: true,
      roadmaps,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Roadmap
// ==========================
export const updateRoadmap = async (req, res) => {
  try {
    const {
      title,
      description,
      icon,
      category,
      difficulty,
      estimatedTime,
      tags,
      topics,
      status,
      isFeatured,
    } = req.body;

    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    // Allow only owner or admin
    if (
      roadmap.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this roadmap.",
      });
    }

    // Validate category if updated
    if (category) {
      const existingCategory = await Category.findById(category);

      if (!existingCategory) {
        return res.status(404).json({
          success: false,
          message: "Category not found.",
        });
      }

      roadmap.category = category;
    }

    // Update title & slug
    if (title) {
      roadmap.title = title;
      roadmap.slug = slugify(title, {
        lower: true,
        strict: true,
        trim: true,
      });
    }

    if (description !== undefined) roadmap.description = description;

    if (icon !== undefined) roadmap.icon = icon;

    if (difficulty) roadmap.difficulty = difficulty;

    if (estimatedTime !== undefined) roadmap.estimatedTime = estimatedTime;

    if (tags) roadmap.tags = tags;

    if (topics) roadmap.topics = topics;

    if (req.user.role === "admin" && typeof isFeatured === "boolean") {
      roadmap.isFeatured = isFeatured;
    }

    if (status) {
      roadmap.status = status;

      if (status === "Published" && !roadmap.publishedAt) {
        roadmap.publishedAt = new Date();
      }
    }

    await roadmap.save();

    const updatedRoadmap = await Roadmap.findById(roadmap._id)
      .populate("category", "name slug icon")
      .populate("createdBy", "name username");

    res.status(200).json({
      success: true,
      message: "Roadmap updated successfully.",
      roadmap: updatedRoadmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================
// Feature / Unfeature Roadmap (Admin Only)
// ==========================

export const toggleFeaturedRoadmap = async (req, res) => {
  try {
    const { isFeatured } = req.body;

    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    roadmap.isFeatured = Boolean(isFeatured);

    await roadmap.save();

    res.status(200).json({
      success: true,
      message: roadmap.isFeatured
        ? "Roadmap marked as featured."
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

// ==========================
// Delete Roadmap
// ==========================
export const deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    // Allow only owner or admin
    if (
      roadmap.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this roadmap.",
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
