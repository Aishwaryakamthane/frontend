import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { items: [] },
  reducers: {
    pushNotification(state, action) {
      state.items.unshift(action.payload);
      if (state.items.length > 50) state.items.length = 50;
    },
    clearNotifications(state) {
      state.items = [];
    },
  },
});

export const { pushNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
