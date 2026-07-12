import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  FolderTree,
  User,
} from "lucide-react";

const RoadmapCard = ({ roadmap, index }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
      }}
      whileHover={{
        y: -8,
      }}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-[#111] transition-all duration-300 hover:border-yellow-400/40"
    >
      {/* Icon */}

      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-yellow-500/10 to-transparent">

        {roadmap.icon ? (
          <img
            src={`https://cdn.simpleicons.org/${roadmap.icon}/A11502`}
            alt={roadmap.title}
            className="h-20 w-20 transition duration-300 group-hover:scale-110"
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

      {/* Body */}

      <div className="p-6">

        <h3 className="line-clamp-1 text-xl font-bold">
          {roadmap.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm text-gray-400">
          {roadmap.description}
        </p>

        {/* Tags */}

        <div className="mt-5 flex flex-wrap gap-2">

          <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
            {roadmap.difficulty}
          </span>

          <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
            {roadmap.category?.name}
          </span>

        </div>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">

          <div className="space-y-2 text-xs text-gray-500">

            <div className="flex items-center gap-2">
              <User size={14} />
              {roadmap.createdBy?.name}
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={14} />
              {roadmap.estimatedTime}
            </div>

          </div>

          <Link
            to={`/roadmap/${roadmap.slug}`}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
          >
            View
            <ArrowRight size={16} />
          </Link>

        </div>

      </div>
    </motion.div>
  );
};

export default RoadmapCard;