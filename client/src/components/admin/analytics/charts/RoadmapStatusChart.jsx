import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import {
  BookOpen,
  Globe,
  FileText,
} from "lucide-react";

const COLORS = [
  "#22c55e",
  "#fb923c",
];

const RoadmapStatusChart = ({
  published = 0,
  draft = 0,
}) => {
  const total = published + draft;

  const data = [
    {
      name: "Published",
      value: published,
    },
    {
      name: "Draft",
      value: draft,
    },
  ];

  const publishedPercentage =
    total > 0
      ? ((published / total) * 100).toFixed(1)
      : 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111] via-[#151515] to-[#1b1b1b] p-8 shadow-xl">

      {/* Header */}

      <div className="mb-8 flex items-start justify-between">

        <div>

          <p className="text-sm uppercase tracking-widest text-gray-500">
            Roadmap Status
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {total}
          </h2>

          <p className="mt-2 text-gray-400">
            Total Roadmaps
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10">

          <BookOpen
            size={30}
            className="text-yellow-400"
          />

        </div>

      </div>

      {/* Chart */}

      <div className="relative h-[280px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={75}
              outerRadius={105}
              paddingAngle={5}
              stroke="none"
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#181818",
                border: "1px solid #333",
                borderRadius: "16px",
                color: "#fff",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

        {/* Center */}

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

          <span className="text-5xl font-bold">
            {total}
          </span>

          <span className="mt-1 text-sm text-gray-500">
            Roadmaps
          </span>

        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 space-y-4">

        <div className="flex items-center justify-between rounded-2xl border border-green-500/20 bg-green-500/10 p-4">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-green-500/20 p-3">

              <Globe
                size={20}
                className="text-green-400"
              />

            </div>

            <div>

              <p className="font-semibold">
                Published
              </p>

              <p className="text-sm text-gray-500">
                Live Roadmaps
              </p>

            </div>

          </div>

          <div className="text-right">

            <p className="text-2xl font-bold text-green-400">
              {published}
            </p>

            <p className="text-sm text-gray-500">
              {publishedPercentage}%
            </p>

          </div>

        </div>

        <div className="flex items-center justify-between rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-orange-500/20 p-3">

              <FileText
                size={20}
                className="text-orange-400"
              />

            </div>

            <div>

              <p className="font-semibold">
                Draft
              </p>

              <p className="text-sm text-gray-500">
                Work in Progress
              </p>

            </div>

          </div>

          <div className="text-right">

            <p className="text-2xl font-bold text-orange-400">
              {draft}
            </p>

            <p className="text-sm text-gray-500">
              {(100 - publishedPercentage).toFixed(1)}%
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default RoadmapStatusChart;