import React from "react";

import CategoryManagement from "../components/dashboard/admin/CategoryManagement";
import RoadmapManagement from "../components/dashboard/admin/RoadmapManagement";

const Admin = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8 lg:pt-28">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Admin Panel
        </h1>

        <p className="mt-2 text-gray-400">
          Manage categories and moderate roadmaps across the platform.
        </p>
      </div>

      <div className="space-y-8">

        {/* Categories */}
        <CategoryManagement />

        {/* Roadmaps */}
        <RoadmapManagement />

      </div>

    </div>
  );
};

export default Admin;