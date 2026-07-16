import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  User,
  CalendarDays,
} from "lucide-react";

const UserStats = ({ users = [] }) => {
  const now = new Date();

  const totalUsers = users.length;

  const totalAdmins = users.filter(
    (user) => user.role === "admin"
  ).length;

  const regularUsers = users.filter(
    (user) => user.role === "user"
  ).length;

  const newUsers = users.filter((user) => {
    const created = new Date(user.createdAt);

    return (
      created.getMonth() === now.getMonth() &&
      created.getFullYear() === now.getFullYear()
    );
  }).length;

  const cards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Admins",
      value: totalAdmins,
      icon: Shield,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Users",
      value: regularUsers,
      icon: User,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "New This Month",
      value: newUsers,
      icon: CalendarDays,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
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
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl border border-white/10 bg-[#111] p-4"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
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

export default UserStats;