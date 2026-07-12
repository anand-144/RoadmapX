import React from "react";

import RecentUsers from "../components/dashboard/admin/RecentUsers";
import Analytics from "../components/dashboard/admin/Analytics";
import CategoryManagement from "../components/dashboard/admin/CategoryManagement";
import RoadmapManagement from "../components/dashboard/admin/RoadmapManagement";

const Admin = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-8 sm:px-6 lg:px-8 lg:pt-28">
      <div className="space-y-8">
        {/* Top */}
        <RecentUsers />


        {/* Middle */}
        <div className="grid grid-cols-1 gap-8 items-start">
          <CategoryManagement />
        </div>
        {/* Bottom */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 items-start">
          <Analytics />
          <RoadmapManagement />
        </div>
      </div>
    </div>
  );
};

export default Admin;