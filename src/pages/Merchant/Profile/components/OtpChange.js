import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../../../constant/colors";
import OtpInputs from "react-native-otp-inputs";
import CustomButton from "../../../../components/CustomButton";
import PopUpSuccess from "../../../../components/PopUpSuccess";
import { putChangePassword } from "../../../../services/merchantServices";
import { useSelector } from "react-redux";

const OtpChange = ({ navigation, route }) => {
  const [popUp, setPopUp] = useState(false);
  const [timer, setTimer] = useState(60);
  const otpRef = useRef(null);
  const { payload } = route.params;
  const {token} = useSelector((state)=>state.user) 
  const { id, newPassword ,oldPassword,confirmPassword} = route.params; 
  console.log(token);
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const clearOTP = () => {
    otpRef.current.clear();
  };

  const handleSubmit = async () => {
    const enteredOtp = otpRef.current.state.otpCode.join("");
    if (enteredOtp.length !== 6) {
      alert("OTP Not Valid");
      return;
    }

    try {
      await putChangePassword(token, id, newPassword,oldPassword,confirmPassword);
      console.log("Password changed successfully");
      setPopUp(true);

      setTimeout(() => {
        navigation.navigate("dashboard-merchant");
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Failed to change password");
    }
  };


  const sendOtp = async () => {
    console.log("Sending OTP");
    await sendOtpInsurance();
    otpRef.current.setState({ otpCode: [] });
    setTimer(60);
  };

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        {popUp && <PopUpSuccess />}
        <View>
          <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "400" }}>
            Masukkan Kode OTP yang telah {"\n"} dikirim ke alamat email Anda untuk
            {"\n"} verifikasi ubah password:
          </Text>
          <View style={{ position: "relative" }}>
            <OtpInputs
              ref={otpRef}
              handleChange={(code) => console.log("OTP changed:", code)}
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
                {timer > 0 ? `00.${timer}` : ""} Kirim Ulang OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <CustomButton text={"Kirim Permohonan"} handleClick={() => handleSubmit()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpChange;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.FLORAL_WHITE,
    padding: 25,
  },
});
