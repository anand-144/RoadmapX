import React from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/10 bg-[#111] p-5 lg:flex-row"
    >
      {/* Left */}

      <p className="text-sm text-gray-400">
        Page{" "}
        <span className="font-semibold text-white">
          {page}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-white">
          {totalPages}
        </span>
      </p>

      {/* Right */}

      <div className="flex items-center gap-2">

        {/* Previous */}

        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:border-yellow-400 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        {/* Page Numbers */}

        {getPages().map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`h-11 w-11 rounded-xl font-semibold transition ${
              page === number
                ? "bg-yellow-400 text-black"
                : "border border-white/10 bg-white/5 hover:border-yellow-400 hover:text-yellow-400"
            }`}
          >
            {number}
          </button>
        ))}

        {/* Next */}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 transition hover:border-yellow-400 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight size={18} />
        </button>

      </div>
    </motion.div>
  );
};

export default Pagination;