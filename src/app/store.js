import { configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "../features/auth/slice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import notificationReducer, { clearNotifications } from "../features/notification/notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    notifications: notificationReducer,
  },
});

store.subscribe(() => {
  const lastAction = store.getState().lastAction;
});

const originalDispatch = store.dispatch;
store.dispatch = (action) => {
  if (action.type === "auth/logout") {
    originalDispatch(clearNotifications());
  }
  return originalDispatch(action);
};

export default store;
