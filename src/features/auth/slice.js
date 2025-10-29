import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearNotifications } from "../notification/notificationSlice";

const MOCK_USERS = {
  admin: { password: "1234", role: "Admin", name: "Alice Admin" },
  hr: { password: "1234", role: "HR", name: "Hannah HR" },
  finance: { password: "1234", role: "Finance", name: "Frank Finance" },
  sales: { password: "1234", role: "Sales", name: "Sally Sales" },
  employee: { password: "1234", role: "Employee", name: "Evan Employee" },
};

// Async login mock
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    await new Promise((r) => setTimeout(r, 300));
    const user = MOCK_USERS[username];
    if (!user || user.password !== password) {
      return rejectWithValue("Invalid credentials");
    }
    return { username, name: user.name, role: user.role };
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("auth_user")) || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state, action) {
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("auth_user");
    },
    setUser(state, action) {
      state.user = action.payload;
      if (action.payload)
        localStorage.setItem("auth_user", JSON.stringify(action.payload));
      else localStorage.removeItem("auth_user");
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("auth_user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      }),
});

export const { logout, setUser } = slice.actions;

// Thunk to log out + clear notifications
export const logoutAndClear = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearNotifications());
};

export default slice.reducer;
