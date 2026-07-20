import React from "react";
import { Handle, Position } from "reactflow";
import {
  BookOpen,
  Link2,
  ChevronRight,
} from "lucide-react";

const RoadmapNode = ({ data }) => {
  const { topic, onClick } = data;

  return (
    <div className="group relative w-[300px]">

      {/* Incoming Handle */}

      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !border-2 !border-yellow-400 !bg-[#111]"
      />

      {/* Card */}

      <button
        onClick={onClick}
        className="w-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#1b1b1b] via-[#141414] to-[#0d0d0d] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-[0_0_35px_rgba(250,204,21,0.18)]"
      >

        {/* Step */}

        <div className="mb-5 flex items-center justify-between">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-lg font-bold text-black">

            {topic.order}

          </div>

          <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-400">

            Step {topic.order}

          </span>

        </div>

        {/* Title */}

        <h3 className="text-xl font-bold text-white transition group-hover:text-yellow-400">

          {topic.title}

        </h3>

        {/* Description */}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">

          {topic.description}

        </p>

        {/* Bottom */}

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">

          <div className="flex items-center gap-5">

            <div className="flex items-center gap-2 text-gray-400">

              <BookOpen
                size={16}
                className="text-yellow-400"
              />

              <span className="text-sm">

                Topic

              </span>

            </div>

            <div className="flex items-center gap-2 text-gray-400">

              <Link2
                size={16}
                className="text-yellow-400"
              />

              <span className="text-sm">

                {topic.resources?.length || 0}

              </span>

            </div>

          </div>

          <ChevronRight
            className="text-yellow-400 transition group-hover:translate-x-1"
            size={20}
          />

        </div>

      </button>

      {/* Outgoing Handle */}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !border-2 !border-yellow-400 !bg-[#111]"
      />

    </div>
  );
};

export default RoadmapNode;