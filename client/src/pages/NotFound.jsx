import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white">

      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-yellow-500/10 blur-[160px]" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-yellow-500/10 blur-[160px]" />

      {/* Grid */}

      <div className="absolute inset-0 opacity-[0.04]">

        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right,#fff 1px,transparent 1px),
              linear-gradient(to bottom,#fff 1px,transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />

      </div>

      {/* Floating Nodes */}

      <motion.div
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute left-[15%] top-[20%] hidden rounded-2xl border border-yellow-500/20 bg-[#111] px-6 py-4 lg:block"
      >
        HTML
      </motion.div>

      <motion.div
        animate={{
          y: [10, -10, 10],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute right-[15%] top-[28%] hidden rounded-2xl border border-yellow-500/20 bg-[#111] px-6 py-4 lg:block"
      >
        React
      </motion.div>

      <motion.div
        animate={{
          y: [-12, 12, -12],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
        }}
        className="absolute bottom-[18%] left-[20%] hidden rounded-2xl border border-yellow-500/20 bg-[#111] px-6 py-4 lg:block"
      >
        Node.js
      </motion.div>

      {/* Main */}

      <div className="relative z-10 mx-auto max-w-3xl text-center">

        <motion.h1
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-[120px] font-black leading-none text-transparent md:text-[180px]"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="mt-6 text-3xl font-bold md:text-5xl"
        >
          Roadmap Not Found
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
          }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400"
        >
          Looks like you've wandered off the learning path.
          The roadmap you're looking for doesn't exist or may
          have been moved.
        </motion.p>

        {/* Buttons */}

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
            delay: 0.5,
          }}
          className="mt-12 flex flex-col justify-center gap-5 sm:flex-row"
        >

          <Link
            to="/"
            className="flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-8 py-4 font-semibold text-black transition hover:bg-yellow-300"
          >
            <Home size={20} />
            Back Home
          </Link>

          <Link
            to="/explore"
            className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold transition hover:border-yellow-400"
          >
            <Search size={20} />
            Explore Roadmaps
          </Link>

        </motion.div>

        {/* Bottom Note */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          className="mt-14 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111] px-6 py-3 text-sm text-gray-400"
        >
          <ArrowLeft size={16} />

          Error 404 • Keep learning, just take another route.

        </motion.div>

      </div>

    </div>
  );
};

export default NotFound;