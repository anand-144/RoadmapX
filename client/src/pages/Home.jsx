import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import HomeGraph from "../components/home/HomeGraph";
import WhySection from "../components/home/WhySection";

const Home = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;

    navigate(`/explore?q=${encodeURIComponent(search.trim())}`);

    setSearch("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-yellow-500/10 blur-[140px]" />
        <div className="absolute right-0 top-20 h-[350px] w-[350px] rounded-full bg-yellow-500/10 blur-[140px]" />
      </div>

      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full" style={{
          backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
          backgroundSize: "70px 70px"
        }} />
      </div>

      <section className="relative z-10">
        <div className="mx-auto flex min-h-[95vh] max-w-7xl flex-col items-center justify-center px-5 text-center sm:px-6">

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-5 py-3">
            <Sparkles size={18} className="text-yellow-400" />
            <span className="text-sm font-medium text-yellow-300">Interactive Learning Platform</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Learn Through
            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Interactive
            </span>
            Roadmaps
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
            Explore structured learning paths, visualize technologies as connected graphs,
            discover curated resources and master every skill one node at a time.
          </motion.p>

          <div className="mt-10 w-full max-w-3xl">
            <div className="flex overflow-hidden rounded-3xl border border-white/10 bg-[#111]">
              <div className="flex items-center px-5">
                <Search size={20} className="text-gray-500" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="h-14 flex-1 bg-transparent outline-none placeholder:text-gray-500 sm:h-16"
                placeholder="Search React, Docker, Node.js..."
              />
              <button
                onClick={handleSearch}
                className="bg-yellow-400 px-5 font-semibold text-black transition hover:bg-yellow-300 sm:px-8"
              >
                Search
              </button>
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link to="/explore" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-8 py-4 font-semibold text-black sm:w-auto">
              Explore <ArrowRight size={18} />
            </Link>
            <Link to="/builder" className="w-full rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold sm:w-auto">
              Build Roadmap
            </Link>
          </div>

          <div className="mt-16 w-full">
            <div className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#111] sm:h-[520px] md:h-[600px] lg:h-[700px] xl:h-[760px]">

              <HomeGraph />

              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#050505] to-transparent" />
            </div>

          </div>

        </div>
            <WhySection />
      </section>
    </div>
  );
};

export default Home;
