import axiosInstance from "../api/axiosInstance";
import { BASE_URL } from "@env";

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

export const getMerchantsInvoice = (token) => {
  return axiosInstance.get(`${BASE_URL}/api/merchants`, {
    headers: {
      Authorization: "Bearer",
    },
  });
}; 
//1
export const getInvoiceDistributor = (token) => {
  return axiosInstance.get(`${BASE_URL}/api/invoice`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailInvoice = (token, id) => {
  return axiosInstance.get(`${BASE_URL}/api/invoice/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putInvoiceDistributor = (token, payload) => {
  return axiosInstance.put(`${BASE_URL}/api/invoice`,
  payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const sendOtpInvoiceDistributor = (token) => {
  return axiosInstance.get(`${BASE_URL}/api/invoice/email/send/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInvoiceIdDistributor = (token, id) => {
  return axiosInstance.get(`${BASE_URL}/api/invoice/${id}/distributor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInvoiceId = (token, id) => {
  return axiosInstance.get(`${BASE_URL}/api/invoice/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailMerchantInvoice = (token, id) => {
  return axiosInstance.get(`${BASE_URL}/api/invoice/${id}/merchant`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getCreditHistory = (token) => {
  return axiosInstance.get(`${BASE_URL}/api/invoice/getCreditHistory`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 
};