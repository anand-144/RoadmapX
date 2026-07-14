import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  ListTree,
} from "lucide-react";

import EmptyTopics from "./EmptyTopics";
import TopicCard from "./TopicCard";

const TopicList = ({
  topics = [],
  setFormData,
}) => {
  // Add Topic
  const addTopic = () => {
    setFormData((prev) => ({
      ...prev,
      topics: [
        ...prev.topics,
        {
          id: Date.now(),
          title: "",
          description: "",
          order: prev.topics.length + 1,
          resources: [],
        },
      ],
    }));
  };

  // Delete Topic
  const deleteTopic = (id) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics
        .filter((topic) => topic.id !== id)
        .map((topic, index) => ({
          ...topic,
          order: index + 1,
        })),
    }));
  };

  // Update Topic
  const updateTopic = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.map((topic) =>
        topic.id === id
          ? {
            ...topic,
            [field]: value,
          }
          : topic
      ),
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
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <ListTree
              size={18}
              className="text-yellow-400"
            />

            <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
              Topics
            </span>
          </div>

          <h2 className="text-3xl font-bold">
            Roadmap Topics
          </h2>

          <p className="mt-2 text-gray-400">
            Organize your roadmap into structured learning
            sections.
          </p>
        </div>

        <button
          onClick={addTopic}
          className="inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
        >
          <Plus size={18} />
          Add Topic
        </button>
      </div>

      {/* Empty */}
      {topics.length === 0 ? (
        <EmptyTopics
          onAddTopic={addTopic}
        />
      ) : (
        <div className="space-y-6">
          {topics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              index={index}
              updateTopic={updateTopic}
              deleteTopic={deleteTopic}
              setFormData={setFormData}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TopicList;