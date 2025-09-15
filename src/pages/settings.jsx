import React from "react";
import { CiSettings } from "react-icons/ci";

function SettingsView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your preferences</p>
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
