import axiosInstance from "../api/axiosInstance";
// import { BASE_URL } from "@env";
import baseurl from "../api/baseurl";

export const getMerchantsDashboard = (token) => {
  return axiosInstance.get(`${baseurl}/api/merchant/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInvoice = (token) => {
  return axiosInstance.get(`${baseurl}/api/merchants`, {
    headers: {
      Authorization: "Bearer",
    },
  });
};

export const getMerchantsInvoice = (token) => {
  return axiosInstance.get(`${baseurl}/api/merchants`, {
    headers: {
      Authorization: "Bearer",
    },
  });
};
//1
export const getInvoiceDistributor = (token) => {
  return axiosInstance.get(`${baseurl}/api/invoice`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailInvoice = (token, id) => {
  return axiosInstance.get(`${baseurl}/api/invoice/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putInvoiceDistributor = (token, payload) => {
  return axiosInstance.put(`${baseurl}/api/invoice`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendOtpInvoiceDistributor = (token) => {
  return axiosInstance.get(`${baseurl}/api/invoice/email/send/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const getInvoiceIdDistributor = (token, id) => {
  return axiosInstance.get(`${baseurl}/api/invoice/${id}/distributor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};



export const putChangePinDistributor = (
    token,
    otp,
    oldPin,
    newPin,
    confirmPin
) => {
  return axiosInstance.put(
      `${baseurl}/api/distributor/changePin`,
      {
        otp,
        oldPin,
        newPin,
        confirmPin
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
  );
};

export const getInvoiceId = (token, id) => {
  return axiosInstance.get(`${baseurl}/api/invoice/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailMerchantInvoice = (token, id) => {
  return axiosInstance.get(`${baseurl}/api/invoice/${id}/merchant`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getCreditHistory = (token) => {
  return axiosInstance.get(`${baseurl}/api/invoice/getCreditHistory`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

