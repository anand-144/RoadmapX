import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Pencil,
  Plus,
} from "lucide-react";

const BuilderHeader = ({ isEditMode }) => {
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

        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">
            {isEditMode ? (
              <Pencil
                size={26}
                className="text-yellow-400"
              />
            ) : (
              <Plus
                size={26}
                className="text-yellow-400"
              />
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {isEditMode
                ? "Edit Roadmap"
                : "Create Roadmap"}
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              {isEditMode
                ? "Update your roadmap and publish the latest version."
                : "Build a structured learning roadmap for the community."}
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-5 py-3">
        <span className="text-sm font-medium text-yellow-300">
          {isEditMode ? "Editing Mode" : "Creating New Roadmap"}
        </span>
      </div>
    </motion.div>
  );
};

export default BuilderHeader;