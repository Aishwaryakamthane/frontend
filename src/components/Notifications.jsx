import React from "react";
import { useSelector } from "react-redux";

export default function Notifications() {
  const items = useSelector((s) => s.notifications?.items || []);
  if (!items.length) return null;
  return (
    <div className="fixed bottom-6 right-6 space-y-2 z-50">
      {items.slice(0, 4).map((n, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow">
          <div className="text-sm font-semibold">{n.title || "Notification"}</div>
          <div className="text-xs text-gray-600 dark:text-gray-300">{n.message}</div>
        </div>
      ))}
    </div>
  );
}
