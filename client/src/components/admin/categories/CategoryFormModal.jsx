import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderTree,
  X,
  Save,
} from "lucide-react";

const CategoryFormModal = ({
  open,
  setOpen,
  category,
  refresh,
}) => {
  const isEditMode = Boolean(category);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        icon: category.icon || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        icon: "",
      });
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Category name is required.");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (isEditMode) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/categories/${category._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Category updated.");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/categories`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Category created.");
      }

      refresh?.();
      setOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>

      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
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
            className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111] p-8"
          >
            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">
                  <FolderTree
                    size={26}
                    className="text-yellow-400"
                  />
                </div>

                <div>

                  <h2 className="text-2xl font-bold">

                    {isEditMode
                      ? "Edit Category"
                      : "Create Category"}

                  </h2>

                  <p className="text-sm text-gray-400">
                    Manage roadmap categories.
                  </p>

                </div>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 hover:bg-white/10"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>

                <label className="mb-2 block text-sm text-gray-400">
                  Category Name
                </label>

                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Frontend Development"
                  className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-yellow-400"
                />

              </div>
              <div>

                <label className="mb-2 block text-sm text-gray-400">
                  Category Description
                </label>

                <textarea
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Master modern frontend engineering with HTML, CSS, JavaScript, TypeScript, React, Next.js, UI architecture, testing, performance optimization, accessibility, and production-ready best practices."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-yellow-400"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm text-gray-400">
                  Simple Icons Slug
                </label>

                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      icon: e.target.value,
                    })
                  }
                  placeholder="react"
                  className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-yellow-400"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Example: react, node.js, mongodb, docker
                </p>

              </div>

              {formData.icon && (
                <div className="flex justify-center">

                  <img
                    src={`https://cdn.simpleicons.org/${formData.icon}/facc15`}
                    alt="preview"
                    className="h-16 w-16"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />

                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 py-4 font-semibold text-black transition hover:bg-yellow-300 disabled:opacity-50"
              >
                <Save size={18} />

                {loading
                  ? "Saving..."
                  : isEditMode
                    ? "Update Category"
                    : "Create Category"}

              </button>

            </form>

          </motion.div>
        </motion.div>
      )}

    </AnimatePresence>
  );
};

export default CategoryFormModal;