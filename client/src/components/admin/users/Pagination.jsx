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
  if (!totalPages || totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (page <= 3) {
      end = Math.min(5, totalPages);
    }

    if (page >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 flex flex-col items-center justify-between gap-5 rounded-3xl border border-white/10 bg-[#111] p-5 lg:flex-row"
    >
      {/* Info */}

      <div className="text-center text-sm text-gray-400 lg:text-left">
        Page{" "}
        <span className="font-semibold text-white">
          {page}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-white">
          {totalPages}
        </span>
      </div>

      {/* Controls */}

      <div className="flex flex-wrap items-center justify-center gap-2">

        {/* Previous */}

        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-yellow-400 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:block">
            Previous
          </span>
        </button>

        {/* First Page */}

        {getPages()[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 transition hover:border-yellow-400 hover:text-yellow-400"
            >
              1
            </button>

            {getPages()[0] > 2 && (
              <span className="px-2 text-gray-500">
                ...
              </span>
            )}
          </>
        )}

        {/* Pages */}

        {getPages().map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${
              page === number
                ? "bg-yellow-400 text-black"
                : "border border-white/10 bg-white/5 hover:border-yellow-400 hover:text-yellow-400"
            }`}
          >
            {number}
          </button>
        ))}

        {/* Last Page */}

        {getPages()[getPages().length - 1] <
          totalPages && (
          <>
            {getPages()[getPages().length - 1] <
              totalPages - 1 && (
              <span className="px-2 text-gray-500">
                ...
              </span>
            )}

            <button
              onClick={() =>
                onPageChange(totalPages)
              }
              className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 transition hover:border-yellow-400 hover:text-yellow-400"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next */}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-yellow-400 hover:text-yellow-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:block">
            Next
          </span>
          <ChevronRight size={16} />
        </button>

      </div>
    </motion.div>
  );
};

export default Pagination;