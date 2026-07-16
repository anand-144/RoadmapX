import React from "react";
import { motion } from "framer-motion";
import {
  Filter,
  CheckCircle2,
  FileText,
  Layers3,
} from "lucide-react";

const filters = [
  {
    label: "All",
    icon: Layers3,
  },
  {
    label: "Published",
    icon: CheckCircle2,
  },
  {
    label: "Draft",
    icon: FileText,
  },
];

const RoadmapFilters = ({
  status,
  setStatus,
}) => {
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
      className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#111] p-5 lg:flex-row lg:items-center lg:justify-between"
    >
      {/* Left */}

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400/10">
          <Filter
            size={20}
            className="text-yellow-400"
          />
        </div>

        <div>
          <h3 className="font-semibold">
            Filter Roadmaps
          </h3>

          <p className="text-sm text-gray-400">
            View roadmaps based on their status.
          </p>
        </div>

      </div>

      {/* Right */}

      <div className="flex flex-wrap gap-3">

        {filters.map((filter) => {
          const Icon = filter.icon;

          const active =
            status === filter.label;

          return (
            <button
              key={filter.label}
              onClick={() =>
                setStatus(filter.label)
              }
              className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-300 ${
                active
                  ? "bg-yellow-400 text-black"
                  : "border border-white/10 bg-white/5 text-gray-300 hover:border-yellow-400 hover:text-yellow-400"
              }`}
            >
              <Icon size={17} />

              {filter.label}
            </button>
          );
        })}

      </div>
    </motion.div>
  );
};

export default RoadmapFilters;