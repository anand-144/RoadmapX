import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const FilterBar = ({
  selectedDifficulty,
  setSelectedDifficulty,
  sortBy,
  setSortBy,
  setPage,
}) => {
  const clearFilters = () => {
    setSelectedDifficulty("");
    setSortBy("latest");
    setPage(1);
  };

  const activeFilters =
    (selectedDifficulty ? 1 : 0) +
    (sortBy !== "latest" ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-24 z-20 mb-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">
            <Filter size={18} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Filters
            </h3>

            <p className="text-sm text-gray-400">
              {activeFilters} Active Filter
              {activeFilters !== 1 && "s"}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-3">
          {/* Difficulty */}
          <select
            value={selectedDifficulty}
            onChange={(e) => {
              setSelectedDifficulty(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-400"
          >
            <option value="">All Difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-400"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Viewed</option>
            <option value="featured">Featured</option>
          </select>

          {/* Clear */}
          <button
            onClick={clearFilters}
            disabled={activeFilters === 0}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-300 transition hover:border-red-500 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw size={16} />
            Clear
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;