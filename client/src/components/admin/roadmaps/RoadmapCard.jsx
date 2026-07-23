import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  Trash2,
  Star,
  Clock3,
  User,
  BookOpen,
  Globe,
  FileText,
  Heart,
} from "lucide-react";

const RoadmapCard = ({
  roadmap,
  refresh,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const togglePublish = async () => {
    try {
      setLoading(true);

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/roadmaps/${roadmap._id}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      refresh?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleFeature = async () => {
    try {
      setLoading(true);

      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/admin/roadmaps/${roadmap._id}/feature`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      refresh?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update roadmap."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      layout
      whileHover={{
        y: -4,
      }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111] to-[#181818] p-6 sm:p-6 transition-all duration-300 hover:border-yellow-400/30 hover:shadow-xl hover:shadow-yellow-500/5"
    >
      {/* Top */}

      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

        <div className="flex flex-col gap-5 sm:flex-row">

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/10 sm:h-20 sm:w-20">

            {roadmap.icon ? (
              <img
                src={`https://cdn.simpleicons.org/${roadmap.icon}/facc15`}
                alt={roadmap.title}
                className="h-8 w-8 sm:h-10 sm:w-10"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <BookOpen
                size={32}
                className="text-yellow-400"
              />
            )}

          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  roadmap.status === "Published"
                    ? "bg-green-500/15 text-green-400"
                    : "bg-orange-500/15 text-orange-400"
                }`}
              >
                {roadmap.status}
              </span>

              {roadmap.isFeatured && (
                <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-400">
                  Featured
                </span>
              )}

            </div>

            <h2 className="mt-4 break-words text-xl font-bold leading-tight sm:text-2xl">
              {roadmap.title}
            </h2>

            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-400">
              {roadmap.description}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-gray-500 sm:flex sm:flex-wrap sm:gap-5">

              <div className="flex items-center gap-2">
                <User size={16} />
                {roadmap.createdBy?.name}
              </div>

              <div className="flex items-center gap-2">
                <Clock3 size={16} />
                {roadmap.estimatedTime || "N/A"}
              </div>

              <div className="flex items-center gap-2">
                <Heart size={16} />
                {roadmap.likes?.length || 0}
              </div>

              <div className="flex items-center gap-2">
                <Eye size={16} />
                {roadmap.views || 0}
              </div>

            </div>

          </div>

        </div>

        {/* Category */}

        <div className="self-start xl:self-auto">

          {roadmap.category && (
            <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm">
              {roadmap.category.name}
            </span>
          )}

        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 grid grid-cols-2 gap-3 lg:flex lg:flex-wrap">

        <Link
          to={`/roadmap/${roadmap.slug}`}
          className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 transition hover:border-yellow-400 hover:text-yellow-400"
        >
          <Eye size={17} />
          View
        </Link>

        <button
          disabled={loading}
          onClick={togglePublish}
          className={`flex w-full items-center gap-2 rounded-xl px-5 py-3 transition ${
            roadmap.status === "Published"
              ? "bg-orange-500/15 text-orange-400 hover:bg-orange-500"
              : "bg-green-500/15 text-green-400 hover:bg-green-500"
          } hover:text-white`}
        >
          {roadmap.status === "Published" ? (
            <>
              <FileText size={17} />
              Draft
            </>
          ) : (
            <>
              <Globe size={17} />
              Publish
            </>
          )}
        </button>

        <button
          disabled={loading}
          onClick={toggleFeature}
          className={`flex w-full items-center gap-2 rounded-xl px-5 py-3 transition ${
            roadmap.isFeatured
              ? "bg-yellow-500 text-black hover:bg-yellow-400"
              : "border border-yellow-400/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500 hover:text-black"
          }`}
        >
          <Star size={17} />

          {roadmap.isFeatured
            ? "Featured"
            : "Feature"}
        </button>

        <button
          onClick={onDelete}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 px-5 py-3 text-red-400 transition hover:bg-red-500 hover:text-white lg:ml-auto lg:w-auto"
        >
          <Trash2 size={17} />
          Delete
        </button>

      </div>
    </motion.div>
  );
};

export default RoadmapCard;
