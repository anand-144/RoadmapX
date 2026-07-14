import React from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  ListTree,
  GripVertical,
} from "lucide-react";

import ResourceList from "./ResourceList";

const TopicCard = ({
  topic,
  index,
  updateTopic,
  deleteTopic,
  setFormData,
}) => {
  // ==========================
  // Add Resource
  // ==========================
  const addResource = (topicId) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.map((t) =>
        t.id === topicId
          ? {
              ...t,
              resources: [
                ...t.resources,
                {
                  title: "",
                  type: "Documentation",
                  url: "",
                },
              ],
            }
          : t
      ),
    }));
  };

  // ==========================
  // Update Resource
  // ==========================
  const updateResource = (
    topicId,
    resourceIndex,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.map((t) => {
        if (t.id !== topicId) return t;

        const resources = [...t.resources];

        resources[resourceIndex] = {
          ...resources[resourceIndex],
          [field]: value,
        };

        return {
          ...t,
          resources,
        };
      }),
    }));
  };

  // ==========================
  // Delete Resource
  // ==========================
  const deleteResource = (
    topicId,
    resourceIndex
  ) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.map((t) => {
        if (t.id !== topicId) return t;

        return {
          ...t,
          resources: t.resources.filter(
            (_, i) => i !== resourceIndex
          ),
        };
      }),
    }));
  };

  return (
    <motion.div
      layout
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
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="cursor-grab rounded-xl bg-white/10 p-2">
            <GripVertical
              size={18}
              className="text-gray-400"
            />
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10">
            <ListTree
              size={22}
              className="text-yellow-400"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold">
              Topic {index + 1}
            </h3>

            <p className="text-sm text-gray-400">
              Learning Section
            </p>
          </div>

        </div>

        <button
          onClick={() => deleteTopic(topic.id)}
          className="rounded-xl p-3 text-red-400 transition hover:bg-red-500/10"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {/* Topic Title */}
      <div className="mb-6">

        <label className="mb-2 block text-sm text-gray-400">
          Topic Title
        </label>

        <input
          type="text"
          value={topic.title}
          placeholder="React Components"
          onChange={(e) =>
            updateTopic(
              topic.id,
              "title",
              e.target.value
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
        />

      </div>

      {/* Description */}
      <div>

        <label className="mb-2 block text-sm text-gray-400">
          Description
        </label>

        <textarea
          rows={4}
          value={topic.description}
          placeholder="Explain what users will learn in this topic..."
          onChange={(e) =>
            updateTopic(
              topic.id,
              "description",
              e.target.value
            )
          }
          className="w-full resize-none rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
        />

      </div>

      {/* Resources */}
      <ResourceList
        topic={topic}
        addResource={addResource}
        updateResource={updateResource}
        deleteResource={deleteResource}
      />

    </motion.div>
  );
};

export default TopicCard;