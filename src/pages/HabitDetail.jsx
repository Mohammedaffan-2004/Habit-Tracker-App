import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import { FaRegEdit } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import { FaCalendarCheck } from "react-icons/fa6";
import { BsCircle } from "react-icons/bs";
import { LuTrash2 } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { MdGppGood } from "react-icons/md";
import { FcSportsMode } from "react-icons/fc";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineWork } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { HabitContext } from "../context/HabitContext";
import EditHabitForm from "../components/EditHabitForm";
import { BsFillPinAngleFill } from "react-icons/bs";

function HabitDetail() {
  const { habits, setHabits } = useContext(HabitContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);

  console.log("URL ID:", id, "Type:", typeof id);
  console.log("Habits:", habits);

  if (!habits) {
    return <div className="text-center py-12">Loading habits...</div>;
  }

  if (habits.length === 0) {
    return <div className="text-center py-12">No habits found</div>;
  }

  const habit = habits.find((h) => {
    console.log(
      "Comparing:",
      h.id,
      "with",
      id,
      "Types:",
      typeof h.id,
      typeof id
    );

    return (
      String(h.id) === String(id) ||
      h.id == id ||
      (typeof h.id === "object" && h.id !== null && h.id.toString() === id)
    );
  });

  if (!habit) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Habit not found
        </h2>
        <p className="mb-4">Looking for habit with ID: {id}</p>
        <p className="mb-4">
          Available habit IDs: {habits.map((h) => h.id).join(", ")}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const completions = habit.completions || {};
  const today = new Date().toISOString().split("T")[0];
  const isCompleted = completions[today];

  const toggleCompletion = () => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habit.id
          ? {
              ...h,
              completions: {
                ...completions,
                [today]: !isCompleted,
              },
            }
          : h
      )
    );
  };

  const deleteHabit = () => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      setHabits((prev) => prev.filter((h) => h.id !== habit.id));
      navigate("/");
    }
  };

  const updateHabit = (updatedHabit) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === updatedHabit.id ? updatedHabit : h))
    );
    setShowEditForm(false);
  };

  const getCurrentStreak = () => {
    let streak = 0;
    let currentDate = new Date();

    while (true) {
      const dateStr = currentDate.toISOString().split("T")[0];
      if (completions[dateStr]) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
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
      if (completions[dateStr]) completedDays++;
    }

    return Math.round((completedDays / 7) * 100);
  };

  const getCompletionRate = () => {
    const totalDays = Object.keys(completions).length;
    const completedDays = Object.values(completions).filter(Boolean).length;
    return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
  };

  const streak = getCurrentStreak();
  const weeklyProgress = getWeeklyProgress();
  const completionRate = getCompletionRate();

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

  const getLast30Days = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      days.push({
        date: dateStr,
        completed: completions[dateStr] || false,
        isToday: dateStr === today,
        isFuture: dateStr > today,
      });
    }
    return days;
  };

  const last30Days = getLast30Days();

  const toggleCompletionForDate = (date) => {
    if (date > today) return;

    setHabits((prev) =>
      prev.map((h) =>
        h.id === habit.id
          ? {
              ...h,
              completions: {
                ...completions,
                [date]: !completions[date],
              },
            }
          : h
      )
    );
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ImArrowLeft2 className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Habit Details</h1>
        </div>

        <div
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          style={{ borderLeft: `4px solid ${habit.color}` }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <button
                onClick={toggleCompletion}
                className={`w-16 h-16 rounded-full border-3 flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-green-100 border-green-500 text-green-600"
                    : "border-gray-300 hover:border-gray-400 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <FiCheckCircle className="w-10 h-10" />
                ) : (
                  <BsCircle className="w-10 h-10" />
                )}
              </button>
              <div>
                <h2 className="font-bold text-gray-900 text-2xl">
                  {habit.name}
                </h2>
                {habit.description && (
                  <p className="text-gray-600 text-lg mt-2">
                    {habit.description}
                  </p>
                )}
                <span
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white rounded-full mt-4"
                  style={{ backgroundColor: habit.color }}
                >
                  <span>{getCategoryIcon(habit.category)}</span>
                  {habit.category}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center gap-1 text-orange-600">
                  <BsFire className="w-5 h-5" />
                  <span className="font-bold text-xl">{streak}</span>
                </div>
                <div className="text-sm text-gray-500">day streak</div>
              </div>
              <button
                onClick={() => setShowEditForm(true)}
                className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
              >
                <FaRegEdit className="w-6 h-6" />
              </button>
              <button
                onClick={deleteHabit}
                className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <LuTrash2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendarCheck className="w-5 h-5 text-blue-500" />
                <span className="text-lg text-gray-700">This Week</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  {weeklyProgress}%
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
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
                <FiCheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-lg text-gray-700">Overall</span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  {completionRate}%
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
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
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Calendar</h3>
          <p className="text-gray-600 mb-6">
            Click on a date to mark as completed or not
          </p>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-3 text-center text-sm font-semibold text-gray-600"
              >
                {day}
              </div>
            ))}
            {last30Days.map((day, index) => {
              const dateStr = day.date;
              const isToday = day.isToday;
              const isFuture = day.isFuture;
              const isCompleted = day.completed;

              let bgClass = "";
              let textClass = "text-gray-900";

              if (isCompleted) {
                bgClass = "bg-green-500 text-white shadow-md";
                textClass = "text-white";
              } else if (!isFuture) {
                bgClass = "bg-red-100 text-red-600";
              } else {
                bgClass = "bg-gray-100 text-gray-400";
              }

              return (
                <div
                  key={index}
                  onClick={() => !isFuture && toggleCompletionForDate(dateStr)}
                  className={`
                    p-2 rounded-lg cursor-pointer transition-all duration-300 flex flex-col items-center justify-center
                    ${bgClass}
                    ${textClass}
                    ${isToday ? "ring-2 ring-blue-500 ring-offset-2" : ""}
                    ${!isFuture ? "hover:scale-105" : "cursor-not-allowed"}
                  `}
                >
                  <div className="font-medium">
                    {new Date(dateStr).getDate()}
                  </div>
                  <div className="text-xs mt-1">
                    {new Date(dateStr).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </div>
                </div>
              );
            })}
          </div>
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

export default HabitDetail;
