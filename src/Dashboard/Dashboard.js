// import React, { useState } from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   CalendarPlus,
//   Users,
//   PanelLeft,
//   ChevronRight,
// } from "lucide-react";

// const Dashboard = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* Sidebar */}
//       <div
//         className={`bg-white shadow-xl p-4 fixed h-full transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0 w-16" : "-translate-x-64 w-64"
//         } md:translate-x-0`}
//       >
//         <div className="flex justify-between items-center mb-6">
//           {/* Sidebar Toggle Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 ease-in-out"
//           >
//             {isOpen ? <ChevronRight size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Sidebar Menu */}
//         <ul className="space-y-4">
//           {[
//             {
//               path: "/dashboard",
//               label: "Dashboard",
//               icon: <LayoutDashboard size={24} />,
//             },
//             {
//               path: "/dashboard/eventCreate",
//               label: "Create Event",
//               icon: <CalendarPlus size={24} />,
//             },
//             {
//               path: "/dashboard/eventList",
//               label: "Event List",
//               icon: <Users size={24} />,
//             },
//             {
//               path: "/dashboard/addPanel",
//               label: "Add Panel",
//               icon: <PanelLeft size={24} />,
//             },
//             {
//               path: "/dashboard/panelList",
//               label: "Panel List",
//               icon: <PanelLeft size={24} />,
//             },
//           ].map((item, index) => (
//             <li key={index}>
//               <Link
//                 className={`flex items-center gap-4 p-3 rounded-lg font-medium transition-all duration-300 ease-in-out ${
//                   location.pathname === item.path
//                     ? "bg-gray-300"
//                     : "text-gray-700 hover:bg-gray-200"
//                 }`}
//                 to={item?.path}
//               >
//                 {item.icon}
//                 {!isOpen && <span>{item.label}</span>}
//               </Link>
//               {index !== 4 && <hr className="border-gray-300" />}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Mobile Sidebar Toggle */}
//       <div className="md:hidden p-4 w-full flex justify-between items-center bg-white shadow-lg fixed top-0 left-0 right-0 z-10">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 ease-in-out"
//         >
//           <Menu />
//         </button>
//         <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
//       </div>

//       {/* Content */}
//       <div className="lg:ml-64 w-full p-6 pt-10">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  CalendarPlus,
  Users,
  PanelLeft,
  ChevronLeft,
} from "lucide-react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-slate-800 bg-fixed text-white shadow-xl p-4 transition-transform duration-300 ease-in-out max-h-full  ${
          isOpen ? "w-64" : "w-16"
        } md:relative md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg  text-white hover:bg-gray-700 transition-all duration-300"
          >
            {isOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="space-y-4">
          {[
            {
              path: "/dashboard",
              label: "Dashboard",
              icon: <LayoutDashboard size={24} />,
            },
            {
              path: "/dashboard/eventCreate",
              label: "Create Event",
              icon: <CalendarPlus size={24} />,
            },
            {
              path: "/dashboard/eventList",
              label: "Event List",
              icon: <Users size={24} />,
            },
            {
              path: "/dashboard/addPanel",
              label: "Add Panel",
              icon: <PanelLeft size={24} />,
            },
            {
              path: "/dashboard/panelList",
              label: "Panel List",
              icon: <PanelLeft size={24} />,
            },
          ].map((item, index) => (
            <li key={index}>
              <Link
                className={`flex items-center gap-4 p-3 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-gray-300 text-black"
                    : "text-white hover:bg-gray-200 hover:text-black"
                }`}
                to={item.path}
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </Link>
              {index !== 4 && <hr className="border-gray-300" />}
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${isOpen ? "" : ""}`}
      >
        {/* Show dashboard content only on /dashboard */}
        {location.pathname === "/dashboard" ? (
          <div className="bg-white text-white shadow-md rounded-lg p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to the Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your events, panels, and more!
            </p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
