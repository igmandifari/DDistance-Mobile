import axiosInstance from "../api/axiosInstance";

export const getMerchants = (token) => {
  console.log("merchant token");

  return "Ok nyampe" + token;
  return axiosInstance.get(
    "http://10.0.2.2:8080/api/auth/register/merchant",
    payload
  );
};
