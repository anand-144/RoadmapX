import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl border border-white/10 bg-[#111] p-6"
        >
          <div className="flex items-center gap-4">

            <div className="h-14 w-14 rounded-2xl bg-white/10" />

            <div className="flex-1">

              <div className="h-5 w-36 rounded bg-white/10" />

              <div className="mt-3 h-4 w-24 rounded bg-white/10" />

            </div>

          </div>

          <div className="mt-8 h-4 w-32 rounded bg-white/10" />

          <div className="mt-8 flex gap-3">

            <div className="h-11 flex-1 rounded-xl bg-white/10" />

            <div className="h-11 flex-1 rounded-xl bg-white/10" />

          </div>

        </div>
      ))}

    </div>
  );
};

export default CategorySkeleton;