import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bookmark,
  ArrowRight,
  Clock3,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const MyBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookmarks/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setBookmarks(data.bookmarks || []);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load your bookmarks.");
    } finally {
      setLoading(false);
    }
  };
  
const removeBookmark = async (roadmapId) => {
  const confirmed = window.confirm(
    "Remove this roadmap from your bookmarks?"
  );

  if (!confirmed) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/bookmarks/${roadmapId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchBookmarks();
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchBookmarks();
  }, []);

  

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            My Bookmarks
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {bookmarks.length} saved roadmap
            {bookmarks.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={fetchBookmarks}
          className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white transition hover:border-white hover:bg-white hover:text-black"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-2xl bg-slate-900"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-900 bg-red-950/20 p-8 text-center">
          <h3 className="text-lg font-semibold text-red-400">
            Failed to load bookmarks
          </h3>

          <p className="mt-3 text-sm text-slate-400">
            {error}
          </p>

          <button
            onClick={fetchBookmarks}
            className="mt-6 rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-slate-200"
          >
            Try Again
          </button>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-16 text-center">
          <Bookmark
            size={52}
            className="mb-5 text-slate-500"
          />

          <h3 className="text-xl font-semibold text-white">
            No Bookmarks Yet
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Save roadmaps that you want to revisit later.
          </p>

          <Link
            to="/roadmaps"
            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-slate-200"
          >
            Explore Roadmaps
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {bookmarks.slice(0, 4).map((bookmark) => (
                        <div
              key={bookmark._id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-black/40 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60"
            >
              <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center">
                {/* icon */}
                <img
                  src={
                    bookmark.roadmap?.icon ||
                    "https://placehold.co/300x180/0f172a/ffffff?text=Roadmap"
                  }
                  alt={bookmark.roadmap?.title}
                  className="h-40 w-full rounded-2xl object-cover lg:h-28 lg:w-44"
                />

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {bookmark.roadmap?.difficulty && (
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                        {bookmark.roadmap.difficulty}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-white transition group-hover:text-slate-200">
                    {bookmark.roadmap?.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                    {bookmark.roadmap?.description ||
                      "No description available."}
                  </p>

                  <div className="mt-5 flex items-center gap-5 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock3 size={16} />
                      <span>
                        Saved{" "}
                        {new Date(bookmark.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 lg:flex-col">
                  <Link
                    to={`/roadmaps/${bookmark.roadmap?.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-900"
                  >
                    View
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </Link>

                  <button
                    onClick={() => removeBookmark(bookmark.roadmap._id)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-900 bg-red-950/20 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-900/30"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyBookmarks;