// import React, { useState, useContext } from "react";
// import { RiProgress2Line } from "react-icons/ri";
// import { BsPlusLg } from "react-icons/bs";
// import { FaRegStickyNote } from "react-icons/fa";
// import { FaCalendarCheck } from "react-icons/fa6";
// import { FiTrendingUp } from "react-icons/fi";
// import { BsFire } from "react-icons/bs";
// import { FiCheckCircle } from "react-icons/fi";
// import { HabitContext } from "../context/HabitContext";
// import HabitCard from "../components/HabitCard";
// import AddHabitForm from "../components/addHabitForm";

// function Dashboard() {
//   const { habits, setHabits } = useContext(HabitContext);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const today = new Date().toISOString().split("T")[0];

//   const toggleCompletion = (habitId) => {
//     setHabits((prev) =>
//       prev.map((habit) =>
//         habit.id === habitId
//           ? {
//               ...habit,
//               completions: {
//                 ...habit.completions,
//                 [today]: !habit.completions[today],
//               },
//             }
//           : habit
//       )
//     );
//   };

//   const deleteHabit = (habitId) => {
//     setHabits((prev) => prev.filter((h) => h.id !== habitId));
//   };

//   const addHabit = (newHabit) => {
//     setHabits((prev) => [...prev, newHabit]);
//     setShowAddForm(false);
//   };

//   const completedToday = habits.filter((h) => h.completions[today]).length;
//   const totalHabits = habits.length;
//   const progressPercent =
//     totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

//   const getMotivationalMessage = (streak) => {
//     if (streak === 0)
//       return "Every journey begins with a single step. Start today!";
//     if (streak === 1) return "Great start! One day down, keep going!";
//     if (streak <= 3)
//       return `🔥 You're on a ${streak}-day streak! Building momentum!`;
//     if (streak <= 7)
//       return `🔥 ${streak} days in a row! You're building a great habit!`;
//     if (streak <= 14)
//       return `🔥 ${streak} days! Your consistency is paying off!`;
//     if (streak <= 30) return `🔥 ${streak} days! You're unstoppable!`;
//     return `🔥 ${streak} days! You're a habit master!`;
//   };

//   const getBestStreak = () => {
//     let bestStreak = 0;
//     habits.forEach((habit) => {
//       let currentStreak = 0;
//       let tempStreak = 0;

//       Object.keys(habit.completions).forEach((date) => {
//         if (habit.completions[date]) {
//           tempStreak++;
//           if (tempStreak > currentStreak) currentStreak = tempStreak;
//         } else {
//           tempStreak = 0;
//         }
//       });
//       if (currentStreak > bestStreak) bestStreak = currentStreak;
//     });
//     return bestStreak || 1;
//   };

//   const bestStreak = getBestStreak();
//   const motivationalMessage = getMotivationalMessage(bestStreak);

//   const filteredHabits =
//     selectedCategory === "All"
//       ? habits
//       : habits.filter((h) => h.category === selectedCategory);

//   const categories = ["All", ...new Set(habits.map((h) => h.category))];

//   const getLast7DaysActivity = () => {
//     const days = [];
//     for (let i = 6; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       const dateStr = date.toISOString().split("T")[0];
//       const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
//       const completed = habits.filter((h) => h.completions[dateStr]).length;
//       days.push({
//         day: dayName,
//         date: dateStr,
//         completed,
//         total: habits.length,
//       });
//     }
//     return days;
//   };

//   const recentActivity = getLast7DaysActivity();

//   return (
//     <div className="space-y-8">
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Good morning, Affan
//           </h1>
//           <p className="text-gray-600">
//             {new Date().toLocaleDateString("en-US", {
//               weekday: "long",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg"
//         >
//           <BsPlusLg className="w-5 h-5" /> Add Habit
//         </button>
//       </div>

//       <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white p-8 rounded-3xl shadow-xl">
//         <div className="absolute inset-0 bg-black bg-opacity-20"></div>
//         <div className="relative z-10 text-center">
//           <p className="text-xl font-medium mb-2">"{motivationalMessage}"</p>
//           <div className="text-purple-200 text-sm">
//             Keep the momentum going!
//           </div>
//         </div>
//         <div className=" hidden sm:block absolute -top-4 -right-4 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
//         <div className=" hidden sm:block absolute -bottom-6 -left-6 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
//       </div>

//       <div className="grid md:grid-cols-4 gap-6">
//         <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl text-white shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <RiProgress2Line className="w-8 h-8 text-green-100" />
//             <span className="text-sm bg-green-400 bg-opacity-30 px-2 py-1 rounded-full">
//               KPI
//             </span>
//           </div>
//           <div className="text-3xl font-bold mb-1">{progressPercent}%</div>
//           <div className="text-green-100 text-sm">Today's Progress</div>
//         </div>

