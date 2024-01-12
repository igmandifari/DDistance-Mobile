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


export const getMerchantsInvoice = (token) => {
  return axiosInstance.get("http://10.0.2.2:8080/api/merchants", {
    headers: {
      Authorization: "Bearer",
    },
  });
};
//1
export const getInvoiceDistributor = (token)=>{
  return axiosInstance.get("http://10.0.2.2:8080/api/invoice", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const getDetailInvoice = (token, id) => {
  return axiosInstance.get(`http://10.0.2.2:8080/api/invoice/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};