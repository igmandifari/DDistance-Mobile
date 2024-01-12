import axiosInstance from "../api/axiosInstance";
import { BASE_URL } from "@env";

export const register = (payload) => {
  return axiosInstance.post(`${BASE_URL}/api/auth/register/merchant`, payload);
};

export const login = (payload) => {
  return axiosInstance.post(`${BASE_URL}/api/auth/login`, payload);
};
