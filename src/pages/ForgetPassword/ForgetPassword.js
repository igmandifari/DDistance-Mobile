import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../constant/colors";
import CustomButton from "../../components/CustomButton";
import ErrorText from "../../components/ErrorText";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthentication } from "../../store/userSlice";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgetPassword({ navigation }) {
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
            Masukkan email akun Anda untuk kami kirimkan reset kata sandi
          </Text>
          <Text style={styles.textDescription}>Kirim OTP Reset Password</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          // onChangeText={(text) => handleChange("email", text)}
          // value={form.email}
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
            handleClick={() => navigation.navigate("otpForgetPassword")}
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
