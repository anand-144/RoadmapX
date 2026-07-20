import React from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Star,
  Eye,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const RoadmapNode = ({ data }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        y: -5,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative w-[280px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#090909] shadow-[0_20px_60px_rgba(0,0,0,.45)]"
    >
      {/* Glow */}

      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">

        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/10 blur-[90px]" />

      </div>

      {/* Handles */}

      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !border-none !bg-yellow-400"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !border-none !bg-yellow-400"
      />

      {/* Header */}

      <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-5">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">

            {data.icon ? (
              <img
                src={`https://cdn.simpleicons.org/${data.icon}/facc15`}
                alt={data.title}
                className="h-8 w-8"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <BookOpen
                size={24}
                className="text-yellow-400"
              />
            )}

          </div>

          <div>

            <h3 className="text-lg font-bold text-white">
              {data.title}
            </h3>

            <p className="text-xs uppercase tracking-[0.2em] text-yellow-400">
              {data.category}
            </p>

          </div>

        </div>

        {data.featured && (
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />
        )}

      </div>

      {/* Body */}

      <div className="relative p-6">

        <p className="line-clamp-3 text-sm leading-7 text-gray-400">
          {data.description}
        </p>

        {/* Badges */}

        <div className="mt-5 flex flex-wrap gap-2">

          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
            {data.difficulty}
          </span>

          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
            {data.time}
          </span>

          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
            {data.resources} Resources
          </span>

        </div>

        {/* Stats */}

        <div className="mt-6 flex items-center gap-5 text-sm text-gray-500">

          <div className="flex items-center gap-1">

            <Eye size={15} />

            {data.views}

          </div>

          <div className="flex items-center gap-1">

            <Heart size={15} />

            {data.likes}

          </div>

        </div>

        {/* Footer */}

        <Link
          to={data.slug ? `/explore` : "#"}
          className="mt-7 flex items-center justify-between rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-5 py-3 transition hover:bg-yellow-400 hover:text-black"
        >

          <span className="font-semibold">

            Explore Roadmap

          </span>

          <ArrowRight size={18} />

        </Link>

      </div>

    </motion.div>
  );
};

export default RoadmapNode;