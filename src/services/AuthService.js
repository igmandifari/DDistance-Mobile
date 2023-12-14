import axiosInstance from "../api/axiosInstance";

export const register = (payload) => {
  return axiosInstance.post(
    "http://10.0.2.2:8080/api/auth/register/merchant",
    payload
  );
};

export const login = (payload) => {
  return axiosInstance.post(
    "http://10.0.2.2:8080/api/auth/login",payload
  )
}