//         <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-2xl text-white shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <FiCheckCircle className="w-8 h-8 text-blue-100" />
//             <span className="text-sm bg-blue-400 bg-opacity-30 px-2 py-1 rounded-full">
//               KPI
//             </span>
//           </div>
//           <div className="text-3xl font-bold mb-1">{completedToday}</div>
//           <div className="text-blue-100 text-sm">Completed Today</div>
//         </div>

//         <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <BsFire className="w-8 h-8 text-purple-100" />
//             <span className="text-sm bg-purple-400 bg-opacity-30 px-2 py-1 rounded-full">
//               KPI
//             </span>
//           </div>
//           <div className="text-3xl font-bold mb-1">{bestStreak}</div>
//           <div className="text-purple-100 text-sm">Best Streak</div>
//         </div>

//         <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl text-white shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <FiTrendingUp className="w-8 h-8 text-orange-100" />
//             <span className="text-sm bg-orange-400 bg-opacity-30 px-2 py-1 rounded-full">
//               KPI
//             </span>
//           </div>
//           <div className="text-3xl font-bold mb-1">{totalHabits}</div>
//           <div className="text-orange-100 text-sm">Active Habits</div>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-xl font-semibold text-gray-900">
//             Recent Activity
//           </h3>
//           <FaCalendarCheck className="w-5 h-5 text-gray-400" />
//         </div>
//         <div className="flex justify-between">
//           {recentActivity.map((day, index) => (
//             <div key={index} className="text-center">
//               <div className="text-sm text-gray-600 mb-2">{day.day}</div>
//               <div className="relative w-12 h-12 mx-auto">
//                 <svg className="w-full h-full" viewBox="0 0 36 36">
//                   <path
//                     d="M18 2.0845
//                       a 15.9155 15.9155 0 0 1 0 31.831
//                       a 15.9155 15.9155 0 0 1 0 -31.831"
//                     fill="none"
//                     stroke="#e6e6e6"
//                     strokeWidth="3"
//                   />
//                   <path
//                     d="M18 2.0845
//                       a 15.9155 15.9155 0 0 1 0 31.831
//                       a 15.9155 15.9155 0 0 1 0 -31.831"
//                     fill="none"
//                     stroke="#3B82F6"
//                     strokeWidth="3"
//                     strokeDasharray={`${
//                       (day.completed / day.total) * 100
//                     }, 100`}
//                   />
//                   <text
//                     x="18"
//                     y="20.5"
//                     textAnchor="middle"
//                     fill="#4B5563"
//                     fontSize="8"
//                   >
//                     {Math.round((day.completed / day.total) * 100)}%
//                   </text>
//                 </svg>
//               </div>
//               <div className="text-xs text-gray-500 mt-1">
//                 {day.completed}/{day.total}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex gap-2 flex-wrap">
//         {categories.map((category) => (
//           <button
//             key={category}
//             onClick={() => setSelectedCategory(category)}
//             className={`px-4 py-2 rounded-full font-medium transition-all ${
//               selectedCategory === category
//                 ? "bg-blue-500 text-white shadow-lg scale-105"
//                 : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
//             }`}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold text-gray-900">Your Habits</h2>
//         {filteredHabits.length > 0 ? (
//           <div className="grid md:grid-cols-2 gap-6">
//             {filteredHabits.map((habit) => (
//               <HabitCard
//                 key={habit.id}
//                 habit={habit}
//                 onToggle={toggleCompletion}
//                 onDelete={deleteHabit}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <FaRegStickyNote className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">
//               No habits yet
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Create your first habit to start building better routines!
//             </p>
//             <button
//               onClick={() => setShowAddForm(true)}
//               className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Create Your First Habit
//             </button>
//           </div>
//         )}
//       </div>

//       {showAddForm && (
//         <AddHabitForm onAdd={addHabit} onCancel={() => setShowAddForm(false)} />
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useContext } from "react";
import { RiProgress2Line } from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";
import { FaRegStickyNote } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { FiTrendingUp } from "react-icons/fi";
import { BsFire } from "react-icons/bs";
import { FiCheckCircle } from "react-icons/fi";
import { HabitContext } from "../context/HabitContext";
import HabitCard from "../components/HabitCard";
import AddHabitForm from "../components/addHabitForm";

