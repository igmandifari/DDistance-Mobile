import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { colors } from "../../constant/colors";
import CustomButton from "../../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendOtpForgetPassword } from "../../services/AuthService";

export default function ForgetPassword({ navigation }) {
const [email, setEmail] = useState("");

  const handleSendOtp = async () => {
    try {
      await sendOtpForgetPassword(email);
      navigation.navigate("otp-forget-password", { payload: { email } });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Email tidak terdaftar. Mohon periksa alamat email anda.");
      } else {
        console.error("Error sending OTP for forget password:", error);
        alert("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  return (
    <SafeAreaView style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/img/Forgot-password.png")}
          />
        </View>
        <Text style={styles.title}>Lupa kata sandi Anda?</Text>
        <View style={styles.description}>
          <Text style={styles.textDescription}>
            Masukkan email akun Anda untuk kami kirimkan{" "}
          </Text>
          <Text style={styles.textDescription}>OTP reset kata sandi</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <View
          style={{
            height: "20%",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <CustomButton
            text="Kirim OTP Reset Password"
            handleClick={() => handleSendOtp()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FLORAL_WHITE,
    height: "100%",
    padding: 25,
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 15,
  },
  imageContainer: {
    borderRadius: 1000,
    backgroundColor: "white",
    width: 310,
    height: 310,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 65,
  },
  image: {
    width: "75%",
    height: "75%",
  },
  title: {
    color: colors.ORANGE,
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    justifyContent: "center",
    alignItems: "center",
  },
  textDescription: {
    fontWeight: "400",
    fontSize: 15,
    color: colors.DARK_GRAY,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#F36C21",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
    textAlign: "center",
  },
});
