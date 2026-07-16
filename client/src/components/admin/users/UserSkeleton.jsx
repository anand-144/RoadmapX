import React from "react";

const UserSkeleton = () => {
  return (
    <div className="grid gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl border border-white/10 bg-[#111] p-6"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

            <div className="flex gap-5">

              <div className="h-16 w-16 rounded-2xl bg-white/10" />

              <div className="space-y-3">

                <div className="h-6 w-52 rounded bg-white/10" />

                <div className="h-4 w-32 rounded bg-white/10" />

                <div className="mt-5 flex gap-4">
                  <div className="h-4 w-48 rounded bg-white/10" />
                  <div className="h-4 w-28 rounded bg-white/10" />
                </div>

              </div>

            </div>

            <div className="h-8 w-24 rounded-full bg-white/10" />

          </div>

          <div className="mt-8 flex flex-wrap gap-3">

            <div className="h-11 w-28 rounded-xl bg-white/10" />

            <div className="h-11 w-36 rounded-xl bg-white/10" />

            <div className="ml-auto h-11 w-28 rounded-xl bg-white/10" />

          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSkeleton;