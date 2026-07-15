import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  FolderTree,
  FileText,
  Star,
  Globe,
} from "lucide-react";

const Overview = () => {
  const [stats, setStats] = useState({
    users: 0,
    roadmaps: 0,
    published: 0,
    drafts: 0,
    featured: 0,
    categories: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
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

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Roadmaps",
      value: stats.totalRoadmaps,
      icon: BookOpen,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Published",
      value: stats.publishedRoadmaps,
      icon: Globe,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Drafts",
      value: stats.draftRoadmaps,
      icon: FileText,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Featured",
      value: stats.featuredRoadmaps,
      icon: Star,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: FolderTree,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-4xl font-bold">
          Platform Overview
        </h2>

        <p className="mt-3 max-w-2xl text-gray-400">
          Monitor users, roadmaps, categories and platform activity from one place.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="group rounded-3xl border border-white/10 bg-gradient-to-br from-[#111] to-[#171717] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:shadow-xl hover:shadow-yellow-500/5"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-400">
                    {card.title}
                  </p>

                  {loading ? (
                    <div className="mt-4 h-10 w-24 animate-pulse rounded bg-white/10" />
                  ) : (
                    <h3 className="mt-4 text-5xl font-bold tracking-tight">
                      {card.value}
                    </h3>
                  )}

                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.bg}`}
                >
                  <Icon
                    size={30}
                    className={card.color}
                  />
                </div>

              </div>
            </motion.div>
          );
        })}

      </div>

    </div>
  );
};

export default Overview;