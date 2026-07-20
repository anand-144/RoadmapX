import React from "react";
import {
  Heart,
  Bookmark,
  Share2,
} from "lucide-react";

const RoadmapActions = ({
  roadmap,
  onLike,
  onBookmark,
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111] p-6">

      <h2 className="mb-6 text-2xl font-bold">
        Interact
      </h2>

      <div className="space-y-4">

        <button
          onClick={onLike}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500/10 px-5 py-4 text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <Heart size={20} />

          Like ({roadmap.likes?.length || 0})
        </button>

        <button
          onClick={onBookmark}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-500/10 px-5 py-4 text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
        >
          <Bookmark size={20} />

          Save ({roadmap.saves?.length || 0})
        </button>

        <button
          onClick={() =>
            navigator.share
              ? navigator.share({
                  title: roadmap.title,
                  text: roadmap.description,
                  url: window.location.href,
                })
              : navigator.clipboard.writeText(
                  window.location.href
                )
          }
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-yellow-400"
        >
          <Share2 size={20} />

          Share Roadmap
        </button>

      </div>

    </div>
  );
};

export default RoadmapActions;