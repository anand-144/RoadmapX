import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import {
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";

const DeleteCategoryModal = ({
  open,
  setOpen,
  category,
  refresh,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/categories/${category._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      refresh?.();

      setOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete category."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-5"
        >
          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            className="w-full max-w-md rounded-3xl border border-red-500/20 bg-[#111] p-8"
          >
            {/* Header */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                  <AlertTriangle
                    size={28}
                    className="text-red-400"
                  />
                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    Delete Category
                  </h2>

                  <p className="text-sm text-gray-400">
                    This action cannot be undone.
                  </p>

                </div>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 transition hover:bg-white/10"
              >
                <X size={20} />
              </button>

            </div>

            {/* Body */}

            <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

              <p className="text-gray-300">
                You're about to permanently delete
              </p>

              <h3 className="mt-2 text-xl font-semibold text-red-400">
                {category?.name}
              </h3>

            </div>

            <p className="mt-6 text-sm leading-6 text-gray-400">
              All roadmaps inside this category will lose their
              category reference. Make sure you really want to
              continue.
            </p>

            {/* Footer */}

            <div className="mt-8 flex gap-4">

              <button
                onClick={() => setOpen(false)}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 font-medium transition hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-500 py-3 font-semibold transition hover:bg-red-600 disabled:opacity-50"
              >
                <Trash2 size={18} />

                {loading
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  );
};

export default DeleteCategoryModal;