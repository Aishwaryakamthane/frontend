import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
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

export const { pushNotification, clearNotifications } = slice.actions;
export default slice.reducer;
