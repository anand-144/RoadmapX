import React from "react";
import { motion } from "framer-motion";
import {
  FolderTree,
  Pencil,
  Trash2,
  Layers,
} from "lucide-react";

const CategoryCard = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <motion.div
      layout
      whileHover={{
        y: -5,
      }}
      className="group rounded-3xl border border-white/10 bg-gradient-to-br from-[#111] to-[#181818] p-6 transition-all duration-300 hover:border-yellow-400/30 hover:shadow-xl hover:shadow-yellow-500/5"
    >
      {/* Top */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">
            {category.icon ? (
              <img
                src={`https://cdn.simpleicons.org/${category.icon}/facc15`}
                alt={category.name}
                className="h-8 w-8"
              />
            ) : (
              <FolderTree
                size={26}
                className="text-yellow-400"
              />
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              {category.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {category.slug}
            </p>
          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="mt-6 flex items-center gap-2 text-gray-400">

        <Layers size={17} />

        <span>
          {category.roadmapCount || 0} Roadmaps
        </span>

      </div>

      {/* Actions */}

      <div className="mt-8 flex gap-3">

        <button
          onClick={onEdit}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 transition hover:border-yellow-400 hover:text-yellow-400"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </motion.div>
  );
};

export default CategoryCard;