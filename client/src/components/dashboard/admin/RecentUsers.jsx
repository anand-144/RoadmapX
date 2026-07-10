import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  User,
  Shield,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const RecentUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-15 mb-10">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Recent Users
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Newly registered platform users
          </p>
        </div>

        <button
          onClick={fetchUsers}
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
              className="h-20 animate-pulse rounded-2xl bg-slate-900"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {users.slice(0, 5).map((user) => (
                    <div
              key={user._id}
              className="group rounded-2xl border border-slate-800 bg-black/30 p-5 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/40"
            >
             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Left */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
                    <User
                      size={24}
                      className="text-slate-300"
                    />
                  </div>

                  {/* User Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {user.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      @{user.username}
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-cyan-500/20 text-cyan-400"
                        }`}
                      >
                        <Shield size={12} />
                        {user.role}
                      </span>

                      <span className="text-xs text-slate-500">
                        Joined{" "}
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <Link
                  to={`/profile/${user.username}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-black"
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

export default RecentUsers;