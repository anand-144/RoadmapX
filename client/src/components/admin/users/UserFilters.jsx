import React from "react";
import {
  Users,
  Shield,
} from "lucide-react";

const filters = [
  {
    label: "All Users",
    value: "All",
    icon: Users,
    count: null,
  },
  {
    label: "Members",
    value: "user",
    icon: Users,
    count: null,
  },
  {
    label: "Administrators",
    value: "admin",
    icon: Shield,
    count: null,
  },
];

const UserFilters = ({
  role,
  setRole,
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111] p-2">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const active = role === filter.value;

          return (
            <button
              key={filter.value}
              onClick={() => setRole(filter.value)}
              className={`group flex flex-1 items-center justify-center gap-3 rounded-2xl px-5 py-3 transition-all duration-300 min-w-[170px] ${
                active
                  ? "bg-yellow-400 text-black shadow-lg shadow-yellow-500/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                  active
                    ? "bg-black/10"
                    : "bg-white/5 group-hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
              </div>

              <div className="text-left">
                <p className="font-semibold">
                  {filter.label}
                </p>

                <p
                  className={`text-xs ${
                    active
                      ? "text-black/70"
                      : "text-gray-500"
                  }`}
                >
                  {filter.value === "All"
                    ? "View everyone"
                    : filter.value === "admin"
                    ? "Manage admins"
                    : "Regular users"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UserFilters;