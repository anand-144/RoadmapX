import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Rocket,
} from "lucide-react";

const BuilderHeader = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between"
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black transition hover:border-yellow-400 hover:text-yellow-400"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-3xl font-bold">
            Create New Roadmap
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Build a structured learning roadmap and share it with the community.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium transition hover:border-white/20 hover:bg-white/10 cursor-pointer"
        >
          <Save size={18} />
          Save Draft
        </button>

        <button
          className="flex items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300 cursor-pointer"
        >
          <Rocket size={18} />
          Publish
        </button>
      </div>
    </motion.div>
  );
};

export default BuilderHeader;