function Dashboard() {
  const { habits, setHabits } = useContext(HabitContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const today = new Date().toISOString().split("T")[0];

  const toggleCompletion = (habitId) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completions: {
                ...habit.completions,
                [today]: !habit.completions[today],
              },
            }
          : habit
      )
    );
  };

  const deleteHabit = (habitId) => {
    setHabits((prev) => prev.filter((h) => h.id !== habitId));
  };

  const addHabit = (newHabit) => {
    setHabits((prev) => [...prev, newHabit]);
    setShowAddForm(false);
  };

  const completedToday = habits.filter((h) => h.completions[today]).length;
  const totalHabits = habits.length;
  const progressPercent =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  const getMotivationalMessage = (streak) => {
    if (streak === 0)
      return "Every journey begins with a single step. Start today!";
    if (streak === 1) return "Great start! One day down, keep going!";
    if (streak <= 3)
      return `🔥 You're on a ${streak}-day streak! Building momentum!`;
    if (streak <= 7)
      return `🔥 ${streak} days in a row! You're building a great habit!`;
    if (streak <= 14)
      return `🔥 ${streak} days! Your consistency is paying off!`;
    if (streak <= 30) return `🔥 ${streak} days! You're unstoppable!`;
    return `🔥 ${streak} days! You're a habit master!`;
  };

  const getBestStreak = () => {
    let bestStreak = 0;
    habits.forEach((habit) => {
      let currentStreak = 0;
      let tempStreak = 0;
      Object.keys(habit.completions).forEach((date) => {
        if (habit.completions[date]) {
          tempStreak++;
          if (tempStreak > currentStreak) currentStreak = tempStreak;
        } else {
          tempStreak = 0;
        }
      });
      if (currentStreak > bestStreak) bestStreak = currentStreak;
    });
    return bestStreak || 1;
  };

  const bestStreak = getBestStreak();
  const motivationalMessage = getMotivationalMessage(bestStreak);

  const filteredHabits =
    selectedCategory === "All"
      ? habits
      : habits.filter((h) => h.category === selectedCategory);

  const categories = ["All", ...new Set(habits.map((h) => h.category))];

  const getLast7DaysActivity = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const completed = habits.filter((h) => h.completions[dateStr]).length;
      days.push({
        day: dayName,
        date: dateStr,
        completed,
        total: habits.length,
      });
    }
    return days;
  };

  const recentActivity = getLast7DaysActivity();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Good morning, Affan
          </h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg"
        >
          <BsPlusLg className="w-5 h-5" /> Add Habit
        </button>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-xl">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 bg-opacity-20"></div>{" "} */}
        <div className="relative z-10 text-center">
          <p className="text-xl font-medium mb-2">"{motivationalMessage}"</p>
          <div className="text-indigo-200 text-sm">
            Keep the momentum going!
          </div>
        </div>
        <div className="hidden sm:block absolute -top-4 -right-4 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
        <div className="hidden sm:block absolute -bottom-6 -left-6 w-32 h-32 bg-white bg-opacity-10 rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <RiProgress2Line className="w-8 h-8 text-emerald-100" />
            <span className="text-sm bg-emerald-400 bg-opacity-30 px-2 py-1 rounded-full">
              KPI
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">{progressPercent}%</div>
          <div className="text-emerald-100 text-sm">Today's Progress</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <FiCheckCircle className="w-8 h-8 text-blue-100" />
            <span className="text-sm bg-blue-400 bg-opacity-30 px-2 py-1 rounded-full">
              KPI
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">{completedToday}</div>
          <div className="text-blue-100 text-sm">Completed Today</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <BsFire className="w-8 h-8 text-purple-100" />
            <span className="text-sm bg-purple-400 bg-opacity-30 px-2 py-1 rounded-full">
              KPI
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">{bestStreak}</div>
          <div className="text-purple-100 text-sm">Best Streak</div>
        </div>

        <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <FiTrendingUp className="w-8 h-8 text-rose-100" />
            <span className="text-sm bg-rose-400 bg-opacity-30 px-2 py-1 rounded-full">
              KPI
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">{totalHabits}</div>
          <div className="text-rose-100 text-sm">Active Habits</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Recent Activity
          </h3>
          <FaCalendarCheck className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex justify-between">
          {recentActivity.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-600 mb-2">{day.day}</div>
              <div className="relative w-12 h-12 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeDasharray={`${
                      (day.completed / day.total) * 100
                    }, 100`}
                  />
                  <text
                    x="18"
                    y="20.5"
                    textAnchor="middle"
                    fill="#4b5563"
                    fontSize="8"
                  >
                    {Math.round((day.completed / day.total) * 100)}%
                  </text>
                </svg>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {day.completed}/{day.total}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category
                ? "bg-indigo-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Your Habits</h2>
        {filteredHabits.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={toggleCompletion}
                onDelete={deleteHabit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaRegStickyNote className="w-8 h-8 text-indigo-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No habits yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first habit to start building better routines!
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Create Your First Habit
            </button>
          </div>
        )}
      </div>

      {showAddForm && (
        <AddHabitForm onAdd={addHabit} onCancel={() => setShowAddForm(false)} />
      )}
    </div>
  );
}

export default Dashboard;
