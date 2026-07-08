import React from "react";
import { useAuth } from "../../context/AuthContext";
import { CalendarDays, ShieldCheck, User, Sparkles } from "lucide-react";

const DashboardHeader = () => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const displayName =
    (user?.name || "User")
      .charAt(0)
      .toUpperCase() +
    (user?.name || "User").slice(1);

  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl sm:p-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-white/[0.02]" />
      <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <span className="inline-flex rounded-full border border-slate-700 bg-slate-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Dashboard
          </span>

          <h1 className="mt-5 text-3xl font-bold text-white sm:text-5xl">
            Welcome Back,{" "}
            <span className="inline-flex items-center gap-3 text-slate-300">
              {displayName}
              <Sparkles size={28} className="text-yellow-500" />
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            Track your learning progress, manage your roadmaps, bookmarks,
            notifications, and everything related to your account from one place.
          </p>
        </div>

        {/* Right */}
        <div className="grid gap-4 rounded-2xl border border-slate-800 bg-black/40 p-5 backdrop-blur-xl sm:min-w-[300px]">
          <div className="flex items-center gap-3">
            <CalendarDays size={18} className="text-slate-300" />

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Today
              </p>
              <p className="text-sm text-white">{today}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User size={18} className="text-slate-300" />

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Email
              </p>
              <p className="text-sm text-white truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-slate-300" />

            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Role
              </p>

              <span className="inline-flex rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHeader;