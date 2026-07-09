import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  Eye,
  Heart,
  RefreshCw,
  ArrowRight,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const RoadmapManagement = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoadmaps = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/roadmaps`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setRoadmaps(data.roadmaps);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Recent Roadmaps
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Recently created learning roadmaps
          </p>
        </div>

        <button
          onClick={fetchRoadmaps}
          className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white transition hover:border-white hover:bg-white hover:text-black"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-slate-900"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {roadmaps.slice(0, 5).map((roadmap) => (
                    <div
              key={roadmap._id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-black/30 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/40"
            >
              <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">
                {/* Left */}
                <div className="flex flex-1 gap-5">
                  <img
                    src={
                      roadmap.thumbnail ||
                      "https://placehold.co/160x100?text=Roadmap"
                    }
                    alt={roadmap.title}
                    className="h-24 w-36 rounded-xl border border-slate-800 object-cover"
                  />

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">
                        {roadmap.title}
                      </h3>

                      {roadmap.isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-semibold text-yellow-400">
                          <Star size={12} />
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      Created by{" "}
                      <span className="font-medium text-slate-300">
                        {roadmap.createdBy?.name}
                      </span>
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-300">
                        {roadmap.category?.name}
                      </span>

                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                        {roadmap.difficulty}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          roadmap.status === "Published"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {roadmap.status}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-5 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye size={16} />
                        {roadmap.views}
                      </span>

                      <span className="flex items-center gap-1">
                        <Heart size={16} />
                        {roadmap.likes?.length || 0}
                      </span>

                      <span className="flex items-center gap-1">
                        <BookOpen size={16} />
                        {roadmap.topics?.length || 0} Topics
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <Link
                  to={`/roadmaps/${roadmap.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-black"
                >
                  View

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RoadmapManagement;