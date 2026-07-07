import api from "./api";

// Register
export const register = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

// Login
export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const { data } = await api.post("/auth/forgot-password", {
    email,
  });
  return data;
};

// Reset Password
export const resetPassword = async (token, password) => {
  const { data } = await api.put(`/auth/reset-password/${token}`, {
    password,
  });
  return data;
};  