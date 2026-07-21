import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  CheckCircle2,
  Bookmark,
  Users,
  ArrowUpRight,
} from "lucide-react";

const UserStats = () => {
  const [stats, setStats] = useState([
    {
      title: "My Roadmaps",
      value: 0,
      icon: BookOpen,
      change: "Created",
    },
    {
      title: "Completed",
      value: 0,
      icon: CheckCircle2,
      change: "Completed",
    },
    {
      title: "Bookmarks",
      value: 0,
      icon: Bookmark,
      change: "Saved",
    },
    {
      title: "Followers",
      value: 0,
      icon: Users,
      change: "Followers",
    },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Get profile first (needed for followers endpoint)
    const profileRes = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/profile`,
      { headers }
    );

    const userId = profileRes.data.user._id;

    const [
      roadmapRes,
      progressRes,
      bookmarkRes,
      notificationRes,
      followerRes,
    ] = await Promise.all([
      axios.get(
        `${import.meta.env.VITE_API_URL}/roadmaps/my`,
        { headers }
      ),

      axios.get(
        `${import.meta.env.VITE_API_URL}/progress/my`,
        { headers }
      ),

      axios.get(
        `${import.meta.env.VITE_API_URL}/bookmarks/my`,
        { headers }
      ),

      axios.get(
        `${import.meta.env.VITE_API_URL}/notifications`,
        { headers }
      ),

      axios.get(
        `${import.meta.env.VITE_API_URL}/follows/followers/${userId}`
      ),
    ]);

    const completedRoadmaps =
      progressRes.data.progress.filter(
        (item) => item.isCompleted
      ).length;

    setStats([
      {
        title: "My Roadmaps",
        value: roadmapRes.data.count,
        icon: BookOpen,
        change: "Created",
      },
      {
        title: "Completed",
        value: completedRoadmaps,
        icon: CheckCircle2,
        change: "Completed",
      },
      {
        title: "Bookmarks",
        value: bookmarkRes.data.count,
        icon: Bookmark,
        change: "Saved",
      },
      {
        title: "Followers",
        value: followerRes.data.count,
        icon: Users,
        change: "Followers",
      },
    ]);

    console.log("========== DASHBOARD DATA ==========");

    console.log({
      profile: profileRes.data,
      roadmaps: roadmapRes.data,
      progress: progressRes.data,
      bookmarks: bookmarkRes.data,
      notifications: notificationRes.data,
      followers: followerRes.data,
    });

    console.log("====================================");
  } catch (error) {
    console.error("Dashboard Debug:", error);
  }
};

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold text-slate-700">
        Overview
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700"
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/5 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    {stat.title}
                  </p>

                  <h3 className="mt-2 text-4xl font-bold text-white">
                    {stat.value}
                  </h3>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-black p-3">
                  <Icon size={24} className="text-white" />
                </div>
              </div>

              <div className="relative mt-6 flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  {stat.change}
                </span>

                <ArrowUpRight
                  size={18}
                  className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UserStats;