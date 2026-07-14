import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  BookOpen,
} from "lucide-react";

import ResourceCard from "./ResourceCard";

const ResourceList = ({
  topic,
  updateResource,
  deleteResource,
  addResource,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <BookOpen
            size={18}
            className="text-yellow-400"
          />

          <h3 className="text-lg font-semibold">
            Resources
          </h3>
        </div>

        <button
          onClick={() => addResource(topic.id)}
          className="flex items-center gap-2 rounded-xl bg-yellow-400 px-4 py-2 font-medium text-black transition hover:bg-yellow-300"
        >
          <Plus size={16} />
          Add Resource
        </button>

      </div>

      {/* Empty */}
      {topic.resources.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">

          <BookOpen
            size={42}
            className="mx-auto mb-4 text-yellow-400"
          />

          <h4 className="text-lg font-semibold">
            No Resources Added
          </h4>

          <p className="mt-2 text-sm text-gray-400">
            Add documentation, videos, GitHub repositories,
            articles or courses for this topic.
          </p>

          <button
            onClick={() => addResource(topic.id)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-medium text-black transition hover:bg-yellow-300"
          >
            <Plus size={16} />
            Add First Resource
          </button>

        </div>
      ) : (
        <div className="space-y-5">

          {topic.resources.map((resource, index) => (
            <ResourceCard
              key={index}
              topicId={topic.id}
              resource={resource}
              resourceIndex={index}
              updateResource={updateResource}
              deleteResource={deleteResource}
            />
          ))}

        </div>
      )}
    </motion.div>
  );
};

export default ResourceList;