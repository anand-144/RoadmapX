import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Plus,
  Eye,
  Heart,
  Clock,
  LibraryBig,
  Trash2,
  Star,
  Pencil,
  ExternalLink,
} from "lucide-react";

import toast from "react-hot-toast";

const AdminMyRoadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================
  // Fetch My Roadmaps
  // ==========================

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


  const handleToggleFeatured = async (roadmapId) => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/roadmaps/${roadmapId}/feature`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(data.message);

    setRoadmaps((prev) =>
      prev.map((roadmap) =>
        roadmap._id === roadmapId
          ? {
              ...roadmap,
              isFeatured: !roadmap.isFeatured,
            }
          : roadmap
      )
    );
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to update roadmap."
    );
  }
};


const handleDeleteRoadmap = async (roadmapId) => {
  const confirmed = window.confirm(
    "Delete this roadmap?"
  );

  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token");

    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/roadmaps/${roadmapId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(data.message);

    setRoadmaps((prev) =>
      prev.filter(
        (roadmap) => roadmap._id !== roadmapId
      )
    );
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to delete roadmap."
    );
  }
};

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl">

      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            My Roadmaps
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Manage your published and draft roadmaps.
          </p>
        </div>

        <Link
          to="/builder"
          className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300"
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
              className="h-36 animate-pulse rounded-2xl bg-slate-900"
            />
          ))}
        </div>
      ) : error ? (

        /* Error */

        <div className="rounded-2xl border border-red-900 bg-red-950/20 p-8 text-center">

          <h3 className="text-lg font-semibold text-red-400">
            Something went wrong
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {error}
          </p>

          <button
            onClick={fetchMyRoadmaps}
            className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:bg-slate-200"
          >
            Try Again
          </button>

        </div>

      ) : roadmaps.length === 0 ? (

        /* Empty */

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-20">

          <BookOpen
            size={60}
            className="mb-5 text-slate-600"
          />

          <h3 className="text-xl font-semibold text-white">
            No Roadmaps Yet
          </h3>

          <p className="mt-3 max-w-md text-center text-sm leading-6 text-slate-400">
            Create your first roadmap and start helping thousands
            of learners.
          </p>

          <Link
            to="/builder"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
          >
            <Plus size={18} />
            Create Roadmap
          </Link>

        </div>

      ) : (

        /* Cards (Part 2) */

        <div className="space-y-5">

          <div className="space-y-5">
            {roadmaps.map((roadmap) => (
              <div
                key={roadmap._id}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:shadow-xl hover:shadow-yellow-500/10"
              >
                <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center">

                  {/* Icon */}
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
                    {roadmap.icon ? (
                      <img
                        src={`https://cdn.simpleicons.org/${roadmap.icon}/facc15`}
                        alt={roadmap.title}
                        className="h-12 w-12 object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <BookOpen
                        size={40}
                        className="text-yellow-400"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">

                    {/* Badges */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">

                      {roadmap.category && (
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
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

                      <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                        {roadmap.difficulty}
                      </span>

                      {roadmap.isFeatured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-medium text-yellow-300">
                          <Star size={12} fill="currentColor" />
                          Featured
                        </span>
                      )}

                    </div>

                    {/* Title */}

                    <h3 className="text-2xl font-bold text-white">
                      {roadmap.title}
                    </h3>

                    {/* Description */}

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">
                      {roadmap.description ||
                        "No description available."}
                    </p>

                    {/* Stats */}

                    <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-400">

                      <div className="flex items-center gap-2">
                        <Eye
                          size={16}
                          className="text-slate-500"
                        />
                        <span>{roadmap.views || 0} Views</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Heart
                          size={16}
                          className="text-red-400"
                        />
                        <span>{roadmap.likes?.length || 0} Likes</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock
                          size={16}
                          className="text-yellow-400"
                        />
                        <span>{roadmap.estimatedTime || "N/A"}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <LibraryBig
                          size={16}
                          className="text-blue-400"
                        />
                        <span>{roadmap.topics?.length || 0} Topics</span>
                      </div>

                    </div>

                  </div>

                  {/* Actions */}

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

                    {/* View */}

                    <Link
                      to={`/roadmap/${roadmap.slug}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-900"
                    >
                      <ExternalLink size={16} />
                      View
                    </Link>

                    {/* Edit */}

                    <Link
                      to={`/builder/${roadmap._id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    {/* Feature */}

                    <button
                      onClick={() => handleToggleFeatured(roadmap._id)}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${roadmap.isFeatured
                        ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30"
                        : "border border-slate-700 text-white hover:bg-slate-900"
                        }`}
                    >
                      <Star size={16} />

                      {roadmap.isFeatured
                        ? "Unfeature"
                        : "Feature"}
                    </button>

                    {/* Delete */}

                    <button
                      onClick={() => handleDeleteRoadmap(roadmap._id)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      )}

    </section>
  );
};

export default AdminMyRoadmaps;