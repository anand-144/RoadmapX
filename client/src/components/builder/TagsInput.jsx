import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Tags,
  Plus,
  X,
} from "lucide-react";

const TagsInput = ({
  formData,
  setFormData,
}) => {
  const [tag, setTag] = useState("");

  // Add Tag
  const addTag = () => {
    const value = tag.trim().toLowerCase();

    if (!value) return;

    if (formData.tags.includes(value)) {
      setTag("");
      return;
    }

    if (formData.tags.length >= 10) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, value],
    }));

    setTag("");
  };

  // Remove Tag
  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

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
      className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
    >
      {/* Heading */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <Tags
            size={18}
            className="text-yellow-400"
          />

          <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
            Tags
          </span>
        </div>

        <h2 className="text-3xl font-bold">
          Roadmap Tags
        </h2>

        <p className="mt-2 text-gray-400">
          Add keywords that help users discover your roadmap.
        </p>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-4 md:flex-row">

        <input
          type="text"
          placeholder="react"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          className="flex-1 rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
        />

        <button
          onClick={addTag}
          className="flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:bg-yellow-300"
        >
          <Plus size={18} />
          Add Tag
        </button>

      </div>

      <p className="mt-3 text-sm text-gray-500">
        Press Enter or click "Add Tag". Maximum 10 tags.
      </p>

      {/* Tags */}
      {formData.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-3">

          {formData.tags.map((item, index) => (
            <motion.div
              key={item}
              layout
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-300"
            >
              #{item}

              <button
                onClick={() => removeTag(index)}
                className="rounded-full p-1 transition hover:bg-red-500/20 hover:text-red-400"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}

        </div>
      )}
    </motion.div>
  );
};

export default TagsInput;