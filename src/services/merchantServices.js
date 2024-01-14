import axiosInstance from "../api/axiosInstance";

export const getInsurances = (token) => {
  return axiosInstance.get("http://10.0.2.2:8080/api/insurance", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailInsurance = (token, id) => {
  return axiosInstance.get(`http://10.0.2.2:8080/api/insurance/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getKtp = (token, id) => {
  return axiosInstance.get(`http://10.0.2.2:8080/api/insurance/${id}/ktp`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendOtpInsurance = (token) => {
  console.log("send otp");
  return axiosInstance.get(
    "http://10.0.2.2:8085/api/insurance/email/send/token",
    {
      headers: {
        Authorization: "Bearer",
      },
    }
  );
};

export const sendOtpForgetPIN = (token) => {
  console.log("send otp");
  return axiosInstance.get(
    "http://10.0.2.2:8080/api/forget-pin/email/send/token",
    {
      headers: {
        Authorization: "Bearer",
      },
    }
  );
};
