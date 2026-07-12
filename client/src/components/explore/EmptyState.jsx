import React from "react";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";

const EmptyState = () => {
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
        duration: 0.4,
      }}
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-8 py-20 text-center"
    >
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-yellow-500/10">
        <SearchX
          size={48}
          className="text-yellow-400"
        />
      </div>

      <h2 className="text-3xl font-bold text-white">
        No Roadmaps Found
      </h2>

      <p className="mt-4 max-w-lg text-gray-400">
        We couldn't find any roadmaps matching your current search or filters.
        Try searching for another technology or clearing the applied filters.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-8 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-yellow-300"
      >
        Reset Filters
      </button>
    </motion.div>
  );
};

export default EmptyState;