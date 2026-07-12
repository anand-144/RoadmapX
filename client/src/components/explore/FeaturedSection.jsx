import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Clock3,
  FolderTree,
  User,
} from "lucide-react";

const FeaturedSection = ({ featuredRoadmaps = [] }) => {
  if (!featuredRoadmaps.length) return null;

  return (
    <section className="mb-14">
      {/* Heading */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Sparkles
              size={20}
              className="text-yellow-400"
            />

            <span className="font-semibold text-yellow-400">
              Featured Collection
            </span>
          </div>

          <h2 className="text-3xl font-bold">
            Trending Roadmaps
          </h2>

          <p className="mt-2 text-gray-400">
            Hand-picked learning paths from the community.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {featuredRoadmaps.map((roadmap, index) => (
          <motion.div
            key={roadmap._id}
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.1,
            }}
            whileHover={{
              y: -8,
            }}
            className="group overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-[#111] to-[#111] transition-all duration-300 hover:border-yellow-400"
          >
            {/* Icon */}
            <div className="flex h-44 items-center justify-center bg-gradient-to-br from-yellow-500/10 to-transparent">
              {roadmap.icon ? (
                <img
                  src={`https://cdn.simpleicons.org/${roadmap.icon}/facc15`}
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

            {/* Content */}
            <div className="p-6">
              <div className="mb-3 inline-flex rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-300">
                Featured
              </div>

              <h3 className="line-clamp-1 text-2xl font-bold">
                {roadmap.title}
              </h3>

              <p className="mt-3 line-clamp-3 text-sm text-gray-400">
                {roadmap.description}
              </p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  {roadmap.category?.name}
                </span>

                <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                  {roadmap.difficulty}
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
                    {roadmap.estimatedTime || "Self Paced"}
                  </div>
                </div>

                <Link
                  to={`/roadmap/${roadmap.slug}`}
                  className="flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300"
                >
                  Explore
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;