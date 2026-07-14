import React from "react";
import { motion } from "framer-motion";
import {
  ListTree,
  Plus,
} from "lucide-react";

const EmptyTopics = ({ onAddTopic }) => {
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
      className="rounded-3xl border border-dashed border-yellow-400/30 bg-gradient-to-br from-yellow-400/5 to-transparent p-10 text-center"
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-yellow-400/10">
        <ListTree
          size={42}
          className="text-yellow-400"
        />
      </div>

      <h3 className="mt-6 text-2xl font-bold">
        No Topics Added
      </h3>

      <p className="mx-auto mt-3 max-w-md text-gray-400">
        Every roadmap is built from topics. Start by adding
        your first topic and organize your learning path
        step by step.
      </p>

      <button
        onClick={onAddTopic}
        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
      >
        <Plus size={18} />
        Add First Topic
      </button>
    </motion.div>
  );
};

export default EmptyTopics;