import React from "react";

import AdminStats from "./admin/AdminStats";
import Analytics from "./admin/Analytics";
import UserManagement from "./admin/UserManagement";
import ReportManagement from "./admin/ReportManagement";
import CategoryManagement from "./admin/CategoryManagement";
import NotificationManagement from "./admin/NotificationManagement";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <AdminStats />

      {/* Analytics */}
      <Analytics />

      {/* User & Reports */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <UserManagement />
        <ReportManagement />
      </div>

      {/* Categories & Notifications */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <CategoryManagement />
        <NotificationManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;