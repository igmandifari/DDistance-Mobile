import axiosInstance from "../api/axiosInstance";

export const getInsurances = (token) => {
  return axiosInstance.get("http://10.0.2.2:8085/api/insurances", {
    headers: {
      Authorization: "Bearer",
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
