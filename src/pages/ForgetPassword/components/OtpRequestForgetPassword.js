import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { colors } from "../../../constant/colors";
import OtpInputs from "react-native-otp-inputs";
import CustomButton from "../../../components/CustomButton";
import SuccessNewPassword from "./SuccessNewPassword";
import { sendNewPassword, sendOtpForgetPassword } from "../../../services/AuthService";

const OtpRequestForgetPassword = ({ navigation, route }) => {
  const [popUp, setPopUp] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(route?.params?.payload?.email || "");

  const payload = route?.params?.payload || {};

  if (!payload || !payload.email) {
    console.error("Invalid payload:", payload);
    alert("Invalid payload. Please try again.");
    return null; // or navigate to an error screen
  }

  const otpRef = useRef(null);

  const clearOTP = () => {
    if (otpRef.current) {
      otpRef.current.clear();
    }
  };

  const handleVerifyOTP = async () => {
    try {
      console.log("Mengirim verifikasi password baru...");

      const { email } = payload;

      await sendNewPassword(otp, email);

      console.log("Verifikasi password baru berhasil.");

      setPopUp(true);
      setTimeout(() => {
        navigation.navigate("success-new-password", { email });
      }, 3000);
    } catch (error) {
      console.error("Gagal memverifikasi OTP. Kesalahan:", error);
      alert("Gagal memverifikasi OTP. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  const sendOtp = async () => {
    try {
      await sendOtpForgetPassword(email);
      clearOTP();
      setTimer(60);
    } catch (error) {
      console.error("Error sending OTP for forget password:", error);
      alert("Gagal mengirim ulang OTP. Silakan coba lagi.");
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        {popUp && <SuccessNewPassword />}
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "400",
              marginTop: 100,
            }}
          >
            Masukkan Kode OTP yang telah {"\n"} dikirim ke alamat email Anda
            untuk {"\n"}
            verifikasi reset password:
          </Text>
          <View style={{ position: "relative", marginLeft: -40 }}>
            <OtpInputs
              ref={this.otpRef}
              handleChange={(code) => setOtp(code)}
              numberOfInputs={6}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => sendOtp()} disabled={timer > 0}>
              {timer > 0 ? (
                <Text
                  style={{
                    textDecorationLine: "underline",
                    color: colors.GRAY,
                    top: 100,
                    textAlign: "center",
                  }}
                >
                  {`00.${timer}`} Kirim Ulang OTP
                </Text>
              ) : (
                <Text
                  style={{
                    textDecorationLine: "underline",
                    color: colors.ORANGE,
                    top: 100,
                    textAlign: "center",
                  }}
                >
                  Kirim Ulang OTP
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <CustomButton
            text={"Verifikasi OTP"}
            handleClick={() => handleVerifyOTP()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default OtpRequestForgetPassword;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.FLORAL_WHITE,
    padding: 25,
  },
});
