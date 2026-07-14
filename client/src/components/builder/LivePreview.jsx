import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  FolderTree,
  Clock3,
  Gauge,
  Tag,
  BookOpen,
} from "lucide-react";

const LivePreview = ({ formData }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
    >
      {/* Heading */}
      <div className="mb-6 flex items-center gap-2">
        <Eye
          size={18}
          className="text-yellow-400"
        />

        <h2 className="text-lg font-semibold">
          Live Preview
        </h2>
      </div>

      {/* Preview Card */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]">

        {/* Icon */}
        <div className="flex h-48 items-center justify-center border-b border-white/10 bg-gradient-to-br from-yellow-500/10 via-black to-black">

          {formData.icon ? (
            <img
              src={`https://cdn.simpleicons.org/${formData.icon}/facc15`}
              alt={formData.title}
              className="h-20 w-20 transition duration-300"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <FolderTree
              size={70}
              className="text-yellow-400"
            />
          )}

        </div>

        {/* Content */}
        <div className="space-y-6 p-6">

          {/* Title */}
          <div>
            <h3 className="line-clamp-2 text-2xl font-bold">
              {formData.title || "Untitled Roadmap"}
            </h3>

            <p className="mt-3 line-clamp-4 text-sm text-gray-400">
              {formData.description ||
                "Your roadmap description will appear here as you type."}
            </p>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-yellow-400">
                <FolderTree size={16} />
                <span className="text-xs uppercase tracking-wide">
                  Category
                </span>
              </div>

              <p className="text-sm font-medium">
                {formData.category || "Not Selected"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-yellow-400">
                <Gauge size={16} />
                <span className="text-xs uppercase tracking-wide">
                  Difficulty
                </span>
              </div>

              <p className="text-sm font-medium">
                {formData.difficulty}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-yellow-400">
                <Clock3 size={16} />
                <span className="text-xs uppercase tracking-wide">
                  Duration
                </span>
              </div>

              <p className="text-sm font-medium">
                {formData.estimatedTime || "Not Specified"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-yellow-400">
                <BookOpen size={16} />
                <span className="text-xs uppercase tracking-wide">
                  Topics
                </span>
              </div>

              <p className="text-sm font-medium">
                {formData.topics.length}
              </p>
            </div>

          </div>

          {/* Tags */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Tag
                size={16}
                className="text-yellow-400"
              />

              <span className="text-sm font-semibold">
                Tags
              </span>
            </div>

            {formData.tags.length ? (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No tags added yet.
              </p>
            )}
          </div>

          {/* Status */}
          <div className="flex items-center justify-between rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-5 py-4">
            <span className="font-medium">
              Status
            </span>

            <span className="rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-black">
              {formData.status}
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default LivePreview;