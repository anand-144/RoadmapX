import React from "react";

import AdminStats from "./admin/AdminStats";
import AdminMyRoadmaps from "./admin/AdminMyRoadmaps";
import QuickActions from "./admin/QuickActions";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">

      <AdminStats />

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <AdminMyRoadmaps />
        </div>

        <div>
          <QuickActions />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;