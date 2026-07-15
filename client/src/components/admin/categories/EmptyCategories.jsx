import React from "react";
import { FolderTree, Plus } from "lucide-react";

const EmptyCategories = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#111] py-20 text-center">

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400/10">

        <FolderTree
          size={46}
          className="text-yellow-400"
        />

      </div>

      <h2 className="mt-8 text-3xl font-bold">
        No Categories Found
      </h2>

      <p className="mt-3 max-w-md text-gray-400">
        Create your first category to organize roadmaps
        and help users discover learning paths faster.
      </p>

      <button
        className="mt-8 flex items-center gap-2 rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
      >
        <Plus size={18} />
        Add Category
      </button>

    </div>
  );
};

export default EmptyCategories;