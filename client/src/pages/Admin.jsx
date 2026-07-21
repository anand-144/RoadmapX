import { useState } from "react";

import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";


import Overview from "../components/admin/overview/Overview"

import CategoryManagement from "../components/admin/categories/CategoryManagement";
import RoadmapManagement from "../components/admin/roadmaps/RoadmapManagement";
import UserManagement from "../components/admin/users/UserManagement";
import Analytics from "../components/admin/analytics/Analytics";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Admin = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "overview";

  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;

      case "categories":
        return <CategoryManagement />;

      case "roadmaps":
        return <RoadmapManagement />;

      case "users":
        return <UserManagement />;

      case "analytics":
        return <Analytics />;

      default:
        return <Overview />;
    }
  };

  return (

    <>
      <Helmet>
        <title>Admin Dashboard | RoadmapX</title>

        <meta
          name="description"
          content="Manage users, roadmaps, categories, and platform content from the RoadmapX admin dashboard."
        />

        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-black pt-24 text-white">

        <div className="mx-auto max-w-[1800px] px-6">

          <AdminHeader />

          <div className="mt-8 grid gap-8 xl:grid-cols-12">

            <div className="xl:col-span-3">
              <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            <div className="xl:col-span-9">
              {renderContent()}
            </div>

          </div>

        </div>

      </div>
    </>

  );
};

export default Admin;