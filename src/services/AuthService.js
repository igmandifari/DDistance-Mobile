import axiosInstance from "../api/axiosInstance";
import { BASE_URL } from "@env";

export const register = (payload) => {
  return axiosInstance.post(`http://10.0.2.2:8080/api/auth/register/merchant`, payload);
};

export const getUserMerchant = (token) => {
  return axiosInstance.get(`http://10.0.2.2:8080/api/merchant/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const login = (payload) => {
  return axiosInstance.post(`http://10.0.2.2:8080/api/auth/login`, payload);
};
