import React from "react";

const RoadmapSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-6">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl border border-white/10 bg-gradient-to-br from-[#111] to-[#181818] p-5 sm:p-6"
        >
          {/* Top */}
          <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row">

              {/* Icon */}
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-white/10 sm:h-20 sm:w-20" />

              {/* Content */}
              <div className="flex-1">

                {/* Badges */}
                <div className="flex gap-2">
                  <div className="h-6 w-20 rounded-full bg-white/10" />
                  <div className="h-6 w-24 rounded-full bg-white/10" />
                </div>

                {/* Title */}
                <div className="mt-5 h-7 w-72 max-w-full rounded-lg bg-white/10" />

                {/* Description */}
                <div className="mt-4 space-y-3">
                  <div className="h-4 w-full rounded bg-white/10" />
                  <div className="h-4 w-5/6 rounded bg-white/10" />
                  <div className="h-4 w-2/3 rounded bg-white/10" />
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:gap-6">
                  <div className="h-4 w-24 rounded bg-white/10" />
                  <div className="h-4 w-20 rounded bg-white/10" />
                  <div className="h-4 w-16 rounded bg-white/10" />
                  <div className="h-4 w-20 rounded bg-white/10" />
                </div>

              </div>
            </div>

            {/* Category */}
            <div className="h-10 w-28 rounded-xl bg-white/10" />
          </div>

          {/* Buttons */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:flex">
            <div className="h-12 rounded-xl bg-white/10 lg:w-28" />
            <div className="h-12 rounded-xl bg-white/10 lg:w-36" />
            <div className="h-12 rounded-xl bg-white/10 lg:w-36" />
            <div className="h-12 rounded-xl bg-white/10 lg:ml-auto lg:w-32" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadmapSkeleton;