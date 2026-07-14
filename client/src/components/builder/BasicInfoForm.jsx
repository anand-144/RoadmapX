import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  AlignLeft,
  FolderTree,
  Gauge,
  Clock3,
  Sparkles,
} from "lucide-react";

const difficulties = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const BasicInfoForm = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          <Sparkles
            size={18}
            className="text-yellow-400"
          />

          <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
            Basic Information
          </span>
        </div>

        <h2 className="text-3xl font-bold">
          Roadmap Details
        </h2>

        <p className="mt-2 text-gray-400">
          Give your roadmap a title, category, icon and
          difficulty level.
        </p>
      </div>

      <div className="space-y-7">

        {/* Title */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <BookOpen
              size={16}
              className="text-yellow-400"
            />
            Roadmap Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="React Developer Roadmap"
            maxLength={100}
            className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
          />

          <div className="mt-2 text-right text-xs text-gray-500">
            {formData.title.length}/100
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium">
            <AlignLeft
              size={16}
              className="text-yellow-400"
            />
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a short description..."
            maxLength={500}
            className="w-full resize-none rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
          />

          <div className="mt-2 text-right text-xs text-gray-500">
            {formData.description.length}/500
          </div>
        </div>

        {/* Category & Difficulty */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Category */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <FolderTree
                size={16}
                className="text-yellow-400"
              />
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
            >
              <option value="">
                Select Category
              </option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Gauge
                size={16}
                className="text-yellow-400"
              />
              Difficulty
            </label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
            >
              {difficulties.map((difficulty) => (
                <option
                  key={difficulty}
                  value={difficulty}
                >
                  {difficulty}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Estimated Time & Icon */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Estimated Time */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Clock3
                size={16}
                className="text-yellow-400"
              />
              Estimated Time
            </label>

            <input
              type="text"
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              placeholder="8 Weeks"
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Sparkles
                size={16}
                className="text-yellow-400"
              />
              Simple Icons Slug
            </label>

            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="react"
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
            />

            <p className="mt-2 text-xs text-gray-500">
              Example: react, node.js, mongodb, flutter
            </p>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default BasicInfoForm;