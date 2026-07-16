import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Plus,
} from "lucide-react";

const EmptyRoadmaps = () => {
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
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-gradient-to-br from-[#111] to-[#181818] px-6 py-20 text-center"
    >
      {/* Icon */}

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400/10">
        <BookOpen
          size={46}
          className="text-yellow-400"
        />
      </div>

      {/* Heading */}

      <h2 className="mt-8 text-3xl font-bold">
        No Roadmaps Found
      </h2>

      {/* Description */}

      <p className="mt-4 max-w-xl text-gray-400 leading-7">
        There are currently no roadmaps matching your
        search or filters. Start by creating a new roadmap
        or clear the filters to view all available
        roadmaps.
      </p>

      {/* Button */}

      <Link
        to="/builder"
        className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-yellow-300"
      >
        <Plus size={20} />
        Create Roadmap
      </Link>
    </motion.div>
  );
};

export default EmptyRoadmaps;