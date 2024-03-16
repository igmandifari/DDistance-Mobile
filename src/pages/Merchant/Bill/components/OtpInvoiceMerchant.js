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
import { postInvoice,sendOtpInvoiceMerhant } from "../../../../services/merchantServices";
import PopUpSuccess from "../../../../components/PopUpSuccess";
import CustomButton from "../../../../components/CustomButton";
import { useSelector } from "react-redux";
import { Button } from "react-native-elements";
import PopUpFailed from "../../../../components/PopUpFailed";

const OtpInvoiceMerchant = ({ navigation, route }) => {
  const { token } = useSelector((state) => state.user);
  const [popUp, setPopUp] = useState(false);
  const [timer, setTimer] = useState(60);
  const { formData } = route.params;
  const [popUpSuccess, setPopUpSuccess] = useState(false);
  const [popUpFailed, setPopUpFailed] = useState(false);


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

  const handleSubmit = async () => {
    const otp = this.otpRef.current.state.otpCode.join("");
    if (otp.length != 6) {
      alert("OTP Not Valid");
      return;
    }
    // setPopUp(true);
    // console.log("otp",otp);
    // console.log("test",formData);
    // console.log("token:", token); 
    try {
      const response = await postInvoice(token, formData, otp);
        if (response.data.statusCode == 201) {
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
    } catch (error) {
      setPopUpFailed(true);
      setTimeout(() => {
        setPopUpFailed(false);
      }, 2000);
    }
  };

  const sendOtp = async () => {
    try {
      const response = await sendOtpInvoiceMerhant(token);
      console.log(response);
      this.otpRef.current.setState({ otpCode: [] });
      setTimer(60);
    } catch (error) {
      console.log(error);
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
          {/* <Button
            title={"test"}
            onPress={() => console.log(formData, "payload")}
          /> */}
          <View style={styles.otp}>
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
            text={"Kirim Permohonan"}
            handleClick={() => handleSubmit()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpInvoiceMerchant;

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
