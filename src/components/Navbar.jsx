import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/slice";

export default function Navbar() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-indigo-600 text-white py-3 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-4">
        <div className="text-lg font-bold">IEAP</div>
        <Link to="/dashboard" className="hover:bg-indigo-700 px-3 py-2 rounded-md transition">Dashboard</Link>
        <Link to="/profile" className="hover:bg-indigo-700 px-3 py-2 rounded-md transition">Profile</Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm">Hi, {user.name}</div>
            <button onClick={onLogout} className="bg-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-600">Logout</button>
          </>
        ) : (
          <Link to="/" className="bg-white text-indigo-600 px-3 py-1 rounded-md">Login</Link>
        )}
      </div>
    </nav>
  );
}
