import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((s) => s.auth.user) || {
    name: "Aiswaria kamthane",
    role: "Employee",
    email: "aiswariakamthane@example.com",
    phone: "98765321",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="avatar"
          className="w-24 h-24 mx-auto rounded-full border-4 border-indigo-500 shadow-lg mb-4"
        />
        <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-6">{user.role}</p>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-left space-y-3 shadow-inner">
          <p><span className="font-semibold text-indigo-600 dark:text-indigo-400">Email:</span> {user.email || "—"}</p>
          <p><span className="font-semibold text-indigo-600 dark:text-indigo-400">Phone:</span> {user.phone || "—"}</p>
        </div>

        <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition">
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
