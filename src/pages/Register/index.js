import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Button, TouchableOpacity,
} from "react-native";
import axios from "axios";
import CustomButton from "../../components/CustomButton";
import { colors } from "../../constant/colors";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorText from "../../components/ErrorText";
import { register } from "../../services/AuthService";
import Icon from "react-native-vector-icons/FontAwesome";

function Register({ navigation }) {
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    addres: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    phoneNumber: Yup.string()
      .min(10, "Too Short!")
      .max(13, "Too Long!")
      .required("Required"),
      pinTransaksi: Yup.string()
          .min(6, "Too Short!")
          .max(6, "Too Long!")
          .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    accountNumber: Yup.string().required("Account number is required"),
    password: Yup.string()
      .min(5, "Too Short")
      .max(20, "Too Long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const { values, isValid, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      addres: "",
      phoneNumber: "",
      email: "",
      accountNumber: "",
      password: "",
      confirmPassword: "",
        pinTransaksi:""
    },
    onSubmit: async (values) => {
      if (isValid) {
        const payload = {
          email,
          password,
            pin: pinTransaksi,
          addres,
          phoneNumber,
          pan: accountNumber,
          name,
        };
        try {
          const data = await register(payload);
          if (data.statusCode == 201);
          alert("Success Register");
          navigation.navigate("register-success");
        } catch (error) {
          alert(error);
        }
      } else {
        alert("Register Failed");
      }
    },
    validationSchema: SignupSchema,
  });

  const {
    name,
    addres,
    phoneNumber,
    email,
    accountNumber,
    password,
    confirmPassword,
      pinTransaksi
  } = values;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const handleShowConfirmPassword = () => {
    setConfirmShowPassword(!showConfirmPassword);
  }
  const handleShowPin = () => {
    setShowPin(!showPin);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>D-DISTANCE</Text>
      <Image
        style={styles.image}
        source={require("../../assets/img/truck.png")}
      />
      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap Pemilik Toko"
        // onChangeTextText={(text) => handleChange("name", text)}
        onChangeText={handleChange("name")}
        value={name}
      />
      <ErrorText text={errors.name} />
      <TextInput
        style={styles.input}
        placeholder="Alamat Toko"
        onChangeText={handleChange("addres")}
        value={addres}
      />
      <ErrorText text={errors.addres} />
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="No. HP"
        onChangeText={handleChange("phoneNumber")}
        value={phoneNumber}
      />
      <ErrorText text={errors.phoneNumber} />

      <View style={styles.passwordInputContainer}>
        <TextInput
            style={styles.passwordInput}
            keyboardType="number-pad"
            placeholder="Pin Transaksi"
            secureTextEntry={!showPin}
            onChangeText={handleChange("pinTransaksi")}
            value={pinTransaksi}
        />
        <TouchableOpacity onPress={handleShowPin} style={styles.eyeIcon}>
          <Icon
              name={showPin ? "eye-slash" : "eye"}
              size={20}
              color="#F36C21"
          />
        </TouchableOpacity>
      </View>
      <ErrorText text={errors.pinTransaksi} />
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="Email"
        onChangeText={handleChange("email")}
        value={email}
      />
      <ErrorText text={errors.email} />
      <TextInput
        style={styles.input}
        placeholder="No. Rekening Danamon"
        onChangeText={handleChange("accountNumber")}
        value={accountNumber}
      />
      <ErrorText text={errors.accountNumber} />

      <View style={styles.passwordInputContainer}>
        <TextInput
            style={styles.passwordInput}
            placeholder="Kata Sandi"
            secureTextEntry={!showPassword}
            onChangeText={handleChange("password")}
            value={password}
        />
        <TouchableOpacity onPress={handleShowPassword} style={styles.eyeIcon}>
          <Icon
              name={showPassword ? "eye-slash" : "eye"}
              size={20}
              color="#F36C21"
          />
        </TouchableOpacity>
      </View>
      <ErrorText text={errors.password} />

      <View style={styles.passwordInputContainer}>
        <TextInput
            style={styles.passwordInput}
            placeholder="Konfirmasi Kata Sandi"
            secureTextEntry={!showConfirmPassword}
            onChangeText={handleChange("confirmPassword")}
            value={confirmPassword}
        />
        <TouchableOpacity onPress={handleShowConfirmPassword} style={styles.eyeIcon}>
          <Icon
              name={showConfirmPassword ? "eye-slash" : "eye"}
              size={20}
              color="#F36C21"
          />
        </TouchableOpacity>
      </View>
      <ErrorText text={errors.confirmPassword} />
      <CustomButton
        text={"Register"}
        disabled={!isValid}
        handleClick={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FLORAL_WHITE,
    height: "100%",
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#F36C21",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    width: "10%",
    padding: 8,
    textAlign: "center",
    marginLeft: 40,
  },
  text: {
    color: "#F36C21",
    textAlign: "center",
    textShadowColor: "#00000040",
    textShadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    textShadowRadius: 4,
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "800",
  },
  image: {
    paddingVertical: 0,
    margin: 0,
    width: 170,
    resizeMode: "contain",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#F36C21",
    backgroundColor: "white",
    width: "100%",
    borderWidth: 1
  },
  eyeIcon: {
    padding: 10,
  },
});

export default Register;
