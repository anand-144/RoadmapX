import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Tags,
  ListTree,
  BookOpen,
  Eye,
  CheckCircle2,
} from "lucide-react";

const sections = [
  {
    id: "basic",
    title: "Basic Information",
    icon: FileText,
  },
  {
    id: "tags",
    title: "Tags",
    icon: Tags,
  },
  {
    id: "topics",
    title: "Topics",
    icon: ListTree,
  },
  {
    id: "resources",
    title: "Resources",
    icon: BookOpen,
  },
  {
    id: "preview",
    title: "Live Preview",
    icon: Eye,
  },
];

const BuilderSidebar = ({ formData }) => {
  const completed = [
    formData.title,
    formData.description,
    formData.category,
    formData.icon,
  ].filter(Boolean).length;

  const progress = Math.round((completed / 4) * 100);

  return (
    <motion.aside
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="sticky top-28 space-y-6"
    >
      {/* Progress */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-lg font-semibold">
          Builder Progress
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          Complete your roadmap before publishing.
        </p>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-yellow-400 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Completion
          </span>

          <span className="font-semibold text-yellow-400">
            {progress}%
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold">
          Builder Sections
        </h3>

        <div className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <button
                key={section.id}
                className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className="text-yellow-400"
                  />

                  <span>{section.title}</span>
                </div>

                <CheckCircle2
                  size={18}
                  className="text-green-400 opacity-40"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
        <h4 className="font-semibold text-yellow-300">
          Builder Tips
        </h4>

        <ul className="mt-3 space-y-2 text-sm text-yellow-100/80">
          <li>• Keep the title short and clear.</li>
          <li>• Add at least 5 topics.</li>
          <li>• Include quality learning resources.</li>
          <li>• Use relevant tags.</li>
        </ul>
      </div>
    </motion.aside>
  );
};

export default BuilderSidebar;