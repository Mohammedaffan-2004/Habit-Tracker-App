import React, { useState } from "react";
import { MdGppGood } from "react-icons/md";
import { FcSportsMode } from "react-icons/fc";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { IoIosStar } from "react-icons/io";

function AddHabitForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Health",
    color: "#10B981",
  });
  const colors = [
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];
  const categories = [
    { id: "health", name: "Health", icon: <MdGppGood /> },
    { id: "fitness", name: "Fitness", icon: <FcSportsMode /> },
    { id: "study", name: "Study", icon: <FaBookOpen /> },
    { id: "work", name: "Work", icon: <MdOutlineWork /> },
    { id: "personal", name: "Personal", icon: <IoIosStar /> },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onAdd({
        ...formData,
        id: Date.now(),
        completions: {},
      });
      setFormData({
        name: "",
        description: "",
        category: "Health",
        color: "#10B981",
      });
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onCancel} />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4">
        <div
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Create New Habit
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Habit Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g., Morning Meditation"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Brief description (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, category: cat.name }))
                    }
                    className={`p-3 rounded-lg border text-center transition-all ${
                      formData.category === cat.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-lg mb-1">{cat.icon}</div>
                    <div className="text-xs font-medium">{cat.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Color
              </label>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, color }))}
                    className={`w-10 h-10 rounded-full border-4 transition-all ${
                      formData.color === color
                        ? "border-gray-400 scale-110"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Create Habit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddHabitForm;
