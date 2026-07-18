import React from "react";
import { BarChart3 } from "lucide-react";

const EmptyAnalytics = () => {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#111] text-center">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400/10">
        <BarChart3
          size={38}
          className="text-yellow-400"
        />
      </div>

      <h2 className="mt-8 text-3xl font-bold">
        No Analytics Available
      </h2>

      <p className="mt-3 max-w-md text-gray-400">
        Analytics will appear here once users interact with
        your platform and roadmaps.
      </p>

    </div>
  );
};

export default EmptyAnalytics;