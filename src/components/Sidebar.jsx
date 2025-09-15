import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { TfiBarChartAlt } from "react-icons/tfi";
import { CiSettings } from "react-icons/ci";
import { LuTrendingUp } from "react-icons/lu";
import { GrMenu } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const menuItems = [
    {
      id: "dashboard",
      icon: MdOutlineSpaceDashboard,
      label: "Dashboard",
      path: "/",
      highlighted: false,
    },
    {
      id: "calendar",
      icon: GoCalendar,
      label: "Calendar",
      path: "/calendar",
      highlighted: false,
    },
    {
      id: "statistics",
      icon: TfiBarChartAlt,
      label: "Statistics",
      path: "/statistics",
      highlighted: true,
    },
    {
      id: "settings",
      icon: CiSettings,
      label: "Settings",
      path: "/settings",
      highlighted: false,
    },
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-gray-700"
      >
        {isOpen ? (
          <RxCross2 className="w-6 h-6" />
        ) : (
          <GrMenu className="w-6 h-6" />
        )}
      </button>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-white bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={`h-screen w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <LuTrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Habit Tracker</h1>
            <p className="text-xs text-gray-500">Build better habits</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
              Main Menu
            </h3>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              const isHighlighted = item.highlighted;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => window.innerWidth < 768 && toggleSidebar()}
                  className={`group relative flex items-center gap-3 px-4 py-3 mb-2 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isActive
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {isHighlighted && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                  {isActive && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-l-lg"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="px-6 py-3 border-t border-gray-100">
          <div className="text-center text-xs text-gray-400">
            <p>© 2025 HabitTracker</p>
            <p className="mt-1">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
