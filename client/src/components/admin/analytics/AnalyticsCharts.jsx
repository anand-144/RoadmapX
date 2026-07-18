import React from "react";

import UserGrowthChart from "./charts/UserGrowthChart";
import RoadmapStatusChart from "./charts/RoadmapStatusChart";
import CategoryDistributionChart from "./charts/CategoryDistributionChart";
import TopRoadmaps from "./charts/TopRoadmaps";

const AnalyticsCharts = ({ analytics }) => {
  return (
    <div className="space-y-6">

      {/* Row 1 */}

      <div className="grid gap-6 xl:grid-cols-2">

        <UserGrowthChart
          data={analytics.monthlyUsers || []}
        />

        <RoadmapStatusChart
          published={analytics.publishedRoadmaps}
          draft={analytics.draftRoadmaps}
        />

      </div>

      {/* Row 2 */}

      <div className="grid gap-6 xl:grid-cols-2">

        <CategoryDistributionChart
          data={analytics.categoryDistribution || []}
        />

        <TopRoadmaps
          data={analytics.topRoadmaps || []}
        />

      </div>

    </div>
  );
};

export default AnalyticsCharts;