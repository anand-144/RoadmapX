import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FolderTree,
  BookOpen,
  RefreshCw,
} from "lucide-react";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Categories
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Roadmaps by category
          </p>
        </div>

        <button
          onClick={fetchCategories}
          className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white transition hover:border-white hover:bg-white hover:text-black"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3,4,5].map((item)=>(
            <div
              key={item}
              className="h-20 animate-pulse rounded-2xl bg-slate-900"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {categories.map((category)=>(
                    <div
              key={category._id}
              className="group rounded-2xl border border-slate-800 bg-black/30 p-5 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/40"
            >
              <div className="flex items-center justify-between">
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
                    {category.icon ? (
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <FolderTree
                        size={24}
                        className="text-white"
                      />
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                      {category.roadmapCount} roadmap
                      {category.roadmapCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2">
                  <div className="flex items-center gap-2 text-white">
                    <BookOpen size={16} />

                    <span className="font-semibold">
                      {category.roadmapCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Popularity</span>

                  <span>
                    {Math.round(
                      (category.roadmapCount /
                        (categories[0]?.roadmapCount || 1)) *
                        100
                    )}
                    %
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-500"
                    style={{
                      width: `${
                        (category.roadmapCount /
                          (categories[0]?.roadmapCount || 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryManagement;