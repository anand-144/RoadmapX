import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  Clock3,
  ArrowRight,
  Plus,
  Eye,
  Heart,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";

const MyRoadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyRoadmaps = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/roadmaps/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data.roadmaps);

      if (data.success) {
        setRoadmaps(data.roadmaps || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load your roadmaps.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRoadmaps();
  }, []);
  

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            My Roadmaps
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {roadmaps.length} roadmap
            {roadmaps.length !== 1 ? "s" : ""} created
          </p>
        </div>

        <Link
          to="/builder"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
        >
          <Plus size={18} />
          Create Roadmap
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl bg-slate-900"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-900 bg-red-950/20 p-6 text-center">
          <h3 className="text-lg font-semibold text-red-400">
            Something went wrong
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {error}
          </p>

          <button
            onClick={fetchMyRoadmaps}
            className="mt-5 rounded-xl bg-white px-5 py-2 font-medium text-black transition hover:bg-slate-200"
          >
            Try Again
          </button>
        </div>
      ) : roadmaps.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-16 text-center">
          <BookOpen
            size={55}
            className="mb-5 text-slate-500"
          />

          <h3 className="text-xl font-semibold text-white">
            No Roadmaps Yet
          </h3>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Start building your first roadmap and share your
            learning journey with the community.
          </p>

          <Link
            to="/builder"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-slate-200"
          >
            <Plus size={18} />
            Create Your First Roadmap
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {roadmaps.slice(0, 4).map((roadmap) => (
            <div
              key={roadmap._id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-black/40 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60"
            >
              <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center">
                {/* icon */}
                <img
                  src={
                    roadmap.icon
                      ? `https://cdn.simpleicons.org/${roadmap.icon}`
                      : "https://placehold.co/96x96/0f172a/ffffff?text=?"
                  }
                  alt={roadmap.title}
                  className="h-20 w-20 rounded-xl object-contain bg-slate-900 p-3 border border-slate-800"
                />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {roadmap.category && (
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                        {roadmap.category.name}
                      </span>
                    )}

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${roadmap.status === "Published"
                          ? "bg-green-500/15 text-green-400"
                          : "bg-yellow-500/15 text-yellow-400"
                        }`}
                    >
                      {roadmap.status}
                    </span>

                    {roadmap.difficulty && (
                      <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                        {roadmap.difficulty}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-white transition group-hover:text-slate-200">
                    {roadmap.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                    {roadmap.description || "No description available."}
                  </p>

                  {/* Stats */}
                  <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock3 size={16} />
                      <span>
                        {roadmap.estimatedTime || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      <span>{roadmap.views}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Heart size={16} />
                      <span>{roadmap.likes?.length || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 lg:flex-col">
                  <Link
                    to={`/roadmaps/${roadmap.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-900"
                  >
                    View
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    to={`/builder/${roadmap._id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-slate-200"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyRoadmaps;