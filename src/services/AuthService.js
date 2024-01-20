import axiosInstance from "../api/axiosInstance";
import { BASE_URL } from "@env";

export const register = (payload) => {
  return axiosInstance.post(`${BASE_URL}/api/auth/register/merchant`, payload);
};

export const getUserMerchant = (token) => {
  return axiosInstance.get(`${BASE_URL}/api/merchant/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserDistributor = (token) => {
  return axiosInstance.get(`${BASE_URL}/api/distributor/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const login = (payload) => {
  return axiosInstance.post(`${BASE_URL}/api/auth/login`, payload);
  // return axiosInstance.post(`https://humbly-desired-stag.ngrok-free.app//api/auth/login`, payload);
};

export const sendOtpForgetPassword = async (email) => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/api/auth/sendOtp`,
      {
        email: email,
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending OTP for forget password:', error);
    throw error;
  }
};


export const sendNewPassword = async (otp, email) => {
  try {
    const bodyRequest = {
      otp: otp,
      email: email,
    };

    const response = await axiosInstance.put(
      `${BASE_URL}/api/auth/reset-password-mobile`,
      bodyRequest,
    );

    return response.data;
  } catch (error) {
    console.error('Error setting new password:', error);
    throw error;
  }
};

