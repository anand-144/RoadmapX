import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { FolderTree } from "lucide-react";

const COLORS = [
  "#facc15",
  "#fbbf24",
  "#f59e0b",
  "#d97706",
  "#ca8a04",
  "#eab308",
];

const CategoryDistributionChart = ({ data = [] }) => {
  const totalRoadmaps = data.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111] via-[#151515] to-[#1b1b1b] p-8 shadow-xl">

      {/* Header */}

      <div className="mb-8 flex items-start justify-between">

        <div>

          <p className="text-sm uppercase tracking-widest text-gray-500">
            Categories
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {data.length}
          </h2>

          <p className="mt-2 text-gray-400">
            {totalRoadmaps} Total Roadmaps
          </p>

        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10">

          <FolderTree
            size={30}
            className="text-yellow-400"
          />

        </div>

      </div>

      {/* Chart */}

      <div className="h-[360px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 30,
              bottom: 10,
            }}
          >

            <CartesianGrid
              stroke="#242424"
              horizontal={false}
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
              }}
            />

            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#d1d5db",
                fontSize: 13,
              }}
              width={120}
            />

            <Tooltip
              cursor={{
                fill: "#202020",
              }}
              contentStyle={{
                background: "#181818",
                border: "1px solid #333",
                borderRadius: "16px",
                color: "#fff",
              }}
              formatter={(value) => [
                `${value} Roadmaps`,
                "Count",
              ]}
            />

            <Bar
              dataKey="count"
              radius={[0, 12, 12, 0]}
              animationDuration={1000}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default CategoryDistributionChart;