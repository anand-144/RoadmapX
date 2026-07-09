import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  RefreshCw,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const MyFollowers = () => {
  const { user } = useAuth();

  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchFollowers = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/follows/followers/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setFollowers(data.followers || []);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load followers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchFollowers();
    }
  }, [user]);

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            My Followers
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {followers.length} follower
            {followers.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={fetchFollowers}
          className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white transition hover:border-white hover:bg-white hover:text-black"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-2xl bg-slate-900"
            />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-900 bg-red-950/20 p-8 text-center">
          <h3 className="text-lg font-semibold text-red-400">
            Failed to load followers
          </h3>

          <p className="mt-3 text-sm text-slate-400">
            {error}
          </p>

          <button
            onClick={fetchFollowers}
            className="mt-6 rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-slate-200"
          >
            Try Again
          </button>
        </div>
      ) : followers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-16 text-center">
          <Users
            size={52}
            className="mb-5 text-slate-500"
          />

          <h3 className="text-xl font-semibold text-white">
            No Followers Yet
          </h3>

          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
            As you publish roadmaps and engage with the community,
            people will start following you.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {followers.slice(0, 5).map((item) => (
                        <div
              key={item._id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-black/40 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60"
            >
              <div className="flex items-center justify-between gap-4 p-5">
                {/* Left */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
                    <User size={24} className="text-slate-300" />
                  </div>

                  {/* User Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {item.follower?.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      @{item.follower?.username}
                    </p>

                    <p className="mt-2 max-w-md text-sm text-slate-400">
                      {item.follower?.bio || "No bio added yet."}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <Link
                  to={`/profile/${item.follower?.username}`}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-900"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyFollowers; 