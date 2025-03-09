// src/hooks/useAuth.js
import { useMutation } from "@tanstack/react-query";
import api from "../api";

export const useLogin = () => {
  return useMutation((credentials) => api.post("/auth/login", credentials));
};

export const useRegister = () => {
  return useMutation((userData) => api.post("/auth/register", userData));
};

export const useLogout = () => {
  return useMutation(() => api.post("/auth/logout"));
};