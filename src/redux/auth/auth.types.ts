export type User = {
  name: string | null;
  email: string | null;
};

export type AuthInitState = {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
};

export type AuthState = {
  user: User;
  accessToken: string | null;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type ResetPasswordType = {
  token: string;
  password: string;
};

export type Response = {
  message: string;
};
