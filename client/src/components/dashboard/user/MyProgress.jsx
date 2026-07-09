import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TrendingUp,
  BookOpen,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const MyProgress = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/progress/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setProgress(data.progress || []);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load your learning progress.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            My Progress
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {progress.length} roadmap
            {progress.length !== 1 ? "s" : ""} in progress
          </p>
        </div>

        <button
          onClick={fetchProgress}
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
              className="h-36 animate-pulse rounded-2xl bg-slate-900"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-900 bg-red-950/20 p-8 text-center">
          <h3 className="text-lg font-semibold text-red-400">
            Failed to load progress
          </h3>

          <p className="mt-3 text-sm text-slate-400">
            {error}
          </p>

          <button
            onClick={fetchProgress}
            className="mt-6 rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-slate-200"
          >
            Try Again
          </button>
        </div>
      ) : progress.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-16 text-center">
          <TrendingUp
            size={52}
            className="mb-5 text-slate-500"
          />

          <h3 className="text-xl font-semibold text-white">
            No Progress Yet
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            Start learning a roadmap and complete topics to
            track your progress here.
          </p>

          <Link
            to="/roadmaps"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-slate-200"
          >
            <BookOpen size={18} />
            Explore Roadmaps
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {progress.slice(0, 4).map((item) => (
                        <div
              key={item._id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-black/40 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60"
            >
              <div className="p-5">
                {/* Top */}
                <div className="flex items-start gap-4">
                  <img
                    src={
                      item.roadmap?.thumbnail ||
                      "https://placehold.co/120x120/0f172a/ffffff?text=Roadmap"
                    }
                    alt={item.roadmap?.title}
                    className="h-20 w-20 rounded-2xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                        {item.roadmap?.difficulty}
                      </span>

                      {item.isCompleted ? (
                        <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium text-green-400">
                          Completed
                        </span>
                      ) : (
                        <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-400">
                          In Progress
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 truncate text-lg font-semibold text-white">
                      {item.roadmap?.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {item.completedTopics.length} topic
                      {item.completedTopics.length !== 1 ? "s" : ""} completed
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Completion
                    </span>

                    <span className="font-semibold text-white">
                      {item.completionPercentage}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        item.isCompleted
                          ? "bg-green-500"
                          : "bg-white"
                      }`}
                      style={{
                        width: `${item.completionPercentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {item.isCompleted
                      ? "Roadmap completed 🎉"
                      : "Keep learning 🚀"}
                  </span>

                  <Link
                    to={`/roadmaps/${item.roadmap?.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
                  >
                    Continue

                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
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

export default MyProgress;