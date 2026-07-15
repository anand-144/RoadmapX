import Category from "../models/Category.js";
import Roadmap from "../models/Roadmap.js";
import slugify from "slugify";

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    // Check required fields
    if (!name || !description || !icon) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Generate slug
    const slug = slugify(name, { lower: true });

    // Check if category already exists
    const existingCategory = await Category.findOne({
      $or: [{ name }, { slug }],
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists.",
      });
    }

    // Create category
    const category = await Category.create({
      name,
      slug,
      description,
      icon,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

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

// Get Category By Slug
export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    if (name) {
      category.name = name;
      category.slug = slugify(name, { lower: true });
    }

    if (description !== undefined) {
      category.description = description;
    }

    if (icon) {
      category.icon = icon;
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Category

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Check if category is used by any roadmap
    const roadmapCount = await Roadmap.countDocuments({
      category: category._id,
    });

    if (roadmapCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. It is currently used by ${roadmapCount} roadmap${
          roadmapCount > 1 ? "s" : ""
        }.`,
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};