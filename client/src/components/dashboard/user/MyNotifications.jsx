import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bell,
  RefreshCw,
  CheckCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const MyNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load notifications.");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notifications/read-all`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/notifications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const formatTimeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} day(s) ago`;

  return new Date(date).toLocaleDateString();
};

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Notifications
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {unreadCount} unread • {notifications.length} total
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchNotifications}
            className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white transition hover:border-white hover:bg-white hover:text-black"
          >
            <RefreshCw size={18} />
          </button>

          {notifications.length > 0 && unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-slate-200"
            >
              <CheckCheck size={18} />
              Mark All
            </button>
          )}
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-slate-900"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-900 bg-red-950/20 p-8 text-center">
          <h3 className="text-lg font-semibold text-red-400">
            Failed to load notifications
          </h3>

          <p className="mt-3 text-sm text-slate-400">
            {error}
          </p>

          <button
            onClick={fetchNotifications}
            className="mt-6 rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-slate-200"
          >
            Try Again
          </button>
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-16 text-center">
          <Bell
            size={52}
            className="mb-5 text-slate-500"
          />

          <h3 className="text-xl font-semibold text-white">
            No Notifications
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            You're all caught up. New activity will appear here.
          </p>

          <Link
            to="/roadmaps"
            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-slate-200"
          >
            Explore Roadmaps
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.slice(0, 5).map((notification) => (
                        <div
              key={notification._id}
              className={`group rounded-2xl border p-5 transition-all duration-300 ${
                notification.isRead
                  ? "border-slate-800 bg-black/30"
                  : "border-slate-700 bg-slate-900/60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left */}
                <div className="flex flex-1 gap-4">
                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${
                      notification.isRead
                        ? "bg-slate-600"
                        : "bg-blue-500"
                    }`}
                  />

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {notification.sender?.name ||
                          notification.sender?.username ||
                          "User"}
                      </h3>

                      <span className="rounded-full bg-slate-800 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-300">
                        {notification.type.replace("_", " ")}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {notification.message}
                    </p>

                    {notification.roadmap && (
                      <Link
                        to={`/roadmaps/${notification.roadmap.slug}`}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-slate-300"
                      >
                        📚 {notification.roadmap.title}
                      </Link>
                    )}

                    <p className="mt-4 text-xs text-slate-500">
                      {formatTimeAgo(notification.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {!notification.isRead && (
                    <button
                      onClick={() =>
                        markAsRead(notification._id)
                      }
                      className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-white transition hover:bg-slate-900"
                    >
                      Read
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteNotification(notification._id)
                    }
                    className="rounded-xl border border-red-900 bg-red-950/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-900/30"
                  >
                    Delete
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

export default MyNotifications;