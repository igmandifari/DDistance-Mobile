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

const PinPayment = ({ navigation }) => {
  const [timer, setTimer] = useState(60);

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
    if (otp.length != 6) {
      alert("PIN is not valid");
      return;
    }
    navigation.navigate("otp-payment-invoice");
  };
  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "400" }}>
          Masukan PIN Pembayaran
        </Text>
        <View style={styles.otp}>
          <OtpInputs
            ref={this.otpRef}
            handleChange={(code) => setOtp(code)}
            numberOfInputs={6}
          />
        </View>
        <View>
          <TouchableOpacity 
          // onPress={() => handleSubmit()}
          onPress={() => navigation.navigate("forgetPIN")}>
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
