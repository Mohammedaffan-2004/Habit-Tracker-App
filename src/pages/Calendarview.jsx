import React, { useState, useContext } from "react";
import { HiChevronRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";
import { HabitContext } from "../context/HabitContext";

function CalendarView() {
  const { habits, setHabits } = useContext(HabitContext);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date().toISOString().split("T")[0];

  const toggleCompletion = (habitId, date) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completions: {
                ...habit.completions,
                [date]: !habit.completions[date],
              },
            }
          : habit
      )
    );
  };

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    const days = [];
    const current = new Date(startDate);
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const days = getDaysInMonth();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="opacity-90 mt-1">Track your daily progress</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1
                  )
                )
              }
              className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all text-black"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-lg font-semibold min-w-[200px] text-center">
              {currentMonth.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1
                  )
                )
              }
              className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all text-black"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {selectedHabit && (
        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedHabit.color }}
              />
              <span className="font-medium text-gray-900">
                Viewing calendar for: {selectedHabit.name}
              </span>
            </div>
            <button
              onClick={() => setSelectedHabit(null)}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Show All
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-semibold text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dateStr = day.toISOString().split("T")[0];
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            const isToday = dateStr === today;
            const isFuture = dateStr > today;

            let completionRate = 0;
            if (selectedHabit) {
              completionRate = selectedHabit.completions[dateStr] ? 100 : 0;
            } else {
              const completed = habits.reduce(
                (acc, habit) => acc + (habit.completions[dateStr] ? 1 : 0),
                0
              );
              completionRate =
                habits.length > 0 ? (completed / habits.length) * 100 : 0;
            }

            let bgClass = "";
            let textClass = "text-gray-900";

            if (!isCurrentMonth) {
              bgClass = "bg-gray-50";
              textClass = "text-gray-300";
            } else if (completionRate === 100) {
              bgClass = "bg-green-100 text-green-800 border border-green-200";
            } else if (completionRate > 0) {
              bgClass = "bg-amber-100 text-amber-800 border border-amber-200";
            } else if (!isFuture) {
              bgClass = "bg-red-100 text-red-800 border border-red-200";
            } else {
              bgClass = "bg-white border border-gray-200";
            }

            return (
              <div
                key={index}
                onClick={() =>
                  selectedHabit &&
                  !isFuture &&
                  isCurrentMonth &&
                  toggleCompletion(selectedHabit.id, dateStr)
                }
                className={`
                  p-3 rounded-xl cursor-pointer transition-all duration-200 min-h-[60px] flex flex-col justify-center items-center
                  ${bgClass}
                  ${textClass}
                  ${isToday ? "ring-2 ring-indigo-500 ring-offset-2" : ""}
                  ${
                    selectedHabit && !isFuture && isCurrentMonth
                      ? "hover:shadow-md hover:scale-[1.02]"
                      : ""
                  }
                `}
              >
                <div className="font-semibold text-lg">{day.getDate()}</div>
                {completionRate > 0 && completionRate < 100 && (
                  <div className="text-xs mt-1">
                    {Math.round(completionRate)}%
                  </div>
                )}
                {completionRate === 100 && (
                  <div className="text-xs mt-1">✓</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!selectedHabit && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Select a habit to view:
          </h3>
          <div className="flex flex-wrap gap-3">
            {habits.map((habit) => (
              <button
                key={habit.id}
                onClick={() => setSelectedHabit(habit)}
                className="px-4 py-2 rounded-xl text-white font-medium hover:opacity-90 transition-opacity shadow-sm"
                style={{ backgroundColor: habit.color }}
              >
                {habit.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Details</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green-100 border border-green-200 rounded-lg" />
            <span className="text-gray-700">Completed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-amber-100 border border-amber-200 rounded-lg" />
            <span className="text-gray-700">Partial</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-red-100 border border-red-200 rounded-lg" />
            <span className="text-gray-700">Missed</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white border border-gray-200 rounded-lg" />
            <span className="text-gray-700">Future/Other</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
