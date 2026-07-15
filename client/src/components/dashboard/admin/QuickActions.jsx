import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  FolderTree,
  Users,
  ShieldCheck,
  Compass,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Create Roadmap",
    description: "Build a new roadmap.",
    icon: Plus,
    to: "/builder",
    color: "bg-yellow-500/10 text-yellow-400",
  },
  {
    title: "Manage Categories",
    description: "Organize roadmap categories.",
    to: "/admin",
    icon: FolderTree,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    title: "Admin Panel",
    description: "Open administrator tools.",
    to: "/admin",
    icon: ShieldCheck,
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    title: "Explore Roadmaps",
    description: "Browse published roadmaps.",
    to: "/explore",
    icon: Compass,
    color: "bg-pink-500/10 text-pink-400",
  },
];

const QuickActions = () => {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl">

      {/* Header */}

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Quick Actions
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Frequently used administrator shortcuts.
        </p>
      </div>

      <div className="space-y-4">

        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.title}
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
            >
              <Link
                to={action.to}
                className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-black/40 p-4 transition-all duration-300 hover:border-yellow-400/40 hover:bg-slate-900"
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}
                  >
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {action.title}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {action.description}
                    </p>
                  </div>

                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-yellow-400"
                />

              </Link>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
};

export default QuickActions;