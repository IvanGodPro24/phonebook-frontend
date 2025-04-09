import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, refresh, register } from "./operations";
import { AuthInitState, AuthState } from "./auth.types";

const handleAuthentication = (
  state: AuthInitState,
  action: PayloadAction<AuthState>
) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
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
      .addCase(register.fulfilled, handleAuthentication)
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
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export default slice.reducer;
