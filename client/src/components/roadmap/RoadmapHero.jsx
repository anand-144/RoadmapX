import React from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  Eye,
  Heart,
  Bookmark,
  User,
  FolderTree,
  Gauge,
} from "lucide-react";

const RoadmapHero = ({ roadmap }) => {
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
      className="rounded-3xl border border-white/10 bg-[#111] p-8"
    >
      <div className="flex flex-col gap-8 lg:flex-row">

        {/* Icon */}

        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-yellow-400/10">

          {roadmap.icon ? (
            <img
              src={`https://cdn.simpleicons.org/${roadmap.icon}/facc15`}
              alt={roadmap.title}
              className="h-16 w-16"
            />
          ) : (
            <FolderTree
              size={50}
              className="text-yellow-400"
            />
          )}

        </div>

        {/* Info */}

        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <span className="rounded-full bg-yellow-500/15 px-4 py-2 text-sm text-yellow-400">
              {roadmap.category?.name}
            </span>

            <span className="rounded-full bg-green-500/15 px-4 py-2 text-sm text-green-400">
              {roadmap.difficulty}
            </span>

          </div>

          <h1 className="mt-5 text-5xl font-bold leading-tight">
            {roadmap.title}
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-400">
            {roadmap.description}
          </p>

          {/* Stats */}

          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">

            <div className="flex items-center gap-3">
              <Clock3 className="text-yellow-400" />

              <div>

                <p className="text-xs text-gray-500">
                  Duration
                </p>

                <p className="font-semibold">
                  {roadmap.estimatedTime}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">
              <Eye className="text-yellow-400" />

              <div>

                <p className="text-xs text-gray-500">
                  Views
                </p>

                <p className="font-semibold">
                  {roadmap.views}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">
              <Heart className="text-yellow-400" />

              <div>

                <p className="text-xs text-gray-500">
                  Likes
                </p>

                <p className="font-semibold">
                  {roadmap.likes?.length}
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">
              <Bookmark className="text-yellow-400" />

              <div>

                <p className="text-xs text-gray-500">
                  Saves
                </p>

                <p className="font-semibold">
                  {roadmap.saves?.length}
                </p>

              </div>

            </div>

          </div>

          {/* Author */}

          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400/10">

              <User className="text-yellow-400" />

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Created By
              </p>

              <h4 className="font-semibold">
                {roadmap.createdBy?.name}
              </h4>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default RoadmapHero;