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

const OtpRequestInsurance = ({ navigation }) => {
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
    console.log("otp", otp);
    navigation.navigate("dashboard-distributor");
  };
  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <View>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "400" }}
          >
            Masukkan Kode OTP yang telah {"\n"} dikirim ke alamat email Anda
            untuk {"\n"}
            verifikasi pengajuan ke Danamon:
          </Text>
          <View style={{ position: "relative" }}>
            <OtpInputs
              ref={this.otpRef}
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpRequestInsurance;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.FLORAL_WHITE,
    padding: 25,
  },
});
