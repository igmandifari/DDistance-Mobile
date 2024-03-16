import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OtpInputs from "react-native-otp-inputs";
import CustomButton from "../../../../components/CustomButton";
import { useSelector } from "react-redux";
import { sendOtpPayment } from "../../../../services/merchantServices";
import { colors } from "react-native-elements";

const PinPayment = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const { selectedPaymentId } = route.params;
  // console.log(selectedPaymentId);  
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState("");
  const otpRef = React.createRef();

  useEffect(() => {
    if (!timer) return;

    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  const clearOTP = () => {
    otpRef.current.clear();
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      alert("PIN is not valid");
      return;
    }
  
    try {
      await sendOtpPayment(token, otp);
      navigation.navigate("otp-payment-invoice", {
        selectedPaymentId: selectedPaymentId,
      });
    } catch (error) {
      console.error("Error sending OTP payment request:", error);
    }
  };
  
  

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "400" }}>
          Masukan PIN Pembayaran
        </Text>
        <View style={styles.otp}>
          <OtpInputs ref={otpRef} handleChange={(code) => setOtp(code)} numberOfInputs={6} />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("forget-PIN")}>
            <Text
              style={{
                textDecorationLine: "underline",
                color: colors.ORANGE,
                top: 100,
                textAlign: "center",
              }}
            >
            Lupa PIN?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 300, justifyContent: "flex-end" }}>
          <CustomButton text={"Kirim Permintaan"} handleClick={() => handleSubmit()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PinPayment;

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
