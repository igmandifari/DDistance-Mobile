import axiosInstance from "../api/axiosInstance";

export const getMerchantsDashboard = (token) => {
  return axiosInstance.get(`${BASE_URL}/api/merchant/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInvoice = (token) => {
  return axiosInstance.get(`${BASE_URL}/api/merchants`, {
    headers: {
      Authorization: "Bearer",
    },
  });
};
