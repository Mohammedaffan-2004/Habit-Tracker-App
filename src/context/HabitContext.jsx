import React, { createContext, useState, useEffect } from "react";

export const HabitContext = createContext();

export function HabitProvider({ children }) {
  const getDefaultHabits = () => {
    const today = new Date().toISOString().split("T")[0];
    return [
      {
        id: 1,
        name: "Pray Salah",
        description: "Perfect",
        category: "Personal",
        color: "#10B981",
        completions: { [today]: true },
      },
      {
        id: 2,
        name: "Play Cricket",
        description: "2 hrs on weekends",
        category: "Fitness",
        color: "#F59E0B",
        completions: { [today]: false },
      },
      {
        id: 3,
        name: "Do Coding",
        description: "Personal development",
        category: "Study",
        color: "#8B5CF6",
        completions: { [today]: true },
      },
      {
        id: 4,
        name: "Drink Water",
        description: "10 glasses daily",
        category: "Health",
        color: "#06B6D4",
        completions: { [today]: false },
      },
    ];
  };

  const [habits, setHabits] = useState(() => {
    if (typeof window !== "undefined") {
      const storedHabits = localStorage.getItem("habits");
      if (storedHabits) {
        try {
          return JSON.parse(storedHabits);
        } catch (e) {
          console.error("Failed to parse stored habits:", e);
          return getDefaultHabits();
        }
      }
    }
    return getDefaultHabits();
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  }, [habits]);

  return (
    <HabitContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitContext.Provider>
  );
}
