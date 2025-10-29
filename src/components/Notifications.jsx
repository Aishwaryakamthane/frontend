import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications } from "../features/notification/notificationSlice";

export default function Notifications() {
  const notifications = useSelector((s) => s.notifications.items);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    setVisible(notifications.map((n) => ({ ...n, fading: false })));

    // Automatically start fade-out after 3s and clear after animation
    const timers = notifications.map((n, i) =>
      setTimeout(() => {
        setVisible((prev) =>
          prev.map((item) =>
            item === n ? { ...item, fading: true } : item
          )
        );

        setTimeout(() => {
          if (i === notifications.length - 1) dispatch(clearNotifications());
        }, 500); // fade duration
      }, 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [notifications, dispatch]);

  if (!visible.length) return null;

  return (
    <div className="fixed top-20 right-4 z-[9999] space-y-3">
      {visible.map((n, idx) => (
        <div
          key={idx}
          className={`px-4 py-2 rounded-lg shadow-lg text-white font-medium transition-all duration-600 transform ${
            n.type === "error"
              ? "bg-red-500"
              : n.type === "success"
              ? "bg-green-500"
              : "bg-blue-500"
          } ${n.fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}
