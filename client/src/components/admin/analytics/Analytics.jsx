import React, { useEffect, useState } from "react";
import axios from "axios";

import AnalyticsStats from "./AnalyticsStats";
import AnalyticsCharts from "./AnalyticsCharts";
import AnalyticsSkeleton from "./AnalyticsSkeleton";
import EmptyAnalytics from "./EmptyAnalytics";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
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

      setAnalytics(data.analytics);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  if (!analytics) {
    return <EmptyAnalytics />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-4xl font-bold">
            Platform Analytics
          </h2>

          <p className="mt-2 text-gray-400">
            Monitor platform growth, engagement and roadmap performance.
          </p>
        </div>

        <div className="rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black">
          Live Statistics
        </div>
      </div>

      {/* Stats */}

      <AnalyticsStats
        stats={analytics}
      />

      {/* Charts */}

      <AnalyticsCharts
        analytics={analytics}
      />
    </div>
  );
};

export default Analytics;
