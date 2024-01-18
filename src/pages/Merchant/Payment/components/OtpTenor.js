import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { colors } from "../../../../constant/colors";
import OtpInputs from "react-native-otp-inputs";
import CustomButton from "../../../../components/CustomButton";

import {
  setTenor,
  sendOtpAturTenor,
} from "../../../../services/merchantServices";
import { useSelector } from "react-redux";
import PopUpFailed from "../../../../components/PopUpFailed";
import TenorSuccessSetting from "./TenorSuccessSetting";

const OtpTenor = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const [popUpSuccess, setPopUpSuccess] = useState(false);
  const [popUpFailed, setPopUpFailed] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState("");
  const otpRef = useRef(null);
  const [tenorDetails, setTenorDetails] = useState(null);
  const [otpSending, setOtpSending] = useState(false);

  const { formData } = route.params;
  const idFromTenorSetting = formData.id; // Dapatkan ID dari formData
  const tenorFromTenorSetting = formData.tenor;

  useEffect(() => {
    if (!timer) return;

    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleSubmit = async () => {
    const enteredOtp = otpRef.current.state.otpCode.join("");
    if (enteredOtp.length !== 6) {
      alert("OTP Is Not Valid");
      return;
    }

    console.log("idFromTenorSetting:", idFromTenorSetting);
    console.log("tenorFromTenorSetting:", tenorFromTenorSetting);
    console.log("enteredOtp:", enteredOtp);

    try {
      const response = await setTenor(token, {
        id: idFromTenorSetting,
        tenor: tenorFromTenorSetting,
        otp: enteredOtp,
      });
      console.log("After API call");

      if (response.statusCode === 200) {
        // Simpan detail hasil setTenor ke state
        setTenorDetails(response.data);

        console.log("LINE 72", response.data);

        // Navigasi ke halaman TenorSuccessSetting
        navigation.navigate("tenor-success-setting", {
          details: response.data,
        });
      } else {
        setPopUpFailed(true);
        setTimeout(() => {
          setPopUpFailed(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setPopUpFailed(true);
      setTimeout(() => {
        setPopUpFailed(false);
      }, 2000);
    }
  };

  const sendOtp = async () => {
    try {
      setOtpSending(true);
      const response = await sendOtpAturTenor(token);
      console.log(response);
      setTimer(60);
    } catch (error) {
      console.log(error);
    } finally {
      setOtpSending(false);
    }
  };
  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      {popUpSuccess && <TenorSuccessSetting />}
      {popUpFailed && <PopUpFailed />}
      <View style={styles.container}>
        <Text style={styles.title}>
          Masukkan Kode OTP yang telah dikirim ke alamat email Anda untuk
          verifikasi pengaturan tenor:
        </Text>
        <View style={styles.otp}>
          <OtpInputs
            ref={otpRef}
            handleChange={(code) => setOtp(code)}
            numberOfInputs={6}
          />
        </View>

        <View style={styles.resendContainer}>
          <TouchableOpacity
            onPress={() => sendOtp()}
            disabled={otpSending || timer > 0}
          >
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

        <View style={styles.buttonContainer}>
          <CustomButton
            text={"Kirim Permintaan Atur Tenor"}
            handleClick={() => handleSubmit()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpTenor;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.FLORAL_WHITE,
    padding: 25,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    marginBottom: 20,
  },
  otp: {
    alignItems: "center",
  },
  resendContainer: {
    marginTop: 100,
  },
  resendText: {
    textDecorationLine: "underline",
    color: colors.ORANGE,
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
