import axiosInstance from "../api/axiosInstance";

export const getMerchants = (token) => {
  return axiosInstance.get("http://10.0.2.2:8085/api/merchants", {
    headers: {
      Authorization: "Bearer",
    },
  });
};
