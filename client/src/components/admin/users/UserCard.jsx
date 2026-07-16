import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  Eye,
  Trash2,
  Crown,
  CalendarDays,
} from "lucide-react";

const UserCard = ({
  user,
  refresh,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const changeRole = async () => {
    try {
      setLoading(true);

      const newRole =
        user.role === "admin"
          ? "user"
          : "admin";

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/users/${user._id}/role`,
        {
          role: newRole,
        },
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
          "Unable to update role."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111] to-[#181818] p-6 transition hover:border-yellow-400/30 hover:shadow-xl hover:shadow-yellow-500/5"
    >
      {/* Top */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        <div className="flex gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/10">
            <User
              size={30}
              className="text-yellow-400"
            />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  user.role === "admin"
                    ? "bg-yellow-500/15 text-yellow-400"
                    : "bg-blue-500/15 text-blue-400"
                }`}
              >
                {user.role}
              </span>

            </div>

            <h2 className="mt-3 text-2xl font-bold">
              {user.name}
            </h2>

            <p className="mt-1 text-gray-400">
              @{user.username}
            </p>

            <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-500">

              <div className="flex items-center gap-2">
                <Mail size={16} />
                {user.email}
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={16} />
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 grid grid-cols-2 gap-3 lg:flex">

        <Link
          to={`/profile/${user.username}`}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 transition hover:border-yellow-400 hover:text-yellow-400"
        >
          <Eye size={17} />
          View
        </Link>

        <button
          disabled={loading}
          onClick={changeRole}
          className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 transition ${
            user.role === "admin"
              ? "bg-blue-500/15 text-blue-400 hover:bg-blue-500 hover:text-white"
              : "bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500 hover:text-black"
          }`}
        >
          <Crown size={17} />

          {user.role === "admin"
            ? "Make User"
            : "Make Admin"}
        </button>

        <button
          onClick={onDelete}
          className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-5 py-3 text-red-400 transition hover:bg-red-500 hover:text-white lg:ml-auto lg:col-span-1"
        >
          <Trash2 size={17} />
          Delete
        </button>

      </div>
    </motion.div>
  );
};

export default UserCard;