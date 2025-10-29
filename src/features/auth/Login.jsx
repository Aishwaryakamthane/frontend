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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-200 via-orange-100 to-amber-200 relative overflow-hidden">
      {/* Decorative glow orbs */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-rose-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 opacity-30 rounded-full blur-3xl"></div>

      {/* Login card */}
      <div className="relative bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/40">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome to{" "}
          <span className="text-rose-600 drop-shadow-sm">
            IEAP Portal
          </span>
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium block mb-1 text-gray-700">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
              placeholder="admin, hr, finance, sales, employee"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
              placeholder="1234"
              required
            />
          </div>

          {auth.error && (
            <div className="text-red-600 text-sm">{auth.error}</div>
          )}

          <button
            type="submit"
            disabled={auth.status === "loading"}
            className="w-full bg-gradient-to-r from-rose-500 to-amber-400 text-white py-2 rounded-lg font-medium 
                       transition duration-300 shadow-lg hover:shadow-rose-300 
                       transform hover:-translate-y-1 hover:scale-[1.02] hover:brightness-110"
          >
            {auth.status === "loading" ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-6 text-center">
          Demo credentials: <strong>admin</strong>/<em>1234</em>,{" "}
          <strong>hr</strong>/<em>1234</em>, etc.
        </p>
      </div>
    </div>
  );
}
