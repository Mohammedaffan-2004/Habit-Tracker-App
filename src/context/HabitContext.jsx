import React, { createContext, useState, useEffect } from "react";

export const HabitContext = createContext();

export function HabitProvider({ children }) {
  const [habits, setHabits] = useState(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      try {
        return JSON.parse(storedHabits);
      } catch (e) {
        console.error("Failed to parse stored habits:", e);
        return getDefaultHabits();
      }
    } else {
      return getDefaultHabits();
    }
  });

  const getDefaultHabits = () => {
    const today = new Date().toISOString().split("T")[0];
    return [
      {
        id: 1,
        name: "Morning Meditation",
        description: "10 minutes daily",
        category: "Health",
        color: "#10B981",
        completions: { [today]: true },
      },
      {
        id: 2,
        name: "Daily Exercise",
        description: "30 min workout",
        category: "Fitness",
        color: "#F59E0B",
        completions: { [today]: false },
      },
      {
        id: 3,
        name: "Read 30 mins",
        description: "Personal development",
        category: "Study",
        color: "#8B5CF6",
        completions: { [today]: true },
      },
      {
        id: 4,
        name: "Drink Water",
        description: "8 glasses daily",
        category: "Health",
        color: "#06B6D4",
        completions: { [today]: false },
      },
    ];
  };

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  return (
    <HabitContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitContext.Provider>
  );
}
