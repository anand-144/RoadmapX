import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const EmptyUsers = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-gradient-to-br from-[#111] to-[#181818] px-6 py-20 text-center"
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400/10">
        <Users
          size={46}
          className="text-yellow-400"
        />
      </div>

      <h2 className="mt-8 text-3xl font-bold">
        No Users Found
      </h2>

      <p className="mt-4 max-w-lg leading-7 text-gray-400">
        No users match your current search or filter.
        Try changing your filters or search keyword.
      </p>
    </motion.div>
  );
};

export default EmptyUsers;