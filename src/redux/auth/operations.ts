import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "./auth.types";

axios.defaults.baseURL = "https://phonebook-backend-n8t6.onrender.com";
axios.defaults.withCredentials = true;

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk<
  User,
  RegisterCredentials,
  { rejectValue: string }
>("auth/register", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/register", user);

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
    const response = await axios.post("/auth/login", user);

    localStorage.setItem("hasSession", "true");
    setAuthHeader(response.data.accessToken);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/auth/logout");

      localStorage.removeItem("hasSession");
      clearAuthHeader();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const refresh = createAsyncThunk<
  AuthState,
  void,
  { rejectValue: string }
>("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post("/auth/refresh");

    setAuthHeader(response.data.accessToken);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
