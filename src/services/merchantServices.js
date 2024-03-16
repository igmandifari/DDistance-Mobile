import axiosInstance from "../api/axiosInstance";
// import { baseurl } from "@env";
import baseurl from "../api/baseurl";

export const getDistributorsDashboard = (token) => {
  return axiosInstance.get(`${baseurl}/api/distributor/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfileUser = (token, payload) => {
  return axiosInstance.put(`${baseurl}/api/merchant`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailDistributorInvoice = (token, id) => {
  return axiosInstance.get(`${baseurl}/api/invoice/${id}/distributor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInsurances = (token) => {
  return axiosInstance.get(`${baseurl}/api/insurance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendOtpAturTenor = (token) => {
  return axiosInstance.get(
    `${baseurl}/api/invoice/email/send/token`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getDetailInsurance = (token, id) => {
  return axiosInstance.get(`${baseurl}/api/insurance/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getKtp = async (token, id) => {
  const response = await axiosInstance.get(
    `${baseurl}/api/insurance/${id}/ktp`,
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

export const getSiu = async (token, id) => {
  const response = await axiosInstance.get(
    `${baseurl}/api/insurance/${id}/siu`,
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

export const getAgunan = async (token, id) => {
  const response = await axiosInstance.get(
    `${baseurl}/api/insurance/${id}/agunan`,
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

export const getInvoiceImage = async (token, id) => {
  const response = await axiosInstance.get(
    `${baseurl}/api/invoice/${id}/fileInvoice`,
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
export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("Base64 data:", reader.result);
      resolve(reader.result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const sendOtpInsurance = (token) => {
  return axiosInstance.get(`${baseurl}/api/insurance/email/send/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createInsurance = (token, payload, otp) => {
  console.log(payload);
  return axiosInstance.post(`${baseurl}/api/insurance?otp=${otp}`, payload, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getInvoice = (token) => {
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

export const putChangePassword = (
  token,
  id,
  newPassword,
  oldPassword,
  confirmPassword,
  enteredOtp
) => {
  return axiosInstance.put(
    `${baseurl}/api/merchant/changePassword`,
    {
      otp: enteredOtp,
      newPassword,
      oldPassword,
      confirmPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const putChangePin = (token, otp, oldPin, newPin, confirmPin) => {
  return axiosInstance.put(
    `${baseurl}/api/merchant/changePin`,
    {
      otp,
      oldPin,
      newPin,
      confirmPin,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const sendOtpChangePassword = (token) => {
  return axiosInstance.get(`${baseurl}/api/merchant/email/send/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllDistributor = (token) => {
  return axiosInstance.get(`${baseurl}/api/distributor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendOtpInvoiceMerhant = (token) => {
  return axiosInstance.get(`${baseurl}/api/invoice/email/send/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const postInvoice = (token, payload, otp) => {
  console.log("ini payload", payload);
  return axiosInstance.post(`${baseurl}/api/invoice?otp=${otp}`, payload, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDetailTagihan = (token, id) => {
  return axiosInstance.get(`${baseurl}/api/invoice/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cekTagihan = (token, bodyRequest) => {
  return axiosInstance.post(`${baseurl}/api/invoice/cekTagihan`, bodyRequest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendTokenPayment = (token) => {
  return axiosInstance.get(`${baseurl}/api/payment/send/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDetailInvoiceId = (token, id) => {
  return axiosInstance.get(`${baseurl}/api/payment/${id}/invoice`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPaymentId = (token, id) => {
  return axiosInstance.get(`${baseurl}/api/payment/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const paymentAll = (token, payload) => {
  return axiosInstance.put(`${baseurl}/api/payment`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const paymentRest = (token, payload) => {
  return axiosInstance.put(`${baseurl}/api/payment/paidOff`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const sendOtpPayment = (token, pin) => {
  return axiosInstance.post(
    `${baseurl}/api/payment/send/token`,
    {
      pin: pin,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const setTenor = async (token, bodyRequest) => {
  try {
    const response = await axiosInstance.post(
      `${baseurl}/api/invoice/tenor`,
      bodyRequest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error saat setting tenor:", error);
    throw error;
  }
};

export const sendOtpForgetPIN = async (email) => {
  try {
    const response = await axiosInstance.post(`${baseurl}/api/auth/sendOtp`, {
      email: email,
    });

    return response.data;
  } catch (error) {
    console.error("Error sending OTP for forget PIN:", error);
    throw error;
  }
};

export const sendNewPIN = async (otp, email) => {
  try {
    const bodyRequest = {
      otp: otp,
      email: email,
    };

    const response = await axiosInstance.put(
      `${baseurl}/api/auth/reset-pin-mobile`,
      bodyRequest
    );

    return response.data;
  } catch (error) {
    console.error("Error setting new PIN:", error);
    throw error;
  }
};

export const getNotification = (token) => {
  return axiosInstance.get(`${baseurl}/api/notification`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
