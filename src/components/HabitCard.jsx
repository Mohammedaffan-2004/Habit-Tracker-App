import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdGppGood } from "react-icons/md";
import { FcSportsMode } from "react-icons/fc";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import { BsCircle } from "react-icons/bs";
import { LuTrash2 } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { FaCalendarCheck } from "react-icons/fa6";
import { LuTarget } from "react-icons/lu";
import { HabitContext } from "../context/HabitContext";
import EditHabitForm from "./EditHabitForm";
import { BsFillPinAngleFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";

function HabitCard({ habit, onToggle, onDelete }) {
  const navigate = useNavigate();
  const { setHabits } = useContext(HabitContext);
  const today = new Date().toISOString().split("T")[0];
  const isCompleted = habit.completions[today];
  const [showEditForm, setShowEditForm] = useState(false);

  const getCurrentStreak = () => {
    let streak = 0;
    let currentDate = new Date();
    while (true) {
      const dateStr = currentDate.toISOString().split("T")[0];
      if (habit.completions[dateStr]) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else break;
    }
    return streak;
  };

  const getWeeklyProgress = () => {
    let completedDays = 0;
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      if (habit.completions[dateStr]) completedDays++;
    }
    return Math.round((completedDays / 7) * 100);
  };

  const getCompletionRate = () => {
    const totalDays = Object.keys(habit.completions).length;
    const completedDays = Object.values(habit.completions).filter(
      Boolean
    ).length;
    return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
  };

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      days.push({
        date: dateStr,
        completed: habit.completions[dateStr] || false,
        isToday: dateStr === today,
        isFuture: dateStr > today,
      });
    }
    return days;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Health: <MdGppGood />,
      Fitness: <FcSportsMode />,
      Study: <FaBookOpen />,
      Work: <MdOutlineWork />,
      Personal: <IoIosStar />,
    };
    return icons[category] || <BsFillPinAngleFill />;
  };

  const updateHabit = (updatedHabit) => {
    setHabits((prevHabits) =>
      prevHabits.map((h) => (h.id === updatedHabit.id ? updatedHabit : h))
    );
    setShowEditForm(false);
  };

  const handleViewDetails = () => {
    navigate(`/habit/${habit.id}`);
  };

  const streak = getCurrentStreak();
  const weeklyProgress = getWeeklyProgress();
  const completionRate = getCompletionRate();
  const last7Days = getLast7Days();

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="h-1" style={{ backgroundColor: habit.color }}></div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onToggle(habit.id)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-100 text-green-600 shadow-green-100"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                {isCompleted ? (
                  <Tooltip title="Habit">
                    {" "}
                    <FiCheckCircle className="w-8 h-8" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Tick To Complete">
                    {" "}
                    <BsCircle className="w-8 h-8" />
                  </Tooltip>
                )}
              </button>

              <div>
                <h3
                  className="font-bold text-gray-900 text-lg cursor-pointer hover:text-indigo-600 transition-colors"
                  onClick={handleViewDetails}
                >
                  {habit.name}
                </h3>
                {habit.description && (
                  <p className="text-gray-600 text-sm mt-1">
                    {habit.description}
                  </p>
                )}
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-white rounded-full mt-2"
                  style={{ backgroundColor: habit.color }}
                >
                  <span>{getCategoryIcon(habit.category)}</span>
                  {habit.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center gap-1 text-orange-500">
                  <BsFire className="w-4 h-4" />
                  <span className="font-bold text-lg">{streak}</span>
                </div>
                <div className="text-xs text-gray-500">day streak</div>
              </div>
              <button
                onClick={() => setShowEditForm(true)}
                className="p-3 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-all"
              >
                <FaRegEdit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(habit.id)}
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <LuTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FaCalendarCheck className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Last 7 days</span>
            </div>
            <div className="flex justify-between">
              {last7Days.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      day.isToday ? "ring-2 ring-indigo-500 ring-offset-1" : ""
                    } ${
                      day.completed
                        ? "bg-green-500 text-white"
                        : day.isFuture
                        ? "bg-gray-100 text-gray-400"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {new Date(day.date).getDate()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <LuTarget className="w-4 h-4 text-indigo-500" />
                <span className="text-sm text-gray-600">This Week</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {weeklyProgress}%
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${weeklyProgress}%`,
                      backgroundColor: habit.color,
                      boxShadow: `0 0 10px ${habit.color}40`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiCheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Overall</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {completionRate}%
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${completionRate}%`,
                      backgroundColor: habit.color,
                      boxShadow: `0 0 10px ${habit.color}40`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleViewDetails}
            className="mt-4 w-full py-2.5 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            style={{ backgroundColor: habit.color }}
          >
            View Details
          </button>
        </div>
      </div>

      {showEditForm && (
        <EditHabitForm
          habit={habit}
          onUpdate={updateHabit}
          onCancel={() => setShowEditForm(false)}
        />
      )}
    </>
  );
}

export default HabitCard;
