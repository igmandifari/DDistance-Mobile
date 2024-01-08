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

export const getInvoice = (token)=>{
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

      // oldPassword: oldPassword,
export const putChangePassword = (token, id, newPassword,oldPassword,confirmPassword) => {
  return axiosInstance.put(
    `http://10.0.2.2:8080/api/merchant/changePin`,
    { password: newPassword,
      oldPassword: oldPassword,
      confirmPassword: confirmPassword,
      id:id,
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
