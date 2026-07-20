import React from "react";
import {
  User,
  CalendarDays,
} from "lucide-react";

const AuthorCard = ({ roadmap }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111] p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Creator
      </h2>

      <div className="flex items-center gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/10">

          <User
            size={30}
            className="text-yellow-400"
          />

        </div>

        <div>

          <h3 className="text-lg font-semibold">
            {roadmap.createdBy?.name}
          </h3>

          <p className="text-gray-500">
            @{roadmap.createdBy?.username}
          </p>

        </div>

      </div>

      <div className="mt-6 flex items-center gap-3 text-gray-400">

        <CalendarDays size={18} />

        {new Date(
          roadmap.createdAt
        ).toLocaleDateString()}
      </div>

    </div>
  );
};

export default AuthorCard;