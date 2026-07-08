import React from "react";
import { useAuth } from "../context/AuthContext";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import UserDashboard from "../components/dashboard/UserDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DashboardHeader />

        {user?.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <UserDashboard />
        )}
      </div>
    </main>
  );
};

export default Dashboard;