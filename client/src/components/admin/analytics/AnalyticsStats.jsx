import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Eye,
  Heart,
  Bookmark,
  FolderTree,
} from "lucide-react";

const AnalyticsStats = ({ stats }) => {
  const cards = [
    {
      title: "Users",
      value: stats.totalUsers || 0,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Roadmaps",
      value: stats.totalRoadmaps || 0,
      icon: BookOpen,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Views",
      value: stats.totalViews || 0,
      icon: Eye,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Likes",
      value: stats.totalLikes || 0,
      icon: Heart,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
    {
      title: "Bookmarks",
      value: stats.totalBookmarks || 0,
      icon: Bookmark,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Categories",
      value: stats.totalCategories || 0,
      icon: FolderTree,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111] to-[#181818] p-6 transition hover:border-yellow-400/30"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold">
                  {card.value}
                </h2>
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
  );
};

export default AnalyticsStats;