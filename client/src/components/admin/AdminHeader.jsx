import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const AdminHeader = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#111] to-[#181818] p-8"
    >
      <div className="flex items-center gap-5">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/10">
          <ShieldCheck
            size={34}
            className="text-yellow-400"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            Admin Panel
          </h1>

          <p className="mt-2 text-gray-400">
            Manage users, categories, roadmaps and monitor the entire platform.
          </p>
        </div>

      </div>
    </motion.div>
  );
};

export default AdminHeader;