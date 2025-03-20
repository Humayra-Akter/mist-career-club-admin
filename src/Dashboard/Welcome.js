import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  CalendarPlus,
  Users,
  PanelLeft,
  ChevronRight,
} from "lucide-react";

const Welcome = () => {
  return (
    <div className="p-16">
      {/* Welcome Message */}
      <h1 className="text-4xl text-center font-bold text-white">
        Welcome to Admin Panel
      </h1>

      <div className="flex items-center justify-center my-10">
        <div className="p-3 bg-slate-800 text-white rounded-md border border-slate-500">
          <Link to="/dashboard">Go to Dashboard</Link>
        </div>
      </div>

      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
          <div className="p-3 bg-blue-500 text-white rounded-full">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Total Events</h2>
            {/* <p className="text-gray-600">24 Active Events</p> */}
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
          <div className="p-3 bg-green-500 text-white rounded-full">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Total Users</h2>
            {/* <p className="text-gray-600">150 Members</p> */}
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
          <div className="p-3 bg-red-500 text-white rounded-full">
            <CalendarPlus size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Pending Approvals</h2>
            {/* <p className="text-gray-600">3 New Requests</p> */}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      {/* <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
        <ul className="mt-4 space-y-3">
          <li className="p-3 bg-gray-100 rounded-md">
            🎉 New event "Tech Fest 2024" was added.
          </li>
          <li className="p-3 bg-gray-100 rounded-md">
            👥 5 new members joined.
          </li>
          <li className="p-3 bg-gray-100 rounded-md">
            ✅ 2 events were approved.
          </li>
        </ul>
      </div> */}

      {/* Dynamic Page Content */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Welcome;
