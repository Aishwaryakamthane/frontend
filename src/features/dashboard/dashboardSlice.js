import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "dashboard",
  initialState: {
    widgets: [],
  },
  reducers: {
    setWidgets(state, action) {
      state.widgets = action.payload;
    },
  },
});

export const { setWidgets } = slice.actions;
export default slice.reducer;
