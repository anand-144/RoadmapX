import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  BookOpen,
  FolderTree,
  Star,
  Globe,
  FileText,
  ArrowUpRight,
} from "lucide-react";

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRoadmaps: 0,
    totalCategories: 0,
    featuredRoadmaps: 0,
    publishedRoadmaps: 0,
    draftRoadmaps: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      subtitle: "Registered Users",
      icon: Users,
    },
    {
      title: "Roadmaps",
      value: stats.totalRoadmaps,
      subtitle: "Published + Draft",
      icon: BookOpen,
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      subtitle: "Active Categories",
      icon: FolderTree,
    },
    {
      title: "Featured",
      value: stats.featuredRoadmaps,
      subtitle: "Featured Roadmaps",
      icon: Star,
    },
    {
      title: "Published",
      value: stats.publishedRoadmaps,
      subtitle: "Live Roadmaps",
      icon: Globe,
    },
    {
      title: "Drafts",
      value: stats.draftRoadmaps,
      subtitle: "Awaiting Publish",
      icon: FileText,
    },
  ];

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-slate-700">
        Platform Overview
      </h2>
          {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-44 animate-pulse rounded-3xl bg-slate-900"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700"
              >
                {/* Glow */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      {card.title}
                    </p>

                    <h3 className="mt-3 text-5xl font-bold text-white">
                      {card.value}
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-black p-3 transition group-hover:border-slate-700">
                    <Icon
                      size={26}
                      className="text-white"
                    />
                  </div>
                </div>

                <div className="relative mt-8 flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    {card.subtitle}
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AdminStats;