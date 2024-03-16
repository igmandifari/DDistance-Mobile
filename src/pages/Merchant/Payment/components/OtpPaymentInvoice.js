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
import { useSelector } from "react-redux";
import PopUpSuccess from "../../../../components/PopUpSuccess";
import PopUpFailed from "../../../../components/PopUpFailed";
import { paymentAll } from "../../../../services/merchantServices";

const OtpPaymentInvoice = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const { selectedPaymentId, isSuccess } = route.params;
  // console.log("id ni",selectedPaymentId);
  const [popUpSuccess, setPopUpSuccess] = useState(false);
  const [popUpFailed, setPopUpFailed] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState("");
  otpRef = React.createRef();

useEffect(() => {
  if (!timer) return;

  const intervalId = setInterval(() => {
    setTimer((prevTimer) => prevTimer - 1);
  }, 1000);

  return () => clearInterval(intervalId);
}, [timer]);
  const clearOTP = () => {
    otpRef.current.clear();
  };

  const handleSubmit = async () => {
    const otp = otpRef.current.state.otpCode.join("");
    const dataSumbit = {
      id:selectedPaymentId,
      otp,
    };
    console.log("apa",dataSumbit);
    if (otp.length !== 6) {
      alert("OTP Not Valid");
      return;
    }

    try {
      const response = await paymentAll(token, dataSumbit);
      if (response.data.statusCode === 201) {
        setPopUpSuccess(true);
        setTimeout(() => {
          setPopUpSuccess(false);
          navigation.navigate("dashboard-merchant");
        }, 2000);
      } else {
        setPopUpFailed(true);
        setTimeout(() => {
          setPopUpFailed(false);
        }, 2000);
      }
      navigation.navigate("dashboard-merchant");
    } catch (error) {
      console.error("Error updating invoice:", error);
      setPopUpFailed(true);
      setTimeout(() => {
        setPopUpFailed(false);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "400" }}>
          Masukkan Kode OTP yang telah dikirim ke alamat email Anda untuk
          verifikasi pembayaran Invoice:
        </Text>
        <View style={styles.otp}>
          <OtpInputs
            ref={otpRef}
            handleChange={(code) => setOtp(code)}
            numberOfInputs={6}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => handleSubmit()}>
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
        <View
          style={{
            flex: 1,
            marginTop: 300,
            justifyContent: "flex-end",
          }}
        >
          <CustomButton
            text={"Kirim Permintaan"}
            handleClick={() => handleSubmit()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpPaymentInvoice;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.FLORAL_WHITE,
    padding: 25,
  },
  otp: {
    alignItems: "center",
  },
});
