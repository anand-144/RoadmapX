import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  Heart,
  FolderTree,
} from "lucide-react";

const RelatedRoadmaps = ({ roadmaps }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111] p-6">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Related Roadmaps
        </h2>

        <FolderTree
          className="text-yellow-400"
          size={22}
        />

      </div>

      {roadmaps.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center text-gray-500">
          No related roadmaps found.
        </div>
      ) : (
        <div className="space-y-4">

          {roadmaps.map((roadmap) => (

            <Link
              key={roadmap._id}
              to={`/roadmap/${roadmap.slug}`}
              className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-yellow-400"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500/10">

                  {roadmap.icon ? (
                    <img
                      src={`https://cdn.simpleicons.org/${roadmap.icon}/facc15`}
                      alt={roadmap.title}
                      className="h-8 w-8"
                    />
                  ) : (
                    <FolderTree
                      className="text-yellow-400"
                      size={24}
                    />
                  )}

                </div>

                <div className="flex-1">

                  <h3 className="line-clamp-1 font-semibold">
                    {roadmap.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {roadmap.category?.name}
                  </p>

                </div>

              </div>

              <div className="mt-5 flex items-center justify-between">

                <div className="flex gap-5 text-sm text-gray-400">

                  <div className="flex items-center gap-1">

                    <Heart size={15} />

                    {roadmap.likes?.length || 0}

                  </div>

                  <div className="flex items-center gap-1">

                    <Eye size={15} />

                    {roadmap.views || 0}

                  </div>

                </div>

                <ArrowRight
                  size={18}
                  className="text-yellow-400"
                />

              </div>

            </Link>

          ))}

        </div>
      )}

    </div>
  );
};

export default RelatedRoadmaps;