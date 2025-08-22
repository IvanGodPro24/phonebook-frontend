import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordType,
  Response,
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
    const { data } = await axios.post("/auth/register", user);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const login = createAsyncThunk<
  AuthState,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (user, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/login", user);

    localStorage.setItem("hasSession", "true");
    setAuthHeader(data.accessToken);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
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
      return rejectWithValue(error.response?.data?.data || error.message);
    }
  }
);

export const refresh = createAsyncThunk<
  AuthState,
  void,
  { rejectValue: string }
>("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/refresh");

    setAuthHeader(data.accessToken);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const requestResetEmail = createAsyncThunk<
  Response,
  string,
  { rejectValue: string }
>("auth/requestResetEmail", async (email, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/send-reset-email", { email });

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const resetPassword = createAsyncThunk<
  Response,
  ResetPasswordType,
  { rejectValue: string }
>("auth/resetPassword", async ({ token, password }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/reset-pwd", { token, password });

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const getGoogleAuthUrl = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("auth/getGoogleAuthUrl", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/auth/get-oauth-url");

    return data.url;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});

export const loginWithGoogle = createAsyncThunk<
  AuthState,
  string,
  { rejectValue: string }
>("auth/loginWithGoogle", async (code, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/auth/confirm-oauth", { code });

    localStorage.setItem("hasSession", "true");
    setAuthHeader(data.accessToken);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.data || error.message);
  }
});
