import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HabitProvider } from "./context/HabitContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import CalendarView from "./pages/Calendarview";
import StatisticsView from "./pages/statics";
import SettingsView from "./pages/settings";
import HabitDetail from "./pages/HabitDetail";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <HabitProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="md:ml-64 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/habit/:id" element={<HabitDetail />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/statistics" element={<StatisticsView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </div>
      </div>
    </HabitProvider>
  );
}

export default App;
