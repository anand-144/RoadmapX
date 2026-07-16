import React from "react";
import { Users, Shield } from "lucide-react";

const filters = [
  {
    label: "All",
    value: "All",
    icon: Users,
  },
  {
    label: "Users",
    value: "user",
    icon: Users,
  },
  {
    label: "Admins",
    value: "admin",
    icon: Shield,
  },
];

const UserFilters = ({
  role,
  setRole,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => {
        const Icon = filter.icon;

        return (
          <button
            key={filter.value}
            onClick={() => setRole(filter.value)}
            className={`flex items-center gap-2 rounded-2xl border px-5 py-3 transition ${
              role === filter.value
                ? "border-yellow-400 bg-yellow-400 text-black"
                : "border-white/10 bg-[#111] text-gray-300 hover:border-yellow-400 hover:text-white"
            }`}
          >
            <Icon size={17} />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default UserFilters;