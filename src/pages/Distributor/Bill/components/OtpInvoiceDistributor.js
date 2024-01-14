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
import { putInvoiceDistributor } from "../../../../services/distributorService";
  
  const OtpInvoiceDistributor = ({ navigation }) => {
    const [timer, setTimer] = useState(60);
  
    useEffect(() => {
      if (!timer) return;
  
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [timer]);
  
    const [otp, setOtp] = useState("");
    const { otpToken } = route?.params;
    otpRef = React.createRef();
  
    clearOTP = () => {
      otpRef.current.clear();
    };
  
    const handleSubmit = async () => {
      console.log("otp", otp);
      try {
  
        let installment;
        if (data.status === "DITERIMA") {
          installment = "DITERIMA";
        } else if (data.status === "DITOLAK") {
          installment = "DITOLAK"; 
        } else {
          installment = "DALAM_PROSES";
        }

        const otpPayload = {
          id: data.id,
          otp: otpToken,
          alasanPenolakan: values.rejection,
          installment,
        };
  
        const response = await putInvoiceDistributor(token, otpPayload);
  
        // Handle response, e.g., show success message
        console.log("Invoice updated successfully", response.data);
  
        // Navigate to the desired page, e.g., dashboard
        navigation.navigate("dashboard-distributor");
      } catch (error) {
        console.error("Error updating invoice:", error);
        // Handle error, e.g., show error message
      }
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
            <View style={styles.otp}>
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
  
  export default OtpInvoiceDistributor;
  
  const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: colors.FLORAL_WHITE,
      padding: 25,
    },
    otp:{
        alignItems:"center",
    }
  });
  