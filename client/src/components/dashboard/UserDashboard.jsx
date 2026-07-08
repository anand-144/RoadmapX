import React from "react";

import UserStats from "./user/UserStats";
import MyRoadmaps from "./user/MyRoadmaps";
import MyProgress from "./user/MyProgress";
import MyNotifications from "./user/MyNotifications";
import MyFollowers from "./user/MyFollowers";
import MyBookmarks from "./user/MyBookmarks";

const UserDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <UserStats />

      {/* Roadmaps + Progress */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MyRoadmaps />
        </div>

        <div>
          <MyProgress />
        </div>
      </div>

      {/* Notifications + Followers */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <MyNotifications />
        <MyBookmarks />
      </div>
        <MyFollowers />
    </div>
  );
};

export default UserDashboard;