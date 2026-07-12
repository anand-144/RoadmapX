import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
      {/* Icon */}
      <div className="flex h-44 items-center justify-center bg-white/5">
        <div className="h-20 w-20 rounded-2xl bg-white/10" />
      </div>

      {/* Body */}
      <div className="space-y-4 p-6">
        <div className="h-6 w-3/4 rounded bg-white/10" />

        <div className="space-y-2">
          <div className="h-3 rounded bg-white/10" />
          <div className="h-3 rounded bg-white/10" />
          <div className="h-3 w-2/3 rounded bg-white/10" />
        </div>

        <div className="flex gap-2 pt-2">
          <div className="h-7 w-24 rounded-full bg-white/10" />
          <div className="h-7 w-28 rounded-full bg-white/10" />
        </div>

        <div className="mt-4 border-t border-white/10 pt-5">
          <div className="mb-3 h-3 w-1/2 rounded bg-white/10" />
          <div className="h-3 w-1/3 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
};

const RoadmapSkeleton = () => {
  return (
    <section className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </section>
  );
};

export default RoadmapSkeleton;