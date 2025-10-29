import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/slice";
import { clearNotifications } from "../features/notification/notificationSlice";

export default function Navbar() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearNotifications());
    dispatch(logout());
    navigate("/");
  };

  const handleProfileClick = () => {
    dispatch(clearNotifications());
    navigate("/profile");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-md border-b border-gray-200 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 text-gray-800">
        <h1 className="text-lg md:text-2xl font-semibold text-indigo-700">
          🌐 Intelligent Enterprise Automation Platform
        </h1>

        <div className="flex gap-6 items-center">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">
                Dashboard
              </Link>
              <button
                onClick={handleProfileClick}
                className="hover:text-indigo-600 transition-colors"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-lg transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
