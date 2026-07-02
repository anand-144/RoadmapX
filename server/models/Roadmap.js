import mongoose from "mongoose";

// Resource Schema
const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: [
        "Documentation",
        "YouTube",
        "Article",
        "Course",
        "GitHub",
        "Website",
      ],
      required: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// Topic Schema
const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    order: {
      type: Number,
      required: true,
    },
    resources: {
      type: [resourceSchema],
      default: [],
    },
  },
  { _id: true }
);

// Roadmap Schema
const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    estimatedTime: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    topics: {
      type: [topicSchema],
      default: [],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    saves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    views: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Roadmap", roadmapSchema);