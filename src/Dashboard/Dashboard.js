import React from "react";
import { Link, Outlet } from "react-router-dom";
import ban1 from "../images/add.png";
import ban2 from "../images/add-user.png";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/6 p-4 bg-slate-100 min-h-screen">
        <ul className="menu">
          <li>
            <Link
              className="text-black text-base font-bold hover:text-slate-400"
              to="/dashboard"
            >
              <span className="flex gap-4">
                <img
                  className="w-8 bg-white rounded-full p-1"
                  src={ban1}
                  alt=""
                />
                Dashboard
              </span>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              className="text-black mt-3 text-base font-bold hover:text-slate-400"
              to="/dashboard/eventCreate"
            >
              <span className="flex gap-4">
                <img
                  className="w-8 bg-white rounded-full p-1"
                  src={ban2}
                  alt=""
                />
                Create Event
              </span>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              className="text-black mt-3 text-base font-bold hover:text-slate-400"
              to="/dashboard/eventList"
            >
              <span className="flex gap-4">
                <img
                  className="w-8 bg-white rounded-full p-1"
                  src={ban2}
                  alt=""
                />
                Event List
              </span>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              className="text-black mt-3 text-base font-bold hover:text-slate-400"
              to="/dashboard/addDirector"
            >
              <span className="flex gap-4">
                <img
                  className="w-8 bg-white rounded-full p-1"
                  src={ban2}
                  alt=""
                />
                Add Director
              </span>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              className="text-black mt-3 text-base font-bold hover:text-slate-400"
              to="/dashboard/directorList"
            >
              <span className="flex gap-4">
                <img
                  className="w-8 bg-white rounded-full p-1"
                  src={ban2}
                  alt=""
                />
                Director List
              </span>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              className="text-black mt-3 text-base font-bold hover:text-slate-400"
              to="/dashboard/addExecutive"
            >
              <span className="flex gap-4">
                <img
                  className="w-8 bg-white rounded-full p-1"
                  src={ban2}
                  alt=""
                />
                Add Executive
              </span>
            </Link>
          </li>
          <hr />{" "}
          <li>
            <Link
              className="text-black mt-3 text-base font-bold hover:text-slate-400"
              to="/dashboard/executiveList"
            >
              <span className="flex gap-4">
                <img
                  className="w-8 bg-white rounded-full p-1"
                  src={ban2}
                  alt=""
                />
                Executive List
              </span>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              className="text-black mt-3 text-base font-bold hover:text-slate-400"
              to="/dashboard/addAssociative"
            >
              <span className="flex gap-4">
                <img
                  className="w-8 bg-white rounded-full p-1"
                  src={ban2}
                  alt=""
                />
                Add Associative
              </span>
            </Link>
          </li>
          <hr />
          <li>
            <Link
              className="text-black mt-3 text-base font-bold hover:text-slate-400"
              to="/dashboard/associativeList"
            >
              <span className="flex gap-4">
                <img
                  className="w-8 bg-white rounded-full p-1"
                  src={ban2}
                  alt=""
                />
                Associative List
              </span>
            </Link>
          </li>
          <hr />
        </ul>
      </div>

      {/* Content */}
      <div className="w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
