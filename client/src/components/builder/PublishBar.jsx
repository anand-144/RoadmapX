import React from "react";
import { motion } from "framer-motion";
import {
  Save,
  Send,
  Eye,
  FileText,
} from "lucide-react";

const PublishBar = ({
  formData,
  setFormData,
  onSaveDraft,
  onPublish,
  loading = false,
}) => {
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
      className="mt-8 rounded-3xl border border-white/10 bg-[#0f0f0f]/95 p-6 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">
            <FileText
              size={28}
              className="text-yellow-400"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Ready to Publish?
            </h3>

            <p className="text-sm text-gray-400">
              Save your progress or publish your roadmap for everyone.
            </p>
          </div>

        </div>

        {/* Right */}
        <div className="flex flex-wrap gap-4">

          {/* Draft */}
          <button
            disabled={loading}
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                status: "Draft",
              }));

              onSaveDraft?.();
            }}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} />
            Save Draft
          </button>

          {/* Preview */}
          <button
            className="flex items-center gap-2 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-6 py-3 font-medium text-yellow-300 transition hover:bg-yellow-400/20"
          >
            <Eye size={18} />
            Preview
          </button>

          {/* Publish */}
          <button
            disabled={loading}
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                status: "Published",
              }));

              onPublish?.();
            }}
            className="flex items-center gap-2 rounded-2xl bg-yellow-400 px-8 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />

            {loading
              ? "Publishing..."
              : "Publish Roadmap"}
          </button>

        </div>

      </div>
    </motion.div>
  );
};

export default PublishBar;