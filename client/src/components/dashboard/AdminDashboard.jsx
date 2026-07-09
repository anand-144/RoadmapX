import React from "react";

import AdminStats from "./admin/AdminStats";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <AdminStats />
    </div>
  );
};

export default AdminDashboard;