import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import notificationReducer from "../features/notification/notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    notifications: notificationReducer,
  },
});

export default store;
