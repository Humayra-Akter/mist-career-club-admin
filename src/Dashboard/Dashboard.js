import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ban1 from "../images/add.png";
import ban2 from "../images/add-user.png";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`w-64 bg-white shadow-xl p-4 fixed h-full transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 ease-in-out"
          >
            <X />
          </button>
        </div>
        <ul className="space-y-4">
          {[
            { path: "/dashboard", label: "Dashboard", icon: ban1 },
            {
              path: "/dashboard/eventCreate",
              label: "Create Event",
              icon: ban2,
            },
            { path: "/dashboard/eventList", label: "Event List", icon: ban2 },
            { path: "/dashboard/addDirector", label: "Add Panel", icon: ban2 },
            {
              path: "/dashboard/directorList",
              label: "View Panel",
              icon: ban2,
            },
          ].map((item, index) => (
            <li key={index}>
              <Link
                className={`flex items-center gap-4 p-3 rounded-lg font-medium transition-all duration-300 ease-in-out ${
                  location.pathname === item.path
                    ? "bg-gray-300"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                to={item.path}
              >
                <img className="w-6" src={item.icon} alt="" />
                {item.label}
              </Link>
              {index !== 4 && <hr className="border-gray-300" />}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 w-full flex justify-between items-center bg-white shadow-lg fixed top-0 left-0 right-0 z-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 ease-in-out"
        >
          <Menu />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>

      {/* Content */}
      <div className="md:ml-64 w-full p-6 pt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
