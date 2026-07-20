import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Link2,
  Clock3,
  GitBranch,
} from "lucide-react";

const GraphBanner = ({ roadmap }) => {
  const totalTopics = roadmap?.topics?.length || 0;

  const totalResources =
    roadmap?.topics?.reduce(
      (total, topic) =>
        total + (topic.resources?.length || 0),
      0
    ) || 0;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative overflow-hidden rounded-[32px] border border-yellow-500/20 bg-gradient-to-br from-[#171717] via-[#111] to-black"
    >
      {/* Glow */}

      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-yellow-500/10 blur-[120px]" />

      <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-yellow-500/5 blur-[120px]" />

      <div className="relative grid items-center gap-14 p-10 lg:grid-cols-2">

        {/* Left */}

        <div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-400">

            <Sparkles size={16} />

            New Interactive Experience

          </div>

          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">

            Learn with our

            <span className="block text-yellow-400">
              Interactive Graph
            </span>

          </h2>

          <p className="mt-6 max-w-xl leading-8 text-gray-400">

            Experience this roadmap visually.
            Explore every topic as an interactive
            node, discover connected resources,
            and follow a roadmap.sh-inspired
            learning journey.

          </p>

          {/* Stats */}

          <div className="mt-10 grid grid-cols-3 gap-4">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <BookOpen
                size={22}
                className="text-yellow-400"
              />

              <h3 className="mt-3 text-2xl font-bold">
                {totalTopics}
              </h3>

              <p className="text-sm text-gray-500">
                Topics
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <Link2
                size={22}
                className="text-yellow-400"
              />

              <h3 className="mt-3 text-2xl font-bold">
                {totalResources}
              </h3>

              <p className="text-sm text-gray-500">
                Resources
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

              <Clock3
                size={22}
                className="text-yellow-400"
              />

              <h3 className="mt-3 text-xl font-bold">
                {roadmap.estimatedTime}
              </h3>

              <p className="text-sm text-gray-500">
                Duration
              </p>

            </div>

          </div>

          <Link
            to={`/roadmap/${roadmap.slug}/graph`}
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-7 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-yellow-300"
          >
            Open Interactive Graph

            <ArrowRight size={20} />
          </Link>

        </div>

        {/* Right */}

        <div className="hidden items-center justify-center lg:flex">

          <div className="relative h-[420px] w-[420px]">

            {/* Main Node */}

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-400 shadow-[0_0_40px_rgba(250,204,21,.35)]"
            >

              <GitBranch
                size={34}
                className="text-black"
              />

            </motion.div>

            {/* Top */}

            <div className="absolute left-1/2 top-8 h-16 w-[2px] -translate-x-1/2 bg-yellow-400/40" />

            <div className="absolute left-1/2 top-0 h-14 w-14 -translate-x-1/2 rounded-full border-4 border-yellow-400 bg-[#111]" />

            {/* Bottom */}

            <div className="absolute bottom-8 left-1/2 h-16 w-[2px] -translate-x-1/2 bg-yellow-400/40" />

            <div className="absolute bottom-0 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full border-4 border-yellow-400 bg-[#111]" />

            {/* Left */}

            <div className="absolute left-10 top-1/2 h-[2px] w-28 -translate-y-1/2 bg-yellow-400/40" />

            <div className="absolute left-0 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full border-4 border-yellow-400 bg-[#111]" />

            {/* Right */}

            <div className="absolute right-10 top-1/2 h-[2px] w-28 -translate-y-1/2 bg-yellow-400/40" />

            <div className="absolute right-0 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full border-4 border-yellow-400 bg-[#111]" />

            {/* Decorative */}

            <div className="absolute left-1/2 top-[25%] h-[2px] w-20 -translate-x-1/2 rotate-45 bg-yellow-400/20" />

            <div className="absolute left-1/2 top-[70%] h-[2px] w-20 -translate-x-1/2 -rotate-45 bg-yellow-400/20" />

          </div>

        </div>

      </div>
    </motion.section>
  );
};

export default GraphBanner;