import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BsFire } from "react-icons/bs";
import { FiAward } from "react-icons/fi";
import { ImArrowLeft2 } from "react-icons/im";
import { GrAchievement } from "react-icons/gr";
import { HabitContext } from "../context/HabitContext";
import { useNavigate } from "react-router-dom";

function StatisticsView() {
  const { habits } = useContext(HabitContext);
  const navigate = useNavigate();

  const getCurrentStreak = (habit) => {
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

  const getMonthlyProgress = (habit) => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    let totalDays = 0;
    let completedDays = 0;
    for (
      let d = new Date(firstDay);
      d <= now && d <= lastDay;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split("T")[0];
      totalDays++;
      if (habit.completions[dateStr]) completedDays++;
    }
    return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
  };

  const getHabitWeeklyCompletionRates = () => {
    return habits.map((habit) => {
      let completedDays = 0;
      const totalDays = 7;

      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        if (habit.completions[dateStr]) {
          completedDays++;
        }
      }

      const completionRate = Math.round((completedDays / totalDays) * 100);

      return {
        name: habit.name,
        value: completionRate,
        completed: completedDays,
        total: totalDays,
        color: habit.color,
      };
    });
  };

  const getMonthlyBarData = () => {
    return habits.map((habit) => ({
      name: habit.name,
      progress: getMonthlyProgress(habit),
      color: habit.color,
    }));
  };

  const totalCompletions = habits.reduce(
    (acc, habit) =>
      acc + Object.values(habit.completions).filter(Boolean).length,
    0
  );

  const currentStreak = Math.max(
    ...habits.map((habit) => getCurrentStreak(habit))
  );

  const bestStreak = 21;

  const habitWeeklyData = getHabitWeeklyCompletionRates();
  const monthlyBarData = getMonthlyBarData();

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
            Statistics
          </h1>
          <p className="opacity-90 mt-1 text-sm sm:text-base ml-10">
            Track your progress and achievements
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <BsFire className="w-8 h-8 text-red-100" />
            <span className="text-sm bg-blue-400 bg-opacity-30 px-2 py-1 rounded-full">
              KPI
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">{currentStreak} days</div>
          <div className="text-red-100 text-sm">Current Streak</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <FiAward className="w-8 h-8 text-green-100" />
            <span className="text-sm bg-green-400 bg-opacity-30 px-2 py-1 rounded-full">
              KPI
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">{totalCompletions}</div>
          <div className="text-green-100 text-sm">Total Completions</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <GrAchievement className="w-8 h-8 text-purple-100" />
            <span className="text-sm bg-purple-400 bg-opacity-30 px-2 py-1 rounded-full">
              KPI
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">{bestStreak} days</div>
          <div className="text-purple-100 text-sm">Best Streak</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Weekly Habit Completion
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={habitWeeklyData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                dataKey="value"
                label={({ name, completed, total }) =>
                  `${name}: ${completed}/${total}`
                }
              >
                {habitWeeklyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                formatter={(value, name, props) => [
                  `${props.payload.completed}/${props.payload.total} (${value}%)`,
                  name,
                ]}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Monthly Completion Rates
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyBarData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 50,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  stroke="#666"
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value}%`, "Completion Rate"]}
                />
                <Bar
                  dataKey="progress"
                  name="Completion Rate"
                  radius={[4, 4, 0, 0]}
                >
                  {monthlyBarData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Habit Progress</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => {
            const streak = getCurrentStreak(habit);
            const monthProgress = getMonthlyProgress(habit);
            return (
              <div
                key={habit.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: habit.color }}
                  />
                  <h4 className="font-semibold text-gray-900">{habit.name}</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Streak</span>
                      <span className="text-lg font-bold text-orange-600">
                        {streak} days
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Monthly</span>
                      <span className="text-lg font-bold text-blue-600">
                        {monthProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${monthProgress}%`,
                          backgroundColor: habit.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-8 rounded-3xl shadow-xl">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">You're on fire!</h3>
          <p className="text-lg opacity-90">Keep the momentum going!</p>
        </div>
      </div>
    </div>
  );
}

export default StatisticsView;
