import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearNotifications } from "./features/notification/notificationSlice";

import Navbar from "./components/Navbar";
import Login from "./features/auth/Login";
import Dashboard from "./features/dashboard/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Notifications from "./components/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Clear popups whenever route changes
    dispatch(clearNotifications());
  }, [location, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      <main className="flex-1 pt-20 px-4 md:px-8">
        <Notifications />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
