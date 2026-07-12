import React from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({
  page,
  totalPages,
  setPage,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

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
      transition={{
        duration: 0.35,
      }}
      className="mt-14 mb-8 flex flex-wrap items-center justify-center gap-3"
    >
      {/* Previous */}

      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-yellow-400 hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
        Prev
      </button>

      {/* Numbers */}

      {pages.map((number) => (
        <button
          key={number}
          onClick={() => setPage(number)}
          className={`h-11 w-11 rounded-xl text-sm font-semibold transition-all duration-300 ${
            page === number
              ? "bg-yellow-400 text-black"
              : "border border-white/10 bg-white/5 text-gray-300 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Next */}

      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-yellow-400 hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </motion.div>
  );
};

export default Pagination;