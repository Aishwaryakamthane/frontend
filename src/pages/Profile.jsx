import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/auth/slice";

const Profile = () => {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: user?.name || "",
    role: user?.role || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    dispatch(setUser(form));
    localStorage.setItem("auth_user", JSON.stringify(form));
    setEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="avatar"
          className="w-24 h-24 mx-auto rounded-full border-4 border-indigo-500 shadow-lg mb-4"
        />
        <h2 className="text-3xl font-bold mb-1">{form.name}</h2>
        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-6">{form.role}</p>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-left space-y-3 shadow-inner">
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400 capitalize">
                {field}:
              </span>{" "}
              {editing ? (
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full mt-1 dark:bg-gray-900"
                />
              ) : (
                <span>{form[field] || "—"}</span>
              )}
            </div>
          ))}
        </div>

        {editing ? (
          <button
            onClick={handleSave}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
          >
            💾 Save Changes
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
          >
            ✏️ Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
