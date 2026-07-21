import React from "react";
import {
  Eye,
  Heart,
  Bookmark,
  Trophy,
  BookOpen,
} from "lucide-react";

const TopRoadmaps = ({ data = [] }) => {
  const maxViews =
    data.length > 0
      ? data[0].views
      : 1;

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111] via-[#151515] to-[#1b1b1b] p-8 shadow-xl">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-widest text-gray-500">
            Top Performers
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Top Roadmaps
          </h2>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10">

          <Trophy
            size={30}
            className="text-yellow-400"
          />

        </div>

      </div>

      {/* List */}

      <div className="space-y-5">

        {data.length > 0 ? (
          data.map((roadmap, index) => {
            const progress =
              (roadmap.views / maxViews) * 100;

            return (
              <div
                key={roadmap._id}
                className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-yellow-400/30"
              >

                {/* Top */}

                <div className="flex items-start justify-between">

                  <div className="flex gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10">

                      <BookOpen
                        size={22}
                        className="text-yellow-400"
                      />

                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <span className="rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
                          #{index + 1}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                          {roadmap.category?.name}
                        </span>

                      </div>

                      <h3 className="mt-3 font-semibold">
                        {roadmap.title}
                      </h3>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-bold text-yellow-400">
                      {roadmap.views}
                    </p>

                    <p className="text-xs text-gray-500">
                      Views
                    </p>

                  </div>

                </div>

                {/* Progress */}

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

                {/* Bottom Stats */}

                <div className="mt-5 flex flex-wrap gap-6 text-sm">

                  <div className="flex items-center gap-2 text-gray-400">

                    <Eye size={16} />

                    {roadmap.views}

                  </div>

                  <div className="flex items-center gap-2 text-pink-400">

                    <Heart size={16} />

                    {roadmap.likes?.length || 0}

                  </div>

                  <div className="flex items-center gap-2 text-blue-400">

                    <Bookmark size={16} />

                    {roadmap.saves?.length || 0}

                  </div>

                </div>

              </div>
            );
          })
        ) : (
          <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed border-white/10">

            <div className="text-center">

              <Trophy
                size={42}
                className="mx-auto text-yellow-400"
              />

              <p className="mt-4 text-gray-400">
                No roadmap analytics available.
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default TopRoadmaps;