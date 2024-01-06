import axiosInstance from "../api/axiosInstance";

export const getMerchants = (token) => {
  return axiosInstance.get("http://10.0.2.2:8080/api/merchants", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInvoice = (token) => {
  return axiosInstance.get("http://10.0.2.2:8080/api/merchants", {
    headers: {
      Authorization: "Bearer",
    },
  });
};
