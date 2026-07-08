import React from "react";
import {
  BookOpen,
  CheckCircle2,
  Bookmark,
  Users,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "My Roadmaps",
    value: 12,
    icon: BookOpen,
    change: "+2 this week",
  },
  {
    title: "Completed",
    value: 8,
    icon: CheckCircle2,
    change: "67% completion",
  },
  {
    title: "Bookmarks",
    value: 24,
    icon: Bookmark,
    change: "+5 saved",
  },
  {
    title: "Followers",
    value: 143,
    icon: Users,
    change: "+12 this month",
  },
];

const UserStats = () => {
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
              {/* Glow */}
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