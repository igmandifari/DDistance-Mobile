import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../../../constant/colors";
import OtpInputs from "react-native-otp-inputs";
import CustomButton from "../../../../components/CustomButton";
import { sendOtpInsurance } from "../../../../services/merchantServices";
// import { sendOtpForgetPIN } from "../../../../services/merchantServices";
import SuccessNewPIN from "./SuccessNewPIN";

const OtpRequestForgetPIN = ({ navigation, route }) => {
  const [popUp, setPopUp] = useState(false);
  const [timer, setTimer] = useState(60);
  const { payload } = route.params;

  useEffect(() => {
    if (!timer) return;

    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const [otp, setOtp] = useState("");
  otpRef = React.createRef();

  clearOTP = () => {
    otpRef.current.clear();
  };

  const handleSubmit = () => {
    const otp = this.otpRef.current.state.otpCode.join("");
    if (otp.length != 6) {
      alert("OTP Not Valid");
      return;
    }
    const bodyValue = {
      ...payload,
      otp: otp,
    };
    console.log("payload", bodyValue);
    setPopUp(true);
    setTimeout(() => {
      navigation.navigate("dashboard-merchant");
    }, 3000);
  };

  const sendOtp = async () => {
    console.log("first");
    await sendOtpInsurance();
    this.otpRef.current.setState({ otpCode: [] });
    setTimer(60);
  };
  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        {popUp && <SuccessNewPIN />}
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
            verifikasi reset PIN:
          </Text>
          <View style={{ position: "relative", marginLeft: -40 }}>
            <OtpInputs
              ref={this.otpRef}
              handleChange={(code) => setOtp(code)}
              numberOfInputs={6}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => sendOtp()}>
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: colors.ORANGE,
                  top: 100,
                  textAlign: "center",
                }}
              >
                {timer ? `00.${timer}` : ""} Kirim Ulang OTP
              </Text>
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
            //   handleClick={() => handleSubmit()}
            handleClick={() => navigation.navigate("successNewPIN")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default OtpRequestForgetPIN;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.FLORAL_WHITE,
    padding: 25,
  },
});
