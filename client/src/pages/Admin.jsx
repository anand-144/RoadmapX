import React from "react";

import RecentUsers from "../components/dashboard/admin/RecentUsers";
import Analytics from "../components/dashboard/admin/Analytics";
import CategoryManagement from "../components/dashboard/admin/CategoryManagement";
import RoadmapManagement from "../components/dashboard/admin/RoadmapManagement";

const Admin = () => {
  return (
  <div className="mx-auto max-w-7xl space-y-8 pt-26">

      {/* Top */}
      <RecentUsers />

      {/* Middle */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

        <Analytics />

        <RoadmapManagement />

      </div>

      {/* Bottom */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

        <CategoryManagement />

      </div>

    </div>
  );
};

export default Admin;