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
import CustomButton from "../../../../components/CustomButton";
import {useSelector} from "react-redux";
import PopUpSuccess from "../../../../components/PopUpSuccess";
import PopUpFailed from "../../../../components/PopUpFailed";


const OtpInvoiceDistributor = ({ navigation,route }) => {
  const [timer, setTimer] = useState(60);
  const { token } = useSelector((state) => state.user);
  const { formData } = route.params;
  const [popUpSuccess, setPopUpSuccess] = useState(false);
  const [popUpFailed, setPopUpFailed] = useState(false);
  const [popUp, setPopUp] = useState(false);

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
    const otp = this.otpRef.current.state.otpCode.join("");

    const dataSumbit = {
      ...formData, otp
    };

    if (otp.length != 6) {
      alert("OTP Not Valid");
      return;
    }
    try {
      const response = await putInvoiceDistributor(token, dataSumbit);
      if(response.data.statusCode == 201){
        setPopUpSuccess(true)
        setTimeout(() => {
          setPopUpSuccess(false);
          navigation.navigate("bill-distributor");
        }, 2000);
      }else{
        // Handle response, e.g., show success message
        console.log("Invoice updated successfully", response.data);

        setPopUpFailed(true);
        setTimeout(() => {
          setPopUpFailed(false);
        }, 2000);
      }

      // Navigate to the desired page, e.g., dashboard
      navigation.navigate("dashboard-distributor");
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
      {popUpSuccess && <PopUpSuccess />}
      {popUpFailed && <PopUpFailed />}
      <View style={styles.container}>
        {popUp && <PopUpSuccess />}
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
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <CustomButton
            text={"Kirim Permohonan"}
            handleClick={() => handleSubmit()}
          />
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
  otp: {
    alignItems: "center",
  },
});
