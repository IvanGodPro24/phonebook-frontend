import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, refresh } from "./operations";
import { AuthInitState, AuthState } from "./auth.types";
import { toast } from "sonner";

const handleAuthentication = (
  state: AuthInitState,
  action: PayloadAction<AuthState>
) => {
  state.user = action.payload.user;
  state.token = action.payload.accessToken;
  state.isLoggedIn = true;
};

const initialState: AuthInitState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, handleAuthentication)
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })

      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
        toast.error("Session not found, please log in again");
      });
  },
});

export default slice.reducer;
