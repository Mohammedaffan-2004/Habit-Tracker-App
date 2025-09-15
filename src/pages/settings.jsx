import React from "react";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";

function SettingsView() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2  hover:text-black rounded-lg transition-colors cursor-pointer"
            >
              <ImArrowLeft2 className="w-5 h-5" />
            </button>
            Settings
          </h1>
          <p className="opacity-90 mt-1 text-sm sm:text-base ml-10">
            Manage your preferences
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <CiSettings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Settings Coming Soon
        </h3>
        <p className="text-gray-600">
          working on adding more customization options!
        </p>
      </div>
    </div>
  );
}

export default SettingsView;
