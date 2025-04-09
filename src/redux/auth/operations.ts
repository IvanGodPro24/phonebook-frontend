import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store.types";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "./auth.types";

axios.defaults.baseURL = "https://connections-api.goit.global";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk<
  AuthState,
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post("/users/signup", user);

    setAuthHeader(response.data.token);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk<
  AuthState,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post("/users/login", user);

    setAuthHeader(response.data.token);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post<void>("/users/logout");

      clearAuthHeader();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const refresh = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);

      const response = await axios.get("/users/current");

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
