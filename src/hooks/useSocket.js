import { useEffect } from "react";
import { io } from "socket.io-client";


export default function useSocket(enabled, onMessage) {
  useEffect(() => {
    if (!enabled) return;
    const url = process.env.REACT_APP_WS_URL || null;
    if (!url) {
      console.warn("REACT_APP_WS_URL not set — socket not connected");
      return;
    }
    const socket = io(url, { transports: ["websocket"] });
    socket.on("connect", () => console.log("socket connected", socket.id));
    socket.on("notification", (payload) => {
      if (onMessage) onMessage(payload);
    });
    socket.on("disconnect", () => console.log("socket disconnected"));
    return () => socket.close();
  }, [enabled, onMessage]);
}
