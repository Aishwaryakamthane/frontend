import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children, allowedRoles }) {
  const auth = useSelector((s) => s.auth);
  if (!auth.user) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    return <div className="p-6">You are not authorized to view this page.</div>;
  }
  return children;
}
