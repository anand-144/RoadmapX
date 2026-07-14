import React, { useState } from "react";
import { motion } from "framer-motion";

import BuilderHeader from "../components/builder/BuilderHeader";
import BuilderSidebar from "../components/builder/BuilderSidebar";
import BasicInfoForm from "../components/builder/BasicInfoForm";
import LivePreview from "../components/builder/LivePreview";
import PublishBar from "../components/builder/PublishBar";
import TopicList from "../components/builder/TopicList";
import TagsInput from "../components/builder/TagsInput";

const Builder = () => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Beginner",
    estimatedTime: "",
    icon: "",
    tags: [],
    topics: [],
    status: "Draft",
  });

  const handleSaveDraft = () => {
    console.log("Saving Draft...");
  };

  const handlePublish = () => {
    console.log("Publishing Roadmap...");
  };

  return (
    <div className="min-h-screen bg-black pt-28 text-white">
      <div className="mx-auto max-w-[1700px] px-6">

        <BuilderHeader />

        <div className="mt-10 grid gap-8 xl:grid-cols-12">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-3"
          >
            <BuilderSidebar
              formData={formData}
            />
          </motion.div>

          {/* Editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 xl:col-span-6"
          >
            <BasicInfoForm
              formData={formData}
              setFormData={setFormData}
            />

            {/* Upcoming Components */}

            <TagsInput
              formData={formData}
              setFormData={setFormData}
            />

            <TopicList
              topics={formData.topics}
              setFormData={setFormData}
            />

            <PublishBar
              formData={formData}
              setFormData={setFormData}
              onSaveDraft={handleSaveDraft}
              onPublish={handlePublish}
              loading={loading}
            />

          </motion.div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-3"
          >
            <div className="sticky top-28">
              <LivePreview
                formData={formData}
              />
            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default Builder;