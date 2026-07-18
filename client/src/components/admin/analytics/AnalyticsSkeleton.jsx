import React from "react";

const AnalyticsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">

      <div className="h-10 w-72 rounded bg-white/10" />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-white/10 bg-[#111] p-6"
          >
            <div className="flex items-center justify-between">

              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-white/10" />
                <div className="h-9 w-20 rounded bg-white/10" />
              </div>

              <div className="h-16 w-16 rounded-2xl bg-white/10" />

            </div>
          </div>
        ))}

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="h-[360px] rounded-3xl bg-[#111]" />

        <div className="h-[360px] rounded-3xl bg-[#111]" />

      </div>

    </div>
  );
};

export default AnalyticsSkeleton;