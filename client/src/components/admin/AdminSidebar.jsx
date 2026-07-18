import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderTree,
  BookOpen,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    id: "categories",
    label: "Categories",
    icon: FolderTree,
  },
  {
    id: "roadmaps",
    label: "Roadmaps",
    icon: BookOpen,
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

const AdminSidebar = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="sticky top-28 rounded-3xl border border-white/10 bg-[#111] p-5"
    >
      <div className="space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-yellow-400 text-black shadow-lg"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.label}
              </span>
            </button>
          );
        })}

      </div>
    </motion.div>
  );
};

export default AdminSidebar;