import axiosInstance from "../api/axiosInstance";
import { BASE_URL } from "@env";

export const getDistributorsDashboard = (token) => {
  return axiosInstance.get(`${BASE_URL}/api/distributor/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailDistributorInvoice = (token, id) => {
  return axiosInstance.get(`${BASE_URL}/api/invoice/${id}/distributor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInsurances = (token) => {
  return axiosInstance.get(`${BASE_URL}/api/insurance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailInsurance = (token, id) => {
  return axiosInstance.get(`${BASE_URL}/api/insurance/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getKtp = async (token, id) => {
  const response = await axiosInstance.get(
    `${BASE_URL}/api/insurance/${id}/ktp`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
  );
  console.log(response.data);
  return response.data;
};

// Fungsi untuk mengonversi blob ke base64
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const sendOtpInsurance = (token) => {
  return axiosInstance.get(`${BASE_URL}/api/insurance/email/send/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createInsurance = (token, payload, otp) => {
  console.log(payload);
  return axiosInstance.post(`${BASE_URL}/api/insurance?otp=${otp}`, payload, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getInvoice = (token) => {
  return axiosInstance.get("http://10.0.2.2:8080/api/invoice", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailInvoice = (token, id) => {
  return axiosInstance.get(`http://10.0.2.2:8080/api/invoice/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const putChangePassword = (
  token,
  id,
  newPassword,
  oldPassword,
  confirmPassword
) => {
  return axiosInstance.put(
    `http://10.0.2.2:8080/api/merchant/changePin`,
    {
      password: newPassword,
      oldPassword: oldPassword,
      confirmPassword: confirmPassword,
      id: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const sendOtpChangePassword = (token) => {
  return axiosInstance.get(
    "http://10.0.2.2:8080/api/merchant/email/send/token",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllDistributor = (token) => {
  return axiosInstance.get("http://10.0.2.2:8080/api/distributor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendOtpInvoiceMerhant = (token) => {
  return axiosInstance.get(
    "http://10.0.2.2:8080/api/invoice/email/send/token",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const postInvoice = (token, payload, otp) => {
  console.log("ini payload", payload);
  return axiosInstance.post(
    `http://10.0.2.2:8080/api/invoice?otp=${otp}`,
    payload,
    {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getDetailTagihan = (token, id) => {
  return axiosInstance.get(
    "http://10.0.2.2:8080/api/invoice/ff8081818cfeaf98018cfeafae7f0007",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const cekTagihan = (token, bodyRequest) => {
  return axiosInstance.post(
    "http://localhost:8080/api/invoice/cekTagihan",
    bodyRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const sendTokenPayment = (token) => {
  return axiosInstance.get(
    "http://10.0.2.2:8080/api/payment/send/token",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getDetailInvoiceId = (token, id) => {
  return axiosInstance.get(`http://10.0.2.2:8080/api/payment/${id}/invoice`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPaymentId = (token, id) => {
  return axiosInstance.get(`http://10.0.2.2:8080/api/payment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};