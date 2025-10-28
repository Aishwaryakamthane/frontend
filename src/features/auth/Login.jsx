import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setUser } from "./slice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((s) => s.auth);

  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => {
    const saved = localStorage.getItem("auth_user");
    if (saved) dispatch(setUser(JSON.parse(saved)));
  }, [dispatch]);

  useEffect(() => {
    if (auth.user) navigate("/dashboard");
  }, [auth.user, navigate]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login Portal</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="admin, hr, finance, sales, employee"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="1234"
              required
            />
          </div>

          {auth.error && <div className="text-red-600">{auth.error}</div>}

          <button
            type="submit"
            disabled={auth.status === "loading"}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700"
          >
            {auth.status === "loading" ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="text-xs text-gray-500 mt-4">
          Demo credentials: <strong>admin</strong>/<em>1234</em>, <strong>hr</strong>/<em>1234</em>, etc.
        </div>
      </div>
    </div>
  );
}
