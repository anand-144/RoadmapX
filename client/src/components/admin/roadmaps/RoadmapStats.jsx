import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Globe,
  FileText,
  Star,
} from "lucide-react";

const RoadmapStats = ({ stats }) => {
  const cards = [
    {
      title: "Total Roadmaps",
      value: stats.total || 0,
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Published",
      value: stats.published || 0,
      icon: Globe,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Drafts",
      value: stats.drafts || 0,
      icon: FileText,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      title: "Featured",
      value: stats.featured || 0,
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-2xl border border-white/10 bg-[#111] p-4 transition hover:border-yellow-400/30"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bg}`}
              >
                <Icon
                  size={22}
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

export default RoadmapStats;