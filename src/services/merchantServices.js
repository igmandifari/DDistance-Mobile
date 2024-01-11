import axiosInstance from "../api/axiosInstance";

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
