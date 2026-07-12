import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";

const ExploreHero = ({ search, totalRoadmaps }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-12"
    >
      {/* Heading */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
            <Sparkles size={16} />
            Discover Community Roadmaps
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Compass size={34} className="text-yellow-400" />
            </div>

            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                Explore
              </h1>

              <p className="mt-2 max-w-2xl text-gray-400">
                Discover high-quality learning roadmaps created by developers,
                mentors, and the community.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-xl">
          <p className="text-sm text-gray-400">Available Roadmaps</p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {totalRoadmaps}
          </h2>

          <p className="mt-1 text-sm text-yellow-400">
            Updated daily
          </p>
        </div>
      </div>

      {/* Search Result Banner */}
      {search && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-6 py-4"
        >
          <p className="text-sm text-gray-300">
            Showing results for{" "}
            <span className="font-semibold text-yellow-400">
              "{search}"
            </span>
          </p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default ExploreHero;