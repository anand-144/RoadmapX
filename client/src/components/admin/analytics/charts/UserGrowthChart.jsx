import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { TrendingUp, Users } from "lucide-react";

const UserGrowthChart = ({ data = [] }) => {
  const totalUsers =
    data.length > 0
      ? data[data.length - 1].users
      : 0;

  const previousUsers =
    data.length > 1
      ? data[data.length - 2].users
      : 0;

  const growth =
    previousUsers > 0
      ? (
          ((totalUsers - previousUsers) /
            previousUsers) *
          100
        ).toFixed(1)
      : 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111] via-[#151515] to-[#1b1b1b] p-8 shadow-xl">

      {/* Header */}

      <div className="mb-8 flex items-start justify-between">

        <div>

          <p className="text-sm uppercase tracking-widest text-gray-500">
            User Growth
          </p>

          <h2 className="mt-3 text-5xl font-bold">
            {totalUsers.toLocaleString()}
          </h2>

          <p className="mt-2 text-gray-400">
            Registered Users
          </p>

        </div>

        <div className="text-right">

          <div className="flex items-center justify-end gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-400">

            <TrendingUp size={16} />

            <span className="text-sm font-semibold">
              +{growth}%
            </span>

          </div>

          <div className="mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10">

            <Users
              size={30}
              className="text-yellow-400"
            />

          </div>

        </div>

      </div>

      {/* Chart */}

      <div className="h-[340px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 15,
              left: -20,
              bottom: 0,
            }}
          >

            <defs>

              <linearGradient
                id="userGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#facc15"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#facc15"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#242424"
              strokeDasharray="5 5"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                stroke: "#facc15",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                background: "#181818",
                border: "1px solid #333",
                borderRadius: "16px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#facc15",
                fontWeight: "600",
              }}
            />

            <Area
              type="monotone"
              dataKey="users"
              stroke="#facc15"
              strokeWidth={4}
              fill="url(#userGradient)"
              animationDuration={1200}
              activeDot={{
                r: 7,
                stroke: "#facc15",
                strokeWidth: 3,
                fill: "#111",
              }}
              dot={{
                r: 3,
                fill: "#facc15",
                strokeWidth: 0,
              }}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default UserGrowthChart;