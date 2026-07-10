import React, { useEffect, useState } from "react";
import axios from "axios";
import { RefreshCw } from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#ffffff", "#475569"];

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalBookmarks: 0,
    publishedRoadmaps: 0,
    draftRoadmaps: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/analytics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const totalRoadmaps =
    analytics.publishedRoadmaps +
    analytics.draftRoadmaps;

  const publishedPercentage =
    totalRoadmaps === 0
      ? 0
      : Math.round(
          (analytics.publishedRoadmaps /
            totalRoadmaps) *
            100
        );

  const statCards = [
    {
      title: "Views",
      value: analytics.totalViews,
    },
    {
      title: "Likes",
      value: analytics.totalLikes,
    },
    {
      title: "Bookmarks",
      value: analytics.totalBookmarks,
    },
    {
      title: "Publish Rate",
      value: `${publishedPercentage}%`,
    },
  ];

  const roadmapStatus = [
    {
      name: "Published",
      value: analytics.publishedRoadmaps,
    },
    {
      name: "Draft",
      value: analytics.draftRoadmaps,
    },
  ];

  const engagementData = [
    {
      name: "Views",
      value: analytics.totalViews,
    },
    {
      name: "Likes",
      value: analytics.totalLikes,
    },
    {
      name: "Bookmarks",
      value: analytics.totalBookmarks,
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Platform Analytics
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Live platform statistics
          </p>

        </div>

        <button
          onClick={fetchAnalytics}
          className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white transition hover:border-white hover:bg-white hover:text-black"
        >
          <RefreshCw size={18} />
        </button>

      </div>

      {loading ? (

        <div className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl bg-slate-900"
              />
            ))}

          </div>

          <div className="h-72 animate-pulse rounded-3xl bg-slate-900" />

          <div className="h-72 animate-pulse rounded-3xl bg-slate-900" />

        </div>

      ) : (
        <>
          {/* KPI Cards */}

          <div className="grid grid-cols-2 gap-4">
            {statCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-800 bg-black/40 p-5 transition hover:border-slate-700"
              >
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  {card.value}
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  Live platform data
                </p>
              </div>
            ))}
          </div>
                {/* ================= Charts ================= */}

          <div className="mt-6 grid grid-cols-1 gap-6">

            {/* Roadmap Status */}

            <div className="rounded-2xl border border-slate-800 bg-black/40 p-5">

              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Roadmap Status
                </h3>

                <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
                  {publishedPercentage}% Published
                </span>
              </div>

              <ResponsiveContainer
                width="100%"
                height={260}
              >
                <PieChart>
                  <Pie
                    data={roadmapStatus}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={5}
                    animationDuration={800}
                    isAnimationActive
                    label
                  >
                    {roadmapStatus.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>

            </div>

            {/* Engagement */}

            <div className="rounded-2xl border border-slate-800 bg-black/40 p-5">

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Engagement
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Views, Likes & Bookmarks
                </p>
              </div>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart
                  data={engagementData}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    stroke="#94a3b8"
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    cursor={{
                      fill: "#0f172a",
                    }}
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />

                  <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                    fill="#ffffff"
                    maxBarSize={60}
                    animationDuration={900}
                  />
                </BarChart>
              </ResponsiveContainer>

            </div>
                  {/* ================= Summary ================= */}

          <div className="mt-6 rounded-2xl border border-slate-800 bg-black/40 p-5">
            <h3 className="mb-5 text-lg font-semibold text-white">
              Platform Summary
            </h3>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Published
                </p>

                <h4 className="mt-2 text-3xl font-bold text-white">
                  {analytics.publishedRoadmaps}
                </h4>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Draft
                </p>

                <h4 className="mt-2 text-3xl font-bold text-white">
                  {analytics.draftRoadmaps}
                </h4>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Total
                </p>

                <h4 className="mt-2 text-3xl font-bold text-white">
                  {totalRoadmaps}
                </h4>
              </div>
            </div>
          </div>

          {/* ================= Publish Progress ================= */}

          <div className="mt-6 rounded-2xl border border-slate-800 bg-black/40 p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                Publish Progress
              </span>

              <span className="text-sm font-semibold text-slate-300">
                {publishedPercentage}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-white transition-all duration-700"
                style={{
                  width: `${publishedPercentage}%`,
                }}
              />
            </div>

            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>Draft</span>
              <span>Published</span>
            </div>
          </div>

        </div> {/* grid */}

      </>
    )}
  </section>
);

};

export default Analytics;